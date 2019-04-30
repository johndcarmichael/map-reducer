let savedOpts

const getType = (a) => {
  if (typeof a === 'function') {
    if (a === Object) {
      return 'object'
    } else if (a === Array) {
      return 'array'
    } else if (a === String) {
      return 'string'
    } else if (a === Number) {
      return 'number'
    } else if (a === Boolean) {
      return 'boolean'
    }
  }
  if (a === null) {
    return 'null'
  } else if (Array.isArray(a)) {
    return 'array'
  } else if (typeof a === 'object') {
    return 'object'
  }
  // Catch all
  return typeof a
}
const innerCompare = (input, map, inputMaster, key) => {
  if (Array.isArray(input)) {
    if (getType(map) === 'array') {
      if (typeof map === 'function') {
        return
      }
      reducerWalk(input, map)
    }
  } else if (typeof input === 'object') {
    if (getType(map) === 'object') {
      if (typeof map === 'function') {
        return
      }
      reducer(input, map)
    }
  }
  if (typeof map === 'undefined') {
    delete inputMaster[key]
  } else if (getType(map) !== getType(input)) {
    if (savedOpts.keepKeys) {
      inputMaster[key] = null
    } else {
      delete inputMaster[key]
    }
  }
}
const reducerWalk = (input, map) => {
  for (let i = 0; i < input.length; ++i) {
    innerCompare(input[i], map[0], i)
  }
}

/**
 * Reduce the input object to match the structure of the map.
 * Optional pass the options object
 * @param {object} input An object (or array) to reduce
 * @param {object} map An object (or array) to compare during reduction
 * @param {object} options An object of options
 *                 {keepKeys: Boolean} This ensure all keys in the map are returned with their values or null
 * @returns {*}
 */
const reducer = (input, map, options) => {
  savedOpts = options || savedOpts || {}
  for (let key in input) {
    innerCompare(input[key], map[key], input, key)
  }
  return input
}

module.exports = reducer
