//===== devDependencies:
const {
  src,
  dest,
  parallel,
  series
  }              = require('gulp'),
  gulp           = require('gulp'),
  browser_sync   = require('browser-sync').create(),
  file_include   = require('gulp-file-include'),
  del            = require('del'),
  sass           = require('gulp-sass')(require('sass')),
  cssbeautify    = require('gulp-cssbeautify'),
  autoprefixer   = require('gulp-autoprefixer'),
  group_media    = require('gulp-group-css-media-queries'),
  clean_css      = require('gulp-clean-css'),
  rename         = require('gulp-rename'),
  uglify         = require('gulp-uglify-es').default,
  imagemin       = require('gulp-imagemin'),
  webp           = require('gulp-webp'),
  webp_html      = require('gulp-webp-html-nosvg'),
  webp_css       = require('gulp-webp-css'),
  svg_sprite     = require('gulp-svg-sprite'),
  ttf2woff       = require('gulp-ttf2woff'),
  ttf2woff2      = require('gulp-ttf2woff2'),
  newer          = require('gulp-newer');

//===== Paths:
const distPath = 'dist/',
      srcPath  = 'src/';

const path = {
  build: {
    html:  distPath,
    css:   distPath + 'css/',
    js:    distPath + 'js/',
    img:   distPath + 'img/',
    fonts: distPath + 'fonts/'
  },
  src: {
    html:  srcPath + '*.html',
    css:   srcPath + 'sass/main.sass',
    js:    srcPath + 'js/app.js',
    img:   srcPath + 'img/**/*.+(jpg|png|gif|ico|svg|webp)',
    fonts: srcPath + 'fonts/*.ttf'
  },
  watch: {
    html:  srcPath + '**/*.html',
    css:   srcPath + 'sass/**/*.sass',
    js:    srcPath + 'js/**/*.js',
    img:   srcPath + 'img/**/*.+(jpg|png|gif|ico|svg|webp)'
  },
  clean: './' + distPath
}

//===== Tasks:
function browserSync () {
  browser_sync.init({
    server: { baseDir: './' + distPath },
    port:   3000,
    online: false,
    notify: false
  })
}

function html () {
  return src(path.src.html)
    .pipe( file_include({
      indent: true
    }) )
    .pipe( webp_html() )
    .pipe( dest(path.build.html) )
    .pipe( browser_sync.stream() )
}

function css () {
  return src(path.src.css)
    .pipe(
      sass().on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ['last 10 versions']
      })
    )
    .pipe( group_media() )
    .pipe( clean_css() )
    .pipe( rename('app.min.css') )
    .pipe( dest(path.build.css) )
    .pipe( browser_sync.stream() )
}

function cssWatch () {
  return src(path.src.css)
  .pipe(
    sass().on('error', sass.logError)
  )
  .pipe( rename('app.min.css') )
  .pipe( dest(path.build.css) )
  .pipe( browser_sync.stream() )
}

function js () {
  return src(path.src.js)
    .pipe( file_include() )
    // .pipe( dest(path.build.js) ) // uncompressed version
    .pipe( uglify() )
    .pipe( rename('app.min.js') )
    .pipe( dest(path.build.js) )
    .pipe( browser_sync.stream() )
}

function images () {
  return src( [path.src.img, '!src/img/svg-sprite/**'] )
    .pipe( newer(path.build.img) )
    .pipe(
      webp({
        quality: 90
      })
    )
    .pipe( dest(path.build.img) )

    .pipe( src( [path.src.img, '!src/img/svg-sprite/**'] ) )
    .pipe( newer(path.build.img) )
    .pipe(
      imagemin([
        imagemin.gifsicle( {interlaced: true} ),
        imagemin.mozjpeg( {quality: 90, progressive: true} ),
        imagemin.optipng( {optimizationLevel: 5} ),
        imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
        })
      ])
    )
    .pipe( dest(path.build.img) )
    .pipe( browser_sync.stream() )
}

function svgSprite () {
  return src( [srcPath + 'img/svg-sprite/*.svg'] ) // sprite file path
    .pipe(
      svg_sprite({
        mode: {
          stack: {
            sprite: '../svg-sprite.svg' // sprite file name
            // example: true
          }
        }
      })
    )
    .pipe( dest(path.build.img) )
}

function fonts () {
  src(path.src.fonts)
    .pipe( ttf2woff() )
    .pipe( dest(path.build.fonts) )
  return src(path.src.fonts)
    .pipe( ttf2woff2() )
    .pipe( dest(path.build.fonts) )
}

function watchFiles () {
  gulp.watch( [path.watch.html], html );
  gulp.watch( [path.watch.css], cssWatch );
  gulp.watch( [path.watch.js], js );
  gulp.watch( [path.watch.img], images );
}

function clean () {
  return del(path.clean);
}

const build = series(clean, parallel(html, css, js, images, svgSprite, fonts));
const watch = parallel(build, watchFiles, browserSync);



//===== Exports Tasks:
exports.html      = html;
exports.css       = css;
exports.js        = js;
exports.images    = images;
exports.svgSprite = svgSprite;
exports.fonts     = fonts;
exports.clean     = clean;
exports.build     = build;
exports.watch     = watch;
exports.default   = watch;
