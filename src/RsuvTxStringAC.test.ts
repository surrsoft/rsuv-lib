import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringAC } from './RsuvTxStringAC';

const valuesOk = ['aaAA11_', '1', '_'];
const valuesKo = [null, NaN, undefined, ' 1', {}, 'a a', '1a^'];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      if (!isTrue) {
        expect(() => {
          new RsuvTxStringAC(elVal);
        }).toThrow()
      } else {
        const nm = new RsuvTxStringAC(elVal);
        const res: RsuvResultBoolPknz = nm.bnuwIsValid();
        expect(res.success).toEqual(isTrue);
      }
    });
  });
}

describe('RsuvTxStringAB', () => {
  fnVerif(valuesOk, true);
  fnVerif(valuesKo, false);
});
