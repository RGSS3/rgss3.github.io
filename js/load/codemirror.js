require('codemirror/lib/codemirror.css');
var RE = require('../main.js');
window.require(['require', 'https://unpkg.com/codemirror/lib/codemirror', 'https://unpkg.com/codemirror/mode/meta.js'], function(req, CodeMirror){
    module.exports = RE.$P['CodeMirror'] = window.CodeMirror = CodeMirror;
    RE.$B.initCodeMirror(CodeMirror);
});


