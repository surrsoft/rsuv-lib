/*
 * Представляет boolean
 */

import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import _ from 'lodash';
import { bnuwUtilsThrowIf } from './RsuvBnuwUtils';


export class RsuvTxBoolean implements RsuvBnuwNT {
  constructor(public val: boolean) {
    bnuwUtilsThrowIf(this);
  }

  bnuwIsValid(): RsuvResultBoolPknz {
    try {
      if (!_.isBoolean(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210711220826]]', 'is not boolean')
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210705185560]]', (err as Error).message)
    }
    return new RsuvResultBoolPknz(true);
  }
}
