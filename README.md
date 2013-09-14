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
    license: undefined,  // 'maxmind license' for paid data otherwise free version used
    retries: 5,
    pause:   5 * 1000,   // 5 seconds
    silent:  false,      // true = don't console.log attempts
    random:  10,         // 10%, add random amount up to 'random' percentage of pause
    dest:    '/tmp/'     // default load free /tmp/GeoCityLite.dat
}, function (err, filepath) {
    maxmind.init(filepath);
});
```

Sample factors

```
pause  factor  retry 2    3         4          5           6        7        8   9    10   11      12        13        14
5s     2       5s,   10s, 20s,      40s,       80s~1m,     160s=2m, 320s=4m, 8m, 16m, 32m, 64m=~1h, 128m=~2h, 256m=~4h, 512m=~8h
5s     5       5s,   25s, 125s=~2m, 625s=~10m, 3125s=~52m

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

<!--- :angleman@license-md/begin -->
Dependencies:

[![maxmind-loader](http://badgr.co/maxmind-loader/MIT.png?bg=%23339e00 "maxmind-loader@0.5.10 Massachusetts Institute of Technology")](https://github.com/angleman/maxmind-loader)


Development Dependencies:

[![grunt](http://badgr.co/grunt/MIT.png?bg=%23339e00 "grunt@0.4.1 Massachusetts Institute of Technology")](https://github.com/gruntjs/grunt)
[![grunt-bump](http://badgr.co/grunt-bump/Unknown.png "grunt-bump@0.0.11 Unknown License")](https://github.com/vojtajina/grunt-bump)
[![license-md](http://badgr.co/license-md/MIT.png?bg=%23339e00 "license-md@0.3.6 Massachusetts Institute of Technology")](https://github.com/angleman/license-md)
[![mocha](http://badgr.co/mocha/Unknown.png "mocha@1.12.1 Unknown License")](https://github.com/visionmedia/mocha)
[![should](http://badgr.co/should/MIT*.png?bg=%23339e00 "should@1.2.2 Massachusetts Institute of Technology (text scan guess)")](https://github.com/visionmedia/should.js)

<!--- :angleman@license-md/end -->
