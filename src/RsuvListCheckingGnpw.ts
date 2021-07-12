/*
[[gnpw]]
 */

import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { bnuwUtilsVerifyMulti } from './RsuvBnuwUtils';
import { RsuvTxBoolean } from './RsuvTxBoolean';
import { RsuvTxStringAA } from './RsuvTxStringAA';

export class RsuvListCheckingGnpw implements RsuvBnuwNT {
  models: RsuvCheckModel001[] = []

  appendMulti(modelsAppending: RsuvCheckModel001[]): RsuvResultBoolPknz {
    const nx = bnuwUtilsVerifyMulti(modelsAppending)
    if (nx.length > 0) {
      return nx[0]
    }
    this.models = [...this.models, ...modelsAppending]
    return new RsuvResultBoolPknz(true)
  }

  remove(id: string): RsuvResultBoolPknz {
    const elIndex = this.models.findIndex(el => el.id === id)
    if (elIndex === -1) {
      return new RsuvResultBoolPknz(false, '[[210712084138]]', `not finded elem with id [${id}]`)
    }
    this.models.splice(elIndex, 1);
    return new RsuvResultBoolPknz(true)
  }

  update(id: string, checked: boolean): RsuvResultBoolPknz {
    const el = this.find(id)
    if (!el) {
      return new RsuvResultBoolPknz(false, '[[210712083247]]', `not finded elem with id [${id}]`)
    }
    el.checked = checked
    return new RsuvResultBoolPknz(true)
  }

  /**
   *
   * @param id
   * @return undefined если не находит
   */
  find(id: string) {
    return this.models.find(el => el.id === id)
  }

  bnuwIsValid(): RsuvResultBoolPknz {
    const nx = bnuwUtilsVerifyMulti(this.models)
    if (nx.length > 0) {
      return nx[0]
    }
    return new RsuvResultBoolPknz(true)
  }
}

export class RsuvCheckModel001 implements RsuvBnuwNT {
  id: string = ''
  checked: boolean = false

  bnuwIsValid(): RsuvResultBoolPknz {
    const res = bnuwUtilsVerifyMulti([new RsuvTxStringAA(this.id), new RsuvTxBoolean(this.checked)])
    if (res.length > 0) {
      return res[0]
    }
    return new RsuvResultBoolPknz(true)
  }
}
