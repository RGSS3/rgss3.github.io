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

RE.$C   = RE.config = require('./config/main.conf.js')
RE.$CMD     = {};
RE.$CONTEXT = {};
require('./load/fonts.js');
require('./load/codemirror.js')
require('../css/main.css')
var cm = window.CodeMirror;
RE.$B.push( () => {
    RE.$L.link("https://unpkg.com/codemirror/theme/solarized.css");
    RE.$L.link("https://unpkg.com/codemirror/addon/dialog/dialog.css");
    var editor    = RE.$O['editor'] = new cm(document.body);
    var extraKeys = RE.$O['keymap'] = {};
    RE.$L.script("https://unpkg.com/codemirror/mode/javascript/javascript.js", function(){ editor.setOption("mode", "javascript");});
    RE.$L.script("https://unpkg.com/codemirror/addon/dialog/dialog.js");
    editor.setOption("theme", "solarized dark");
    editor.setOption("value", "alert('Hello world')");    
    editor.setOption("extraKeys", extraKeys);
    RE.$CMD["run"] = function(){
        eval(RE.$O.editor.getOption('value'));
    };
    RE.$O["keymap"]['Ctrl-1'] = function(){
       RE.$CMD["run"]();  
    };
});