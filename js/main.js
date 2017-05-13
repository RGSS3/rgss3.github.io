let RE = window.RE = {};
RE.$B = RE.bootstrapFuncs = [];
RE.$P = {};
RE.$O = {};
RE.bootstrap = function(){
  RE.$B.forEach(function(f){
    f.bind(RE)(); 
  });
};
module.exports = RE;

RE.$C = RE.config = require('./config/main.conf.js')

require('./load/fonts.js');
require('./load/codemirror.js')
require('../css/main.css')
var cm = window.CodeMirror;
RE.$B.push( () => {
    var editor = RE.$O['editor'] = new cm(document.body);
    editor.setOption("mode", "ruby");
    editor.setOption("theme", "solarized dark");
    editor.setOption("value", "class A\nend");
});