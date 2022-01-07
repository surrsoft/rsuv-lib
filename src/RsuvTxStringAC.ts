import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxString } from './RsuvTxString';

/**
 * Представляет строку которая: (не нулевой длины) И (состоит только из символов [a-zA-Z0-9_])
 *
 * ID [[1636807311]]
 * @implements RsuvBnuwNT
 */
export class RsuvTxStringAC extends RsuvTxString {
  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (!/^[a-zA-Z0-9_]+$/.test(this.val)) {
        return new RsuvResultBoolPknz(
          false,
          '[[1636300398]]',
          'allowable only [a-zA-Z0-9_] symbols'
        );
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[1636300404]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
