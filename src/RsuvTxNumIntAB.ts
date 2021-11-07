import _ from 'lodash';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxNumInt } from './RsuvTxNumInt';

/**
 * Представляет целое число большее нуля или равное нулю
 */
export class RsuvTxNumIntAB extends RsuvTxNumInt {
  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (this.val < 0) {
        return new RsuvResultBoolPknz(false, '[[1636279844]]', 'number is < 0');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[1636279706]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
