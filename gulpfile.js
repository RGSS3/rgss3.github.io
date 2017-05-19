const gulp = require('gulp');
const webpackConfig = require('./webpack.config.js');
const webpack = require("webpack");
gulp.task('default', ['watchTree']);

gulp.task('watchTree', function(){
    gulp.watch(['js/**/*.js', 'css/**/*.css'], function(){
        let config = Object.create(webpackConfig);
        console.log("webpack start");
        webpack(config, function(err, status){
             console.log("webpack end.", err);
        });
    });
})  