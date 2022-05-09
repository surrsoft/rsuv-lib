import { RsuvTuTree } from './RsuvTuTree';

describe('RsuvTuTree', () => {
  it('values() 1 array', () => {
    const obj = [{id: 1, childs: [{id: 3}]}, {id: 2}]
    const res = RsuvTuTree.values(obj, 'id', 'childs')
    expect(res).toContain(1)
    expect(res).toContain(3)
    expect(res).toContain(2)
    expect(res.length).toEqual(3)
  })
  it('values() 2 object', () => {
    const obj = {id: 1, childs: [{id: 3, childs: [{id: 4}]}]}
    const res = RsuvTuTree.values(obj, 'id', 'childs')
    expect(res).toContain(1)
    expect(res).toContain(3)
    expect(res).toContain(4)
    expect(res.length).toEqual(3)
  })
})
