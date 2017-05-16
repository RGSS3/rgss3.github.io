var webpack = require('webpack');
var glob   =  require('glob');
;(function(){
  module.exports = {
    entry: "./js/main.js",
    output: { path: __dirname, filename: './dist/all.js'},
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },          
  };
})();