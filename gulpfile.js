var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var gulpts = require('gulp-typescript');
var tsproject = gulpts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var stylish = require('tslint-stylish');
var browserSync = require('browser-sync').create();
var replace = require('gulp-replace');

var outputDir = '../build/public';

// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src('styles/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(outputDir+'/stylesheets'))
        .pipe(browserSync.stream());
});

// copy single index.html file
gulp.task('htmlCopy', function () {
    return gulp.src(['./*.html'])
        .pipe(gulp.dest(outputDir))
        .pipe(browserSync.stream());
});

// copy the html files
gulp.task('appHtmlCopy', function () {
    return gulp.src(['./app/**/*.html'])
        .pipe(gulp.dest(outputDir+'/app'))
        .pipe(browserSync.stream());
});

//copy library files over
gulp.task('lib', function () {
   var libfiles = ["node_modules/angular2/bundles/angular2-polyfills.js",
                    "node_modules/systemjs/dist/system.src.js",
                    "node_modules/rxjs/bundles/Rx.js",
                    "node_modules/angular2/bundles/angular2.dev.js",
                    "node_modules/angular2/bundles/router.dev.js",
                    "node_modules/angular2/bundles/http.dev.js"];
   
   for(val of libfiles)
   {
       gulp.src(val).pipe(gulp.dest(outputDir+'/jslib')); 
   } 
});

// copy any css libraries
gulp.task('csslib', function () {
    return gulp.src("node_modules/bootstrap/dist/css/bootstrap.css")
        .pipe(gulp.dest(outputDir+'/stylesheets'));
});

// compile the TypeScript
gulp.task('tsCompile', function () {
   var tsResult = gulp.src(['./app/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(gulpts(tsproject));
   
   return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputDir+'/app'))
        .pipe(browserSync.stream());
    
});


// compile the TypeScript without source maps for deployment
gulp.task('tsCompile-deploy', function () {
   var tsResult = gulp.src(['./app/**/*.ts'])
        .pipe(replace('http://localhost:3000',''))
        .pipe(gulpts(tsproject));
   
   return tsResult.js
        .pipe(gulp.dest(outputDir+'/app'))
        .pipe(browserSync.stream());
    
});


// TSLint our TypeScript
gulp.task('tslint', function() {
    return gulp.src(['./app/**/*.ts'])
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
            emitError: false,
            sort: true,
            bell: true
        }))
});

gulp.task('trigger-reload', function(){
    browserSync.reload(outputDir+'/index.html');
});

// // run browser-sync on for client changes
gulp.task('serve', ['tsCompile', 'tslint', 'csslib', 'less', 'htmlCopy', 'appHtmlCopy', 'lib', 'watch'], function () {

    browserSync.init({
        port: 8080,
        browser: "google chrome",
        server: {
            baseDir: outputDir,
        }
    });
    
    
    // gulp.watch(outputDir+'/app/**/*.js', ['trigger-reload']); 
    // gulp.watch(outputDir+'/app/**/*.html', ['trigger-reload']); 
    // gulp.watch(outputDir+'/*.html', ['trigger-reload']); 
    // gulp.watch(outputDir+'/stylesheets/*.css', ['trigger-reload']); 
    
});

 
// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () {
    gulp.watch('./app/**/*.ts', ['tslint', 'tsCompile']);
    gulp.watch('./app/**/*.html', ['appHtmlCopy']);
    gulp.watch('./*.html', ['htmlCopy']);
    gulp.watch('./styles/*.less', ['less']);
}); 

gulp.task('build', ['htmlCopy','lib','appHtmlCopy','csslib','less','tslint', 'tsCompile']);
gulp.task('build-deploy',['htmlCopy','lib','appHtmlCopy','csslib','less','tslint', 'tsCompile-deploy']);
gulp.task('bd',['build-deploy']);
gulp.task('default', ['build']);
