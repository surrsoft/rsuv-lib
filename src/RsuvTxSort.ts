import { RsuvTxStringAC } from './RsuvTxStringAC';
import { RsuvEnSort } from './RsuvEnSort';


/**
 * Представление сортировки чего-либо абстрактного, обозначенного идентификатором
 */
export class RsuvTxSort {

  /**
   *
   * @param id (1) -- условный идентификатор
   * @param sortDirect (2) -- направление сортировки
   * @throws Error если идентификатор (1) невалиден
   */
  constructor(public id: RsuvTxStringAC, public sortDirect: RsuvEnSort) {
    // --- id verify
    const validRes = id.bnuwIsValid();
    if (!validRes.success) {
      throw new Error(validRes.errCode + ' : ' + validRes.errMessage)
    }
    // ---
  }

}
