const uglifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const javascriptObfuscator = require('gulp-javascript-obfuscator')

const paths = {

    assets: {
        styles: 'styles.min.css',
        stylesAuth: 'styles-auth.min.css',
        stylesAccount: 'styles-account.min.css',
        stylesAdmin: 'styles-admin.min.css',
        scripts: 'libs.min.js',
        scriptsA: 'libs-a.min.js',
        scriptsAuth: 'libs-auth.min.js',

    },

    styles: {
        src: './src/assets/styles/*.css',
        dest: './public/css/',
    },

    stylesAccount: {
        src: './src/assets/styles/account/*.css',
        dest: './public/css/',
    },


    stylesAuth: {
        src: ['./src/assets/styles/auth/**/*.css', './src/assets/styles/alertify.min.css'],
        dest: './public/css/',
    },

    stylesAdmin: {
        src: ['./src/assets/styles/admin/**/*.css', './src/assets/styles/alertify.min.css'],
        dest: './public/css/',
    },

    images: {
        src: './src/assets/img/*',
        dest: './public/img/',
    },

    scripts: {
        src: ['./src/assets/js/default/**/*.js', './src/assets/js/main/**/*.js'],
        dest: './public/js/',
    },

    scriptsA: {
        src: ['./src/assets/js/account/*.js', './src/assets/js/default/**/*.js'],
        dest: './public/js/',
    },

    scriptsAuth: {
        src: ['./src/assets/js/auth/*.js', './src/assets/js/default/**/*.js'],
        dest: './public/js/',
    }

};

gulp.task('styles', () => {

    return gulp.src(paths.styles.src)
        .pipe(uglifycss({ compatibility: 'ie8' }))
        .pipe(concat(paths.assets.styles))
        .pipe(gulp.dest(paths.styles.dest))

})

gulp.task('stylesAuth', () => {

    return gulp.src(paths.stylesAuth.src)
        .pipe(uglifycss({ compatibility: 'ie8' }))
        .pipe(concat(paths.assets.stylesAuth))
        .pipe(gulp.dest(paths.stylesAuth.dest))

})

gulp.task('stylesAccount', () => {

    return gulp.src(paths.stylesAccount.src)
        .pipe(uglifycss({ compatibility: 'ie8' }))
        .pipe(concat(paths.assets.stylesAccount))
        .pipe(gulp.dest(paths.stylesAccount.dest))

})

gulp.task('stylesAdmin', () => {

    return gulp.src(paths.stylesAdmin.src)
        .pipe(uglifycss({ compatibility: 'ie8' }))
        .pipe(concat(paths.assets.stylesAdmin))
        .pipe(gulp.dest(paths.stylesAdmin.dest))

})

gulp.task('images', () => {

    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))

})


gulp.task('scripts', () => {

    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(concat(paths.assets.scripts))
        .pipe(javascriptObfuscator())
        .pipe(gulp.dest(paths.scripts.dest))

})

gulp.task('scripts-a', () => {

    return gulp.src(paths.scriptsA.src)
        .pipe(uglify())
        .pipe(concat(paths.assets.scriptsA))
        .pipe(javascriptObfuscator())
        .pipe(gulp.dest(paths.scriptsA.dest))

})

gulp.task('scripts-auth', () => {

    return gulp.src(paths.scriptsAuth.src)
        .pipe(uglify())
        .pipe(concat(paths.assets.scriptsAuth))
        .pipe(javascriptObfuscator())
        .pipe(gulp.dest(paths.scriptsAuth.dest))

})

gulp.task('watch', () => {

    gulp.watch(paths.styles.src, gulp.series('styles'));
    gulp.watch(paths.stylesAuth.src, gulp.series('stylesAuth'));
    gulp.watch(paths.stylesAdmin.src, gulp.series('stylesAdmin'));
    gulp.watch(paths.stylesAccount.src, gulp.series('stylesAccount'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
    gulp.watch(paths.scriptsA.src, gulp.series('scripts-a'));
    gulp.watch(paths.scriptsAuth.src, gulp.series('scripts-auth'));
    gulp.watch(paths.images.src, gulp.series('images'));

});

gulp.task('default', gulp.parallel(['styles', 'stylesAuth', 'stylesAdmin', 'stylesAccount', 'images', 'scripts', 'scripts-a', 'scripts-auth', 'watch']));