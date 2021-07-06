/*
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов)
 */

import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxString } from './RsuvTxString';
import { isEmptyOrWhitespaces } from './RsuvTuString';

export class RsuvTxStringB extends RsuvTxString {

  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid()
      if (!res.success) {
        return res
      }
      // ---
      if (isEmptyOrWhitespaces(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210705191242]]', 'contains only whitespaces')
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210705190613]]', err.message)
    }
    return new RsuvResultBoolPknz(true);
  }
}
