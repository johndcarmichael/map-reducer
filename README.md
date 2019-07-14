# object-reduce-by-map
Recursively reduce an object to match a given map.

[![Build Status](https://travis-ci.org/johndcarmichael/object-reduce-by-map.svg?branch=master)](https://travis-ci.org/johndcarmichael/object-reduce-by-map) | [![Dependencies](https://david-dm.org/johndcarmichael/object-reduce-by-map.svg)](https://david-dm.org/johndcarmichael/object-reduce-by-map) | [![License](http://img.shields.io/npm/l/object-reduce-by-map.svg)](https://github.com/johndcarmichael/object-reduce-by-map/blob/master/LICENSE)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Features](#features)
- [Entry function](#entry-function)
- [Example use](#example-use)
- [Last publish reason](#last-publish-reason)
- [Contributions](#contributions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features
 - Reduce a given object to match the structure and leaf data types of a map
 - Delete non-matching input nodes
 - Provide options:
   -  Retain mismatched keys as null opposed to deleting them 

## Entry function
```js
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
```

## Example use
For more working exmaples, please take a look at the tests in this repo.
```js
const objectReduceByMap = require('object-reduce-by-map')

// The dynamic input object
const input = {
  name: 'wifi',
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

// The map the input object's structure should match
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

// Lastly, reduce the input.
const calculated = objectReduceByMap(input, map)

console.log(calculated)
```

The above would log to the console the original input reduced to the format of the given map.

Note that any values and keys not in the map are no longer present:
```json
{
  "name": "wifi",
  "opts": {
    "on": false,
    "qty": {
      "pre": 12,
      "post": 10
    }
  },
  "prefs": {
    "radio": "off",
    "mode": {
      "sport": {
        "steering": 5,
        "sus": false
      },
      "another": [1, 2, 3]
    }
  }
}
```

## Last publish reason
> DevDependency updates from security alerts by GitHub

## Contributions
Welcome via github
