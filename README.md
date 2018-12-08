# gulp-sass-json
Convert sass/scss vars to JSON to make them accessible in java script

        gulp.task('sass2json', function () {
          return gulp.src('res/vars.scss')
            .pipe(sassJson())
            .pipe(gulp.dest('res/'));
        });
