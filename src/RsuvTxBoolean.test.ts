import { RsuvTxBoolean } from './RsuvTxBoolean';

const valuesOk = [true, false];
const valuesKo = [
  'true',
  'false',
  1.1,
  1.00000001,
  NaN,
  null,
  undefined,
  '1',
  Infinity,
  +Infinity,
  -Infinity,
  {a: 1},
  {},
  9999999999999999,
];

function fnVerif(values: any, isTrue: boolean) {
  values.forEach((elVal: any) => {
    it(`val [${elVal}] isTrue [${isTrue}]`, () => {
      if (!isTrue) {
        expect(() => {
          new RsuvTxBoolean(elVal);
        }).toThrow()
      } else {
        const res = new RsuvTxBoolean(elVal);
        expect(res.val).toEqual(elVal)
      }
    });
  });
}

describe('RsuvTxBoolean', () => {

  fnVerif(valuesOk, true);
  fnVerif(valuesKo, false);

});
