import { RSUV_T3, RsuvT4, RsuvT5, RsuvT7, stringsTwoInfo, stringsTwoInfoB, substrIndexes } from './RsuvTuString';
import { RsuvTxString } from './RsuvTxString';
import { RsuvResultTibo } from './RsuvResultTibo';

describe('RsuvTuString', () => {
  describe('stringsTwoInfoB()', () => {
    it('01', () => {
      const info: RsuvResultTibo<RsuvT5> = stringsTwoInfoB(new RsuvTxString('AabbaaAaccdd'), new RsuvTxString('aa'))
      expect(info.success).toEqual(true)
      const val: RsuvT5 | undefined = info.value
      // ---
      expect(val?.sensitive.containsCount).toEqual(1);
      expect(val?.sensitive.rsuvT3.length).toEqual(1);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      expect(val?.sensitive.containsIndexes).toEqual([new RsuvT7(4, 6)])
      // ---
      expect(val?.notSensitive.containsCount).toEqual(3);
      expect(val?.notSensitive.rsuvT3.length).toEqual(2);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(true);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      expect(val?.notSensitive.containsIndexes).toEqual([new RsuvT7(0, 2), new RsuvT7(4, 6), new RsuvT7(6, 8),])
    })

    it('полное совпадение', () => {
      const info: RsuvResultTibo<RsuvT5> = stringsTwoInfoB(new RsuvTxString('Aa'), new RsuvTxString('aa'))
      expect(info.success).toEqual(true)
      const val: RsuvT5 | undefined = info.value
      // ---
      expect(val?.sensitive.containsCount).toEqual(0);
      expect(val?.sensitive.rsuvT3.length).toEqual(0);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      expect(val?.sensitive.containsIndexes).toEqual([])
      // ---
      expect(val?.notSensitive.containsCount).toEqual(1);
      expect(val?.notSensitive.rsuvT3.length).toEqual(4);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(true);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(true);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(true);
      expect(val?.notSensitive.containsIndexes).toEqual([new RsuvT7(0, 2)])
    })

    it('длина sub строки больше чем target строки', () => {
      const info: RsuvResultTibo<RsuvT5> = stringsTwoInfoB(new RsuvTxString('aaa'), new RsuvTxString('aaaaaa'))
      expect(info.success).toEqual(true)
      const val: RsuvT5 | undefined = info.value
      // ---
      expect(val?.sensitive.containsCount).toEqual(0);
      expect(val?.sensitive.rsuvT3.length).toEqual(0);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      // ---
      expect(val?.notSensitive.containsCount).toEqual(0);
      expect(val?.notSensitive.rsuvT3.length).toEqual(0);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(false);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
    })

  })

  describe('stringsTwoInfo()', () => {
    it('01, ignoreCase = true', () => {
      const info: RsuvResultTibo<RsuvT4> = stringsTwoInfo(new RsuvTxString('AabbaaAaccdd'), new RsuvTxString('aa'), true)
      expect(info.success).toEqual(true)
      const val: RsuvT4 | undefined = info.value
      expect(val?.containsCount).toEqual(3);
      expect(val?.rsuvT3.length).toEqual(2);
      expect(val?.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(true);
      expect(val?.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      expect(val?.containsIndexes).toEqual([new RsuvT7(0, 2), new RsuvT7(4, 6), new RsuvT7(6, 8),])
    })
    it('01, ignoreCase = false', () => {
      const info: RsuvResultTibo<RsuvT4> = stringsTwoInfo(new RsuvTxString('AabbaaAaccdd'), new RsuvTxString('aa'), false)
      expect(info.success).toEqual(true)
      const val: RsuvT4 | undefined = info.value
      // ---
      expect(val?.containsCount).toEqual(1);
      expect(val?.rsuvT3.length).toEqual(1);
      expect(val?.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      expect(val?.containsIndexes).toEqual([new RsuvT7(4, 6)])
    })

    it('полное совпадение, ignoreCase = true', () => {
      const info: RsuvResultTibo<RsuvT4> = stringsTwoInfo(new RsuvTxString('Aa'), new RsuvTxString('aa'), true)
      expect(info.success).toEqual(true)
      const val: RsuvT4 | undefined = info.value
      // ---
      expect(val?.containsCount).toEqual(1);
      expect(val?.rsuvT3.length).toEqual(4);
      expect(val?.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(true);
      expect(val?.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(true);
      expect(val?.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(true);
      expect(val?.containsIndexes).toEqual([new RsuvT7(0, 2)])
    })

    it('полное совпадение, ignoreCase = false', () => {
      const info: RsuvResultTibo<RsuvT4> = stringsTwoInfo(new RsuvTxString('Aa'), new RsuvTxString('aa'), false)
      expect(info.success).toEqual(true)
      const val: RsuvT4 | undefined = info.value
      // ---
      expect(val?.containsCount).toEqual(0);
      expect(val?.rsuvT3.length).toEqual(0);
      expect(val?.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      expect(val?.containsIndexes).toEqual([])
    })

    it('длина sub строки больше чем target строки, ignoreCase = true', () => {
      const info: RsuvResultTibo<RsuvT4> = stringsTwoInfo(new RsuvTxString('aaa'), new RsuvTxString('aaaaaa'), true)
      expect(info.success).toEqual(true)
      const val: RsuvT4 | undefined = info.value
      // ---
      expect(val?.containsCount).toEqual(0);
      expect(val?.rsuvT3.length).toEqual(0);
      expect(val?.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
    })

    it('длина sub строки больше чем target строки, ignoreCase = false', () => {
      const info: RsuvResultTibo<RsuvT4> = stringsTwoInfo(new RsuvTxString('aaa'), new RsuvTxString('aaaaaa'), false)
      expect(info.success).toEqual(true)
      const val: RsuvT4 | undefined = info.value
      // ---
      expect(val?.containsCount).toEqual(0);
      expect(val?.rsuvT3.length).toEqual(0);
      expect(val?.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
    })

  })


  describe('substrIndexes()', () => {
    it('01 - без учета регистра', () => {
      const nx = substrIndexes('Aabba?aA?accaadd', 'a?a', true)
      expect(nx).toEqual([new RsuvT7(4, 7), new RsuvT7(7, 10)])
    })
    it('02 - с учетом регистра', () => {
      const nx = substrIndexes('Aabba?aA?accaadd', 'a?a', false)
      expect(nx).toEqual([new RsuvT7(4, 7)])
    })
    it('03 - соответствий не найдено', () => {
      const nx = substrIndexes('Aabba?aA?accaadd', 'a1?a', true)
      expect(nx).toEqual([])
    })
    it('04 - пустая строка вторым аргументом', () => {
      const nx = substrIndexes('Aabba?aA?accaadd', '', true)
      expect(nx).toEqual([])
    })
  })

});
