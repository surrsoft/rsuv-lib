import toInteger from 'lodash/toInteger';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { substrCountB } from './RsuvTuString';
import { RsuvResultCountAndData } from './RsuvResultCountAndData';
import { RsuvResultTibo } from './RsuvResultTibo';

/*
-- [[ntxe]] - фильтр, например 'id=1&id=2' или 'json-server&author=typicode'.
          Тут & работает как ИЛИ, т.е. для 'id=1&id=2' вернутся две записи (если они существуют с такими id)

 */

/**
 * [[ktvg]]
 *
 * Утилита для запросав к json-server (https://github.com/typicode/json-server)
 */
export class RsuvTxJsonServer {

  private readonly path: string;

  /**
   *
   * @param basePath (1) -- expample 'http://localhost:21884/'
   * @param collectionName (2) -- example 'products'
   */
  constructor(readonly basePath: string, readonly collectionName: string) {
    this.path = `${this.basePath}${this.collectionName}`;
  }

  async elemsCountGetAll(): Promise<number> {
    const resp = await fetch(`${this.path}?_limit=1`);
    const countSt = resp.headers.get('x-total-count');
    return toInteger(countSt);
  }

  async elemsGetAll() {
    const resp = await fetch(this.path);
    return resp.json();
  }

  /**
   * см. также функцию elemsGetPage()
   * @param offset (1) -- сколько элементов пропустить, с начала
   * @param limit (2) -- сколько элементов взять после пропуска
   */
  async elemsGet(offset: number, limit: number) {
    const resp = await fetch(`${this.path}?_start=${offset}&_limit=${limit}`);
    return resp.json();
  }

  /**
   * Другой вариант функции elemsGet()
   * @param pageNum (1) -- номер страницы, 1+
   * @param limit (2) -- количество элементов на странице
   */
  async elemsGetPage(pageNum: number, limit: number) {
    const resp = await fetch(`${this.path}?_page=${pageNum}&_limit=${limit}`);
    return resp.json();
  }

  /**
   * Возвращает все записи удовлетворяющие [ntxe]-фильтру (1)
   * @param filter (1) -- см. [ntxe]
   */
  async elemsGetByFilter(filter: string) {
    const resp = await fetch(`${this.path}?${filter}`);
    return resp.json();
  }

  /**
   * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов).
   * Из всех возможных результатов, отбрасываются первые (3) и из оставшихся берутся первые (4)
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param offset (3) --
   * @param limit (4) --
   */
  async elemsGetByFilterB(fieldName: string, substring: string, offset: number, limit: number) {
    const elems = await this.elemsGetAll()
    const elemsFiltered = elems.filter((elem: any) => {
      return substrCountB(elem[fieldName], substring) > 0
    })
    return elemsFiltered.slice(offset, offset + limit)
  }

  /**
   * Отличается от BA только тем что (3) это не offset а pageNumber
   *
   * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов).
   * Из всех возможных результатов, берётся страница (3), (4) определяет число элементов на странице
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param pageNumber (3) -- 1+
   * @param limit (4) --
   */
  async elemsGetByFilterBB(fieldName: string, substring: string, pageNumber: number, limit: number) {
    return await this.elemsGetByFilterB(fieldName, substring, (pageNumber - 1) * limit, limit)
  }

  /**
   * Отличается от B тем что возвращает более развёрнутый ответ
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param offset (3) --
   * @param limit (4) --
   * @return RsuvResultCountAndData где
   * countAll - количество элементов удовлетворяющих фильтру (1)(2) без учета (3)(4),
   * data - сами элементы удовлетворяющие (1)-(4),
   * hasNext - TRUE если возвращены НЕ все данные удовлетворяющие фильтру (1)(2)
   */
  async elemsGetByFilterC<T>(fieldName: string, substring: string, offset: number, limit: number): Promise<RsuvResultCountAndData<T>> {
    const elems = await this.elemsGetAll();
    const elemsFiltered = elems.filter((elem: any) => {
      return substrCountB(elem[fieldName], substring) > 0;
    })
    const elemsFilteredSliced = elemsFiltered.slice(offset, offset + limit);
    return {
      countAll: elemsFiltered.length,
      data: elemsFilteredSliced,
      hasNext: offset + limit < elemsFiltered.length
    } as RsuvResultCountAndData<T>
  }

