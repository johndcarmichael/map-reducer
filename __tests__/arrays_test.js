const reducer = require('../src/reducer')

describe('ensure the reducer reduces', () => {
  test('reduce and 1 key', () => {
    const input = [{
      a: 1,
      b: 2,
      c: 3,
    }, {
      a: 2,
      b: 3,
      c: 4,
    }]
    const map = [{
      a: Number,
      b: Number,
    }]
    const expected = [{
      a: 1,
      b: 2,
    }, {
      a: 2,
      b: 3,
    }]
    const result = reducer(input, map)
    console.log(result)
    expect(result).toEqual(expected)
  })
})
