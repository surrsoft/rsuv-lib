import { RsuvTuArray } from './RsuvTuArray';

describe('RsuvTuArray', () => {
  describe('elemMove()', () => {

    it('01 indexFrom больше indexTo', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemMove(arr, 2, 1)
      expect(res.success).toEqual(true)
      expect(res.codeNum).toEqual(0)
      expect(arr).toStrictEqual(['aa', 'cc', 'bb', 'dd'])
    })

    it('01-02 indexFrom больше indexTo', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemMove(arr, 3, 0)
      expect(res.success).toEqual(true)
      expect(res.codeNum).toEqual(0)
      expect(arr).toStrictEqual(['dd', 'aa', 'bb', 'cc'])
    })

    it('01b indexFrom меньше indexTo', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemMove(arr, 1, 2)
      expect(res.success).toEqual(true)
      expect(res.codeNum).toEqual(0)
      expect(arr).toStrictEqual(['aa', 'cc', 'bb', 'dd'])
    })

    it('01b-02 indexFrom меньше indexTo', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemMove(arr, 0, 3)
      expect(res.success).toEqual(true)
      expect(res.codeNum).toEqual(0)
      expect(arr).toStrictEqual(['bb', 'cc', 'dd', 'aa'])
    })

    it('02 несуществующий индекс indexFrom', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemMove(arr, 20, 1)
      expect(res.success).toEqual(false)
      expect(arr).toStrictEqual(['aa', 'bb', 'cc', 'dd'])
    })

    it('03 одинаковые индексы', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemMove(arr, 1, 1)
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'bb', 'cc', 'dd'])
    })

  })

  // ---

  describe('elemMove()', () => {

    it('01 добавление в середину', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemAdd(arr, 1, 'xx')
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'xx', 'bb', 'cc', 'dd'])
    })

    it('02 добавление в конец', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemAdd(arr, 4, 'xx')
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'bb', 'cc', 'dd', 'xx'])
    })

    it('03 неверный индекс', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemAdd(arr, 5, 'xx')
      expect(res.success).toEqual(false)
      expect(arr).toStrictEqual(['aa', 'bb', 'cc', 'dd'])
    })


  })

  // ---
  describe('elemsSwap()', () => {
    it('01', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemsSwap(arr, 1, 3)
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'dd', 'cc', 'bb'])
    })

    it('01 индекс 2 больше индекса 2', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemsSwap(arr, 3, 1)
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'dd', 'cc', 'bb'])
    })

    it('02 неверный индекс 1', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemsSwap(arr, 10, 3)
      expect(res.success).toEqual(false)
      expect(arr).toStrictEqual(['aa', 'bb', 'cc', 'dd'])
    })
  })

  // ---
  describe('elemDelete()', () => {
    it('01', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemDelete(arr, 1)
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'cc', 'dd'])
    })
    it('02 неверный индекс', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemDelete(arr, 10)
      expect(res.success).toEqual(false)
      expect(arr).toStrictEqual(['aa', 'bb', 'cc', 'dd'])
    })

  })

})
