const reducer = require('../src/reducer')

describe('Test error throw', () => {
  const input = {
    a: 1,
    b: 2,
    c: 3,
  }
  const map = {
    a: Number,
    b: String,
  }
  test('Should throw an error', (next) => {
    try {
      reducer(input, map, {
        throwErrorOnAlien: true
      })
      next('Should have thrown an error')
    } catch (e) {
      next()
    }
  })

  test('Should not throw an error', (next) => {
    try {
      reducer(input, map, {
        throwErrorOnAlien: false
      })
      next()
    } catch (e) {
      next(e)
    }
  })
})
