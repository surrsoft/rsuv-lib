import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvTxNumIntAB } from './RsuvTxNumIntAB';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { bnuwUtilsThrowIf } from './RsuvBnuwUtils';

/**
 Представление диапазона целых положительных чисел (>= 0), второе число >= первого
 */
export class RsuvTxNumIntDiap implements RsuvBnuwNT {
  constructor(public indexStart: RsuvTxNumIntAB, public indexEnd: RsuvTxNumIntAB) {
    bnuwUtilsThrowIf(this)
  }

  bnuwIsValid(): RsuvResultBoolPknz {
    const ixStart = this.indexStart.val
    const ixEnd = this.indexEnd.val
    // ---
    if (ixStart <= ixEnd) {
      return new RsuvResultBoolPknz()
    }
    return new RsuvResultBoolPknz(false, '[[220107123149]]', `end index must be greater than start index; ixStart ${ixStart}, ixEnd ${ixEnd}`)
  }
}
