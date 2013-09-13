# maxmind-reload [![NPM version](https://badge.fury.io/js/maxmind-reload.png?branch=master)](https://npmjs.org/package/maxmind-reload) [![Build Status](https://travis-ci.org/angleman/maxmind-reload.png?branch=master)](https://travis-ci.org/angleman/maxmind-reload) [![Dependency Status](https://gemnasium.com/angleman/maxmind-reload.png?branch=master)](https://gemnasium.com/angleman/maxmind-reload) [![License](http://badgr.co/use/MIT.png?bg=%2343d100)](#licensemit)

Get maxmind paid and lite geoip data updates with exponential and custom retry strategies

## Install

```
npm install maxmind-reload
```

## Usage

[maxmind-loader](https://github.com/angleman/maxmind-loader) compatible but with tenacity

```javascript
maxloader = require('maxmind-reload')
maxloader(function(err, filepath) { maxmind.init(filepath) }); // free geo data
```

## Example with defaults

```javascript
maxmind   = require('maxmind')
maxloader = require('maxmind-reload')

maxloader({
    license: undefined,     // maxmind license string for paid data otherwise free version loaded
    retries:    5,
    maxTimeout: 15*60*1000, // 15 minutes
    silent:  false,         // true = don't console.log attempts
    dest:    '/tmp/'        // default load free /tmp/GeoCityLite.dat
}, function (err, filepath) {
    maxmind.init(filepath);
});
```

## Paid Geo Data Example

```javascript
var options = { license: 'MAXMIND_LICENSE' };

maxloader(options, function(err, filepath) {
    if (err) {
        console.log(err);
    } else {
        maxmind.init(filepath, { memoryCache: true });
    }
})
```

For additional parameter details see: [maxmind-loader](https://github.com/angleman/maxmind-loader) and [reply](https://github.com/tim-kos/node-retry)

## License: MIT

Dependencies:

