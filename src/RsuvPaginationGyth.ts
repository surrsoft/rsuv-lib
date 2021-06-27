/**
 * [[gyth]]
 * Сущность для пагинации. Передаём в конструктор "общее кол-во элементов" и "кол-во элементов на странице", и затем
 * по "номеру страницы" узнаём начальный и конечный индексы с помощью метода {@link indexesByPageNum}
 */
export class RsuvPaginationGyth {

  /**
   * Количество страниц
   */
  public readonly pageCount: number = 1

  /**
   * При интанцировании вычисляет поле {@link pageCount}
   *
   * @param elemsCount (1) -- общее количество элементов
   * @param elemsPerPageCount (2) -- элементов на одной странице
   */
  constructor(readonly elemsCount: number = 20, readonly elemsPerPageCount: number = 10) {
    // --- вычисление this.pageCount
    if (elemsCount >= elemsPerPageCount) {
      const pagesFloat = elemsCount / elemsPerPageCount
      const pages = Math.trunc(pagesFloat)
      const dev = pagesFloat - pages;
      if (dev === 0) {
        this.pageCount = pages
      } else if (dev > 0) {
        this.pageCount = pages + 1
      }
    }
  }

  /**
   *
   * @param pageNum (1) -- 1+, если больше реального количества страниц, то возвращаются данные для фактичесчки последней
   * страницы
   */
  indexesByPageNum(pageNum: number): { indexStart: number, indexLast: number } {
    const pageNum0 = pageNum > this.pageCount ? this.pageCount : pageNum;
    // ---
    const indexLast = pageNum0 * this.elemsPerPageCount - 1;
    const indexStart = indexLast - this.elemsPerPageCount + 1;
    return {indexStart, indexLast}
  }

  elemsByPageNum(elems: any[], pageNum: number): any[] {
    const {indexStart, indexLast} = this.indexesByPageNum(pageNum);
    return elems.slice(indexStart, indexLast + 1)
  }

}
