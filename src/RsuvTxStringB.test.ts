import { RsuvTxStringB } from './RsuvTxStringB';
import { testData } from './RsuvTu';
import _ from 'lodash';

describe('RsuvTxStringB', () => {
  // ---
  const falseIds = [1, 2, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 27]
  const testData0 = _.clone(testData);
  testData0.forEach((el) => {
    if (falseIds.includes(el.id)) {
      el.res = false;
    }
  })
  // ---
  testData0.forEach(el => {
    it(el.desc, () => {
      const rts = new RsuvTxStringB(el.val as any)
      const valid = rts.bnuwIsValid()
      expect(valid.success).toEqual(el.res);
    })
  })
});
