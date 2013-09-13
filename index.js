var retry   = require('retry')           // tim-kos/node-retry
  , maxload = require('maxmind-loader')  // angleman/maxmind-loader

;


function reloader(options, cb) {
	options            = options || {};
	options.dest       = options.dest || '/tmp/';
	options.maxTimeout = 15 * 60 * 1000, // 15 minutes
	options.retries    = 5;
	var operation      = retry.operation(options);

	operation.attempt(function(currentAttempt) {
		if (currentAttempt > 1) {
			console.log('maxmind-reloader retry ', currentAttempt-1, ' for ', options);
		}
		maxload(options, function(err, data) {
			if (operation.retry(err)) {
				return;
			}
			cb(err ? operation.mainError() : null, data);
		});
	});
}




module.exports = reloader;
