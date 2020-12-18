const reducer = require('../src/reducer')

describe('Test passing null keys through', () => {
  const map = {
    id: Number,
    date: String,
    type: String,
    health: Number,
    wear: Number,
  }

  const baseInput = {
    id: 10,
    date: '1970-01-01',
  }

  const keepKeys = {
    id: null,
    date: null,
    type: null,
    health: null,
    wear: null,
    ...baseInput,
  }

  const defaultOptions = { throwOnAlien: false, allowNullish: true, keepKeys: false, allowNullishKeys: false }

  it('does not alter default behaviour', () => {
    const testInput = {
      id: 10,
      date: '1970-01-01',
      type: 'test',
    }

    expect(reducer(testInput, map, defaultOptions)).toEqual(testInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true })).toEqual({ ...keepKeys, ...testInput })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true, allowNullishKeys: true })).toEqual({
      ...keepKeys,
      type: 'test',
    })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: false, allowNullishKeys: true })).toEqual(testInput)
  })

  it('will pass null keys through', () => {
    const testInput = {
      id: 10,
      date: '1970-01-01',
      type: null,
    }

    expect(reducer(testInput, map, defaultOptions)).toEqual(baseInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true })).toEqual({ ...keepKeys, ...testInput })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true, allowNullishKeys: true })).toEqual({
      ...keepKeys,
    })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: false, allowNullishKeys: true })).toEqual(testInput)
  })

  it('will ignore undefined', () => {
    const testInput = {
      id: 10,
      date: '1970-01-01',
      type: undefined,
    }

    expect(reducer(testInput, map, defaultOptions)).toEqual(baseInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true })).toEqual({
      ...keepKeys,
      id: 10,
      date: '1970-01-01',
    })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true, allowNullishKeys: true })).toEqual({
      ...keepKeys,
      id: 10,
      date: '1970-01-01',
    })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: false, allowNullishKeys: true })).toEqual({
      id: 10,
      date: '1970-01-01',
    })
  })

  it('will not alter behaviour for keys not defined in map', () => {
    const testInput = {
      id: 10,
      date: '1970-01-01',
      test: 10,
    }

    expect(reducer(testInput, map, defaultOptions)).toEqual(baseInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true })).toEqual({ ...keepKeys })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true, allowNullishKeys: true })).toEqual({
      ...keepKeys,
    })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: false, allowNullishKeys: true })).toEqual(baseInput)
  })

  it('handles null', () => {
    const testInput = null

    expect(reducer(testInput, map, defaultOptions)).toEqual(testInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true })).toEqual(testInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true, allowNullishKeys: true })).toEqual(testInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: false, allowNullishKeys: true })).toEqual(testInput)
  })

  it('handles empty object', () => {
    const testInput = {}

    expect(reducer(testInput, map, defaultOptions)).toEqual(testInput)
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true })).toEqual({
      id: null,
      date: null,
      type: null,
      health: null,
      wear: null,
    })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: true, allowNullishKeys: true })).toEqual({
      id: null,
      date: null,
      type: null,
      health: null,
      wear: null,
    })
    expect(reducer(testInput, map, { ...defaultOptions, keepKeys: false, allowNullishKeys: true })).toEqual(testInput)
  })

  it('has no effect on throw on alien', async () => {
    const testInput = {}

    try {
      reducer(testInput, map, { ...defaultOptions, throwOnAlien: true })
      expect(false).toBe(true)
    } catch (e) {}

    try {
      reducer(testInput, map, { ...defaultOptions, throwOnAlien: true, keepKeys: true })
      expect(false).toBe(true)
    } catch (e) {}

    try {
      reducer(testInput, map, { ...defaultOptions, throwOnAlien: true, keepKeys: true, allowNullishKeys: true })
      expect(false).toBe(true)
    } catch (e) {}

    try {
      reducer(testInput, map, { ...defaultOptions, throwOnAlien: true, keepKeys: false, allowNullishKeys: true })
      expect(false).toBe(true)
    } catch (e) {}
  })
})
