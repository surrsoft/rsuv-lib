/**
 * Представляет целое число большее нуля
 */

import _ from 'lodash';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxNumIntAB } from './RsuvTxNumIntAB';

export class RsuvTxNumIntABB extends RsuvTxNumIntAB {
  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (this.val === 0) {
        return new RsuvResultBoolPknz(false, '[[1636280020]]', 'number is === 0');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[1636280025]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
