/*
[[zrnx]]
 */

/**
 * [[rkyr]]
 */
import { RsuvDataSourceAecrNT } from './RsuvDataSourceAecrNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvPaginationGyth } from './RsuvPaginationGyth';

/**
 * @class
 */
export class RsuvZrnxSubData<T> {

  /** @constructor */
  constructor(
    /**
     * номер страницы
     */
    public page: number = 0,
    /**
     * общее количество страниц
     */
    public pageCount: number = 1,
    /**
     * общее количество элементов
     */
    public elemsAllCount: number = 0,
    /**
     * коллекция элементов страницы
     */
    public elemsOfPage: T[] = []
  ) {
  }
}

/**
 * [[zrnx]]
 *
 * Сущность для использования в качестве посредника между абстрактным источником-данных (интерефейс
 * {@link RsuvDataSourceAecrNT}) и UI-списком-с-пагинацией.
 *
 * При вызове {@link make} делаются обращения к {@link dataSource} и на базе полученных данных вычисляются поля {@link page}
 * {@link elemsAllCount}, {@link elemsOfPage}, {@link pageCount}. Эти поля можно получить с помощью метода {@link dataGet}
 * в виде типа {@link RsuvZrnxSubData} для последующего использования в качестве входных данных для UI-списка-с-пагинацией
 * 
 * @class
 */
export class RsuvAdapterZrnx<T> {
  private page: number = 0
  private elemsAllCount: number = 0
  private elemsOfPage: T[] = []
  private pageCount: number = 0

  /**
   * @constructor
   * @param perPage (1) -- число-записей-на-странице, 1+
   * @param dataSource (2) -- источник-данных
   */
  constructor(readonly perPage: number, readonly dataSource: RsuvDataSourceAecrNT<T>) {
  }

  /**
   * Запрос данных и вычисление полей текущего объекта
   *
   * @async
   * @param pageNum (1) -- номер страницы
   * @param last (2) -- если TRUE, то (1) игнирируется и вычисление выполняется для последней страницы
   */
  async make(pageNum: number, last: boolean = false): Promise<RsuvResultBoolPknz> {
    const elemsCount = await this.dataSource.elemsAllCountGet();
    // ---
    const rmPagination = new RsuvPaginationGyth(elemsCount, this.perPage);
    const pageCount = rmPagination.pageCount
    if (last) {
      this.page = pageCount
    } else {
      this.page = pageCount < pageNum ? pageCount : pageNum;
    }
    this.elemsAllCount = elemsCount
    this.pageCount = pageCount
    // ---
    const {indexStart, indexLast} = rmPagination.indexesByPageNum(this.page)
    this.elemsOfPage = await this.dataSource.elemsGet(indexStart, indexLast - indexStart + 1)
    // ---
    return new RsuvResultBoolPknz() // TODO нужно продумать по части ошибок
  }

  /**
   * Получение результатов вычислений
   */
  dataGet(): RsuvZrnxSubData<T> {
    return new RsuvZrnxSubData<T>(this.page, this.pageCount, this.elemsAllCount, this.elemsOfPage)
  }

}


