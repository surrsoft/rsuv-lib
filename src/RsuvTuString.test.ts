import { RSUV_T3, RsuvT5, stringsTwoInfo } from './RsuvTuString';
import { RsuvTxString } from './RsuvTxString';
import { RsuvResultTibo } from './RsuvResultTibo';

describe('RsuvTuString', () => {
  describe('stringsTwoInfo()', () => {

    it('01', () => {
      const info: RsuvResultTibo<RsuvT5> = stringsTwoInfo(new RsuvTxString('AabbaaAaccdd'), new RsuvTxString('aa'))
      expect(info.success).toEqual(true)
      const val: RsuvT5 | undefined = info.value
      // ---
      expect(val?.sensitive.containsCount).toEqual(1);
      expect(val?.sensitive.rsuvT3.length).toEqual(1);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.sensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
      // ---
      expect(val?.notSensitive.containsCount).toEqual(3);
      expect(val?.notSensitive.rsuvT3.length).toEqual(2);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.CONTAINS)).toEqual(true);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.ENDED)).toEqual(false);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.STARTED)).toEqual(true);
      expect(val?.notSensitive.rsuvT3.includes(RSUV_T3.COMPLETE_MATCH)).toEqual(false);
    })
  })

  it('длина sub строки больше чем target строки', () => {
    const info: RsuvResultTibo<RsuvT5> = stringsTwoInfo(new RsuvTxString('aaa'), new RsuvTxString('aaaaaa'))
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

  it('невалидный второй аргумент', () => {
    const info: RsuvResultTibo<RsuvT5> = stringsTwoInfo(new RsuvTxString('AabbaaAaccdd'), new RsuvTxString(''))
    expect(info.success).toEqual(false)
    const val: RsuvT5 | undefined = info.value
    expect(val).toBeUndefined()
  })
});
