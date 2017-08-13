import { expect } from 'chai'
import objectUnique from 'lib/object-unique'

describe('test ob object-unique function', () => {
  it('should uniqify objects', () => {
    const arr1 = [{ id : 1, value : 'a' }, { id : 2, value : 'b' }]
    const arr2 = [{ id : 2, value : 'c' }, { id : 3, value : 'd' }]
    expect(objectUnique(arr1, arr2)).to.deep.equal([
      { id : 1, value : 'a' },
      { id : 2, value : 'c' },
      { id : 3, value : 'd' },
    ])
  })

  it('should return empty array', () => {
    expect(objectUnique(undefined)).to.deep.equal([])
  })
})
