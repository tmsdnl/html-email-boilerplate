// Dependencies
var gulp 		= require('gulp'),
	gutil		= require('gulp-util'),
	rename 		= require('gulp-rename'),
	inlineSrc  	= require('gulp-inline-source'),
    inlineCss	= require('gulp-inline-css'),
    minifyCss   = require('gulp-minify-inline'),
    minifyHtml	= require('gulp-minify-html'),
    watch 		= require('gulp-watch'),
    liveReload	= require('gulp-livereload');

// Configuration
var path 	= './template-*/',

	// Source and options for gulp.src
	source 	= path + 'index.html',
	options = {
        base: './'
    },

	// File basename after rename (gulp-rename)
	filename = 'compiled',

	// Compile destination for gulp.dest
	destination	= './',

	// List of watched files
	watched = [
		source,
		path + '*.css'
	];

// Compile HTML & CSS
gulp.task('compile', function() {
    return gulp.src(source, options)

    	// gulp-inline-source
    	// Replace <link inline /> to <style> tags, 
    	// inline source CSS
    	.pipe(inlineSrc({
    		compress: false
    		// swallowErrors: true
    	}))

    	// gulp-inline-css
    	// Inline CSS using style attribute
        .pipe(inlineCss({
            applyStyleTags: false,
            removeStyleTags: false,
            applyLinkTags: true,
            removeLinkTags: true
        }))

    	// gulp-minify-inline
    	// Minify CSS
        .pipe(minifyCss({
        	js: false,
        	css: {
        		advanced: false
        	}
        }))

        // gulp-minify-html
        // Minify HTML
        .pipe(minifyHtml({
		    conditionals: true,
		    spare: true,
		    quotes: true
        }))

    	// Finishing up
        .pipe(rename({basename: filename}))
        .pipe(gulp.dest(destination))
        .pipe(liveReload());
});

// Watch changes, compile & live reload
gulp.task('watch', function() {
	liveReload.listen();
	gulp.watch(watched, ['compile']);
});

// Default Gulp task
gulp.task('default', ['compile', 'watch']);