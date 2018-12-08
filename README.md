# gulp-sass-json
Convert sass/scss vars to JSON to make them accessible in java script

Install:

    npm install gulp-sass-json2

Usage example:

        gulp.task('sass2json', function () {
          return gulp.src('res/vars.scss')
            .pipe(sassJson())
            .pipe(gulp.dest('res/'));
        });
