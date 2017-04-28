var plumber = require('gulp-plumber');

// @param {Object|Function} mixed - This must return the gulp stream.
// @returns {Promise}
module.exports = function(mixed){
    var callback = typeof mixed === 'function' && mixed || function(){ return mixed; };
    
    return new Promise(function(resolve, reject){
        callback(function(){ return plumber({ errorHandler: reject }) }, plumber.stop)
        .on('error', reject)
        .on('finish', resolve);
    });
};