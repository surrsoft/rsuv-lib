import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxNumInt } from './RsuvTxNumInt';

const valuesOk = [1, 100, 0, +0, -0, -1, -100, 1.0, 1.0, 999999999999999];
const valuesKo = [
  1.1,
  1.00000001,
  NaN,
  null,
  undefined,
  '1',
  Infinity,
  +Infinity,
  -Infinity,
  { a: 1 },
  {},
  9999999999999999, // слишком большое целое число
];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      const nm = new RsuvTxNumInt(elVal);
      const res: RsuvResultBoolPknz = nm.bnuwIsValid();
      expect(res.success).toEqual(isTrue);
    });
  });
}

describe('RsuvTxNumInt', () => {
  fnVerif(valuesOk, true);
  fnVerif(valuesKo, false);
});
