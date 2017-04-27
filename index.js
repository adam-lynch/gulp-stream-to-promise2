var plumber = require('gulp-plumber');

// @param {Function} callback - This must return the gulp stream.
//  @returns {Promise}
module.exports = function(callback){
    return new Promise(function(resolve, reject){
        callback(function(){ plumber({ errorHandler: reject }) }, plumber.stop)
        .on('error', reject)
        .on('finish', resolve);
    });
};