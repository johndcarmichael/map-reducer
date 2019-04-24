# map-reducer
Recursively reduce an object to match a given map.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Example use](#example-use)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Example use
```js
const mapReducer = require('map-reducer')

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
const calculated = mapReducer(input, map)

console.log(calculated)
```

The above would log to the console the original input reduced to the format of the given map.

Note that any values and keys not in the map are no longer present
```json
{
  name: 'wifi',
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
```