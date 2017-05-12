var webpack = require('webpack');
;(function(){
  module.exports = {
    entry: "./js/main.js",
    output: { path: __dirname, filename: './dist/all.js'},
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/}
        ]
    },
  };
})();