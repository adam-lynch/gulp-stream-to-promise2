# gulp-stream-to-promise2

Returns a promise from a [Gulp](http://gulpjs.com/) stream, plus (optionally) catches pipeline-breaking errors for Gulp v3.


## Installation

```shell
npm install --save gulp-stream-to-promise2
```


## Usage

You must pass a callback which returns a gulp stream. Your callback will get called with two arguments;

- `plumbErrors`: (Function) if used in your pipeline, any errors in following pipes won't kill your pipeline / file-watching. Uses [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) under the hood.
- `stopPlumbingErrors`: (Function) if you've used `plumbErrors`, you can use this function to resume default behaves for any following pipes.

Note: None of these are needed if you're using Gulp v4+.

`gulpStreamToPromise` will then return a Promise;

```javascript
/* ... */
var gulpStreamToPromise = require('gulp-stream-to-promise2');

gulp.task('default', function(){
    return gulpStreamToPromise(function(plumbErrors, stopPlumbingErrors){
        return gulp.src( /* ... */ )
            .pipe(plumbErrors())
            .pipe(examplePlugin()) // errors from this plugin won't kill your build
            .pipe(stopPlumbingErrors())
            .pipe(anotherExamplePlugin()); // errors from this plugin will kill your build
    })
    .then(function(){ /* success */ })
    .catch(function(err){ /* error */ });
});
```