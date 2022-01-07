import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringACC } from './RsuvTxStringACC';

const valuesOk = ['0', '0011', '1455'];
const valuesKo = [null, NaN, undefined, ' 1', {}, 'a a', '1a^', '1name', '-10'];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      if (!isTrue) {
        expect(() => {
          new RsuvTxStringACC(elVal);
        }).toThrow()
      } else {
        const nm = new RsuvTxStringACC(elVal);
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
