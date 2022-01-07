import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxString } from './RsuvTxString';

/**
 * Представляет строку которая: (не нулевой длины) И (не содержит пробелов/переносов)
 */
export class RsuvTxStringAB extends RsuvTxString {
  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      const res = super.bnuwIsValid();
      if (!res.success) {
        return res;
      }
      // ---
      if (/\s/.test(this.val)) {
        return new RsuvResultBoolPknz(
          false,
          '[[210706092510]]',
          'includes whitespace(s)'
        );
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[210706092135]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
