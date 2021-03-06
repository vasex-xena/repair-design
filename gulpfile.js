const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css')


// Static server
function bs() {
	serveSass();
	// minify();
	browserSync.init({
		server: {
			baseDir: "./src/"
		}
	});
	watch("./src/*.html").on('change', browserSync.reload);
	watch("./src/sass/**/*.sass", serveSass);
	watch("./src/sass/**/*.scss", serveSass);
	watch("./src/js/*.js").on('change', browserSync.reload);
};

// function minify () {
// 	return src('src/**/*.css')
// 			.pipe(cleanCSS())
// 			.pipe(cssmin())
// 			.pipe(rename({suffix: '.min'}))
// 			.pipe(dest('dist'));
// };

function serveSass () {
	return src('./src/sass/**/*.sass', './src/sass/**/*.scss')
			.pipe(sass())
			.pipe(autoprefixer({
				cascade: false
			}))
			.pipe(dest("./src/css"))
			.pipe(browserSync.stream());
};

exports.s = bs;