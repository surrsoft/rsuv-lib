import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { bnuwUtilsThrowIf } from './RsuvBnuwUtils';

/**
 * Представление для имени поля объекта, как единичного, так и составного через точку '.' (в lodash стиле).
 * Примеры: 'name', 'user.profile', 'users.0.name'
 */
export class RsuvTxFieldNameLodash implements RsuvBnuwNT {
  constructor(public val: string) {
    bnuwUtilsThrowIf(this)
  }

  bnuwIsValid(): RsuvResultBoolPknz {
    if (this.val) {
      return new RsuvResultBoolPknz()
    }
    return new RsuvResultBoolPknz(false, '[[220509121136]]')
  }

}
