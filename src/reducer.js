let savedOpts

/**
 * Returns the type of the first param given
 * @param a
 * @return {string|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
const getType = (a) => {
  if (typeof a === 'function') {
    if (a === Object || a === 'Object') {
      return 'object'
    } else if (a === Array || a === 'Array') {
      return 'array'
    } else if (a === String || a === 'String') {
      return 'string'
    } else if (a === Number || a === 'Number') {
      return 'number'
    } else if (a === Boolean || a === 'Boolean') {
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

/**
 *
 * @param input
 * @param map
 * @param inputMaster
 * @param key
 */
let alienFound = false
const innerCompare = (input, mapItem, inputMaster, key) => {
  // recursively iterate of the array found
  if (Array.isArray(input)) {
    if (getType(mapItem) === 'array') {
      if (typeof mapItem === 'function') {
        return
      }
      reducerWalk(input, mapItem, inputMaster)
    }
  }
  // recursively walk over the object found
  else if (typeof input === 'object') {
    if (getType(mapItem) === 'object') {
      if (typeof mapItem === 'function') {
        return
      }
      reducer(input, mapItem)
    }
  }

  if (typeof mapItem === 'undefined') {
    alienFound = true
    delete inputMaster[key]
  }
  else if (getType(mapItem) !== getType(input)) {
    if (savedOpts.keepKeys) {
      inputMaster[key] = null
    } else {
      delete inputMaster[key]
    }
  }
}

/**
 * Walks over an array running the innerCompare
 * @param input
 * @param map
 * @param inputMaster
 */
const reducerWalk = (input, map, inputMaster) => {
  for (let i = 0; i < input.length; ++i) {
    innerCompare(input[i], map[0], i, inputMaster)
  }
}

/**
 * Reduce the input object to match the structure of the map.
 * @param {object|array} input - The input array or object
 * @param {object|array} map - The map to validate the input against
 * @param {object} [options] - Options object for the package
 * @param {boolean} [options.keepKeys] - If true will retain the keys opposed to stripping out, their values will be null
 * @return {*}
 */
const reducer = (input, map, options) => {
  savedOpts = options || savedOpts || {}
  Object.keys(input).forEach(function (key) {
    innerCompare(input[key], map[key], input, key)
  })
  return input
}

/**
 * Injects missing keys from the input based on the provided map
 * @param {object|array} input - The input array or object
 * @param {object|array} map - The map to validate the input against
 * @return {*}
 */
const injectMissingKeys = (input, map) => {
  Object.keys(map).forEach(function (key) {
    const mapType = getType(map[key])
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

/**
 * Main package export function
 * @param {object|array} input - The input array or object
 * @param {object|array} map - The map to validate the input against
 * @param {object} [options] - Options object for the package
 * @param {boolean} [options.keepKeys] - If true will retain the keys opposed to stripping out, their values will be null
 * @param {boolean} [options.throwErrorOnAlien] - If true will throw an error when an alien key is found instead of just deleting it
 * @return {*}
 */
module.exports = (input, map, options = {}) => {
  // prep
  if (getType(input) === 'array' && getType(map) === 'array') {
    if (input.length === 0 && !options.keepKeys) {
      return input
    }
    input.forEach((item, index) => {
      if (index > 0) {
        map.push(map[0])
      }
    })
  }
  input = reducer(JSON.parse(JSON.stringify(input)), map, options)
  if (options.throwErrorOnAlien && alienFound) {
    throw new Error('Alien entry found in object')
  }
  if (savedOpts.keepKeys) {
    // At this point we have retained all keys as null wherein the said leaf data type was incorrect
    // The missing keys should now be re-injected
    input = injectMissingKeys(input, map)
  }
  return input
}
