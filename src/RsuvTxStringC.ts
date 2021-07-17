/*
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов) И (не начинается с пробела/переноса)
 * И (не заканчивается пробелом/переносом)
 */

import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringB } from './RsuvTxStringB';

export class RsuvTxStringC extends RsuvTxStringB {

  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (/^\s/.test(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210705191717]]', 'started with whitespace');
      }
      if (/\s$/.test(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210705191826]]', 'ended with whitespace');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210705191508]]', err.message);
    }
    return new RsuvResultBoolPknz(true);
  }
}