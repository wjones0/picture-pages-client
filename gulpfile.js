var gulp = require('gulp');
// var less = require('gulp-less');
// var path = require('path');
// var mocha = require('gulp-mocha');
// var browserSync = require('browser-sync');
// var nodemon = require('gulp-nodemon');
// var cp = require('child_process');
// var tsb = require('gulp-tsb');

var outputDir = '../build/public';

// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
// gulp.task('less', function () {
//     return gulp.src('./src/styles/**/*.less')
//         .pipe(less({
//             paths: [path.join(__dirname, 'less', 'includes')]
//         }))
//         .pipe(gulp.dest('./build/public/stylesheets'));
// });
// 
// // views - just copying for now.
// gulp.task('views', function () {
//    return gulp.src('./src/views/**/*')
//     .pipe(gulp.dest('./build/views')); 
// });

gulp.task('htmlCopy', function () {
    return gulp.src(['./*.html'])
        .pipe(gulp.dest(outputDir));
});

gulp.task('appHtmlCopy', function () {
    return gulp.src(['./app/**/*.html'])
        .pipe(gulp.dest(outputDir+'/app'));
});

//copy library files over
gulp.task('lib', function () {
   var libfiles = ["node_modules/angular2/bundles/angular2-polyfills.js",
                    "node_modules/systemjs/dist/system.src.js",
                    "node_modules/rxjs/bundles/Rx.js",
                    "node_modules/angular2/bundles/angular2.dev.js",
                    "node_modules/angular2/bundles/router.dev.js"];
   
   for(val of libfiles)
   {
       gulp.src(val).pipe(gulp.dest(outputDir+'/jslib')); 
   } 
});

// gulp.task('copyJS', function () {
//     return gulp.src('./src/public/**/*.js')
//         .pipe(gulp.dest('./build/public'));
// });
// 
// // run mocha tests in the ./tests folder
// gulp.task('test', function () {
// 
//     return gulp.src('./tests/test*.js', { read: false })
//     // gulp-mocha needs filepaths so you can't have any plugins before it 
//         .pipe(mocha());
// });
// 
// // run browser-sync on for client changes
// gulp.task('browser-sync', ['nodemon', 'watch'], function () {
//     browserSync.init(null, {
//         proxy: "http://localhost:3000",
//         files: ["build/public/**/*.*", "build/views/**/*.*"],
//         browser: "google chrome",
//         port: 8080,
//     });
// });

// run nodemon on server file changes
// gulp.task('nodemon', function (cb) {
//     return nodemon({
//         script: outputDir+'/www.js',
//         watch: [outputDir+'/*.js',outputDir+'/**/*.js']
//     });
// });
// 
// // TypeScript build for /src folder, pipes in .d.ts files from typings folder 
// var tsConfigSrc = tsb.create('src/tsconfig.json');
// gulp.task('tscomp', function () {
//     return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
//         .pipe(tsConfigSrc()) 
//         .pipe(gulp.dest(outputDir));
// });
// 
// // // TypeScript build for /config folder
// var tsConfigConfig = tsb.create('src/tsconfig.json');
// gulp.task('buildConfig', function () {
//     // pipe in all necessary files
//     return gulp.src(['config/*.ts'])
//         .pipe(tsConfigConfig()) 
//         .pipe(gulp.dest('../config'));
// });
// 
// // package.json for server modules
// gulp.task('package.json', function() {
//    return gulp.src(['package.json'])
//     .pipe(gulp.dest(outputDir)); 
// });

// // TypeScript build for /tests folder, pipes in .d.ts files from typings folder
// // as well as the src/tsd.d.ts which is referenced by tests/tsd.d.ts 
// var tsConfigTests = tsb.create('tests/tsconfig.json');
// gulp.task('buildTests', function () {
//     // pipe in all necessary files
//     return gulp.src(['typings/**/*.ts', 'tests/**/*.ts', 'src/tsd.d.ts'])
//         .pipe(tsConfigTests()) 
//         .pipe(gulp.dest('tests'));
// });
// 
// // watch for any TypeScript or LESS file changes
// // if a file change is detected, run the TypeScript or LESS compile gulp tasks
// gulp.task('watch', function () {
//     gulp.watch('src/**/*.ts', ['tscomp']);
//     gulp.watch('config/*.ts', ['buildConfig']);
//     //gulp.watch('tests/**/*.ts', ['buildTests']);
// }); 

gulp.task('build', ['htmlCopy','lib','appHtmlCopy']);
gulp.task('default', ['build']);
