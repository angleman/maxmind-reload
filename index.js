var maxload = require('maxmind-loader')  // angleman/maxmind-loader

;

/*
pause  factor  retry 2    3         4          5           6        7        8   9    10   11       12        13        14
5s     2       5s,   10s, 20s,      40s,       80s~1m,     160s=2m, 320s=4m, 8m, 16m, 32m, 64m=~1h, 128m=~2h, 256m=~4h, 512m=~8h
5s     5       5s,   25s, 125s=~2m, 625s=~10m, 3125s=~52m
*/

function reloader(options, cb) {
	options             = options            || {};
	options.dest        = options.dest       || '/tmp/';
	options.pause       = options.pause      || 5 * 1000; //  5 second
	options.factor      = options.factor     || 5;
	options.retries     = options.retries    || 5;
	if (typeof options.random == 'undefined') {
		options.random  = 10; // percentage
	}
	options.random      = options.random / 100; // make a percentage
	options.timer       = null;

	function attempt_load(options, cb, attempt) {
		if (options.timer) {
			clearTimeout(options.timer);
		}
		attempt++;
		if (attempt > (options.retries+1)) {
			cb(new Error('maxmind-reload: failed after' + options.retries + 'attempts'));
		} else {
			if (!options.silent) {
				console.log('maxmind-reload: attempt', attempt, 'at', new Date());
			}
			maxload(options, function(err, data) {
				if (err) {
					var duration = options.pause + Math.floor(options.pause * Math.random() * options.random);
					if (!options.silent) {
						console.log(err);
						console.log('maxmind-reload: retry in', duration + 'ms')
					}
					options.timer = setTimeout(attempt_load, duration, options, cb, attempt);
					options.pause = Math.floor(options.pause * options.factor);
				} else {
					cb(null, data);
				}
			});
		}
	}

	attempt_load(options, cb, 0);
}




module.exports = reloader;
