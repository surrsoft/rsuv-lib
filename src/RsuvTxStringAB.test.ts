import { RsuvTxStringAB } from './RsuvTxStringAB';
import { testData } from './RsuvTu';
import _ from 'lodash';

describe('RsuvTxStringAA', () => {
  // ---
  const falseIds = [1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  const testData0 = _.clone(testData);
  testData0.forEach((el) => {
    if (falseIds.includes(el.id)) {
      el.res = false;
    }
  })
  // ---
  testData0.forEach(el => {
    it(el.desc, () => {
      if (!el.res) {
        expect(() => {
          new RsuvTxStringAB(el.val as any);
        }).toThrow()
      } else {
        const rts = new RsuvTxStringAB(el.val as any);
        const valid = rts.bnuwIsValid();
        expect(valid.success).toEqual(el.res);
      }
    })
  })
});
