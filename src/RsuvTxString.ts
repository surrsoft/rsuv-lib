import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import _ from 'lodash';
import { bnuwUtilsThrowIf } from './RsuvBnuwUtils';

/**
 * Представляет строку не нулевой длины
 *
 * ID [[1636807341]]
 *
 * @implements RsuvBnuwNT
 */
export class RsuvTxString implements RsuvBnuwNT {
  constructor(public val: string) {
    bnuwUtilsThrowIf(this)
  }

  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      if (!this.val) {
        return new RsuvResultBoolPknz(false, '[[210705185504]]', 'is falsy');
      }
      if (!_.isString(this.val)) {
        return new RsuvResultBoolPknz(
          false,
          '[[210706090804]]',
          'is not string'
        );
      }
      if (this.val.length < 1) {
        return new RsuvResultBoolPknz(false, '[[210705185559]]', 'length < 1');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(
        false,
        '[[210705185560]]',
        (err as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
