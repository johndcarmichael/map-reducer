const reducer = require('../src/reducer')

describe('ensure the reducer reduces', () => {
  test('reduce and 1 key', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
    }
    const map = {
      a: Number,
      b: String,
    }
    const expected = {
      a: 1,
    }
    expect(reducer(input, map)).toEqual(expected)
  })

  test('reduce by nested keys', () => {
    const input = {
      name: 'bmw',
      version: '.1.0.0',
      opts: {
        on: false,
        qty: {
          pre: 12,
          post: 10
        }
      },
      prefs: {
        radio: 'off',
        gps: 'on',
        mode: {
          sport: {
            steering: 5,
            sus: false
          },
          normal: {
            steering: 3,
            sus: 'comfort'
          },
          another: [1, 2, 3]
        }
      }
    }

    const map = {
      name: String,
      opts: Object,
      prefs: {
        radio: String,
        mode: {
          sport: {
            steering: Number,
            sus: Boolean
          },
          another: [
            Number
          ]
        }
      }
    }

    const expected = {
      name: 'bmw',
      opts: {
        on: false,
        qty: {
          pre: 12,
          post: 10
        }
      },
      prefs: {
        radio: 'off',
        mode: {
          sport: {
            steering: 5,
            sus: false
          },
          another: [1, 2, 3]
        }
      }
    }
    const calculated = reducer(input, map)
    expect(
      calculated
    ).toEqual(
      expected
    )
  })

  test('reduce and 1 key within numeric array', () => {
    const input = {
      a: 1,
      b: 2,
      c: [{
        d: 'yes',
        e: 'yes',
        f: 'yes'
      }, {
        d: 'yes',
        e: 'yes',
        f: 'yes'
      }]
    }
    const map = {
      a: Number,
      b: Number,
      c: [{
        d: String,
        e: String,
      }, {
        d: String,
        e: String,
      }]
    }
    const expected = {
      a: 1,
      b: 2,
      c: [{
        d: 'yes',
        e: 'yes',
      }, {
        d: 'yes',
        e: 'yes',
      }]
    }
    expect(reducer(input, map)).toEqual(expected)
  })

  test('reduce with numeric array in numeric array', () => {
    const input = {
      a: 1,
      b: 2,
      c: [{
        d: [2, 3, 4],
        a: 1
      }, {
        d: [4, 3, 2],
        e: 'hello i should not be here',
        f: {
          a: 1
        }
      }]
    }
    const map = {
      a: Number,
      b: Number,
      c: [{
        d: [
          Number
        ],
      }]
    }
    const expected = {
      a: 1,
      b: 2,
      c: [{
        d: [2, 3, 4],
      }, {
        d: [4, 3, 2],
      }]
    }
    expect(reducer(input, map)).toEqual(expected)
  })
})
