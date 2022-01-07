import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringACB } from './RsuvTxStringACB';

const valuesOk = ['aaAA11_', 'a1', '_'];
const valuesKo = [null, NaN, undefined, ' 1', {}, 'a a', '1a^', '1name'];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      if (!isTrue) {
        expect(() => {
          new RsuvTxStringACB(elVal);
        }).toThrow()
      } else {
        const nm = new RsuvTxStringACB(elVal);
        const res: RsuvResultBoolPknz = nm.bnuwIsValid();
        expect(res.success).toEqual(isTrue);
      }
    });
  });
}

describe('RsuvTxStringABB', () => {
  fnVerif(valuesOk, true);
  fnVerif(valuesKo, false);
});
