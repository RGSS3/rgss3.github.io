let RE = window.RE = {};

RE.$B = RE.bootstrapFuncs = [];
RE.$P = {};
RE.$O = {};
RE.$A = RE.$P.axios = require('axios/dist/axios.min.js');
RE.$P.bacon = require('baconjs/dist/bacon.min.js');
RE.Stream = require('stream-browserify');
RE.Jison  = require('jison');  
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
    s.type = "text/javascript";
    document.body.appendChild(s);
};
RE.$L.link   = function(src, f){
    var s = document.createElement("link");
    if(f) s.addEventListener('load', f, false);
    s.rel  = "stylesheet";
    s.href = src;
    s.type = "text/css";
    document.body.appendChild(s);   
};
RE.$L.scriptPromise = function(src){
    return new Promise(function(res, rej){
        RE.$L.script(src, res);
    });
};

RE.$L.linkPromise = function(src){
    return new Promise(function(res, rej){
        RE.$L.link(src, res);
    });
};
RE.$B.initTheme = "solarized dark";
RE.$B.initValue = `const result = (val) => {
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
 Press Ctrl-! = Shift-Ctrl-1 to run, the result will be here
 ***/`;
RE.$B.helpMsg = `
  Press Ctrl-! to run code
  setting (RE.$PS.set("RE.init", "value");) will save init script to local
`;

RE.$C   = RE.config = require('./config/main.conf.js')
RE.$CMD     = {};
RE.$CONTEXT = {};
RE.$R = require('./load/resource.js')

require('./load/fonts.js');
require('./load/codemirror.js')
require('../css/main.css')

var cm = window.CodeMirror;
RE.$B.push( () => {
    
    window.location.hash.replace(/\+([^+]*)/g, function(thing){
       RE.$R.get(thing)(_ => _);
    });
    
    window.location.search.replace(/\+([^+]*)/g, function(thing){
        RE.$R.get(thing)(_ => _);
    });
    
    
    RE.$L.link("https://unpkg.com/codemirror/theme/solarized.css", function(){
        RE.$L.script("https://unpkg.com/store/dist/store.everything.min.js", function(){
            RE.$PS = store;
            var init = store.get('RE.init') || "";
            try{
              eval(init);  
            }catch(e){
                console.error(e);
                alert("error when loading init script");
            }
        });        
    });
    RE.$L.link("https://unpkg.com/codemirror/addon/dialog/dialog.css");
    
   
    var editor    = RE.$O['editor'] = new cm(document.body);
    var extraKeys = RE.$O['keymap'] = {};
    RE.$L.script("https://unpkg.com/codemirror/mode/javascript/javascript.js", function(){ editor.setOption("mode", "javascript");});
    RE.$L.script("https://unpkg.com/codemirror/addon/dialog/dialog.js");
    editor.setOption("theme", RE.$B.initTheme);
    editor.setOption("value", RE.$B.initValue);    
    editor.setOption("extraKeys", extraKeys);
    RE.$CMD["run"] = function(){
        eval(RE.$O.editor.getValue());
    };
    RE.$CMD["command"] = function(text){
        console.log(text);
    }
    RE.$O["keymap"]['Shift-Ctrl-1'] = function(){
       RE.$CMD["run"]();  
    };
    RE.$O["keymap"]['Ctrl-`'] = function(){
       RE.$O.editor.openDialog("<input class='commandbar'>", function(text){ RE.$CMD["command"](text)});
    };
    document.querySelector("#run").addEventListener('click', function(){
        RE.$CMD["run"]();  
    })
    Object.defineProperty(window, 'help', {get: function(){
      console.log(RE.$B.helpMsg);
    }});
});