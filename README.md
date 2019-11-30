# object-reduce-by-map
Recursively reduce an object to match a given map.

[![Build Status](https://travis-ci.org/johndcarmichael/object-reduce-by-map.svg?branch=master)](https://travis-ci.org/johndcarmichael/object-reduce-by-map) | [![Dependencies](https://david-dm.org/johndcarmichael/object-reduce-by-map.svg)](https://david-dm.org/johndcarmichael/object-reduce-by-map) | [![License](http://img.shields.io/npm/l/object-reduce-by-map.svg)](https://github.com/johndcarmichael/object-reduce-by-map/blob/master/LICENSE)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Features](#features)
- [Example use as an API output transformer](#example-use-as-an-api-output-transformer)
- [Example use](#example-use)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features
 - Reduce a given object to match the structure and leaf data types of a given map
 - Delete non-matching input nodes
 - Optionally throw an error for non-matching nodes with throwErrorOnAlien
 - Provide options:
   -  keepKeys: Retain mismatched keys as null opposed to deleting them 
   -  throwErrorOnAlien: Throw error on alien found

## Example use as an API output transformer
An example use case of this package can be found in the TypeScript openapi-nodegen templates as an output transformer: [openapi-nodegen-typescript-server](https://github.com/acrontum/openapi-nodegen-typescript-server/blob/master/src/http/nodegen/routes/___op.ts.njk#L31)

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

// Pass options
const calculatedWithOptions = objectReduceByMap(input, map, {
  keepKeys: true,
  throwErrorOnAlien: true
})

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
