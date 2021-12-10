import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringABC } from './RsuvTxStringABC';

const valuesOk = ['0', '0011', '1455'];
const valuesKo = [null, NaN, undefined, ' 1', {}, 'a a', '1a^', '1name', '-10'];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      const nm = new RsuvTxStringABC(elVal);
      const res: RsuvResultBoolPknz = nm.bnuwIsValid();
      expect(res.success).toEqual(isTrue);
    });
  });
}

describe('RsuvTxStringABB', () => {
  fnVerif(valuesOk, true);
  fnVerif(valuesKo, false);
});
