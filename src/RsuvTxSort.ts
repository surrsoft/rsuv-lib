import { RsuvTxStringAB } from './RsuvTxStringAB';
import { RsuvEnSort } from './RsuvEnSort';


/**
 * Представление сортировки чего-либо абстрактного, обозначенного идентификатором
 */
export class RsuvTxSort {

  /**
   * Бросает исключение если идентификатор (1) невалиден
   *
   * @param id (1) -- условный идентификатор
   * @param sortDirect (2) -- направление сортировки
   */
  constructor(public id: RsuvTxStringAB, public sortDirect: RsuvEnSort) {
    // --- id verify
    const validRes = id.bnuwIsValid();
    if (!validRes.success) {
      throw new Error(validRes.errCode + ' : ' + validRes.errMessage)
    }
    // ---
  }

}
