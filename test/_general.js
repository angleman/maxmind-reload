var should = require('should')
  , fs        = require('fs')
  , geofile   = '/tmp/GeoLiteCity.dat'
  , geofilegz = geofile + '.gz'
;


// clean up from prior run
if (fs.existsSync(geofile)) {
    fs.unlinkSync(geofile);
}
if (fs.existsSync(geofilegz)) {
    fs.unlinkSync(geofilegz);
}


describe('maxmind-reload', function() {
    describe('should', function() {
        var maxmind_reload = require('../index.js');
        var flag = false;
        beforeEach(function(done){
            this.timeout(15 * 60 * 1000); // allow test to run for 15 minutes
            maxmind_reload({
                dest: '/tmp/'
            }, function(err, datapath) {
                flag = (!err);
                console.log('datapath: ', datapath)
                done(); // complete the async beforeEach
            });

        });   

        it("callback", function(){    
            flag.should.equal(true); 
        }); 


    });
});