const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const webserver = require('gulp-webserver');

const sourcemaps = require('gulp-sourcemaps');

const sourceFiles = [
    'src/maps/dev_room.js',
    'src/maps/level_1.js',
    'src/maps/level_2.js',
    'src/rot.min.js',
    'src/object.js',
    'src/graphics.js',
    'src/lighting.js',
    'src/map.js',
    'src/items.js',
    'src/fighter.js',
    'src/inventory.js',
    'src/interactable.js',
    'src/effects.js',
    'src/ai.js',
    'src/player.js',
    'src/ui.js',
    'src/data.js',
    'src/main.js',
];

gulp.task('gameFiles', async function() {
    return gulp.src(sourceFiles)
        // .pipe(webserver())
        .pipe(sourcemaps.init())
        .pipe(concat('game.js'))
        .pipe(gulp.dest('dist'))
        .pipe(minify({ ext: { min: '.min.js' } }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(sourceFiles, gulp.series(['gameFiles']));
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true
        }));
});

gulp.task('default', gulp.series('gameFiles', gulp.parallel('watch', 'webserver')));
