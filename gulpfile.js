const { src, dest, watch, parallel, series } = require('gulp');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');


const watchFiles = () => {
    watch(
        [
            "./themes/simple/static/**/*.css"
        ],
        { ignoreInitial: false },
        buildAll
    );
};

const compileCSS = () => {
    const plugins = [
        // postcssPresetEnv comes with autoprefixer
        postcssPresetEnv({ stage: 1 })
    ];
    return src([
        "./themes/simple/static/**/*.css",
    ])
        .pipe(postcss(plugins))
        .pipe(dest("output/"));
};

const buildAll = series(
    compileCSS
);


const build = series(
    compileCSS
);
exports.build = build;

const pelican = series(build, watchFiles);
exports.pelican = pelican;