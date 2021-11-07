import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringABB } from './RsuvTxStringABB';

const valuesOk = ['aaAA11_', 'a1', '_'];
const valuesKo = [null, NaN, undefined, ' 1', {}, 'a a', '1a^', '1name'];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      const nm = new RsuvTxStringABB(elVal);
      const res: RsuvResultBoolPknz = nm.bnuwIsValid();
      expect(res.success).toEqual(isTrue);
    });
  });
}

describe('RsuvTxStringABB', () => {
  fnVerif(valuesOk, true);
  fnVerif(valuesKo, false);
});
