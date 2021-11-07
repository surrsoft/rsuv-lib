import _ from 'lodash';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxNumInt } from './RsuvTxNumInt';

/**
 * Представляет целое число большее нуля, или равное нулю или равное -1
 */
export class RsuvTxNumIntAC extends RsuvTxNumInt {
  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (this.val < -1) {
        return new RsuvResultBoolPknz(
          false,
          '[[1636280874]]',
          'number is < -1'
        );
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[1636280879]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
