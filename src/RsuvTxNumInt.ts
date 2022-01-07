import _ from 'lodash';
import { RsuvBnuwNT } from '.';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { bnuwUtilsThrowIf } from './RsuvBnuwUtils';

/**
 * Представляет целое число, положительное, отрицательное, ноль, но не дробное, NaN, Infinity и т.п.
 */
export class RsuvTxNumInt implements RsuvBnuwNT {
  constructor(public val: number) {
    bnuwUtilsThrowIf(this)
  }

  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      if (!this.val && this.val !== 0) {
        return new RsuvResultBoolPknz(false, '[[1636272243]]', 'is falsy');
      }
      if (!_.isFinite(this.val)) {
        return new RsuvResultBoolPknz(false, '[[1636272327]]', 'is not number');
      }
      if (!_.isSafeInteger(this.val)) {
        return new RsuvResultBoolPknz(
          false,
          '[[1636272328]]',
          'is not integer'
        );
      }
    } catch (error) {
      return new RsuvResultBoolPknz(
        false,
        '[[1636279573]]',
        (error as Error).message
      );
    }
    return new RsuvResultBoolPknz(true);
  }
}
