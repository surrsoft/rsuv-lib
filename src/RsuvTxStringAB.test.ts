import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringAB } from './RsuvTxStringAB';

const valuesOk = ['aaAA11_', '1', '_'];
const valuesKo = [null, NaN, undefined, ' 1', {}, 'a a', '1a^'];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      const nm = new RsuvTxStringAB(elVal);
      const res: RsuvResultBoolPknz = nm.bnuwIsValid();
      expect(res.success).toEqual(isTrue);
    });
  });
}

describe('RsuvTxStringAB', () => {
  fnVerif(valuesOk, true);
  fnVerif(valuesKo, false);
});
