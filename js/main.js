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

RE.$L = {};
RE.$L.script = function(src, f){
    var s = document.createElement("script");
    if(f) s.addEventListener('load', f, false);
    s.src = src;
    document.body.appendChild(s);
};
RE.$L.link   = function(src, f){
    var s = document.createElement("link");
    if(f) s.addEventListener('load', f, false);
    s.rel  = "stylesheet";
    s.href = src;
    s.type = "text/css";
    document.body.appendChild(s);
    
}

RE.$C = RE.config = require('./config/main.conf.js')

require('./load/fonts.js');
require('./load/codemirror.js')
require('../css/main.css')
var cm = window.CodeMirror;
RE.$B.push( () => {
    
    RE.$L.link("https://unpkg.com/codemirror/theme/solarized.css");
    var editor = RE.$O['editor'] = new cm(document.body);
    RE.$L.script("https://unpkg.com/codemirror/mode/ruby/ruby.js", function(){ editor.setOption("mode", "ruby");});
    editor.setOption("theme", "solarized dark");
    editor.setOption("value", "class A\nend");
});