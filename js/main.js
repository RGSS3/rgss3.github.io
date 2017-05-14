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
    editor.setOption("value", `const result = (val) => {
   let value = RE.$O["editor"].getValue();
   value     = value.replace(/\\/\\*\\*\\*\\n[\\w\\W]*? \\*\\*\\*\\//, "/***\\n" + val + "\\n ***/");
   RE.$O["editor"].setValue(value);
}
let sum = 0;
for(let i = 1; i < 100 + 1; ++i){
   sum += i;
}

result(sum);

/***
 Press Ctrl-! to run, the result will be here
 ***/`);    
    editor.setOption("extraKeys", extraKeys);
    RE.$CMD["run"] = function(){
        eval(RE.$O.editor.getValue());
    };
    RE.$O["keymap"]['Shift-Ctrl-1'] = function(){
       RE.$CMD["run"]();  
    };
});