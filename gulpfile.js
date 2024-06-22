const { src, dest, task, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const rm = require("gulp-rm");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const px2rem = require("gulp-smile-px2rem");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;

// config ES6 is .. SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS
const { SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS } = require("./gulp.config");

// sass.compiler = require("sass");

task("clean", () => {
    console.log(env);
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});

task("copy:fonts", () => {
    return src(`${SRC_PATH}/fonts/*`)
        .pipe(dest(`${DIST_PATH}/fonts`))
        .pipe(reload({ stream: true }));
});

const pics = [`src/img/*.jpg`, `src/img/*.png`];

task("copyPicture", () => {
    return src(pics)
        .pipe(dest(`${DIST_PATH}/img`))
        .pipe(reload({ stream: true }));
});

task("icons", () => {
    return src(`${SRC_PATH}/svg/*.svg`)
        .pipe(dest(`${DIST_PATH}/img/icons`))
        .pipe(reload({ stream: true }));
});

task("styles", () => {
    return src(["src/styles/main.scss"])
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(concat("main.min.scss"))
        .pipe(sassGlob())
        .pipe(sass().on("error", sass.logError))
        .pipe(px2rem({ dpr: 1 }))
        .pipe(
            gulpif(
                env === "dev",
                autoprefixer({
                    cascade: false,
                })
            )
        )
        .pipe(gulpif(env === "prod", gcmq()))
        .pipe(gulpif(env === "prod", cleanCSS()))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});

task('component-styles', () => src('src/components/**/*.scss')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem({ dpr: 1 }))
    .pipe(
        gulpif(
            env === 'dev',
            autoprefixer({
                cascade: false,
            }),
        ),
    )
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/components`))
    .pipe(reload({ stream: true })));

task("server", () => {
    browserSync.init({
        server: {
            baseDir: "./dist",
        },
        open: false,
    });
});

task("scripts", () => {
    return src(["src/scripts/*.js"])
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(
            gulpif(
                env === "prod",
                babel({
                    presets: ["@babel/preset-env"],
                })
            )
        )
        .pipe(gulpif(env === "prod", uglify()))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/scripts`))
        .pipe(reload({ stream: true }));
});

task('component-scripts', () => src('src/components/**/*.js') // Source directory for component scripts
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(
        gulpif(
            env === 'prod',
            babel({
                presets: ['@babel/preset-env'],
            }),
        ),
    )
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/components`)) // Output directory for component scripts
    .pipe(reload({ stream: true })));

task("icons", () => {
    return src(`${SRC_PATH}/img/svg/*.svg`)
        .pipe(dest(`${DIST_PATH}/img/svg`))
        .pipe(reload({ stream: true }));
});

task("watch", () => {
    watch("./src/styles/**/*.scss", series("styles"));
    watch('./src/components/**/*.scss', series('component-styles'));
    watch("./src/*.html", series("copy:html"));
    watch('./src/**/*.png', series('copyPicture'));
    watch('./src/**/*.png', series('copyPicture'));
    watch("./src/scripts/*.js", series("scripts"));
    watch('./src/components/**/*.js', series('component-scripts'));
    watch('./src/img/svg/*.svg', series('icons'));
});

task(
    "default",
    series(
        "clean",
        parallel(
            "copy:html",
            "copy:fonts",
            "copyPicture",
            "styles",
            "scripts",
            'component-scripts',
            'component-styles',
            "icons"
        ),
        parallel("watch", "server")
    )
);

task(
    "build",
    series(
        "clean",
        parallel(
            "copy:html",
            "copy:fonts",
            "copyPicture",
            "styles",
            "scripts",
            "icons"
        )
    )
);
