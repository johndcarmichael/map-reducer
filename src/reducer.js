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
      reducerWalk(input, map, inputMaster)
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
const reducerWalk = (input, map, inputMaster) => {
  for (let i = 0; i < input.length; ++i) {
    innerCompare(input[i], map[0], i, inputMaster)
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
  Object.keys(input).forEach(function (item) {
    innerCompare(input[item], map[item], input, item)
  })
  return input
}

const injectMissingKeys = (input, map) => {
  Object.keys(map).forEach(function (key) {
    let mapType = getType(map[key])
    if (typeof input[key] === 'undefined') {
      switch (mapType) {
        case 'object':
          if (Object.keys(map[key]).length > 0) {
            input[key] = {}
            break
          }
        case 'array':
          if (map[key].length > 0) {
            input[key] = {}
            break
          }
        default:
          input[key] = null
      }
    }
    if (['object', 'array'].indexOf(mapType) !== -1) {
      injectMissingKeys(input[key], map[key])
    }
  })
  return input
}

module.exports = (input, map, options) => {
  input = reducer(input, map, options)
  if (savedOpts.keepKeys) {
    // At this point we have retained all keys as null wherein the said leaf data type was incorrect
    // The missing keys should now be re-injected
    input = injectMissingKeys(input, map)
  }
  return input
}
