import { RSUV_SPC_ID_PLUG_PREFIX, RsuvTuTree } from './RsuvTuTree';

describe('RsuvTuTree', () => {
  describe('values()', () => {
    it('10 array', () => {
      const obj = [{id: 1, childs: [{id: 3}]}, {id: 2}]
      const res = RsuvTuTree.values(obj, 'id', 'childs')
      expect(res).toContain(1)
      expect(res).toContain(3)
      expect(res).toContain(2)
      expect(res.length).toEqual(3)
    })
    it('20 object', () => {
      const obj = {id: 1, childs: [{id: 3, childs: [{id: 4}]}]}
      const res = RsuvTuTree.values(obj, 'id', 'childs')
      expect(res).toContain(1)
      expect(res).toContain(3)
      expect(res).toContain(4)
      expect(res.length).toEqual(3)
    })
  })

  describe('accum()', () => {
    it('10', () => {
      const arr = [
        {name: 'name1', tags: ['tag1', 'tag2']},
        {name: 'name2', tags: ['tag2', 'tag3']},
      ]
      const res = RsuvTuTree.accum(arr, 'tags', 'name', false);
      expect(res.success).toEqual(true);
      expect(res.value?.length).toEqual(3);
      // ---
      const rr1 = res.value?.find(el => el.value === 'tag1')
      expect(rr1?.ids.length).toEqual(1);
      expect(rr1?.ids).toStrictEqual(['name1'])
      // ---
      const rr2 = res.value?.find(el => el.value === 'tag2')
      expect(rr2?.ids.length).toEqual(2);
      expect(rr2?.ids.includes('name1')).toEqual(true);
      expect(rr2?.ids.includes('name2')).toEqual(true);
      // ---
      const rr3 = res.value?.find(el => el.value === 'tag3')
      expect(rr3?.ids.length).toEqual(1);
      expect(rr3?.ids).toStrictEqual(['name2'])
    })

    it('20 когда тег повторяется в рамках одного элемента; isUniqueIds === false', () => {
      const arr = [
        {name: 'name1', tags: ['tag1', 'tag2', 'tag1']},
        {name: 'name2', tags: ['tag2', 'tag3']},
      ]
      const res = RsuvTuTree.accum(arr, 'tags', 'name', false);
      expect(res.success).toEqual(true);
      expect(res.value?.length).toEqual(3);
      // ---
      const rr1 = res.value?.find(el => el.value === 'tag1')
      expect(rr1?.ids.length).toEqual(2);
      expect(rr1?.ids).toStrictEqual(['name1', 'name1'])
      // ---
      const rr2 = res.value?.find(el => el.value === 'tag2')
      expect(rr2?.ids.length).toEqual(2);
      expect(rr2?.ids.includes('name1')).toEqual(true);
      expect(rr2?.ids.includes('name2')).toEqual(true);
      // ---
      const rr3 = res.value?.find(el => el.value === 'tag3')
      expect(rr3?.ids.length).toEqual(1);
      expect(rr3?.ids).toStrictEqual(['name2'])
    })

    it('20-2 тоже что и 20 только isUniqueIds === true', () => {
      const arr = [
        {name: 'name1', tags: ['tag1', 'tag2', 'tag1']},
        {name: 'name2', tags: ['tag2', 'tag3']},
      ]
      const res = RsuvTuTree.accum(arr, 'tags', 'name', true);
      expect(res.success).toEqual(true);
      expect(res.value?.length).toEqual(3);
      // ---
      const rr1 = res.value?.find(el => el.value === 'tag1')
      expect(rr1?.ids.length).toEqual(1);
      expect(rr1?.ids).toStrictEqual(['name1'])
      // ---
      const rr2 = res.value?.find(el => el.value === 'tag2')
      expect(rr2?.ids.length).toEqual(2);
      expect(rr2?.ids.includes('name1')).toEqual(true);
      expect(rr2?.ids.includes('name2')).toEqual(true);
      // ---
      const rr3 = res.value?.find(el => el.value === 'tag3')
      expect(rr3?.ids.length).toEqual(1);
      expect(rr3?.ids).toStrictEqual(['name2'])
    })


    it('30 когда поле с id не ищется', () => {
      const arr = [
        {name: 'name1', tags: ['tag1', 'tag2']},
        {name: 'name2', tags: ['tag2', 'tag3']},
      ]
      const res = RsuvTuTree.accum(arr, 'tags', 'bad', true);
      expect(res.success).toEqual(true);
      expect(res.value?.length).toEqual(3);
      // ---
      const rr1 = res.value?.find(el => el.value === 'tag1')
      expect(rr1?.ids.length).toEqual(1);
      expect(rr1?.ids).toStrictEqual([RSUV_SPC_ID_PLUG_PREFIX + '0'])
      // ---
      const rr2 = res.value?.find(el => el.value === 'tag2')
      expect(rr2?.ids.length).toEqual(2);
      expect(rr2?.ids.includes(RSUV_SPC_ID_PLUG_PREFIX + '0')).toEqual(true);
      expect(rr2?.ids.includes(RSUV_SPC_ID_PLUG_PREFIX + '1')).toEqual(true);
      // ---
      const rr3 = res.value?.find(el => el.value === 'tag3')
      expect(rr3?.ids.length).toEqual(1);
      expect(rr3?.ids).toStrictEqual([RSUV_SPC_ID_PLUG_PREFIX + '1'])
    })

    it('30-2 когда поле с id не ищется + тег повторяется', () => {
      const arr = [
        {name: 'name1', tags: ['tag1', 'tag2', 'tag1']},
        {name: 'name2', tags: ['tag2', 'tag3']},
      ]
      const res = RsuvTuTree.accum(arr, 'tags', 'bad', false);
      expect(res.success).toEqual(true);
      expect(res.value?.length).toEqual(3);
      // ---
      const rr1 = res.value?.find(el => el.value === 'tag1')
      expect(rr1?.ids.length).toEqual(2);
      expect(rr1?.ids).toStrictEqual([RSUV_SPC_ID_PLUG_PREFIX + '0', RSUV_SPC_ID_PLUG_PREFIX + '0'])
      // ---
      const rr2 = res.value?.find(el => el.value === 'tag2')
      expect(rr2?.ids.length).toEqual(2);
      expect(rr2?.ids.includes(RSUV_SPC_ID_PLUG_PREFIX + '0')).toEqual(true);
      expect(rr2?.ids.includes(RSUV_SPC_ID_PLUG_PREFIX + '1')).toEqual(true);
      // ---
      const rr3 = res.value?.find(el => el.value === 'tag3')
      expect(rr3?.ids.length).toEqual(1);
      expect(rr3?.ids).toStrictEqual([RSUV_SPC_ID_PLUG_PREFIX + '1'])
    })

    it('30-2-2 тоже что 30-2 только isUniqueIds === true', () => {
      const arr = [
        {name: 'name1', tags: ['tag1', 'tag2', 'tag1']},
        {name: 'name2', tags: ['tag2', 'tag3']},
      ]
      const res = RsuvTuTree.accum(arr, 'tags', 'bad', true);
      expect(res.success).toEqual(true);
      expect(res.value?.length).toEqual(3);
      // ---
      const rr1 = res.value?.find(el => el.value === 'tag1')
      expect(rr1?.ids.length).toEqual(1);
      expect(rr1?.ids).toStrictEqual([RSUV_SPC_ID_PLUG_PREFIX + '0'])
      // ---
      const rr2 = res.value?.find(el => el.value === 'tag2')
      expect(rr2?.ids.length).toEqual(2);
      expect(rr2?.ids.includes(RSUV_SPC_ID_PLUG_PREFIX + '0')).toEqual(true);
      expect(rr2?.ids.includes(RSUV_SPC_ID_PLUG_PREFIX + '1')).toEqual(true);
      // ---
      const rr3 = res.value?.find(el => el.value === 'tag3')
      expect(rr3?.ids.length).toEqual(1);
      expect(rr3?.ids).toStrictEqual([RSUV_SPC_ID_PLUG_PREFIX + '1'])
    })

    it('40 числа', () => {
      const arr = [
        {name: 1, tags: [10, 'tag2']},
        {name: 2, tags: ['tag2', 10]},
      ]
      const res = RsuvTuTree.accum(arr, 'tags', 'name', true);
      expect(res.success).toEqual(true);
      expect(res.value?.length).toEqual(2);
      // ---
      const rr1 = res.value?.find(el => el.value === '10')
      expect(rr1?.ids.length).toEqual(2);
      expect(rr1?.ids.includes('1')).toEqual(true)
      expect(rr1?.ids.includes('2')).toEqual(true)
      // ---
      const rr2 = res.value?.find(el => el.value === 'tag2')
      expect(rr2?.ids.length).toEqual(2);
      expect(rr2?.ids.includes('1')).toEqual(true);
      expect(rr2?.ids.includes('2')).toEqual(true);
    })

  })
})
