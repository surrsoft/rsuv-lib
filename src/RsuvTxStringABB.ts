import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringAB } from './RsuvTxStringAB';

/**
 * Представляет строку которая: (не нулевой длины) И (состоит только из символов [a-zA-Z0-9_]) И (начинается не с цифры)
 */
export class RsuvTxStringABB extends RsuvTxStringAB {
  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (/^[0-9]$/.test(this.val[0])) {
        return new RsuvResultBoolPknz(
          false,
          '[[1636301354]]',
          'first number is not allowable'
        );
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[1636301361]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
