import toInteger from 'lodash/toInteger';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';

/*
-- [[ntxe]] - фильтр, например 'id=1&id=2' или 'json-server&author=typicode'.
          Тут & работает как ИЛИ, т.е. для 'id=1&id=2' вернутся две записи (если они существуют с такими id)

 */

/**
 * [[ktvg]]
 *
 * Утилита для запросав к json-server (https://github.com/typicode/json-server)
 */
export default class TJsonServer {

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

  async elemsGetPage(pageNum: number, perPage: number) {
    const resp = await fetch(`${this.path}?_page=${pageNum}&_limit=${perPage}`);
    return resp.json();
  }

  async elemsGet(offset: number, limit: number) {
    const resp = await fetch(`${this.path}?_start=${offset}&_limit=${limit}`);
    return resp.json();
  }

  /**
   *
   * @param filter (1) -- см. [ntxe]
   */
  async elemsGetByFilter(filter: string) {
    const resp = await fetch(`${this.path}?${filter}`);
    return resp.json();
  }

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
