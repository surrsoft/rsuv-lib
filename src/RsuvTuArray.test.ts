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

  describe('elemAdd()', () => {

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

  describe('elemUpdate()', () => {
    it('01', () => {
      const arr = ['aa', 'bb', 'cc', 'dd']
      const res = RsuvTuArray.elemUpdate(arr, 'ff', el => el === 'bb')
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'ff', 'cc', 'dd'])
    })
    it('02', () => {
      const arr = ['aa', 'bb', {nx: 2}, 'dd']
      const res = RsuvTuArray.elemUpdate(arr, 'ff', el => el.nx === 2)
      expect(res.success).toEqual(true)
      expect(arr).toStrictEqual(['aa', 'bb', 'ff', 'dd'])
    })
  })

  describe('elemDiap()', () => {
    it('01 всё штатно', () => {
      const arr = ['aa', 'bb', 'cc', 'dd'];
      const res = RsuvTuArray.elemsDiap(arr, 1, 2);
      expect(res?.success).toEqual(true);
      expect(res?.value).toStrictEqual(['bb', 'cc']);
    })
    it('02 всё штатно', () => {
      const arr = ['aa', 'bb', 'cc', 'dd'];
      const res = RsuvTuArray.elemsDiap(arr, 0, 3);
      expect(res?.success).toEqual(true);
      expect(res?.value).toStrictEqual(['aa', 'bb', 'cc', 'dd']);
    })
    it('02-2 всё штатно; одинаковые индексы', () => {
      const arr = ['aa', 'bb', 'cc', 'dd'];
      const res = RsuvTuArray.elemsDiap(arr, 1, 1);
      expect(res?.success).toEqual(true);
      expect(res?.value).toStrictEqual(['bb']);
    })
    it('03 правый индекс слишком большой', () => {
      const arr = ['aa', 'bb', 'cc', 'dd'];
      const res = RsuvTuArray.elemsDiap(arr, 0, 4);
      expect(res?.success).toEqual(false);
    })
    it('04 левый индекс меньше 0', () => {
      const arr = ['aa', 'bb', 'cc', 'dd'];
      const res = RsuvTuArray.elemsDiap(arr, -1, 3);
      expect(res?.success).toEqual(false);
    })
    it('05 правый индекс больше чем левый', () => {
      const arr = ['aa', 'bb', 'cc', 'dd'];
      const res = RsuvTuArray.elemsDiap(arr, 2, 1);
      expect(res?.success).toEqual(false);
    })
  })

  describe('containsAll()', () => {
    it('10', () => {
      const res = RsuvTuArray.containsAll([1, 2, 4], [4, 2])
      expect(res).toEqual(true)
    });
    it('20 во втором массиве есть повторяющиеся элементы, и в первом тоже', () => {
      const res = RsuvTuArray.containsAll([1, 2, 1, 4], [4, 2, 4])
      expect(res).toEqual(true)
    });
    it('30', () => {
      const res = RsuvTuArray.containsAll([1, 2, 4], [14, 12, 14])
      expect(res).toEqual(false)
    });
    it('40 второй массив пустой', () => {
      const res = RsuvTuArray.containsAll([1, 2, 4], [])
      expect(res).toEqual(false)
    });
    it('50 первый массив пустой', () => {
      const res = RsuvTuArray.containsAll([], [1, 2, 4])
      expect(res).toEqual(false)
    });
    it('60 оба массива пусты', () => {
      const res = RsuvTuArray.containsAll([], [])
      expect(res).toEqual(false)
    });
  });

})
