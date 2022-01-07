import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringAC } from './RsuvTxStringAC';

/**
 * Представляет строку которая: (не нулевой длины) И (состоит только из символов [0-9] т.е. только из цифр)
 *
 * ID [[211210125644]]
 * @implements RsuvBnuwNT
 */
export class RsuvTxStringACC extends RsuvTxStringAC {
  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (!/^[0-9]+$/.test(this.val)) {
        return new RsuvResultBoolPknz(
          false,
          '[[211210125801]]',
          'only numbers allowable'
        );
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[211210125818]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
