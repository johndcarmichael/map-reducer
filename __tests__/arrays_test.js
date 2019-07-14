const reducer = require('../src/reducer')

describe('ensure the reducer reduces', () => {
  const input = [{
    a: 1,
    b: 2,
    c: 3,
  }, {
    a: 2,
    c: 4,
  }]
  const map = [{
    a: Number,
    b: Number,
  }]
  test('reduce and 1 key with missing values as null', () => {
    const expected = [{
      a: 1,
      b: 2,
    }, {
      a: 2,
      b: null,
    }]
    const result = reducer(input, map, {keepKeys: true})
    expect(result).toEqual(expected)
  })
  test('reduce and 1 key with missing keys removed', () => {
    const expected = [{
      a: 1,
      b: 2,
    }, {
      a: 2,
    }]
    const result = reducer(input, map)
    expect(result).toEqual(expected)
  })
})

describe('ensure the reducer reduces', () => {
  const input = []
  const map = [{
    a: Number,
    b: Number,
  }]
  test('reduce empty array with nothing in return', () => {
    const result = reducer(input, map)
    const expected = []
    expect(result).toEqual(expected)
  })
  test('reduce empty array with 1 object with keys', () => {
    const result = reducer(input, map, {keepKeys: true})
    const expected = [{
      a: null,
      b: null
    }]
    expect(result).toEqual(expected)
  })
})
