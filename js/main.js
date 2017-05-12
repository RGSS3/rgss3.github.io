let RE = window.RE = {};
RE.$B = RE.bootstrapFuncs = [];
RE.bootstrap = function(){
  RE.$B.forEach(function(f){
    f.bind(RE)(); 
  });
};
module.exports = RE;

RE.$C = RE.config = require('./config/main.conf.js')

require('./load/fonts.js')