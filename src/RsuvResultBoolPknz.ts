
/**
 * [[pknz]]
 *
 * представление результата вида "успех/не-успех"
 *
 * СМ. ТАКЖЕ: [220108130347]
 */
export class RsuvResultBoolPknz {

  constructor(readonly success: boolean = true, readonly errCode: string = '', readonly errMessage: string = '') {
  }

  /**
   * Возвращает информацию о том какие элементы из (1) являются {success: true, ...} а какие {success: false, ...}
   * @param elems (1) --
   */
  static infoMulti(elems: RsuvResultBoolPknz[]): RsuvT2 {
    const ret = {success: [], notSuccess: []} as RsuvT2
    elems.forEach((el) => {
      if (el.success) {
        ret.success.push(el)
      } else {
        ret.notSuccess.push(el)
      }
    })
    return ret
  }

  /**
   * Возвращает TRUE если ВСЕ элементы (1) являются {success: true, ...}.
   * Если elems это пустой массив, то возвращает FALSE
   * @param elems (1) --
   */
  static successAllIsSugar(elems: RsuvResultBoolPknz[]): RsuvResultBoolPknz {
    const info: RsuvT2 = RsuvResultBoolPknz.infoMulti(elems)
    const b1 = info.notSuccess.length === 0 && info.success.length > 0
    if (b1) {
      return new RsuvResultBoolPknz(true)
    }
    if (info.notSuccess.length > 0) {
      return info.notSuccess[0]
    }
    return new RsuvResultBoolPknz(false, '[[210725095419]]', '')
  }
}

export type RsuvT2 = {
  success: RsuvResultBoolPknz[],
  notSuccess: RsuvResultBoolPknz[]
}