  /**
   * Отличается от CA только параметром (3)
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param pageNumber (3) -- 1+
   * @param limit (4) --
   */
  async elemsGetByFilterCB<T>(fieldName: string, substring: string, pageNumber: number, limit: number): Promise<RsuvResultCountAndData<T>> {
    return this.elemsGetByFilterC(fieldName, substring, (pageNumber - 1) * limit, limit);
  }

  /**
   * Удаляет элемент с id {@param id}. Возвращает информацию о том было ли удаление успешным
   */
  async elemDelete(id: string | number): Promise<RsuvResultBoolPknz> {
    const ret = await fetch(`${this.path}/${id}`, {
      method: 'DELETE'
    })
    if (ret.status !== 200) {
      return new RsuvResultBoolPknz(false, '210315153800', `err*: id not found; id [${id}]; ret.status [${ret.status}]`)
    }
    return new RsuvResultBoolPknz();
  }

  async elemsDelete(ids: string[] | number []): Promise<RsuvResultBoolPknz[]> {
    const ret = [];
    for (const id of ids) {
      const res = await this.elemDelete(id);
      ret.push(res);
    }
    return ret;
  }

  /**
   * Отличается от А тем что даёт больше информации об итогах удаления элементов
   * @param ids
   */
  async elemsDeleteB(ids: Array<string | number>): Promise<RsuvRemoveResultAsau100> {
    const idsSuccess0: Array<string | number> = []
    const idsNotSuccess0: Array<string | number> = []
    for (const id of ids) {
      const res: RsuvResultBoolPknz = await this.elemDelete(id);
      if (res.success) {
        idsSuccess0.push(id)
      } else {
        idsNotSuccess0.push(id)
      }
    }
    return {
      /** TRUE если все элементы были удалены успешно */
      isAllSuccess: idsSuccess0.length === ids.length,
      /** ids успешно удалённых элементов */
      idsSuccess: idsSuccess0,
      /** ids неудалённых элементов */
      idsNotSuccess: idsNotSuccess0
    } as RsuvRemoveResultAsau100
  }

  /**
   *
   * @param filter (1) -- см. [ntxe]
   */
  async elemsDeleteByFilter(filter: string): Promise<RsuvResultBoolPknz[]> {
    const elems = await this.elemsGetByFilter(filter)
    return await this.elemsDelete(elems.map((el: any) => el.id))
  }

  async elemCreate(data: object): Promise<RsuvResultBoolPknz> {
    const res = await fetch(`${this.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    // ---
    if (res.status === 201) {
      return new RsuvResultBoolPknz()
    }
    return new RsuvResultBoolPknz(false, '210316120200', `err*: not created; status [${res.status}] url [${res.url}]`)
  }

  /**
   * Отличается от А тем что возвращает также информацию об ID созданного элемента (в поле 'value' в виде строки)
   * @param data (1) -- объект без поля 'id'
   * @return
   */
  async elemCreateB(data: object): Promise<RsuvResultTibo<string>> {
    const res = await fetch(`${this.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    // ---
    if (res.status === 201) {
      const createdElem = await res.json()
      return new RsuvResultTibo({success: true, value: createdElem.id + ''})
    }
    return new RsuvResultTibo({success: false, errCode: res.status + '', errMessage: res.url})
  }

  async elemUpdate(data: any): Promise<RsuvResultBoolPknz> {
    const res = await fetch(`${this.path}/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status === 200) {
      return new RsuvResultBoolPknz()
    }
    return new RsuvResultBoolPknz(false, '210318111500', `err*: not updated; status [${res.status}] url [${res.url}]`)
  }
}

/**
 * Представляет результат удаления элементов
 */
export type RsuvRemoveResultAsau100 = {
  /** TRUE если все элементы были успешно удалены */
  isAllSuccess: boolean,
  /** id элементов которые были успешно удалены */
  idsSuccess: Array<string | number>,
  /** id элементов которые НЕ были успешно удалены */
  idsNotSuccess: Array<string | number>
}
