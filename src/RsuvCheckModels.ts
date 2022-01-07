/*
Сущности для работы с checked-списками (списки хранящие информацию о том какой элемент чекнут, какой нет)

[[ecxm]] - массив из [gnpw]-объектов или пустой массив
[[gnpw]] - объект вида {id: string, checked: boolean}
 */

import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { bnuwUtilsVerifyMulti } from './RsuvBnuwUtils';
import { RsuvTxBoolean } from './RsuvTxBoolean';
import { RsuvTxStringAB } from './RsuvTxStringAB';

/**
 * Вместо этого типа нужно передавать тип UnwrapRef<RsuvCheckModelGnpw[]>, т.е. value из ref сделанного на RsuvCheckModelGnpw[]
 * <code lang="js">
 *   ref([new RsuvCheckModelGnpw('1', false)]).value
 * </code>
 */
export type RsuvT1 = any[]

export class RsuvEcxm {
  static find(models: RsuvT1, id: string) {
    return models.find((model: RsuvCheckModelGnpw) => model.id === id);
  }

  /**
   * Добавляет новый элемент (2) в конец (1)
   * @param modelsBack (1) --
   * @param model
   */
  static append(modelsBack: RsuvT1, model: RsuvCheckModelGnpw): RsuvResultBoolPknz {
    const fModel = RsuvEcxm.find(modelsBack, model.id);
    if (fModel) {
      return new RsuvResultBoolPknz(false, '[[210712155908]]', 'already exist');
    }
    modelsBack.push(model);
    return new RsuvResultBoolPknz(true);
  }

  static appendMulti(modelsBack: RsuvT1, models: RsuvCheckModelGnpw[]): RsuvResultBoolPknz[] {
    const ret: RsuvResultBoolPknz[] = [];
    models.forEach(model => {
      const res = RsuvEcxm.append(modelsBack, model);
      if (!res.success) {
        ret.push(res);
      }
    });
    return ret;
  }

  static update(modelsBack: RsuvT1, model: RsuvCheckModelGnpw): RsuvResultBoolPknz {
    const elem = RsuvEcxm.find(modelsBack, model.id);
    if (elem) {
      elem.checked = model.checked;
      return new RsuvResultBoolPknz(true);
    }
    return new RsuvResultBoolPknz(false, '[[210712160222]]', 'not finded');
  }

  static updateMulti(modelsBack: RsuvT1, models: RsuvCheckModelGnpw[]): RsuvResultBoolPknz[] {
    const ret: RsuvResultBoolPknz[] = [];
    models.forEach(model => {
      const res = RsuvEcxm.update(modelsBack, model);
      if (!res.success) {
        ret.push(res);
      }
    });
    return ret;
  }

  static delete(modelsBack: RsuvT1, model: RsuvCheckModelGnpw): RsuvResultBoolPknz {
    const index = modelsBack.findIndex((elModel: RsuvCheckModelGnpw) => elModel.id === model.id);
    if (index !== -1) {
      modelsBack.splice(index, 1);
      return new RsuvResultBoolPknz(true);
    }
    return new RsuvResultBoolPknz(false, '[[210712160441]]', 'not finded');
  }

  static deleteMulti(modelsBack: RsuvT1, models: RsuvCheckModelGnpw[]): RsuvResultBoolPknz[] {
    const ret: RsuvResultBoolPknz[] = [];
    models.forEach(model => {
      const res = RsuvEcxm.delete(modelsBack, model);
      if (!res.success) {
        ret.push(res);
      }
    });
    return ret;
  }

  static filter(models: RsuvT1, checked: boolean) {
    return models.filter((elModel: RsuvCheckModelGnpw) => elModel.checked === checked);
  }

  static inverse(modelsBack: RsuvT1) {
    modelsBack.forEach((elModel: RsuvCheckModelGnpw) => elModel.checked = !elModel.checked);
  }

  static selectAll(modelsBack: RsuvT1) {
    modelsBack.forEach((elModel: RsuvCheckModelGnpw) => {
      if (!elModel.checked) {
        elModel.checked = true;
      }
    })
  }

  static deselectAll(modelsBack: RsuvT1) {
    modelsBack.forEach((elModel: RsuvCheckModelGnpw) => {
      if (elModel.checked) {
        elModel.checked = false;
      }
    })
  }
}


/**
 * Представление [gnpw]
 */
export class RsuvCheckModelGnpw implements RsuvBnuwNT {

  constructor(public id: string = '', public checked: boolean = false) {
  }

  bnuwIsValid(): RsuvResultBoolPknz {
    const res = bnuwUtilsVerifyMulti([new RsuvTxStringAB(this.id), new RsuvTxBoolean(this.checked)])
    if (res.length > 0) {
      return res[0]
    }
    return new RsuvResultBoolPknz(true)
  }
}
