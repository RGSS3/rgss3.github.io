/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let RE = window.RE = {};

RE.$B = RE.bootstrapFuncs = [];
RE.$P = {};
RE.$O = {};
RE.$A = RE.$P.axios = __webpack_require__(8);
RE.$P.bacon = __webpack_require__(9);

RE.bootstrap = function () {
    RE.$B.forEach(function (f) {
        f.bind(RE)();
    });
};
module.exports = RE;

RE.$L = {};
RE.$L.script = function (src, f) {
    var s = document.createElement("script");
    if (f) s.addEventListener('load', f, false);
    s.src = src;
    s.type = "text/javascript";
    document.body.appendChild(s);
};
RE.$L.link = function (src, f) {
    var s = document.createElement("link");
    if (f) s.addEventListener('load', f, false);
    s.rel = "stylesheet";
    s.href = src;
    s.type = "text/css";
    document.body.appendChild(s);
};
RE.$L.scriptPromise = function (src) {
    return new Promise(function (res, rej) {
        RE.$L.script(src, res);
    });
};

RE.$L.linkPromise = function (src) {
    return new Promise(function (res, rej) {
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

RE.$C = RE.config = __webpack_require__(4);
RE.$CMD = {};
RE.$CONTEXT = {};
RE.$R = __webpack_require__(7);

__webpack_require__(6);
__webpack_require__(5);
__webpack_require__(10);

var cm = window.CodeMirror;
RE.$B.push(() => {
    var o = _ => _;
    window.location.hash.replace(/\+([^+]*)/g, function (thing) {
        o = (o => _ => RE.$R.get(thing)(o))(o);
    });
    console.log(window.location.search);
    window.location.search.replace(/\+([^+]*)/g, function (thing) {
        o = (o => _ => RE.$R.get(thing)(o))(o);
    });
    o();

    RE.$L.link("https://unpkg.com/codemirror/theme/solarized.css", function () {
        RE.$L.script("https://unpkg.com/store/dist/store.everything.min.js", function () {
            RE.$PS = store;
            var init = store.get('RE.init') || "";
            try {
                eval(init);
            } catch (e) {
                console.error(e);
                alert("error when loading init script");
            }
        });
    });
    RE.$L.link("https://unpkg.com/codemirror/addon/dialog/dialog.css");

    var editor = RE.$O['editor'] = new cm(document.body);
    var extraKeys = RE.$O['keymap'] = {};
    RE.$L.script("https://unpkg.com/codemirror/mode/javascript/javascript.js", function () {
        editor.setOption("mode", "javascript");
    });
    RE.$L.script("https://unpkg.com/codemirror/addon/dialog/dialog.js");
    editor.setOption("theme", RE.$B.initTheme);
    editor.setOption("value", RE.$B.initValue);
    editor.setOption("extraKeys", extraKeys);
    RE.$CMD["run"] = function () {
        eval(RE.$O.editor.getValue());
    };
    RE.$CMD["command"] = function (text) {
        console.log(text);
    };
    RE.$O["keymap"]['Shift-Ctrl-1'] = function () {
        RE.$CMD["run"]();
    };
    RE.$O["keymap"]['Ctrl-`'] = function () {
        RE.$O.editor.openDialog("<input class='commandbar'>", function (text) {
            RE.$CMD["command"](text);
        });
    };
    document.querySelector("#run").addEventListener('click', function () {
        RE.$CMD["run"]();
    });
    Object.defineProperty(window, 'help', { get: function () {
            console.log(RE.$B.helpMsg);
        } });
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// This is CodeMirror (http://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .

(function (global, factory) {
   true ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.CodeMirror = factory();
})(this, function () {
  'use strict';

  // Kludges for bugs and behavior differences that can't be feature
  // detected are enabled based on userAgent etc sniffing.

  var userAgent = navigator.userAgent;
  var platform = navigator.platform;

  var gecko = /gecko\/\d/i.test(userAgent);
  var ie_upto10 = /MSIE \d/.test(userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
  var edge = /Edge\/(\d+)/.exec(userAgent);
  var ie = ie_upto10 || ie_11up || edge;
  var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
  var webkit = !edge && /WebKit\//.test(userAgent);
  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
  var chrome = !edge && /Chrome\//.test(userAgent);
  var presto = /Opera\//.test(userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
  var phantom = /PhantomJS/.test(userAgent);

  var ios = !edge && /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
  var android = /Android/.test(userAgent);
  // This is woefully incomplete. Suggestions for alternative methods welcome.
  var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
  var mac = ios || /Mac/.test(platform);
  var chromeOS = /\bCrOS\b/.test(userAgent);
  var windows = /win/i.test(platform);

  var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
  if (presto_version) {
    presto_version = Number(presto_version[1]);
  }
  if (presto_version && presto_version >= 15) {
    presto = false;webkit = true;
  }
  // Some browsers use the wrong event properties to signal cmd/ctrl on OS X
  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
  var captureRightClick = gecko || ie && ie_version >= 9;

  function classTest(cls) {
    return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
  }

  var rmClass = function (node, cls) {
    var current = node.className;
    var match = classTest(cls).exec(current);
    if (match) {
      var after = current.slice(match.index + match[0].length);
      node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
    }
  };

  function removeChildren(e) {
    for (var count = e.childNodes.length; count > 0; --count) {
      e.removeChild(e.firstChild);
    }
    return e;
  }

  function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e);
  }

  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className) {
      e.className = className;
    }
    if (style) {
      e.style.cssText = style;
    }
    if (typeof content == "string") {
      e.appendChild(document.createTextNode(content));
    } else if (content) {
      for (var i = 0; i < content.length; ++i) {
        e.appendChild(content[i]);
      }
    }
    return e;
  }
  // wrapper for elt, which removes the elt from the accessibility tree
  function eltP(tag, content, className, style) {
    var e = elt(tag, content, className, style);
    e.setAttribute("role", "presentation");
    return e;
  }

  var range;
  if (document.createRange) {
    range = function (node, start, end, endNode) {
      var r = document.createRange();
      r.setEnd(endNode || node, end);
      r.setStart(node, start);
      return r;
    };
  } else {
    range = function (node, start, end) {
      var r = document.body.createTextRange();
      try {
        r.moveToElementText(node.parentNode);
      } catch (e) {
        return r;
      }
      r.collapse(true);
      r.moveEnd("character", end);
      r.moveStart("character", start);
      return r;
    };
  }

  function contains(parent, child) {
    if (child.nodeType == 3) // Android browser always returns false when child is a textnode
      {
        child = child.parentNode;
      }
    if (parent.contains) {
      return parent.contains(child);
    }
    do {
      if (child.nodeType == 11) {
        child = child.host;
      }
      if (child == parent) {
        return true;
      }
    } while (child = child.parentNode);
  }

  function activeElt() {
    // IE and Edge may throw an "Unspecified Error" when accessing document.activeElement.
    // IE < 10 will throw when accessed while the page is loading or in an iframe.
    // IE > 9 and Edge will throw when accessed in an iframe if document.body is unavailable.
    var activeElement;
    try {
      activeElement = document.activeElement;
    } catch (e) {
      activeElement = document.body || null;
    }
    while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  }

  function addClass(node, cls) {
    var current = node.className;
    if (!classTest(cls).test(current)) {
      node.className += (current ? " " : "") + cls;
    }
  }
  function joinClasses(a, b) {
    var as = a.split(" ");
    for (var i = 0; i < as.length; i++) {
      if (as[i] && !classTest(as[i]).test(b)) {
        b += " " + as[i];
      }
    }
    return b;
  }

  var selectInput = function (node) {
    node.select();
  };
  if (ios) // Mobile Safari apparently has a bug where select() is broken.
    {
      selectInput = function (node) {
        node.selectionStart = 0;node.selectionEnd = node.value.length;
      };
    } else if (ie) // Suppress mysterious IE10 errors
    {
      selectInput = function (node) {
        try {
          node.select();
        } catch (_e) {}
      };
    }

  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      return f.apply(null, args);
    };
  }

  function copyObj(obj, target, overwrite) {
    if (!target) {
      target = {};
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop))) {
        target[prop] = obj[prop];
      }
    }
    return target;
  }

  // Counts the column offset in a string, taking tabs into account.
  // Used mostly to find indentation.
  function countColumn(string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) {
        end = string.length;
      }
    }
    for (var i = startIndex || 0, n = startValue || 0;;) {
      var nextTab = string.indexOf("\t", i);
      if (nextTab < 0 || nextTab >= end) {
        return n + (end - i);
      }
      n += nextTab - i;
      n += tabSize - n % tabSize;
      i = nextTab + 1;
    }
  }

  var Delayed = function () {
    this.id = null;
  };
  Delayed.prototype.set = function (ms, f) {
    clearTimeout(this.id);
    this.id = setTimeout(f, ms);
  };

  function indexOf(array, elt) {
    for (var i = 0; i < array.length; ++i) {
      if (array[i] == elt) {
        return i;
      }
    }
    return -1;
  }

  // Number of pixels added to scroller and sizer to hide scrollbar
  var scrollerGap = 30;

  // Returned or thrown by various protocols to signal 'I'm not
  // handling this'.
  var Pass = { toString: function () {
      return "CodeMirror.Pass";
    } };

  // Reused option objects for setSelection & friends
  var sel_dontScroll = { scroll: false };
  var sel_mouse = { origin: "*mouse" };
  var sel_move = { origin: "+move" };

  // The inverse of countColumn -- find the offset that corresponds to
  // a particular column.
  function findColumn(string, goal, tabSize) {
    for (var pos = 0, col = 0;;) {
      var nextTab = string.indexOf("\t", pos);
      if (nextTab == -1) {
        nextTab = string.length;
      }
      var skipped = nextTab - pos;
      if (nextTab == string.length || col + skipped >= goal) {
        return pos + Math.min(skipped, goal - col);
      }
      col += nextTab - pos;
      col += tabSize - col % tabSize;
      pos = nextTab + 1;
      if (col >= goal) {
        return pos;
      }
    }
  }

  var spaceStrs = [""];
  function spaceStr(n) {
    while (spaceStrs.length <= n) {
      spaceStrs.push(lst(spaceStrs) + " ");
    }
    return spaceStrs[n];
  }

  function lst(arr) {
    return arr[arr.length - 1];
  }

  function map(array, f) {
    var out = [];
    for (var i = 0; i < array.length; i++) {
      out[i] = f(array[i], i);
    }
    return out;
  }

  function insertSorted(array, value, score) {
    var pos = 0,
        priority = score(value);
    while (pos < array.length && score(array[pos]) <= priority) {
      pos++;
    }
    array.splice(pos, 0, value);
  }

  function nothing() {}

  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing();
    }
    if (props) {
      copyObj(props, inst);
    }
    return inst;
  }

  var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  function isWordCharBasic(ch) {
    return (/\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch))
    );
  }
  function isWordChar(ch, helper) {
    if (!helper) {
      return isWordCharBasic(ch);
    }
    if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
      return true;
    }
    return helper.test(ch);
  }

  function isEmpty(obj) {
    for (var n in obj) {
      if (obj.hasOwnProperty(n) && obj[n]) {
        return false;
      }
    }
    return true;
  }

  // Extending unicode characters. A series of a non-extending char +
  // any number of extending chars is treated as a single unit as far
  // as editing and measuring is concerned. This is not fully correct,
  // since some scripts/fonts/browsers also treat other configurations
  // of code points as a group.
  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function isExtendingChar(ch) {
    return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
  }

  // Returns a number from the range [`0`; `str.length`] unless `pos` is outside that range.
  function skipExtendingChars(str, pos, dir) {
    while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
      pos += dir;
    }
    return pos;
  }

  // Returns the value from the range [`from`; `to`] that satisfies
  // `pred` and is closest to `from`. Assumes that at least `to` satisfies `pred`.
  function findFirst(pred, from, to) {
    for (;;) {
      if (Math.abs(from - to) <= 1) {
        return pred(from) ? from : to;
      }
      var mid = Math.floor((from + to) / 2);
      if (pred(mid)) {
        to = mid;
      } else {
        from = mid;
      }
    }
  }

  // The display handles the DOM integration, both for input reading
  // and content drawing. It holds references to DOM nodes and
  // display-related state.

  function Display(place, doc, input) {
    var d = this;
    this.input = input;

    // Covers bottom-right square when both scrollbars are present.
    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
    d.scrollbarFiller.setAttribute("cm-not-content", "true");
    // Covers bottom of gutter when coverGutterNextToScrollbar is on
    // and h scrollbar is present.
    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
    d.gutterFiller.setAttribute("cm-not-content", "true");
    // Will contain the actual code, positioned to cover the viewport.
    d.lineDiv = eltP("div", null, "CodeMirror-code");
    // Elements are added to these to represent selection and cursors.
    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
    // A visibility: hidden element used to find the size of things.
    d.measure = elt("div", null, "CodeMirror-measure");
    // When lines outside of the viewport are measured, they are drawn in this.
    d.lineMeasure = elt("div", null, "CodeMirror-measure");
    // Wraps everything that needs to exist inside the vertically-padded coordinate system
    d.lineSpace = eltP("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv], null, "position: relative; outline: none");
    var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
    // Moved around its parent to cover visible view.
    d.mover = elt("div", [lines], null, "position: relative");
    // Set to the height of the document, allowing scrolling.
    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
    d.sizerWidth = null;
    // Behavior of elts with overflow: auto and padding is
    // inconsistent across browsers. This is used to ensure the
    // scrollable area is big enough.
    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
    // Will contain the gutters, if any.
    d.gutters = elt("div", null, "CodeMirror-gutters");
    d.lineGutter = null;
    // Actual scrollable element.
    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
    d.scroller.setAttribute("tabIndex", "-1");
    // The element in which the editor lives.
    d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");

    // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
    if (ie && ie_version < 8) {
      d.gutters.style.zIndex = -1;d.scroller.style.paddingRight = 0;
    }
    if (!webkit && !(gecko && mobile)) {
      d.scroller.draggable = true;
    }

    if (place) {
      if (place.appendChild) {
        place.appendChild(d.wrapper);
      } else {
        place(d.wrapper);
      }
    }

    // Current rendered range (may be bigger than the view window).
    d.viewFrom = d.viewTo = doc.first;
    d.reportedViewFrom = d.reportedViewTo = doc.first;
    // Information about the rendered lines.
    d.view = [];
    d.renderedView = null;
    // Holds info about a single rendered line when it was rendered
    // for measurement, while not in view.
    d.externalMeasured = null;
    // Empty space (in pixels) above the view
    d.viewOffset = 0;
    d.lastWrapHeight = d.lastWrapWidth = 0;
    d.updateLineNumbers = null;

    d.nativeBarWidth = d.barHeight = d.barWidth = 0;
    d.scrollbarsClipped = false;

    // Used to only resize the line number gutter when necessary (when
    // the amount of lines crosses a boundary that makes its width change)
    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
    // Set to true when a non-horizontal-scrolling line widget is
    // added. As an optimization, line widget aligning is skipped when
    // this is false.
    d.alignWidgets = false;

    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;

    // Tracks the maximum line length so that the horizontal scrollbar
    // can be kept static when scrolling.
    d.maxLine = null;
    d.maxLineLength = 0;
    d.maxLineChanged = false;

    // Used for measuring wheel scrolling granularity
    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;

    // True when shift is held down.
    d.shift = false;

    // Used to track whether anything happened since the context menu
    // was opened.
    d.selForContextMenu = null;

    d.activeTouch = null;

    input.init(d);
  }

  // Find the line object corresponding to the given line number.
  function getLine(doc, n) {
    n -= doc.first;
    if (n < 0 || n >= doc.size) {
      throw new Error("There is no line " + (n + doc.first) + " in the document.");
    }
    var chunk = doc;
    while (!chunk.lines) {
      for (var i = 0;; ++i) {
        var child = chunk.children[i],
            sz = child.chunkSize();
        if (n < sz) {
          chunk = child;break;
        }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }

  // Get the part of a document between two positions, as an array of
  // strings.
  function getBetween(doc, start, end) {
    var out = [],
        n = start.line;
    doc.iter(start.line, end.line + 1, function (line) {
      var text = line.text;
      if (n == end.line) {
        text = text.slice(0, end.ch);
      }
      if (n == start.line) {
        text = text.slice(start.ch);
      }
      out.push(text);
      ++n;
    });
    return out;
  }
  // Get the lines between from and to, as array of strings.
  function getLines(doc, from, to) {
    var out = [];
    doc.iter(from, to, function (line) {
      out.push(line.text);
    }); // iter aborts when callback returns truthy value
    return out;
  }

  // Update the height of a line, propagating the height change
  // upwards to parent nodes.
  function updateLineHeight(line, height) {
    var diff = height - line.height;
    if (diff) {
      for (var n = line; n; n = n.parent) {
        n.height += diff;
      }
    }
  }

  // Given a line object, find its line number by walking up through
  // its parent links.
  function lineNo(line) {
    if (line.parent == null) {
      return null;
    }
    var cur = line.parent,
        no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0;; ++i) {
        if (chunk.children[i] == cur) {
          break;
        }
        no += chunk.children[i].chunkSize();
      }
    }
    return no + cur.first;
  }

  // Find the line at the given vertical position, using the height
  // information in the document tree.
  function lineAtHeight(chunk, h) {
    var n = chunk.first;
    outer: do {
      for (var i$1 = 0; i$1 < chunk.children.length; ++i$1) {
        var child = chunk.children[i$1],
            ch = child.height;
        if (h < ch) {
          chunk = child;continue outer;
        }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    var i = 0;
    for (; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i],
          lh = line.height;
      if (h < lh) {
        break;
      }
      h -= lh;
    }
    return n + i;
  }

  function isLine(doc, l) {
    return l >= doc.first && l < doc.first + doc.size;
  }

  function lineNumberFor(options, i) {
    return String(options.lineNumberFormatter(i + options.firstLineNumber));
  }

  // A Pos instance represents a position within the text.
  function Pos(line, ch, sticky) {
    if (sticky === void 0) sticky = null;

    if (!(this instanceof Pos)) {
      return new Pos(line, ch, sticky);
    }
    this.line = line;
    this.ch = ch;
    this.sticky = sticky;
  }

  // Compare two positions, return 0 if they are the same, a negative
  // number when a is less, and a positive number otherwise.
  function cmp(a, b) {
    return a.line - b.line || a.ch - b.ch;
  }

  function equalCursorPos(a, b) {
    return a.sticky == b.sticky && cmp(a, b) == 0;
  }

  function copyPos(x) {
    return Pos(x.line, x.ch);
  }
  function maxPos(a, b) {
    return cmp(a, b) < 0 ? b : a;
  }
  function minPos(a, b) {
    return cmp(a, b) < 0 ? a : b;
  }

  // Most of the external API clips given positions to make sure they
  // actually exist within the document.
  function clipLine(doc, n) {
    return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));
  }
  function clipPos(doc, pos) {
    if (pos.line < doc.first) {
      return Pos(doc.first, 0);
    }
    var last = doc.first + doc.size - 1;
    if (pos.line > last) {
      return Pos(last, getLine(doc, last).text.length);
    }
    return clipToLen(pos, getLine(doc, pos.line).text.length);
  }
  function clipToLen(pos, linelen) {
    var ch = pos.ch;
    if (ch == null || ch > linelen) {
      return Pos(pos.line, linelen);
    } else if (ch < 0) {
      return Pos(pos.line, 0);
    } else {
      return pos;
    }
  }
  function clipPosArray(doc, array) {
    var out = [];
    for (var i = 0; i < array.length; i++) {
      out[i] = clipPos(doc, array[i]);
    }
    return out;
  }

  // Optimize some code when these features are not used.
  var sawReadOnlySpans = false;
  var sawCollapsedSpans = false;

  function seeReadOnlySpans() {
    sawReadOnlySpans = true;
  }

  function seeCollapsedSpans() {
    sawCollapsedSpans = true;
  }

  // TEXTMARKER SPANS

  function MarkedSpan(marker, from, to) {
    this.marker = marker;
    this.from = from;this.to = to;
  }

  // Search an array of spans for a span matching the given marker.
  function getMarkedSpanFor(spans, marker) {
    if (spans) {
      for (var i = 0; i < spans.length; ++i) {
        var span = spans[i];
        if (span.marker == marker) {
          return span;
        }
      }
    }
  }
  // Remove a span from an array, returning undefined if no spans are
  // left (we don't store arrays for lines without spans).
  function removeMarkedSpan(spans, span) {
    var r;
    for (var i = 0; i < spans.length; ++i) {
      if (spans[i] != span) {
        (r || (r = [])).push(spans[i]);
      }
    }
    return r;
  }
  // Add a span to a line.
  function addMarkedSpan(line, span) {
    line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
    span.marker.attachLine(line);
  }

  // Used for the algorithm that adjusts markers for a change in the
  // document. These functions cut an array of spans at a given
  // character position, returning an array of remaining chunks (or
  // undefined if nothing remains).
  function markedSpansBefore(old, startCh, isInsert) {
    var nw;
    if (old) {
      for (var i = 0; i < old.length; ++i) {
        var span = old[i],
            marker = span.marker;
        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
        if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);(nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
        }
      }
    }
    return nw;
  }
  function markedSpansAfter(old, endCh, isInsert) {
    var nw;
    if (old) {
      for (var i = 0; i < old.length; ++i) {
        var span = old[i],
            marker = span.marker;
        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
        if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);(nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh, span.to == null ? null : span.to - endCh));
        }
      }
    }
    return nw;
  }

  // Given a change object, compute the new set of marker spans that
  // cover the line in which the change took place. Removes spans
  // entirely within the change, reconnects spans belonging to the
  // same marker that appear on both sides of the change, and cuts off
  // spans partially within the change. Returns an array of span
  // arrays with one element for each line in (after) the change.
  function stretchSpansOverChange(doc, change) {
    if (change.full) {
      return null;
    }
    var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
    var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
    if (!oldFirst && !oldLast) {
      return null;
    }

    var startCh = change.from.ch,
        endCh = change.to.ch,
        isInsert = cmp(change.from, change.to) == 0;
    // Get the spans that 'stick out' on both sides
    var first = markedSpansBefore(oldFirst, startCh, isInsert);
    var last = markedSpansAfter(oldLast, endCh, isInsert);

    // Next, merge those two ends
    var sameLine = change.text.length == 1,
        offset = lst(change.text).length + (sameLine ? startCh : 0);
    if (first) {
      // Fix up .to properties of first
      for (var i = 0; i < first.length; ++i) {
        var span = first[i];
        if (span.to == null) {
          var found = getMarkedSpanFor(last, span.marker);
          if (!found) {
            span.to = startCh;
          } else if (sameLine) {
            span.to = found.to == null ? null : found.to + offset;
          }
        }
      }
    }
    if (last) {
      // Fix up .from in last (or move them into first in case of sameLine)
      for (var i$1 = 0; i$1 < last.length; ++i$1) {
        var span$1 = last[i$1];
        if (span$1.to != null) {
          span$1.to += offset;
        }
        if (span$1.from == null) {
          var found$1 = getMarkedSpanFor(first, span$1.marker);
          if (!found$1) {
            span$1.from = offset;
            if (sameLine) {
              (first || (first = [])).push(span$1);
            }
          }
        } else {
          span$1.from += offset;
          if (sameLine) {
            (first || (first = [])).push(span$1);
          }
        }
      }
    }
    // Make sure we didn't create any zero-length spans
    if (first) {
      first = clearEmptySpans(first);
    }
    if (last && last != first) {
      last = clearEmptySpans(last);
    }

    var newMarkers = [first];
    if (!sameLine) {
      // Fill gap with whole-line-spans
      var gap = change.text.length - 2,
          gapMarkers;
      if (gap > 0 && first) {
        for (var i$2 = 0; i$2 < first.length; ++i$2) {
          if (first[i$2].to == null) {
            (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$2].marker, null, null));
          }
        }
      }
      for (var i$3 = 0; i$3 < gap; ++i$3) {
        newMarkers.push(gapMarkers);
      }
      newMarkers.push(last);
    }
    return newMarkers;
  }

  // Remove spans that are empty and don't have a clearWhenEmpty
  // option of false.
  function clearEmptySpans(spans) {
    for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
        spans.splice(i--, 1);
      }
    }
    if (!spans.length) {
      return null;
    }
    return spans;
  }

  // Used to 'clip' out readOnly ranges when making a change.
  function removeReadOnlyRanges(doc, from, to) {
    var markers = null;
    doc.iter(from.line, to.line + 1, function (line) {
      if (line.markedSpans) {
        for (var i = 0; i < line.markedSpans.length; ++i) {
          var mark = line.markedSpans[i].marker;
          if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
            (markers || (markers = [])).push(mark);
          }
        }
      }
    });
    if (!markers) {
      return null;
    }
    var parts = [{ from: from, to: to }];
    for (var i = 0; i < markers.length; ++i) {
      var mk = markers[i],
          m = mk.find(0);
      for (var j = 0; j < parts.length; ++j) {
        var p = parts[j];
        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) {
          continue;
        }
        var newParts = [j, 1],
            dfrom = cmp(p.from, m.from),
            dto = cmp(p.to, m.to);
        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
          newParts.push({ from: p.from, to: m.from });
        }
        if (dto > 0 || !mk.inclusiveRight && !dto) {
          newParts.push({ from: m.to, to: p.to });
        }
        parts.splice.apply(parts, newParts);
        j += newParts.length - 3;
      }
    }
    return parts;
  }

  // Connect or disconnect spans from a line.
  function detachMarkedSpans(line) {
    var spans = line.markedSpans;
    if (!spans) {
      return;
    }
    for (var i = 0; i < spans.length; ++i) {
      spans[i].marker.detachLine(line);
    }
    line.markedSpans = null;
  }
  function attachMarkedSpans(line, spans) {
    if (!spans) {
      return;
    }
    for (var i = 0; i < spans.length; ++i) {
      spans[i].marker.attachLine(line);
    }
    line.markedSpans = spans;
  }

  // Helpers used when computing which overlapping collapsed span
  // counts as the larger one.
  function extraLeft(marker) {
    return marker.inclusiveLeft ? -1 : 0;
  }
  function extraRight(marker) {
    return marker.inclusiveRight ? 1 : 0;
  }

  // Returns a number indicating which of two overlapping collapsed
  // spans is larger (and thus includes the other). Falls back to
  // comparing ids when the spans cover exactly the same range.
  function compareCollapsedMarkers(a, b) {
    var lenDiff = a.lines.length - b.lines.length;
    if (lenDiff != 0) {
      return lenDiff;
    }
    var aPos = a.find(),
        bPos = b.find();
    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
    if (fromCmp) {
      return -fromCmp;
    }
    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
    if (toCmp) {
      return toCmp;
    }
    return b.id - a.id;
  }

  // Find out whether a line ends or starts in a collapsed span. If
  // so, return the marker for that span.
  function collapsedSpanAtSide(line, start) {
    var sps = sawCollapsedSpans && line.markedSpans,
        found;
    if (sps) {
      for (var sp = void 0, i = 0; i < sps.length; ++i) {
        sp = sps[i];
        if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
          found = sp.marker;
        }
      }
    }
    return found;
  }
  function collapsedSpanAtStart(line) {
    return collapsedSpanAtSide(line, true);
  }
  function collapsedSpanAtEnd(line) {
    return collapsedSpanAtSide(line, false);
  }

  // Test whether there exists a collapsed span that partially
  // overlaps (covers the start or end, but not both) of a new span.
  // Such overlap is not allowed.
  function conflictingCollapsedRange(doc, lineNo$$1, from, to, marker) {
    var line = getLine(doc, lineNo$$1);
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) {
      for (var i = 0; i < sps.length; ++i) {
        var sp = sps[i];
        if (!sp.marker.collapsed) {
          continue;
        }
        var found = sp.marker.find(0);
        var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
        var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
        if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
          continue;
        }
        if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
          return true;
        }
      }
    }
  }

  // A visual line is a line as drawn on the screen. Folding, for
  // example, can cause multiple logical lines to appear on the same
  // visual line. This finds the start of the visual line that the
  // given line is part of (usually that is the line itself).
  function visualLine(line) {
    var merged;
    while (merged = collapsedSpanAtStart(line)) {
      line = merged.find(-1, true).line;
    }
    return line;
  }

  function visualLineEnd(line) {
    var merged;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
    }
    return line;
  }

  // Returns an array of logical lines that continue the visual line
  // started by the argument, or undefined if there are no such lines.
  function visualLineContinued(line) {
    var merged, lines;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;(lines || (lines = [])).push(line);
    }
    return lines;
  }

  // Get the line number of the start of the visual line that the
  // given line number is part of.
  function visualLineNo(doc, lineN) {
    var line = getLine(doc, lineN),
        vis = visualLine(line);
    if (line == vis) {
      return lineN;
    }
    return lineNo(vis);
  }

  // Get the line number of the start of the next visual line after
  // the given line.
  function visualLineEndNo(doc, lineN) {
    if (lineN > doc.lastLine()) {
      return lineN;
    }
    var line = getLine(doc, lineN),
        merged;
    if (!lineIsHidden(doc, line)) {
      return lineN;
    }
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
    }
    return lineNo(line) + 1;
  }

  // Compute whether a line is hidden. Lines count as hidden when they
  // are part of a visual line that starts with another line, or when
  // they are entirely covered by collapsed, non-widget span.
  function lineIsHidden(doc, line) {
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) {
      for (var sp = void 0, i = 0; i < sps.length; ++i) {
        sp = sps[i];
        if (!sp.marker.collapsed) {
          continue;
        }
        if (sp.from == null) {
          return true;
        }
        if (sp.marker.widgetNode) {
          continue;
        }
        if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) {
          return true;
        }
      }
    }
  }
  function lineIsHiddenInner(doc, line, span) {
    if (span.to == null) {
      var end = span.marker.find(1, true);
      return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
    }
    if (span.marker.inclusiveRight && span.to == line.text.length) {
      return true;
    }
    for (var sp = void 0, i = 0; i < line.markedSpans.length; ++i) {
      sp = line.markedSpans[i];
      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) {
        return true;
      }
    }
  }

  // Find the height above the given line.
  function heightAtLine(lineObj) {
    lineObj = visualLine(lineObj);

    var h = 0,
        chunk = lineObj.parent;
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i];
      if (line == lineObj) {
        break;
      } else {
        h += line.height;
      }
    }
    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
      for (var i$1 = 0; i$1 < p.children.length; ++i$1) {
        var cur = p.children[i$1];
        if (cur == chunk) {
          break;
        } else {
          h += cur.height;
        }
      }
    }
    return h;
  }

  // Compute the character length of a line, taking into account
  // collapsed ranges (see markText) that might hide parts, and join
  // other lines onto it.
  function lineLength(line) {
    if (line.height == 0) {
      return 0;
    }
    var len = line.text.length,
        merged,
        cur = line;
    while (merged = collapsedSpanAtStart(cur)) {
      var found = merged.find(0, true);
      cur = found.from.line;
      len += found.from.ch - found.to.ch;
    }
    cur = line;
    while (merged = collapsedSpanAtEnd(cur)) {
      var found$1 = merged.find(0, true);
      len -= cur.text.length - found$1.from.ch;
      cur = found$1.to.line;
      len += cur.text.length - found$1.to.ch;
    }
    return len;
  }

  // Find the longest line in the document.
  function findMaxLine(cm) {
    var d = cm.display,
        doc = cm.doc;
    d.maxLine = getLine(doc, doc.first);
    d.maxLineLength = lineLength(d.maxLine);
    d.maxLineChanged = true;
    doc.iter(function (line) {
      var len = lineLength(line);
      if (len > d.maxLineLength) {
        d.maxLineLength = len;
        d.maxLine = line;
      }
    });
  }

  // BIDI HELPERS

  function iterateBidiSections(order, from, to, f) {
    if (!order) {
      return f(from, to, "ltr");
    }
    var found = false;
    for (var i = 0; i < order.length; ++i) {
      var part = order[i];
      if (part.from < to && part.to > from || from == to && part.to == from) {
        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr");
        found = true;
      }
    }
    if (!found) {
      f(from, to, "ltr");
    }
  }

  var bidiOther = null;
  function getBidiPartAt(order, ch, sticky) {
    var found;
    bidiOther = null;
    for (var i = 0; i < order.length; ++i) {
      var cur = order[i];
      if (cur.from < ch && cur.to > ch) {
        return i;
      }
      if (cur.to == ch) {
        if (cur.from != cur.to && sticky == "before") {
          found = i;
        } else {
          bidiOther = i;
        }
      }
      if (cur.from == ch) {
        if (cur.from != cur.to && sticky != "before") {
          found = i;
        } else {
          bidiOther = i;
        }
      }
    }
    return found != null ? found : bidiOther;
  }

  // Bidirectional ordering algorithm
  // See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
  // that this (partially) implements.

  // One-char codes used for character types:
  // L (L):   Left-to-Right
  // R (R):   Right-to-Left
  // r (AL):  Right-to-Left Arabic
  // 1 (EN):  European Number
  // + (ES):  European Number Separator
  // % (ET):  European Number Terminator
  // n (AN):  Arabic Number
  // , (CS):  Common Number Separator
  // m (NSM): Non-Spacing Mark
  // b (BN):  Boundary Neutral
  // s (B):   Paragraph Separator
  // t (S):   Segment Separator
  // w (WS):  Whitespace
  // N (ON):  Other Neutrals

  // Returns null if characters are ordered as they appear
  // (left-to-right), or an array of sections ({from, to, level}
  // objects) in the order in which they occur visually.
  var bidiOrdering = function () {
    // Character types for codepoints 0 to 0xff
    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
    // Character types for codepoints 0x600 to 0x6f9
    var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
    function charType(code) {
      if (code <= 0xf7) {
        return lowTypes.charAt(code);
      } else if (0x590 <= code && code <= 0x5f4) {
        return "R";
      } else if (0x600 <= code && code <= 0x6f9) {
        return arabicTypes.charAt(code - 0x600);
      } else if (0x6ee <= code && code <= 0x8ac) {
        return "r";
      } else if (0x2000 <= code && code <= 0x200b) {
        return "w";
      } else if (code == 0x200c) {
        return "b";
      } else {
        return "L";
      }
    }

    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    var isNeutral = /[stwN]/,
        isStrong = /[LRr]/,
        countsAsLeft = /[Lb1n]/,
        countsAsNum = /[1n]/;

    function BidiSpan(level, from, to) {
      this.level = level;
      this.from = from;this.to = to;
    }

    return function (str, direction) {
      var outerType = direction == "ltr" ? "L" : "R";

      if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
        return false;
      }
      var len = str.length,
          types = [];
      for (var i = 0; i < len; ++i) {
        types.push(charType(str.charCodeAt(i)));
      }

      // W1. Examine each non-spacing mark (NSM) in the level run, and
      // change the type of the NSM to the type of the previous
      // character. If the NSM is at the start of the level run, it will
      // get the type of sor.
      for (var i$1 = 0, prev = outerType; i$1 < len; ++i$1) {
        var type = types[i$1];
        if (type == "m") {
          types[i$1] = prev;
        } else {
          prev = type;
        }
      }

      // W2. Search backwards from each instance of a European number
      // until the first strong type (R, L, AL, or sor) is found. If an
      // AL is found, change the type of the European number to Arabic
      // number.
      // W3. Change all ALs to R.
      for (var i$2 = 0, cur = outerType; i$2 < len; ++i$2) {
        var type$1 = types[i$2];
        if (type$1 == "1" && cur == "r") {
          types[i$2] = "n";
        } else if (isStrong.test(type$1)) {
          cur = type$1;if (type$1 == "r") {
            types[i$2] = "R";
          }
        }
      }

      // W4. A single European separator between two European numbers
      // changes to a European number. A single common separator between
      // two numbers of the same type changes to that type.
      for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
        var type$2 = types[i$3];
        if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
          types[i$3] = "1";
        } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
          types[i$3] = prev$1;
        }
        prev$1 = type$2;
      }

      // W5. A sequence of European terminators adjacent to European
      // numbers changes to all European numbers.
      // W6. Otherwise, separators and terminators change to Other
      // Neutral.
      for (var i$4 = 0; i$4 < len; ++i$4) {
        var type$3 = types[i$4];
        if (type$3 == ",") {
          types[i$4] = "N";
        } else if (type$3 == "%") {
          var end = void 0;
          for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {}
          var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
          for (var j = i$4; j < end; ++j) {
            types[j] = replace;
          }
          i$4 = end - 1;
        }
      }

      // W7. Search backwards from each instance of a European number
      // until the first strong type (R, L, or sor) is found. If an L is
      // found, then change the type of the European number to L.
      for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
        var type$4 = types[i$5];
        if (cur$1 == "L" && type$4 == "1") {
          types[i$5] = "L";
        } else if (isStrong.test(type$4)) {
          cur$1 = type$4;
        }
      }

      // N1. A sequence of neutrals takes the direction of the
      // surrounding strong text if the text on both sides has the same
      // direction. European and Arabic numbers act as if they were R in
      // terms of their influence on neutrals. Start-of-level-run (sor)
      // and end-of-level-run (eor) are used at level run boundaries.
      // N2. Any remaining neutrals take the embedding direction.
      for (var i$6 = 0; i$6 < len; ++i$6) {
        if (isNeutral.test(types[i$6])) {
          var end$1 = void 0;
          for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {}
          var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
          var after = (end$1 < len ? types[end$1] : outerType) == "L";
          var replace$1 = before == after ? before ? "L" : "R" : outerType;
          for (var j$1 = i$6; j$1 < end$1; ++j$1) {
            types[j$1] = replace$1;
          }
          i$6 = end$1 - 1;
        }
      }

      // Here we depart from the documented algorithm, in order to avoid
      // building up an actual levels array. Since there are only three
      // levels (0, 1, 2) in an implementation that doesn't take
      // explicit embedding into account, we can build up the order on
      // the fly, without following the level-based algorithm.
      var order = [],
          m;
      for (var i$7 = 0; i$7 < len;) {
        if (countsAsLeft.test(types[i$7])) {
          var start = i$7;
          for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {}
          order.push(new BidiSpan(0, start, i$7));
        } else {
          var pos = i$7,
              at = order.length;
          for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {}
          for (var j$2 = pos; j$2 < i$7;) {
            if (countsAsNum.test(types[j$2])) {
              if (pos < j$2) {
                order.splice(at, 0, new BidiSpan(1, pos, j$2));
              }
              var nstart = j$2;
              for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {}
              order.splice(at, 0, new BidiSpan(2, nstart, j$2));
              pos = j$2;
            } else {
              ++j$2;
            }
          }
          if (pos < i$7) {
            order.splice(at, 0, new BidiSpan(1, pos, i$7));
          }
        }
      }
      if (order[0].level == 1 && (m = str.match(/^\s+/))) {
        order[0].from = m[0].length;
        order.unshift(new BidiSpan(0, 0, m[0].length));
      }
      if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
        lst(order).to -= m[0].length;
        order.push(new BidiSpan(0, len - m[0].length, len));
      }

      return direction == "rtl" ? order.reverse() : order;
    };
  }();

  // Get the bidi ordering for the given line (and cache it). Returns
  // false for lines that are fully left-to-right, and an array of
  // BidiSpan objects otherwise.
  function getOrder(line, direction) {
    var order = line.order;
    if (order == null) {
      order = line.order = bidiOrdering(line.text, direction);
    }
    return order;
  }

  function moveCharLogically(line, ch, dir) {
    var target = skipExtendingChars(line.text, ch + dir, dir);
    return target < 0 || target > line.text.length ? null : target;
  }

  function moveLogically(line, start, dir) {
    var ch = moveCharLogically(line, start.ch, dir);
    return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
  }

  function endOfLine(visually, cm, lineObj, lineNo, dir) {
    if (visually) {
      var order = getOrder(lineObj, cm.doc.direction);
      if (order) {
        var part = dir < 0 ? lst(order) : order[0];
        var moveInStorageOrder = dir < 0 == (part.level == 1);
        var sticky = moveInStorageOrder ? "after" : "before";
        var ch;
        // With a wrapped rtl chunk (possibly spanning multiple bidi parts),
        // it could be that the last bidi part is not on the last visual line,
        // since visual lines contain content order-consecutive chunks.
        // Thus, in rtl, we are looking for the first (content-order) character
        // in the rtl chunk that is on the last line (that is, the same line
        // as the last (content-order) character).
        if (part.level > 0) {
          var prep = prepareMeasureForLine(cm, lineObj);
          ch = dir < 0 ? lineObj.text.length - 1 : 0;
          var targetTop = measureCharPrepared(cm, prep, ch).top;
          ch = findFirst(function (ch) {
            return measureCharPrepared(cm, prep, ch).top == targetTop;
          }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
          if (sticky == "before") {
            ch = moveCharLogically(lineObj, ch, 1, true);
          }
        } else {
          ch = dir < 0 ? part.to : part.from;
        }
        return new Pos(lineNo, ch, sticky);
      }
    }
    return new Pos(lineNo, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
  }

  function moveVisually(cm, line, start, dir) {
    var bidi = getOrder(line, cm.doc.direction);
    if (!bidi) {
      return moveLogically(line, start, dir);
    }
    if (start.ch >= line.text.length) {
      start.ch = line.text.length;
      start.sticky = "before";
    } else if (start.ch <= 0) {
      start.ch = 0;
      start.sticky = "after";
    }
    var partPos = getBidiPartAt(bidi, start.ch, start.sticky),
        part = bidi[partPos];
    if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
      // Case 1: We move within an ltr part in an ltr editor. Even with wrapped lines,
      // nothing interesting happens.
      return moveLogically(line, start, dir);
    }

    var mv = function (pos, dir) {
      return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir);
    };
    var prep;
    var getWrappedLineExtent = function (ch) {
      if (!cm.options.lineWrapping) {
        return { begin: 0, end: line.text.length };
      }
      prep = prep || prepareMeasureForLine(cm, line);
      return wrappedLineExtentChar(cm, line, prep, ch);
    };
    var wrappedLineExtent = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);

    if (cm.doc.direction == "rtl" || part.level == 1) {
      var moveInStorageOrder = part.level == 1 == dir < 0;
      var ch = mv(start, moveInStorageOrder ? 1 : -1);
      if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent.begin : ch <= part.to && ch <= wrappedLineExtent.end)) {
        // Case 2: We move within an rtl part or in an rtl editor on the same visual line
        var sticky = moveInStorageOrder ? "before" : "after";
        return new Pos(start.line, ch, sticky);
      }
    }

    // Case 3: Could not move within this bidi part in this visual line, so leave
    // the current bidi part

    var searchInVisualLine = function (partPos, dir, wrappedLineExtent) {
      var getRes = function (ch, moveInStorageOrder) {
        return moveInStorageOrder ? new Pos(start.line, mv(ch, 1), "before") : new Pos(start.line, ch, "after");
      };

      for (; partPos >= 0 && partPos < bidi.length; partPos += dir) {
        var part = bidi[partPos];
        var moveInStorageOrder = dir > 0 == (part.level != 1);
        var ch = moveInStorageOrder ? wrappedLineExtent.begin : mv(wrappedLineExtent.end, -1);
        if (part.from <= ch && ch < part.to) {
          return getRes(ch, moveInStorageOrder);
        }
        ch = moveInStorageOrder ? part.from : mv(part.to, -1);
        if (wrappedLineExtent.begin <= ch && ch < wrappedLineExtent.end) {
          return getRes(ch, moveInStorageOrder);
        }
      }
    };

    // Case 3a: Look for other bidi parts on the same visual line
    var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent);
    if (res) {
      return res;
    }

    // Case 3b: Look for other bidi parts on the next visual line
    var nextCh = dir > 0 ? wrappedLineExtent.end : mv(wrappedLineExtent.begin, -1);
    if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
      res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
      if (res) {
        return res;
      }
    }

    // Case 4: Nowhere to move
    return null;
  }

  // EVENT HANDLING

  // Lightweight event framework. on/off also work on DOM nodes,
  // registering native DOM handlers.

  var noHandlers = [];

  var on = function (emitter, type, f) {
    if (emitter.addEventListener) {
      emitter.addEventListener(type, f, false);
    } else if (emitter.attachEvent) {
      emitter.attachEvent("on" + type, f);
    } else {
      var map$$1 = emitter._handlers || (emitter._handlers = {});
      map$$1[type] = (map$$1[type] || noHandlers).concat(f);
    }
  };

  function getHandlers(emitter, type) {
    return emitter._handlers && emitter._handlers[type] || noHandlers;
  }

  function off(emitter, type, f) {
    if (emitter.removeEventListener) {
      emitter.removeEventListener(type, f, false);
    } else if (emitter.detachEvent) {
      emitter.detachEvent("on" + type, f);
    } else {
      var map$$1 = emitter._handlers,
          arr = map$$1 && map$$1[type];
      if (arr) {
        var index = indexOf(arr, f);
        if (index > -1) {
          map$$1[type] = arr.slice(0, index).concat(arr.slice(index + 1));
        }
      }
    }
  }

  function signal(emitter, type /*, values...*/) {
    var handlers = getHandlers(emitter, type);
    if (!handlers.length) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < handlers.length; ++i) {
      handlers[i].apply(null, args);
    }
  }

  // The DOM events that CodeMirror handles can be overridden by
  // registering a (non-DOM) handler on the editor for the event name,
  // and preventDefault-ing the event in that handler.
  function signalDOMEvent(cm, e, override) {
    if (typeof e == "string") {
      e = { type: e, preventDefault: function () {
          this.defaultPrevented = true;
        } };
    }
    signal(cm, override || e.type, cm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore;
  }

  function signalCursorActivity(cm) {
    var arr = cm._handlers && cm._handlers.cursorActivity;
    if (!arr) {
      return;
    }
    var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
    for (var i = 0; i < arr.length; ++i) {
      if (indexOf(set, arr[i]) == -1) {
        set.push(arr[i]);
      }
    }
  }

  function hasHandler(emitter, type) {
    return getHandlers(emitter, type).length > 0;
  }

  // Add on and off methods to a constructor's prototype, to make
  // registering events on such objects more convenient.
  function eventMixin(ctor) {
    ctor.prototype.on = function (type, f) {
      on(this, type, f);
    };
    ctor.prototype.off = function (type, f) {
      off(this, type, f);
    };
  }

  // Due to the fact that we still support jurassic IE versions, some
  // compatibility wrappers are needed.

  function e_preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }
  function e_stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
  function e_defaultPrevented(e) {
    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
  }
  function e_stop(e) {
    e_preventDefault(e);e_stopPropagation(e);
  }

  function e_target(e) {
    return e.target || e.srcElement;
  }
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1) {
        b = 1;
      } else if (e.button & 2) {
        b = 3;
      } else if (e.button & 4) {
        b = 2;
      }
    }
    if (mac && e.ctrlKey && b == 1) {
      b = 3;
    }
    return b;
  }

  // Detect drag-and-drop
  var dragAndDrop = function () {
    // There is *some* kind of drag-and-drop support in IE6-8, but I
    // couldn't get it to work yet.
    if (ie && ie_version < 9) {
      return false;
    }
    var div = elt('div');
    return "draggable" in div || "dragDrop" in div;
  }();

  var zwspSupported;
  function zeroWidthElement(measure) {
    if (zwspSupported == null) {
      var test = elt("span", "\u200b");
      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
      if (measure.firstChild.offsetHeight != 0) {
        zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
      }
    }
    var node = zwspSupported ? elt("span", "\u200b") : elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
    node.setAttribute("cm-text", "");
    return node;
  }

  // Feature-detect IE's crummy client rect reporting for bidi text
  var badBidiRects;
  function hasBadBidiRects(measure) {
    if (badBidiRects != null) {
      return badBidiRects;
    }
    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
    var r0 = range(txt, 0, 1).getBoundingClientRect();
    var r1 = range(txt, 1, 2).getBoundingClientRect();
    removeChildren(measure);
    if (!r0 || r0.left == r0.right) {
      return false;
    } // Safari returns null in some cases (#2780)
    return badBidiRects = r1.right - r0.right < 3;
  }

  // See if "".split is the broken IE version, if so, provide an
  // alternative way to split lines.
  var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function (string) {
    var pos = 0,
        result = [],
        l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1) {
        nl = string.length;
      }
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result;
  } : function (string) {
    return string.split(/\r\n?|\n/);
  };

  var hasSelection = window.getSelection ? function (te) {
    try {
      return te.selectionStart != te.selectionEnd;
    } catch (e) {
      return false;
    }
  } : function (te) {
    var range$$1;
    try {
      range$$1 = te.ownerDocument.selection.createRange();
    } catch (e) {}
    if (!range$$1 || range$$1.parentElement() != te) {
      return false;
    }
    return range$$1.compareEndPoints("StartToEnd", range$$1) != 0;
  };

  var hasCopyEvent = function () {
    var e = elt("div");
    if ("oncopy" in e) {
      return true;
    }
    e.setAttribute("oncopy", "return;");
    return typeof e.oncopy == "function";
  }();

  var badZoomedRects = null;
  function hasBadZoomedRects(measure) {
    if (badZoomedRects != null) {
      return badZoomedRects;
    }
    var node = removeChildrenAndAdd(measure, elt("span", "x"));
    var normal = node.getBoundingClientRect();
    var fromRange = range(node, 0, 1).getBoundingClientRect();
    return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
  }

  // Known modes, by name and by MIME
  var modes = {};
  var mimeModes = {};

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  function defineMode(name, mode) {
    if (arguments.length > 2) {
      mode.dependencies = Array.prototype.slice.call(arguments, 2);
    }
    modes[name] = mode;
  }

  function defineMIME(mime, spec) {
    mimeModes[mime] = spec;
  }

  // Given a MIME type, a {name, ...options} config object, or a name
  // string, return a mode config object.
  function resolveMode(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string") {
        found = { name: found };
      }
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return resolveMode("application/xml");
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
      return resolveMode("application/json");
    }
    if (typeof spec == "string") {
      return { name: spec };
    } else {
      return spec || { name: "null" };
    }
  }

  // Given a mode spec (anything that resolveMode accepts), find and
  // initialize an actual mode object.
  function getMode(options, spec) {
    spec = resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) {
      return getMode(options, "text/plain");
    }
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop in exts) {
        if (!exts.hasOwnProperty(prop)) {
          continue;
        }
        if (modeObj.hasOwnProperty(prop)) {
          modeObj["_" + prop] = modeObj[prop];
        }
        modeObj[prop] = exts[prop];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType) {
      modeObj.helperType = spec.helperType;
    }
    if (spec.modeProps) {
      for (var prop$1 in spec.modeProps) {
        modeObj[prop$1] = spec.modeProps[prop$1];
      }
    }

    return modeObj;
  }

  // This can be used to attach properties to mode objects from
  // outside the actual mode definition.
  var modeExtensions = {};
  function extendMode(mode, properties) {
    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
    copyObj(properties, exts);
  }

  function copyState(mode, state) {
    if (state === true) {
      return state;
    }
    if (mode.copyState) {
      return mode.copyState(state);
    }
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) {
        val = val.concat([]);
      }
      nstate[n] = val;
    }
    return nstate;
  }

  // Given a mode and a state (for that mode), find the inner mode and
  // state at the position that the state refers to.
  function innerMode(mode, state) {
    var info;
    while (mode.innerMode) {
      info = mode.innerMode(state);
      if (!info || info.mode == mode) {
        break;
      }
      state = info.state;
      mode = info.mode;
    }
    return info || { mode: mode, state: state };
  }

  function startState(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  }

  // STRING STREAM

  // Fed to the mode parsers, provides helper functions to make
  // parsers more succinct.

  var StringStream = function (string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
  };

  StringStream.prototype.eol = function () {
    return this.pos >= this.string.length;
  };
  StringStream.prototype.sol = function () {
    return this.pos == this.lineStart;
  };
  StringStream.prototype.peek = function () {
    return this.string.charAt(this.pos) || undefined;
  };
  StringStream.prototype.next = function () {
    if (this.pos < this.string.length) {
      return this.string.charAt(this.pos++);
    }
  };
  StringStream.prototype.eat = function (match) {
    var ch = this.string.charAt(this.pos);
    var ok;
    if (typeof match == "string") {
      ok = ch == match;
    } else {
      ok = ch && (match.test ? match.test(ch) : match(ch));
    }
    if (ok) {
      ++this.pos;return ch;
    }
  };
  StringStream.prototype.eatWhile = function (match) {
    var start = this.pos;
    while (this.eat(match)) {}
    return this.pos > start;
  };
  StringStream.prototype.eatSpace = function () {
    var this$1 = this;

    var start = this.pos;
    while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
      ++this$1.pos;
    }
    return this.pos > start;
  };
  StringStream.prototype.skipToEnd = function () {
    this.pos = this.string.length;
  };
  StringStream.prototype.skipTo = function (ch) {
    var found = this.string.indexOf(ch, this.pos);
    if (found > -1) {
      this.pos = found;return true;
    }
  };
  StringStream.prototype.backUp = function (n) {
    this.pos -= n;
  };
  StringStream.prototype.column = function () {
    if (this.lastColumnPos < this.start) {
      this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
      this.lastColumnPos = this.start;
    }
    return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.indentation = function () {
    return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.match = function (pattern, consume, caseInsensitive) {
    if (typeof pattern == "string") {
      var cased = function (str) {
        return caseInsensitive ? str.toLowerCase() : str;
      };
      var substr = this.string.substr(this.pos, pattern.length);
      if (cased(substr) == cased(pattern)) {
        if (consume !== false) {
          this.pos += pattern.length;
        }
        return true;
      }
    } else {
      var match = this.string.slice(this.pos).match(pattern);
      if (match && match.index > 0) {
        return null;
      }
      if (match && consume !== false) {
        this.pos += match[0].length;
      }
      return match;
    }
  };
  StringStream.prototype.current = function () {
    return this.string.slice(this.start, this.pos);
  };
  StringStream.prototype.hideFirstChars = function (n, inner) {
    this.lineStart += n;
    try {
      return inner();
    } finally {
      this.lineStart -= n;
    }
  };

  // Compute a style array (an array starting with a mode generation
  // -- for invalidation -- followed by pairs of end positions and
  // style strings), which is used to highlight the tokens on the
  // line.
  function highlightLine(cm, line, state, forceToEnd) {
    // A styles array always starts with a number identifying the
    // mode/overlays that it is based on (for easy invalidation).
    var st = [cm.state.modeGen],
        lineClasses = {};
    // Compute the base array of styles
    runMode(cm, line.text, cm.doc.mode, state, function (end, style) {
      return st.push(end, style);
    }, lineClasses, forceToEnd);

    // Run overlays, adjust style array.
    var loop = function (o) {
      var overlay = cm.state.overlays[o],
          i = 1,
          at = 0;
      runMode(cm, line.text, overlay.mode, true, function (end, style) {
        var start = i;
        // Ensure there's a token end at the current position, and that i points at it
        while (at < end) {
          var i_end = st[i];
          if (i_end > end) {
            st.splice(i, 1, end, st[i + 1], i_end);
          }
          i += 2;
          at = Math.min(end, i_end);
        }
        if (!style) {
          return;
        }
        if (overlay.opaque) {
          st.splice(start, i - start, end, "overlay " + style);
          i = start + 2;
        } else {
          for (; start < i; start += 2) {
            var cur = st[start + 1];
            st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
          }
        }
      }, lineClasses);
    };

    for (var o = 0; o < cm.state.overlays.length; ++o) loop(o);

    return { styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null };
  }

  function getLineStyles(cm, line, updateFrontier) {
    if (!line.styles || line.styles[0] != cm.state.modeGen) {
      var state = getStateBefore(cm, lineNo(line));
      var result = highlightLine(cm, line, line.text.length > cm.options.maxHighlightLength ? copyState(cm.doc.mode, state) : state);
      line.stateAfter = state;
      line.styles = result.styles;
      if (result.classes) {
        line.styleClasses = result.classes;
      } else if (line.styleClasses) {
        line.styleClasses = null;
      }
      if (updateFrontier === cm.doc.frontier) {
        cm.doc.frontier++;
      }
    }
    return line.styles;
  }

  function getStateBefore(cm, n, precise) {
    var doc = cm.doc,
        display = cm.display;
    if (!doc.mode.startState) {
      return true;
    }
    var pos = findStartLine(cm, n, precise),
        state = pos > doc.first && getLine(doc, pos - 1).stateAfter;
    if (!state) {
      state = startState(doc.mode);
    } else {
      state = copyState(doc.mode, state);
    }
    doc.iter(pos, n, function (line) {
      processLine(cm, line.text, state);
      var save = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo;
      line.stateAfter = save ? copyState(doc.mode, state) : null;
      ++pos;
    });
    if (precise) {
      doc.frontier = pos;
    }
    return state;
  }

  // Lightweight form of highlight -- proceed over this line and
  // update state, but don't save a style array. Used for lines that
  // aren't currently visible.
  function processLine(cm, text, state, startAt) {
    var mode = cm.doc.mode;
    var stream = new StringStream(text, cm.options.tabSize);
    stream.start = stream.pos = startAt || 0;
    if (text == "") {
      callBlankLine(mode, state);
    }
    while (!stream.eol()) {
      readToken(mode, stream, state);
      stream.start = stream.pos;
    }
  }

  function callBlankLine(mode, state) {
    if (mode.blankLine) {
      return mode.blankLine(state);
    }
    if (!mode.innerMode) {
      return;
    }
    var inner = innerMode(mode, state);
    if (inner.mode.blankLine) {
      return inner.mode.blankLine(inner.state);
    }
  }

  function readToken(mode, stream, state, inner) {
    for (var i = 0; i < 10; i++) {
      if (inner) {
        inner[0] = innerMode(mode, state).mode;
      }
      var style = mode.token(stream, state);
      if (stream.pos > stream.start) {
        return style;
      }
    }
    throw new Error("Mode " + mode.name + " failed to advance stream.");
  }

  // Utility for getTokenAt and getLineTokens
  function takeToken(cm, pos, precise, asArray) {
    var getObj = function (copy) {
      return {
        start: stream.start, end: stream.pos,
        string: stream.current(),
        type: style || null,
        state: copy ? copyState(doc.mode, state) : state
      };
    };

    var doc = cm.doc,
        mode = doc.mode,
        style;
    pos = clipPos(doc, pos);
    var line = getLine(doc, pos.line),
        state = getStateBefore(cm, pos.line, precise);
    var stream = new StringStream(line.text, cm.options.tabSize),
        tokens;
    if (asArray) {
      tokens = [];
    }
    while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
      stream.start = stream.pos;
      style = readToken(mode, stream, state);
      if (asArray) {
        tokens.push(getObj(true));
      }
    }
    return asArray ? tokens : getObj();
  }

  function extractLineClasses(type, output) {
    if (type) {
      for (;;) {
        var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!lineClass) {
          break;
        }
        type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
        var prop = lineClass[1] ? "bgClass" : "textClass";
        if (output[prop] == null) {
          output[prop] = lineClass[2];
        } else if (!new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)").test(output[prop])) {
          output[prop] += " " + lineClass[2];
        }
      }
    }
    return type;
  }

  // Run the given mode's parser over a line, calling f for each token.
  function runMode(cm, text, mode, state, f, lineClasses, forceToEnd) {
    var flattenSpans = mode.flattenSpans;
    if (flattenSpans == null) {
      flattenSpans = cm.options.flattenSpans;
    }
    var curStart = 0,
        curStyle = null;
    var stream = new StringStream(text, cm.options.tabSize),
        style;
    var inner = cm.options.addModeClass && [null];
    if (text == "") {
      extractLineClasses(callBlankLine(mode, state), lineClasses);
    }
    while (!stream.eol()) {
      if (stream.pos > cm.options.maxHighlightLength) {
        flattenSpans = false;
        if (forceToEnd) {
          processLine(cm, text, state, stream.pos);
        }
        stream.pos = text.length;
        style = null;
      } else {
        style = extractLineClasses(readToken(mode, stream, state, inner), lineClasses);
      }
      if (inner) {
        var mName = inner[0].name;
        if (mName) {
          style = "m-" + (style ? mName + " " + style : mName);
        }
      }
      if (!flattenSpans || curStyle != style) {
        while (curStart < stream.start) {
          curStart = Math.min(stream.start, curStart + 5000);
          f(curStart, curStyle);
        }
        curStyle = style;
      }
      stream.start = stream.pos;
    }
    while (curStart < stream.pos) {
      // Webkit seems to refuse to render text nodes longer than 57444
      // characters, and returns inaccurate measurements in nodes
      // starting around 5000 chars.
      var pos = Math.min(stream.pos, curStart + 5000);
      f(pos, curStyle);
      curStart = pos;
    }
  }

  // Finds the line to start with when starting a parse. Tries to
  // find a line with a stateAfter, so that it can start with a
  // valid state. If that fails, it returns the line with the
  // smallest indentation, which tends to need the least context to
  // parse correctly.
  function findStartLine(cm, n, precise) {
    var minindent,
        minline,
        doc = cm.doc;
    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
    for (var search = n; search > lim; --search) {
      if (search <= doc.first) {
        return doc.first;
      }
      var line = getLine(doc, search - 1);
      if (line.stateAfter && (!precise || search <= doc.frontier)) {
        return search;
      }
      var indented = countColumn(line.text, null, cm.options.tabSize);
      if (minline == null || minindent > indented) {
        minline = search - 1;
        minindent = indented;
      }
    }
    return minline;
  }

  // LINE DATA STRUCTURE

  // Line objects. These hold state related to a line, including
  // highlighting info (the styles array).
  var Line = function (text, markedSpans, estimateHeight) {
    this.text = text;
    attachMarkedSpans(this, markedSpans);
    this.height = estimateHeight ? estimateHeight(this) : 1;
  };

  Line.prototype.lineNo = function () {
    return lineNo(this);
  };
  eventMixin(Line);

  // Change the content (text, markers) of a line. Automatically
  // invalidates cached information and tries to re-estimate the
  // line's height.
  function updateLine(line, text, markedSpans, estimateHeight) {
    line.text = text;
    if (line.stateAfter) {
      line.stateAfter = null;
    }
    if (line.styles) {
      line.styles = null;
    }
    if (line.order != null) {
      line.order = null;
    }
    detachMarkedSpans(line);
    attachMarkedSpans(line, markedSpans);
    var estHeight = estimateHeight ? estimateHeight(line) : 1;
    if (estHeight != line.height) {
      updateLineHeight(line, estHeight);
    }
  }

  // Detach a line from the document tree and its markers.
  function cleanUpLine(line) {
    line.parent = null;
    detachMarkedSpans(line);
  }

  // Convert a style as returned by a mode (either null, or a string
  // containing one or more styles) to a CSS style. This is cached,
  // and also looks for line-wide styles.
  var styleToClassCache = {};
  var styleToClassCacheWithMode = {};
  function interpretTokenStyle(style, options) {
    if (!style || /^\s*$/.test(style)) {
      return null;
    }
    var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
    return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
  }

  // Render the DOM representation of the text of a line. Also builds
  // up a 'line map', which points at the DOM nodes that represent
  // specific stretches of text, and is used by the measuring code.
  // The returned object contains the DOM node, this map, and
  // information about line-wide styles that were set by the mode.
  function buildLineContent(cm, lineView) {
    // The padding-right forces the element to have a 'border', which
    // is needed on Webkit to be able to get line-level bounding
    // rectangles for it (in measureChar).
    var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
    var builder = { pre: eltP("pre", [content], "CodeMirror-line"), content: content,
      col: 0, pos: 0, cm: cm,
      trailingSpace: false,
      splitSpaces: (ie || webkit) && cm.getOption("lineWrapping") };
    lineView.measure = {};

    // Iterate over the logical lines that make up this visual line.
    for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
      var line = i ? lineView.rest[i - 1] : lineView.line,
          order = void 0;
      builder.pos = 0;
      builder.addToken = buildToken;
      // Optionally wire in some hacks into the token-rendering
      // algorithm, to deal with browser quirks.
      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction))) {
        builder.addToken = buildTokenBadBidi(builder.addToken, order);
      }
      builder.map = [];
      var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
      insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
      if (line.styleClasses) {
        if (line.styleClasses.bgClass) {
          builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
        }
        if (line.styleClasses.textClass) {
          builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
        }
      }

      // Ensure at least a single node is present, for measuring.
      if (builder.map.length == 0) {
        builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
      }

      // Store the map and a cache object for the current logical line
      if (i == 0) {
        lineView.measure.map = builder.map;
        lineView.measure.cache = {};
      } else {
        (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);(lineView.measure.caches || (lineView.measure.caches = [])).push({});
      }
    }

    // See issue #2901
    if (webkit) {
      var last = builder.content.lastChild;
      if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
        builder.content.className = "cm-tab-wrap-hack";
      }
    }

    signal(cm, "renderLine", cm, lineView.line, builder.pre);
    if (builder.pre.className) {
      builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
    }

    return builder;
  }

  function defaultSpecialCharPlaceholder(ch) {
    var token = elt("span", "\u2022", "cm-invalidchar");
    token.title = "\\u" + ch.charCodeAt(0).toString(16);
    token.setAttribute("aria-label", token.title);
    return token;
  }

  // Build up the DOM representation for a single token, and add it to
  // the line map. Takes care to render special characters separately.
  function buildToken(builder, text, style, startStyle, endStyle, title, css) {
    if (!text) {
      return;
    }
    var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
    var special = builder.cm.state.specialChars,
        mustWrap = false;
    var content;
    if (!special.test(text)) {
      builder.col += text.length;
      content = document.createTextNode(displayText);
      builder.map.push(builder.pos, builder.pos + text.length, content);
      if (ie && ie_version < 9) {
        mustWrap = true;
      }
      builder.pos += text.length;
    } else {
      content = document.createDocumentFragment();
      var pos = 0;
      while (true) {
        special.lastIndex = pos;
        var m = special.exec(text);
        var skipped = m ? m.index - pos : text.length - pos;
        if (skipped) {
          var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
          if (ie && ie_version < 9) {
            content.appendChild(elt("span", [txt]));
          } else {
            content.appendChild(txt);
          }
          builder.map.push(builder.pos, builder.pos + skipped, txt);
          builder.col += skipped;
          builder.pos += skipped;
        }
        if (!m) {
          break;
        }
        pos += skipped + 1;
        var txt$1 = void 0;
        if (m[0] == "\t") {
          var tabSize = builder.cm.options.tabSize,
              tabWidth = tabSize - builder.col % tabSize;
          txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
          txt$1.setAttribute("role", "presentation");
          txt$1.setAttribute("cm-text", "\t");
          builder.col += tabWidth;
        } else if (m[0] == "\r" || m[0] == "\n") {
          txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
          txt$1.setAttribute("cm-text", m[0]);
          builder.col += 1;
        } else {
          txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
          txt$1.setAttribute("cm-text", m[0]);
          if (ie && ie_version < 9) {
            content.appendChild(elt("span", [txt$1]));
          } else {
            content.appendChild(txt$1);
          }
          builder.col += 1;
        }
        builder.map.push(builder.pos, builder.pos + 1, txt$1);
        builder.pos++;
      }
    }
    builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
    if (style || startStyle || endStyle || mustWrap || css) {
      var fullStyle = style || "";
      if (startStyle) {
        fullStyle += startStyle;
      }
      if (endStyle) {
        fullStyle += endStyle;
      }
      var token = elt("span", [content], fullStyle, css);
      if (title) {
        token.title = title;
      }
      return builder.content.appendChild(token);
    }
    builder.content.appendChild(content);
  }

  function splitSpaces(text, trailingBefore) {
    if (text.length > 1 && !/  /.test(text)) {
      return text;
    }
    var spaceBefore = trailingBefore,
        result = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch == " " && spaceBefore && (i == text.length - 1 || text.charCodeAt(i + 1) == 32)) {
        ch = "\u00a0";
      }
      result += ch;
      spaceBefore = ch == " ";
    }
    return result;
  }

  // Work around nonsense dimensions being reported for stretches of
  // right-to-left text.
  function buildTokenBadBidi(inner, order) {
    return function (builder, text, style, startStyle, endStyle, title, css) {
      style = style ? style + " cm-force-border" : "cm-force-border";
      var start = builder.pos,
          end = start + text.length;
      for (;;) {
        // Find the part that overlaps with the start of this text
        var part = void 0;
        for (var i = 0; i < order.length; i++) {
          part = order[i];
          if (part.to > start && part.from <= start) {
            break;
          }
        }
        if (part.to >= end) {
          return inner(builder, text, style, startStyle, endStyle, title, css);
        }
        inner(builder, text.slice(0, part.to - start), style, startStyle, null, title, css);
        startStyle = null;
        text = text.slice(part.to - start);
        start = part.to;
      }
    };
  }

  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
    var widget = !ignoreWidget && marker.widgetNode;
    if (widget) {
      builder.map.push(builder.pos, builder.pos + size, widget);
    }
    if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
      if (!widget) {
        widget = builder.content.appendChild(document.createElement("span"));
      }
      widget.setAttribute("cm-marker", marker.id);
    }
    if (widget) {
      builder.cm.display.input.setUneditable(widget);
      builder.content.appendChild(widget);
    }
    builder.pos += size;
    builder.trailingSpace = false;
  }

  // Outputs a number of spans to make up a line, taking highlighting
  // and marked text into account.
  function insertLineContent(line, builder, styles) {
    var spans = line.markedSpans,
        allText = line.text,
        at = 0;
    if (!spans) {
      for (var i$1 = 1; i$1 < styles.length; i$1 += 2) {
        builder.addToken(builder, allText.slice(at, at = styles[i$1]), interpretTokenStyle(styles[i$1 + 1], builder.cm.options));
      }
      return;
    }

    var len = allText.length,
        pos = 0,
        i = 1,
        text = "",
        style,
        css;
    var nextChange = 0,
        spanStyle,
        spanEndStyle,
        spanStartStyle,
        title,
        collapsed;
    for (;;) {
      if (nextChange == pos) {
        // Update current marker set
        spanStyle = spanEndStyle = spanStartStyle = title = css = "";
        collapsed = null;nextChange = Infinity;
        var foundBookmarks = [],
            endStyles = void 0;
        for (var j = 0; j < spans.length; ++j) {
          var sp = spans[j],
              m = sp.marker;
          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
            foundBookmarks.push(m);
          } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
            if (sp.to != null && sp.to != pos && nextChange > sp.to) {
              nextChange = sp.to;
              spanEndStyle = "";
            }
            if (m.className) {
              spanStyle += " " + m.className;
            }
            if (m.css) {
              css = (css ? css + ";" : "") + m.css;
            }
            if (m.startStyle && sp.from == pos) {
              spanStartStyle += " " + m.startStyle;
            }
            if (m.endStyle && sp.to == nextChange) {
              (endStyles || (endStyles = [])).push(m.endStyle, sp.to);
            }
            if (m.title && !title) {
              title = m.title;
            }
            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) {
              collapsed = sp;
            }
          } else if (sp.from > pos && nextChange > sp.from) {
            nextChange = sp.from;
          }
        }
        if (endStyles) {
          for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
            if (endStyles[j$1 + 1] == nextChange) {
              spanEndStyle += " " + endStyles[j$1];
            }
          }
        }

        if (!collapsed || collapsed.from == pos) {
          for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
            buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
          }
        }
        if (collapsed && (collapsed.from || 0) == pos) {
          buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos, collapsed.marker, collapsed.from == null);
          if (collapsed.to == null) {
            return;
          }
          if (collapsed.to == pos) {
            collapsed = false;
          }
        }
      }
      if (pos >= len) {
        break;
      }

      var upto = Math.min(len, nextChange);
      while (true) {
        if (text) {
          var end = pos + text.length;
          if (!collapsed) {
            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
            builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title, css);
          }
          if (end >= upto) {
            text = text.slice(upto - pos);pos = upto;break;
          }
          pos = end;
          spanStartStyle = "";
        }
        text = allText.slice(at, at = styles[i++]);
        style = interpretTokenStyle(styles[i++], builder.cm.options);
      }
    }
  }

  // These objects are used to represent the visible (currently drawn)
  // part of the document. A LineView may correspond to multiple
  // logical lines, if those are connected by collapsed ranges.
  function LineView(doc, line, lineN) {
    // The starting line
    this.line = line;
    // Continuing lines, if any
    this.rest = visualLineContinued(line);
    // Number of logical lines in this visual line
    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
    this.node = this.text = null;
    this.hidden = lineIsHidden(doc, line);
  }

  // Create a range of LineView objects for the given lines.
  function buildViewArray(cm, from, to) {
    var array = [],
        nextPos;
    for (var pos = from; pos < to; pos = nextPos) {
      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
      nextPos = pos + view.size;
      array.push(view);
    }
    return array;
  }

  var operationGroup = null;

  function pushOperation(op) {
    if (operationGroup) {
      operationGroup.ops.push(op);
    } else {
      op.ownsGroup = operationGroup = {
        ops: [op],
        delayedCallbacks: []
      };
    }
  }

  function fireCallbacksForOps(group) {
    // Calls delayed callbacks and cursorActivity handlers until no
    // new ones appear
    var callbacks = group.delayedCallbacks,
        i = 0;
    do {
      for (; i < callbacks.length; i++) {
        callbacks[i].call(null);
      }
      for (var j = 0; j < group.ops.length; j++) {
        var op = group.ops[j];
        if (op.cursorActivityHandlers) {
          while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
            op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
          }
        }
      }
    } while (i < callbacks.length);
  }

  function finishOperation(op, endCb) {
    var group = op.ownsGroup;
    if (!group) {
      return;
    }

    try {
      fireCallbacksForOps(group);
    } finally {
      operationGroup = null;
      endCb(group);
    }
  }

  var orphanDelayedCallbacks = null;

  // Often, we want to signal events at a point where we are in the
  // middle of some work, but don't want the handler to start calling
  // other methods on the editor, which might be in an inconsistent
  // state or simply not expect any other events to happen.
  // signalLater looks whether there are any handlers, and schedules
  // them to be executed when the last operation ends, or, if no
  // operation is active, when a timeout fires.
  function signalLater(emitter, type /*, values...*/) {
    var arr = getHandlers(emitter, type);
    if (!arr.length) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 2),
        list;
    if (operationGroup) {
      list = operationGroup.delayedCallbacks;
    } else if (orphanDelayedCallbacks) {
      list = orphanDelayedCallbacks;
    } else {
      list = orphanDelayedCallbacks = [];
      setTimeout(fireOrphanDelayed, 0);
    }
    var loop = function (i) {
      list.push(function () {
        return arr[i].apply(null, args);
      });
    };

    for (var i = 0; i < arr.length; ++i) loop(i);
  }

  function fireOrphanDelayed() {
    var delayed = orphanDelayedCallbacks;
    orphanDelayedCallbacks = null;
    for (var i = 0; i < delayed.length; ++i) {
      delayed[i]();
    }
  }

  // When an aspect of a line changes, a string is added to
  // lineView.changes. This updates the relevant part of the line's
  // DOM structure.
  function updateLineForChanges(cm, lineView, lineN, dims) {
    for (var j = 0; j < lineView.changes.length; j++) {
      var type = lineView.changes[j];
      if (type == "text") {
        updateLineText(cm, lineView);
      } else if (type == "gutter") {
        updateLineGutter(cm, lineView, lineN, dims);
      } else if (type == "class") {
        updateLineClasses(cm, lineView);
      } else if (type == "widget") {
        updateLineWidgets(cm, lineView, dims);
      }
    }
    lineView.changes = null;
  }

  // Lines with gutter elements, widgets or a background class need to
  // be wrapped, and have the extra elements added to the wrapper div
  function ensureLineWrapped(lineView) {
    if (lineView.node == lineView.text) {
      lineView.node = elt("div", null, null, "position: relative");
      if (lineView.text.parentNode) {
        lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
      }
      lineView.node.appendChild(lineView.text);
      if (ie && ie_version < 8) {
        lineView.node.style.zIndex = 2;
      }
    }
    return lineView.node;
  }

  function updateLineBackground(cm, lineView) {
    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
    if (cls) {
      cls += " CodeMirror-linebackground";
    }
    if (lineView.background) {
      if (cls) {
        lineView.background.className = cls;
      } else {
        lineView.background.parentNode.removeChild(lineView.background);lineView.background = null;
      }
    } else if (cls) {
      var wrap = ensureLineWrapped(lineView);
      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
      cm.display.input.setUneditable(lineView.background);
    }
  }

  // Wrapper around buildLineContent which will reuse the structure
  // in display.externalMeasured when possible.
  function getLineContent(cm, lineView) {
    var ext = cm.display.externalMeasured;
    if (ext && ext.line == lineView.line) {
      cm.display.externalMeasured = null;
      lineView.measure = ext.measure;
      return ext.built;
    }
    return buildLineContent(cm, lineView);
  }

  // Redraw the line's text. Interacts with the background and text
  // classes because the mode may output tokens that influence these
  // classes.
  function updateLineText(cm, lineView) {
    var cls = lineView.text.className;
    var built = getLineContent(cm, lineView);
    if (lineView.text == lineView.node) {
      lineView.node = built.pre;
    }
    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
    lineView.text = built.pre;
    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
      lineView.bgClass = built.bgClass;
      lineView.textClass = built.textClass;
      updateLineClasses(cm, lineView);
    } else if (cls) {
      lineView.text.className = cls;
    }
  }

  function updateLineClasses(cm, lineView) {
    updateLineBackground(cm, lineView);
    if (lineView.line.wrapClass) {
      ensureLineWrapped(lineView).className = lineView.line.wrapClass;
    } else if (lineView.node != lineView.text) {
      lineView.node.className = "";
    }
    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
    lineView.text.className = textClass || "";
  }

  function updateLineGutter(cm, lineView, lineN, dims) {
    if (lineView.gutter) {
      lineView.node.removeChild(lineView.gutter);
      lineView.gutter = null;
    }
    if (lineView.gutterBackground) {
      lineView.node.removeChild(lineView.gutterBackground);
      lineView.gutterBackground = null;
    }
    if (lineView.line.gutterClass) {
      var wrap = ensureLineWrapped(lineView);
      lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass, "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px");
      cm.display.input.setUneditable(lineView.gutterBackground);
      wrap.insertBefore(lineView.gutterBackground, lineView.text);
    }
    var markers = lineView.line.gutterMarkers;
    if (cm.options.lineNumbers || markers) {
      var wrap$1 = ensureLineWrapped(lineView);
      var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
      cm.display.input.setUneditable(gutterWrap);
      wrap$1.insertBefore(gutterWrap, lineView.text);
      if (lineView.line.gutterClass) {
        gutterWrap.className += " " + lineView.line.gutterClass;
      }
      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
        lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"));
      }
      if (markers) {
        for (var k = 0; k < cm.options.gutters.length; ++k) {
          var id = cm.options.gutters[k],
              found = markers.hasOwnProperty(id) && markers[id];
          if (found) {
            gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
          }
        }
      }
    }
  }

  function updateLineWidgets(cm, lineView, dims) {
    if (lineView.alignable) {
      lineView.alignable = null;
    }
    for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
      next = node.nextSibling;
      if (node.className == "CodeMirror-linewidget") {
        lineView.node.removeChild(node);
      }
    }
    insertLineWidgets(cm, lineView, dims);
  }

  // Build a line's DOM representation from scratch
  function buildLineElement(cm, lineView, lineN, dims) {
    var built = getLineContent(cm, lineView);
    lineView.text = lineView.node = built.pre;
    if (built.bgClass) {
      lineView.bgClass = built.bgClass;
    }
    if (built.textClass) {
      lineView.textClass = built.textClass;
    }

    updateLineClasses(cm, lineView);
    updateLineGutter(cm, lineView, lineN, dims);
    insertLineWidgets(cm, lineView, dims);
    return lineView.node;
  }

  // A lineView may contain multiple logical lines (when merged by
  // collapsed spans). The widgets for all of them need to be drawn.
  function insertLineWidgets(cm, lineView, dims) {
    insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
    if (lineView.rest) {
      for (var i = 0; i < lineView.rest.length; i++) {
        insertLineWidgetsFor(cm, lineView.rest[i], lineView, dims, false);
      }
    }
  }

  function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
    if (!line.widgets) {
      return;
    }
    var wrap = ensureLineWrapped(lineView);
    for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
      var widget = ws[i],
          node = elt("div", [widget.node], "CodeMirror-linewidget");
      if (!widget.handleMouseEvents) {
        node.setAttribute("cm-ignore-events", "true");
      }
      positionLineWidget(widget, node, lineView, dims);
      cm.display.input.setUneditable(node);
      if (allowAbove && widget.above) {
        wrap.insertBefore(node, lineView.gutter || lineView.text);
      } else {
        wrap.appendChild(node);
      }
      signalLater(widget, "redraw");
    }
  }

  function positionLineWidget(widget, node, lineView, dims) {
    if (widget.noHScroll) {
      (lineView.alignable || (lineView.alignable = [])).push(node);
      var width = dims.wrapperWidth;
      node.style.left = dims.fixedPos + "px";
      if (!widget.coverGutter) {
        width -= dims.gutterTotalWidth;
        node.style.paddingLeft = dims.gutterTotalWidth + "px";
      }
      node.style.width = width + "px";
    }
    if (widget.coverGutter) {
      node.style.zIndex = 5;
      node.style.position = "relative";
      if (!widget.noHScroll) {
        node.style.marginLeft = -dims.gutterTotalWidth + "px";
      }
    }
  }

  function widgetHeight(widget) {
    if (widget.height != null) {
      return widget.height;
    }
    var cm = widget.doc.cm;
    if (!cm) {
      return 0;
    }
    if (!contains(document.body, widget.node)) {
      var parentStyle = "position: relative;";
      if (widget.coverGutter) {
        parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
      }
      if (widget.noHScroll) {
        parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
      }
      removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
    }
    return widget.height = widget.node.parentNode.offsetHeight;
  }

  // Return true when the given mouse event happened in a widget
  function eventInWidget(display, e) {
    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
      if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) {
        return true;
      }
    }
  }

  // POSITION MEASUREMENT

  function paddingTop(display) {
    return display.lineSpace.offsetTop;
  }
  function paddingVert(display) {
    return display.mover.offsetHeight - display.lineSpace.offsetHeight;
  }
  function paddingH(display) {
    if (display.cachedPaddingH) {
      return display.cachedPaddingH;
    }
    var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    var data = { left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight) };
    if (!isNaN(data.left) && !isNaN(data.right)) {
      display.cachedPaddingH = data;
    }
    return data;
  }

  function scrollGap(cm) {
    return scrollerGap - cm.display.nativeBarWidth;
  }
  function displayWidth(cm) {
    return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
  }
  function displayHeight(cm) {
    return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
  }

  // Ensure the lineView.wrapping.heights array is populated. This is
  // an array of bottom offsets for the lines that make up a drawn
  // line. When lineWrapping is on, there might be more than one
  // height.
  function ensureLineHeights(cm, lineView, rect) {
    var wrapping = cm.options.lineWrapping;
    var curWidth = wrapping && displayWidth(cm);
    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
      var heights = lineView.measure.heights = [];
      if (wrapping) {
        lineView.measure.width = curWidth;
        var rects = lineView.text.firstChild.getClientRects();
        for (var i = 0; i < rects.length - 1; i++) {
          var cur = rects[i],
              next = rects[i + 1];
          if (Math.abs(cur.bottom - next.bottom) > 2) {
            heights.push((cur.bottom + next.top) / 2 - rect.top);
          }
        }
      }
      heights.push(rect.bottom - rect.top);
    }
  }

  // Find a line map (mapping character offsets to text nodes) and a
  // measurement cache for the given line number. (A line view might
  // contain multiple lines when collapsed ranges are present.)
  function mapFromLineView(lineView, line, lineN) {
    if (lineView.line == line) {
      return { map: lineView.measure.map, cache: lineView.measure.cache };
    }
    for (var i = 0; i < lineView.rest.length; i++) {
      if (lineView.rest[i] == line) {
        return { map: lineView.measure.maps[i], cache: lineView.measure.caches[i] };
      }
    }
    for (var i$1 = 0; i$1 < lineView.rest.length; i$1++) {
      if (lineNo(lineView.rest[i$1]) > lineN) {
        return { map: lineView.measure.maps[i$1], cache: lineView.measure.caches[i$1], before: true };
      }
    }
  }

  // Render a line into the hidden node display.externalMeasured. Used
  // when measurement is needed for a line that's not in the viewport.
  function updateExternalMeasurement(cm, line) {
    line = visualLine(line);
    var lineN = lineNo(line);
    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
    view.lineN = lineN;
    var built = view.built = buildLineContent(cm, view);
    view.text = built.pre;
    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
    return view;
  }

  // Get a {top, bottom, left, right} box (in line-local coordinates)
  // for a given character.
  function measureChar(cm, line, ch, bias) {
    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
  }

  // Find a line view that corresponds to the given line number.
  function findViewForLine(cm, lineN) {
    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
      return cm.display.view[findViewIndex(cm, lineN)];
    }
    var ext = cm.display.externalMeasured;
    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
      return ext;
    }
  }

  // Measurement can be split in two steps, the set-up work that
  // applies to the whole line, and the measurement of the actual
  // character. Functions like coordsChar, that need to do a lot of
  // measurements in a row, can thus ensure that the set-up work is
  // only done once.
  function prepareMeasureForLine(cm, line) {
    var lineN = lineNo(line);
    var view = findViewForLine(cm, lineN);
    if (view && !view.text) {
      view = null;
    } else if (view && view.changes) {
      updateLineForChanges(cm, view, lineN, getDimensions(cm));
      cm.curOp.forceUpdate = true;
    }
    if (!view) {
      view = updateExternalMeasurement(cm, line);
    }

    var info = mapFromLineView(view, line, lineN);
    return {
      line: line, view: view, rect: null,
      map: info.map, cache: info.cache, before: info.before,
      hasHeights: false
    };
  }

  // Given a prepared measurement object, measures the position of an
  // actual character (or fetches it from the cache).
  function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
    if (prepared.before) {
      ch = -1;
    }
    var key = ch + (bias || ""),
        found;
    if (prepared.cache.hasOwnProperty(key)) {
      found = prepared.cache[key];
    } else {
      if (!prepared.rect) {
        prepared.rect = prepared.view.text.getBoundingClientRect();
      }
      if (!prepared.hasHeights) {
        ensureLineHeights(cm, prepared.view, prepared.rect);
        prepared.hasHeights = true;
      }
      found = measureCharInner(cm, prepared, ch, bias);
      if (!found.bogus) {
        prepared.cache[key] = found;
      }
    }
    return { left: found.left, right: found.right,
      top: varHeight ? found.rtop : found.top,
      bottom: varHeight ? found.rbottom : found.bottom };
  }

  var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };

  function nodeAndOffsetInLineMap(map$$1, ch, bias) {
    var node, start, end, collapse, mStart, mEnd;
    // First, search the line map for the text node corresponding to,
    // or closest to, the target character.
    for (var i = 0; i < map$$1.length; i += 3) {
      mStart = map$$1[i];
      mEnd = map$$1[i + 1];
      if (ch < mStart) {
        start = 0;end = 1;
        collapse = "left";
      } else if (ch < mEnd) {
        start = ch - mStart;
        end = start + 1;
      } else if (i == map$$1.length - 3 || ch == mEnd && map$$1[i + 3] > ch) {
        end = mEnd - mStart;
        start = end - 1;
        if (ch >= mEnd) {
          collapse = "right";
        }
      }
      if (start != null) {
        node = map$$1[i + 2];
        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
          collapse = bias;
        }
        if (bias == "left" && start == 0) {
          while (i && map$$1[i - 2] == map$$1[i - 3] && map$$1[i - 1].insertLeft) {
            node = map$$1[(i -= 3) + 2];
            collapse = "left";
          }
        }
        if (bias == "right" && start == mEnd - mStart) {
          while (i < map$$1.length - 3 && map$$1[i + 3] == map$$1[i + 4] && !map$$1[i + 5].insertLeft) {
            node = map$$1[(i += 3) + 2];
            collapse = "right";
          }
        }
        break;
      }
    }
    return { node: node, start: start, end: end, collapse: collapse, coverStart: mStart, coverEnd: mEnd };
  }

  function getUsefulRect(rects, bias) {
    var rect = nullRect;
    if (bias == "left") {
      for (var i = 0; i < rects.length; i++) {
        if ((rect = rects[i]).left != rect.right) {
          break;
        }
      }
    } else {
      for (var i$1 = rects.length - 1; i$1 >= 0; i$1--) {
        if ((rect = rects[i$1]).left != rect.right) {
          break;
        }
      }
    }
    return rect;
  }

  function measureCharInner(cm, prepared, ch, bias) {
    var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
    var node = place.node,
        start = place.start,
        end = place.end,
        collapse = place.collapse;

    var rect;
    if (node.nodeType == 3) {
      // If it is a text node, use a range to retrieve the coordinates.
      for (var i$1 = 0; i$1 < 4; i$1++) {
        // Retry a maximum of 4 times when nonsense rectangles are returned
        while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
          --start;
        }
        while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
          ++end;
        }
        if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
          rect = node.parentNode.getBoundingClientRect();
        } else {
          rect = getUsefulRect(range(node, start, end).getClientRects(), bias);
        }
        if (rect.left || rect.right || start == 0) {
          break;
        }
        end = start;
        start = start - 1;
        collapse = "right";
      }
      if (ie && ie_version < 11) {
        rect = maybeUpdateRectForZooming(cm.display.measure, rect);
      }
    } else {
      // If it is a widget, simply get the box for the whole widget.
      if (start > 0) {
        collapse = bias = "right";
      }
      var rects;
      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
        rect = rects[bias == "right" ? rects.length - 1 : 0];
      } else {
        rect = node.getBoundingClientRect();
      }
    }
    if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
      var rSpan = node.parentNode.getClientRects()[0];
      if (rSpan) {
        rect = { left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom };
      } else {
        rect = nullRect;
      }
    }

    var rtop = rect.top - prepared.rect.top,
        rbot = rect.bottom - prepared.rect.top;
    var mid = (rtop + rbot) / 2;
    var heights = prepared.view.measure.heights;
    var i = 0;
    for (; i < heights.length - 1; i++) {
      if (mid < heights[i]) {
        break;
      }
    }
    var top = i ? heights[i - 1] : 0,
        bot = heights[i];
    var result = { left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
      right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
      top: top, bottom: bot };
    if (!rect.left && !rect.right) {
      result.bogus = true;
    }
    if (!cm.options.singleCursorHeightPerLine) {
      result.rtop = rtop;result.rbottom = rbot;
    }

    return result;
  }

  // Work around problem with bounding client rects on ranges being
  // returned incorrectly when zoomed on IE10 and below.
  function maybeUpdateRectForZooming(measure, rect) {
    if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
      return rect;
    }
    var scaleX = screen.logicalXDPI / screen.deviceXDPI;
    var scaleY = screen.logicalYDPI / screen.deviceYDPI;
    return { left: rect.left * scaleX, right: rect.right * scaleX,
      top: rect.top * scaleY, bottom: rect.bottom * scaleY };
  }

  function clearLineMeasurementCacheFor(lineView) {
    if (lineView.measure) {
      lineView.measure.cache = {};
      lineView.measure.heights = null;
      if (lineView.rest) {
        for (var i = 0; i < lineView.rest.length; i++) {
          lineView.measure.caches[i] = {};
        }
      }
    }
  }

  function clearLineMeasurementCache(cm) {
    cm.display.externalMeasure = null;
    removeChildren(cm.display.lineMeasure);
    for (var i = 0; i < cm.display.view.length; i++) {
      clearLineMeasurementCacheFor(cm.display.view[i]);
    }
  }

  function clearCaches(cm) {
    clearLineMeasurementCache(cm);
    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
    if (!cm.options.lineWrapping) {
      cm.display.maxLineChanged = true;
    }
    cm.display.lineNumChars = null;
  }

  function pageScrollX() {
    // Work around https://bugs.chromium.org/p/chromium/issues/detail?id=489206
    // which causes page_Offset and bounding client rects to use
    // different reference viewports and invalidate our calculations.
    if (chrome && android) {
      return -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft));
    }
    return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
  }
  function pageScrollY() {
    if (chrome && android) {
      return -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop));
    }
    return window.pageYOffset || (document.documentElement || document.body).scrollTop;
  }

  // Converts a {top, bottom, left, right} box from line-local
  // coordinates into another coordinate system. Context may be one of
  // "line", "div" (display.lineDiv), "local"./null (editor), "window",
  // or "page".
  function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
    if (!includeWidgets && lineObj.widgets) {
      for (var i = 0; i < lineObj.widgets.length; ++i) {
        if (lineObj.widgets[i].above) {
          var size = widgetHeight(lineObj.widgets[i]);
          rect.top += size;rect.bottom += size;
        }
      }
    }
    if (context == "line") {
      return rect;
    }
    if (!context) {
      context = "local";
    }
    var yOff = heightAtLine(lineObj);
    if (context == "local") {
      yOff += paddingTop(cm.display);
    } else {
      yOff -= cm.display.viewOffset;
    }
    if (context == "page" || context == "window") {
      var lOff = cm.display.lineSpace.getBoundingClientRect();
      yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
      rect.left += xOff;rect.right += xOff;
    }
    rect.top += yOff;rect.bottom += yOff;
    return rect;
  }

  // Coverts a box from "div" coords to another coordinate system.
  // Context may be "window", "page", "div", or "local"./null.
  function fromCoordSystem(cm, coords, context) {
    if (context == "div") {
      return coords;
    }
    var left = coords.left,
        top = coords.top;
    // First move into "page" coordinate system
    if (context == "page") {
      left -= pageScrollX();
      top -= pageScrollY();
    } else if (context == "local" || !context) {
      var localBox = cm.display.sizer.getBoundingClientRect();
      left += localBox.left;
      top += localBox.top;
    }

    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
    return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
  }

  function charCoords(cm, pos, context, lineObj, bias) {
    if (!lineObj) {
      lineObj = getLine(cm.doc, pos.line);
    }
    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
  }

  // Returns a box for a given cursor position, which may have an
  // 'other' property containing the position of the secondary cursor
  // on a bidi boundary.
  // A cursor Pos(line, char, "before") is on the same visual line as `char - 1`
  // and after `char - 1` in writing order of `char - 1`
  // A cursor Pos(line, char, "after") is on the same visual line as `char`
  // and before `char` in writing order of `char`
  // Examples (upper-case letters are RTL, lower-case are LTR):
  //     Pos(0, 1, ...)
  //     before   after
  // ab     a|b     a|b
  // aB     a|B     aB|
  // Ab     |Ab     A|b
  // AB     B|A     B|A
  // Every position after the last character on a line is considered to stick
  // to the last character on the line.
  function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
    lineObj = lineObj || getLine(cm.doc, pos.line);
    if (!preparedMeasure) {
      preparedMeasure = prepareMeasureForLine(cm, lineObj);
    }
    function get(ch, right) {
      var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left", varHeight);
      if (right) {
        m.left = m.right;
      } else {
        m.right = m.left;
      }
      return intoCoordSystem(cm, lineObj, m, context);
    }
    var order = getOrder(lineObj, cm.doc.direction),
        ch = pos.ch,
        sticky = pos.sticky;
    if (ch >= lineObj.text.length) {
      ch = lineObj.text.length;
      sticky = "before";
    } else if (ch <= 0) {
      ch = 0;
      sticky = "after";
    }
    if (!order) {
      return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
    }

    function getBidi(ch, partPos, invert) {
      var part = order[partPos],
          right = part.level % 2 != 0;
      return get(invert ? ch - 1 : ch, right != invert);
    }
    var partPos = getBidiPartAt(order, ch, sticky);
    var other = bidiOther;
    var val = getBidi(ch, partPos, sticky == "before");
    if (other != null) {
      val.other = getBidi(ch, other, sticky != "before");
    }
    return val;
  }

  // Used to cheaply estimate the coordinates for a position. Used for
  // intermediate scroll updates.
  function estimateCoords(cm, pos) {
    var left = 0;
    pos = clipPos(cm.doc, pos);
    if (!cm.options.lineWrapping) {
      left = charWidth(cm.display) * pos.ch;
    }
    var lineObj = getLine(cm.doc, pos.line);
    var top = heightAtLine(lineObj) + paddingTop(cm.display);
    return { left: left, right: left, top: top, bottom: top + lineObj.height };
  }

  // Positions returned by coordsChar contain some extra information.
  // xRel is the relative x position of the input coordinates compared
  // to the found position (so xRel > 0 means the coordinates are to
  // the right of the character position, for example). When outside
  // is true, that means the coordinates lie outside the line's
  // vertical range.
  function PosWithInfo(line, ch, sticky, outside, xRel) {
    var pos = Pos(line, ch, sticky);
    pos.xRel = xRel;
    if (outside) {
      pos.outside = true;
    }
    return pos;
  }

  // Compute the character position closest to the given coordinates.
  // Input must be lineSpace-local ("div" coordinate system).
  function coordsChar(cm, x, y) {
    var doc = cm.doc;
    y += cm.display.viewOffset;
    if (y < 0) {
      return PosWithInfo(doc.first, 0, null, true, -1);
    }
    var lineN = lineAtHeight(doc, y),
        last = doc.first + doc.size - 1;
    if (lineN > last) {
      return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, null, true, 1);
    }
    if (x < 0) {
      x = 0;
    }

    var lineObj = getLine(doc, lineN);
    for (;;) {
      var found = coordsCharInner(cm, lineObj, lineN, x, y);
      var merged = collapsedSpanAtEnd(lineObj);
      var mergedPos = merged && merged.find(0, true);
      if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0)) {
        lineN = lineNo(lineObj = mergedPos.to.line);
      } else {
        return found;
      }
    }
  }

  function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
    var measure = function (ch) {
      return intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, ch), "line");
    };
    var end = lineObj.text.length;
    var begin = findFirst(function (ch) {
      return measure(ch - 1).bottom <= y;
    }, end, 0);
    end = findFirst(function (ch) {
      return measure(ch).top > y;
    }, begin, end);
    return { begin: begin, end: end };
  }

  function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
    var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
    return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop);
  }

  function coordsCharInner(cm, lineObj, lineNo$$1, x, y) {
    y -= heightAtLine(lineObj);
    var begin = 0,
        end = lineObj.text.length;
    var preparedMeasure = prepareMeasureForLine(cm, lineObj);
    var pos;
    var order = getOrder(lineObj, cm.doc.direction);
    if (order) {
      if (cm.options.lineWrapping) {
        var assign;
        assign = wrappedLineExtent(cm, lineObj, preparedMeasure, y), begin = assign.begin, end = assign.end, assign;
      }
      pos = new Pos(lineNo$$1, begin);
      var beginLeft = cursorCoords(cm, pos, "line", lineObj, preparedMeasure).left;
      var dir = beginLeft < x ? 1 : -1;
      var prevDiff,
          diff = beginLeft - x,
          prevPos;
      do {
        prevDiff = diff;
        prevPos = pos;
        pos = moveVisually(cm, lineObj, pos, dir);
        if (pos == null || pos.ch < begin || end <= (pos.sticky == "before" ? pos.ch - 1 : pos.ch)) {
          pos = prevPos;
          break;
        }
        diff = cursorCoords(cm, pos, "line", lineObj, preparedMeasure).left - x;
      } while (dir < 0 != diff < 0 && Math.abs(diff) <= Math.abs(prevDiff));
      if (Math.abs(diff) > Math.abs(prevDiff)) {
        if (diff < 0 == prevDiff < 0) {
          throw new Error("Broke out of infinite loop in coordsCharInner");
        }
        pos = prevPos;
      }
    } else {
      var ch = findFirst(function (ch) {
        var box = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, ch), "line");
        if (box.top > y) {
          // For the cursor stickiness
          end = Math.min(ch, end);
          return true;
        } else if (box.bottom <= y) {
          return false;
        } else if (box.left > x) {
          return true;
        } else if (box.right < x) {
          return false;
        } else {
          return x - box.left < box.right - x;
        }
      }, begin, end);
      ch = skipExtendingChars(lineObj.text, ch, 1);
      pos = new Pos(lineNo$$1, ch, ch == end ? "before" : "after");
    }
    var coords = cursorCoords(cm, pos, "line", lineObj, preparedMeasure);
    if (y < coords.top || coords.bottom < y) {
      pos.outside = true;
    }
    pos.xRel = x < coords.left ? -1 : x > coords.right ? 1 : 0;
    return pos;
  }

  var measureText;
  // Compute the default text height.
  function textHeight(display) {
    if (display.cachedTextHeight != null) {
      return display.cachedTextHeight;
    }
    if (measureText == null) {
      measureText = elt("pre");
      // Measure a bunch of lines, for browsers that compute
      // fractional heights.
      for (var i = 0; i < 49; ++i) {
        measureText.appendChild(document.createTextNode("x"));
        measureText.appendChild(elt("br"));
      }
      measureText.appendChild(document.createTextNode("x"));
    }
    removeChildrenAndAdd(display.measure, measureText);
    var height = measureText.offsetHeight / 50;
    if (height > 3) {
      display.cachedTextHeight = height;
    }
    removeChildren(display.measure);
    return height || 1;
  }

  // Compute the default character width.
  function charWidth(display) {
    if (display.cachedCharWidth != null) {
      return display.cachedCharWidth;
    }
    var anchor = elt("span", "xxxxxxxxxx");
    var pre = elt("pre", [anchor]);
    removeChildrenAndAdd(display.measure, pre);
    var rect = anchor.getBoundingClientRect(),
        width = (rect.right - rect.left) / 10;
    if (width > 2) {
      display.cachedCharWidth = width;
    }
    return width || 10;
  }

  // Do a bulk-read of the DOM positions and sizes needed to draw the
  // view, so that we don't interleave reading and writing to the DOM.
  function getDimensions(cm) {
    var d = cm.display,
        left = {},
        width = {};
    var gutterLeft = d.gutters.clientLeft;
    for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
      left[cm.options.gutters[i]] = n.offsetLeft + n.clientLeft + gutterLeft;
      width[cm.options.gutters[i]] = n.clientWidth;
    }
    return { fixedPos: compensateForHScroll(d),
      gutterTotalWidth: d.gutters.offsetWidth,
      gutterLeft: left,
      gutterWidth: width,
      wrapperWidth: d.wrapper.clientWidth };
  }

  // Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
  // but using getBoundingClientRect to get a sub-pixel-accurate
  // result.
  function compensateForHScroll(display) {
    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
  }

  // Returns a function that estimates the height of a line, to use as
  // first approximation until the line becomes visible (and is thus
  // properly measurable).
  function estimateHeight(cm) {
    var th = textHeight(cm.display),
        wrapping = cm.options.lineWrapping;
    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
    return function (line) {
      if (lineIsHidden(cm.doc, line)) {
        return 0;
      }

      var widgetsHeight = 0;
      if (line.widgets) {
        for (var i = 0; i < line.widgets.length; i++) {
          if (line.widgets[i].height) {
            widgetsHeight += line.widgets[i].height;
          }
        }
      }

      if (wrapping) {
        return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
      } else {
        return widgetsHeight + th;
      }
    };
  }

  function estimateLineHeights(cm) {
    var doc = cm.doc,
        est = estimateHeight(cm);
    doc.iter(function (line) {
      var estHeight = est(line);
      if (estHeight != line.height) {
        updateLineHeight(line, estHeight);
      }
    });
  }

  // Given a mouse event, find the corresponding position. If liberal
  // is false, it checks whether a gutter or scrollbar was clicked,
  // and returns null if it was. forRect is used by rectangular
  // selections, and tries to estimate a character position even for
  // coordinates beyond the right of the text.
  function posFromMouse(cm, e, liberal, forRect) {
    var display = cm.display;
    if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") {
      return null;
    }

    var x,
        y,
        space = display.lineSpace.getBoundingClientRect();
    // Fails unpredictably on IE[67] when mouse is dragged around quickly.
    try {
      x = e.clientX - space.left;y = e.clientY - space.top;
    } catch (e) {
      return null;
    }
    var coords = coordsChar(cm, x, y),
        line;
    if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
      coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
    }
    return coords;
  }

  // Find the view element corresponding to a given line. Return null
  // when the line isn't visible.
  function findViewIndex(cm, n) {
    if (n >= cm.display.viewTo) {
      return null;
    }
    n -= cm.display.viewFrom;
    if (n < 0) {
      return null;
    }
    var view = cm.display.view;
    for (var i = 0; i < view.length; i++) {
      n -= view[i].size;
      if (n < 0) {
        return i;
      }
    }
  }

  function updateSelection(cm) {
    cm.display.input.showSelection(cm.display.input.prepareSelection());
  }

  function prepareSelection(cm, primary) {
    var doc = cm.doc,
        result = {};
    var curFragment = result.cursors = document.createDocumentFragment();
    var selFragment = result.selection = document.createDocumentFragment();

    for (var i = 0; i < doc.sel.ranges.length; i++) {
      if (primary === false && i == doc.sel.primIndex) {
        continue;
      }
      var range$$1 = doc.sel.ranges[i];
      if (range$$1.from().line >= cm.display.viewTo || range$$1.to().line < cm.display.viewFrom) {
        continue;
      }
      var collapsed = range$$1.empty();
      if (collapsed || cm.options.showCursorWhenSelecting) {
        drawSelectionCursor(cm, range$$1.head, curFragment);
      }
      if (!collapsed) {
        drawSelectionRange(cm, range$$1, selFragment);
      }
    }
    return result;
  }

  // Draws a cursor for the given range
  function drawSelectionCursor(cm, head, output) {
    var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);

    var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
    cursor.style.left = pos.left + "px";
    cursor.style.top = pos.top + "px";
    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";

    if (pos.other) {
      // Secondary cursor, shown when on a 'jump' in bi-directional text
      var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      otherCursor.style.display = "";
      otherCursor.style.left = pos.other.left + "px";
      otherCursor.style.top = pos.other.top + "px";
      otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
    }
  }

  // Draws the given range as a highlighted selection
  function drawSelectionRange(cm, range$$1, output) {
    var display = cm.display,
        doc = cm.doc;
    var fragment = document.createDocumentFragment();
    var padding = paddingH(cm.display),
        leftSide = padding.left;
    var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;

    function add(left, top, width, bottom) {
      if (top < 0) {
        top = 0;
      }
      top = Math.round(top);
      bottom = Math.round(bottom);
      fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
    }

    function drawForLine(line, fromArg, toArg) {
      var lineObj = getLine(doc, line);
      var lineLen = lineObj.text.length;
      var start, end;
      function coords(ch, bias) {
        return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
      }

      iterateBidiSections(getOrder(lineObj, doc.direction), fromArg || 0, toArg == null ? lineLen : toArg, function (from, to, dir) {
        var leftPos = coords(from, "left"),
            rightPos,
            left,
            right;
        if (from == to) {
          rightPos = leftPos;
          left = right = leftPos.left;
        } else {
          rightPos = coords(to - 1, "right");
          if (dir == "rtl") {
            var tmp = leftPos;leftPos = rightPos;rightPos = tmp;
          }
          left = leftPos.left;
          right = rightPos.right;
        }
        if (fromArg == null && from == 0) {
          left = leftSide;
        }
        if (rightPos.top - leftPos.top > 3) {
          // Different lines, draw top part
          add(left, leftPos.top, null, leftPos.bottom);
          left = leftSide;
          if (leftPos.bottom < rightPos.top) {
            add(left, leftPos.bottom, null, rightPos.top);
          }
        }
        if (toArg == null && to == lineLen) {
          right = rightSide;
        }
        if (!start || leftPos.top < start.top || leftPos.top == start.top && leftPos.left < start.left) {
          start = leftPos;
        }
        if (!end || rightPos.bottom > end.bottom || rightPos.bottom == end.bottom && rightPos.right > end.right) {
          end = rightPos;
        }
        if (left < leftSide + 1) {
          left = leftSide;
        }
        add(left, rightPos.top, right - left, rightPos.bottom);
      });
      return { start: start, end: end };
    }

    var sFrom = range$$1.from(),
        sTo = range$$1.to();
    if (sFrom.line == sTo.line) {
      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
    } else {
      var fromLine = getLine(doc, sFrom.line),
          toLine = getLine(doc, sTo.line);
      var singleVLine = visualLine(fromLine) == visualLine(toLine);
      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
      if (singleVLine) {
        if (leftEnd.top < rightStart.top - 2) {
          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
        } else {
          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
        }
      }
      if (leftEnd.bottom < rightStart.top) {
        add(leftSide, leftEnd.bottom, null, rightStart.top);
      }
    }

    output.appendChild(fragment);
  }

  // Cursor-blinking
  function restartBlink(cm) {
    if (!cm.state.focused) {
      return;
    }
    var display = cm.display;
    clearInterval(display.blinker);
    var on = true;
    display.cursorDiv.style.visibility = "";
    if (cm.options.cursorBlinkRate > 0) {
      display.blinker = setInterval(function () {
        return display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden";
      }, cm.options.cursorBlinkRate);
    } else if (cm.options.cursorBlinkRate < 0) {
      display.cursorDiv.style.visibility = "hidden";
    }
  }

  function ensureFocus(cm) {
    if (!cm.state.focused) {
      cm.display.input.focus();onFocus(cm);
    }
  }

  function delayBlurEvent(cm) {
    cm.state.delayingBlurEvent = true;
    setTimeout(function () {
      if (cm.state.delayingBlurEvent) {
        cm.state.delayingBlurEvent = false;
        onBlur(cm);
      }
    }, 100);
  }

  function onFocus(cm, e) {
    if (cm.state.delayingBlurEvent) {
      cm.state.delayingBlurEvent = false;
    }

    if (cm.options.readOnly == "nocursor") {
      return;
    }
    if (!cm.state.focused) {
      signal(cm, "focus", cm, e);
      cm.state.focused = true;
      addClass(cm.display.wrapper, "CodeMirror-focused");
      // This test prevents this from firing when a context
      // menu is closed (since the input reset would kill the
      // select-all detection hack)
      if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
        cm.display.input.reset();
        if (webkit) {
          setTimeout(function () {
            return cm.display.input.reset(true);
          }, 20);
        } // Issue #1730
      }
      cm.display.input.receivedFocus();
    }
    restartBlink(cm);
  }
  function onBlur(cm, e) {
    if (cm.state.delayingBlurEvent) {
      return;
    }

    if (cm.state.focused) {
      signal(cm, "blur", cm, e);
      cm.state.focused = false;
      rmClass(cm.display.wrapper, "CodeMirror-focused");
    }
    clearInterval(cm.display.blinker);
    setTimeout(function () {
      if (!cm.state.focused) {
        cm.display.shift = false;
      }
    }, 150);
  }

  // Re-align line numbers and gutter marks to compensate for
  // horizontal scrolling.
  function alignHorizontally(cm) {
    var display = cm.display,
        view = display.view;
    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) {
      return;
    }
    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
    var gutterW = display.gutters.offsetWidth,
        left = comp + "px";
    for (var i = 0; i < view.length; i++) {
      if (!view[i].hidden) {
        if (cm.options.fixedGutter) {
          if (view[i].gutter) {
            view[i].gutter.style.left = left;
          }
          if (view[i].gutterBackground) {
            view[i].gutterBackground.style.left = left;
          }
        }
        var align = view[i].alignable;
        if (align) {
          for (var j = 0; j < align.length; j++) {
            align[j].style.left = left;
          }
        }
      }
    }
    if (cm.options.fixedGutter) {
      display.gutters.style.left = comp + gutterW + "px";
    }
  }

  // Used to ensure that the line number gutter is still the right
  // size for the current document size. Returns true when an update
  // is needed.
  function maybeUpdateLineNumberWidth(cm) {
    if (!cm.options.lineNumbers) {
      return false;
    }
    var doc = cm.doc,
        last = lineNumberFor(cm.options, doc.first + doc.size - 1),
        display = cm.display;
    if (last.length != display.lineNumChars) {
      var test = display.measure.appendChild(elt("div", [elt("div", last)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
      var innerW = test.firstChild.offsetWidth,
          padding = test.offsetWidth - innerW;
      display.lineGutter.style.width = "";
      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
      display.lineNumWidth = display.lineNumInnerWidth + padding;
      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
      display.lineGutter.style.width = display.lineNumWidth + "px";
      updateGutterSpace(cm);
      return true;
    }
    return false;
  }

  // Read the actual heights of the rendered lines, and update their
  // stored heights to match.
  function updateHeightsInViewport(cm) {
    var display = cm.display;
    var prevBottom = display.lineDiv.offsetTop;
    for (var i = 0; i < display.view.length; i++) {
      var cur = display.view[i],
          height = void 0;
      if (cur.hidden) {
        continue;
      }
      if (ie && ie_version < 8) {
        var bot = cur.node.offsetTop + cur.node.offsetHeight;
        height = bot - prevBottom;
        prevBottom = bot;
      } else {
        var box = cur.node.getBoundingClientRect();
        height = box.bottom - box.top;
      }
      var diff = cur.line.height - height;
      if (height < 2) {
        height = textHeight(display);
      }
      if (diff > .001 || diff < -.001) {
        updateLineHeight(cur.line, height);
        updateWidgetHeight(cur.line);
        if (cur.rest) {
          for (var j = 0; j < cur.rest.length; j++) {
            updateWidgetHeight(cur.rest[j]);
          }
        }
      }
    }
  }

  // Read and store the height of line widgets associated with the
  // given line.
  function updateWidgetHeight(line) {
    if (line.widgets) {
      for (var i = 0; i < line.widgets.length; ++i) {
        line.widgets[i].height = line.widgets[i].node.parentNode.offsetHeight;
      }
    }
  }

  // Compute the lines that are visible in a given viewport (defaults
  // the the current scroll position). viewport may contain top,
  // height, and ensure (see op.scrollToPos) properties.
  function visibleLines(display, doc, viewport) {
    var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
    top = Math.floor(top - paddingTop(display));
    var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;

    var from = lineAtHeight(doc, top),
        to = lineAtHeight(doc, bottom);
    // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
    // forces those lines into the viewport (if possible).
    if (viewport && viewport.ensure) {
      var ensureFrom = viewport.ensure.from.line,
          ensureTo = viewport.ensure.to.line;
      if (ensureFrom < from) {
        from = ensureFrom;
        to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
      } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
        from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
        to = ensureTo;
      }
    }
    return { from: from, to: Math.max(to, from + 1) };
  }

  // Sync the scrollable area and scrollbars, ensure the viewport
  // covers the visible area.
  function setScrollTop(cm, val) {
    if (Math.abs(cm.doc.scrollTop - val) < 2) {
      return;
    }
    cm.doc.scrollTop = val;
    if (!gecko) {
      updateDisplaySimple(cm, { top: val });
    }
    if (cm.display.scroller.scrollTop != val) {
      cm.display.scroller.scrollTop = val;
    }
    cm.display.scrollbars.setScrollTop(val);
    if (gecko) {
      updateDisplaySimple(cm);
    }
    startWorker(cm, 100);
  }
  // Sync scroller and scrollbar, ensure the gutter elements are
  // aligned.
  function setScrollLeft(cm, val, isScroller) {
    if (isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) {
      return;
    }
    val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
    cm.doc.scrollLeft = val;
    alignHorizontally(cm);
    if (cm.display.scroller.scrollLeft != val) {
      cm.display.scroller.scrollLeft = val;
    }
    cm.display.scrollbars.setScrollLeft(val);
  }

  // Since the delta values reported on mouse wheel events are
  // unstandardized between browsers and even browser versions, and
  // generally horribly unpredictable, this code starts by measuring
  // the scroll effect that the first few mouse wheel events have,
  // and, from that, detects the way it can convert deltas to pixel
  // offsets afterwards.
  //
  // The reason we want to know the amount a wheel event will scroll
  // is that it gives us a chance to update the display before the
  // actual scrolling happens, reducing flickering.

  var wheelSamples = 0;
  var wheelPixelsPerUnit = null;
  // Fill in a browser-detected starting value on browsers where we
  // know one. These don't have to be accurate -- the result of them
  // being wrong would just be a slight flicker on the first wheel
  // scroll (if it is large enough).
  if (ie) {
    wheelPixelsPerUnit = -.53;
  } else if (gecko) {
    wheelPixelsPerUnit = 15;
  } else if (chrome) {
    wheelPixelsPerUnit = -.7;
  } else if (safari) {
    wheelPixelsPerUnit = -1 / 3;
  }

  function wheelEventDelta(e) {
    var dx = e.wheelDeltaX,
        dy = e.wheelDeltaY;
    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) {
      dx = e.detail;
    }
    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) {
      dy = e.detail;
    } else if (dy == null) {
      dy = e.wheelDelta;
    }
    return { x: dx, y: dy };
  }
  function wheelEventPixels(e) {
    var delta = wheelEventDelta(e);
    delta.x *= wheelPixelsPerUnit;
    delta.y *= wheelPixelsPerUnit;
    return delta;
  }

  function onScrollWheel(cm, e) {
    var delta = wheelEventDelta(e),
        dx = delta.x,
        dy = delta.y;

    var display = cm.display,
        scroll = display.scroller;
    // Quit if there's nothing to scroll here
    var canScrollX = scroll.scrollWidth > scroll.clientWidth;
    var canScrollY = scroll.scrollHeight > scroll.clientHeight;
    if (!(dx && canScrollX || dy && canScrollY)) {
      return;
    }

    // Webkit browsers on OS X abort momentum scrolls when the target
    // of the scroll event is removed from the scrollable element.
    // This hack (see related code in patchDisplay) makes sure the
    // element is kept around.
    if (dy && mac && webkit) {
      outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
        for (var i = 0; i < view.length; i++) {
          if (view[i].node == cur) {
            cm.display.currentWheelTarget = cur;
            break outer;
          }
        }
      }
    }

    // On some browsers, horizontal scrolling will cause redraws to
    // happen before the gutter has been realigned, causing it to
    // wriggle around in a most unseemly way. When we have an
    // estimated pixels/delta value, we just handle horizontal
    // scrolling entirely here. It'll be slightly off from native, but
    // better than glitching out.
    if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
      if (dy && canScrollY) {
        setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight)));
      }
      setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth)));
      // Only prevent default scrolling if vertical scrolling is
      // actually possible. Otherwise, it causes vertical scroll
      // jitter on OSX trackpads when deltaX is small and deltaY
      // is large (issue #3579)
      if (!dy || dy && canScrollY) {
        e_preventDefault(e);
      }
      display.wheelStartX = null; // Abort measurement, if in progress
      return;
    }

    // 'Project' the visible viewport to cover the area that is being
    // scrolled into view (if we know enough to estimate it).
    if (dy && wheelPixelsPerUnit != null) {
      var pixels = dy * wheelPixelsPerUnit;
      var top = cm.doc.scrollTop,
          bot = top + display.wrapper.clientHeight;
      if (pixels < 0) {
        top = Math.max(0, top + pixels - 50);
      } else {
        bot = Math.min(cm.doc.height, bot + pixels + 50);
      }
      updateDisplaySimple(cm, { top: top, bottom: bot });
    }

    if (wheelSamples < 20) {
      if (display.wheelStartX == null) {
        display.wheelStartX = scroll.scrollLeft;display.wheelStartY = scroll.scrollTop;
        display.wheelDX = dx;display.wheelDY = dy;
        setTimeout(function () {
          if (display.wheelStartX == null) {
            return;
          }
          var movedX = scroll.scrollLeft - display.wheelStartX;
          var movedY = scroll.scrollTop - display.wheelStartY;
          var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
          display.wheelStartX = display.wheelStartY = null;
          if (!sample) {
            return;
          }
          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
          ++wheelSamples;
        }, 200);
      } else {
        display.wheelDX += dx;display.wheelDY += dy;
      }
    }
  }

  // SCROLLBARS

  // Prepare DOM reads needed to update the scrollbars. Done in one
  // shot to minimize update/measure roundtrips.
  function measureForScrollbars(cm) {
    var d = cm.display,
        gutterW = d.gutters.offsetWidth;
    var docH = Math.round(cm.doc.height + paddingVert(cm.display));
    return {
      clientHeight: d.scroller.clientHeight,
      viewHeight: d.wrapper.clientHeight,
      scrollWidth: d.scroller.scrollWidth, clientWidth: d.scroller.clientWidth,
      viewWidth: d.wrapper.clientWidth,
      barLeft: cm.options.fixedGutter ? gutterW : 0,
      docHeight: docH,
      scrollHeight: docH + scrollGap(cm) + d.barHeight,
      nativeBarWidth: d.nativeBarWidth,
      gutterWidth: gutterW
    };
  }

  var NativeScrollbars = function (place, scroll, cm) {
    this.cm = cm;
    var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
    var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    place(vert);place(horiz);

    on(vert, "scroll", function () {
      if (vert.clientHeight) {
        scroll(vert.scrollTop, "vertical");
      }
    });
    on(horiz, "scroll", function () {
      if (horiz.clientWidth) {
        scroll(horiz.scrollLeft, "horizontal");
      }
    });

    this.checkedZeroWidth = false;
    // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
    if (ie && ie_version < 8) {
      this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
    }
  };

  NativeScrollbars.prototype.update = function (measure) {
    var needsH = measure.scrollWidth > measure.clientWidth + 1;
    var needsV = measure.scrollHeight > measure.clientHeight + 1;
    var sWidth = measure.nativeBarWidth;

    if (needsV) {
      this.vert.style.display = "block";
      this.vert.style.bottom = needsH ? sWidth + "px" : "0";
      var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
      // A bug in IE8 can cause this value to be negative, so guard it.
      this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
    } else {
      this.vert.style.display = "";
      this.vert.firstChild.style.height = "0";
    }

    if (needsH) {
      this.horiz.style.display = "block";
      this.horiz.style.right = needsV ? sWidth + "px" : "0";
      this.horiz.style.left = measure.barLeft + "px";
      var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
      this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
    } else {
      this.horiz.style.display = "";
      this.horiz.firstChild.style.width = "0";
    }

    if (!this.checkedZeroWidth && measure.clientHeight > 0) {
      if (sWidth == 0) {
        this.zeroWidthHack();
      }
      this.checkedZeroWidth = true;
    }

    return { right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0 };
  };

  NativeScrollbars.prototype.setScrollLeft = function (pos) {
    if (this.horiz.scrollLeft != pos) {
      this.horiz.scrollLeft = pos;
    }
    if (this.disableHoriz) {
      this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
    }
  };

  NativeScrollbars.prototype.setScrollTop = function (pos) {
    if (this.vert.scrollTop != pos) {
      this.vert.scrollTop = pos;
    }
    if (this.disableVert) {
      this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
    }
  };

  NativeScrollbars.prototype.zeroWidthHack = function () {
    var w = mac && !mac_geMountainLion ? "12px" : "18px";
    this.horiz.style.height = this.vert.style.width = w;
    this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
    this.disableHoriz = new Delayed();
    this.disableVert = new Delayed();
  };

  NativeScrollbars.prototype.enableZeroWidthBar = function (bar, delay, type) {
    bar.style.pointerEvents = "auto";
    function maybeDisable() {
      // To find out whether the scrollbar is still visible, we
      // check whether the element under the pixel in the bottom
      // right corner of the scrollbar box is the scrollbar box
      // itself (when the bar is still visible) or its filler child
      // (when the bar is hidden). If it is still visible, we keep
      // it enabled, if it's hidden, we disable pointer events.
      var box = bar.getBoundingClientRect();
      var elt$$1 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
      if (elt$$1 != bar) {
        bar.style.pointerEvents = "none";
      } else {
        delay.set(1000, maybeDisable);
      }
    }
    delay.set(1000, maybeDisable);
  };

  NativeScrollbars.prototype.clear = function () {
    var parent = this.horiz.parentNode;
    parent.removeChild(this.horiz);
    parent.removeChild(this.vert);
  };

  var NullScrollbars = function () {};

  NullScrollbars.prototype.update = function () {
    return { bottom: 0, right: 0 };
  };
  NullScrollbars.prototype.setScrollLeft = function () {};
  NullScrollbars.prototype.setScrollTop = function () {};
  NullScrollbars.prototype.clear = function () {};

  function updateScrollbars(cm, measure) {
    if (!measure) {
      measure = measureForScrollbars(cm);
    }
    var startWidth = cm.display.barWidth,
        startHeight = cm.display.barHeight;
    updateScrollbarsInner(cm, measure);
    for (var i = 0; i < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i++) {
      if (startWidth != cm.display.barWidth && cm.options.lineWrapping) {
        updateHeightsInViewport(cm);
      }
      updateScrollbarsInner(cm, measureForScrollbars(cm));
      startWidth = cm.display.barWidth;startHeight = cm.display.barHeight;
    }
  }

  // Re-synchronize the fake scrollbars with the actual size of the
  // content.
  function updateScrollbarsInner(cm, measure) {
    var d = cm.display;
    var sizes = d.scrollbars.update(measure);

    d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
    d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
    d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";

    if (sizes.right && sizes.bottom) {
      d.scrollbarFiller.style.display = "block";
      d.scrollbarFiller.style.height = sizes.bottom + "px";
      d.scrollbarFiller.style.width = sizes.right + "px";
    } else {
      d.scrollbarFiller.style.display = "";
    }
    if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
      d.gutterFiller.style.display = "block";
      d.gutterFiller.style.height = sizes.bottom + "px";
      d.gutterFiller.style.width = measure.gutterWidth + "px";
    } else {
      d.gutterFiller.style.display = "";
    }
  }

  var scrollbarModel = { "native": NativeScrollbars, "null": NullScrollbars };

  function initScrollbars(cm) {
    if (cm.display.scrollbars) {
      cm.display.scrollbars.clear();
      if (cm.display.scrollbars.addClass) {
        rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
      }
    }

    cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function (node) {
      cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
      // Prevent clicks in the scrollbars from killing focus
      on(node, "mousedown", function () {
        if (cm.state.focused) {
          setTimeout(function () {
            return cm.display.input.focus();
          }, 0);
        }
      });
      node.setAttribute("cm-not-content", "true");
    }, function (pos, axis) {
      if (axis == "horizontal") {
        setScrollLeft(cm, pos);
      } else {
        setScrollTop(cm, pos);
      }
    }, cm);
    if (cm.display.scrollbars.addClass) {
      addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
    }
  }

  // SCROLLING THINGS INTO VIEW

  // If an editor sits on the top or bottom of the window, partially
  // scrolled out of view, this ensures that the cursor is visible.
  function maybeScrollWindow(cm, rect) {
    if (signalDOMEvent(cm, "scrollCursorIntoView")) {
      return;
    }

    var display = cm.display,
        box = display.sizer.getBoundingClientRect(),
        doScroll = null;
    if (rect.top + box.top < 0) {
      doScroll = true;
    } else if (rect.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) {
      doScroll = false;
    }
    if (doScroll != null && !phantom) {
      var scrollNode = elt("div", "\u200b", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
      cm.display.lineSpace.appendChild(scrollNode);
      scrollNode.scrollIntoView(doScroll);
      cm.display.lineSpace.removeChild(scrollNode);
    }
  }

  // Scroll a given position into view (immediately), verifying that
  // it actually became visible (as line heights are accurately
  // measured, the position of something may 'drift' during drawing).
  function scrollPosIntoView(cm, pos, end, margin) {
    if (margin == null) {
      margin = 0;
    }
    var rect;
    for (var limit = 0; limit < 5; limit++) {
      var changed = false;
      var coords = cursorCoords(cm, pos);
      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
      rect = { left: Math.min(coords.left, endCoords.left),
        top: Math.min(coords.top, endCoords.top) - margin,
        right: Math.max(coords.left, endCoords.left),
        bottom: Math.max(coords.bottom, endCoords.bottom) + margin };
      var scrollPos = calculateScrollPos(cm, rect);
      var startTop = cm.doc.scrollTop,
          startLeft = cm.doc.scrollLeft;
      if (scrollPos.scrollTop != null) {
        setScrollTop(cm, scrollPos.scrollTop);
        if (Math.abs(cm.doc.scrollTop - startTop) > 1) {
          changed = true;
        }
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) {
          changed = true;
        }
      }
      if (!changed) {
        break;
      }
    }
    return rect;
  }

  // Scroll a given set of coordinates into view (immediately).
  function scrollIntoView(cm, rect) {
    var scrollPos = calculateScrollPos(cm, rect);
    if (scrollPos.scrollTop != null) {
      setScrollTop(cm, scrollPos.scrollTop);
    }
    if (scrollPos.scrollLeft != null) {
      setScrollLeft(cm, scrollPos.scrollLeft);
    }
  }

  // Calculate a new scroll position needed to scroll the given
  // rectangle into view. Returns an object with scrollTop and
  // scrollLeft properties. When these are undefined, the
  // vertical/horizontal position does not need to be adjusted.
  function calculateScrollPos(cm, rect) {
    var display = cm.display,
        snapMargin = textHeight(cm.display);
    if (rect.top < 0) {
      rect.top = 0;
    }
    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
    var screen = displayHeight(cm),
        result = {};
    if (rect.bottom - rect.top > screen) {
      rect.bottom = rect.top + screen;
    }
    var docBottom = cm.doc.height + paddingVert(display);
    var atTop = rect.top < snapMargin,
        atBottom = rect.bottom > docBottom - snapMargin;
    if (rect.top < screentop) {
      result.scrollTop = atTop ? 0 : rect.top;
    } else if (rect.bottom > screentop + screen) {
      var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen);
      if (newTop != screentop) {
        result.scrollTop = newTop;
      }
    }

    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
    var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
    var tooWide = rect.right - rect.left > screenw;
    if (tooWide) {
      rect.right = rect.left + screenw;
    }
    if (rect.left < 10) {
      result.scrollLeft = 0;
    } else if (rect.left < screenleft) {
      result.scrollLeft = Math.max(0, rect.left - (tooWide ? 0 : 10));
    } else if (rect.right > screenw + screenleft - 3) {
      result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
    }
    return result;
  }

  // Store a relative adjustment to the scroll position in the current
  // operation (to be applied when the operation finishes).
  function addToScrollPos(cm, left, top) {
    if (left != null || top != null) {
      resolveScrollToPos(cm);
    }
    if (left != null) {
      cm.curOp.scrollLeft = (cm.curOp.scrollLeft == null ? cm.doc.scrollLeft : cm.curOp.scrollLeft) + left;
    }
    if (top != null) {
      cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
    }
  }

  // Make sure that at the end of the operation the current cursor is
  // shown.
  function ensureCursorVisible(cm) {
    resolveScrollToPos(cm);
    var cur = cm.getCursor(),
        from = cur,
        to = cur;
    if (!cm.options.lineWrapping) {
      from = cur.ch ? Pos(cur.line, cur.ch - 1) : cur;
      to = Pos(cur.line, cur.ch + 1);
    }
    cm.curOp.scrollToPos = { from: from, to: to, margin: cm.options.cursorScrollMargin };
  }

  // When an operation has its scrollToPos property set, and another
  // scroll action is applied before the end of the operation, this
  // 'simulates' scrolling that position into view in a cheap way, so
  // that the effect of intermediate scroll commands is not ignored.
  function resolveScrollToPos(cm) {
    var range$$1 = cm.curOp.scrollToPos;
    if (range$$1) {
      cm.curOp.scrollToPos = null;
      var from = estimateCoords(cm, range$$1.from),
          to = estimateCoords(cm, range$$1.to);
      var sPos = calculateScrollPos(cm, {
        left: Math.min(from.left, to.left),
        top: Math.min(from.top, to.top) - range$$1.margin,
        right: Math.max(from.right, to.right),
        bottom: Math.max(from.bottom, to.bottom) + range$$1.margin
      });
      cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
    }
  }

  // Operations are used to wrap a series of changes to the editor
  // state in such a way that each change won't have to update the
  // cursor and display (which would be awkward, slow, and
  // error-prone). Instead, display updates are batched and then all
  // combined and executed at once.

  var nextOpId = 0;
  // Start a new operation.
  function startOperation(cm) {
    cm.curOp = {
      cm: cm,
      viewChanged: false, // Flag that indicates that lines might need to be redrawn
      startHeight: cm.doc.height, // Used to detect need to update scrollbar
      forceUpdate: false, // Used to force a redraw
      updateInput: null, // Whether to reset the input textarea
      typing: false, // Whether this reset should be careful to leave existing text (for compositing)
      changeObjs: null, // Accumulated changes, for firing change events
      cursorActivityHandlers: null, // Set of handlers to fire cursorActivity on
      cursorActivityCalled: 0, // Tracks which cursorActivity handlers have been called already
      selectionChanged: false, // Whether the selection needs to be redrawn
      updateMaxLine: false, // Set when the widest line needs to be determined anew
      scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
      scrollToPos: null, // Used to scroll to a specific position
      focus: false,
      id: ++nextOpId // Unique ID
    };
    pushOperation(cm.curOp);
  }

  // Finish an operation, updating the display and signalling delayed events
  function endOperation(cm) {
    var op = cm.curOp;
    finishOperation(op, function (group) {
      for (var i = 0; i < group.ops.length; i++) {
        group.ops[i].cm.curOp = null;
      }
      endOperations(group);
    });
  }

  // The DOM updates done when an operation finishes are batched so
  // that the minimum number of relayouts are required.
  function endOperations(group) {
    var ops = group.ops;
    for (var i = 0; i < ops.length; i++) // Read DOM
    {
      endOperation_R1(ops[i]);
    }
    for (var i$1 = 0; i$1 < ops.length; i$1++) // Write DOM (maybe)
    {
      endOperation_W1(ops[i$1]);
    }
    for (var i$2 = 0; i$2 < ops.length; i$2++) // Read DOM
    {
      endOperation_R2(ops[i$2]);
    }
    for (var i$3 = 0; i$3 < ops.length; i$3++) // Write DOM (maybe)
    {
      endOperation_W2(ops[i$3]);
    }
    for (var i$4 = 0; i$4 < ops.length; i$4++) // Read DOM
    {
      endOperation_finish(ops[i$4]);
    }
  }

  function endOperation_R1(op) {
    var cm = op.cm,
        display = cm.display;
    maybeClipScrollbars(cm);
    if (op.updateMaxLine) {
      findMaxLine(cm);
    }

    op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
    op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
  }

  function endOperation_W1(op) {
    op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
  }

  function endOperation_R2(op) {
    var cm = op.cm,
        display = cm.display;
    if (op.updatedDisplay) {
      updateHeightsInViewport(cm);
    }

    op.barMeasure = measureForScrollbars(cm);

    // If the max line changed since it was last measured, measure it,
    // and ensure the document's width matches it.
    // updateDisplay_W2 will use these properties to do the actual resizing
    if (display.maxLineChanged && !cm.options.lineWrapping) {
      op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
      cm.display.sizerWidth = op.adjustWidthTo;
      op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
      op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
    }

    if (op.updatedDisplay || op.selectionChanged) {
      op.preparedSelection = display.input.prepareSelection(op.focus);
    }
  }

  function endOperation_W2(op) {
    var cm = op.cm;

    if (op.adjustWidthTo != null) {
      cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
      if (op.maxScrollLeft < cm.doc.scrollLeft) {
        setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
      }
      cm.display.maxLineChanged = false;
    }

    var takeFocus = op.focus && op.focus == activeElt() && (!document.hasFocus || document.hasFocus());
    if (op.preparedSelection) {
      cm.display.input.showSelection(op.preparedSelection, takeFocus);
    }
    if (op.updatedDisplay || op.startHeight != cm.doc.height) {
      updateScrollbars(cm, op.barMeasure);
    }
    if (op.updatedDisplay) {
      setDocumentHeight(cm, op.barMeasure);
    }

    if (op.selectionChanged) {
      restartBlink(cm);
    }

    if (cm.state.focused && op.updateInput) {
      cm.display.input.reset(op.typing);
    }
    if (takeFocus) {
      ensureFocus(op.cm);
    }
  }

  function endOperation_finish(op) {
    var cm = op.cm,
        display = cm.display,
        doc = cm.doc;

    if (op.updatedDisplay) {
      postUpdateDisplay(cm, op.update);
    }

    // Abort mouse wheel delta measurement, when scrolling explicitly
    if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
      display.wheelStartX = display.wheelStartY = null;
    }

    // Propagate the scroll position to the actual DOM scroller
    if (op.scrollTop != null && (display.scroller.scrollTop != op.scrollTop || op.forceScroll)) {
      doc.scrollTop = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
      display.scrollbars.setScrollTop(doc.scrollTop);
      display.scroller.scrollTop = doc.scrollTop;
    }
    if (op.scrollLeft != null && (display.scroller.scrollLeft != op.scrollLeft || op.forceScroll)) {
      doc.scrollLeft = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, op.scrollLeft));
      display.scrollbars.setScrollLeft(doc.scrollLeft);
      display.scroller.scrollLeft = doc.scrollLeft;
      alignHorizontally(cm);
    }
    // If we need to scroll a specific position into view, do so.
    if (op.scrollToPos) {
      var rect = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from), clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
      maybeScrollWindow(cm, rect);
    }

    // Fire events for markers that are hidden/unidden by editing or
    // undoing
    var hidden = op.maybeHiddenMarkers,
        unhidden = op.maybeUnhiddenMarkers;
    if (hidden) {
      for (var i = 0; i < hidden.length; ++i) {
        if (!hidden[i].lines.length) {
          signal(hidden[i], "hide");
        }
      }
    }
    if (unhidden) {
      for (var i$1 = 0; i$1 < unhidden.length; ++i$1) {
        if (unhidden[i$1].lines.length) {
          signal(unhidden[i$1], "unhide");
        }
      }
    }

    if (display.wrapper.offsetHeight) {
      doc.scrollTop = cm.display.scroller.scrollTop;
    }

    // Fire change events, and delayed event handlers
    if (op.changeObjs) {
      signal(cm, "changes", cm, op.changeObjs);
    }
    if (op.update) {
      op.update.finish();
    }
  }

  // Run the given function in an operation
  function runInOp(cm, f) {
    if (cm.curOp) {
      return f();
    }
    startOperation(cm);
    try {
      return f();
    } finally {
      endOperation(cm);
    }
  }
  // Wraps a function in an operation. Returns the wrapped function.
  function operation(cm, f) {
    return function () {
      if (cm.curOp) {
        return f.apply(cm, arguments);
      }
      startOperation(cm);
      try {
        return f.apply(cm, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }
  // Used to add methods to editor and doc instances, wrapping them in
  // operations.
  function methodOp(f) {
    return function () {
      if (this.curOp) {
        return f.apply(this, arguments);
      }
      startOperation(this);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(this);
      }
    };
  }
  function docMethodOp(f) {
    return function () {
      var cm = this.cm;
      if (!cm || cm.curOp) {
        return f.apply(this, arguments);
      }
      startOperation(cm);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }

  // Updates the display.view data structure for a given change to the
  // document. From and to are in pre-change coordinates. Lendiff is
  // the amount of lines added or subtracted by the change. This is
  // used for changes that span multiple lines, or change the way
  // lines are divided into visual lines. regLineChange (below)
  // registers single-line changes.
  function regChange(cm, from, to, lendiff) {
    if (from == null) {
      from = cm.doc.first;
    }
    if (to == null) {
      to = cm.doc.first + cm.doc.size;
    }
    if (!lendiff) {
      lendiff = 0;
    }

    var display = cm.display;
    if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
      display.updateLineNumbers = from;
    }

    cm.curOp.viewChanged = true;

    if (from >= display.viewTo) {
      // Change after
      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) {
        resetView(cm);
      }
    } else if (to <= display.viewFrom) {
      // Change before
      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
        resetView(cm);
      } else {
        display.viewFrom += lendiff;
        display.viewTo += lendiff;
      }
    } else if (from <= display.viewFrom && to >= display.viewTo) {
      // Full overlap
      resetView(cm);
    } else if (from <= display.viewFrom) {
      // Top overlap
      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cut) {
        display.view = display.view.slice(cut.index);
        display.viewFrom = cut.lineN;
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    } else if (to >= display.viewTo) {
      // Bottom overlap
      var cut$1 = viewCuttingPoint(cm, from, from, -1);
      if (cut$1) {
        display.view = display.view.slice(0, cut$1.index);
        display.viewTo = cut$1.lineN;
      } else {
        resetView(cm);
      }
    } else {
      // Gap in the middle
      var cutTop = viewCuttingPoint(cm, from, from, -1);
      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cutTop && cutBot) {
        display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    }

    var ext = display.externalMeasured;
    if (ext) {
      if (to < ext.lineN) {
        ext.lineN += lendiff;
      } else if (from < ext.lineN + ext.size) {
        display.externalMeasured = null;
      }
    }
  }

  // Register a change to a single line. Type must be one of "text",
  // "gutter", "class", "widget"
  function regLineChange(cm, line, type) {
    cm.curOp.viewChanged = true;
    var display = cm.display,
        ext = cm.display.externalMeasured;
    if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
      display.externalMeasured = null;
    }

    if (line < display.viewFrom || line >= display.viewTo) {
      return;
    }
    var lineView = display.view[findViewIndex(cm, line)];
    if (lineView.node == null) {
      return;
    }
    var arr = lineView.changes || (lineView.changes = []);
    if (indexOf(arr, type) == -1) {
      arr.push(type);
    }
  }

  // Clear the view.
  function resetView(cm) {
    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
    cm.display.view = [];
    cm.display.viewOffset = 0;
  }

  function viewCuttingPoint(cm, oldN, newN, dir) {
    var index = findViewIndex(cm, oldN),
        diff,
        view = cm.display.view;
    if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) {
      return { index: index, lineN: newN };
    }
    var n = cm.display.viewFrom;
    for (var i = 0; i < index; i++) {
      n += view[i].size;
    }
    if (n != oldN) {
      if (dir > 0) {
        if (index == view.length - 1) {
          return null;
        }
        diff = n + view[index].size - oldN;
        index++;
      } else {
        diff = n - oldN;
      }
      oldN += diff;newN += diff;
    }
    while (visualLineNo(cm.doc, newN) != newN) {
      if (index == (dir < 0 ? 0 : view.length - 1)) {
        return null;
      }
      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
      index += dir;
    }
    return { index: index, lineN: newN };
  }

  // Force the view to cover a given range, adding empty view element
  // or clipping off existing ones as needed.
  function adjustView(cm, from, to) {
    var display = cm.display,
        view = display.view;
    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
      display.view = buildViewArray(cm, from, to);
      display.viewFrom = from;
    } else {
      if (display.viewFrom > from) {
        display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
      } else if (display.viewFrom < from) {
        display.view = display.view.slice(findViewIndex(cm, from));
      }
      display.viewFrom = from;
      if (display.viewTo < to) {
        display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
      } else if (display.viewTo > to) {
        display.view = display.view.slice(0, findViewIndex(cm, to));
      }
    }
    display.viewTo = to;
  }

  // Count the number of lines in the view whose DOM representation is
  // out of date (or nonexistent).
  function countDirtyView(cm) {
    var view = cm.display.view,
        dirty = 0;
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (!lineView.hidden && (!lineView.node || lineView.changes)) {
        ++dirty;
      }
    }
    return dirty;
  }

  // HIGHLIGHT WORKER

  function startWorker(cm, time) {
    if (cm.doc.mode.startState && cm.doc.frontier < cm.display.viewTo) {
      cm.state.highlight.set(time, bind(highlightWorker, cm));
    }
  }

  function highlightWorker(cm) {
    var doc = cm.doc;
    if (doc.frontier < doc.first) {
      doc.frontier = doc.first;
    }
    if (doc.frontier >= cm.display.viewTo) {
      return;
    }
    var end = +new Date() + cm.options.workTime;
    var state = copyState(doc.mode, getStateBefore(cm, doc.frontier));
    var changedLines = [];

    doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function (line) {
      if (doc.frontier >= cm.display.viewFrom) {
        // Visible
        var oldStyles = line.styles,
            tooLong = line.text.length > cm.options.maxHighlightLength;
        var highlighted = highlightLine(cm, line, tooLong ? copyState(doc.mode, state) : state, true);
        line.styles = highlighted.styles;
        var oldCls = line.styleClasses,
            newCls = highlighted.classes;
        if (newCls) {
          line.styleClasses = newCls;
        } else if (oldCls) {
          line.styleClasses = null;
        }
        var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
        for (var i = 0; !ischange && i < oldStyles.length; ++i) {
          ischange = oldStyles[i] != line.styles[i];
        }
        if (ischange) {
          changedLines.push(doc.frontier);
        }
        line.stateAfter = tooLong ? state : copyState(doc.mode, state);
      } else {
        if (line.text.length <= cm.options.maxHighlightLength) {
          processLine(cm, line.text, state);
        }
        line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) : null;
      }
      ++doc.frontier;
      if (+new Date() > end) {
        startWorker(cm, cm.options.workDelay);
        return true;
      }
    });
    if (changedLines.length) {
      runInOp(cm, function () {
        for (var i = 0; i < changedLines.length; i++) {
          regLineChange(cm, changedLines[i], "text");
        }
      });
    }
  }

  // DISPLAY DRAWING

  var DisplayUpdate = function (cm, viewport, force) {
    var display = cm.display;

    this.viewport = viewport;
    // Store some values that we'll need later (but don't want to force a relayout for)
    this.visible = visibleLines(display, cm.doc, viewport);
    this.editorIsHidden = !display.wrapper.offsetWidth;
    this.wrapperHeight = display.wrapper.clientHeight;
    this.wrapperWidth = display.wrapper.clientWidth;
    this.oldDisplayWidth = displayWidth(cm);
    this.force = force;
    this.dims = getDimensions(cm);
    this.events = [];
  };

  DisplayUpdate.prototype.signal = function (emitter, type) {
    if (hasHandler(emitter, type)) {
      this.events.push(arguments);
    }
  };
  DisplayUpdate.prototype.finish = function () {
    var this$1 = this;

    for (var i = 0; i < this.events.length; i++) {
      signal.apply(null, this$1.events[i]);
    }
  };

  function maybeClipScrollbars(cm) {
    var display = cm.display;
    if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
      display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
      display.heightForcer.style.height = scrollGap(cm) + "px";
      display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
      display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
      display.scrollbarsClipped = true;
    }
  }

  // Does the actual updating of the line display. Bails out
  // (returning false) when there is nothing to be done and forced is
  // false.
  function updateDisplayIfNeeded(cm, update) {
    var display = cm.display,
        doc = cm.doc;

    if (update.editorIsHidden) {
      resetView(cm);
      return false;
    }

    // Bail out if the visible area is already rendered and nothing changed.
    if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0) {
      return false;
    }

    if (maybeUpdateLineNumberWidth(cm)) {
      resetView(cm);
      update.dims = getDimensions(cm);
    }

    // Compute a suitable new viewport (from & to)
    var end = doc.first + doc.size;
    var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
    var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
    if (display.viewFrom < from && from - display.viewFrom < 20) {
      from = Math.max(doc.first, display.viewFrom);
    }
    if (display.viewTo > to && display.viewTo - to < 20) {
      to = Math.min(end, display.viewTo);
    }
    if (sawCollapsedSpans) {
      from = visualLineNo(cm.doc, from);
      to = visualLineEndNo(cm.doc, to);
    }

    var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
    adjustView(cm, from, to);

    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
    // Position the mover div to align with the current scroll position
    cm.display.mover.style.top = display.viewOffset + "px";

    var toUpdate = countDirtyView(cm);
    if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
      return false;
    }

    // For big changes, we hide the enclosing element during the
    // update, since that speeds up the operations on most browsers.
    var focused = activeElt();
    if (toUpdate > 4) {
      display.lineDiv.style.display = "none";
    }
    patchDisplay(cm, display.updateLineNumbers, update.dims);
    if (toUpdate > 4) {
      display.lineDiv.style.display = "";
    }
    display.renderedView = display.view;
    // There might have been a widget with a focused element that got
    // hidden or updated, if so re-focus it.
    if (focused && activeElt() != focused && focused.offsetHeight) {
      focused.focus();
    }

    // Prevent selection and cursors from interfering with the scroll
    // width and height.
    removeChildren(display.cursorDiv);
    removeChildren(display.selectionDiv);
    display.gutters.style.height = display.sizer.style.minHeight = 0;

    if (different) {
      display.lastWrapHeight = update.wrapperHeight;
      display.lastWrapWidth = update.wrapperWidth;
      startWorker(cm, 400);
    }

    display.updateLineNumbers = null;

    return true;
  }

  function postUpdateDisplay(cm, update) {
    var viewport = update.viewport;

    for (var first = true;; first = false) {
      if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
        // Clip forced viewport to actual scrollable area.
        if (viewport && viewport.top != null) {
          viewport = { top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top) };
        }
        // Updated line heights might result in the drawn area not
        // actually covering the viewport. Keep looping until it does.
        update.visible = visibleLines(cm.display, cm.doc, viewport);
        if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) {
          break;
        }
      }
      if (!updateDisplayIfNeeded(cm, update)) {
        break;
      }
      updateHeightsInViewport(cm);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
    }

    update.signal(cm, "update", cm);
    if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
      update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
      cm.display.reportedViewFrom = cm.display.viewFrom;cm.display.reportedViewTo = cm.display.viewTo;
    }
  }

  function updateDisplaySimple(cm, viewport) {
    var update = new DisplayUpdate(cm, viewport);
    if (updateDisplayIfNeeded(cm, update)) {
      updateHeightsInViewport(cm);
      postUpdateDisplay(cm, update);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.finish();
    }
  }

  // Sync the actual display DOM structure with display.view, removing
  // nodes for lines that are no longer in view, and creating the ones
  // that are not there yet, and updating the ones that are out of
  // date.
  function patchDisplay(cm, updateNumbersFrom, dims) {
    var display = cm.display,
        lineNumbers = cm.options.lineNumbers;
    var container = display.lineDiv,
        cur = container.firstChild;

    function rm(node) {
      var next = node.nextSibling;
      // Works around a throw-scroll bug in OS X Webkit
      if (webkit && mac && cm.display.currentWheelTarget == node) {
        node.style.display = "none";
      } else {
        node.parentNode.removeChild(node);
      }
      return next;
    }

    var view = display.view,
        lineN = display.viewFrom;
    // Loop over the elements in the view, syncing cur (the DOM nodes
    // in display.lineDiv) with the view as we go.
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (lineView.hidden) {} else if (!lineView.node || lineView.node.parentNode != container) {
        // Not drawn yet
        var node = buildLineElement(cm, lineView, lineN, dims);
        container.insertBefore(node, cur);
      } else {
        // Already drawn
        while (cur != lineView.node) {
          cur = rm(cur);
        }
        var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
        if (lineView.changes) {
          if (indexOf(lineView.changes, "gutter") > -1) {
            updateNumber = false;
          }
          updateLineForChanges(cm, lineView, lineN, dims);
        }
        if (updateNumber) {
          removeChildren(lineView.lineNumber);
          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
        }
        cur = lineView.node.nextSibling;
      }
      lineN += lineView.size;
    }
    while (cur) {
      cur = rm(cur);
    }
  }

  function updateGutterSpace(cm) {
    var width = cm.display.gutters.offsetWidth;
    cm.display.sizer.style.marginLeft = width + "px";
  }

  function setDocumentHeight(cm, measure) {
    cm.display.sizer.style.minHeight = measure.docHeight + "px";
    cm.display.heightForcer.style.top = measure.docHeight + "px";
    cm.display.gutters.style.height = measure.docHeight + cm.display.barHeight + scrollGap(cm) + "px";
  }

  // Rebuild the gutter elements, ensure the margin to the left of the
  // code matches their width.
  function updateGutters(cm) {
    var gutters = cm.display.gutters,
        specs = cm.options.gutters;
    removeChildren(gutters);
    var i = 0;
    for (; i < specs.length; ++i) {
      var gutterClass = specs[i];
      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
      if (gutterClass == "CodeMirror-linenumbers") {
        cm.display.lineGutter = gElt;
        gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
      }
    }
    gutters.style.display = i ? "" : "none";
    updateGutterSpace(cm);
  }

  // Make sure the gutters options contains the element
  // "CodeMirror-linenumbers" when the lineNumbers option is true.
  function setGuttersForLineNumbers(options) {
    var found = indexOf(options.gutters, "CodeMirror-linenumbers");
    if (found == -1 && options.lineNumbers) {
      options.gutters = options.gutters.concat(["CodeMirror-linenumbers"]);
    } else if (found > -1 && !options.lineNumbers) {
      options.gutters = options.gutters.slice(0);
      options.gutters.splice(found, 1);
    }
  }

  // Selection objects are immutable. A new one is created every time
  // the selection changes. A selection is one or more non-overlapping
  // (and non-touching) ranges, sorted, and an integer that indicates
  // which one is the primary selection (the one that's scrolled into
  // view, that getCursor returns, etc).
  var Selection = function (ranges, primIndex) {
    this.ranges = ranges;
    this.primIndex = primIndex;
  };

  Selection.prototype.primary = function () {
    return this.ranges[this.primIndex];
  };

  Selection.prototype.equals = function (other) {
    var this$1 = this;

    if (other == this) {
      return true;
    }
    if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
      return false;
    }
    for (var i = 0; i < this.ranges.length; i++) {
      var here = this$1.ranges[i],
          there = other.ranges[i];
      if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
        return false;
      }
    }
    return true;
  };

  Selection.prototype.deepCopy = function () {
    var this$1 = this;

    var out = [];
    for (var i = 0; i < this.ranges.length; i++) {
      out[i] = new Range(copyPos(this$1.ranges[i].anchor), copyPos(this$1.ranges[i].head));
    }
    return new Selection(out, this.primIndex);
  };

  Selection.prototype.somethingSelected = function () {
    var this$1 = this;

    for (var i = 0; i < this.ranges.length; i++) {
      if (!this$1.ranges[i].empty()) {
        return true;
      }
    }
    return false;
  };

  Selection.prototype.contains = function (pos, end) {
    var this$1 = this;

    if (!end) {
      end = pos;
    }
    for (var i = 0; i < this.ranges.length; i++) {
      var range = this$1.ranges[i];
      if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0) {
        return i;
      }
    }
    return -1;
  };

  var Range = function (anchor, head) {
    this.anchor = anchor;this.head = head;
  };

  Range.prototype.from = function () {
    return minPos(this.anchor, this.head);
  };
  Range.prototype.to = function () {
    return maxPos(this.anchor, this.head);
  };
  Range.prototype.empty = function () {
    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
  };

  // Take an unsorted, potentially overlapping set of ranges, and
  // build a selection out of it. 'Consumes' ranges array (modifying
  // it).
  function normalizeSelection(ranges, primIndex) {
    var prim = ranges[primIndex];
    ranges.sort(function (a, b) {
      return cmp(a.from(), b.from());
    });
    primIndex = indexOf(ranges, prim);
    for (var i = 1; i < ranges.length; i++) {
      var cur = ranges[i],
          prev = ranges[i - 1];
      if (cmp(prev.to(), cur.from()) >= 0) {
        var from = minPos(prev.from(), cur.from()),
            to = maxPos(prev.to(), cur.to());
        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
        if (i <= primIndex) {
          --primIndex;
        }
        ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
      }
    }
    return new Selection(ranges, primIndex);
  }

  function simpleSelection(anchor, head) {
    return new Selection([new Range(anchor, head || anchor)], 0);
  }

  // Compute the position of the end of a change (its 'to' property
  // refers to the pre-change end).
  function changeEnd(change) {
    if (!change.text) {
      return change.to;
    }
    return Pos(change.from.line + change.text.length - 1, lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
  }

  // Adjust a position to refer to the post-change position of the
  // same text, or the end of the change if the change covers it.
  function adjustForChange(pos, change) {
    if (cmp(pos, change.from) < 0) {
      return pos;
    }
    if (cmp(pos, change.to) <= 0) {
      return changeEnd(change);
    }

    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1,
        ch = pos.ch;
    if (pos.line == change.to.line) {
      ch += changeEnd(change).ch - change.to.ch;
    }
    return Pos(line, ch);
  }

  function computeSelAfterChange(doc, change) {
    var out = [];
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      var range = doc.sel.ranges[i];
      out.push(new Range(adjustForChange(range.anchor, change), adjustForChange(range.head, change)));
    }
    return normalizeSelection(out, doc.sel.primIndex);
  }

  function offsetPos(pos, old, nw) {
    if (pos.line == old.line) {
      return Pos(nw.line, pos.ch - old.ch + nw.ch);
    } else {
      return Pos(nw.line + (pos.line - old.line), pos.ch);
    }
  }

  // Used by replaceSelections to allow moving the selection to the
  // start or around the replaced test. Hint may be "start" or "around".
  function computeReplacedSel(doc, changes, hint) {
    var out = [];
    var oldPrev = Pos(doc.first, 0),
        newPrev = oldPrev;
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      var from = offsetPos(change.from, oldPrev, newPrev);
      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
      oldPrev = change.to;
      newPrev = to;
      if (hint == "around") {
        var range = doc.sel.ranges[i],
            inv = cmp(range.head, range.anchor) < 0;
        out[i] = new Range(inv ? to : from, inv ? from : to);
      } else {
        out[i] = new Range(from, from);
      }
    }
    return new Selection(out, doc.sel.primIndex);
  }

  // Used to get the editor into a consistent state again when options change.

  function loadMode(cm) {
    cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
    resetModeState(cm);
  }

  function resetModeState(cm) {
    cm.doc.iter(function (line) {
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      if (line.styles) {
        line.styles = null;
      }
    });
    cm.doc.frontier = cm.doc.first;
    startWorker(cm, 100);
    cm.state.modeGen++;
    if (cm.curOp) {
      regChange(cm);
    }
  }

  // DOCUMENT DATA STRUCTURE

  // By default, updates that start and end at the beginning of a line
  // are treated specially, in order to make the association of line
  // widgets and marker elements with the text behave more intuitive.
  function isWholeLineUpdate(doc, change) {
    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
  }

  // Perform a change on the document data structure.
  function updateDoc(doc, change, markedSpans, estimateHeight$$1) {
    function spansFor(n) {
      return markedSpans ? markedSpans[n] : null;
    }
    function update(line, text, spans) {
      updateLine(line, text, spans, estimateHeight$$1);
      signalLater(line, "change", line, change);
    }
    function linesFor(start, end) {
      var result = [];
      for (var i = start; i < end; ++i) {
        result.push(new Line(text[i], spansFor(i), estimateHeight$$1));
      }
      return result;
    }

    var from = change.from,
        to = change.to,
        text = change.text;
    var firstLine = getLine(doc, from.line),
        lastLine = getLine(doc, to.line);
    var lastText = lst(text),
        lastSpans = spansFor(text.length - 1),
        nlines = to.line - from.line;

    // Adjust the line structure
    if (change.full) {
      doc.insert(0, linesFor(0, text.length));
      doc.remove(text.length, doc.size - text.length);
    } else if (isWholeLineUpdate(doc, change)) {
      // This is a whole-line replace. Treated specially to make
      // sure line objects move the way they are supposed to.
      var added = linesFor(0, text.length - 1);
      update(lastLine, lastLine.text, lastSpans);
      if (nlines) {
        doc.remove(from.line, nlines);
      }
      if (added.length) {
        doc.insert(from.line, added);
      }
    } else if (firstLine == lastLine) {
      if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
      } else {
        var added$1 = linesFor(1, text.length - 1);
        added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight$$1));
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        doc.insert(from.line + 1, added$1);
      }
    } else if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
      doc.remove(from.line + 1, nlines);
    } else {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
      var added$2 = linesFor(1, text.length - 1);
      if (nlines > 1) {
        doc.remove(from.line + 1, nlines - 1);
      }
      doc.insert(from.line + 1, added$2);
    }

    signalLater(doc, "change", doc, change);
  }

  // Call f for all linked documents.
  function linkedDocs(doc, f, sharedHistOnly) {
    function propagate(doc, skip, sharedHist) {
      if (doc.linked) {
        for (var i = 0; i < doc.linked.length; ++i) {
          var rel = doc.linked[i];
          if (rel.doc == skip) {
            continue;
          }
          var shared = sharedHist && rel.sharedHist;
          if (sharedHistOnly && !shared) {
            continue;
          }
          f(rel.doc, shared);
          propagate(rel.doc, doc, shared);
        }
      }
    }
    propagate(doc, null, true);
  }

  // Attach a document to an editor.
  function attachDoc(cm, doc) {
    if (doc.cm) {
      throw new Error("This document is already in use.");
    }
    cm.doc = doc;
    doc.cm = cm;
    estimateLineHeights(cm);
    loadMode(cm);
    setDirectionClass(cm);
    if (!cm.options.lineWrapping) {
      findMaxLine(cm);
    }
    cm.options.mode = doc.modeOption;
    regChange(cm);
  }

  function setDirectionClass(cm) {
    (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
  }

  function directionChanged(cm) {
    runInOp(cm, function () {
      setDirectionClass(cm);
      regChange(cm);
    });
  }

  function History(startGen) {
    // Arrays of change events and selections. Doing something adds an
    // event to done and clears undo. Undoing moves events from done
    // to undone, redoing moves them in the other direction.
    this.done = [];this.undone = [];
    this.undoDepth = Infinity;
    // Used to track when changes can be merged into a single undo
    // event
    this.lastModTime = this.lastSelTime = 0;
    this.lastOp = this.lastSelOp = null;
    this.lastOrigin = this.lastSelOrigin = null;
    // Used by the isClean() method
    this.generation = this.maxGeneration = startGen || 1;
  }

  // Create a history change event from an updateDoc-style change
  // object.
  function historyChangeFromChange(doc, change) {
    var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to) };
    attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    linkedDocs(doc, function (doc) {
      return attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    }, true);
    return histChange;
  }

  // Pop all selection events off the end of a history array. Stop at
  // a change event.
  function clearSelectionEvents(array) {
    while (array.length) {
      var last = lst(array);
      if (last.ranges) {
        array.pop();
      } else {
        break;
      }
    }
  }

  // Find the top change event in the history. Pop off selection
  // events that are in the way.
  function lastChangeEvent(hist, force) {
    if (force) {
      clearSelectionEvents(hist.done);
      return lst(hist.done);
    } else if (hist.done.length && !lst(hist.done).ranges) {
      return lst(hist.done);
    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
      hist.done.pop();
      return lst(hist.done);
    }
  }

  // Register a change in the history. Merges changes that are within
  // a single operation, or are close together with an origin that
  // allows merging (starting with "+") into a single event.
  function addChangeToHistory(doc, change, selAfter, opId) {
    var hist = doc.history;
    hist.undone.length = 0;
    var time = +new Date(),
        cur;
    var last;

    if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
      // Merge this change into the last event
      last = lst(cur.changes);
      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
        // Optimized case for simple insertion -- don't want to add
        // new changesets for every character typed
        last.to = changeEnd(change);
      } else {
        // Add new sub-event
        cur.changes.push(historyChangeFromChange(doc, change));
      }
    } else {
      // Can not be merged, start a new event.
      var before = lst(hist.done);
      if (!before || !before.ranges) {
        pushSelectionToHistory(doc.sel, hist.done);
      }
      cur = { changes: [historyChangeFromChange(doc, change)],
        generation: hist.generation };
      hist.done.push(cur);
      while (hist.done.length > hist.undoDepth) {
        hist.done.shift();
        if (!hist.done[0].ranges) {
          hist.done.shift();
        }
      }
    }
    hist.done.push(selAfter);
    hist.generation = ++hist.maxGeneration;
    hist.lastModTime = hist.lastSelTime = time;
    hist.lastOp = hist.lastSelOp = opId;
    hist.lastOrigin = hist.lastSelOrigin = change.origin;

    if (!last) {
      signal(doc, "historyAdded");
    }
  }

  function selectionEventCanBeMerged(doc, origin, prev, sel) {
    var ch = origin.charAt(0);
    return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
  }

  // Called whenever the selection changes, sets the new selection as
  // the pending selection in the history, and pushes the old pending
  // selection into the 'done' array when it was significantly
  // different (in number of selected ranges, emptiness, or time).
  function addSelectionToHistory(doc, sel, opId, options) {
    var hist = doc.history,
        origin = options && options.origin;

    // A new event is started when the previous origin does not match
    // the current, or the origins don't allow matching. Origins
    // starting with * are always merged, those starting with + are
    // merged when similar and close together in time.
    if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))) {
      hist.done[hist.done.length - 1] = sel;
    } else {
      pushSelectionToHistory(sel, hist.done);
    }

    hist.lastSelTime = +new Date();
    hist.lastSelOrigin = origin;
    hist.lastSelOp = opId;
    if (options && options.clearRedo !== false) {
      clearSelectionEvents(hist.undone);
    }
  }

  function pushSelectionToHistory(sel, dest) {
    var top = lst(dest);
    if (!(top && top.ranges && top.equals(sel))) {
      dest.push(sel);
    }
  }

  // Used to store marked span information in the history.
  function attachLocalSpans(doc, change, from, to) {
    var existing = change["spans_" + doc.id],
        n = 0;
    doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function (line) {
      if (line.markedSpans) {
        (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
      }
      ++n;
    });
  }

  // When un/re-doing restores text containing marked spans, those
  // that have been explicitly cleared should not be restored.
  function removeClearedSpans(spans) {
    if (!spans) {
      return null;
    }
    var out;
    for (var i = 0; i < spans.length; ++i) {
      if (spans[i].marker.explicitlyCleared) {
        if (!out) {
          out = spans.slice(0, i);
        }
      } else if (out) {
        out.push(spans[i]);
      }
    }
    return !out ? spans : out.length ? out : null;
  }

  // Retrieve and filter the old marked spans stored in a change event.
  function getOldSpans(doc, change) {
    var found = change["spans_" + doc.id];
    if (!found) {
      return null;
    }
    var nw = [];
    for (var i = 0; i < change.text.length; ++i) {
      nw.push(removeClearedSpans(found[i]));
    }
    return nw;
  }

  // Used for un/re-doing changes from the history. Combines the
  // result of computing the existing spans with the set of spans that
  // existed in the history (so that deleting around a span and then
  // undoing brings back the span).
  function mergeOldSpans(doc, change) {
    var old = getOldSpans(doc, change);
    var stretched = stretchSpansOverChange(doc, change);
    if (!old) {
      return stretched;
    }
    if (!stretched) {
      return old;
    }

    for (var i = 0; i < old.length; ++i) {
      var oldCur = old[i],
          stretchCur = stretched[i];
      if (oldCur && stretchCur) {
        spans: for (var j = 0; j < stretchCur.length; ++j) {
          var span = stretchCur[j];
          for (var k = 0; k < oldCur.length; ++k) {
            if (oldCur[k].marker == span.marker) {
              continue spans;
            }
          }
          oldCur.push(span);
        }
      } else if (stretchCur) {
        old[i] = stretchCur;
      }
    }
    return old;
  }

  // Used both to provide a JSON-safe object in .getHistory, and, when
  // detaching a document, to split the history in two
  function copyHistoryArray(events, newGroup, instantiateSel) {
    var copy = [];
    for (var i = 0; i < events.length; ++i) {
      var event = events[i];
      if (event.ranges) {
        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
        continue;
      }
      var changes = event.changes,
          newChanges = [];
      copy.push({ changes: newChanges });
      for (var j = 0; j < changes.length; ++j) {
        var change = changes[j],
            m = void 0;
        newChanges.push({ from: change.from, to: change.to, text: change.text });
        if (newGroup) {
          for (var prop in change) {
            if (m = prop.match(/^spans_(\d+)$/)) {
              if (indexOf(newGroup, Number(m[1])) > -1) {
                lst(newChanges)[prop] = change[prop];
                delete change[prop];
              }
            }
          }
        }
      }
    }
    return copy;
  }

  // The 'scroll' parameter given to many of these indicated whether
  // the new cursor position should be scrolled into view after
  // modifying the selection.

  // If shift is held or the extend flag is set, extends a range to
  // include a given position (and optionally a second position).
  // Otherwise, simply returns the range between the given positions.
  // Used for cursor motion and such.
  function extendRange(doc, range, head, other) {
    if (doc.cm && doc.cm.display.shift || doc.extend) {
      var anchor = range.anchor;
      if (other) {
        var posBefore = cmp(head, anchor) < 0;
        if (posBefore != cmp(other, anchor) < 0) {
          anchor = head;
          head = other;
        } else if (posBefore != cmp(head, other) < 0) {
          head = other;
        }
      }
      return new Range(anchor, head);
    } else {
      return new Range(other || head, head);
    }
  }

  // Extend the primary selection range, discard the rest.
  function extendSelection(doc, head, other, options) {
    setSelection(doc, new Selection([extendRange(doc, doc.sel.primary(), head, other)], 0), options);
  }

  // Extend all selections (pos is an array of selections with length
  // equal the number of selections)
  function extendSelections(doc, heads, options) {
    var out = [];
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      out[i] = extendRange(doc, doc.sel.ranges[i], heads[i], null);
    }
    var newSel = normalizeSelection(out, doc.sel.primIndex);
    setSelection(doc, newSel, options);
  }

  // Updates a single range in the selection.
  function replaceOneSelection(doc, i, range, options) {
    var ranges = doc.sel.ranges.slice(0);
    ranges[i] = range;
    setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
  }

  // Reset the selection to a single range.
  function setSimpleSelection(doc, anchor, head, options) {
    setSelection(doc, simpleSelection(anchor, head), options);
  }

  // Give beforeSelectionChange handlers a change to influence a
  // selection update.
  function filterSelectionChange(doc, sel, options) {
    var obj = {
      ranges: sel.ranges,
      update: function (ranges) {
        var this$1 = this;

        this.ranges = [];
        for (var i = 0; i < ranges.length; i++) {
          this$1.ranges[i] = new Range(clipPos(doc, ranges[i].anchor), clipPos(doc, ranges[i].head));
        }
      },
      origin: options && options.origin
    };
    signal(doc, "beforeSelectionChange", doc, obj);
    if (doc.cm) {
      signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
    }
    if (obj.ranges != sel.ranges) {
      return normalizeSelection(obj.ranges, obj.ranges.length - 1);
    } else {
      return sel;
    }
  }

  function setSelectionReplaceHistory(doc, sel, options) {
    var done = doc.history.done,
        last = lst(done);
    if (last && last.ranges) {
      done[done.length - 1] = sel;
      setSelectionNoUndo(doc, sel, options);
    } else {
      setSelection(doc, sel, options);
    }
  }

  // Set a new selection.
  function setSelection(doc, sel, options) {
    setSelectionNoUndo(doc, sel, options);
    addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
  }

  function setSelectionNoUndo(doc, sel, options) {
    if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange")) {
      sel = filterSelectionChange(doc, sel, options);
    }

    var bias = options && options.bias || (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
    setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));

    if (!(options && options.scroll === false) && doc.cm) {
      ensureCursorVisible(doc.cm);
    }
  }

  function setSelectionInner(doc, sel) {
    if (sel.equals(doc.sel)) {
      return;
    }

    doc.sel = sel;

    if (doc.cm) {
      doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = true;
      signalCursorActivity(doc.cm);
    }
    signalLater(doc, "cursorActivity", doc);
  }

  // Verify that the selection does not partially select any atomic
  // marked ranges.
  function reCheckSelection(doc) {
    setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false), sel_dontScroll);
  }

  // Return a selection that does not partially select any atomic
  // ranges.
  function skipAtomicInSelection(doc, sel, bias, mayClear) {
    var out;
    for (var i = 0; i < sel.ranges.length; i++) {
      var range = sel.ranges[i];
      var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i];
      var newAnchor = skipAtomic(doc, range.anchor, old && old.anchor, bias, mayClear);
      var newHead = skipAtomic(doc, range.head, old && old.head, bias, mayClear);
      if (out || newAnchor != range.anchor || newHead != range.head) {
        if (!out) {
          out = sel.ranges.slice(0, i);
        }
        out[i] = new Range(newAnchor, newHead);
      }
    }
    return out ? normalizeSelection(out, sel.primIndex) : sel;
  }

  function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
    var line = getLine(doc, pos.line);
    if (line.markedSpans) {
      for (var i = 0; i < line.markedSpans.length; ++i) {
        var sp = line.markedSpans[i],
            m = sp.marker;
        if ((sp.from == null || (m.inclusiveLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (m.inclusiveRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
          if (mayClear) {
            signal(m, "beforeCursorEnter");
            if (m.explicitlyCleared) {
              if (!line.markedSpans) {
                break;
              } else {
                --i;continue;
              }
            }
          }
          if (!m.atomic) {
            continue;
          }

          if (oldPos) {
            var near = m.find(dir < 0 ? 1 : -1),
                diff = void 0;
            if (dir < 0 ? m.inclusiveRight : m.inclusiveLeft) {
              near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null);
            }
            if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
              return skipAtomicInner(doc, near, pos, dir, mayClear);
            }
          }

          var far = m.find(dir < 0 ? -1 : 1);
          if (dir < 0 ? m.inclusiveLeft : m.inclusiveRight) {
            far = movePos(doc, far, dir, far.line == pos.line ? line : null);
          }
          return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null;
        }
      }
    }
    return pos;
  }

  // Ensure a given position is not inside an atomic range.
  function skipAtomic(doc, pos, oldPos, bias, mayClear) {
    var dir = bias || 1;
    var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, dir, true) || skipAtomicInner(doc, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true);
    if (!found) {
      doc.cantEdit = true;
      return Pos(doc.first, 0);
    }
    return found;
  }

  function movePos(doc, pos, dir, line) {
    if (dir < 0 && pos.ch == 0) {
      if (pos.line > doc.first) {
        return clipPos(doc, Pos(pos.line - 1));
      } else {
        return null;
      }
    } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
      if (pos.line < doc.first + doc.size - 1) {
        return Pos(pos.line + 1, 0);
      } else {
        return null;
      }
    } else {
      return new Pos(pos.line, pos.ch + dir);
    }
  }

  function selectAll(cm) {
    cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
  }

  // UPDATING

  // Allow "beforeChange" event handlers to influence a change
  function filterChange(doc, change, update) {
    var obj = {
      canceled: false,
      from: change.from,
      to: change.to,
      text: change.text,
      origin: change.origin,
      cancel: function () {
        return obj.canceled = true;
      }
    };
    if (update) {
      obj.update = function (from, to, text, origin) {
        if (from) {
          obj.from = clipPos(doc, from);
        }
        if (to) {
          obj.to = clipPos(doc, to);
        }
        if (text) {
          obj.text = text;
        }
        if (origin !== undefined) {
          obj.origin = origin;
        }
      };
    }
    signal(doc, "beforeChange", doc, obj);
    if (doc.cm) {
      signal(doc.cm, "beforeChange", doc.cm, obj);
    }

    if (obj.canceled) {
      return null;
    }
    return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
  }

  // Apply a change to a document, and add it to the document's
  // history, and propagating it to all linked documents.
  function makeChange(doc, change, ignoreReadOnly) {
    if (doc.cm) {
      if (!doc.cm.curOp) {
        return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
      }
      if (doc.cm.state.suppressEdits) {
        return;
      }
    }

    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
      change = filterChange(doc, change, true);
      if (!change) {
        return;
      }
    }

    // Possibly split or suppress the update based on the presence
    // of read-only spans in its range.
    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
    if (split) {
      for (var i = split.length - 1; i >= 0; --i) {
        makeChangeInner(doc, { from: split[i].from, to: split[i].to, text: i ? [""] : change.text });
      }
    } else {
      makeChangeInner(doc, change);
    }
  }

  function makeChangeInner(doc, change) {
    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
      return;
    }
    var selAfter = computeSelAfterChange(doc, change);
    addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);

    makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
    var rebased = [];

    linkedDocs(doc, function (doc, sharedHist) {
      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
        rebaseHist(doc.history, change);
        rebased.push(doc.history);
      }
      makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
    });
  }

  // Revert a change stored in a document's history.
  function makeChangeFromHistory(doc, type, allowSelectionOnly) {
    if (doc.cm && doc.cm.state.suppressEdits && !allowSelectionOnly) {
      return;
    }

    var hist = doc.history,
        event,
        selAfter = doc.sel;
    var source = type == "undo" ? hist.done : hist.undone,
        dest = type == "undo" ? hist.undone : hist.done;

    // Verify that there is a useable event (so that ctrl-z won't
    // needlessly clear selection events)
    var i = 0;
    for (; i < source.length; i++) {
      event = source[i];
      if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges) {
        break;
      }
    }
    if (i == source.length) {
      return;
    }
    hist.lastOrigin = hist.lastSelOrigin = null;

    for (;;) {
      event = source.pop();
      if (event.ranges) {
        pushSelectionToHistory(event, dest);
        if (allowSelectionOnly && !event.equals(doc.sel)) {
          setSelection(doc, event, { clearRedo: false });
          return;
        }
        selAfter = event;
      } else {
        break;
      }
    }

    // Build up a reverse change object to add to the opposite history
    // stack (redo when undoing, and vice versa).
    var antiChanges = [];
    pushSelectionToHistory(selAfter, dest);
    dest.push({ changes: antiChanges, generation: hist.generation });
    hist.generation = event.generation || ++hist.maxGeneration;

    var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");

    var loop = function (i) {
      var change = event.changes[i];
      change.origin = type;
      if (filter && !filterChange(doc, change, false)) {
        source.length = 0;
        return {};
      }

      antiChanges.push(historyChangeFromChange(doc, change));

      var after = i ? computeSelAfterChange(doc, change) : lst(source);
      makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
      if (!i && doc.cm) {
        doc.cm.scrollIntoView({ from: change.from, to: changeEnd(change) });
      }
      var rebased = [];

      // Propagate to the linked documents
      linkedDocs(doc, function (doc, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc.history) == -1) {
          rebaseHist(doc.history, change);
          rebased.push(doc.history);
        }
        makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
      });
    };

    for (var i$1 = event.changes.length - 1; i$1 >= 0; --i$1) {
      var returned = loop(i$1);

      if (returned) return returned.v;
    }
  }

  // Sub-views need their line numbers shifted when text is added
  // above or below them in the parent document.
  function shiftDoc(doc, distance) {
    if (distance == 0) {
      return;
    }
    doc.first += distance;
    doc.sel = new Selection(map(doc.sel.ranges, function (range) {
      return new Range(Pos(range.anchor.line + distance, range.anchor.ch), Pos(range.head.line + distance, range.head.ch));
    }), doc.sel.primIndex);
    if (doc.cm) {
      regChange(doc.cm, doc.first, doc.first - distance, distance);
      for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++) {
        regLineChange(doc.cm, l, "gutter");
      }
    }
  }

  // More lower-level change function, handling only a single document
  // (not linked ones).
  function makeChangeSingleDoc(doc, change, selAfter, spans) {
    if (doc.cm && !doc.cm.curOp) {
      return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
    }

    if (change.to.line < doc.first) {
      shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
      return;
    }
    if (change.from.line > doc.lastLine()) {
      return;
    }

    // Clip the change to the size of this doc
    if (change.from.line < doc.first) {
      var shift = change.text.length - 1 - (doc.first - change.from.line);
      shiftDoc(doc, shift);
      change = { from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
        text: [lst(change.text)], origin: change.origin };
    }
    var last = doc.lastLine();
    if (change.to.line > last) {
      change = { from: change.from, to: Pos(last, getLine(doc, last).text.length),
        text: [change.text[0]], origin: change.origin };
    }

    change.removed = getBetween(doc, change.from, change.to);

    if (!selAfter) {
      selAfter = computeSelAfterChange(doc, change);
    }
    if (doc.cm) {
      makeChangeSingleDocInEditor(doc.cm, change, spans);
    } else {
      updateDoc(doc, change, spans);
    }
    setSelectionNoUndo(doc, selAfter, sel_dontScroll);
  }

  // Handle the interaction of a change to a document with the editor
  // that this document is part of.
  function makeChangeSingleDocInEditor(cm, change, spans) {
    var doc = cm.doc,
        display = cm.display,
        from = change.from,
        to = change.to;

    var recomputeMaxLength = false,
        checkWidthStart = from.line;
    if (!cm.options.lineWrapping) {
      checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
      doc.iter(checkWidthStart, to.line + 1, function (line) {
        if (line == display.maxLine) {
          recomputeMaxLength = true;
          return true;
        }
      });
    }

    if (doc.sel.contains(change.from, change.to) > -1) {
      signalCursorActivity(cm);
    }

    updateDoc(doc, change, spans, estimateHeight(cm));

    if (!cm.options.lineWrapping) {
      doc.iter(checkWidthStart, from.line + change.text.length, function (line) {
        var len = lineLength(line);
        if (len > display.maxLineLength) {
          display.maxLine = line;
          display.maxLineLength = len;
          display.maxLineChanged = true;
          recomputeMaxLength = false;
        }
      });
      if (recomputeMaxLength) {
        cm.curOp.updateMaxLine = true;
      }
    }

    // Adjust frontier, schedule worker
    doc.frontier = Math.min(doc.frontier, from.line);
    startWorker(cm, 400);

    var lendiff = change.text.length - (to.line - from.line) - 1;
    // Remember that these lines changed, for updating the display
    if (change.full) {
      regChange(cm);
    } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) {
      regLineChange(cm, from.line, "text");
    } else {
      regChange(cm, from.line, to.line + 1, lendiff);
    }

    var changesHandler = hasHandler(cm, "changes"),
        changeHandler = hasHandler(cm, "change");
    if (changeHandler || changesHandler) {
      var obj = {
        from: from, to: to,
        text: change.text,
        removed: change.removed,
        origin: change.origin
      };
      if (changeHandler) {
        signalLater(cm, "change", cm, obj);
      }
      if (changesHandler) {
        (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
      }
    }
    cm.display.selForContextMenu = null;
  }

  function replaceRange(doc, code, from, to, origin) {
    if (!to) {
      to = from;
    }
    if (cmp(to, from) < 0) {
      var tmp = to;to = from;from = tmp;
    }
    if (typeof code == "string") {
      code = doc.splitLines(code);
    }
    makeChange(doc, { from: from, to: to, text: code, origin: origin });
  }

  // Rebasing/resetting history to deal with externally-sourced changes

  function rebaseHistSelSingle(pos, from, to, diff) {
    if (to < pos.line) {
      pos.line += diff;
    } else if (from < pos.line) {
      pos.line = from;
      pos.ch = 0;
    }
  }

  // Tries to rebase an array of history events given a change in the
  // document. If the change touches the same lines as the event, the
  // event, and everything 'behind' it, is discarded. If the change is
  // before the event, the event's positions are updated. Uses a
  // copy-on-write scheme for the positions, to avoid having to
  // reallocate them all on every rebase, but also avoid problems with
  // shared position objects being unsafely updated.
  function rebaseHistArray(array, from, to, diff) {
    for (var i = 0; i < array.length; ++i) {
      var sub = array[i],
          ok = true;
      if (sub.ranges) {
        if (!sub.copied) {
          sub = array[i] = sub.deepCopy();sub.copied = true;
        }
        for (var j = 0; j < sub.ranges.length; j++) {
          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
        }
        continue;
      }
      for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
        var cur = sub.changes[j$1];
        if (to < cur.from.line) {
          cur.from = Pos(cur.from.line + diff, cur.from.ch);
          cur.to = Pos(cur.to.line + diff, cur.to.ch);
        } else if (from <= cur.to.line) {
          ok = false;
          break;
        }
      }
      if (!ok) {
        array.splice(0, i + 1);
        i = 0;
      }
    }
  }

  function rebaseHist(hist, change) {
    var from = change.from.line,
        to = change.to.line,
        diff = change.text.length - (to - from) - 1;
    rebaseHistArray(hist.done, from, to, diff);
    rebaseHistArray(hist.undone, from, to, diff);
  }

  // Utility for applying a change to a line by handle or number,
  // returning the number and optionally registering the line as
  // changed.
  function changeLine(doc, handle, changeType, op) {
    var no = handle,
        line = handle;
    if (typeof handle == "number") {
      line = getLine(doc, clipLine(doc, handle));
    } else {
      no = lineNo(handle);
    }
    if (no == null) {
      return null;
    }
    if (op(line, no) && doc.cm) {
      regLineChange(doc.cm, no, changeType);
    }
    return line;
  }

  // The document is represented as a BTree consisting of leaves, with
  // chunk of lines in them, and branches, with up to ten leaves or
  // other branch nodes below them. The top node is always a branch
  // node, and is the document object itself (meaning it has
  // additional methods and properties).
  //
  // All nodes have parent links. The tree is used both to go from
  // line numbers to line objects, and to go from objects to numbers.
  // It also indexes by height, and is used to convert between height
  // and line object, and to find the total height of the document.
  //
  // See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html

  var LeafChunk = function (lines) {
    var this$1 = this;

    this.lines = lines;
    this.parent = null;
    var height = 0;
    for (var i = 0; i < lines.length; ++i) {
      lines[i].parent = this$1;
      height += lines[i].height;
    }
    this.height = height;
  };

  LeafChunk.prototype.chunkSize = function () {
    return this.lines.length;
  };

  // Remove the n lines at offset 'at'.
  LeafChunk.prototype.removeInner = function (at, n) {
    var this$1 = this;

    for (var i = at, e = at + n; i < e; ++i) {
      var line = this$1.lines[i];
      this$1.height -= line.height;
      cleanUpLine(line);
      signalLater(line, "delete");
    }
    this.lines.splice(at, n);
  };

  // Helper used to collapse a small branch into a single leaf.
  LeafChunk.prototype.collapse = function (lines) {
    lines.push.apply(lines, this.lines);
  };

  // Insert the given array of lines at offset 'at', count them as
  // having the given height.
  LeafChunk.prototype.insertInner = function (at, lines, height) {
    var this$1 = this;

    this.height += height;
    this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
    for (var i = 0; i < lines.length; ++i) {
      lines[i].parent = this$1;
    }
  };

  // Used to iterate over a part of the tree.
  LeafChunk.prototype.iterN = function (at, n, op) {
    var this$1 = this;

    for (var e = at + n; at < e; ++at) {
      if (op(this$1.lines[at])) {
        return true;
      }
    }
  };

  var BranchChunk = function (children) {
    var this$1 = this;

    this.children = children;
    var size = 0,
        height = 0;
    for (var i = 0; i < children.length; ++i) {
      var ch = children[i];
      size += ch.chunkSize();height += ch.height;
      ch.parent = this$1;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  };

  BranchChunk.prototype.chunkSize = function () {
    return this.size;
  };

  BranchChunk.prototype.removeInner = function (at, n) {
    var this$1 = this;

    this.size -= n;
    for (var i = 0; i < this.children.length; ++i) {
      var child = this$1.children[i],
          sz = child.chunkSize();
      if (at < sz) {
        var rm = Math.min(n, sz - at),
            oldHeight = child.height;
        child.removeInner(at, rm);
        this$1.height -= oldHeight - child.height;
        if (sz == rm) {
          this$1.children.splice(i--, 1);child.parent = null;
        }
        if ((n -= rm) == 0) {
          break;
        }
        at = 0;
      } else {
        at -= sz;
      }
    }
    // If the result is smaller than 25 lines, ensure that it is a
    // single leaf node.
    if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
      var lines = [];
      this.collapse(lines);
      this.children = [new LeafChunk(lines)];
      this.children[0].parent = this;
    }
  };

  BranchChunk.prototype.collapse = function (lines) {
    var this$1 = this;

    for (var i = 0; i < this.children.length; ++i) {
      this$1.children[i].collapse(lines);
    }
  };

  BranchChunk.prototype.insertInner = function (at, lines, height) {
    var this$1 = this;

    this.size += lines.length;
    this.height += height;
    for (var i = 0; i < this.children.length; ++i) {
      var child = this$1.children[i],
          sz = child.chunkSize();
      if (at <= sz) {
        child.insertInner(at, lines, height);
        if (child.lines && child.lines.length > 50) {
          // To avoid memory thrashing when child.lines is huge (e.g. first view of a large file), it's never spliced.
          // Instead, small slices are taken. They're taken in order because sequential memory accesses are fastest.
          var remaining = child.lines.length % 25 + 25;
          for (var pos = remaining; pos < child.lines.length;) {
            var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
            child.height -= leaf.height;
            this$1.children.splice(++i, 0, leaf);
            leaf.parent = this$1;
          }
          child.lines = child.lines.slice(0, remaining);
          this$1.maybeSpill();
        }
        break;
      }
      at -= sz;
    }
  };

  // When a node has grown, check whether it should be split.
  BranchChunk.prototype.maybeSpill = function () {
    if (this.children.length <= 10) {
      return;
    }
    var me = this;
    do {
      var spilled = me.children.splice(me.children.length - 5, 5);
      var sibling = new BranchChunk(spilled);
      if (!me.parent) {
        // Become the parent node
        var copy = new BranchChunk(me.children);
        copy.parent = me;
        me.children = [copy, sibling];
        me = copy;
      } else {
        me.size -= sibling.size;
        me.height -= sibling.height;
        var myIndex = indexOf(me.parent.children, me);
        me.parent.children.splice(myIndex + 1, 0, sibling);
      }
      sibling.parent = me.parent;
    } while (me.children.length > 10);
    me.parent.maybeSpill();
  };

  BranchChunk.prototype.iterN = function (at, n, op) {
    var this$1 = this;

    for (var i = 0; i < this.children.length; ++i) {
      var child = this$1.children[i],
          sz = child.chunkSize();
      if (at < sz) {
        var used = Math.min(n, sz - at);
        if (child.iterN(at, used, op)) {
          return true;
        }
        if ((n -= used) == 0) {
          break;
        }
        at = 0;
      } else {
        at -= sz;
      }
    }
  };

  // Line widgets are block elements displayed above or below a line.

  var LineWidget = function (doc, node, options) {
    var this$1 = this;

    if (options) {
      for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
          this$1[opt] = options[opt];
        }
      }
    }
    this.doc = doc;
    this.node = node;
  };

  LineWidget.prototype.clear = function () {
    var this$1 = this;

    var cm = this.doc.cm,
        ws = this.line.widgets,
        line = this.line,
        no = lineNo(line);
    if (no == null || !ws) {
      return;
    }
    for (var i = 0; i < ws.length; ++i) {
      if (ws[i] == this$1) {
        ws.splice(i--, 1);
      }
    }
    if (!ws.length) {
      line.widgets = null;
    }
    var height = widgetHeight(this);
    updateLineHeight(line, Math.max(0, line.height - height));
    if (cm) {
      runInOp(cm, function () {
        adjustScrollWhenAboveVisible(cm, line, -height);
        regLineChange(cm, no, "widget");
      });
      signalLater(cm, "lineWidgetCleared", cm, this, no);
    }
  };

  LineWidget.prototype.changed = function () {
    var this$1 = this;

    var oldH = this.height,
        cm = this.doc.cm,
        line = this.line;
    this.height = null;
    var diff = widgetHeight(this) - oldH;
    if (!diff) {
      return;
    }
    updateLineHeight(line, line.height + diff);
    if (cm) {
      runInOp(cm, function () {
        cm.curOp.forceUpdate = true;
        adjustScrollWhenAboveVisible(cm, line, diff);
        signalLater(cm, "lineWidgetChanged", cm, this$1, lineNo(line));
      });
    }
  };
  eventMixin(LineWidget);

  function adjustScrollWhenAboveVisible(cm, line, diff) {
    if (heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) {
      addToScrollPos(cm, null, diff);
    }
  }

  function addLineWidget(doc, handle, node, options) {
    var widget = new LineWidget(doc, node, options);
    var cm = doc.cm;
    if (cm && widget.noHScroll) {
      cm.display.alignWidgets = true;
    }
    changeLine(doc, handle, "widget", function (line) {
      var widgets = line.widgets || (line.widgets = []);
      if (widget.insertAt == null) {
        widgets.push(widget);
      } else {
        widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget);
      }
      widget.line = line;
      if (cm && !lineIsHidden(doc, line)) {
        var aboveVisible = heightAtLine(line) < doc.scrollTop;
        updateLineHeight(line, line.height + widgetHeight(widget));
        if (aboveVisible) {
          addToScrollPos(cm, null, widget.height);
        }
        cm.curOp.forceUpdate = true;
      }
      return true;
    });
    signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
    return widget;
  }

  // TEXTMARKERS

  // Created with markText and setBookmark methods. A TextMarker is a
  // handle that can be used to clear or find a marked position in the
  // document. Line objects hold arrays (markedSpans) containing
  // {from, to, marker} object pointing to such marker objects, and
  // indicating that such a marker is present on that line. Multiple
  // lines may point to the same marker when it spans across lines.
  // The spans will have null for their from/to properties when the
  // marker continues beyond the start/end of the line. Markers have
  // links back to the lines they currently touch.

  // Collapsed markers have unique ids, in order to be able to order
  // them, which is needed for uniquely determining an outer marker
  // when they overlap (they may nest, but not partially overlap).
  var nextMarkerId = 0;

  var TextMarker = function (doc, type) {
    this.lines = [];
    this.type = type;
    this.doc = doc;
    this.id = ++nextMarkerId;
  };

  // Clear the marker.
  TextMarker.prototype.clear = function () {
    var this$1 = this;

    if (this.explicitlyCleared) {
      return;
    }
    var cm = this.doc.cm,
        withOp = cm && !cm.curOp;
    if (withOp) {
      startOperation(cm);
    }
    if (hasHandler(this, "clear")) {
      var found = this.find();
      if (found) {
        signalLater(this, "clear", found.from, found.to);
      }
    }
    var min = null,
        max = null;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this$1.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this$1);
      if (cm && !this$1.collapsed) {
        regLineChange(cm, lineNo(line), "text");
      } else if (cm) {
        if (span.to != null) {
          max = lineNo(line);
        }
        if (span.from != null) {
          min = lineNo(line);
        }
      }
      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
      if (span.from == null && this$1.collapsed && !lineIsHidden(this$1.doc, line) && cm) {
        updateLineHeight(line, textHeight(cm.display));
      }
    }
    if (cm && this.collapsed && !cm.options.lineWrapping) {
      for (var i$1 = 0; i$1 < this.lines.length; ++i$1) {
        var visual = visualLine(this$1.lines[i$1]),
            len = lineLength(visual);
        if (len > cm.display.maxLineLength) {
          cm.display.maxLine = visual;
          cm.display.maxLineLength = len;
          cm.display.maxLineChanged = true;
        }
      }
    }

    if (min != null && cm && this.collapsed) {
      regChange(cm, min, max + 1);
    }
    this.lines.length = 0;
    this.explicitlyCleared = true;
    if (this.atomic && this.doc.cantEdit) {
      this.doc.cantEdit = false;
      if (cm) {
        reCheckSelection(cm.doc);
      }
    }
    if (cm) {
      signalLater(cm, "markerCleared", cm, this, min, max);
    }
    if (withOp) {
      endOperation(cm);
    }
    if (this.parent) {
      this.parent.clear();
    }
  };

  // Find the position of the marker in the document. Returns a {from,
  // to} object by default. Side can be passed to get a specific side
  // -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
  // Pos objects returned contain a line object, rather than a line
  // number (used to prevent looking up the same line twice).
  TextMarker.prototype.find = function (side, lineObj) {
    var this$1 = this;

    if (side == null && this.type == "bookmark") {
      side = 1;
    }
    var from, to;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this$1.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this$1);
      if (span.from != null) {
        from = Pos(lineObj ? line : lineNo(line), span.from);
        if (side == -1) {
          return from;
        }
      }
      if (span.to != null) {
        to = Pos(lineObj ? line : lineNo(line), span.to);
        if (side == 1) {
          return to;
        }
      }
    }
    return from && { from: from, to: to };
  };

  // Signals that the marker's widget changed, and surrounding layout
  // should be recomputed.
  TextMarker.prototype.changed = function () {
    var this$1 = this;

    var pos = this.find(-1, true),
        widget = this,
        cm = this.doc.cm;
    if (!pos || !cm) {
      return;
    }
    runInOp(cm, function () {
      var line = pos.line,
          lineN = lineNo(pos.line);
      var view = findViewForLine(cm, lineN);
      if (view) {
        clearLineMeasurementCacheFor(view);
        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
      }
      cm.curOp.updateMaxLine = true;
      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
        var oldHeight = widget.height;
        widget.height = null;
        var dHeight = widgetHeight(widget) - oldHeight;
        if (dHeight) {
          updateLineHeight(line, line.height + dHeight);
        }
      }
      signalLater(cm, "markerChanged", cm, this$1);
    });
  };

  TextMarker.prototype.attachLine = function (line) {
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
        (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
      }
    }
    this.lines.push(line);
  };

  TextMarker.prototype.detachLine = function (line) {
    this.lines.splice(indexOf(this.lines, line), 1);
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;(op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
    }
  };
  eventMixin(TextMarker);

  // Create a marker, wire it up to the right lines, and
  function markText(doc, from, to, options, type) {
    // Shared markers (across linked documents) are handled separately
    // (markTextShared will call out to this again, once per
    // document).
    if (options && options.shared) {
      return markTextShared(doc, from, to, options, type);
    }
    // Ensure we are in an operation.
    if (doc.cm && !doc.cm.curOp) {
      return operation(doc.cm, markText)(doc, from, to, options, type);
    }

    var marker = new TextMarker(doc, type),
        diff = cmp(from, to);
    if (options) {
      copyObj(options, marker, false);
    }
    // Don't connect empty markers unless clearWhenEmpty is false
    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
      return marker;
    }
    if (marker.replacedWith) {
      // Showing up as a widget implies collapsed (widget replaces text)
      marker.collapsed = true;
      marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
      if (!options.handleMouseEvents) {
        marker.widgetNode.setAttribute("cm-ignore-events", "true");
      }
      if (options.insertLeft) {
        marker.widgetNode.insertLeft = true;
      }
    }
    if (marker.collapsed) {
      if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker)) {
        throw new Error("Inserting collapsed marker partially overlapping an existing one");
      }
      seeCollapsedSpans();
    }

    if (marker.addToHistory) {
      addChangeToHistory(doc, { from: from, to: to, origin: "markText" }, doc.sel, NaN);
    }

    var curLine = from.line,
        cm = doc.cm,
        updateMaxLine;
    doc.iter(curLine, to.line + 1, function (line) {
      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) {
        updateMaxLine = true;
      }
      if (marker.collapsed && curLine != from.line) {
        updateLineHeight(line, 0);
      }
      addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch : null, curLine == to.line ? to.ch : null));
      ++curLine;
    });
    // lineIsHidden depends on the presence of the spans, so needs a second pass
    if (marker.collapsed) {
      doc.iter(from.line, to.line + 1, function (line) {
        if (lineIsHidden(doc, line)) {
          updateLineHeight(line, 0);
        }
      });
    }

    if (marker.clearOnEnter) {
      on(marker, "beforeCursorEnter", function () {
        return marker.clear();
      });
    }

    if (marker.readOnly) {
      seeReadOnlySpans();
      if (doc.history.done.length || doc.history.undone.length) {
        doc.clearHistory();
      }
    }
    if (marker.collapsed) {
      marker.id = ++nextMarkerId;
      marker.atomic = true;
    }
    if (cm) {
      // Sync editor state
      if (updateMaxLine) {
        cm.curOp.updateMaxLine = true;
      }
      if (marker.collapsed) {
        regChange(cm, from.line, to.line + 1);
      } else if (marker.className || marker.title || marker.startStyle || marker.endStyle || marker.css) {
        for (var i = from.line; i <= to.line; i++) {
          regLineChange(cm, i, "text");
        }
      }
      if (marker.atomic) {
        reCheckSelection(cm.doc);
      }
      signalLater(cm, "markerAdded", cm, marker);
    }
    return marker;
  }

  // SHARED TEXTMARKERS

  // A shared marker spans multiple linked documents. It is
  // implemented as a meta-marker-object controlling multiple normal
  // markers.
  var SharedTextMarker = function (markers, primary) {
    var this$1 = this;

    this.markers = markers;
    this.primary = primary;
    for (var i = 0; i < markers.length; ++i) {
      markers[i].parent = this$1;
    }
  };

  SharedTextMarker.prototype.clear = function () {
    var this$1 = this;

    if (this.explicitlyCleared) {
      return;
    }
    this.explicitlyCleared = true;
    for (var i = 0; i < this.markers.length; ++i) {
      this$1.markers[i].clear();
    }
    signalLater(this, "clear");
  };

  SharedTextMarker.prototype.find = function (side, lineObj) {
    return this.primary.find(side, lineObj);
  };
  eventMixin(SharedTextMarker);

  function markTextShared(doc, from, to, options, type) {
    options = copyObj(options);
    options.shared = false;
    var markers = [markText(doc, from, to, options, type)],
        primary = markers[0];
    var widget = options.widgetNode;
    linkedDocs(doc, function (doc) {
      if (widget) {
        options.widgetNode = widget.cloneNode(true);
      }
      markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
      for (var i = 0; i < doc.linked.length; ++i) {
        if (doc.linked[i].isParent) {
          return;
        }
      }
      primary = lst(markers);
    });
    return new SharedTextMarker(markers, primary);
  }

  function findSharedMarkers(doc) {
    return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function (m) {
      return m.parent;
    });
  }

  function copySharedMarkers(doc, markers) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i],
          pos = marker.find();
      var mFrom = doc.clipPos(pos.from),
          mTo = doc.clipPos(pos.to);
      if (cmp(mFrom, mTo)) {
        var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
        marker.markers.push(subMark);
        subMark.parent = marker;
      }
    }
  }

  function detachSharedMarkers(markers) {
    var loop = function (i) {
      var marker = markers[i],
          linked = [marker.primary.doc];
      linkedDocs(marker.primary.doc, function (d) {
        return linked.push(d);
      });
      for (var j = 0; j < marker.markers.length; j++) {
        var subMarker = marker.markers[j];
        if (indexOf(linked, subMarker.doc) == -1) {
          subMarker.parent = null;
          marker.markers.splice(j--, 1);
        }
      }
    };

    for (var i = 0; i < markers.length; i++) loop(i);
  }

  var nextDocId = 0;
  var Doc = function (text, mode, firstLine, lineSep, direction) {
    if (!(this instanceof Doc)) {
      return new Doc(text, mode, firstLine, lineSep, direction);
    }
    if (firstLine == null) {
      firstLine = 0;
    }

    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
    this.first = firstLine;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = false;
    this.cleanGeneration = 1;
    this.frontier = firstLine;
    var start = Pos(firstLine, 0);
    this.sel = simpleSelection(start);
    this.history = new History(null);
    this.id = ++nextDocId;
    this.modeOption = mode;
    this.lineSep = lineSep;
    this.direction = direction == "rtl" ? "rtl" : "ltr";
    this.extend = false;

    if (typeof text == "string") {
      text = this.splitLines(text);
    }
    updateDoc(this, { from: start, to: start, text: text });
    setSelection(this, simpleSelection(start), sel_dontScroll);
  };

  Doc.prototype = createObj(BranchChunk.prototype, {
    constructor: Doc,
    // Iterate over the document. Supports two forms -- with only one
    // argument, it calls that for each line in the document. With
    // three, it iterates over the range given by the first two (with
    // the second being non-inclusive).
    iter: function (from, to, op) {
      if (op) {
        this.iterN(from - this.first, to - from, op);
      } else {
        this.iterN(this.first, this.first + this.size, from);
      }
    },

    // Non-public interface for adding and removing lines.
    insert: function (at, lines) {
      var height = 0;
      for (var i = 0; i < lines.length; ++i) {
        height += lines[i].height;
      }
      this.insertInner(at - this.first, lines, height);
    },
    remove: function (at, n) {
      this.removeInner(at - this.first, n);
    },

    // From here, the methods are part of the public interface. Most
    // are also available from CodeMirror (editor) instances.

    getValue: function (lineSep) {
      var lines = getLines(this, this.first, this.first + this.size);
      if (lineSep === false) {
        return lines;
      }
      return lines.join(lineSep || this.lineSeparator());
    },
    setValue: docMethodOp(function (code) {
      var top = Pos(this.first, 0),
          last = this.first + this.size - 1;
      makeChange(this, { from: top, to: Pos(last, getLine(this, last).text.length),
        text: this.splitLines(code), origin: "setValue", full: true }, true);
      if (this.cm) {
        this.cm.scrollTo(0, 0);
      }
      setSelection(this, simpleSelection(top), sel_dontScroll);
    }),
    replaceRange: function (code, from, to, origin) {
      from = clipPos(this, from);
      to = to ? clipPos(this, to) : from;
      replaceRange(this, code, from, to, origin);
    },
    getRange: function (from, to, lineSep) {
      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
      if (lineSep === false) {
        return lines;
      }
      return lines.join(lineSep || this.lineSeparator());
    },

    getLine: function (line) {
      var l = this.getLineHandle(line);return l && l.text;
    },

    getLineHandle: function (line) {
      if (isLine(this, line)) {
        return getLine(this, line);
      }
    },
    getLineNumber: function (line) {
      return lineNo(line);
    },

    getLineHandleVisualStart: function (line) {
      if (typeof line == "number") {
        line = getLine(this, line);
      }
      return visualLine(line);
    },

    lineCount: function () {
      return this.size;
    },
    firstLine: function () {
      return this.first;
    },
    lastLine: function () {
      return this.first + this.size - 1;
    },

    clipPos: function (pos) {
      return clipPos(this, pos);
    },

    getCursor: function (start) {
      var range$$1 = this.sel.primary(),
          pos;
      if (start == null || start == "head") {
        pos = range$$1.head;
      } else if (start == "anchor") {
        pos = range$$1.anchor;
      } else if (start == "end" || start == "to" || start === false) {
        pos = range$$1.to();
      } else {
        pos = range$$1.from();
      }
      return pos;
    },
    listSelections: function () {
      return this.sel.ranges;
    },
    somethingSelected: function () {
      return this.sel.somethingSelected();
    },

    setCursor: docMethodOp(function (line, ch, options) {
      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
    }),
    setSelection: docMethodOp(function (anchor, head, options) {
      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
    }),
    extendSelection: docMethodOp(function (head, other, options) {
      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
    }),
    extendSelections: docMethodOp(function (heads, options) {
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    extendSelectionsBy: docMethodOp(function (f, options) {
      var heads = map(this.sel.ranges, f);
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    setSelections: docMethodOp(function (ranges, primary, options) {
      var this$1 = this;

      if (!ranges.length) {
        return;
      }
      var out = [];
      for (var i = 0; i < ranges.length; i++) {
        out[i] = new Range(clipPos(this$1, ranges[i].anchor), clipPos(this$1, ranges[i].head));
      }
      if (primary == null) {
        primary = Math.min(ranges.length - 1, this.sel.primIndex);
      }
      setSelection(this, normalizeSelection(out, primary), options);
    }),
    addSelection: docMethodOp(function (anchor, head, options) {
      var ranges = this.sel.ranges.slice(0);
      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
      setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
    }),

    getSelection: function (lineSep) {
      var this$1 = this;

      var ranges = this.sel.ranges,
          lines;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
        lines = lines ? lines.concat(sel) : sel;
      }
      if (lineSep === false) {
        return lines;
      } else {
        return lines.join(lineSep || this.lineSeparator());
      }
    },
    getSelections: function (lineSep) {
      var this$1 = this;

      var parts = [],
          ranges = this.sel.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
        if (lineSep !== false) {
          sel = sel.join(lineSep || this$1.lineSeparator());
        }
        parts[i] = sel;
      }
      return parts;
    },
    replaceSelection: function (code, collapse, origin) {
      var dup = [];
      for (var i = 0; i < this.sel.ranges.length; i++) {
        dup[i] = code;
      }
      this.replaceSelections(dup, collapse, origin || "+input");
    },
    replaceSelections: docMethodOp(function (code, collapse, origin) {
      var this$1 = this;

      var changes = [],
          sel = this.sel;
      for (var i = 0; i < sel.ranges.length; i++) {
        var range$$1 = sel.ranges[i];
        changes[i] = { from: range$$1.from(), to: range$$1.to(), text: this$1.splitLines(code[i]), origin: origin };
      }
      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
      for (var i$1 = changes.length - 1; i$1 >= 0; i$1--) {
        makeChange(this$1, changes[i$1]);
      }
      if (newSel) {
        setSelectionReplaceHistory(this, newSel);
      } else if (this.cm) {
        ensureCursorVisible(this.cm);
      }
    }),
    undo: docMethodOp(function () {
      makeChangeFromHistory(this, "undo");
    }),
    redo: docMethodOp(function () {
      makeChangeFromHistory(this, "redo");
    }),
    undoSelection: docMethodOp(function () {
      makeChangeFromHistory(this, "undo", true);
    }),
    redoSelection: docMethodOp(function () {
      makeChangeFromHistory(this, "redo", true);
    }),

    setExtending: function (val) {
      this.extend = val;
    },
    getExtending: function () {
      return this.extend;
    },

    historySize: function () {
      var hist = this.history,
          done = 0,
          undone = 0;
      for (var i = 0; i < hist.done.length; i++) {
        if (!hist.done[i].ranges) {
          ++done;
        }
      }
      for (var i$1 = 0; i$1 < hist.undone.length; i$1++) {
        if (!hist.undone[i$1].ranges) {
          ++undone;
        }
      }
      return { undo: done, redo: undone };
    },
    clearHistory: function () {
      this.history = new History(this.history.maxGeneration);
    },

    markClean: function () {
      this.cleanGeneration = this.changeGeneration(true);
    },
    changeGeneration: function (forceSplit) {
      if (forceSplit) {
        this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
      }
      return this.history.generation;
    },
    isClean: function (gen) {
      return this.history.generation == (gen || this.cleanGeneration);
    },

    getHistory: function () {
      return { done: copyHistoryArray(this.history.done),
        undone: copyHistoryArray(this.history.undone) };
    },
    setHistory: function (histData) {
      var hist = this.history = new History(this.history.maxGeneration);
      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
    },

    setGutterMarker: docMethodOp(function (line, gutterID, value) {
      return changeLine(this, line, "gutter", function (line) {
        var markers = line.gutterMarkers || (line.gutterMarkers = {});
        markers[gutterID] = value;
        if (!value && isEmpty(markers)) {
          line.gutterMarkers = null;
        }
        return true;
      });
    }),

    clearGutter: docMethodOp(function (gutterID) {
      var this$1 = this;

      this.iter(function (line) {
        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
          changeLine(this$1, line, "gutter", function () {
            line.gutterMarkers[gutterID] = null;
            if (isEmpty(line.gutterMarkers)) {
              line.gutterMarkers = null;
            }
            return true;
          });
        }
      });
    }),

    lineInfo: function (line) {
      var n;
      if (typeof line == "number") {
        if (!isLine(this, line)) {
          return null;
        }
        n = line;
        line = getLine(this, line);
        if (!line) {
          return null;
        }
      } else {
        n = lineNo(line);
        if (n == null) {
          return null;
        }
      }
      return { line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
        textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
        widgets: line.widgets };
    },

    addLineClass: docMethodOp(function (handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        if (!line[prop]) {
          line[prop] = cls;
        } else if (classTest(cls).test(line[prop])) {
          return false;
        } else {
          line[prop] += " " + cls;
        }
        return true;
      });
    }),
    removeLineClass: docMethodOp(function (handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        var cur = line[prop];
        if (!cur) {
          return false;
        } else if (cls == null) {
          line[prop] = null;
        } else {
          var found = cur.match(classTest(cls));
          if (!found) {
            return false;
          }
          var end = found.index + found[0].length;
          line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
        }
        return true;
      });
    }),

    addLineWidget: docMethodOp(function (handle, node, options) {
      return addLineWidget(this, handle, node, options);
    }),
    removeLineWidget: function (widget) {
      widget.clear();
    },

    markText: function (from, to, options) {
      return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
    },
    setBookmark: function (pos, options) {
      var realOpts = { replacedWith: options && (options.nodeType == null ? options.widget : options),
        insertLeft: options && options.insertLeft,
        clearWhenEmpty: false, shared: options && options.shared,
        handleMouseEvents: options && options.handleMouseEvents };
      pos = clipPos(this, pos);
      return markText(this, pos, pos, realOpts, "bookmark");
    },
    findMarksAt: function (pos) {
      pos = clipPos(this, pos);
      var markers = [],
          spans = getLine(this, pos.line).markedSpans;
      if (spans) {
        for (var i = 0; i < spans.length; ++i) {
          var span = spans[i];
          if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
            markers.push(span.marker.parent || span.marker);
          }
        }
      }
      return markers;
    },
    findMarks: function (from, to, filter) {
      from = clipPos(this, from);to = clipPos(this, to);
      var found = [],
          lineNo$$1 = from.line;
      this.iter(from.line, to.line + 1, function (line) {
        var spans = line.markedSpans;
        if (spans) {
          for (var i = 0; i < spans.length; i++) {
            var span = spans[i];
            if (!(span.to != null && lineNo$$1 == from.line && from.ch >= span.to || span.from == null && lineNo$$1 != from.line || span.from != null && lineNo$$1 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
              found.push(span.marker.parent || span.marker);
            }
          }
        }
        ++lineNo$$1;
      });
      return found;
    },
    getAllMarks: function () {
      var markers = [];
      this.iter(function (line) {
        var sps = line.markedSpans;
        if (sps) {
          for (var i = 0; i < sps.length; ++i) {
            if (sps[i].from != null) {
              markers.push(sps[i].marker);
            }
          }
        }
      });
      return markers;
    },

    posFromIndex: function (off) {
      var ch,
          lineNo$$1 = this.first,
          sepSize = this.lineSeparator().length;
      this.iter(function (line) {
        var sz = line.text.length + sepSize;
        if (sz > off) {
          ch = off;return true;
        }
        off -= sz;
        ++lineNo$$1;
      });
      return clipPos(this, Pos(lineNo$$1, ch));
    },
    indexFromPos: function (coords) {
      coords = clipPos(this, coords);
      var index = coords.ch;
      if (coords.line < this.first || coords.ch < 0) {
        return 0;
      }
      var sepSize = this.lineSeparator().length;
      this.iter(this.first, coords.line, function (line) {
        // iter aborts when callback returns a truthy value
        index += line.text.length + sepSize;
      });
      return index;
    },

    copy: function (copyHistory) {
      var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
      doc.scrollTop = this.scrollTop;doc.scrollLeft = this.scrollLeft;
      doc.sel = this.sel;
      doc.extend = false;
      if (copyHistory) {
        doc.history.undoDepth = this.history.undoDepth;
        doc.setHistory(this.getHistory());
      }
      return doc;
    },

    linkedDoc: function (options) {
      if (!options) {
        options = {};
      }
      var from = this.first,
          to = this.first + this.size;
      if (options.from != null && options.from > from) {
        from = options.from;
      }
      if (options.to != null && options.to < to) {
        to = options.to;
      }
      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
      if (options.sharedHist) {
        copy.history = this.history;
      }(this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
      copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
      copySharedMarkers(copy, findSharedMarkers(this));
      return copy;
    },
    unlinkDoc: function (other) {
      var this$1 = this;

      if (other instanceof CodeMirror$1) {
        other = other.doc;
      }
      if (this.linked) {
        for (var i = 0; i < this.linked.length; ++i) {
          var link = this$1.linked[i];
          if (link.doc != other) {
            continue;
          }
          this$1.linked.splice(i, 1);
          other.unlinkDoc(this$1);
          detachSharedMarkers(findSharedMarkers(this$1));
          break;
        }
      }
      // If the histories were shared, split them again
      if (other.history == this.history) {
        var splitIds = [other.id];
        linkedDocs(other, function (doc) {
          return splitIds.push(doc.id);
        }, true);
        other.history = new History(null);
        other.history.done = copyHistoryArray(this.history.done, splitIds);
        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
      }
    },
    iterLinkedDocs: function (f) {
      linkedDocs(this, f);
    },

    getMode: function () {
      return this.mode;
    },
    getEditor: function () {
      return this.cm;
    },

    splitLines: function (str) {
      if (this.lineSep) {
        return str.split(this.lineSep);
      }
      return splitLinesAuto(str);
    },
    lineSeparator: function () {
      return this.lineSep || "\n";
    },

    setDirection: docMethodOp(function (dir) {
      if (dir != "rtl") {
        dir = "ltr";
      }
      if (dir == this.direction) {
        return;
      }
      this.direction = dir;
      this.iter(function (line) {
        return line.order = null;
      });
      if (this.cm) {
        directionChanged(this.cm);
      }
    })
  });

  // Public alias.
  Doc.prototype.eachLine = Doc.prototype.iter;

  // Kludge to work around strange IE behavior where it'll sometimes
  // re-fire a series of drag-related events right after the drop (#1551)
  var lastDrop = 0;

  function onDrop(e) {
    var cm = this;
    clearDragCursor(cm);
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
      return;
    }
    e_preventDefault(e);
    if (ie) {
      lastDrop = +new Date();
    }
    var pos = posFromMouse(cm, e, true),
        files = e.dataTransfer.files;
    if (!pos || cm.isReadOnly()) {
      return;
    }
    // Might be a file drop, in which case we simply extract the text
    // and insert it.
    if (files && files.length && window.FileReader && window.File) {
      var n = files.length,
          text = Array(n),
          read = 0;
      var loadFile = function (file, i) {
        if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
          return;
        }

        var reader = new FileReader();
        reader.onload = operation(cm, function () {
          var content = reader.result;
          if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
            content = "";
          }
          text[i] = content;
          if (++read == n) {
            pos = clipPos(cm.doc, pos);
            var change = { from: pos, to: pos,
              text: cm.doc.splitLines(text.join(cm.doc.lineSeparator())),
              origin: "paste" };
            makeChange(cm.doc, change);
            setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
          }
        });
        reader.readAsText(file);
      };
      for (var i = 0; i < n; ++i) {
        loadFile(files[i], i);
      }
    } else {
      // Normal drop
      // Don't do a replace if the drop happened inside of the selected text.
      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
        cm.state.draggingText(e);
        // Ensure the editor is re-focused
        setTimeout(function () {
          return cm.display.input.focus();
        }, 20);
        return;
      }
      try {
        var text$1 = e.dataTransfer.getData("Text");
        if (text$1) {
          var selected;
          if (cm.state.draggingText && !cm.state.draggingText.copy) {
            selected = cm.listSelections();
          }
          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
          if (selected) {
            for (var i$1 = 0; i$1 < selected.length; ++i$1) {
              replaceRange(cm.doc, "", selected[i$1].anchor, selected[i$1].head, "drag");
            }
          }
          cm.replaceSelection(text$1, "around", "paste");
          cm.display.input.focus();
        }
      } catch (e) {}
    }
  }

  function onDragStart(cm, e) {
    if (ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) {
      e_stop(e);return;
    }
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
      return;
    }

    e.dataTransfer.setData("Text", cm.getSelection());
    e.dataTransfer.effectAllowed = "copyMove";

    // Use dummy image instead of default browsers image.
    // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
    if (e.dataTransfer.setDragImage && !safari) {
      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (presto) {
        img.width = img.height = 1;
        cm.display.wrapper.appendChild(img);
        // Force a relayout, or Opera won't use our image for some obscure reason
        img._top = img.offsetTop;
      }
      e.dataTransfer.setDragImage(img, 0, 0);
      if (presto) {
        img.parentNode.removeChild(img);
      }
    }
  }

  function onDragOver(cm, e) {
    var pos = posFromMouse(cm, e);
    if (!pos) {
      return;
    }
    var frag = document.createDocumentFragment();
    drawSelectionCursor(cm, pos, frag);
    if (!cm.display.dragCursor) {
      cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
      cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
    }
    removeChildrenAndAdd(cm.display.dragCursor, frag);
  }

  function clearDragCursor(cm) {
    if (cm.display.dragCursor) {
      cm.display.lineSpace.removeChild(cm.display.dragCursor);
      cm.display.dragCursor = null;
    }
  }

  // These must be handled carefully, because naively registering a
  // handler for each editor will cause the editors to never be
  // garbage collected.

  function forEachCodeMirror(f) {
    if (!document.body.getElementsByClassName) {
      return;
    }
    var byClass = document.body.getElementsByClassName("CodeMirror");
    for (var i = 0; i < byClass.length; i++) {
      var cm = byClass[i].CodeMirror;
      if (cm) {
        f(cm);
      }
    }
  }

  var globalsRegistered = false;
  function ensureGlobalHandlers() {
    if (globalsRegistered) {
      return;
    }
    registerGlobalHandlers();
    globalsRegistered = true;
  }
  function registerGlobalHandlers() {
    // When the window resizes, we need to refresh active editors.
    var resizeTimer;
    on(window, "resize", function () {
      if (resizeTimer == null) {
        resizeTimer = setTimeout(function () {
          resizeTimer = null;
          forEachCodeMirror(onResize);
        }, 100);
      }
    });
    // When the window loses focus, we want to show the editor as blurred
    on(window, "blur", function () {
      return forEachCodeMirror(onBlur);
    });
  }
  // Called when the window resizes
  function onResize(cm) {
    var d = cm.display;
    if (d.lastWrapHeight == d.wrapper.clientHeight && d.lastWrapWidth == d.wrapper.clientWidth) {
      return;
    }
    // Might be a text scaling operation, clear size caches.
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.scrollbarsClipped = false;
    cm.setSize();
  }

  var keyNames = {
    3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
    19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
    36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
    46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod",
    106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 127: "Delete",
    173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
    221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
    63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"
  };

  // Number keys
  for (var i = 0; i < 10; i++) {
    keyNames[i + 48] = keyNames[i + 96] = String(i);
  }
  // Alphabetic keys
  for (var i$1 = 65; i$1 <= 90; i$1++) {
    keyNames[i$1] = String.fromCharCode(i$1);
  }
  // Function keys
  for (var i$2 = 1; i$2 <= 12; i$2++) {
    keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2;
  }

  var keyMap = {};

  keyMap.basic = {
    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
    "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
    "Tab": "defaultTab", "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
    "Esc": "singleSelection"
  };
  // Note that the save and find-related commands aren't defined by
  // default. User code or addons can define them. Unknown commands
  // are simply ignored.
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown",
    "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
    fallthrough: "basic"
  };
  // Very basic readline/emacs-style bindings, which are standard on Mac.
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
    "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars",
    "Ctrl-O": "openLine"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
    "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight",
    "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd",
    fallthrough: ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;

  // KEYMAP DISPATCH

  function normalizeKeyName(name) {
    var parts = name.split(/-(?!$)/);
    name = parts[parts.length - 1];
    var alt, ctrl, shift, cmd;
    for (var i = 0; i < parts.length - 1; i++) {
      var mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod)) {
        cmd = true;
      } else if (/^a(lt)?$/i.test(mod)) {
        alt = true;
      } else if (/^(c|ctrl|control)$/i.test(mod)) {
        ctrl = true;
      } else if (/^s(hift)?$/i.test(mod)) {
        shift = true;
      } else {
        throw new Error("Unrecognized modifier name: " + mod);
      }
    }
    if (alt) {
      name = "Alt-" + name;
    }
    if (ctrl) {
      name = "Ctrl-" + name;
    }
    if (cmd) {
      name = "Cmd-" + name;
    }
    if (shift) {
      name = "Shift-" + name;
    }
    return name;
  }

  // This is a kludge to keep keymaps mostly working as raw objects
  // (backwards compatibility) while at the same time support features
  // like normalization and multi-stroke key bindings. It compiles a
  // new normalized keymap, and then updates the old object to reflect
  // this.
  function normalizeKeyMap(keymap) {
    var copy = {};
    for (var keyname in keymap) {
      if (keymap.hasOwnProperty(keyname)) {
        var value = keymap[keyname];
        if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
          continue;
        }
        if (value == "...") {
          delete keymap[keyname];continue;
        }

        var keys = map(keyname.split(" "), normalizeKeyName);
        for (var i = 0; i < keys.length; i++) {
          var val = void 0,
              name = void 0;
          if (i == keys.length - 1) {
            name = keys.join(" ");
            val = value;
          } else {
            name = keys.slice(0, i + 1).join(" ");
            val = "...";
          }
          var prev = copy[name];
          if (!prev) {
            copy[name] = val;
          } else if (prev != val) {
            throw new Error("Inconsistent bindings for " + name);
          }
        }
        delete keymap[keyname];
      }
    }
    for (var prop in copy) {
      keymap[prop] = copy[prop];
    }
    return keymap;
  }

  function lookupKey(key, map$$1, handle, context) {
    map$$1 = getKeyMap(map$$1);
    var found = map$$1.call ? map$$1.call(key, context) : map$$1[key];
    if (found === false) {
      return "nothing";
    }
    if (found === "...") {
      return "multi";
    }
    if (found != null && handle(found)) {
      return "handled";
    }

    if (map$$1.fallthrough) {
      if (Object.prototype.toString.call(map$$1.fallthrough) != "[object Array]") {
        return lookupKey(key, map$$1.fallthrough, handle, context);
      }
      for (var i = 0; i < map$$1.fallthrough.length; i++) {
        var result = lookupKey(key, map$$1.fallthrough[i], handle, context);
        if (result) {
          return result;
        }
      }
    }
  }

  // Modifier key presses don't count as 'real' key presses for the
  // purpose of keymap fallthrough.
  function isModifierKey(value) {
    var name = typeof value == "string" ? value : keyNames[value.keyCode];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  }

  // Look up the name of a key as indicated by an event object.
  function keyName(event, noShift) {
    if (presto && event.keyCode == 34 && event["char"]) {
      return false;
    }
    var base = keyNames[event.keyCode],
        name = base;
    if (name == null || event.altGraphKey) {
      return false;
    }
    if (event.altKey && base != "Alt") {
      name = "Alt-" + name;
    }
    if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
      name = "Ctrl-" + name;
    }
    if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Cmd") {
      name = "Cmd-" + name;
    }
    if (!noShift && event.shiftKey && base != "Shift") {
      name = "Shift-" + name;
    }
    return name;
  }

  function getKeyMap(val) {
    return typeof val == "string" ? keyMap[val] : val;
  }

  // Helper for deleting text near the selection(s), used to implement
  // backspace, delete, and similar functionality.
  function deleteNearSelection(cm, compute) {
    var ranges = cm.doc.sel.ranges,
        kill = [];
    // Build up a set of ranges to kill first, merging overlapping
    // ranges.
    for (var i = 0; i < ranges.length; i++) {
      var toKill = compute(ranges[i]);
      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
        var replaced = kill.pop();
        if (cmp(replaced.from, toKill.from) < 0) {
          toKill.from = replaced.from;
          break;
        }
      }
      kill.push(toKill);
    }
    // Next, remove those actual ranges.
    runInOp(cm, function () {
      for (var i = kill.length - 1; i >= 0; i--) {
        replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
      }
      ensureCursorVisible(cm);
    });
  }

  // Commands are parameter-less actions that can be performed on an
  // editor, mostly used for keybindings.
  var commands = {
    selectAll: selectAll,
    singleSelection: function (cm) {
      return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
    },
    killLine: function (cm) {
      return deleteNearSelection(cm, function (range) {
        if (range.empty()) {
          var len = getLine(cm.doc, range.head.line).text.length;
          if (range.head.ch == len && range.head.line < cm.lastLine()) {
            return { from: range.head, to: Pos(range.head.line + 1, 0) };
          } else {
            return { from: range.head, to: Pos(range.head.line, len) };
          }
        } else {
          return { from: range.from(), to: range.to() };
        }
      });
    },
    deleteLine: function (cm) {
      return deleteNearSelection(cm, function (range) {
        return {
          from: Pos(range.from().line, 0),
          to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
        };
      });
    },
    delLineLeft: function (cm) {
      return deleteNearSelection(cm, function (range) {
        return {
          from: Pos(range.from().line, 0), to: range.from()
        };
      });
    },
    delWrappedLineLeft: function (cm) {
      return deleteNearSelection(cm, function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var leftPos = cm.coordsChar({ left: 0, top: top }, "div");
        return { from: leftPos, to: range.from() };
      });
    },
    delWrappedLineRight: function (cm) {
      return deleteNearSelection(cm, function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var rightPos = cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top: top }, "div");
        return { from: range.from(), to: rightPos };
      });
    },
    undo: function (cm) {
      return cm.undo();
    },
    redo: function (cm) {
      return cm.redo();
    },
    undoSelection: function (cm) {
      return cm.undoSelection();
    },
    redoSelection: function (cm) {
      return cm.redoSelection();
    },
    goDocStart: function (cm) {
      return cm.extendSelection(Pos(cm.firstLine(), 0));
    },
    goDocEnd: function (cm) {
      return cm.extendSelection(Pos(cm.lastLine()));
    },
    goLineStart: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        return lineStart(cm, range.head.line);
      }, { origin: "+move", bias: 1 });
    },
    goLineStartSmart: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        return lineStartSmart(cm, range.head);
      }, { origin: "+move", bias: 1 });
    },
    goLineEnd: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        return lineEnd(cm, range.head.line);
      }, { origin: "+move", bias: -1 });
    },
    goLineRight: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top: top }, "div");
      }, sel_move);
    },
    goLineLeft: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({ left: 0, top: top }, "div");
      }, sel_move);
    },
    goLineLeftSmart: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var pos = cm.coordsChar({ left: 0, top: top }, "div");
        if (pos.ch < cm.getLine(pos.line).search(/\S/)) {
          return lineStartSmart(cm, range.head);
        }
        return pos;
      }, sel_move);
    },
    goLineUp: function (cm) {
      return cm.moveV(-1, "line");
    },
    goLineDown: function (cm) {
      return cm.moveV(1, "line");
    },
    goPageUp: function (cm) {
      return cm.moveV(-1, "page");
    },
    goPageDown: function (cm) {
      return cm.moveV(1, "page");
    },
    goCharLeft: function (cm) {
      return cm.moveH(-1, "char");
    },
    goCharRight: function (cm) {
      return cm.moveH(1, "char");
    },
    goColumnLeft: function (cm) {
      return cm.moveH(-1, "column");
    },
    goColumnRight: function (cm) {
      return cm.moveH(1, "column");
    },
    goWordLeft: function (cm) {
      return cm.moveH(-1, "word");
    },
    goGroupRight: function (cm) {
      return cm.moveH(1, "group");
    },
    goGroupLeft: function (cm) {
      return cm.moveH(-1, "group");
    },
    goWordRight: function (cm) {
      return cm.moveH(1, "word");
    },
    delCharBefore: function (cm) {
      return cm.deleteH(-1, "char");
    },
    delCharAfter: function (cm) {
      return cm.deleteH(1, "char");
    },
    delWordBefore: function (cm) {
      return cm.deleteH(-1, "word");
    },
    delWordAfter: function (cm) {
      return cm.deleteH(1, "word");
    },
    delGroupBefore: function (cm) {
      return cm.deleteH(-1, "group");
    },
    delGroupAfter: function (cm) {
      return cm.deleteH(1, "group");
    },
    indentAuto: function (cm) {
      return cm.indentSelection("smart");
    },
    indentMore: function (cm) {
      return cm.indentSelection("add");
    },
    indentLess: function (cm) {
      return cm.indentSelection("subtract");
    },
    insertTab: function (cm) {
      return cm.replaceSelection("\t");
    },
    insertSoftTab: function (cm) {
      var spaces = [],
          ranges = cm.listSelections(),
          tabSize = cm.options.tabSize;
      for (var i = 0; i < ranges.length; i++) {
        var pos = ranges[i].from();
        var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
        spaces.push(spaceStr(tabSize - col % tabSize));
      }
      cm.replaceSelections(spaces);
    },
    defaultTab: function (cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection("add");
      } else {
        cm.execCommand("insertTab");
      }
    },
    // Swap the two chars left and right of each selection's head.
    // Move cursor behind the two swapped characters afterwards.
    //
    // Doesn't consider line feeds a character.
    // Doesn't scan more than one line above to find a character.
    // Doesn't do anything on an empty line.
    // Doesn't do anything with non-empty selections.
    transposeChars: function (cm) {
      return runInOp(cm, function () {
        var ranges = cm.listSelections(),
            newSel = [];
        for (var i = 0; i < ranges.length; i++) {
          if (!ranges[i].empty()) {
            continue;
          }
          var cur = ranges[i].head,
              line = getLine(cm.doc, cur.line).text;
          if (line) {
            if (cur.ch == line.length) {
              cur = new Pos(cur.line, cur.ch - 1);
            }
            if (cur.ch > 0) {
              cur = new Pos(cur.line, cur.ch + 1);
              cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), Pos(cur.line, cur.ch - 2), cur, "+transpose");
            } else if (cur.line > cm.doc.first) {
              var prev = getLine(cm.doc, cur.line - 1).text;
              if (prev) {
                cur = new Pos(cur.line, 1);
                cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1), Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
              }
            }
          }
          newSel.push(new Range(cur, cur));
        }
        cm.setSelections(newSel);
      });
    },
    newlineAndIndent: function (cm) {
      return runInOp(cm, function () {
        var sels = cm.listSelections();
        for (var i = sels.length - 1; i >= 0; i--) {
          cm.replaceRange(cm.doc.lineSeparator(), sels[i].anchor, sels[i].head, "+input");
        }
        sels = cm.listSelections();
        for (var i$1 = 0; i$1 < sels.length; i$1++) {
          cm.indentLine(sels[i$1].from().line, null, true);
        }
        ensureCursorVisible(cm);
      });
    },
    openLine: function (cm) {
      return cm.replaceSelection("\n", "start");
    },
    toggleOverwrite: function (cm) {
      return cm.toggleOverwrite();
    }
  };

  function lineStart(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLine(line);
    if (visual != line) {
      lineN = lineNo(visual);
    }
    return endOfLine(true, cm, visual, lineN, 1);
  }
  function lineEnd(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLineEnd(line);
    if (visual != line) {
      lineN = lineNo(visual);
    }
    return endOfLine(true, cm, line, lineN, -1);
  }
  function lineStartSmart(cm, pos) {
    var start = lineStart(cm, pos.line);
    var line = getLine(cm.doc, start.line);
    var order = getOrder(line, cm.doc.direction);
    if (!order || order[0].level == 0) {
      var firstNonWS = Math.max(0, line.text.search(/\S/));
      var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
      return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
    }
    return start;
  }

  // Run a handler that was bound to a key.
  function doHandleBinding(cm, bound, dropShift) {
    if (typeof bound == "string") {
      bound = commands[bound];
      if (!bound) {
        return false;
      }
    }
    // Ensure previous input has been read, so that the handler sees a
    // consistent view of the document
    cm.display.input.ensurePolled();
    var prevShift = cm.display.shift,
        done = false;
    try {
      if (cm.isReadOnly()) {
        cm.state.suppressEdits = true;
      }
      if (dropShift) {
        cm.display.shift = false;
      }
      done = bound(cm) != Pass;
    } finally {
      cm.display.shift = prevShift;
      cm.state.suppressEdits = false;
    }
    return done;
  }

  function lookupKeyForEditor(cm, name, handle) {
    for (var i = 0; i < cm.state.keyMaps.length; i++) {
      var result = lookupKey(name, cm.state.keyMaps[i], handle, cm);
      if (result) {
        return result;
      }
    }
    return cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm) || lookupKey(name, cm.options.keyMap, handle, cm);
  }

  var stopSeq = new Delayed();
  function dispatchKey(cm, name, e, handle) {
    var seq = cm.state.keySeq;
    if (seq) {
      if (isModifierKey(name)) {
        return "handled";
      }
      stopSeq.set(50, function () {
        if (cm.state.keySeq == seq) {
          cm.state.keySeq = null;
          cm.display.input.reset();
        }
      });
      name = seq + " " + name;
    }
    var result = lookupKeyForEditor(cm, name, handle);

    if (result == "multi") {
      cm.state.keySeq = name;
    }
    if (result == "handled") {
      signalLater(cm, "keyHandled", cm, name, e);
    }

    if (result == "handled" || result == "multi") {
      e_preventDefault(e);
      restartBlink(cm);
    }

    if (seq && !result && /\'$/.test(name)) {
      e_preventDefault(e);
      return true;
    }
    return !!result;
  }

  // Handle a key from the keydown event.
  function handleKeyBinding(cm, e) {
    var name = keyName(e, true);
    if (!name) {
      return false;
    }

    if (e.shiftKey && !cm.state.keySeq) {
      // First try to resolve full name (including 'Shift-'). Failing
      // that, see if there is a cursor-motion command (starting with
      // 'go') bound to the keyname without 'Shift-'.
      return dispatchKey(cm, "Shift-" + name, e, function (b) {
        return doHandleBinding(cm, b, true);
      }) || dispatchKey(cm, name, e, function (b) {
        if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) {
          return doHandleBinding(cm, b);
        }
      });
    } else {
      return dispatchKey(cm, name, e, function (b) {
        return doHandleBinding(cm, b);
      });
    }
  }

  // Handle a key from the keypress event
  function handleCharBinding(cm, e, ch) {
    return dispatchKey(cm, "'" + ch + "'", e, function (b) {
      return doHandleBinding(cm, b, true);
    });
  }

  var lastStoppedKey = null;
  function onKeyDown(e) {
    var cm = this;
    cm.curOp.focus = activeElt();
    if (signalDOMEvent(cm, e)) {
      return;
    }
    // IE does strange things with escape.
    if (ie && ie_version < 11 && e.keyCode == 27) {
      e.returnValue = false;
    }
    var code = e.keyCode;
    cm.display.shift = code == 16 || e.shiftKey;
    var handled = handleKeyBinding(cm, e);
    if (presto) {
      lastStoppedKey = handled ? code : null;
      // Opera has no cut event... we try to at least catch the key combo
      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) {
        cm.replaceSelection("", null, "cut");
      }
    }

    // Turn mouse into crosshair when Alt is held on Mac.
    if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) {
      showCrossHair(cm);
    }
  }

  function showCrossHair(cm) {
    var lineDiv = cm.display.lineDiv;
    addClass(lineDiv, "CodeMirror-crosshair");

    function up(e) {
      if (e.keyCode == 18 || !e.altKey) {
        rmClass(lineDiv, "CodeMirror-crosshair");
        off(document, "keyup", up);
        off(document, "mouseover", up);
      }
    }
    on(document, "keyup", up);
    on(document, "mouseover", up);
  }

  function onKeyUp(e) {
    if (e.keyCode == 16) {
      this.doc.sel.shift = false;
    }
    signalDOMEvent(this, e);
  }

  function onKeyPress(e) {
    var cm = this;
    if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) {
      return;
    }
    var keyCode = e.keyCode,
        charCode = e.charCode;
    if (presto && keyCode == lastStoppedKey) {
      lastStoppedKey = null;e_preventDefault(e);return;
    }
    if (presto && (!e.which || e.which < 10) && handleKeyBinding(cm, e)) {
      return;
    }
    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
    // Some browsers fire keypress events for backspace
    if (ch == "\x08") {
      return;
    }
    if (handleCharBinding(cm, e, ch)) {
      return;
    }
    cm.display.input.onKeyPress(e);
  }

  // A mouse down can be a single click, double click, triple click,
  // start of selection drag, start of text drag, new cursor
  // (ctrl-click), rectangle drag (alt-drag), or xwin
  // middle-click-paste. Or it might be a click on something we should
  // not interfere with, such as a scrollbar or widget.
  function onMouseDown(e) {
    var cm = this,
        display = cm.display;
    if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) {
      return;
    }
    display.input.ensurePolled();
    display.shift = e.shiftKey;

    if (eventInWidget(display, e)) {
      if (!webkit) {
        // Briefly turn off draggability, to allow widgets to do
        // normal dragging things.
        display.scroller.draggable = false;
        setTimeout(function () {
          return display.scroller.draggable = true;
        }, 100);
      }
      return;
    }
    if (clickInGutter(cm, e)) {
      return;
    }
    var start = posFromMouse(cm, e);
    window.focus();

    switch (e_button(e)) {
      case 1:
        // #3261: make sure, that we're not starting a second selection
        if (cm.state.selectingText) {
          cm.state.selectingText(e);
        } else if (start) {
          leftButtonDown(cm, e, start);
        } else if (e_target(e) == display.scroller) {
          e_preventDefault(e);
        }
        break;
      case 2:
        if (webkit) {
          cm.state.lastMiddleDown = +new Date();
        }
        if (start) {
          extendSelection(cm.doc, start);
        }
        setTimeout(function () {
          return display.input.focus();
        }, 20);
        e_preventDefault(e);
        break;
      case 3:
        if (captureRightClick) {
          onContextMenu(cm, e);
        } else {
          delayBlurEvent(cm);
        }
        break;
    }
  }

  var lastClick;
  var lastDoubleClick;
  function leftButtonDown(cm, e, start) {
    if (ie) {
      setTimeout(bind(ensureFocus, cm), 0);
    } else {
      cm.curOp.focus = activeElt();
    }

    var now = +new Date(),
        type;
    if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
      type = "triple";
    } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
      type = "double";
      lastDoubleClick = { time: now, pos: start };
    } else {
      type = "single";
      lastClick = { time: now, pos: start };
    }

    var sel = cm.doc.sel,
        modifier = mac ? e.metaKey : e.ctrlKey,
        contained;
    if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() && type == "single" && (contained = sel.contains(start)) > -1 && (cmp((contained = sel.ranges[contained]).from(), start) < 0 || start.xRel > 0) && (cmp(contained.to(), start) > 0 || start.xRel < 0)) {
      leftButtonStartDrag(cm, e, start, modifier);
    } else {
      leftButtonSelect(cm, e, start, type, modifier);
    }
  }

  // Start a text drag. When it ends, see if any dragging actually
  // happen, and treat as a click if it didn't.
  function leftButtonStartDrag(cm, e, start, modifier) {
    var display = cm.display,
        moved = false;
    var dragEnd = operation(cm, function (e) {
      if (webkit) {
        display.scroller.draggable = false;
      }
      cm.state.draggingText = false;
      off(document, "mouseup", dragEnd);
      off(document, "mousemove", mouseMove);
      off(display.scroller, "dragstart", dragStart);
      off(display.scroller, "drop", dragEnd);
      if (!moved) {
        e_preventDefault(e);
        if (!modifier) {
          extendSelection(cm.doc, start);
        }
        // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
        if (webkit || ie && ie_version == 9) {
          setTimeout(function () {
            document.body.focus();display.input.focus();
          }, 20);
        } else {
          display.input.focus();
        }
      }
    });
    var mouseMove = function (e2) {
      moved = moved || Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) >= 10;
    };
    var dragStart = function () {
      return moved = true;
    };
    // Let the drag handler handle this.
    if (webkit) {
      display.scroller.draggable = true;
    }
    cm.state.draggingText = dragEnd;
    dragEnd.copy = mac ? e.altKey : e.ctrlKey;
    // IE's approach to draggable
    if (display.scroller.dragDrop) {
      display.scroller.dragDrop();
    }
    on(document, "mouseup", dragEnd);
    on(document, "mousemove", mouseMove);
    on(display.scroller, "dragstart", dragStart);
    on(display.scroller, "drop", dragEnd);

    delayBlurEvent(cm);
    setTimeout(function () {
      return display.input.focus();
    }, 20);
  }

  // Normal selection, as opposed to text dragging.
  function leftButtonSelect(cm, e, start, type, addNew) {
    var display = cm.display,
        doc = cm.doc;
    e_preventDefault(e);

    var ourRange,
        ourIndex,
        startSel = doc.sel,
        ranges = startSel.ranges;
    if (addNew && !e.shiftKey) {
      ourIndex = doc.sel.contains(start);
      if (ourIndex > -1) {
        ourRange = ranges[ourIndex];
      } else {
        ourRange = new Range(start, start);
      }
    } else {
      ourRange = doc.sel.primary();
      ourIndex = doc.sel.primIndex;
    }

    if (chromeOS ? e.shiftKey && e.metaKey : e.altKey) {
      type = "rect";
      if (!addNew) {
        ourRange = new Range(start, start);
      }
      start = posFromMouse(cm, e, true, true);
      ourIndex = -1;
    } else if (type == "double") {
      var word = cm.findWordAt(start);
      if (cm.display.shift || doc.extend) {
        ourRange = extendRange(doc, ourRange, word.anchor, word.head);
      } else {
        ourRange = word;
      }
    } else if (type == "triple") {
      var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
      if (cm.display.shift || doc.extend) {
        ourRange = extendRange(doc, ourRange, line.anchor, line.head);
      } else {
        ourRange = line;
      }
    } else {
      ourRange = extendRange(doc, ourRange, start);
    }

    if (!addNew) {
      ourIndex = 0;
      setSelection(doc, new Selection([ourRange], 0), sel_mouse);
      startSel = doc.sel;
    } else if (ourIndex == -1) {
      ourIndex = ranges.length;
      setSelection(doc, normalizeSelection(ranges.concat([ourRange]), ourIndex), { scroll: false, origin: "*mouse" });
    } else if (ranges.length > 1 && ranges[ourIndex].empty() && type == "single" && !e.shiftKey) {
      setSelection(doc, normalizeSelection(ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0), { scroll: false, origin: "*mouse" });
      startSel = doc.sel;
    } else {
      replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
    }

    var lastPos = start;
    function extendTo(pos) {
      if (cmp(lastPos, pos) == 0) {
        return;
      }
      lastPos = pos;

      if (type == "rect") {
        var ranges = [],
            tabSize = cm.options.tabSize;
        var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
        var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
        var left = Math.min(startCol, posCol),
            right = Math.max(startCol, posCol);
        for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
          var text = getLine(doc, line).text,
              leftPos = findColumn(text, left, tabSize);
          if (left == right) {
            ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
          } else if (text.length > leftPos) {
            ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
          }
        }
        if (!ranges.length) {
          ranges.push(new Range(start, start));
        }
        setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex), { origin: "*mouse", scroll: false });
        cm.scrollIntoView(pos);
      } else {
        var oldRange = ourRange;
        var anchor = oldRange.anchor,
            head = pos;
        if (type != "single") {
          var range$$1;
          if (type == "double") {
            range$$1 = cm.findWordAt(pos);
          } else {
            range$$1 = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
          }
          if (cmp(range$$1.anchor, anchor) > 0) {
            head = range$$1.head;
            anchor = minPos(oldRange.from(), range$$1.anchor);
          } else {
            head = range$$1.anchor;
            anchor = maxPos(oldRange.to(), range$$1.head);
          }
        }
        var ranges$1 = startSel.ranges.slice(0);
        ranges$1[ourIndex] = new Range(clipPos(doc, anchor), head);
        setSelection(doc, normalizeSelection(ranges$1, ourIndex), sel_mouse);
      }
    }

    var editorSize = display.wrapper.getBoundingClientRect();
    // Used to ensure timeout re-tries don't fire when another extend
    // happened in the meantime (clearTimeout isn't reliable -- at
    // least on Chrome, the timeouts still happen even when cleared,
    // if the clear happens after their scheduled firing time).
    var counter = 0;

    function extend(e) {
      var curCount = ++counter;
      var cur = posFromMouse(cm, e, true, type == "rect");
      if (!cur) {
        return;
      }
      if (cmp(cur, lastPos) != 0) {
        cm.curOp.focus = activeElt();
        extendTo(cur);
        var visible = visibleLines(display, doc);
        if (cur.line >= visible.to || cur.line < visible.from) {
          setTimeout(operation(cm, function () {
            if (counter == curCount) {
              extend(e);
            }
          }), 150);
        }
      } else {
        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
        if (outside) {
          setTimeout(operation(cm, function () {
            if (counter != curCount) {
              return;
            }
            display.scroller.scrollTop += outside;
            extend(e);
          }), 50);
        }
      }
    }

    function done(e) {
      cm.state.selectingText = false;
      counter = Infinity;
      e_preventDefault(e);
      display.input.focus();
      off(document, "mousemove", move);
      off(document, "mouseup", up);
      doc.history.lastSelOrigin = null;
    }

    var move = operation(cm, function (e) {
      if (!e_button(e)) {
        done(e);
      } else {
        extend(e);
      }
    });
    var up = operation(cm, done);
    cm.state.selectingText = up;
    on(document, "mousemove", move);
    on(document, "mouseup", up);
  }

  // Determines whether an event happened in the gutter, and fires the
  // handlers for the corresponding event.
  function gutterEvent(cm, e, type, prevent) {
    var mX, mY;
    try {
      mX = e.clientX;mY = e.clientY;
    } catch (e) {
      return false;
    }
    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) {
      return false;
    }
    if (prevent) {
      e_preventDefault(e);
    }

    var display = cm.display;
    var lineBox = display.lineDiv.getBoundingClientRect();

    if (mY > lineBox.bottom || !hasHandler(cm, type)) {
      return e_defaultPrevented(e);
    }
    mY -= lineBox.top - display.viewOffset;

    for (var i = 0; i < cm.options.gutters.length; ++i) {
      var g = display.gutters.childNodes[i];
      if (g && g.getBoundingClientRect().right >= mX) {
        var line = lineAtHeight(cm.doc, mY);
        var gutter = cm.options.gutters[i];
        signal(cm, type, cm, line, gutter, e);
        return e_defaultPrevented(e);
      }
    }
  }

  function clickInGutter(cm, e) {
    return gutterEvent(cm, e, "gutterClick", true);
  }

  // CONTEXT MENU HANDLING

  // To make the context menu work, we need to briefly unhide the
  // textarea (making it as unobtrusive as possible) to let the
  // right-click take effect on it.
  function onContextMenu(cm, e) {
    if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) {
      return;
    }
    if (signalDOMEvent(cm, e, "contextmenu")) {
      return;
    }
    cm.display.input.onContextMenu(e);
  }

  function contextMenuInGutter(cm, e) {
    if (!hasHandler(cm, "gutterContextMenu")) {
      return false;
    }
    return gutterEvent(cm, e, "gutterContextMenu", false);
  }

  function themeChanged(cm) {
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    clearCaches(cm);
  }

  var Init = { toString: function () {
      return "CodeMirror.Init";
    } };

  var defaults = {};
  var optionHandlers = {};

  function defineOptions(CodeMirror) {
    var optionHandlers = CodeMirror.optionHandlers;

    function option(name, deflt, handle, notOnInit) {
      CodeMirror.defaults[name] = deflt;
      if (handle) {
        optionHandlers[name] = notOnInit ? function (cm, val, old) {
          if (old != Init) {
            handle(cm, val, old);
          }
        } : handle;
      }
    }

    CodeMirror.defineOption = option;

    // Passed to option handlers when there is no old value.
    CodeMirror.Init = Init;

    // These two are, on init, called from the constructor because they
    // have to be initialized before the editor can start at all.
    option("value", "", function (cm, val) {
      return cm.setValue(val);
    }, true);
    option("mode", null, function (cm, val) {
      cm.doc.modeOption = val;
      loadMode(cm);
    }, true);

    option("indentUnit", 2, loadMode, true);
    option("indentWithTabs", false);
    option("smartIndent", true);
    option("tabSize", 4, function (cm) {
      resetModeState(cm);
      clearCaches(cm);
      regChange(cm);
    }, true);
    option("lineSeparator", null, function (cm, val) {
      cm.doc.lineSep = val;
      if (!val) {
        return;
      }
      var newBreaks = [],
          lineNo = cm.doc.first;
      cm.doc.iter(function (line) {
        for (var pos = 0;;) {
          var found = line.text.indexOf(val, pos);
          if (found == -1) {
            break;
          }
          pos = found + val.length;
          newBreaks.push(Pos(lineNo, found));
        }
        lineNo++;
      });
      for (var i = newBreaks.length - 1; i >= 0; i--) {
        replaceRange(cm.doc, val, newBreaks[i], Pos(newBreaks[i].line, newBreaks[i].ch + val.length));
      }
    });
    option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (cm, val, old) {
      cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
      if (old != Init) {
        cm.refresh();
      }
    });
    option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function (cm) {
      return cm.refresh();
    }, true);
    option("electricChars", true);
    option("inputStyle", mobile ? "contenteditable" : "textarea", function () {
      throw new Error("inputStyle can not (yet) be changed in a running editor"); // FIXME
    }, true);
    option("spellcheck", false, function (cm, val) {
      return cm.getInputField().spellcheck = val;
    }, true);
    option("rtlMoveVisually", !windows);
    option("wholeLineUpdateBefore", true);

    option("theme", "default", function (cm) {
      themeChanged(cm);
      guttersChanged(cm);
    }, true);
    option("keyMap", "default", function (cm, val, old) {
      var next = getKeyMap(val);
      var prev = old != Init && getKeyMap(old);
      if (prev && prev.detach) {
        prev.detach(cm, next);
      }
      if (next.attach) {
        next.attach(cm, prev || null);
      }
    });
    option("extraKeys", null);

    option("lineWrapping", false, wrappingChanged, true);
    option("gutters", [], function (cm) {
      setGuttersForLineNumbers(cm.options);
      guttersChanged(cm);
    }, true);
    option("fixedGutter", true, function (cm, val) {
      cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
      cm.refresh();
    }, true);
    option("coverGutterNextToScrollbar", false, function (cm) {
      return updateScrollbars(cm);
    }, true);
    option("scrollbarStyle", "native", function (cm) {
      initScrollbars(cm);
      updateScrollbars(cm);
      cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
      cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
    }, true);
    option("lineNumbers", false, function (cm) {
      setGuttersForLineNumbers(cm.options);
      guttersChanged(cm);
    }, true);
    option("firstLineNumber", 1, guttersChanged, true);
    option("lineNumberFormatter", function (integer) {
      return integer;
    }, guttersChanged, true);
    option("showCursorWhenSelecting", false, updateSelection, true);

    option("resetSelectionOnContextMenu", true);
    option("lineWiseCopyCut", true);

    option("readOnly", false, function (cm, val) {
      if (val == "nocursor") {
        onBlur(cm);
        cm.display.input.blur();
        cm.display.disabled = true;
      } else {
        cm.display.disabled = false;
      }
      cm.display.input.readOnlyChanged(val);
    });
    option("disableInput", false, function (cm, val) {
      if (!val) {
        cm.display.input.reset();
      }
    }, true);
    option("dragDrop", true, dragDropChanged);
    option("allowDropFileTypes", null);

    option("cursorBlinkRate", 530);
    option("cursorScrollMargin", 0);
    option("cursorHeight", 1, updateSelection, true);
    option("singleCursorHeightPerLine", true, updateSelection, true);
    option("workTime", 100);
    option("workDelay", 100);
    option("flattenSpans", true, resetModeState, true);
    option("addModeClass", false, resetModeState, true);
    option("pollInterval", 100);
    option("undoDepth", 200, function (cm, val) {
      return cm.doc.history.undoDepth = val;
    });
    option("historyEventDelay", 1250);
    option("viewportMargin", 10, function (cm) {
      return cm.refresh();
    }, true);
    option("maxHighlightLength", 10000, resetModeState, true);
    option("moveInputWithCursor", true, function (cm, val) {
      if (!val) {
        cm.display.input.resetPosition();
      }
    });

    option("tabindex", null, function (cm, val) {
      return cm.display.input.getField().tabIndex = val || "";
    });
    option("autofocus", null);
    option("direction", "ltr", function (cm, val) {
      return cm.doc.setDirection(val);
    }, true);
  }

  function guttersChanged(cm) {
    updateGutters(cm);
    regChange(cm);
    alignHorizontally(cm);
  }

  function dragDropChanged(cm, value, old) {
    var wasOn = old && old != Init;
    if (!value != !wasOn) {
      var funcs = cm.display.dragFunctions;
      var toggle = value ? on : off;
      toggle(cm.display.scroller, "dragstart", funcs.start);
      toggle(cm.display.scroller, "dragenter", funcs.enter);
      toggle(cm.display.scroller, "dragover", funcs.over);
      toggle(cm.display.scroller, "dragleave", funcs.leave);
      toggle(cm.display.scroller, "drop", funcs.drop);
    }
  }

  function wrappingChanged(cm) {
    if (cm.options.lineWrapping) {
      addClass(cm.display.wrapper, "CodeMirror-wrap");
      cm.display.sizer.style.minWidth = "";
      cm.display.sizerWidth = null;
    } else {
      rmClass(cm.display.wrapper, "CodeMirror-wrap");
      findMaxLine(cm);
    }
    estimateLineHeights(cm);
    regChange(cm);
    clearCaches(cm);
    setTimeout(function () {
      return updateScrollbars(cm);
    }, 100);
  }

  // A CodeMirror instance represents an editor. This is the object
  // that user code is usually dealing with.

  function CodeMirror$1(place, options) {
    var this$1 = this;

    if (!(this instanceof CodeMirror$1)) {
      return new CodeMirror$1(place, options);
    }

    this.options = options = options ? copyObj(options) : {};
    // Determine effective options based on given values and defaults.
    copyObj(defaults, options, false);
    setGuttersForLineNumbers(options);

    var doc = options.value;
    if (typeof doc == "string") {
      doc = new Doc(doc, options.mode, null, options.lineSeparator, options.direction);
    }
    this.doc = doc;

    var input = new CodeMirror$1.inputStyles[options.inputStyle](this);
    var display = this.display = new Display(place, doc, input);
    display.wrapper.CodeMirror = this;
    updateGutters(this);
    themeChanged(this);
    if (options.lineWrapping) {
      this.display.wrapper.className += " CodeMirror-wrap";
    }
    initScrollbars(this);

    this.state = {
      keyMaps: [], // stores maps added by addKeyMap
      overlays: [], // highlighting overlays, as added by addOverlay
      modeGen: 0, // bumped when mode/overlay changes, used to invalidate highlighting info
      overwrite: false,
      delayingBlurEvent: false,
      focused: false,
      suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
      pasteIncoming: false, cutIncoming: false, // help recognize paste/cut edits in input.poll
      selectingText: false,
      draggingText: false,
      highlight: new Delayed(), // stores highlight worker timeout
      keySeq: null, // Unfinished key sequence
      specialChars: null
    };

    if (options.autofocus && !mobile) {
      display.input.focus();
    }

    // Override magic textarea content restore that IE sometimes does
    // on our hidden textarea on reload
    if (ie && ie_version < 11) {
      setTimeout(function () {
        return this$1.display.input.reset(true);
      }, 20);
    }

    registerEventHandlers(this);
    ensureGlobalHandlers();

    startOperation(this);
    this.curOp.forceUpdate = true;
    attachDoc(this, doc);

    if (options.autofocus && !mobile || this.hasFocus()) {
      setTimeout(bind(onFocus, this), 20);
    } else {
      onBlur(this);
    }

    for (var opt in optionHandlers) {
      if (optionHandlers.hasOwnProperty(opt)) {
        optionHandlers[opt](this$1, options[opt], Init);
      }
    }
    maybeUpdateLineNumberWidth(this);
    if (options.finishInit) {
      options.finishInit(this);
    }
    for (var i = 0; i < initHooks.length; ++i) {
      initHooks[i](this$1);
    }
    endOperation(this);
    // Suppress optimizelegibility in Webkit, since it breaks text
    // measuring on line wrapping boundaries.
    if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
      display.lineDiv.style.textRendering = "auto";
    }
  }

  // The default configuration options.
  CodeMirror$1.defaults = defaults;
  // Functions to run when options are changed.
  CodeMirror$1.optionHandlers = optionHandlers;

  // Attach the necessary event handlers when initializing the editor
  function registerEventHandlers(cm) {
    var d = cm.display;
    on(d.scroller, "mousedown", operation(cm, onMouseDown));
    // Older IE's will not fire a second mousedown for a double click
    if (ie && ie_version < 11) {
      on(d.scroller, "dblclick", operation(cm, function (e) {
        if (signalDOMEvent(cm, e)) {
          return;
        }
        var pos = posFromMouse(cm, e);
        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) {
          return;
        }
        e_preventDefault(e);
        var word = cm.findWordAt(pos);
        extendSelection(cm.doc, word.anchor, word.head);
      }));
    } else {
      on(d.scroller, "dblclick", function (e) {
        return signalDOMEvent(cm, e) || e_preventDefault(e);
      });
    }
    // Some browsers fire contextmenu *after* opening the menu, at
    // which point we can't mess with it anymore. Context menu is
    // handled in onMouseDown for these browsers.
    if (!captureRightClick) {
      on(d.scroller, "contextmenu", function (e) {
        return onContextMenu(cm, e);
      });
    }

    // Used to suppress mouse event handling when a touch happens
    var touchFinished,
        prevTouch = { end: 0 };
    function finishTouch() {
      if (d.activeTouch) {
        touchFinished = setTimeout(function () {
          return d.activeTouch = null;
        }, 1000);
        prevTouch = d.activeTouch;
        prevTouch.end = +new Date();
      }
    }
    function isMouseLikeTouchEvent(e) {
      if (e.touches.length != 1) {
        return false;
      }
      var touch = e.touches[0];
      return touch.radiusX <= 1 && touch.radiusY <= 1;
    }
    function farAway(touch, other) {
      if (other.left == null) {
        return true;
      }
      var dx = other.left - touch.left,
          dy = other.top - touch.top;
      return dx * dx + dy * dy > 20 * 20;
    }
    on(d.scroller, "touchstart", function (e) {
      if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e)) {
        d.input.ensurePolled();
        clearTimeout(touchFinished);
        var now = +new Date();
        d.activeTouch = { start: now, moved: false,
          prev: now - prevTouch.end <= 300 ? prevTouch : null };
        if (e.touches.length == 1) {
          d.activeTouch.left = e.touches[0].pageX;
          d.activeTouch.top = e.touches[0].pageY;
        }
      }
    });
    on(d.scroller, "touchmove", function () {
      if (d.activeTouch) {
        d.activeTouch.moved = true;
      }
    });
    on(d.scroller, "touchend", function (e) {
      var touch = d.activeTouch;
      if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && new Date() - touch.start < 300) {
        var pos = cm.coordsChar(d.activeTouch, "page"),
            range;
        if (!touch.prev || farAway(touch, touch.prev)) // Single tap
          {
            range = new Range(pos, pos);
          } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) // Double tap
          {
            range = cm.findWordAt(pos);
          } else // Triple tap
          {
            range = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
          }
        cm.setSelection(range.anchor, range.head);
        cm.focus();
        e_preventDefault(e);
      }
      finishTouch();
    });
    on(d.scroller, "touchcancel", finishTouch);

    // Sync scrolling between fake scrollbars and real scrollable
    // area, ensure viewport is updated when scrolling.
    on(d.scroller, "scroll", function () {
      if (d.scroller.clientHeight) {
        setScrollTop(cm, d.scroller.scrollTop);
        setScrollLeft(cm, d.scroller.scrollLeft, true);
        signal(cm, "scroll", cm);
      }
    });

    // Listen to wheel events in order to try and update the viewport on time.
    on(d.scroller, "mousewheel", function (e) {
      return onScrollWheel(cm, e);
    });
    on(d.scroller, "DOMMouseScroll", function (e) {
      return onScrollWheel(cm, e);
    });

    // Prevent wrapper from ever scrolling
    on(d.wrapper, "scroll", function () {
      return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
    });

    d.dragFunctions = {
      enter: function (e) {
        if (!signalDOMEvent(cm, e)) {
          e_stop(e);
        }
      },
      over: function (e) {
        if (!signalDOMEvent(cm, e)) {
          onDragOver(cm, e);e_stop(e);
        }
      },
      start: function (e) {
        return onDragStart(cm, e);
      },
      drop: operation(cm, onDrop),
      leave: function (e) {
        if (!signalDOMEvent(cm, e)) {
          clearDragCursor(cm);
        }
      }
    };

    var inp = d.input.getField();
    on(inp, "keyup", function (e) {
      return onKeyUp.call(cm, e);
    });
    on(inp, "keydown", operation(cm, onKeyDown));
    on(inp, "keypress", operation(cm, onKeyPress));
    on(inp, "focus", function (e) {
      return onFocus(cm, e);
    });
    on(inp, "blur", function (e) {
      return onBlur(cm, e);
    });
  }

  var initHooks = [];
  CodeMirror$1.defineInitHook = function (f) {
    return initHooks.push(f);
  };

  // Indent the given line. The how parameter can be "smart",
  // "add"/null, "subtract", or "prev". When aggressive is false
  // (typically set to true for forced single-line indents), empty
  // lines are not indented, and places where the mode returns Pass
  // are left alone.
  function indentLine(cm, n, how, aggressive) {
    var doc = cm.doc,
        state;
    if (how == null) {
      how = "add";
    }
    if (how == "smart") {
      // Fall back to "prev" when the mode doesn't have an indentation
      // method.
      if (!doc.mode.indent) {
        how = "prev";
      } else {
        state = getStateBefore(cm, n);
      }
    }

    var tabSize = cm.options.tabSize;
    var line = getLine(doc, n),
        curSpace = countColumn(line.text, null, tabSize);
    if (line.stateAfter) {
      line.stateAfter = null;
    }
    var curSpaceString = line.text.match(/^\s*/)[0],
        indentation;
    if (!aggressive && !/\S/.test(line.text)) {
      indentation = 0;
      how = "not";
    } else if (how == "smart") {
      indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      if (indentation == Pass || indentation > 150) {
        if (!aggressive) {
          return;
        }
        how = "prev";
      }
    }
    if (how == "prev") {
      if (n > doc.first) {
        indentation = countColumn(getLine(doc, n - 1).text, null, tabSize);
      } else {
        indentation = 0;
      }
    } else if (how == "add") {
      indentation = curSpace + cm.options.indentUnit;
    } else if (how == "subtract") {
      indentation = curSpace - cm.options.indentUnit;
    } else if (typeof how == "number") {
      indentation = curSpace + how;
    }
    indentation = Math.max(0, indentation);

    var indentString = "",
        pos = 0;
    if (cm.options.indentWithTabs) {
      for (var i = Math.floor(indentation / tabSize); i; --i) {
        pos += tabSize;indentString += "\t";
      }
    }
    if (pos < indentation) {
      indentString += spaceStr(indentation - pos);
    }

    if (indentString != curSpaceString) {
      replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
      line.stateAfter = null;
      return true;
    } else {
      // Ensure that, if the cursor was in the whitespace at the start
      // of the line, it is moved to the end of that space.
      for (var i$1 = 0; i$1 < doc.sel.ranges.length; i$1++) {
        var range = doc.sel.ranges[i$1];
        if (range.head.line == n && range.head.ch < curSpaceString.length) {
          var pos$1 = Pos(n, curSpaceString.length);
          replaceOneSelection(doc, i$1, new Range(pos$1, pos$1));
          break;
        }
      }
    }
  }

  // This will be set to a {lineWise: bool, text: [string]} object, so
  // that, when pasting, we know what kind of selections the copied
  // text was made out of.
  var lastCopied = null;

  function setLastCopied(newLastCopied) {
    lastCopied = newLastCopied;
  }

  function applyTextInput(cm, inserted, deleted, sel, origin) {
    var doc = cm.doc;
    cm.display.shift = false;
    if (!sel) {
      sel = doc.sel;
    }

    var paste = cm.state.pasteIncoming || origin == "paste";
    var textLines = splitLinesAuto(inserted),
        multiPaste = null;
    // When pasing N lines into N selections, insert one line per selection
    if (paste && sel.ranges.length > 1) {
      if (lastCopied && lastCopied.text.join("\n") == inserted) {
        if (sel.ranges.length % lastCopied.text.length == 0) {
          multiPaste = [];
          for (var i = 0; i < lastCopied.text.length; i++) {
            multiPaste.push(doc.splitLines(lastCopied.text[i]));
          }
        }
      } else if (textLines.length == sel.ranges.length) {
        multiPaste = map(textLines, function (l) {
          return [l];
        });
      }
    }

    var updateInput;
    // Normal behavior is to insert the new text into every selection
    for (var i$1 = sel.ranges.length - 1; i$1 >= 0; i$1--) {
      var range$$1 = sel.ranges[i$1];
      var from = range$$1.from(),
          to = range$$1.to();
      if (range$$1.empty()) {
        if (deleted && deleted > 0) // Handle deletion
          {
            from = Pos(from.line, from.ch - deleted);
          } else if (cm.state.overwrite && !paste) // Handle overwrite
          {
            to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
          } else if (lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == inserted) {
          from = to = Pos(from.line, 0);
        }
      }
      updateInput = cm.curOp.updateInput;
      var changeEvent = { from: from, to: to, text: multiPaste ? multiPaste[i$1 % multiPaste.length] : textLines,
        origin: origin || (paste ? "paste" : cm.state.cutIncoming ? "cut" : "+input") };
      makeChange(cm.doc, changeEvent);
      signalLater(cm, "inputRead", cm, changeEvent);
    }
    if (inserted && !paste) {
      triggerElectric(cm, inserted);
    }

    ensureCursorVisible(cm);
    cm.curOp.updateInput = updateInput;
    cm.curOp.typing = true;
    cm.state.pasteIncoming = cm.state.cutIncoming = false;
  }

  function handlePaste(e, cm) {
    var pasted = e.clipboardData && e.clipboardData.getData("Text");
    if (pasted) {
      e.preventDefault();
      if (!cm.isReadOnly() && !cm.options.disableInput) {
        runInOp(cm, function () {
          return applyTextInput(cm, pasted, 0, null, "paste");
        });
      }
      return true;
    }
  }

  function triggerElectric(cm, inserted) {
    // When an 'electric' character is inserted, immediately trigger a reindent
    if (!cm.options.electricChars || !cm.options.smartIndent) {
      return;
    }
    var sel = cm.doc.sel;

    for (var i = sel.ranges.length - 1; i >= 0; i--) {
      var range$$1 = sel.ranges[i];
      if (range$$1.head.ch > 100 || i && sel.ranges[i - 1].head.line == range$$1.head.line) {
        continue;
      }
      var mode = cm.getModeAt(range$$1.head);
      var indented = false;
      if (mode.electricChars) {
        for (var j = 0; j < mode.electricChars.length; j++) {
          if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
            indented = indentLine(cm, range$$1.head.line, "smart");
            break;
          }
        }
      } else if (mode.electricInput) {
        if (mode.electricInput.test(getLine(cm.doc, range$$1.head.line).text.slice(0, range$$1.head.ch))) {
          indented = indentLine(cm, range$$1.head.line, "smart");
        }
      }
      if (indented) {
        signalLater(cm, "electricInput", cm, range$$1.head.line);
      }
    }
  }

  function copyableRanges(cm) {
    var text = [],
        ranges = [];
    for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
      var line = cm.doc.sel.ranges[i].head.line;
      var lineRange = { anchor: Pos(line, 0), head: Pos(line + 1, 0) };
      ranges.push(lineRange);
      text.push(cm.getRange(lineRange.anchor, lineRange.head));
    }
    return { text: text, ranges: ranges };
  }

  function disableBrowserMagic(field, spellcheck) {
    field.setAttribute("autocorrect", "off");
    field.setAttribute("autocapitalize", "off");
    field.setAttribute("spellcheck", !!spellcheck);
  }

  function hiddenTextarea() {
    var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none");
    var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    // The textarea is kept positioned near the cursor to prevent the
    // fact that it'll be scrolled into view on input from scrolling
    // our fake cursor out of view. On webkit, when wrap=off, paste is
    // very slow. So make the area wide instead.
    if (webkit) {
      te.style.width = "1000px";
    } else {
      te.setAttribute("wrap", "off");
    }
    // If border: 0; -- iOS fails to open keyboard (issue #1287)
    if (ios) {
      te.style.border = "1px solid black";
    }
    disableBrowserMagic(te);
    return div;
  }

  // The publicly visible API. Note that methodOp(f) means
  // 'wrap f in an operation, performed on its `this` parameter'.

  // This is not the complete set of editor methods. Most of the
  // methods defined on the Doc type are also injected into
  // CodeMirror.prototype, for backwards compatibility and
  // convenience.

  var addEditorMethods = function (CodeMirror) {
    var optionHandlers = CodeMirror.optionHandlers;

    var helpers = CodeMirror.helpers = {};

    CodeMirror.prototype = {
      constructor: CodeMirror,
      focus: function () {
        window.focus();this.display.input.focus();
      },

      setOption: function (option, value) {
        var options = this.options,
            old = options[option];
        if (options[option] == value && option != "mode") {
          return;
        }
        options[option] = value;
        if (optionHandlers.hasOwnProperty(option)) {
          operation(this, optionHandlers[option])(this, value, old);
        }
        signal(this, "optionChange", this, option);
      },

      getOption: function (option) {
        return this.options[option];
      },
      getDoc: function () {
        return this.doc;
      },

      addKeyMap: function (map$$1, bottom) {
        this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map$$1));
      },
      removeKeyMap: function (map$$1) {
        var maps = this.state.keyMaps;
        for (var i = 0; i < maps.length; ++i) {
          if (maps[i] == map$$1 || maps[i].name == map$$1) {
            maps.splice(i, 1);
            return true;
          }
        }
      },

      addOverlay: methodOp(function (spec, options) {
        var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
        if (mode.startState) {
          throw new Error("Overlays may not be stateful.");
        }
        insertSorted(this.state.overlays, { mode: mode, modeSpec: spec, opaque: options && options.opaque,
          priority: options && options.priority || 0 }, function (overlay) {
          return overlay.priority;
        });
        this.state.modeGen++;
        regChange(this);
      }),
      removeOverlay: methodOp(function (spec) {
        var this$1 = this;

        var overlays = this.state.overlays;
        for (var i = 0; i < overlays.length; ++i) {
          var cur = overlays[i].modeSpec;
          if (cur == spec || typeof spec == "string" && cur.name == spec) {
            overlays.splice(i, 1);
            this$1.state.modeGen++;
            regChange(this$1);
            return;
          }
        }
      }),

      indentLine: methodOp(function (n, dir, aggressive) {
        if (typeof dir != "string" && typeof dir != "number") {
          if (dir == null) {
            dir = this.options.smartIndent ? "smart" : "prev";
          } else {
            dir = dir ? "add" : "subtract";
          }
        }
        if (isLine(this.doc, n)) {
          indentLine(this, n, dir, aggressive);
        }
      }),
      indentSelection: methodOp(function (how) {
        var this$1 = this;

        var ranges = this.doc.sel.ranges,
            end = -1;
        for (var i = 0; i < ranges.length; i++) {
          var range$$1 = ranges[i];
          if (!range$$1.empty()) {
            var from = range$$1.from(),
                to = range$$1.to();
            var start = Math.max(end, from.line);
            end = Math.min(this$1.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
            for (var j = start; j < end; ++j) {
              indentLine(this$1, j, how);
            }
            var newRanges = this$1.doc.sel.ranges;
            if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i].from().ch > 0) {
              replaceOneSelection(this$1.doc, i, new Range(from, newRanges[i].to()), sel_dontScroll);
            }
          } else if (range$$1.head.line > end) {
            indentLine(this$1, range$$1.head.line, how, true);
            end = range$$1.head.line;
            if (i == this$1.doc.sel.primIndex) {
              ensureCursorVisible(this$1);
            }
          }
        }
      }),

      // Fetch the parser token for a given character. Useful for hacks
      // that want to inspect the mode state (say, for completion).
      getTokenAt: function (pos, precise) {
        return takeToken(this, pos, precise);
      },

      getLineTokens: function (line, precise) {
        return takeToken(this, Pos(line), precise, true);
      },

      getTokenTypeAt: function (pos) {
        pos = clipPos(this.doc, pos);
        var styles = getLineStyles(this, getLine(this.doc, pos.line));
        var before = 0,
            after = (styles.length - 1) / 2,
            ch = pos.ch;
        var type;
        if (ch == 0) {
          type = styles[2];
        } else {
          for (;;) {
            var mid = before + after >> 1;
            if ((mid ? styles[mid * 2 - 1] : 0) >= ch) {
              after = mid;
            } else if (styles[mid * 2 + 1] < ch) {
              before = mid + 1;
            } else {
              type = styles[mid * 2 + 2];break;
            }
          }
        }
        var cut = type ? type.indexOf("overlay ") : -1;
        return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
      },

      getModeAt: function (pos) {
        var mode = this.doc.mode;
        if (!mode.innerMode) {
          return mode;
        }
        return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode;
      },

      getHelper: function (pos, type) {
        return this.getHelpers(pos, type)[0];
      },

      getHelpers: function (pos, type) {
        var this$1 = this;

        var found = [];
        if (!helpers.hasOwnProperty(type)) {
          return found;
        }
        var help = helpers[type],
            mode = this.getModeAt(pos);
        if (typeof mode[type] == "string") {
          if (help[mode[type]]) {
            found.push(help[mode[type]]);
          }
        } else if (mode[type]) {
          for (var i = 0; i < mode[type].length; i++) {
            var val = help[mode[type][i]];
            if (val) {
              found.push(val);
            }
          }
        } else if (mode.helperType && help[mode.helperType]) {
          found.push(help[mode.helperType]);
        } else if (help[mode.name]) {
          found.push(help[mode.name]);
        }
        for (var i$1 = 0; i$1 < help._global.length; i$1++) {
          var cur = help._global[i$1];
          if (cur.pred(mode, this$1) && indexOf(found, cur.val) == -1) {
            found.push(cur.val);
          }
        }
        return found;
      },

      getStateAfter: function (line, precise) {
        var doc = this.doc;
        line = clipLine(doc, line == null ? doc.first + doc.size - 1 : line);
        return getStateBefore(this, line + 1, precise);
      },

      cursorCoords: function (start, mode) {
        var pos,
            range$$1 = this.doc.sel.primary();
        if (start == null) {
          pos = range$$1.head;
        } else if (typeof start == "object") {
          pos = clipPos(this.doc, start);
        } else {
          pos = start ? range$$1.from() : range$$1.to();
        }
        return cursorCoords(this, pos, mode || "page");
      },

      charCoords: function (pos, mode) {
        return charCoords(this, clipPos(this.doc, pos), mode || "page");
      },

      coordsChar: function (coords, mode) {
        coords = fromCoordSystem(this, coords, mode || "page");
        return coordsChar(this, coords.left, coords.top);
      },

      lineAtHeight: function (height, mode) {
        height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
        return lineAtHeight(this.doc, height + this.display.viewOffset);
      },
      heightAtLine: function (line, mode, includeWidgets) {
        var end = false,
            lineObj;
        if (typeof line == "number") {
          var last = this.doc.first + this.doc.size - 1;
          if (line < this.doc.first) {
            line = this.doc.first;
          } else if (line > last) {
            line = last;end = true;
          }
          lineObj = getLine(this.doc, line);
        } else {
          lineObj = line;
        }
        return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
      },

      defaultTextHeight: function () {
        return textHeight(this.display);
      },
      defaultCharWidth: function () {
        return charWidth(this.display);
      },

      getViewport: function () {
        return { from: this.display.viewFrom, to: this.display.viewTo };
      },

      addWidget: function (pos, node, scroll, vert, horiz) {
        var display = this.display;
        pos = cursorCoords(this, clipPos(this.doc, pos));
        var top = pos.bottom,
            left = pos.left;
        node.style.position = "absolute";
        node.setAttribute("cm-ignore-events", "true");
        this.display.input.setUneditable(node);
        display.sizer.appendChild(node);
        if (vert == "over") {
          top = pos.top;
        } else if (vert == "above" || vert == "near") {
          var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
              hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
          // Default to positioning above (if specified and possible); otherwise default to positioning below
          if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
            top = pos.top - node.offsetHeight;
          } else if (pos.bottom + node.offsetHeight <= vspace) {
            top = pos.bottom;
          }
          if (left + node.offsetWidth > hspace) {
            left = hspace - node.offsetWidth;
          }
        }
        node.style.top = top + "px";
        node.style.left = node.style.right = "";
        if (horiz == "right") {
          left = display.sizer.clientWidth - node.offsetWidth;
          node.style.right = "0px";
        } else {
          if (horiz == "left") {
            left = 0;
          } else if (horiz == "middle") {
            left = (display.sizer.clientWidth - node.offsetWidth) / 2;
          }
          node.style.left = left + "px";
        }
        if (scroll) {
          scrollIntoView(this, { left: left, top: top, right: left + node.offsetWidth, bottom: top + node.offsetHeight });
        }
      },

      triggerOnKeyDown: methodOp(onKeyDown),
      triggerOnKeyPress: methodOp(onKeyPress),
      triggerOnKeyUp: onKeyUp,

      execCommand: function (cmd) {
        if (commands.hasOwnProperty(cmd)) {
          return commands[cmd].call(null, this);
        }
      },

      triggerElectric: methodOp(function (text) {
        triggerElectric(this, text);
      }),

      findPosH: function (from, amount, unit, visually) {
        var this$1 = this;

        var dir = 1;
        if (amount < 0) {
          dir = -1;amount = -amount;
        }
        var cur = clipPos(this.doc, from);
        for (var i = 0; i < amount; ++i) {
          cur = findPosH(this$1.doc, cur, dir, unit, visually);
          if (cur.hitSide) {
            break;
          }
        }
        return cur;
      },

      moveH: methodOp(function (dir, unit) {
        var this$1 = this;

        this.extendSelectionsBy(function (range$$1) {
          if (this$1.display.shift || this$1.doc.extend || range$$1.empty()) {
            return findPosH(this$1.doc, range$$1.head, dir, unit, this$1.options.rtlMoveVisually);
          } else {
            return dir < 0 ? range$$1.from() : range$$1.to();
          }
        }, sel_move);
      }),

      deleteH: methodOp(function (dir, unit) {
        var sel = this.doc.sel,
            doc = this.doc;
        if (sel.somethingSelected()) {
          doc.replaceSelection("", null, "+delete");
        } else {
          deleteNearSelection(this, function (range$$1) {
            var other = findPosH(doc, range$$1.head, dir, unit, false);
            return dir < 0 ? { from: other, to: range$$1.head } : { from: range$$1.head, to: other };
          });
        }
      }),

      findPosV: function (from, amount, unit, goalColumn) {
        var this$1 = this;

        var dir = 1,
            x = goalColumn;
        if (amount < 0) {
          dir = -1;amount = -amount;
        }
        var cur = clipPos(this.doc, from);
        for (var i = 0; i < amount; ++i) {
          var coords = cursorCoords(this$1, cur, "div");
          if (x == null) {
            x = coords.left;
          } else {
            coords.left = x;
          }
          cur = findPosV(this$1, coords, dir, unit);
          if (cur.hitSide) {
            break;
          }
        }
        return cur;
      },

      moveV: methodOp(function (dir, unit) {
        var this$1 = this;

        var doc = this.doc,
            goals = [];
        var collapse = !this.display.shift && !doc.extend && doc.sel.somethingSelected();
        doc.extendSelectionsBy(function (range$$1) {
          if (collapse) {
            return dir < 0 ? range$$1.from() : range$$1.to();
          }
          var headPos = cursorCoords(this$1, range$$1.head, "div");
          if (range$$1.goalColumn != null) {
            headPos.left = range$$1.goalColumn;
          }
          goals.push(headPos.left);
          var pos = findPosV(this$1, headPos, dir, unit);
          if (unit == "page" && range$$1 == doc.sel.primary()) {
            addToScrollPos(this$1, null, charCoords(this$1, pos, "div").top - headPos.top);
          }
          return pos;
        }, sel_move);
        if (goals.length) {
          for (var i = 0; i < doc.sel.ranges.length; i++) {
            doc.sel.ranges[i].goalColumn = goals[i];
          }
        }
      }),

      // Find the word at the given position (as returned by coordsChar).
      findWordAt: function (pos) {
        var doc = this.doc,
            line = getLine(doc, pos.line).text;
        var start = pos.ch,
            end = pos.ch;
        if (line) {
          var helper = this.getHelper(pos, "wordChars");
          if ((pos.sticky == "before" || end == line.length) && start) {
            --start;
          } else {
            ++end;
          }
          var startChar = line.charAt(start);
          var check = isWordChar(startChar, helper) ? function (ch) {
            return isWordChar(ch, helper);
          } : /\s/.test(startChar) ? function (ch) {
            return (/\s/.test(ch)
            );
          } : function (ch) {
            return !/\s/.test(ch) && !isWordChar(ch);
          };
          while (start > 0 && check(line.charAt(start - 1))) {
            --start;
          }
          while (end < line.length && check(line.charAt(end))) {
            ++end;
          }
        }
        return new Range(Pos(pos.line, start), Pos(pos.line, end));
      },

      toggleOverwrite: function (value) {
        if (value != null && value == this.state.overwrite) {
          return;
        }
        if (this.state.overwrite = !this.state.overwrite) {
          addClass(this.display.cursorDiv, "CodeMirror-overwrite");
        } else {
          rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
        }

        signal(this, "overwriteToggle", this, this.state.overwrite);
      },
      hasFocus: function () {
        return this.display.input.getField() == activeElt();
      },
      isReadOnly: function () {
        return !!(this.options.readOnly || this.doc.cantEdit);
      },

      scrollTo: methodOp(function (x, y) {
        if (x != null || y != null) {
          resolveScrollToPos(this);
        }
        if (x != null) {
          this.curOp.scrollLeft = x;
        }
        if (y != null) {
          this.curOp.scrollTop = y;
        }
      }),
      getScrollInfo: function () {
        var scroller = this.display.scroller;
        return { left: scroller.scrollLeft, top: scroller.scrollTop,
          height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
          width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
          clientHeight: displayHeight(this), clientWidth: displayWidth(this) };
      },

      scrollIntoView: methodOp(function (range$$1, margin) {
        if (range$$1 == null) {
          range$$1 = { from: this.doc.sel.primary().head, to: null };
          if (margin == null) {
            margin = this.options.cursorScrollMargin;
          }
        } else if (typeof range$$1 == "number") {
          range$$1 = { from: Pos(range$$1, 0), to: null };
        } else if (range$$1.from == null) {
          range$$1 = { from: range$$1, to: null };
        }
        if (!range$$1.to) {
          range$$1.to = range$$1.from;
        }
        range$$1.margin = margin || 0;

        if (range$$1.from.line != null) {
          resolveScrollToPos(this);
          this.curOp.scrollToPos = range$$1;
        } else {
          var sPos = calculateScrollPos(this, {
            left: Math.min(range$$1.from.left, range$$1.to.left),
            top: Math.min(range$$1.from.top, range$$1.to.top) - range$$1.margin,
            right: Math.max(range$$1.from.right, range$$1.to.right),
            bottom: Math.max(range$$1.from.bottom, range$$1.to.bottom) + range$$1.margin
          });
          this.scrollTo(sPos.scrollLeft, sPos.scrollTop);
        }
      }),

      setSize: methodOp(function (width, height) {
        var this$1 = this;

        var interpret = function (val) {
          return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
        };
        if (width != null) {
          this.display.wrapper.style.width = interpret(width);
        }
        if (height != null) {
          this.display.wrapper.style.height = interpret(height);
        }
        if (this.options.lineWrapping) {
          clearLineMeasurementCache(this);
        }
        var lineNo$$1 = this.display.viewFrom;
        this.doc.iter(lineNo$$1, this.display.viewTo, function (line) {
          if (line.widgets) {
            for (var i = 0; i < line.widgets.length; i++) {
              if (line.widgets[i].noHScroll) {
                regLineChange(this$1, lineNo$$1, "widget");break;
              }
            }
          }
          ++lineNo$$1;
        });
        this.curOp.forceUpdate = true;
        signal(this, "refresh", this);
      }),

      operation: function (f) {
        return runInOp(this, f);
      },

      refresh: methodOp(function () {
        var oldHeight = this.display.cachedTextHeight;
        regChange(this);
        this.curOp.forceUpdate = true;
        clearCaches(this);
        this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
        updateGutterSpace(this);
        if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5) {
          estimateLineHeights(this);
        }
        signal(this, "refresh", this);
      }),

      swapDoc: methodOp(function (doc) {
        var old = this.doc;
        old.cm = null;
        attachDoc(this, doc);
        clearCaches(this);
        this.display.input.reset();
        this.scrollTo(doc.scrollLeft, doc.scrollTop);
        this.curOp.forceScroll = true;
        signalLater(this, "swapDoc", this, old);
        return old;
      }),

      getInputField: function () {
        return this.display.input.getField();
      },
      getWrapperElement: function () {
        return this.display.wrapper;
      },
      getScrollerElement: function () {
        return this.display.scroller;
      },
      getGutterElement: function () {
        return this.display.gutters;
      }
    };
    eventMixin(CodeMirror);

    CodeMirror.registerHelper = function (type, name, value) {
      if (!helpers.hasOwnProperty(type)) {
        helpers[type] = CodeMirror[type] = { _global: [] };
      }
      helpers[type][name] = value;
    };
    CodeMirror.registerGlobalHelper = function (type, name, predicate, value) {
      CodeMirror.registerHelper(type, name, value);
      helpers[type]._global.push({ pred: predicate, val: value });
    };
  };

  // Used for horizontal relative motion. Dir is -1 or 1 (left or
  // right), unit can be "char", "column" (like char, but doesn't
  // cross line boundaries), "word" (across next word), or "group" (to
  // the start of next group of word or non-word-non-whitespace
  // chars). The visually param controls whether, in right-to-left
  // text, direction 1 means to move towards the next index in the
  // string, or towards the character to the right of the current
  // position. The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosH(doc, pos, dir, unit, visually) {
    var oldPos = pos;
    var origDir = dir;
    var lineObj = getLine(doc, pos.line);
    function findNextLine() {
      var l = pos.line + dir;
      if (l < doc.first || l >= doc.first + doc.size) {
        return false;
      }
      pos = new Pos(l, pos.ch, pos.sticky);
      return lineObj = getLine(doc, l);
    }
    function moveOnce(boundToLine) {
      var next;
      if (visually) {
        next = moveVisually(doc.cm, lineObj, pos, dir);
      } else {
        next = moveLogically(lineObj, pos, dir);
      }
      if (next == null) {
        if (!boundToLine && findNextLine()) {
          pos = endOfLine(visually, doc.cm, lineObj, pos.line, dir);
        } else {
          return false;
        }
      } else {
        pos = next;
      }
      return true;
    }

    if (unit == "char") {
      moveOnce();
    } else if (unit == "column") {
      moveOnce(true);
    } else if (unit == "word" || unit == "group") {
      var sawType = null,
          group = unit == "group";
      var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
      for (var first = true;; first = false) {
        if (dir < 0 && !moveOnce(!first)) {
          break;
        }
        var cur = lineObj.text.charAt(pos.ch) || "\n";
        var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
        if (group && !first && !type) {
          type = "s";
        }
        if (sawType && sawType != type) {
          if (dir < 0) {
            dir = 1;moveOnce();pos.sticky = "after";
          }
          break;
        }

        if (type) {
          sawType = type;
        }
        if (dir > 0 && !moveOnce(!first)) {
          break;
        }
      }
    }
    var result = skipAtomic(doc, pos, oldPos, origDir, true);
    if (equalCursorPos(oldPos, result)) {
      result.hitSide = true;
    }
    return result;
  }

  // For relative vertical movement. Dir may be -1 or 1. Unit can be
  // "page" or "line". The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosV(cm, pos, dir, unit) {
    var doc = cm.doc,
        x = pos.left,
        y;
    if (unit == "page") {
      var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      var moveAmount = Math.max(pageSize - .5 * textHeight(cm.display), 3);
      y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
    } else if (unit == "line") {
      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
    }
    var target;
    for (;;) {
      target = coordsChar(cm, x, y);
      if (!target.outside) {
        break;
      }
      if (dir < 0 ? y <= 0 : y >= doc.height) {
        target.hitSide = true;break;
      }
      y += dir * 5;
    }
    return target;
  }

  // CONTENTEDITABLE INPUT STYLE

  var ContentEditableInput = function (cm) {
    this.cm = cm;
    this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
    this.polling = new Delayed();
    this.composing = null;
    this.gracePeriod = false;
    this.readDOMTimeout = null;
  };

  ContentEditableInput.prototype.init = function (display) {
    var this$1 = this;

    var input = this,
        cm = input.cm;
    var div = input.div = display.lineDiv;
    disableBrowserMagic(div, cm.options.spellcheck);

    on(div, "paste", function (e) {
      if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
        return;
      }
      // IE doesn't fire input events, so we schedule a read for the pasted content in this way
      if (ie_version <= 11) {
        setTimeout(operation(cm, function () {
          return this$1.updateFromDOM();
        }), 20);
      }
    });

    on(div, "compositionstart", function (e) {
      this$1.composing = { data: e.data, done: false };
    });
    on(div, "compositionupdate", function (e) {
      if (!this$1.composing) {
        this$1.composing = { data: e.data, done: false };
      }
    });
    on(div, "compositionend", function (e) {
      if (this$1.composing) {
        if (e.data != this$1.composing.data) {
          this$1.readFromDOMSoon();
        }
        this$1.composing.done = true;
      }
    });

    on(div, "touchstart", function () {
      return input.forceCompositionEnd();
    });

    on(div, "input", function () {
      if (!this$1.composing) {
        this$1.readFromDOMSoon();
      }
    });

    function onCopyCut(e) {
      if (signalDOMEvent(cm, e)) {
        return;
      }
      if (cm.somethingSelected()) {
        setLastCopied({ lineWise: false, text: cm.getSelections() });
        if (e.type == "cut") {
          cm.replaceSelection("", null, "cut");
        }
      } else if (!cm.options.lineWiseCopyCut) {
        return;
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({ lineWise: true, text: ranges.text });
        if (e.type == "cut") {
          cm.operation(function () {
            cm.setSelections(ranges.ranges, 0, sel_dontScroll);
            cm.replaceSelection("", null, "cut");
          });
        }
      }
      if (e.clipboardData) {
        e.clipboardData.clearData();
        var content = lastCopied.text.join("\n");
        // iOS exposes the clipboard API, but seems to discard content inserted into it
        e.clipboardData.setData("Text", content);
        if (e.clipboardData.getData("Text") == content) {
          e.preventDefault();
          return;
        }
      }
      // Old-fashioned briefly-focus-a-textarea hack
      var kludge = hiddenTextarea(),
          te = kludge.firstChild;
      cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
      te.value = lastCopied.text.join("\n");
      var hadFocus = document.activeElement;
      selectInput(te);
      setTimeout(function () {
        cm.display.lineSpace.removeChild(kludge);
        hadFocus.focus();
        if (hadFocus == div) {
          input.showPrimarySelection();
        }
      }, 50);
    }
    on(div, "copy", onCopyCut);
    on(div, "cut", onCopyCut);
  };

  ContentEditableInput.prototype.prepareSelection = function () {
    var result = prepareSelection(this.cm, false);
    result.focus = this.cm.state.focused;
    return result;
  };

  ContentEditableInput.prototype.showSelection = function (info, takeFocus) {
    if (!info || !this.cm.display.view.length) {
      return;
    }
    if (info.focus || takeFocus) {
      this.showPrimarySelection();
    }
    this.showMultipleSelections(info);
  };

  ContentEditableInput.prototype.showPrimarySelection = function () {
    var sel = window.getSelection(),
        cm = this.cm,
        prim = cm.doc.sel.primary();
    var from = prim.from(),
        to = prim.to();

    if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
      sel.removeAllRanges();
      return;
    }

    var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
      return;
    }

    var view = cm.display.view;
    var start = from.line >= cm.display.viewFrom && posToDOM(cm, from) || { node: view[0].measure.map[2], offset: 0 };
    var end = to.line < cm.display.viewTo && posToDOM(cm, to);
    if (!end) {
      var measure = view[view.length - 1].measure;
      var map$$1 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
      end = { node: map$$1[map$$1.length - 1], offset: map$$1[map$$1.length - 2] - map$$1[map$$1.length - 3] };
    }

    if (!start || !end) {
      sel.removeAllRanges();
      return;
    }

    var old = sel.rangeCount && sel.getRangeAt(0),
        rng;
    try {
      rng = range(start.node, start.offset, end.offset, end.node);
    } catch (e) {} // Our model of the DOM might be outdated, in which case the range we try to set can be impossible
    if (rng) {
      if (!gecko && cm.state.focused) {
        sel.collapse(start.node, start.offset);
        if (!rng.collapsed) {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
      } else {
        sel.removeAllRanges();
        sel.addRange(rng);
      }
      if (old && sel.anchorNode == null) {
        sel.addRange(old);
      } else if (gecko) {
        this.startGracePeriod();
      }
    }
    this.rememberSelection();
  };

  ContentEditableInput.prototype.startGracePeriod = function () {
    var this$1 = this;

    clearTimeout(this.gracePeriod);
    this.gracePeriod = setTimeout(function () {
      this$1.gracePeriod = false;
      if (this$1.selectionChanged()) {
        this$1.cm.operation(function () {
          return this$1.cm.curOp.selectionChanged = true;
        });
      }
    }, 20);
  };

  ContentEditableInput.prototype.showMultipleSelections = function (info) {
    removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
    removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
  };

  ContentEditableInput.prototype.rememberSelection = function () {
    var sel = window.getSelection();
    this.lastAnchorNode = sel.anchorNode;this.lastAnchorOffset = sel.anchorOffset;
    this.lastFocusNode = sel.focusNode;this.lastFocusOffset = sel.focusOffset;
  };

  ContentEditableInput.prototype.selectionInEditor = function () {
    var sel = window.getSelection();
    if (!sel.rangeCount) {
      return false;
    }
    var node = sel.getRangeAt(0).commonAncestorContainer;
    return contains(this.div, node);
  };

  ContentEditableInput.prototype.focus = function () {
    if (this.cm.options.readOnly != "nocursor") {
      if (!this.selectionInEditor()) {
        this.showSelection(this.prepareSelection(), true);
      }
      this.div.focus();
    }
  };
  ContentEditableInput.prototype.blur = function () {
    this.div.blur();
  };
  ContentEditableInput.prototype.getField = function () {
    return this.div;
  };

  ContentEditableInput.prototype.supportsTouch = function () {
    return true;
  };

  ContentEditableInput.prototype.receivedFocus = function () {
    var input = this;
    if (this.selectionInEditor()) {
      this.pollSelection();
    } else {
      runInOp(this.cm, function () {
        return input.cm.curOp.selectionChanged = true;
      });
    }

    function poll() {
      if (input.cm.state.focused) {
        input.pollSelection();
        input.polling.set(input.cm.options.pollInterval, poll);
      }
    }
    this.polling.set(this.cm.options.pollInterval, poll);
  };

  ContentEditableInput.prototype.selectionChanged = function () {
    var sel = window.getSelection();
    return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
  };

  ContentEditableInput.prototype.pollSelection = function () {
    if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
      return;
    }
    var sel = window.getSelection(),
        cm = this.cm;
    // On Android Chrome (version 56, at least), backspacing into an
    // uneditable block element will put the cursor in that element,
    // and then, because it's not editable, hide the virtual keyboard.
    // Because Android doesn't allow us to actually detect backspace
    // presses in a sane way, this code checks for when that happens
    // and simulates a backspace press in this case.
    if (android && chrome && this.cm.options.gutters.length && isInGutter(sel.anchorNode)) {
      this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs });
      this.blur();
      this.focus();
      return;
    }
    if (this.composing) {
      return;
    }
    this.rememberSelection();
    var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var head = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (anchor && head) {
      runInOp(cm, function () {
        setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
        if (anchor.bad || head.bad) {
          cm.curOp.selectionChanged = true;
        }
      });
    }
  };

  ContentEditableInput.prototype.pollContent = function () {
    if (this.readDOMTimeout != null) {
      clearTimeout(this.readDOMTimeout);
      this.readDOMTimeout = null;
    }

    var cm = this.cm,
        display = cm.display,
        sel = cm.doc.sel.primary();
    var from = sel.from(),
        to = sel.to();
    if (from.ch == 0 && from.line > cm.firstLine()) {
      from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length);
    }
    if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine()) {
      to = Pos(to.line + 1, 0);
    }
    if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
      return false;
    }

    var fromIndex, fromLine, fromNode;
    if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
      fromLine = lineNo(display.view[0].line);
      fromNode = display.view[0].node;
    } else {
      fromLine = lineNo(display.view[fromIndex].line);
      fromNode = display.view[fromIndex - 1].node.nextSibling;
    }
    var toIndex = findViewIndex(cm, to.line);
    var toLine, toNode;
    if (toIndex == display.view.length - 1) {
      toLine = display.viewTo - 1;
      toNode = display.lineDiv.lastChild;
    } else {
      toLine = lineNo(display.view[toIndex + 1].line) - 1;
      toNode = display.view[toIndex + 1].node.previousSibling;
    }

    if (!fromNode) {
      return false;
    }
    var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
    var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
    while (newText.length > 1 && oldText.length > 1) {
      if (lst(newText) == lst(oldText)) {
        newText.pop();oldText.pop();toLine--;
      } else if (newText[0] == oldText[0]) {
        newText.shift();oldText.shift();fromLine++;
      } else {
        break;
      }
    }

    var cutFront = 0,
        cutEnd = 0;
    var newTop = newText[0],
        oldTop = oldText[0],
        maxCutFront = Math.min(newTop.length, oldTop.length);
    while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
      ++cutFront;
    }
    var newBot = lst(newText),
        oldBot = lst(oldText);
    var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0), oldBot.length - (oldText.length == 1 ? cutFront : 0));
    while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
      ++cutEnd;
    }
    // Try to move start of change to start of selection if ambiguous
    if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
      while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
        cutFront--;
        cutEnd++;
      }
    }

    newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
    newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");

    var chFrom = Pos(fromLine, cutFront);
    var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
    if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
      replaceRange(cm.doc, newText, chFrom, chTo, "+input");
      return true;
    }
  };

  ContentEditableInput.prototype.ensurePolled = function () {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.reset = function () {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.forceCompositionEnd = function () {
    if (!this.composing) {
      return;
    }
    clearTimeout(this.readDOMTimeout);
    this.composing = null;
    this.updateFromDOM();
    this.div.blur();
    this.div.focus();
  };
  ContentEditableInput.prototype.readFromDOMSoon = function () {
    var this$1 = this;

    if (this.readDOMTimeout != null) {
      return;
    }
    this.readDOMTimeout = setTimeout(function () {
      this$1.readDOMTimeout = null;
      if (this$1.composing) {
        if (this$1.composing.done) {
          this$1.composing = null;
        } else {
          return;
        }
      }
      this$1.updateFromDOM();
    }, 80);
  };

  ContentEditableInput.prototype.updateFromDOM = function () {
    var this$1 = this;

    if (this.cm.isReadOnly() || !this.pollContent()) {
      runInOp(this.cm, function () {
        return regChange(this$1.cm);
      });
    }
  };

  ContentEditableInput.prototype.setUneditable = function (node) {
    node.contentEditable = "false";
  };

  ContentEditableInput.prototype.onKeyPress = function (e) {
    if (e.charCode == 0) {
      return;
    }
    e.preventDefault();
    if (!this.cm.isReadOnly()) {
      operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
    }
  };

  ContentEditableInput.prototype.readOnlyChanged = function (val) {
    this.div.contentEditable = String(val != "nocursor");
  };

  ContentEditableInput.prototype.onContextMenu = function () {};
  ContentEditableInput.prototype.resetPosition = function () {};

  ContentEditableInput.prototype.needsContentAttribute = true;

  function posToDOM(cm, pos) {
    var view = findViewForLine(cm, pos.line);
    if (!view || view.hidden) {
      return null;
    }
    var line = getLine(cm.doc, pos.line);
    var info = mapFromLineView(view, line, pos.line);

    var order = getOrder(line, cm.doc.direction),
        side = "left";
    if (order) {
      var partPos = getBidiPartAt(order, pos.ch);
      side = partPos % 2 ? "right" : "left";
    }
    var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
    result.offset = result.collapse == "right" ? result.end : result.start;
    return result;
  }

  function isInGutter(node) {
    for (var scan = node; scan; scan = scan.parentNode) {
      if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
        return true;
      }
    }
    return false;
  }

  function badPos(pos, bad) {
    if (bad) {
      pos.bad = true;
    }return pos;
  }

  function domTextBetween(cm, from, to, fromLine, toLine) {
    var text = "",
        closing = false,
        lineSep = cm.doc.lineSeparator();
    function recognizeMarker(id) {
      return function (marker) {
        return marker.id == id;
      };
    }
    function close() {
      if (closing) {
        text += lineSep;
        closing = false;
      }
    }
    function addText(str) {
      if (str) {
        close();
        text += str;
      }
    }
    function walk(node) {
      if (node.nodeType == 1) {
        var cmText = node.getAttribute("cm-text");
        if (cmText != null) {
          addText(cmText || node.textContent.replace(/\u200b/g, ""));
          return;
        }
        var markerID = node.getAttribute("cm-marker"),
            range$$1;
        if (markerID) {
          var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
          if (found.length && (range$$1 = found[0].find())) {
            addText(getBetween(cm.doc, range$$1.from, range$$1.to).join(lineSep));
          }
          return;
        }
        if (node.getAttribute("contenteditable") == "false") {
          return;
        }
        var isBlock = /^(pre|div|p)$/i.test(node.nodeName);
        if (isBlock) {
          close();
        }
        for (var i = 0; i < node.childNodes.length; i++) {
          walk(node.childNodes[i]);
        }
        if (isBlock) {
          closing = true;
        }
      } else if (node.nodeType == 3) {
        addText(node.nodeValue);
      }
    }
    for (;;) {
      walk(from);
      if (from == to) {
        break;
      }
      from = from.nextSibling;
    }
    return text;
  }

  function domToPos(cm, node, offset) {
    var lineNode;
    if (node == cm.display.lineDiv) {
      lineNode = cm.display.lineDiv.childNodes[offset];
      if (!lineNode) {
        return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
      }
      node = null;offset = 0;
    } else {
      for (lineNode = node;; lineNode = lineNode.parentNode) {
        if (!lineNode || lineNode == cm.display.lineDiv) {
          return null;
        }
        if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) {
          break;
        }
      }
    }
    for (var i = 0; i < cm.display.view.length; i++) {
      var lineView = cm.display.view[i];
      if (lineView.node == lineNode) {
        return locateNodeInLineView(lineView, node, offset);
      }
    }
  }

  function locateNodeInLineView(lineView, node, offset) {
    var wrapper = lineView.text.firstChild,
        bad = false;
    if (!node || !contains(wrapper, node)) {
      return badPos(Pos(lineNo(lineView.line), 0), true);
    }
    if (node == wrapper) {
      bad = true;
      node = wrapper.childNodes[offset];
      offset = 0;
      if (!node) {
        var line = lineView.rest ? lst(lineView.rest) : lineView.line;
        return badPos(Pos(lineNo(line), line.text.length), bad);
      }
    }

    var textNode = node.nodeType == 3 ? node : null,
        topNode = node;
    if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
      textNode = node.firstChild;
      if (offset) {
        offset = textNode.nodeValue.length;
      }
    }
    while (topNode.parentNode != wrapper) {
      topNode = topNode.parentNode;
    }
    var measure = lineView.measure,
        maps = measure.maps;

    function find(textNode, topNode, offset) {
      for (var i = -1; i < (maps ? maps.length : 0); i++) {
        var map$$1 = i < 0 ? measure.map : maps[i];
        for (var j = 0; j < map$$1.length; j += 3) {
          var curNode = map$$1[j + 2];
          if (curNode == textNode || curNode == topNode) {
            var line = lineNo(i < 0 ? lineView.line : lineView.rest[i]);
            var ch = map$$1[j] + offset;
            if (offset < 0 || curNode != textNode) {
              ch = map$$1[j + (offset ? 1 : 0)];
            }
            return Pos(line, ch);
          }
        }
      }
    }
    var found = find(textNode, topNode, offset);
    if (found) {
      return badPos(found, bad);
    }

    // FIXME this is all really shaky. might handle the few cases it needs to handle, but likely to cause problems
    for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
      found = find(after, after.firstChild, 0);
      if (found) {
        return badPos(Pos(found.line, found.ch - dist), bad);
      } else {
        dist += after.textContent.length;
      }
    }
    for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
      found = find(before, before.firstChild, -1);
      if (found) {
        return badPos(Pos(found.line, found.ch + dist$1), bad);
      } else {
        dist$1 += before.textContent.length;
      }
    }
  }

  // TEXTAREA INPUT STYLE

  var TextareaInput = function (cm) {
    this.cm = cm;
    // See input.poll and input.reset
    this.prevInput = "";

    // Flag that indicates whether we expect input to appear real soon
    // now (after some event like 'keypress' or 'input') and are
    // polling intensively.
    this.pollingFast = false;
    // Self-resetting timeout for the poller
    this.polling = new Delayed();
    // Tracks when input.reset has punted to just putting a short
    // string into the textarea instead of the full selection.
    this.inaccurateSelection = false;
    // Used to work around IE issue with selection being forgotten when focus moves away from textarea
    this.hasSelection = false;
    this.composing = null;
  };

  TextareaInput.prototype.init = function (display) {
    var this$1 = this;

    var input = this,
        cm = this.cm;

    // Wraps and hides input textarea
    var div = this.wrapper = hiddenTextarea();
    // The semihidden textarea that is focused when the editor is
    // focused, and receives input.
    var te = this.textarea = div.firstChild;
    display.wrapper.insertBefore(div, display.wrapper.firstChild);

    // Needed to hide big blue blinking cursor on Mobile Safari (doesn't seem to work in iOS 8 anymore)
    if (ios) {
      te.style.width = "0px";
    }

    on(te, "input", function () {
      if (ie && ie_version >= 9 && this$1.hasSelection) {
        this$1.hasSelection = null;
      }
      input.poll();
    });

    on(te, "paste", function (e) {
      if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
        return;
      }

      cm.state.pasteIncoming = true;
      input.fastPoll();
    });

    function prepareCopyCut(e) {
      if (signalDOMEvent(cm, e)) {
        return;
      }
      if (cm.somethingSelected()) {
        setLastCopied({ lineWise: false, text: cm.getSelections() });
        if (input.inaccurateSelection) {
          input.prevInput = "";
          input.inaccurateSelection = false;
          te.value = lastCopied.text.join("\n");
          selectInput(te);
        }
      } else if (!cm.options.lineWiseCopyCut) {
        return;
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({ lineWise: true, text: ranges.text });
        if (e.type == "cut") {
          cm.setSelections(ranges.ranges, null, sel_dontScroll);
        } else {
          input.prevInput = "";
          te.value = ranges.text.join("\n");
          selectInput(te);
        }
      }
      if (e.type == "cut") {
        cm.state.cutIncoming = true;
      }
    }
    on(te, "cut", prepareCopyCut);
    on(te, "copy", prepareCopyCut);

    on(display.scroller, "paste", function (e) {
      if (eventInWidget(display, e) || signalDOMEvent(cm, e)) {
        return;
      }
      cm.state.pasteIncoming = true;
      input.focus();
    });

    // Prevent normal selection in the editor (we handle our own)
    on(display.lineSpace, "selectstart", function (e) {
      if (!eventInWidget(display, e)) {
        e_preventDefault(e);
      }
    });

    on(te, "compositionstart", function () {
      var start = cm.getCursor("from");
      if (input.composing) {
        input.composing.range.clear();
      }
      input.composing = {
        start: start,
        range: cm.markText(start, cm.getCursor("to"), { className: "CodeMirror-composing" })
      };
    });
    on(te, "compositionend", function () {
      if (input.composing) {
        input.poll();
        input.composing.range.clear();
        input.composing = null;
      }
    });
  };

  TextareaInput.prototype.prepareSelection = function () {
    // Redraw the selection and/or cursor
    var cm = this.cm,
        display = cm.display,
        doc = cm.doc;
    var result = prepareSelection(cm);

    // Move the hidden textarea near the cursor to prevent scrolling artifacts
    if (cm.options.moveInputWithCursor) {
      var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
      var wrapOff = display.wrapper.getBoundingClientRect(),
          lineOff = display.lineDiv.getBoundingClientRect();
      result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
      result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
    }

    return result;
  };

  TextareaInput.prototype.showSelection = function (drawn) {
    var cm = this.cm,
        display = cm.display;
    removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
    removeChildrenAndAdd(display.selectionDiv, drawn.selection);
    if (drawn.teTop != null) {
      this.wrapper.style.top = drawn.teTop + "px";
      this.wrapper.style.left = drawn.teLeft + "px";
    }
  };

  // Reset the input to correspond to the selection (or to be empty,
  // when not typing and nothing is selected)
  TextareaInput.prototype.reset = function (typing) {
    if (this.contextMenuPending) {
      return;
    }
    var minimal,
        selected,
        cm = this.cm,
        doc = cm.doc;
    if (cm.somethingSelected()) {
      this.prevInput = "";
      var range$$1 = doc.sel.primary();
      minimal = hasCopyEvent && (range$$1.to().line - range$$1.from().line > 100 || (selected = cm.getSelection()).length > 1000);
      var content = minimal ? "-" : selected || cm.getSelection();
      this.textarea.value = content;
      if (cm.state.focused) {
        selectInput(this.textarea);
      }
      if (ie && ie_version >= 9) {
        this.hasSelection = content;
      }
    } else if (!typing) {
      this.prevInput = this.textarea.value = "";
      if (ie && ie_version >= 9) {
        this.hasSelection = null;
      }
    }
    this.inaccurateSelection = minimal;
  };

  TextareaInput.prototype.getField = function () {
    return this.textarea;
  };

  TextareaInput.prototype.supportsTouch = function () {
    return false;
  };

  TextareaInput.prototype.focus = function () {
    if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
      try {
        this.textarea.focus();
      } catch (e) {} // IE8 will throw if the textarea is display: none or not in DOM
    }
  };

  TextareaInput.prototype.blur = function () {
    this.textarea.blur();
  };

  TextareaInput.prototype.resetPosition = function () {
    this.wrapper.style.top = this.wrapper.style.left = 0;
  };

  TextareaInput.prototype.receivedFocus = function () {
    this.slowPoll();
  };

  // Poll for input changes, using the normal rate of polling. This
  // runs as long as the editor is focused.
  TextareaInput.prototype.slowPoll = function () {
    var this$1 = this;

    if (this.pollingFast) {
      return;
    }
    this.polling.set(this.cm.options.pollInterval, function () {
      this$1.poll();
      if (this$1.cm.state.focused) {
        this$1.slowPoll();
      }
    });
  };

  // When an event has just come in that is likely to add or change
  // something in the input textarea, we poll faster, to ensure that
  // the change appears on the screen quickly.
  TextareaInput.prototype.fastPoll = function () {
    var missed = false,
        input = this;
    input.pollingFast = true;
    function p() {
      var changed = input.poll();
      if (!changed && !missed) {
        missed = true;input.polling.set(60, p);
      } else {
        input.pollingFast = false;input.slowPoll();
      }
    }
    input.polling.set(20, p);
  };

  // Read input from the textarea, and update the document to match.
  // When something is selected, it is present in the textarea, and
  // selected (unless it is huge, in which case a placeholder is
  // used). When nothing is selected, the cursor sits after previously
  // seen text (can be empty), which is stored in prevInput (we must
  // not reset the textarea when typing, because that breaks IME).
  TextareaInput.prototype.poll = function () {
    var this$1 = this;

    var cm = this.cm,
        input = this.textarea,
        prevInput = this.prevInput;
    // Since this is called a *lot*, try to bail out as cheaply as
    // possible when it is clear that nothing happened. hasSelection
    // will be the case when there is a lot of text in the textarea,
    // in which case reading its value would be expensive.
    if (this.contextMenuPending || !cm.state.focused || hasSelection(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) {
      return false;
    }

    var text = input.value;
    // If nothing changed, bail.
    if (text == prevInput && !cm.somethingSelected()) {
      return false;
    }
    // Work around nonsensical selection resetting in IE9/10, and
    // inexplicable appearance of private area unicode characters on
    // some key combos in Mac (#2689).
    if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
      cm.display.input.reset();
      return false;
    }

    if (cm.doc.sel == cm.display.selForContextMenu) {
      var first = text.charCodeAt(0);
      if (first == 0x200b && !prevInput) {
        prevInput = "\u200b";
      }
      if (first == 0x21da) {
        this.reset();return this.cm.execCommand("undo");
      }
    }
    // Find the part of the input that is actually new
    var same = 0,
        l = Math.min(prevInput.length, text.length);
    while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
      ++same;
    }

    runInOp(cm, function () {
      applyTextInput(cm, text.slice(same), prevInput.length - same, null, this$1.composing ? "*compose" : null);

      // Don't leave long text in the textarea, since it makes further polling slow
      if (text.length > 1000 || text.indexOf("\n") > -1) {
        input.value = this$1.prevInput = "";
      } else {
        this$1.prevInput = text;
      }

      if (this$1.composing) {
        this$1.composing.range.clear();
        this$1.composing.range = cm.markText(this$1.composing.start, cm.getCursor("to"), { className: "CodeMirror-composing" });
      }
    });
    return true;
  };

  TextareaInput.prototype.ensurePolled = function () {
    if (this.pollingFast && this.poll()) {
      this.pollingFast = false;
    }
  };

  TextareaInput.prototype.onKeyPress = function () {
    if (ie && ie_version >= 9) {
      this.hasSelection = null;
    }
    this.fastPoll();
  };

  TextareaInput.prototype.onContextMenu = function (e) {
    var input = this,
        cm = input.cm,
        display = cm.display,
        te = input.textarea;
    var pos = posFromMouse(cm, e),
        scrollPos = display.scroller.scrollTop;
    if (!pos || presto) {
      return;
    } // Opera is difficult.

    // Reset the current text selection only if the click is done outside of the selection
    // and 'resetSelectionOnContextMenu' option is true.
    var reset = cm.options.resetSelectionOnContextMenu;
    if (reset && cm.doc.sel.contains(pos) == -1) {
      operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
    }

    var oldCSS = te.style.cssText,
        oldWrapperCSS = input.wrapper.style.cssText;
    input.wrapper.style.cssText = "position: absolute";
    var wrapperBox = input.wrapper.getBoundingClientRect();
    te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
    var oldScrollY;
    if (webkit) {
      oldScrollY = window.scrollY;
    } // Work around Chrome issue (#2712)
    display.input.focus();
    if (webkit) {
      window.scrollTo(null, oldScrollY);
    }
    display.input.reset();
    // Adds "Select all" to context menu in FF
    if (!cm.somethingSelected()) {
      te.value = input.prevInput = " ";
    }
    input.contextMenuPending = true;
    display.selForContextMenu = cm.doc.sel;
    clearTimeout(display.detectingSelectAll);

    // Select-all will be greyed out if there's nothing to select, so
    // this adds a zero-width space so that we can later check whether
    // it got selected.
    function prepareSelectAllHack() {
      if (te.selectionStart != null) {
        var selected = cm.somethingSelected();
        var extval = "\u200b" + (selected ? te.value : "");
        te.value = "\u21da"; // Used to catch context-menu undo
        te.value = extval;
        input.prevInput = selected ? "" : "\u200b";
        te.selectionStart = 1;te.selectionEnd = extval.length;
        // Re-set this, in case some other handler touched the
        // selection in the meantime.
        display.selForContextMenu = cm.doc.sel;
      }
    }
    function rehide() {
      input.contextMenuPending = false;
      input.wrapper.style.cssText = oldWrapperCSS;
      te.style.cssText = oldCSS;
      if (ie && ie_version < 9) {
        display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
      }

      // Try to detect the user choosing select-all
      if (te.selectionStart != null) {
        if (!ie || ie && ie_version < 9) {
          prepareSelectAllHack();
        }
        var i = 0,
            poll = function () {
          if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200b") {
            operation(cm, selectAll)(cm);
          } else if (i++ < 10) {
            display.detectingSelectAll = setTimeout(poll, 500);
          } else {
            display.selForContextMenu = null;
            display.input.reset();
          }
        };
        display.detectingSelectAll = setTimeout(poll, 200);
      }
    }

    if (ie && ie_version >= 9) {
      prepareSelectAllHack();
    }
    if (captureRightClick) {
      e_stop(e);
      var mouseup = function () {
        off(window, "mouseup", mouseup);
        setTimeout(rehide, 20);
      };
      on(window, "mouseup", mouseup);
    } else {
      setTimeout(rehide, 50);
    }
  };

  TextareaInput.prototype.readOnlyChanged = function (val) {
    if (!val) {
      this.reset();
    }
  };

  TextareaInput.prototype.setUneditable = function () {};

  TextareaInput.prototype.needsContentAttribute = false;

  function fromTextArea(textarea, options) {
    options = options ? copyObj(options) : {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabIndex) {
      options.tabindex = textarea.tabIndex;
    }
    if (!options.placeholder && textarea.placeholder) {
      options.placeholder = textarea.placeholder;
    }
    // Set autofocus to true if this textarea is focused, or if it has
    // autofocus and no other element is focused.
    if (options.autofocus == null) {
      var hasFocus = activeElt();
      options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
    }

    function save() {
      textarea.value = cm.getValue();
    }

    var realSubmit;
    if (textarea.form) {
      on(textarea.form, "submit", save);
      // Deplorable hack to make the submit method do the right thing.
      if (!options.leaveSubmitMethodAlone) {
        var form = textarea.form;
        realSubmit = form.submit;
        try {
          var wrappedSubmit = form.submit = function () {
            save();
            form.submit = realSubmit;
            form.submit();
            form.submit = wrappedSubmit;
          };
        } catch (e) {}
      }
    }

    options.finishInit = function (cm) {
      cm.save = save;
      cm.getTextArea = function () {
        return textarea;
      };
      cm.toTextArea = function () {
        cm.toTextArea = isNaN; // Prevent this from being ran twice
        save();
        textarea.parentNode.removeChild(cm.getWrapperElement());
        textarea.style.display = "";
        if (textarea.form) {
          off(textarea.form, "submit", save);
          if (typeof textarea.form.submit == "function") {
            textarea.form.submit = realSubmit;
          }
        }
      };
    };

    textarea.style.display = "none";
    var cm = CodeMirror$1(function (node) {
      return textarea.parentNode.insertBefore(node, textarea.nextSibling);
    }, options);
    return cm;
  }

  function addLegacyProps(CodeMirror) {
    CodeMirror.off = off;
    CodeMirror.on = on;
    CodeMirror.wheelEventPixels = wheelEventPixels;
    CodeMirror.Doc = Doc;
    CodeMirror.splitLines = splitLinesAuto;
    CodeMirror.countColumn = countColumn;
    CodeMirror.findColumn = findColumn;
    CodeMirror.isWordChar = isWordCharBasic;
    CodeMirror.Pass = Pass;
    CodeMirror.signal = signal;
    CodeMirror.Line = Line;
    CodeMirror.changeEnd = changeEnd;
    CodeMirror.scrollbarModel = scrollbarModel;
    CodeMirror.Pos = Pos;
    CodeMirror.cmpPos = cmp;
    CodeMirror.modes = modes;
    CodeMirror.mimeModes = mimeModes;
    CodeMirror.resolveMode = resolveMode;
    CodeMirror.getMode = getMode;
    CodeMirror.modeExtensions = modeExtensions;
    CodeMirror.extendMode = extendMode;
    CodeMirror.copyState = copyState;
    CodeMirror.startState = startState;
    CodeMirror.innerMode = innerMode;
    CodeMirror.commands = commands;
    CodeMirror.keyMap = keyMap;
    CodeMirror.keyName = keyName;
    CodeMirror.isModifierKey = isModifierKey;
    CodeMirror.lookupKey = lookupKey;
    CodeMirror.normalizeKeyMap = normalizeKeyMap;
    CodeMirror.StringStream = StringStream;
    CodeMirror.SharedTextMarker = SharedTextMarker;
    CodeMirror.TextMarker = TextMarker;
    CodeMirror.LineWidget = LineWidget;
    CodeMirror.e_preventDefault = e_preventDefault;
    CodeMirror.e_stopPropagation = e_stopPropagation;
    CodeMirror.e_stop = e_stop;
    CodeMirror.addClass = addClass;
    CodeMirror.contains = contains;
    CodeMirror.rmClass = rmClass;
    CodeMirror.keyNames = keyNames;
  }

  // EDITOR CONSTRUCTOR

  defineOptions(CodeMirror$1);

  addEditorMethods(CodeMirror$1);

  // Set up methods on CodeMirror's prototype to redirect to the editor's document.
  var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
  for (var prop in Doc.prototype) {
    if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
      CodeMirror$1.prototype[prop] = function (method) {
        return function () {
          return method.apply(this.doc, arguments);
        };
      }(Doc.prototype[prop]);
    }
  }

  eventMixin(Doc);

  // INPUT HANDLING

  CodeMirror$1.inputStyles = { "textarea": TextareaInput, "contenteditable": ContentEditableInput };

  // MODE DEFINITION AND QUERYING

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  CodeMirror$1.defineMode = function (name /*, mode, …*/) {
    if (!CodeMirror$1.defaults.mode && name != "null") {
      CodeMirror$1.defaults.mode = name;
    }
    defineMode.apply(this, arguments);
  };

  CodeMirror$1.defineMIME = defineMIME;

  // Minimal default mode.
  CodeMirror$1.defineMode("null", function () {
    return { token: function (stream) {
        return stream.skipToEnd();
      } };
  });
  CodeMirror$1.defineMIME("text/plain", "null");

  // EXTENSIONS

  CodeMirror$1.defineExtension = function (name, func) {
    CodeMirror$1.prototype[name] = func;
  };
  CodeMirror$1.defineDocExtension = function (name, func) {
    Doc.prototype[name] = func;
  };

  CodeMirror$1.fromTextArea = fromTextArea;

  addLegacyProps(CodeMirror$1);

  CodeMirror$1.version = "5.25.2";

  return CodeMirror$1;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
    ["main.fonts"]: null
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
var RE = __webpack_require__(0);
module.exports = RE.$P['CodeMirror'] = window.CodeMirror = __webpack_require__(2);
__webpack_require__(11);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

let RE = __webpack_require__(0);
RE.$B.push(function () {
  if (RE.$C['main.fonts']) {
    window.WebFont.load({
      google: {
        families: RE.$C['main.fonts']
      }
    });
  };
});

window.addEventListener('load', RE.bootstrap.bind(RE), false);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var R = module.exports = {};
R.$H = [];
R.addHandle = function (sig, fn) {
    R.$H.push([sig, fn]);
};

R.get = function (name) {
    try {
        R.$H.forEach(function (value) {
            var sig = value[0],
                fn = value[1];
            if (match = name.match(sig)) {
                throw fn(match);
            }
        });
    } catch (e) {
        return e;
    }
    throw "can't find " + name;
};

R.addHandle(/^\+(.*)$/, function (match) {
    url = match[1];
    if (url.indexOf("/") == -1) {
        return function (next) {
            RE.$L.script("https://unpkg.com/" + url, next);
        };
    }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* axios v0.16.1 | (c) 2017 by Matt Zabriskie */
!function (t, e) {
	 true ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.axios = e() : t.axios = e();
}(this, function () {
	return function (t) {
		function e(n) {
			if (r[n]) return r[n].exports;var o = r[n] = { exports: {}, id: n, loaded: !1 };return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports;
		}var r = {};return e.m = t, e.c = r, e.p = "", e(0);
	}([function (t, e, r) {
		t.exports = r(1);
	}, function (t, e, r) {
		"use strict";
		function n(t) {
			var e = new s(t),
			    r = i(s.prototype.request, e);return o.extend(r, s.prototype, e), o.extend(r, e), r;
		}var o = r(2),
		    i = r(7),
		    s = r(8),
		    u = r(9),
		    f = n(u);f.Axios = s, f.create = function (t) {
			return n(o.merge(u, t));
		}, f.Cancel = r(26), f.CancelToken = r(27), f.isCancel = r(23), f.all = function (t) {
			return Promise.all(t);
		}, f.spread = r(28), t.exports = f, t.exports.default = f;
	}, function (t, e, r) {
		(function (e) {
			"use strict";
			function n(t) {
				return "[object Array]" === _.call(t);
			}function o(t) {
				return "undefined" != typeof e && e.isBuffer && e.isBuffer(t);
			}function i(t) {
				return "[object ArrayBuffer]" === _.call(t);
			}function s(t) {
				return "undefined" != typeof FormData && t instanceof FormData;
			}function u(t) {
				var e;return e = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && t.buffer instanceof ArrayBuffer;
			}function f(t) {
				return "string" == typeof t;
			}function a(t) {
				return "number" == typeof t;
			}function c(t) {
				return "undefined" == typeof t;
			}function h(t) {
				return null !== t && "object" == typeof t;
			}function p(t) {
				return "[object Date]" === _.call(t);
			}function l(t) {
				return "[object File]" === _.call(t);
			}function d(t) {
				return "[object Blob]" === _.call(t);
			}function g(t) {
				return "[object Function]" === _.call(t);
			}function y(t) {
				return h(t) && g(t.pipe);
			}function w(t) {
				return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams;
			}function v(t) {
				return t.replace(/^\s*/, "").replace(/\s*$/, "");
			}function m() {
				return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
			}function E(t, e) {
				if (null !== t && "undefined" != typeof t) if ("object" == typeof t || n(t) || (t = [t]), n(t)) for (var r = 0, o = t.length; r < o; r++) e.call(null, t[r], r, t);else for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.call(null, t[i], i, t);
			}function A() {
				function t(t, r) {
					"object" == typeof e[r] && "object" == typeof t ? e[r] = A(e[r], t) : e[r] = t;
				}for (var e = {}, r = 0, n = arguments.length; r < n; r++) E(arguments[r], t);return e;
			}function b(t, e, r) {
				return E(e, function (e, n) {
					r && "function" == typeof e ? t[n] = R(e, r) : t[n] = e;
				}), t;
			}var R = r(7),
			    _ = Object.prototype.toString;t.exports = { isArray: n, isArrayBuffer: i, isBuffer: o, isFormData: s, isArrayBufferView: u, isString: f, isNumber: a, isObject: h, isUndefined: c, isDate: p, isFile: l, isBlob: d, isFunction: g, isStream: y, isURLSearchParams: w, isStandardBrowserEnv: m, forEach: E, merge: A, extend: b, trim: v };
		}).call(e, r(3).Buffer);
	}, function (t, e, r) {
		(function (t) {
			/*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */
			"use strict";
			function n() {
				try {
					var t = new Uint8Array(1);return t.__proto__ = { __proto__: Uint8Array.prototype, foo: function () {
							return 42;
						} }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
				} catch (t) {
					return !1;
				}
			}function o() {
				return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
			}function i(t, e) {
				if (o() < e) throw new RangeError("Invalid typed array length");return s.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = s.prototype) : (null === t && (t = new s(e)), t.length = e), t;
			}function s(t, e, r) {
				if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(t, e, r);if ("number" == typeof t) {
					if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");return c(this, t);
				}return u(this, t, e, r);
			}function u(t, e, r, n) {
				if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? l(t, e, r, n) : "string" == typeof e ? h(t, e, r) : d(t, e);
			}function f(t) {
				if ("number" != typeof t) throw new TypeError('"size" argument must be a number');if (t < 0) throw new RangeError('"size" argument must not be negative');
			}function a(t, e, r, n) {
				return f(e), e <= 0 ? i(t, e) : void 0 !== r ? "string" == typeof n ? i(t, e).fill(r, n) : i(t, e).fill(r) : i(t, e);
			}function c(t, e) {
				if (f(e), t = i(t, e < 0 ? 0 : 0 | g(e)), !s.TYPED_ARRAY_SUPPORT) for (var r = 0; r < e; ++r) t[r] = 0;return t;
			}function h(t, e, r) {
				if ("string" == typeof r && "" !== r || (r = "utf8"), !s.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');var n = 0 | w(e, r);t = i(t, n);var o = t.write(e, r);return o !== n && (t = t.slice(0, o)), t;
			}function p(t, e) {
				var r = e.length < 0 ? 0 : 0 | g(e.length);t = i(t, r);for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];return t;
			}function l(t, e, r, n) {
				if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n), s.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = s.prototype) : t = p(t, e), t;
			}function d(t, e) {
				if (s.isBuffer(e)) {
					var r = 0 | g(e.length);return t = i(t, r), 0 === t.length ? t : (e.copy(t, 0, 0, r), t);
				}if (e) {
					if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || G(e.length) ? i(t, 0) : p(t, e);if ("Buffer" === e.type && W(e.data)) return p(t, e.data);
				}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
			}function g(t) {
				if (t >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");return 0 | t;
			}function y(t) {
				return +t != t && (t = 0), s.alloc(+t);
			}function w(t, e) {
				if (s.isBuffer(t)) return t.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;"string" != typeof t && (t = "" + t);var r = t.length;if (0 === r) return 0;for (var n = !1;;) switch (e) {case "ascii":case "latin1":case "binary":
						return r;case "utf8":case "utf-8":case void 0:
						return H(t).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
						return 2 * r;case "hex":
						return r >>> 1;case "base64":
						return $(t).length;default:
						if (n) return H(t).length;e = ("" + e).toLowerCase(), n = !0;}
			}function v(t, e, r) {
				var n = !1;if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";if (r >>>= 0, e >>>= 0, r <= e) return "";for (t || (t = "utf8");;) switch (t) {case "hex":
						return L(this, e, r);case "utf8":case "utf-8":
						return x(this, e, r);case "ascii":
						return C(this, e, r);case "latin1":case "binary":
						return I(this, e, r);case "base64":
						return P(this, e, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
						return O(this, e, r);default:
						if (n) throw new TypeError("Unknown encoding: " + t);t = (t + "").toLowerCase(), n = !0;}
			}function m(t, e, r) {
				var n = t[e];t[e] = t[r], t[r] = n;
			}function E(t, e, r, n, o) {
				if (0 === t.length) return -1;if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
					if (o) return -1;r = t.length - 1;
				} else if (r < 0) {
					if (!o) return -1;r = 0;
				}if ("string" == typeof e && (e = s.from(e, n)), s.isBuffer(e)) return 0 === e.length ? -1 : A(t, e, r, n, o);if ("number" == typeof e) return e &= 255, s.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : A(t, [e], r, n, o);throw new TypeError("val must be string, number or Buffer");
			}function A(t, e, r, n, o) {
				function i(t, e) {
					return 1 === s ? t[e] : t.readUInt16BE(e * s);
				}var s = 1,
				    u = t.length,
				    f = e.length;if (void 0 !== n && (n = String(n).toLowerCase(), "ucs2" === n || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
					if (t.length < 2 || e.length < 2) return -1;s = 2, u /= 2, f /= 2, r /= 2;
				}var a;if (o) {
					var c = -1;for (a = r; a < u; a++) if (i(t, a) === i(e, c === -1 ? 0 : a - c)) {
						if (c === -1 && (c = a), a - c + 1 === f) return c * s;
					} else c !== -1 && (a -= a - c), c = -1;
				} else for (r + f > u && (r = u - f), a = r; a >= 0; a--) {
					for (var h = !0, p = 0; p < f; p++) if (i(t, a + p) !== i(e, p)) {
						h = !1;break;
					}if (h) return a;
				}return -1;
			}function b(t, e, r, n) {
				r = Number(r) || 0;var o = t.length - r;n ? (n = Number(n), n > o && (n = o)) : n = o;var i = e.length;if (i % 2 !== 0) throw new TypeError("Invalid hex string");n > i / 2 && (n = i / 2);for (var s = 0; s < n; ++s) {
					var u = parseInt(e.substr(2 * s, 2), 16);if (isNaN(u)) return s;t[r + s] = u;
				}return s;
			}function R(t, e, r, n) {
				return K(H(e, t.length - r), t, r, n);
			}function _(t, e, r, n) {
				return K(V(e), t, r, n);
			}function T(t, e, r, n) {
				return _(t, e, r, n);
			}function B(t, e, r, n) {
				return K($(e), t, r, n);
			}function S(t, e, r, n) {
				return K(J(e, t.length - r), t, r, n);
			}function P(t, e, r) {
				return 0 === e && r === t.length ? Z.fromByteArray(t) : Z.fromByteArray(t.slice(e, r));
			}function x(t, e, r) {
				r = Math.min(t.length, r);for (var n = [], o = e; o < r;) {
					var i = t[o],
					    s = null,
					    u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;if (o + u <= r) {
						var f, a, c, h;switch (u) {case 1:
								i < 128 && (s = i);break;case 2:
								f = t[o + 1], 128 === (192 & f) && (h = (31 & i) << 6 | 63 & f, h > 127 && (s = h));break;case 3:
								f = t[o + 1], a = t[o + 2], 128 === (192 & f) && 128 === (192 & a) && (h = (15 & i) << 12 | (63 & f) << 6 | 63 & a, h > 2047 && (h < 55296 || h > 57343) && (s = h));break;case 4:
								f = t[o + 1], a = t[o + 2], c = t[o + 3], 128 === (192 & f) && 128 === (192 & a) && 128 === (192 & c) && (h = (15 & i) << 18 | (63 & f) << 12 | (63 & a) << 6 | 63 & c, h > 65535 && h < 1114112 && (s = h));}
					}null === s ? (s = 65533, u = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), o += u;
				}return U(n);
			}function U(t) {
				var e = t.length;if (e <= tt) return String.fromCharCode.apply(String, t);for (var r = "", n = 0; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += tt));return r;
			}function C(t, e, r) {
				var n = "";r = Math.min(t.length, r);for (var o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);return n;
			}function I(t, e, r) {
				var n = "";r = Math.min(t.length, r);for (var o = e; o < r; ++o) n += String.fromCharCode(t[o]);return n;
			}function L(t, e, r) {
				var n = t.length;(!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);for (var o = "", i = e; i < r; ++i) o += X(t[i]);return o;
			}function O(t, e, r) {
				for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);return o;
			}function Y(t, e, r) {
				if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
			}function D(t, e, r, n, o, i) {
				if (!s.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');if (r + n > t.length) throw new RangeError("Index out of range");
			}function N(t, e, r, n) {
				e < 0 && (e = 65535 + e + 1);for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o) t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o);
			}function j(t, e, r, n) {
				e < 0 && (e = 4294967295 + e + 1);for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o) t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255;
			}function M(t, e, r, n, o, i) {
				if (r + n > t.length) throw new RangeError("Index out of range");if (r < 0) throw new RangeError("Index out of range");
			}function k(t, e, r, n, o) {
				return o || M(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), Q.write(t, e, r, n, 23, 4), r + 4;
			}function q(t, e, r, n, o) {
				return o || M(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), Q.write(t, e, r, n, 52, 8), r + 8;
			}function F(t) {
				if (t = z(t).replace(et, ""), t.length < 2) return "";for (; t.length % 4 !== 0;) t += "=";return t;
			}function z(t) {
				return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
			}function X(t) {
				return t < 16 ? "0" + t.toString(16) : t.toString(16);
			}function H(t, e) {
				e = e || 1 / 0;for (var r, n = t.length, o = null, i = [], s = 0; s < n; ++s) {
					if (r = t.charCodeAt(s), r > 55295 && r < 57344) {
						if (!o) {
							if (r > 56319) {
								(e -= 3) > -1 && i.push(239, 191, 189);continue;
							}if (s + 1 === n) {
								(e -= 3) > -1 && i.push(239, 191, 189);continue;
							}o = r;continue;
						}if (r < 56320) {
							(e -= 3) > -1 && i.push(239, 191, 189), o = r;continue;
						}r = (o - 55296 << 10 | r - 56320) + 65536;
					} else o && (e -= 3) > -1 && i.push(239, 191, 189);if (o = null, r < 128) {
						if ((e -= 1) < 0) break;i.push(r);
					} else if (r < 2048) {
						if ((e -= 2) < 0) break;i.push(r >> 6 | 192, 63 & r | 128);
					} else if (r < 65536) {
						if ((e -= 3) < 0) break;i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
					} else {
						if (!(r < 1114112)) throw new Error("Invalid code point");if ((e -= 4) < 0) break;i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
					}
				}return i;
			}function V(t) {
				for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));return e;
			}function J(t, e) {
				for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = t.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);return i;
			}function $(t) {
				return Z.toByteArray(F(t));
			}function K(t, e, r, n) {
				for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) e[o + r] = t[o];return o;
			}function G(t) {
				return t !== t;
			}var Z = r(4),
			    Q = r(5),
			    W = r(6);e.Buffer = s, e.SlowBuffer = y, e.INSPECT_MAX_BYTES = 50, s.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : n(), e.kMaxLength = o(), s.poolSize = 8192, s._augment = function (t) {
				return t.__proto__ = s.prototype, t;
			}, s.from = function (t, e, r) {
				return u(null, t, e, r);
			}, s.TYPED_ARRAY_SUPPORT && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, { value: null, configurable: !0 })), s.alloc = function (t, e, r) {
				return a(null, t, e, r);
			}, s.allocUnsafe = function (t) {
				return c(null, t);
			}, s.allocUnsafeSlow = function (t) {
				return c(null, t);
			}, s.isBuffer = function (t) {
				return !(null == t || !t._isBuffer);
			}, s.compare = function (t, e) {
				if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");if (t === e) return 0;for (var r = t.length, n = e.length, o = 0, i = Math.min(r, n); o < i; ++o) if (t[o] !== e[o]) {
					r = t[o], n = e[o];break;
				}return r < n ? -1 : n < r ? 1 : 0;
			}, s.isEncoding = function (t) {
				switch (String(t).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
						return !0;default:
						return !1;}
			}, s.concat = function (t, e) {
				if (!W(t)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === t.length) return s.alloc(0);var r;if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;var n = s.allocUnsafe(e),
				    o = 0;for (r = 0; r < t.length; ++r) {
					var i = t[r];if (!s.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n, o), o += i.length;
				}return n;
			}, s.byteLength = w, s.prototype._isBuffer = !0, s.prototype.swap16 = function () {
				var t = this.length;if (t % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var e = 0; e < t; e += 2) m(this, e, e + 1);return this;
			}, s.prototype.swap32 = function () {
				var t = this.length;if (t % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var e = 0; e < t; e += 4) m(this, e, e + 3), m(this, e + 1, e + 2);return this;
			}, s.prototype.swap64 = function () {
				var t = this.length;if (t % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var e = 0; e < t; e += 8) m(this, e, e + 7), m(this, e + 1, e + 6), m(this, e + 2, e + 5), m(this, e + 3, e + 4);return this;
			}, s.prototype.toString = function () {
				var t = 0 | this.length;return 0 === t ? "" : 0 === arguments.length ? x(this, 0, t) : v.apply(this, arguments);
			}, s.prototype.equals = function (t) {
				if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");return this === t || 0 === s.compare(this, t);
			}, s.prototype.inspect = function () {
				var t = "",
				    r = e.INSPECT_MAX_BYTES;return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">";
			}, s.prototype.compare = function (t, e, r, n, o) {
				if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), e < 0 || r > t.length || n < 0 || o > this.length) throw new RangeError("out of range index");if (n >= o && e >= r) return 0;if (n >= o) return -1;if (e >= r) return 1;if (e >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === t) return 0;for (var i = o - n, u = r - e, f = Math.min(i, u), a = this.slice(n, o), c = t.slice(e, r), h = 0; h < f; ++h) if (a[h] !== c[h]) {
					i = a[h], u = c[h];break;
				}return i < u ? -1 : u < i ? 1 : 0;
			}, s.prototype.includes = function (t, e, r) {
				return this.indexOf(t, e, r) !== -1;
			}, s.prototype.indexOf = function (t, e, r) {
				return E(this, t, e, r, !0);
			}, s.prototype.lastIndexOf = function (t, e, r) {
				return E(this, t, e, r, !1);
			}, s.prototype.write = function (t, e, r, n) {
				if (void 0 === e) n = "utf8", r = this.length, e = 0;else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;else {
					if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
				}var o = this.length - e;if ((void 0 === r || r > o) && (r = o), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");n || (n = "utf8");for (var i = !1;;) switch (n) {case "hex":
						return b(this, t, e, r);case "utf8":case "utf-8":
						return R(this, t, e, r);case "ascii":
						return _(this, t, e, r);case "latin1":case "binary":
						return T(this, t, e, r);case "base64":
						return B(this, t, e, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
						return S(this, t, e, r);default:
						if (i) throw new TypeError("Unknown encoding: " + n);n = ("" + n).toLowerCase(), i = !0;}
			}, s.prototype.toJSON = function () {
				return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
			};var tt = 4096;s.prototype.slice = function (t, e) {
				var r = this.length;t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r, t < 0 && (t = 0)) : t > r && (t = r), e < 0 ? (e += r, e < 0 && (e = 0)) : e > r && (e = r), e < t && (e = t);var n;if (s.TYPED_ARRAY_SUPPORT) n = this.subarray(t, e), n.__proto__ = s.prototype;else {
					var o = e - t;n = new s(o, void 0);for (var i = 0; i < o; ++i) n[i] = this[i + t];
				}return n;
			}, s.prototype.readUIntLE = function (t, e, r) {
				t |= 0, e |= 0, r || Y(t, e, this.length);for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;return n;
			}, s.prototype.readUIntBE = function (t, e, r) {
				t |= 0, e |= 0, r || Y(t, e, this.length);for (var n = this[t + --e], o = 1; e > 0 && (o *= 256);) n += this[t + --e] * o;return n;
			}, s.prototype.readUInt8 = function (t, e) {
				return e || Y(t, 1, this.length), this[t];
			}, s.prototype.readUInt16LE = function (t, e) {
				return e || Y(t, 2, this.length), this[t] | this[t + 1] << 8;
			}, s.prototype.readUInt16BE = function (t, e) {
				return e || Y(t, 2, this.length), this[t] << 8 | this[t + 1];
			}, s.prototype.readUInt32LE = function (t, e) {
				return e || Y(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
			}, s.prototype.readUInt32BE = function (t, e) {
				return e || Y(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
			}, s.prototype.readIntLE = function (t, e, r) {
				t |= 0, e |= 0, r || Y(t, e, this.length);for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;return o *= 128, n >= o && (n -= Math.pow(2, 8 * e)), n;
			}, s.prototype.readIntBE = function (t, e, r) {
				t |= 0, e |= 0, r || Y(t, e, this.length);for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256);) i += this[t + --n] * o;return o *= 128, i >= o && (i -= Math.pow(2, 8 * e)), i;
			}, s.prototype.readInt8 = function (t, e) {
				return e || Y(t, 1, this.length), 128 & this[t] ? (255 - this[t] + 1) * -1 : this[t];
			}, s.prototype.readInt16LE = function (t, e) {
				e || Y(t, 2, this.length);var r = this[t] | this[t + 1] << 8;return 32768 & r ? 4294901760 | r : r;
			}, s.prototype.readInt16BE = function (t, e) {
				e || Y(t, 2, this.length);var r = this[t + 1] | this[t] << 8;return 32768 & r ? 4294901760 | r : r;
			}, s.prototype.readInt32LE = function (t, e) {
				return e || Y(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
			}, s.prototype.readInt32BE = function (t, e) {
				return e || Y(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
			}, s.prototype.readFloatLE = function (t, e) {
				return e || Y(t, 4, this.length), Q.read(this, t, !0, 23, 4);
			}, s.prototype.readFloatBE = function (t, e) {
				return e || Y(t, 4, this.length), Q.read(this, t, !1, 23, 4);
			}, s.prototype.readDoubleLE = function (t, e) {
				return e || Y(t, 8, this.length), Q.read(this, t, !0, 52, 8);
			}, s.prototype.readDoubleBE = function (t, e) {
				return e || Y(t, 8, this.length), Q.read(this, t, !1, 52, 8);
			}, s.prototype.writeUIntLE = function (t, e, r, n) {
				if (t = +t, e |= 0, r |= 0, !n) {
					var o = Math.pow(2, 8 * r) - 1;D(this, t, e, r, o, 0);
				}var i = 1,
				    s = 0;for (this[e] = 255 & t; ++s < r && (i *= 256);) this[e + s] = t / i & 255;return e + r;
			}, s.prototype.writeUIntBE = function (t, e, r, n) {
				if (t = +t, e |= 0, r |= 0, !n) {
					var o = Math.pow(2, 8 * r) - 1;D(this, t, e, r, o, 0);
				}var i = r - 1,
				    s = 1;for (this[e + i] = 255 & t; --i >= 0 && (s *= 256);) this[e + i] = t / s & 255;return e + r;
			}, s.prototype.writeUInt8 = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
			}, s.prototype.writeUInt16LE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : N(this, t, e, !0), e + 2;
			}, s.prototype.writeUInt16BE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : N(this, t, e, !1), e + 2;
			}, s.prototype.writeUInt32LE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : j(this, t, e, !0), e + 4;
			}, s.prototype.writeUInt32BE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4;
			}, s.prototype.writeIntLE = function (t, e, r, n) {
				if (t = +t, e |= 0, !n) {
					var o = Math.pow(2, 8 * r - 1);D(this, t, e, r, o - 1, -o);
				}var i = 0,
				    s = 1,
				    u = 0;for (this[e] = 255 & t; ++i < r && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1), this[e + i] = (t / s >> 0) - u & 255;return e + r;
			}, s.prototype.writeIntBE = function (t, e, r, n) {
				if (t = +t, e |= 0, !n) {
					var o = Math.pow(2, 8 * r - 1);D(this, t, e, r, o - 1, -o);
				}var i = r - 1,
				    s = 1,
				    u = 0;for (this[e + i] = 255 & t; --i >= 0 && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1), this[e + i] = (t / s >> 0) - u & 255;return e + r;
			}, s.prototype.writeInt8 = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
			}, s.prototype.writeInt16LE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : N(this, t, e, !0), e + 2;
			}, s.prototype.writeInt16BE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : N(this, t, e, !1), e + 2;
			}, s.prototype.writeInt32LE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : j(this, t, e, !0), e + 4;
			}, s.prototype.writeInt32BE = function (t, e, r) {
				return t = +t, e |= 0, r || D(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4;
			}, s.prototype.writeFloatLE = function (t, e, r) {
				return k(this, t, e, !0, r);
			}, s.prototype.writeFloatBE = function (t, e, r) {
				return k(this, t, e, !1, r);
			}, s.prototype.writeDoubleLE = function (t, e, r) {
				return q(this, t, e, !0, r);
			}, s.prototype.writeDoubleBE = function (t, e, r) {
				return q(this, t, e, !1, r);
			}, s.prototype.copy = function (t, e, r, n) {
				if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;if (0 === t.length || 0 === this.length) return 0;if (e < 0) throw new RangeError("targetStart out of bounds");if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");if (n < 0) throw new RangeError("sourceEnd out of bounds");n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);var o,
				    i = n - r;if (this === t && r < e && e < n) for (o = i - 1; o >= 0; --o) t[o + e] = this[o + r];else if (i < 1e3 || !s.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) t[o + e] = this[o + r];else Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);return i;
			}, s.prototype.fill = function (t, e, r, n) {
				if ("string" == typeof t) {
					if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
						var o = t.charCodeAt(0);o < 256 && (t = o);
					}if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");if ("string" == typeof n && !s.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
				} else "number" == typeof t && (t &= 255);if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");if (r <= e) return this;e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0);var i;if ("number" == typeof t) for (i = e; i < r; ++i) this[i] = t;else {
					var u = s.isBuffer(t) ? t : H(new s(t, n).toString()),
					    f = u.length;for (i = 0; i < r - e; ++i) this[i + e] = u[i % f];
				}return this;
			};var et = /[^+\/0-9A-Za-z-_]/g;
		}).call(e, function () {
			return this;
		}());
	}, function (t, e) {
		"use strict";
		function r(t) {
			var e = t.length;if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0;
		}function n(t) {
			return 3 * t.length / 4 - r(t);
		}function o(t) {
			var e,
			    n,
			    o,
			    i,
			    s,
			    u,
			    f = t.length;s = r(t), u = new c(3 * f / 4 - s), o = s > 0 ? f - 4 : f;var h = 0;for (e = 0, n = 0; e < o; e += 4, n += 3) i = a[t.charCodeAt(e)] << 18 | a[t.charCodeAt(e + 1)] << 12 | a[t.charCodeAt(e + 2)] << 6 | a[t.charCodeAt(e + 3)], u[h++] = i >> 16 & 255, u[h++] = i >> 8 & 255, u[h++] = 255 & i;return 2 === s ? (i = a[t.charCodeAt(e)] << 2 | a[t.charCodeAt(e + 1)] >> 4, u[h++] = 255 & i) : 1 === s && (i = a[t.charCodeAt(e)] << 10 | a[t.charCodeAt(e + 1)] << 4 | a[t.charCodeAt(e + 2)] >> 2, u[h++] = i >> 8 & 255, u[h++] = 255 & i), u;
		}function i(t) {
			return f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t];
		}function s(t, e, r) {
			for (var n, o = [], s = e; s < r; s += 3) n = (t[s] << 16) + (t[s + 1] << 8) + t[s + 2], o.push(i(n));return o.join("");
		}function u(t) {
			for (var e, r = t.length, n = r % 3, o = "", i = [], u = 16383, a = 0, c = r - n; a < c; a += u) i.push(s(t, a, a + u > c ? c : a + u));return 1 === n ? (e = t[r - 1], o += f[e >> 2], o += f[e << 4 & 63], o += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], o += f[e >> 10], o += f[e >> 4 & 63], o += f[e << 2 & 63], o += "="), i.push(o), i.join("");
		}e.byteLength = n, e.toByteArray = o, e.fromByteArray = u;for (var f = [], a = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, l = h.length; p < l; ++p) f[p] = h[p], a[h.charCodeAt(p)] = p;a["-".charCodeAt(0)] = 62, a["_".charCodeAt(0)] = 63;
	}, function (t, e) {
		e.read = function (t, e, r, n, o) {
			var i,
			    s,
			    u = 8 * o - n - 1,
			    f = (1 << u) - 1,
			    a = f >> 1,
			    c = -7,
			    h = r ? o - 1 : 0,
			    p = r ? -1 : 1,
			    l = t[e + h];for (h += p, i = l & (1 << -c) - 1, l >>= -c, c += u; c > 0; i = 256 * i + t[e + h], h += p, c -= 8);for (s = i & (1 << -c) - 1, i >>= -c, c += n; c > 0; s = 256 * s + t[e + h], h += p, c -= 8);if (0 === i) i = 1 - a;else {
				if (i === f) return s ? NaN : (l ? -1 : 1) * (1 / 0);s += Math.pow(2, n), i -= a;
			}return (l ? -1 : 1) * s * Math.pow(2, i - n);
		}, e.write = function (t, e, r, n, o, i) {
			var s,
			    u,
			    f,
			    a = 8 * i - o - 1,
			    c = (1 << a) - 1,
			    h = c >> 1,
			    p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
			    l = n ? 0 : i - 1,
			    d = n ? 1 : -1,
			    g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = c) : (s = Math.floor(Math.log(e) / Math.LN2), e * (f = Math.pow(2, -s)) < 1 && (s--, f *= 2), e += s + h >= 1 ? p / f : p * Math.pow(2, 1 - h), e * f >= 2 && (s++, f /= 2), s + h >= c ? (u = 0, s = c) : s + h >= 1 ? (u = (e * f - 1) * Math.pow(2, o), s += h) : (u = e * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); o >= 8; t[r + l] = 255 & u, l += d, u /= 256, o -= 8);for (s = s << o | u, a += o; a > 0; t[r + l] = 255 & s, l += d, s /= 256, a -= 8);t[r + l - d] |= 128 * g;
		};
	}, function (t, e) {
		var r = {}.toString;t.exports = Array.isArray || function (t) {
			return "[object Array]" == r.call(t);
		};
	}, function (t, e) {
		"use strict";
		t.exports = function (t, e) {
			return function () {
				for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n];return t.apply(e, r);
			};
		};
	}, function (t, e, r) {
		"use strict";
		function n(t) {
			this.defaults = t, this.interceptors = { request: new s(), response: new s() };
		}var o = r(9),
		    i = r(2),
		    s = r(20),
		    u = r(21),
		    f = r(24),
		    a = r(25);n.prototype.request = function (t) {
			"string" == typeof t && (t = i.merge({ url: arguments[0] }, arguments[1])), t = i.merge(o, this.defaults, { method: "get" }, t), t.baseURL && !f(t.url) && (t.url = a(t.baseURL, t.url));var e = [u, void 0],
			    r = Promise.resolve(t);for (this.interceptors.request.forEach(function (t) {
				e.unshift(t.fulfilled, t.rejected);
			}), this.interceptors.response.forEach(function (t) {
				e.push(t.fulfilled, t.rejected);
			}); e.length;) r = r.then(e.shift(), e.shift());return r;
		}, i.forEach(["delete", "get", "head", "options"], function (t) {
			n.prototype[t] = function (e, r) {
				return this.request(i.merge(r || {}, { method: t, url: e }));
			};
		}), i.forEach(["post", "put", "patch"], function (t) {
			n.prototype[t] = function (e, r, n) {
				return this.request(i.merge(n || {}, { method: t, url: e, data: r }));
			};
		}), t.exports = n;
	}, function (t, e, r) {
		"use strict";
		function n(t, e) {
			!i.isUndefined(t) && i.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e);
		}function o() {
			var t;return "undefined" != typeof XMLHttpRequest ? t = r(11) : "undefined" != typeof process && (t = r(11)), t;
		}var i = r(2),
		    s = r(10),
		    u = { "Content-Type": "application/x-www-form-urlencoded" },
		    f = { adapter: o(), transformRequest: [function (t, e) {
				return s(e, "Content-Type"), i.isFormData(t) || i.isArrayBuffer(t) || i.isBuffer(t) || i.isStream(t) || i.isFile(t) || i.isBlob(t) ? t : i.isArrayBufferView(t) ? t.buffer : i.isURLSearchParams(t) ? (n(e, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : i.isObject(t) ? (n(e, "application/json;charset=utf-8"), JSON.stringify(t)) : t;
			}], transformResponse: [function (t) {
				if ("string" == typeof t) try {
					t = JSON.parse(t);
				} catch (t) {}return t;
			}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function (t) {
				return t >= 200 && t < 300;
			} };f.headers = { common: { Accept: "application/json, text/plain, */*" } }, i.forEach(["delete", "get", "head"], function (t) {
			f.headers[t] = {};
		}), i.forEach(["post", "put", "patch"], function (t) {
			f.headers[t] = i.merge(u);
		}), t.exports = f;
	}, function (t, e, r) {
		"use strict";
		var n = r(2);t.exports = function (t, e) {
			n.forEach(t, function (r, n) {
				n !== e && n.toUpperCase() === e.toUpperCase() && (t[e] = r, delete t[n]);
			});
		};
	}, function (t, e, r) {
		"use strict";
		var n = r(2),
		    o = r(12),
		    i = r(15),
		    s = r(16),
		    u = r(17),
		    f = r(13),
		    a = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || r(18);t.exports = function (t) {
			return new Promise(function (e, c) {
				var h = t.data,
				    p = t.headers;n.isFormData(h) && delete p["Content-Type"];var l = new XMLHttpRequest(),
				    d = "onreadystatechange",
				    g = !1;if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in l || u(t.url) || (l = new window.XDomainRequest(), d = "onload", g = !0, l.onprogress = function () {}, l.ontimeout = function () {}), t.auth) {
					var y = t.auth.username || "",
					    w = t.auth.password || "";p.Authorization = "Basic " + a(y + ":" + w);
				}if (l.open(t.method.toUpperCase(), i(t.url, t.params, t.paramsSerializer), !0), l.timeout = t.timeout, l[d] = function () {
					if (l && (4 === l.readyState || g) && (0 !== l.status || l.responseURL && 0 === l.responseURL.indexOf("file:"))) {
						var r = "getAllResponseHeaders" in l ? s(l.getAllResponseHeaders()) : null,
						    n = t.responseType && "text" !== t.responseType ? l.response : l.responseText,
						    i = { data: n, status: 1223 === l.status ? 204 : l.status, statusText: 1223 === l.status ? "No Content" : l.statusText, headers: r, config: t, request: l };o(e, c, i), l = null;
					}
				}, l.onerror = function () {
					c(f("Network Error", t)), l = null;
				}, l.ontimeout = function () {
					c(f("timeout of " + t.timeout + "ms exceeded", t, "ECONNABORTED")), l = null;
				}, n.isStandardBrowserEnv()) {
					var v = r(19),
					    m = (t.withCredentials || u(t.url)) && t.xsrfCookieName ? v.read(t.xsrfCookieName) : void 0;m && (p[t.xsrfHeaderName] = m);
				}if ("setRequestHeader" in l && n.forEach(p, function (t, e) {
					"undefined" == typeof h && "content-type" === e.toLowerCase() ? delete p[e] : l.setRequestHeader(e, t);
				}), t.withCredentials && (l.withCredentials = !0), t.responseType) try {
					l.responseType = t.responseType;
				} catch (e) {
					if ("json" !== t.responseType) throw e;
				}"function" == typeof t.onDownloadProgress && l.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && l.upload && l.upload.addEventListener("progress", t.onUploadProgress), t.cancelToken && t.cancelToken.promise.then(function (t) {
					l && (l.abort(), c(t), l = null);
				}), void 0 === h && (h = null), l.send(h);
			});
		};
	}, function (t, e, r) {
		"use strict";
		var n = r(13);t.exports = function (t, e, r) {
			var o = r.config.validateStatus;r.status && o && !o(r.status) ? e(n("Request failed with status code " + r.status, r.config, null, r)) : t(r);
		};
	}, function (t, e, r) {
		"use strict";
		var n = r(14);t.exports = function (t, e, r, o) {
			var i = new Error(t);return n(i, e, r, o);
		};
	}, function (t, e) {
		"use strict";
		t.exports = function (t, e, r, n) {
			return t.config = e, r && (t.code = r), t.response = n, t;
		};
	}, function (t, e, r) {
		"use strict";
		function n(t) {
			return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
		}var o = r(2);t.exports = function (t, e, r) {
			if (!e) return t;var i;if (r) i = r(e);else if (o.isURLSearchParams(e)) i = e.toString();else {
				var s = [];o.forEach(e, function (t, e) {
					null !== t && "undefined" != typeof t && (o.isArray(t) && (e += "[]"), o.isArray(t) || (t = [t]), o.forEach(t, function (t) {
						o.isDate(t) ? t = t.toISOString() : o.isObject(t) && (t = JSON.stringify(t)), s.push(n(e) + "=" + n(t));
					}));
				}), i = s.join("&");
			}return i && (t += (t.indexOf("?") === -1 ? "?" : "&") + i), t;
		};
	}, function (t, e, r) {
		"use strict";
		var n = r(2);t.exports = function (t) {
			var e,
			    r,
			    o,
			    i = {};return t ? (n.forEach(t.split("\n"), function (t) {
				o = t.indexOf(":"), e = n.trim(t.substr(0, o)).toLowerCase(), r = n.trim(t.substr(o + 1)), e && (i[e] = i[e] ? i[e] + ", " + r : r);
			}), i) : i;
		};
	}, function (t, e, r) {
		"use strict";
		var n = r(2);t.exports = n.isStandardBrowserEnv() ? function () {
			function t(t) {
				var e = t;return r && (o.setAttribute("href", e), e = o.href), o.setAttribute("href", e), { href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, "") : "", host: o.host, search: o.search ? o.search.replace(/^\?/, "") : "", hash: o.hash ? o.hash.replace(/^#/, "") : "", hostname: o.hostname, port: o.port, pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname };
			}var e,
			    r = /(msie|trident)/i.test(navigator.userAgent),
			    o = document.createElement("a");return e = t(window.location.href), function (r) {
				var o = n.isString(r) ? t(r) : r;return o.protocol === e.protocol && o.host === e.host;
			};
		}() : function () {
			return function () {
				return !0;
			};
		}();
	}, function (t, e) {
		"use strict";
		function r() {
			this.message = "String contains an invalid character";
		}function n(t) {
			for (var e, n, i = String(t), s = "", u = 0, f = o; i.charAt(0 | u) || (f = "=", u % 1); s += f.charAt(63 & e >> 8 - u % 1 * 8)) {
				if (n = i.charCodeAt(u += .75), n > 255) throw new r();e = e << 8 | n;
			}return s;
		}var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype = new Error(), r.prototype.code = 5, r.prototype.name = "InvalidCharacterError", t.exports = n;
	}, function (t, e, r) {
		"use strict";
		var n = r(2);t.exports = n.isStandardBrowserEnv() ? function () {
			return { write: function (t, e, r, o, i, s) {
					var u = [];u.push(t + "=" + encodeURIComponent(e)), n.isNumber(r) && u.push("expires=" + new Date(r).toGMTString()), n.isString(o) && u.push("path=" + o), n.isString(i) && u.push("domain=" + i), s === !0 && u.push("secure"), document.cookie = u.join("; ");
				}, read: function (t) {
					var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));return e ? decodeURIComponent(e[3]) : null;
				}, remove: function (t) {
					this.write(t, "", Date.now() - 864e5);
				} };
		}() : function () {
			return { write: function () {}, read: function () {
					return null;
				}, remove: function () {} };
		}();
	}, function (t, e, r) {
		"use strict";
		function n() {
			this.handlers = [];
		}var o = r(2);n.prototype.use = function (t, e) {
			return this.handlers.push({ fulfilled: t, rejected: e }), this.handlers.length - 1;
		}, n.prototype.eject = function (t) {
			this.handlers[t] && (this.handlers[t] = null);
		}, n.prototype.forEach = function (t) {
			o.forEach(this.handlers, function (e) {
				null !== e && t(e);
			});
		}, t.exports = n;
	}, function (t, e, r) {
		"use strict";
		function n(t) {
			t.cancelToken && t.cancelToken.throwIfRequested();
		}var o = r(2),
		    i = r(22),
		    s = r(23),
		    u = r(9);t.exports = function (t) {
			n(t), t.headers = t.headers || {}, t.data = i(t.data, t.headers, t.transformRequest), t.headers = o.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers || {}), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (e) {
				delete t.headers[e];
			});var e = t.adapter || u.adapter;return e(t).then(function (e) {
				return n(t), e.data = i(e.data, e.headers, t.transformResponse), e;
			}, function (e) {
				return s(e) || (n(t), e && e.response && (e.response.data = i(e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e);
			});
		};
	}, function (t, e, r) {
		"use strict";
		var n = r(2);t.exports = function (t, e, r) {
			return n.forEach(r, function (r) {
				t = r(t, e);
			}), t;
		};
	}, function (t, e) {
		"use strict";
		t.exports = function (t) {
			return !(!t || !t.__CANCEL__);
		};
	}, function (t, e) {
		"use strict";
		t.exports = function (t) {
			return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
			);
		};
	}, function (t, e) {
		"use strict";
		t.exports = function (t, e) {
			return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
		};
	}, function (t, e) {
		"use strict";
		function r(t) {
			this.message = t;
		}r.prototype.toString = function () {
			return "Cancel" + (this.message ? ": " + this.message : "");
		}, r.prototype.__CANCEL__ = !0, t.exports = r;
	}, function (t, e, r) {
		"use strict";
		function n(t) {
			if ("function" != typeof t) throw new TypeError("executor must be a function.");var e;this.promise = new Promise(function (t) {
				e = t;
			});var r = this;t(function (t) {
				r.reason || (r.reason = new o(t), e(r.reason));
			});
		}var o = r(26);n.prototype.throwIfRequested = function () {
			if (this.reason) throw this.reason;
		}, n.source = function () {
			var t,
			    e = new n(function (e) {
				t = e;
			});return { token: e, cancel: t };
		}, t.exports = n;
	}, function (t, e) {
		"use strict";
		t.exports = function (t) {
			return function (e) {
				return t.apply(null, e);
			};
		};
	}]);
});
//# sourceMappingURL=axios.min.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function () {
  function n(n, t) {
    var r = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2];this.obs = n, this.sync = t, this.lazy = r, this.queue = [];
  }function t() {
    n.apply(this, arguments);
  }function r(t) {
    n.call(this, t, !0);
  }function e(n, t, r) {
    this.context = n, this.method = t, this.args = r;
  }function i(n) {
    this.value = n;
  }function u() {
    this.id = ++X;
  }function o(n, t) {
    return this instanceof o ? (u.call(this), void (!t && P.isFunction(n) || (null != n ? n._isNext : void 0) ? (this.valueF = n, this.valueInternal = void 0) : (this.valueF = void 0, this.valueInternal = n))) : new o(n, t);
  }function s(n, t) {
    return this instanceof s ? void o.call(this, n, t) : new s(n, t);
  }function a() {
    return this instanceof a ? void u.call(this) : new a();
  }function c(n) {
    return this instanceof c ? (this.error = n, void u.call(this)) : new c(n);
  }function f(n) {
    this.desc = n, this.id = ++nn, this.initialDesc = this.desc;
  }function h() {
    var n = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];this.unsubscribe = P.bind(this.unsubscribe, this), this.unsubscribed = !1, this.subscriptions = [], this.starting = [];for (var t, r = 0; r < n.length; r++) t = n[r], this.add(t);
  }function l(n, t) {
    this._subscribe = n, this._handleEvent = t, this.subscribe = P.bind(this.subscribe, this), this.handleEvent = P.bind(this.handleEvent, this), this.pushing = !1, this.ended = !1, this.prevError = void 0, this.unsubSrc = void 0, this.subscriptions = [], this.queue = [];
  }function p(n, t, r) {
    return this instanceof p ? (P.isFunction(n) && (r = t, t = n, n = e.empty), f.call(this, n), this.dispatcher = new l(t, r), void tn(this)) : new p(n, t, r);
  }function v(n, t, r) {
    l.call(this, t, r), this.property = n, this.subscribe = P.bind(this.subscribe, this), this.current = $, this.currentValueRootId = void 0, this.propertyEnded = !1;
  }function d(n, t, r) {
    f.call(this, n), this.dispatcher = new v(this, t, r), tn(this);
  }function b() {
    return this instanceof b ? (this.unsubAll = P.bind(this.unsubAll, this), this.subscribeAll = P.bind(this.subscribeAll, this), this.guardedSink = P.bind(this.guardedSink, this), this.sink = void 0, this.subscriptions = [], this.ended = !1, void p.call(this, new w.Desc(w, "Bus", []), this.subscribeAll)) : new b();
  }function y(n) {
    return [n, K()];
  }function m(n) {
    this.observable = n;
  }var g = Array.prototype.slice,
      w = { toString: function () {
      return "Bacon";
    } };w.version = "0.7.93";var E = ("undefined" != typeof global && null !== global ? global : this).Error,
      S = function () {},
      D = function (n, t) {
    return n;
  },
      A = function (n) {
    return n.slice(0);
  },
      O = Array.isArray || function (n) {
    return n instanceof Array;
  },
      M = function (n) {
    return n && n._isObservable;
  },
      k = function (n) {
    for (var t = arguments.length, r = 1; t > 1 ? t > r : r > t; t > 1 ? r++ : r--) for (var e in arguments[r]) n[e] = arguments[r][e];return n;
  },
      I = function (n, t) {
    var r = {}.hasOwnProperty,
        e = function () {};e.prototype = t.prototype, n.prototype = new e();for (var i in t) r.call(t, i) && (n[i] = t[i]);return n;
  },
      x = function (n) {
    return "undefined" != typeof Symbol && Symbol[n] ? Symbol[n] : "undefined" != typeof Symbol && "function" == typeof Symbol["for"] ? Symbol[n] = Symbol["for"](n) : "@@" + n;
  },
      P = { indexOf: function () {
      return Array.prototype.indexOf ? function (n, t) {
        return n.indexOf(t);
      } : function (n, t) {
        for (var r, e = 0; e < n.length; e++) if (r = n[e], t === r) return e;return -1;
      };
    }(), indexWhere: function (n, t) {
      for (var r, e = 0; e < n.length; e++) if (r = n[e], t(r)) return e;return -1;
    }, head: function (n) {
      return n[0];
    }, always: function (n) {
      return function () {
        return n;
      };
    }, negate: function (n) {
      return function (t) {
        return !n(t);
      };
    }, empty: function (n) {
      return 0 === n.length;
    }, tail: function (n) {
      return n.slice(1, n.length);
    }, filter: function (n, t) {
      for (var r, e = [], i = 0; i < t.length; i++) r = t[i], n(r) && e.push(r);return e;
    }, map: function (n, t) {
      return function () {
        for (var r, e = [], i = 0; i < t.length; i++) r = t[i], e.push(n(r));return e;
      }();
    }, each: function (n, t) {
      for (var r in n) if (Object.prototype.hasOwnProperty.call(n, r)) {
        var e = n[r];t(r, e);
      }
    }, toArray: function (n) {
      return O(n) ? n : [n];
    }, contains: function (n, t) {
      return -1 !== P.indexOf(n, t);
    }, id: function (n) {
      return n;
    }, last: function (n) {
      return n[n.length - 1];
    }, all: function (n) {
      for (var t, r = arguments.length <= 1 || void 0 === arguments[1] ? P.id : arguments[1], e = 0; e < n.length; e++) if (t = n[e], !r(t)) return !1;return !0;
    }, any: function (n) {
      for (var t, r = arguments.length <= 1 || void 0 === arguments[1] ? P.id : arguments[1], e = 0; e < n.length; e++) if (t = n[e], r(t)) return !0;return !1;
    }, without: function (n, t) {
      return P.filter(function (t) {
        return t !== n;
      }, t);
    }, remove: function (n, t) {
      var r = P.indexOf(t, n);return r >= 0 ? t.splice(r, 1) : void 0;
    }, fold: function (n, t, r) {
      for (var e, i = 0; i < n.length; i++) e = n[i], t = r(t, e);return t;
    }, flatMap: function (n, t) {
      return P.fold(t, [], function (t, r) {
        return t.concat(n(r));
      });
    }, cached: function (n) {
      var t = $;return function () {
        return ("undefined" != typeof t && null !== t ? t._isNone : void 0) && (t = n(), n = void 0), t;
      };
    }, bind: function (n, t) {
      return function () {
        return n.apply(t, arguments);
      };
    }, isFunction: function (n) {
      return "function" == typeof n;
    }, toString: function (n) {
      var t,
          r,
          e,
          i = {}.hasOwnProperty;try {
        return _++, null == n ? "undefined" : P.isFunction(n) ? "function" : O(n) ? _ > 5 ? "[..]" : "[" + P.map(P.toString, n).toString() + "]" : null != (null != n ? n.toString : void 0) && n.toString !== Object.prototype.toString ? n.toString() : "object" == typeof n ? _ > 5 ? "{..}" : (t = function () {
          var t = [];for (r in n) i.call(n, r) && (e = function () {
            var t;try {
              return n[r];
            } catch (t) {
              return t;
            }
          }(), t.push(P.toString(r) + ":" + P.toString(e)));return t;
        }(), "{" + t + "}") : n;
      } finally {
        _--;
      }
    } },
      _ = 0;w._ = P;var W = w.UpdateBarrier = function () {
    function n(n) {
      s >= n || (o[n - 1] || (o[n - 1] = [[], 0]), s = n);
    }function t(n, t) {
      for (var r in t) if (t[r][0].id == n.id) return !0;return !1;
    }function r() {
      var t = s;if (t) for (; s >= t;) {
        var r = o[s - 1];if (!r) throw new c("Unexpected stack top: " + r);var e = r[0],
            i = r[1];if (!(i < e.length)) {
          r[0] = [], r[1] = 0;break;
        }var u = e[i],
            a = (u[0], u[1]);r[1]++, n(s + 1);var f = !1;try {
          for (a(), f = !0; s > t && 0 == o[s - 1][0].length;) s--;
        } finally {
          f || (o = [], s = 0);
        }
      }
    }var e,
        i = [],
        u = {},
        o = [],
        s = 0,
        a = {},
        f = function (i, u) {
      if (!e && !o.length) return u();n(1);for (var a = 0; s - 1 > a && !t(i, o[a][0]);) a++;var c = o[a][0];c.push([i, u]), e || r();
    },
        h = function (n, t) {
      if (e) {
        var r = u[n.id];return "undefined" == typeof r || null === r ? (r = u[n.id] = [t], i.push(n)) : r.push(t);
      }return t();
    },
        l = function () {
      for (; i.length > 0;) p(0, !0);a = {};
    },
        p = function (n, t) {
      var r = i[n],
          e = r.id,
          o = u[e];i.splice(n, 1), delete u[e], t && i.length > 0 && v(r);for (var s, a = 0; a < o.length; a++) (s = o[a])();
    },
        v = function (n) {
      if (!a[n.id]) {
        for (var t, r = n.internalDeps(), e = 0; e < r.length; e++) if (t = r[e], v(t), u[t.id]) {
          var o = P.indexOf(i, t);p(o, !1);
        }a[n.id] = !0;
      }
    },
        d = function (n, t, i, u) {
      if (e) return i.apply(t, u);e = n;try {
        var o = i.apply(t, u);l();
      } finally {
        e = void 0, r();
      }return o;
    },
        b = function () {
      return e ? e.id : void 0;
    },
        y = function (n, t) {
      var r = !1,
          e = !1,
          i = function () {
        return e = !0;
      },
          u = function () {
        return r = !0, i();
      };return i = n.dispatcher.subscribe(function (e) {
        return f(n, function () {
          if (!r) {
            var n = t(e);if (n === w.noMore) return u();
          }
        });
      }), e && i(), u;
    },
        m = function () {
      return i.length > 0;
    };return { whenDoneWith: h, hasWaiters: m, inTransaction: d, currentEventId: b, wrappedSubscribe: y, afterTransaction: f };
  }();k(n.prototype, { _isSource: !0, subscribe: function (n) {
      return this.obs.dispatcher.subscribe(n);
    }, toString: function () {
      return this.obs.toString();
    }, markEnded: function () {
      return this.ended = !0, !0;
    }, consume: function () {
      return this.lazy ? { value: P.always(this.queue[0]) } : this.queue[0];
    }, push: function (n) {
      return this.queue = [n], [n];
    }, mayHave: function () {
      return !0;
    }, hasAtLeast: function () {
      return this.queue.length;
    }, flatten: !0 }), I(t, n), k(t.prototype, { consume: function () {
      return this.queue.shift();
    }, push: function (n) {
      return this.queue.push(n);
    }, mayHave: function (n) {
      return !this.ended || this.queue.length >= n;
    }, hasAtLeast: function (n) {
      return this.queue.length >= n;
    }, flatten: !1 }), I(r, n), k(r.prototype, { consume: function () {
      var n = this.queue;return this.queue = [], { value: function () {
          return n;
        } };
    }, push: function (n) {
      return this.queue.push(n.value());
    }, hasAtLeast: function () {
      return !0;
    } }), n.isTrigger = function (n) {
    return (null != n ? n._isSource : void 0) ? n.sync : null != n ? n._isEventStream : void 0;
  }, n.fromObservable = function (r) {
    return (null != r ? r._isSource : void 0) ? r : (null != r ? r._isProperty : void 0) ? new n(r, !1) : new t(r, !0);
  }, k(e.prototype, { _isDesc: !0, deps: function () {
      return this.cached || (this.cached = H([this.context].concat(this.args))), this.cached;
    }, toString: function () {
      return P.toString(this.context) + "." + P.toString(this.method) + "(" + P.map(P.toString, this.args) + ")";
    } });var T = function (n, t) {
    var r = n || t;if (r && r._isDesc) return n || t;for (var i = arguments.length, u = Array(i > 2 ? i - 2 : 0), o = 2; i > o; o++) u[o - 2] = arguments[o];return new e(n, t, u);
  },
      V = function (n, t) {
    return t.desc = n, t;
  },
      H = function (n) {
    return O(n) ? P.flatMap(H, n) : M(n) ? [n] : ("undefined" != typeof n && null !== n ? n._isSource : void 0) ? [n.obs] : [];
  };w.Desc = e, w.Desc.empty = new w.Desc("", "", []);var B = function (n) {
    return function (t) {
      for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), i = 1; r > i; i++) e[i - 1] = arguments[i];if ("object" == typeof t && e.length) {
        var u = t,
            o = e[0];t = function () {
          return u[o].apply(u, arguments);
        }, e = e.slice(1);
      }return n.apply(void 0, [t].concat(e));
    };
  },
      F = function (n) {
    return n = Array.prototype.slice.call(n), U.apply(void 0, n);
  },
      C = function (n, t) {
    return function () {
      for (var r = arguments.length, e = Array(r), i = 0; r > i; i++) e[i] = arguments[i];return n.apply(void 0, t.concat(e));
    };
  },
      N = function (n) {
    return function (t) {
      return function (r) {
        if ("undefined" != typeof r && null !== r) {
          var e = r[t];return P.isFunction(e) ? e.apply(r, n) : e;
        }
      };
    };
  },
      q = function (n, t) {
    var r = n.slice(1).split("."),
        e = P.map(N(t), r);return function (n) {
      for (var t, r = 0; r < e.length; r++) t = e[r], n = t(n);return n;
    };
  },
      L = function (n) {
    return "string" == typeof n && n.length > 1 && "." === n.charAt(0);
  },
      U = B(function (n) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return P.isFunction(n) ? r.length ? C(n, r) : n : L(n) ? q(n, r) : P.always(n);
  }),
      z = function (n, t) {
    return U.apply(void 0, [n].concat(t));
  },
      Q = function (n, t, r, e) {
    if ("undefined" != typeof t && null !== t ? t._isProperty : void 0) {
      var i = t.sampledBy(n, function (n, t) {
        return [n, t];
      });return e.call(i, function (n) {
        {
          var t = n[0];n[1];
        }return t;
      }).map(function (n) {
        var t = (n[0], n[1]);return t;
      });
    }return t = z(t, r), e.call(n, t);
  },
      j = function (n) {
    if (P.isFunction(n)) return n;if (L(n)) {
      var t = R(n);return function (n, r) {
        return n[t](r);
      };
    }throw new E("not a function or a field key: " + n);
  },
      R = function (n) {
    return n.slice(1);
  };k(i.prototype, { _isSome: !0, getOrElse: function () {
      return this.value;
    }, get: function () {
      return this.value;
    }, filter: function (n) {
      return n(this.value) ? new i(this.value) : $;
    }, map: function (n) {
      return new i(n(this.value));
    }, forEach: function (n) {
      return n(this.value);
    }, isDefined: !0, toArray: function () {
      return [this.value];
    }, inspect: function () {
      return "Some(" + this.value + ")";
    }, toString: function () {
      return this.inspect();
    } });var $ = { _isNone: !0, getOrElse: function (n) {
      return n;
    }, filter: function () {
      return $;
    }, map: function () {
      return $;
    }, forEach: function () {}, isDefined: !1, toArray: function () {
      return [];
    }, inspect: function () {
      return "None";
    }, toString: function () {
      return this.inspect();
    } },
      Z = function (n) {
    return ("undefined" != typeof n && null !== n ? n._isSome : void 0) || ("undefined" != typeof n && null !== n ? n._isNone : void 0) ? n : new i(n);
  };w.noMore = "<no-more>", w.more = "<more>";var X = 0;u.prototype._isEvent = !0, u.prototype.isEvent = function () {
    return !0;
  }, u.prototype.isEnd = function () {
    return !1;
  }, u.prototype.isInitial = function () {
    return !1;
  }, u.prototype.isNext = function () {
    return !1;
  }, u.prototype.isError = function () {
    return !1;
  }, u.prototype.hasValue = function () {
    return !1;
  }, u.prototype.filter = function () {
    return !0;
  }, u.prototype.inspect = function () {
    return this.toString();
  }, u.prototype.log = function () {
    return this.toString();
  }, I(o, u), o.prototype.isNext = function () {
    return !0;
  }, o.prototype.hasValue = function () {
    return !0;
  }, o.prototype.value = function () {
    var n;return (null != (n = this.valueF) ? n._isNext : void 0) ? (this.valueInternal = this.valueF.value(), this.valueF = void 0) : this.valueF && (this.valueInternal = this.valueF(), this.valueF = void 0), this.valueInternal;
  }, o.prototype.fmap = function (n) {
    var t, r;return this.valueInternal ? (r = this.valueInternal, this.apply(function () {
      return n(r);
    })) : (t = this, this.apply(function () {
      return n(t.value());
    }));
  }, o.prototype.apply = function (n) {
    return new o(n);
  }, o.prototype.filter = function (n) {
    return n(this.value());
  }, o.prototype.toString = function () {
    return P.toString(this.value());
  }, o.prototype.log = function () {
    return this.value();
  }, o.prototype._isNext = !0, I(s, o), s.prototype._isInitial = !0, s.prototype.isInitial = function () {
    return !0;
  }, s.prototype.isNext = function () {
    return !1;
  }, s.prototype.apply = function (n) {
    return new s(n);
  }, s.prototype.toNext = function () {
    return new o(this);
  }, I(a, u), a.prototype.isEnd = function () {
    return !0;
  }, a.prototype.fmap = function () {
    return this;
  }, a.prototype.apply = function () {
    return this;
  }, a.prototype.toString = function () {
    return "<end>";
  }, I(c, u), c.prototype.isError = function () {
    return !0;
  }, c.prototype.fmap = function () {
    return this;
  }, c.prototype.apply = function () {
    return this;
  }, c.prototype.toString = function () {
    return "<error> " + P.toString(this.error);
  }, w.Event = u, w.Initial = s, w.Next = o, w.End = a, w.Error = c;var G = function (n) {
    return new s(n, !0);
  },
      J = function (n) {
    return new o(n, !0);
  },
      K = function () {
    return new a();
  },
      Y = function (n) {
    return n && n._isEvent ? n : J(n);
  },
      nn = 0,
      tn = function () {};k(f.prototype, { _isObservable: !0, subscribe: function (n) {
      return W.wrappedSubscribe(this, n);
    }, subscribeInternal: function (n) {
      return this.dispatcher.subscribe(n);
    }, onValue: function () {
      var n = F(arguments);return this.subscribe(function (t) {
        return t.hasValue() ? n(t.value()) : void 0;
      });
    }, onValues: function (n) {
      return this.onValue(function (t) {
        return n.apply(void 0, t);
      });
    }, onError: function () {
      var n = F(arguments);return this.subscribe(function (t) {
        return t.isError() ? n(t.error) : void 0;
      });
    }, onEnd: function () {
      var n = F(arguments);return this.subscribe(function (t) {
        return t.isEnd() ? n() : void 0;
      });
    }, name: function (n) {
      return this._name = n, this;
    }, withDescription: function () {
      return this.desc = T.apply(void 0, arguments), this;
    }, toString: function () {
      return this._name ? this._name : this.desc.toString();
    }, deps: function () {
      return this.desc.deps();
    }, internalDeps: function () {
      return this.initialDesc.deps();
    } }), f.prototype.assign = f.prototype.onValue, f.prototype.forEach = f.prototype.onValue, f.prototype.inspect = f.prototype.toString, w.Observable = f, k(h.prototype, { add: function (n) {
      var t = this;if (!this.unsubscribed) {
        var r = !1,
            e = S;this.starting.push(n);var i = function () {
          return t.unsubscribed ? void 0 : (r = !0, t.remove(e), P.remove(n, t.starting));
        };return e = n(this.unsubscribe, i), this.unsubscribed || r ? e() : this.subscriptions.push(e), P.remove(n, this.starting), e;
      }
    }, remove: function (n) {
      return this.unsubscribed ? void 0 : void 0 !== P.remove(n, this.subscriptions) ? n() : void 0;
    }, unsubscribe: function () {
      if (!this.unsubscribed) {
        this.unsubscribed = !0;for (var n = this.subscriptions, t = 0; t < n.length; t++) n[t]();return this.subscriptions = [], this.starting = [], [];
      }
    }, count: function () {
      return this.unsubscribed ? 0 : this.subscriptions.length + this.starting.length;
    }, empty: function () {
      return 0 === this.count();
    } }), w.CompositeUnsubscribe = h, l.prototype.hasSubscribers = function () {
    return this.subscriptions.length > 0;
  }, l.prototype.removeSub = function (n) {
    return this.subscriptions = P.without(n, this.subscriptions), this.subscriptions;
  }, l.prototype.push = function (n) {
    return n.isEnd() && (this.ended = !0), W.inTransaction(n, this, this.pushIt, [n]);
  }, l.prototype.pushToSubscriptions = function (n) {
    try {
      for (var t = this.subscriptions, r = t.length, e = 0; r > e; e++) {
        var i = t[e],
            u = i.sink(n);(u === w.noMore || n.isEnd()) && this.removeSub(i);
      }return !0;
    } catch (o) {
      throw this.pushing = !1, this.queue = [], o;
    }
  }, l.prototype.pushIt = function (n) {
    if (this.pushing) return this.queue.push(n), w.more;if (n !== this.prevError) {
      for (n.isError() && (this.prevError = n), this.pushing = !0, this.pushToSubscriptions(n), this.pushing = !1; this.queue.length;) n = this.queue.shift(), this.push(n);return this.hasSubscribers() ? w.more : (this.unsubscribeFromSource(), w.noMore);
    }
  }, l.prototype.handleEvent = function (n) {
    return this._handleEvent ? this._handleEvent(n) : this.push(n);
  }, l.prototype.unsubscribeFromSource = function () {
    this.unsubSrc && this.unsubSrc(), this.unsubSrc = void 0;
  }, l.prototype.subscribe = function (n) {
    var t;return this.ended ? (n(K()), S) : (t = { sink: n }, this.subscriptions.push(t), 1 === this.subscriptions.length && (this.unsubSrc = this._subscribe(this.handleEvent)), function (n) {
      return function () {
        return n.removeSub(t), n.hasSubscribers() ? void 0 : n.unsubscribeFromSource();
      };
    }(this));
  }, w.Dispatcher = l, I(p, f), k(p.prototype, { _isEventStream: !0, toProperty: function (n) {
      var t = 0 === arguments.length ? $ : Z(function () {
        return n;
      }),
          r = this.dispatcher,
          e = new w.Desc(this, "toProperty", [n]);return new d(e, function (n) {
        var e = !1,
            u = !1,
            o = S,
            a = w.more,
            c = function () {
          return e ? void 0 : t.forEach(function (t) {
            return e = !0, a = n(new s(t)), a === w.noMore ? (o(), o = S, S) : void 0;
          });
        };return o = r.subscribe(function (r) {
          return r.hasValue() ? r.isInitial() && !u ? (t = new i(function () {
            return r.value();
          }), w.more) : (r.isInitial() || c(), e = !0, t = new i(r), n(r)) : (r.isEnd() && (a = c()), a !== w.noMore ? n(r) : void 0);
        }), u = !0, c(), o;
      });
    }, toEventStream: function () {
      return this;
    }, withHandler: function (n) {
      return new p(new w.Desc(this, "withHandler", [n]), this.dispatcher.subscribe, n);
    } }), w.EventStream = p, w.never = function () {
    return new p(T(w, "never"), function (n) {
      return n(K()), S;
    });
  }, w.when = function () {
    if (0 === arguments.length) return w.never();for (var t = arguments.length, r = [], e = [], i = 0, u = []; t > i;) {
      u[i] = arguments[i], u[i + 1] = arguments[i + 1];for (var o, s = P.toArray(arguments[i]), a = en(arguments[i + 1]), c = { f: a, ixs: [] }, f = !1, h = 0; h < s.length; h++) {
        o = s[h];var l = P.indexOf(r, o);f || (f = n.isTrigger(o)), 0 > l && (r.push(o), l = r.length - 1);for (var v, d = 0; d < c.ixs.length; d++) v = c.ixs[d], v.index === l && v.count++;c.ixs.push({ index: l, count: 1 });
      }s.length > 0 && e.push(c), i += 2;
    }if (!r.length) return w.never();r = P.map(n.fromObservable, r);var b = P.any(r, function (n) {
      return n.flatten;
    }) && rn(P.map(function (n) {
      return n.obs;
    }, r)),
        y = new w.Desc(w, "when", u),
        m = new p(y, function (n) {
      var t = [],
          i = !1,
          u = function (n) {
        for (var t, e = 0; e < n.ixs.length; e++) if (t = n.ixs[e], !r[t.index].hasAtLeast(t.count)) return !1;return !0;
      },
          o = function (n) {
        return !n.sync || n.ended;
      },
          s = function (n) {
        for (var t, e = 0; e < n.ixs.length; e++) if (t = n.ixs[e], !r[t.index].mayHave(t.count)) return !0;
      },
          a = function (n) {
        return !n.source.flatten;
      },
          c = function (c) {
        return function (f) {
          var h = function () {
            return W.whenDoneWith(m, p);
          },
              l = function () {
            if (!(t.length > 0)) return w.more;for (var i, o = w.more, s = t.pop(), c = 0; c < e.length; c++) if (i = e[c], u(i)) {
              var f = function () {
                for (var n, t = [], e = 0; e < i.ixs.length; e++) n = i.ixs[e], t.push(r[n.index].consume());return t;
              }();return o = n(s.e.apply(function () {
                var n,
                    t = function () {
                  for (var n, t = [], r = 0; r < f.length; r++) n = f[r], t.push(n.value());return t;
                }();return (n = i).f.apply(n, t);
              })), t.length && (t = P.filter(a, t)), o === w.noMore ? o : l();
            }
          },
              p = function () {
            var t = l();return i && (P.all(r, o) || P.all(e, s)) && (t = w.noMore, n(K())), t === w.noMore && f(), t;
          };return c.subscribe(function (r) {
            if (r.isEnd()) i = !0, c.markEnded(), h();else if (r.isError()) var e = n(r);else c.push(r), c.sync && (t.push({ source: c, e: r }), b || W.hasWaiters() ? h() : p());return e === w.noMore && f(), e || w.more;
          });
        };
      };return new w.CompositeUnsubscribe(function () {
        for (var n, t = [], e = 0; e < r.length; e++) n = r[e], t.push(c(n));return t;
      }()).unsubscribe;
    });return m;
  };var rn = function (n) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1],
        r = function (n) {
      if (P.contains(t, n)) return !0;var e = n.internalDeps();return e.length ? (t.push(n), P.any(e, r)) : (t.push(n), !1);
    };return P.any(n, r);
  },
      en = function (n) {
    return P.isFunction(n) ? n : P.always(n);
  };w.groupSimultaneous = function () {
    for (var n = arguments.length, t = Array(n), e = 0; n > e; e++) t[e] = arguments[e];1 === t.length && O(t[0]) && (t = t[0]);var i = function () {
      for (var n, e = [], i = 0; i < t.length; i++) n = t[i], e.push(new r(n));return e;
    }();return V(new w.Desc(w, "groupSimultaneous", t), w.when(i, function () {
      for (var n = arguments.length, t = Array(n), r = 0; n > r; r++) t[r] = arguments[r];return t;
    }));
  }, I(v, l), k(v.prototype, { push: function (n) {
      return n.isEnd() && (this.propertyEnded = !0), n.hasValue() && (this.current = new i(n), this.currentValueRootId = W.currentEventId()), l.prototype.push.call(this, n);
    }, maybeSubSource: function (n, t) {
      return t === w.noMore ? S : this.propertyEnded ? (n(K()), S) : l.prototype.subscribe.call(this, n);
    }, subscribe: function (n) {
      var t = this,
          r = w.more;if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
        var e = W.currentEventId(),
            i = this.currentValueRootId;return !this.propertyEnded && i && e && e !== i ? (W.whenDoneWith(this.property, function () {
          return t.currentValueRootId === i ? n(G(t.current.get().value())) : void 0;
        }), this.maybeSubSource(n, r)) : (W.inTransaction(void 0, this, function () {
          return r = n(G(this.current.get().value()));
        }, []), this.maybeSubSource(n, r));
      }return this.maybeSubSource(n, r);
    } }), I(d, f), k(d.prototype, { _isProperty: !0, changes: function () {
      var n = this;return new p(new w.Desc(this, "changes", []), function (t) {
        return n.dispatcher.subscribe(function (n) {
          return n.isInitial() ? void 0 : t(n);
        });
      });
    }, withHandler: function (n) {
      return new d(new w.Desc(this, "withHandler", [n]), this.dispatcher.subscribe, n);
    }, toProperty: function () {
      return this;
    }, toEventStream: function () {
      var n = this;return new p(new w.Desc(this, "toEventStream", []), function (t) {
        return n.dispatcher.subscribe(function (n) {
          return n.isInitial() && (n = n.toNext()), t(n);
        });
      });
    } }), w.Property = d, w.constant = function (n) {
    return new d(new w.Desc(w, "constant", [n]), function (t) {
      return t(G(n)), t(K()), S;
    });
  }, w.fromBinder = function (n) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? P.id : arguments[1],
        r = new w.Desc(w, "fromBinder", [n, t]);return new p(r, function (r) {
      var e = !1,
          i = !1,
          u = function () {
        return e ? void 0 : "undefined" != typeof o && null !== o ? (o(), e = !0) : i = !0;
      },
          o = n(function () {
        for (var n, e = arguments.length, i = Array(e), o = 0; e > o; o++) i[o] = arguments[o];var s = t.apply(this, i);O(s) && (null != (n = P.last(s)) ? n._isEvent : void 0) || (s = [s]);for (var a, c = w.more, f = 0; f < s.length; f++) if (a = s[f], c = r(a = Y(a)), c === w.noMore || a.isEnd()) return u(), c;return c;
      });return i && u(), u;
    });
  }, w.Observable.prototype.map = function (n) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return Q(this, n, r, function (n) {
      return V(new w.Desc(this, "map", [n]), this.withHandler(function (t) {
        return this.push(t.fmap(n));
      }));
    });
  };var un = function (n) {
    return O(n[0]) ? n[0] : Array.prototype.slice.call(n);
  },
      on = function (n) {
    return P.isFunction(n[0]) ? [un(Array.prototype.slice.call(n, 1)), n[0]] : [un(Array.prototype.slice.call(n, 0, n.length - 1)), P.last(n)];
  };w.combineAsArray = function () {
    var t = un(arguments);if (t.length) {
      for (var r = [], e = 0; e < t.length; e++) {
        var i = M(t[e]) ? t[e] : w.constant(t[e]);r.push(new n(i, !0));
      }return V(new w.Desc(w, "combineAsArray", t), w.when(r, function () {
        for (var n = arguments.length, t = Array(n), r = 0; n > r; r++) t[r] = arguments[r];return t;
      }).toProperty());
    }return w.constant([]);
  }, w.onValues = function () {
    return w.combineAsArray(Array.prototype.slice.call(arguments, 0, arguments.length - 1)).onValues(arguments[arguments.length - 1]);
  }, w.combineWith = function () {
    var n = on(arguments),
        t = n[0],
        r = n[1],
        e = new w.Desc(w, "combineWith", [r].concat(t));return V(e, w.combineAsArray(t).map(function (n) {
      return r.apply(void 0, n);
    }));
  }, w.Observable.prototype.combine = function (n, t) {
    var r = j(t),
        e = new w.Desc(this, "combine", [n, t]);return V(e, w.combineAsArray(this, n).map(function (n) {
      return r(n[0], n[1]);
    }));
  }, w.Observable.prototype.withStateMachine = function (n, t) {
    var r = n,
        e = new w.Desc(this, "withStateMachine", [n, t]);return V(e, this.withHandler(function (n) {
      var e = t(r, n),
          i = e[0],
          u = e[1];r = i;for (var o, s = w.more, a = 0; a < u.length; a++) if (o = u[a], s = this.push(o), s === w.noMore) return s;return s;
    }));
  };var sn = function (n, t) {
    return n === t;
  },
      an = function (n) {
    return "undefined" != typeof n && null !== n ? n._isNone : !1;
  };w.Observable.prototype.skipDuplicates = function () {
    var n = arguments.length <= 0 || void 0 === arguments[0] ? sn : arguments[0],
        t = new w.Desc(this, "skipDuplicates", []);return V(t, this.withStateMachine($, function (t, r) {
      return r.hasValue() ? r.isInitial() || an(t) || !n(t.get(), r.value()) ? [new i(r.value()), [r]] : [t, []] : [t, [r]];
    }));
  }, w.Observable.prototype.awaiting = function (n) {
    var t = new w.Desc(this, "awaiting", [n]);return V(t, w.groupSimultaneous(this, n).map(function (n) {
      return 0 === n[1].length;
    }).toProperty(!1).skipDuplicates());
  }, w.Observable.prototype.not = function () {
    return V(new w.Desc(this, "not", []), this.map(function (n) {
      return !n;
    }));
  }, w.Property.prototype.and = function (n) {
    return V(new w.Desc(this, "and", [n]), this.combine(n, function (n, t) {
      return n && t;
    }));
  }, w.Property.prototype.or = function (n) {
    return V(new w.Desc(this, "or", [n]), this.combine(n, function (n, t) {
      return n || t;
    }));
  }, w.scheduler = { setTimeout: function (n, t) {
      return setTimeout(n, t);
    }, setInterval: function (n, t) {
      return setInterval(n, t);
    }, clearInterval: function (n) {
      return clearInterval(n);
    }, clearTimeout: function (n) {
      return clearTimeout(n);
    }, now: function () {
      return new Date().getTime();
    } }, w.EventStream.prototype.bufferWithTime = function (n) {
    return V(new w.Desc(this, "bufferWithTime", [n]), this.bufferWithTimeOrCount(n, Number.MAX_VALUE));
  }, w.EventStream.prototype.bufferWithCount = function (n) {
    return V(new w.Desc(this, "bufferWithCount", [n]), this.bufferWithTimeOrCount(void 0, n));
  }, w.EventStream.prototype.bufferWithTimeOrCount = function (n, t) {
    var r = function (r) {
      return r.values.length === t ? r.flush() : void 0 !== n ? r.schedule() : void 0;
    },
        e = new w.Desc(this, "bufferWithTimeOrCount", [n, t]);return V(e, this.buffer(n, r, r));
  }, w.EventStream.prototype.buffer = function (n) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? S : arguments[1],
        r = arguments.length <= 2 || void 0 === arguments[2] ? S : arguments[2],
        e = { scheduled: null, end: void 0, values: [], flush: function () {
        if (this.scheduled && (w.scheduler.clearTimeout(this.scheduled), this.scheduled = null), this.values.length > 0) {
          var n = this.values;this.values = [];var t = this.push(J(n));if (null != this.end) return this.push(this.end);if (t !== w.noMore) return r(this);
        } else if (null != this.end) return this.push(this.end);
      }, schedule: function () {
        var t = this;return this.scheduled ? void 0 : this.scheduled = n(function () {
          return t.flush();
        });
      } },
        i = w.more;if (!P.isFunction(n)) {
      var u = n;n = function (n) {
        return w.scheduler.setTimeout(n, u);
      };
    }return V(new w.Desc(this, "buffer", []), this.withHandler(function (n) {
      var r = this;return e.push = function (n) {
        return r.push(n);
      }, n.isError() ? i = this.push(n) : n.isEnd() ? (e.end = n, e.scheduled || e.flush()) : (e.values.push(n.value()), t(e)), i;
    }));
  }, w.Observable.prototype.filter = function (n) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return Q(this, n, r, function (n) {
      return V(new w.Desc(this, "filter", [n]), this.withHandler(function (t) {
        return t.filter(n) ? this.push(t) : w.more;
      }));
    });
  }, w.once = function (n) {
    return new p(new e(w, "once", [n]), function (t) {
      return t(Y(n)), t(K()), S;
    });
  }, w.EventStream.prototype.concat = function (n) {
    var t = this;return new p(new w.Desc(t, "concat", [n]), function (r) {
      var e = S,
          i = t.dispatcher.subscribe(function (t) {
        return t.isEnd() ? e = n.dispatcher.subscribe(r) : r(t);
      });return function () {
        return i(), e();
      };
    });
  }, w.Observable.prototype.flatMap = function () {
    return hn(this, cn(arguments));
  }, w.Observable.prototype.flatMapFirst = function () {
    return hn(this, cn(arguments), !0);
  };var cn = function (n) {
    return 1 === n.length && M(n[0]) ? P.always(n[0]) : F(n);
  },
      fn = function (n) {
    return M(n) ? n : w.once(n);
  },
      hn = function (n, t, r, e) {
    var i = [n],
        u = [],
        o = new w.Desc(n, "flatMap" + (r ? "First" : ""), [t]),
        s = new p(o, function (i) {
      var o = new h(),
          s = [],
          a = function (n) {
        var r = fn(t(n.value()));return u.push(r), o.add(function (n, t) {
          return r.dispatcher.subscribe(function (e) {
            if (e.isEnd()) return P.remove(r, u), c(), f(t), w.noMore;("undefined" != typeof e && null !== e ? e._isInitial : void 0) && (e = e.toNext());var o = i(e);return o === w.noMore && n(), o;
          });
        });
      },
          c = function () {
        var n = s.shift();return n ? a(n) : void 0;
      },
          f = function (n) {
        return n(), o.empty() ? i(K()) : void 0;
      };return o.add(function (t, u) {
        return n.dispatcher.subscribe(function (n) {
          return n.isEnd() ? f(u) : n.isError() ? i(n) : r && o.count() > 1 ? w.more : o.unsubscribed ? w.noMore : e && o.count() > e ? s.push(n) : a(n);
        });
      }), o.unsubscribe;
    });return s.internalDeps = function () {
      return u.length ? i.concat(u) : i;
    }, s;
  };w.Observable.prototype.flatMapWithConcurrencyLimit = function (n) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];var i = new w.Desc(this, "flatMapWithConcurrencyLimit", [n].concat(r));return V(i, hn(this, cn(r), !1, n));
  }, w.Observable.prototype.flatMapConcat = function () {
    var n = new w.Desc(this, "flatMapConcat", Array.prototype.slice.call(arguments, 0));return V(n, this.flatMapWithConcurrencyLimit.apply(this, [1].concat(g.call(arguments))));
  }, w.later = function (n, t) {
    return V(new w.Desc(w, "later", [n, t]), w.fromBinder(function (r) {
      var e = function () {
        return r([t, K()]);
      },
          i = w.scheduler.setTimeout(e, n);return function () {
        return w.scheduler.clearTimeout(i);
      };
    }));
  }, w.Observable.prototype.bufferingThrottle = function (n) {
    var t = new w.Desc(this, "bufferingThrottle", [n]);return V(t, this.flatMapConcat(function (t) {
      return w.once(t).concat(w.later(n).filter(!1));
    }));
  }, w.Property.prototype.bufferingThrottle = function () {
    return w.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
  }, I(b, p), k(b.prototype, { unsubAll: function () {
      for (var n, t = this.subscriptions, r = 0; r < t.length; r++) n = t[r], "function" == typeof n.unsub && n.unsub();
    }, subscribeAll: function (n) {
      if (this.ended) n(K());else {
        this.sink = n;for (var t, r = A(this.subscriptions), e = 0; e < r.length; e++) t = r[e], this.subscribeInput(t);
      }return this.unsubAll;
    }, guardedSink: function (n) {
      var t = this;return function (r) {
        return r.isEnd() ? (t.unsubscribeInput(n), w.noMore) : t.sink(r);
      };
    }, subscribeInput: function (n) {
      return n.unsub = n.input.dispatcher.subscribe(this.guardedSink(n.input)), n.unsub;
    }, unsubscribeInput: function (n) {
      for (var t, r = this.subscriptions, e = 0; e < r.length; e++) if (t = r[e], t.input === n) return "function" == typeof t.unsub && t.unsub(), void this.subscriptions.splice(e, 1);
    }, plug: function (n) {
      var t = this;if (!this.ended) {
        var r = { input: n };return this.subscriptions.push(r), "undefined" != typeof this.sink && this.subscribeInput(r), function () {
          return t.unsubscribeInput(n);
        };
      }
    }, end: function () {
      return this.ended = !0, this.unsubAll(), "function" == typeof this.sink ? this.sink(K()) : void 0;
    }, push: function (n) {
      if (!this.ended && "function" == typeof this.sink) {
        var t = !this.pushing;if (!t) return this.pushQueue || (this.pushQueue = []), void this.pushQueue.push(n);this.pushing = !0;try {
          return this.sink(J(n));
        } finally {
          if (t && this.pushQueue) {
            for (var r = 0; r < this.pushQueue.length;) {
              var n = this.pushQueue[r];this.sink(J(n)), r++;
            }this.pushQueue = null;
          }this.pushing = !1;
        }
      }
    }, error: function (n) {
      return "function" == typeof this.sink ? this.sink(new c(n)) : void 0;
    } }), w.Bus = b;var ln = function (n, t) {
    return B(function (r) {
      for (var e = C(t, [function (n, t) {
        return r.apply(void 0, n.concat([t]));
      }]), i = arguments.length, u = Array(i > 1 ? i - 1 : 0), o = 1; i > o; o++) u[o - 1] = arguments[o];return V(new w.Desc(w, n, [r].concat(u)), w.combineAsArray(u).flatMap(e));
    });
  };w.fromCallback = ln("fromCallback", function (n) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return w.fromBinder(function (t) {
      return z(n, r)(t), S;
    }, function (n) {
      return [n, K()];
    });
  }), w.fromNodeCallback = ln("fromNodeCallback", function (n) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return w.fromBinder(function (t) {
      return z(n, r)(t), S;
    }, function (n, t) {
      return n ? [new c(n), K()] : [t, K()];
    });
  }), w.combineTemplate = function (n) {
    function t(n) {
      return n[n.length - 1];
    }function r(n, r, e) {
      return t(n)[r] = e, e;
    }function e(n, t) {
      return function (e, i) {
        return r(e, n, i[t]);
      };
    }function i(n, t) {
      return function (e) {
        return r(e, n, t);
      };
    }function u(n) {
      return O(n) ? [] : {};
    }function o(n, t) {
      return function (e) {
        var i = u(t);return r(e, n, i), e.push(i);
      };
    }function s(n, t) {
      if (M(t)) return h.push(t), f.push(e(n, h.length - 1));if (!t || t.constructor != Object && t.constructor != Array) return f.push(i(n, t));var r = function (n) {
        return n.pop();
      };return f.push(o(n, t)), c(t), f.push(r);
    }function a(t) {
      for (var r, e = u(n), i = [e], o = 0; o < f.length; o++) (r = f[o])(i, t);return e;
    }function c(n) {
      return P.each(n, s);
    }var f = [],
        h = [];return c(n), V(new w.Desc(w, "combineTemplate", [n]), w.combineAsArray(h).map(a));
  };var pn = function (n, t) {
    var r = new p(T(n, "justInitValue"), function (t) {
      var e = void 0,
          i = n.dispatcher.subscribe(function (n) {
        return n.isEnd() || (e = n), w.noMore;
      });return W.whenDoneWith(r, function () {
        return "undefined" != typeof e && null !== e && t(e), t(K());
      }), i;
    });return r.concat(t).toProperty();
  };w.Observable.prototype.mapEnd = function () {
    var n = F(arguments);return V(new w.Desc(this, "mapEnd", [n]), this.withHandler(function (t) {
      return t.isEnd() ? (this.push(J(n(t))), this.push(K()), w.noMore) : this.push(t);
    }));
  }, w.Observable.prototype.skipErrors = function () {
    return V(new w.Desc(this, "skipErrors", []), this.withHandler(function (n) {
      return n.isError() ? w.more : this.push(n);
    }));
  }, w.EventStream.prototype.takeUntil = function (n) {
    var t = {};return V(new w.Desc(this, "takeUntil", [n]), w.groupSimultaneous(this.mapEnd(t), n.skipErrors()).withHandler(function (n) {
      if (n.hasValue()) {
        var r = n.value(),
            e = r[0],
            i = r[1];if (i.length) return this.push(K());for (var u, o = w.more, s = 0; s < e.length; s++) u = e[s], o = this.push(u === t ? K() : J(u));return o;
      }return this.push(n);
    }));
  }, w.Property.prototype.takeUntil = function (n) {
    var t = this.changes().takeUntil(n);return V(new w.Desc(this, "takeUntil", [n]), pn(this, t));
  }, w.Observable.prototype.flatMapLatest = function () {
    var n = cn(arguments),
        t = this.toEventStream();return V(new w.Desc(this, "flatMapLatest", [n]), t.flatMap(function (r) {
      return fn(n(r)).takeUntil(t);
    }));
  }, w.Property.prototype.delayChanges = function (n, t) {
    return V(n, pn(this, t(this.changes())));
  }, w.EventStream.prototype.delayChanges = function (n, t) {
    return V(n, t(this));
  }, w.Observable.prototype.delay = function (n) {
    return this.delayChanges(new w.Desc(this, "delay", [n]), function (t) {
      return t.flatMap(function (t) {
        return w.later(n, t);
      });
    });
  }, w.Observable.prototype.debounce = function (n) {
    return this.delayChanges(new w.Desc(this, "debounce", [n]), function (t) {
      return t.flatMapLatest(function (t) {
        return w.later(n, t);
      });
    });
  }, w.Observable.prototype.debounceImmediate = function (n) {
    return this.delayChanges(new w.Desc(this, "debounceImmediate", [n]), function (t) {
      return t.flatMapFirst(function (t) {
        return w.once(t).concat(w.later(n).filter(!1));
      });
    });
  }, w.Observable.prototype.decode = function (n) {
    return V(new w.Desc(this, "decode", [n]), this.combine(w.combineTemplate(n), function (n, t) {
      return t[n];
    }));
  }, w.Observable.prototype.scan = function (n, t) {
    var r,
        e = this;t = j(t);var u = Z(n),
        o = !1,
        a = function (n) {
      var a = !1,
          c = S,
          f = w.more,
          h = function () {
        return a ? void 0 : u.forEach(function (t) {
          return a = o = !0, f = n(new s(function () {
            return t;
          })), f === w.noMore ? (c(), c = S) : void 0;
        });
      };return c = e.dispatcher.subscribe(function (r) {
        if (r.hasValue()) {
          if (o && r.isInitial()) return w.more;r.isInitial() || h(), a = o = !0;var e = u.getOrElse(void 0),
              s = t(e, r.value());return u = new i(s), n(r.apply(function () {
            return s;
          }));
        }return r.isEnd() && (f = h()), f !== w.noMore ? n(r) : void 0;
      }), W.whenDoneWith(r, h), c;
    };return r = new d(new w.Desc(this, "scan", [n, t]), a);
  }, w.Observable.prototype.diff = function (n, t) {
    return t = j(t), V(new w.Desc(this, "diff", [n, t]), this.scan([n], function (n, r) {
      return [r, t(n[0], r)];
    }).filter(function (n) {
      return 2 === n.length;
    }).map(function (n) {
      return n[1];
    }));
  }, w.Observable.prototype.doAction = function () {
    var n = F(arguments);return V(new w.Desc(this, "doAction", [n]), this.withHandler(function (t) {
      return t.hasValue() && n(t.value()), this.push(t);
    }));
  }, w.Observable.prototype.doEnd = function () {
    var n = F(arguments);return V(new w.Desc(this, "doEnd", [n]), this.withHandler(function (t) {
      return t.isEnd() && n(), this.push(t);
    }));
  }, w.Observable.prototype.doError = function () {
    var n = F(arguments);return V(new w.Desc(this, "doError", [n]), this.withHandler(function (t) {
      return t.isError() && n(t.error), this.push(t);
    }));
  }, w.Observable.prototype.doLog = function () {
    for (var n = arguments.length, t = Array(n), r = 0; n > r; r++) t[r] = arguments[r];return V(new w.Desc(this, "doLog", t), this.withHandler(function (n) {
      return "undefined" != typeof console && null !== console && "function" == typeof console.log && console.log.apply(console, t.concat([n.log()])), this.push(n);
    }));
  }, w.Observable.prototype.endOnError = function (n) {
    ("undefined" == typeof n || null === n) && (n = !0);for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return Q(this, n, r, function (n) {
      return V(new w.Desc(this, "endOnError", []), this.withHandler(function (t) {
        return t.isError() && n(t.error) ? (this.push(t), this.push(K())) : this.push(t);
      }));
    });
  }, f.prototype.errors = function () {
    return V(new w.Desc(this, "errors", []), this.filter(function () {
      return !1;
    }));
  }, w.Observable.prototype.take = function (n) {
    return 0 >= n ? w.never() : V(new w.Desc(this, "take", [n]), this.withHandler(function (t) {
      return t.hasValue() ? (n--, n > 0 ? this.push(t) : (0 === n && this.push(t), this.push(K()), w.noMore)) : this.push(t);
    }));
  }, w.Observable.prototype.first = function () {
    return V(new w.Desc(this, "first", []), this.take(1));
  }, w.Observable.prototype.mapError = function () {
    var n = F(arguments);return V(new w.Desc(this, "mapError", [n]), this.withHandler(function (t) {
      return this.push(t.isError() ? J(n(t.error)) : t);
    }));
  }, w.Observable.prototype.flatMapError = function (n) {
    var t = new w.Desc(this, "flatMapError", [n]);return V(t, this.mapError(function (n) {
      return new c(n);
    }).flatMap(function (t) {
      return t instanceof c ? n(t.error) : w.once(t);
    }));
  }, w.EventStream.prototype.flatScan = function (n, t) {
    var r = n;return this.flatMapConcat(function (n) {
      return fn(t(r, n)).doAction(function (n) {
        return r = n;
      });
    }).toProperty(n);
  }, w.EventStream.prototype.sampledBy = function (n, t) {
    return V(new w.Desc(this, "sampledBy", [n, t]), this.toProperty().sampledBy(n, t));
  }, w.Property.prototype.sampledBy = function (t, r) {
    var e = !1;"undefined" != typeof r && null !== r ? r = j(r) : (e = !0, r = function (n) {
      return n.value();
    });var i = new n(this, !1, e),
        u = new n(t, !0, e),
        o = w.when([i, u], r),
        s = t._isProperty ? o.toProperty() : o;return V(new w.Desc(this, "sampledBy", [t, r]), s);
  }, w.Property.prototype.sample = function (n) {
    return V(new w.Desc(this, "sample", [n]), this.sampledBy(w.interval(n, {})));
  }, w.Observable.prototype.map = function (n) {
    if (n && n._isProperty) return n.sampledBy(this, D);for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return Q(this, n, r, function (n) {
      return V(new w.Desc(this, "map", [n]), this.withHandler(function (t) {
        return this.push(t.fmap(n));
      }));
    });
  }, w.Observable.prototype.fold = function (n, t) {
    return V(new w.Desc(this, "fold", [n, t]), this.scan(n, t).sampledBy(this.filter(!1).mapEnd().toProperty()));
  }, f.prototype.reduce = f.prototype.fold;var vn = [["addEventListener", "removeEventListener"], ["addListener", "removeListener"], ["on", "off"], ["bind", "unbind"]],
      dn = function (n) {
    for (var t, r = 0; r < vn.length; r++) {
      t = vn[r];var e = [n[t[0]], n[t[1]]];if (e[0] && e[1]) return e;
    }for (var i = 0; i < vn.length; i++) {
      t = vn[i];var u = n[t[0]];if (u) return [u, function () {}];
    }throw new c("No suitable event methods in " + n);
  };w.fromEventTarget = function (n, t, r) {
    var e = dn(n),
        i = e[0],
        u = e[1],
        o = new w.Desc(w, "fromEvent", [n, t]);return V(o, w.fromBinder(function (r) {
      return i.call(n, t, r), function () {
        return u.call(n, t, r);
      };
    }, r));
  }, w.fromEvent = w.fromEventTarget, w.fromPoll = function (n, t) {
    var r = new w.Desc(w, "fromPoll", [n, t]);return V(r, w.fromBinder(function (t) {
      var r = w.scheduler.setInterval(t, n);return function () {
        return w.scheduler.clearInterval(r);
      };
    }, t));
  }, w.fromPromise = function (n, t) {
    var r = arguments.length <= 2 || void 0 === arguments[2] ? y : arguments[2];return V(new w.Desc(w, "fromPromise", [n]), w.fromBinder(function (r) {
      var e = n.then(r, function (n) {
        return r(new c(n));
      });return e && "function" == typeof e.done && e.done(), t ? function () {
        return "function" == typeof n.abort ? n.abort() : void 0;
      } : function () {};
    }, r));
  }, w.Observable.prototype.groupBy = function (n) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? w._.id : arguments[1],
        r = {},
        e = this;return e.filter(function (t) {
      return !r[n(t)];
    }).map(function (i) {
      var u = n(i),
          o = e.filter(function (t) {
        return n(t) === u;
      }),
          s = w.once(i).concat(o),
          a = t(s, i).withHandler(function (n) {
        return this.push(n), n.isEnd() ? delete r[u] : void 0;
      });return r[u] = a, a;
    });
  }, w.fromArray = function (n) {
    if (n.length) {
      var t = 0,
          r = new p(new w.Desc(w, "fromArray", [n]), function (e) {
        function i() {
          if (a = !0, !s) {
            for (s = !0; a;) if (a = !1, o !== w.noMore && !u) {
              var c = n[t++];o = e(Y(c)), o !== w.noMore && (t === n.length ? e(K()) : W.afterTransaction(r, i));
            }return s = !1;
          }
        }var u = !1,
            o = w.more,
            s = !1,
            a = !1;return i(), function () {
          return u = !0;
        };
      });return r;
    }return V(new w.Desc(w, "fromArray", n), w.never());
  }, w.EventStream.prototype.holdWhen = function (n) {
    var t = !1,
        r = [],
        e = this,
        i = !1;return new p(new w.Desc(this, "holdWhen", [n]), function (u) {
      var o = new h(),
          s = !1,
          a = function (n) {
        return "function" == typeof n && n(), o.empty() && s ? u(K()) : void 0;
      };return o.add(function (e, o) {
        return n.subscribeInternal(function (n) {
          if (!n.hasValue()) return n.isEnd() ? a(o) : u(n);if (t = n.value(), !t) {
            var e = r;return r = [], function () {
              for (var n, t = [], r = 0; r < e.length; r++) n = e[r], t.push(u(J(n)));return i && (t.push(u(K())), o()), t;
            }();
          }
        });
      }), o.add(function (n, o) {
        return e.subscribeInternal(function (n) {
          return t && n.hasValue() ? r.push(n.value()) : n.isEnd() && r.length ? (i = !0, a(o)) : u(n);
        });
      }), s = !0, a(), o.unsubscribe;
    });
  }, w.interval = function (n) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];return V(new w.Desc(w, "interval", [n, t]), w.fromPoll(n, function () {
      return J(t);
    }));
  }, w.$ = {}, w.$.asEventStream = function (n, t, r) {
    var e = this;return P.isFunction(t) && (r = t, t = void 0), V(new w.Desc(this.selector || this, "asEventStream", [n]), w.fromBinder(function (r) {
      return e.on(n, t, r), function () {
        return e.off(n, t, r);
      };
    }, r));
  }, "undefined" != typeof jQuery && jQuery && (jQuery.fn.asEventStream = w.$.asEventStream), "undefined" != typeof Zepto && Zepto && (Zepto.fn.asEventStream = w.$.asEventStream), w.Observable.prototype.last = function () {
    var n;return V(new w.Desc(this, "last", []), this.withHandler(function (t) {
      return t.isEnd() ? (n && this.push(n), this.push(K()), w.noMore) : void (n = t);
    }));
  }, w.Observable.prototype.log = function () {
    for (var n = arguments.length, t = Array(n), r = 0; n > r; r++) t[r] = arguments[r];return this.subscribe(function (n) {
      "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, t.concat([n.log()]));
    }), this;
  }, w.EventStream.prototype.merge = function (n) {
    var t = this;return V(new w.Desc(t, "merge", [n]), w.mergeAll(this, n));
  }, w.mergeAll = function () {
    var n = un(arguments);return n.length ? new p(new w.Desc(w, "mergeAll", n), function (t) {
      var r = 0,
          e = function (e) {
        return function (i) {
          return e.dispatcher.subscribe(function (e) {
            if (e.isEnd()) return r++, r === n.length ? t(K()) : w.more;var u = t(e);return u === w.noMore && i(), u;
          });
        };
      },
          i = P.map(e, n);return new w.CompositeUnsubscribe(i).unsubscribe;
    }) : w.never();
  }, w.repeatedly = function (n, t) {
    var r = 0;return V(new w.Desc(w, "repeatedly", [n, t]), w.fromPoll(n, function () {
      return t[r++ % t.length];
    }));
  }, w.repeat = function (n) {
    var t = 0;return w.fromBinder(function (r) {
      function e(n) {
        return n.isEnd() ? u ? i() : u = !0 : o = r(n);
      }function i() {
        var i;for (u = !0; u && o !== w.noMore;) i = n(t++), u = !1, i ? s = i.subscribeInternal(e) : r(K());return u = !0;
      }var u = !1,
          o = w.more,
          s = function () {};return i(), function () {
        return s();
      };
    });
  }, w.retry = function (n) {
    if (!P.isFunction(n.source)) throw new E("'source' option has to be a function");var t = n.source,
        r = n.retries || 0,
        e = 0,
        i = n.delay || function () {
      return 0;
    },
        u = n.isRetryable || function () {
      return !0;
    },
        o = !1,
        s = null;return V(new w.Desc(w, "retry", [n]), w.repeat(function (n) {
      function a() {
        return t(n).endOnError().withHandler(function (n) {
          return n.isError() ? (s = n, u(s.error) && (0 === r || r > e) ? void 0 : (o = !0, this.push(n))) : (n.hasValue() && (s = null, o = !0), this.push(n));
        });
      }if (o) return null;if (s) {
        var c = { error: s.error, retriesDone: e },
            f = w.later(i(c)).filter(!1);return e++, f.concat(w.once().flatMap(a));
      }return a();
    }));
  }, w.sequentially = function (n, t) {
    var r = 0;return V(new w.Desc(w, "sequentially", [n, t]), w.fromPoll(n, function () {
      var n = t[r++];return r < t.length ? n : r === t.length ? [n, K()] : K();
    }));
  }, w.Observable.prototype.skip = function (n) {
    return V(new w.Desc(this, "skip", [n]), this.withHandler(function (t) {
      return t.hasValue() && n > 0 ? (n--, w.more) : this.push(t);
    }));
  }, w.EventStream.prototype.skipUntil = function (n) {
    var t = n.take(1).map(!0).toProperty(!1);return V(new w.Desc(this, "skipUntil", [n]), this.filter(t));
  }, w.EventStream.prototype.skipWhile = function (n) {
    for (var t = !1, r = arguments.length, e = Array(r > 1 ? r - 1 : 0), i = 1; r > i; i++) e[i - 1] = arguments[i];return Q(this, n, e, function (n) {
      return V(new w.Desc(this, "skipWhile", [n]), this.withHandler(function (r) {
        return !t && r.hasValue() && n(r.value()) ? w.more : (r.hasValue() && (t = !0), this.push(r));
      }));
    });
  }, w.Observable.prototype.slidingWindow = function (n) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];return V(new w.Desc(this, "slidingWindow", [n, t]), this.scan([], function (t, r) {
      return t.concat([r]).slice(-n);
    }).filter(function (n) {
      return n.length >= t;
    }));
  };var bn = [],
      tn = function (n) {
    if (bn.length && !tn.running) try {
      tn.running = !0, bn.forEach(function (t) {
        t(n);
      });
    } finally {
      delete tn.running;
    }
  };w.spy = function (n) {
    return bn.push(n);
  }, w.Property.prototype.startWith = function (n) {
    return V(new w.Desc(this, "startWith", [n]), this.scan(n, function (n, t) {
      return t;
    }));
  }, w.EventStream.prototype.startWith = function (n) {
    return V(new w.Desc(this, "startWith", [n]), w.once(n).concat(this));
  }, w.Observable.prototype.takeWhile = function (n) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; t > e; e++) r[e - 1] = arguments[e];return Q(this, n, r, function (n) {
      return V(new w.Desc(this, "takeWhile", [n]), this.withHandler(function (t) {
        return t.filter(n) ? this.push(t) : (this.push(K()), w.noMore);
      }));
    });
  }, w.Observable.prototype.throttle = function (n) {
    return this.delayChanges(new w.Desc(this, "throttle", [n]), function (t) {
      return t.bufferWithTime(n).map(function (n) {
        return n[n.length - 1];
      });
    });
  }, f.prototype.firstToPromise = function (n) {
    var t = this;if ("function" != typeof n) {
      if ("function" != typeof Promise) throw new E("There isn't default Promise, use shim or parameter");n = Promise;
    }return new n(function (n, r) {
      return t.subscribe(function (t) {
        return t.hasValue() && n(t.value()), t.isError() && r(t.error), w.noMore;
      });
    });
  }, f.prototype.toPromise = function (n) {
    return this.last().firstToPromise(n);
  }, w["try"] = function (n) {
    return function (t) {
      try {
        return w.once(n(t));
      } catch (r) {
        return new w.Error(r);
      }
    };
  }, w.update = function (n) {
    function t(n) {
      return function () {
        for (var t = arguments.length, r = Array(t), e = 0; t > e; e++) r[e] = arguments[e];return function (t) {
          return n.apply(void 0, [t].concat(r));
        };
      };
    }for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), i = 1; r > i; i++) e[i - 1] = arguments[i];for (var u = e.length - 1; u > 0;) e[u] instanceof Function || (e[u] = P.always(e[u])), e[u] = t(e[u]), u -= 2;return V(new w.Desc(w, "update", [n].concat(e)), w.when.apply(w, e).scan(n, function (n, t) {
      return t(n);
    }));
  }, w.zipAsArray = function () {
    for (var n = arguments.length, t = Array(n), r = 0; n > r; r++) t[r] = arguments[r];var e = un(t);return V(new w.Desc(w, "zipAsArray", e), w.zipWith(e, function () {
      for (var n = arguments.length, t = Array(n), r = 0; n > r; r++) t[r] = arguments[r];return t;
    }));
  }, w.zipWith = function () {
    for (var n = arguments.length, t = Array(n), r = 0; n > r; r++) t[r] = arguments[r];var e = on(t),
        i = e[0],
        u = e[1];return i = P.map(function (n) {
      return n.toEventStream();
    }, i), V(new w.Desc(w, "zipWith", [u].concat(i)), w.when(i, u));
  }, w.Observable.prototype.zip = function (n, t) {
    return V(new w.Desc(this, "zip", [n]), w.zipWith([this, n], t || Array));
  }, m.prototype.subscribe = function (n, t, r) {
    var e = "function" == typeof n ? { next: n, error: t, complete: r } : n,
        i = { closed: !1, unsubscribe: function () {
        i.closed = !0, u();
      } },
        u = this.observable.subscribe(function (n) {
      n.isError() ? (e.error && e.error(n.error), i.unsubscribe()) : n.isEnd() ? (i.closed = !0, e.complete && e.complete()) : e.next && e.next(n.value());
    });return i;
  }, m.prototype[x("observable")] = function () {
    return this;
  }, w.Observable.prototype.toESObservable = function () {
    return new m(this);
  }, w.Observable.prototype[x("observable")] = w.Observable.prototype.toESObservable, w.fromESObservable = function (n) {
    var t;t = n[x("observable")] ? n[x("observable")]() : n;var r = new w.Desc(w, "fromESObservable", [t]);return new w.EventStream(r, function (n) {
      var r = t.subscribe({ error: function () {
          n(new w.Error()), n(new w.End());
        }, next: function (t) {
          n(new w.Next(t, !0));
        }, complete: function () {
          n(new w.End());
        } });return r.unsubscribe ? function () {
        r.unsubscribe();
      } : r;
    });
  }, "undefined" != "function" && null !== __webpack_require__(20) && null != __webpack_require__(21) ? (!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return w;
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)), "undefined" != typeof this && null !== this && (this.Bacon = w)) : "undefined" != typeof module && null !== module && null != module.exports ? (module.exports = w, w.Bacon = w) : this.Bacon = w;
}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(15)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(2));else if (typeof define == "function" && define.amd) // AMD
    define(["../lib/codemirror"], mod);else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.modeInfo = [{ name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"] }, { name: "PGP", mimes: ["application/pgp", "application/pgp-keys", "application/pgp-signature"], mode: "asciiarmor", ext: ["pgp"] }, { name: "ASN.1", mime: "text/x-ttcn-asn", mode: "asn.1", ext: ["asn", "asn1"] }, { name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk", file: /^extensions\.conf$/i }, { name: "Brainfuck", mime: "text/x-brainfuck", mode: "brainfuck", ext: ["b", "bf"] }, { name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"] }, { name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"] }, { name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"] }, { name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp"] }, { name: "Clojure", mime: "text/x-clojure", mode: "clojure", ext: ["clj", "cljc", "cljx"] }, { name: "ClojureScript", mime: "text/x-clojurescript", mode: "clojure", ext: ["cljs"] }, { name: "Closure Stylesheets (GSS)", mime: "text/x-gss", mode: "css", ext: ["gss"] }, { name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists.txt$/ }, { name: "CoffeeScript", mime: "text/x-coffeescript", mode: "coffeescript", ext: ["coffee"], alias: ["coffee", "coffee-script"] }, { name: "Common Lisp", mime: "text/x-common-lisp", mode: "commonlisp", ext: ["cl", "lisp", "el"], alias: ["lisp"] }, { name: "Cypher", mime: "application/x-cypher-query", mode: "cypher", ext: ["cyp", "cypher"] }, { name: "Cython", mime: "text/x-cython", mode: "python", ext: ["pyx", "pxd", "pxi"] }, { name: "Crystal", mime: "text/x-crystal", mode: "crystal", ext: ["cr"] }, { name: "CSS", mime: "text/css", mode: "css", ext: ["css"] }, { name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"] }, { name: "D", mime: "text/x-d", mode: "d", ext: ["d"] }, { name: "Dart", mimes: ["application/dart", "text/x-dart"], mode: "dart", ext: ["dart"] }, { name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"] }, { name: "Django", mime: "text/x-django", mode: "django" }, { name: "Dockerfile", mime: "text/x-dockerfile", mode: "dockerfile", file: /^Dockerfile$/ }, { name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"] }, { name: "Dylan", mime: "text/x-dylan", mode: "dylan", ext: ["dylan", "dyl", "intr"] }, { name: "EBNF", mime: "text/x-ebnf", mode: "ebnf" }, { name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"] }, { name: "edn", mime: "application/edn", mode: "clojure", ext: ["edn"] }, { name: "Eiffel", mime: "text/x-eiffel", mode: "eiffel", ext: ["e"] }, { name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"] }, { name: "Embedded Javascript", mime: "application/x-ejs", mode: "htmlembedded", ext: ["ejs"] }, { name: "Embedded Ruby", mime: "application/x-erb", mode: "htmlembedded", ext: ["erb"] }, { name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"] }, { name: "Factor", mime: "text/x-factor", mode: "factor", ext: ["factor"] }, { name: "FCL", mime: "text/x-fcl", mode: "fcl" }, { name: "Forth", mime: "text/x-forth", mode: "forth", ext: ["forth", "fth", "4th"] }, { name: "Fortran", mime: "text/x-fortran", mode: "fortran", ext: ["f", "for", "f77", "f90"] }, { name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"] }, { name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"] }, { name: "Gherkin", mime: "text/x-feature", mode: "gherkin", ext: ["feature"] }, { name: "GitHub Flavored Markdown", mime: "text/x-gfm", mode: "gfm", file: /^(readme|contributing|history).md$/i }, { name: "Go", mime: "text/x-go", mode: "go", ext: ["go"] }, { name: "Groovy", mime: "text/x-groovy", mode: "groovy", ext: ["groovy", "gradle"], file: /^Jenkinsfile$/ }, { name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"] }, { name: "Haskell", mime: "text/x-haskell", mode: "haskell", ext: ["hs"] }, { name: "Haskell (Literate)", mime: "text/x-literate-haskell", mode: "haskell-literate", ext: ["lhs"] }, { name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"] }, { name: "HXML", mime: "text/x-hxml", mode: "haxe", ext: ["hxml"] }, { name: "ASP.NET", mime: "application/x-aspx", mode: "htmlembedded", ext: ["aspx"], alias: ["asp", "aspx"] }, { name: "HTML", mime: "text/html", mode: "htmlmixed", ext: ["html", "htm"], alias: ["xhtml"] }, { name: "HTTP", mime: "message/http", mode: "http" }, { name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"] }, { name: "Pug", mime: "text/x-pug", mode: "pug", ext: ["jade", "pug"], alias: ["jade"] }, { name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"] }, { name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"] }, { name: "JavaScript", mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
    mode: "javascript", ext: ["js"], alias: ["ecmascript", "js", "node"] }, { name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"] }, { name: "JSON-LD", mime: "application/ld+json", mode: "javascript", ext: ["jsonld"], alias: ["jsonld"] }, { name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"] }, { name: "Jinja2", mime: "null", mode: "jinja2" }, { name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"] }, { name: "Kotlin", mime: "text/x-kotlin", mode: "clike", ext: ["kt"] }, { name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"] }, { name: "LiveScript", mime: "text/x-livescript", mode: "livescript", ext: ["ls"], alias: ["ls"] }, { name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"] }, { name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"] }, { name: "mIRC", mime: "text/mirc", mode: "mirc" }, { name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql" }, { name: "Mathematica", mime: "text/x-mathematica", mode: "mathematica", ext: ["m", "nb"] }, { name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"] }, { name: "MUMPS", mime: "text/x-mumps", mode: "mumps", ext: ["mps"] }, { name: "MS SQL", mime: "text/x-mssql", mode: "sql" }, { name: "mbox", mime: "application/mbox", mode: "mbox", ext: ["mbox"] }, { name: "MySQL", mime: "text/x-mysql", mode: "sql" }, { name: "Nginx", mime: "text/x-nginx-conf", mode: "nginx", file: /nginx.*\.conf$/i }, { name: "NSIS", mime: "text/x-nsis", mode: "nsis", ext: ["nsh", "nsi"] }, { name: "NTriples", mime: "text/n-triples", mode: "ntriples", ext: ["nt"] }, { name: "Objective C", mime: "text/x-objectivec", mode: "clike", ext: ["m", "mm"], alias: ["objective-c", "objc"] }, { name: "OCaml", mime: "text/x-ocaml", mode: "mllike", ext: ["ml", "mli", "mll", "mly"] }, { name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"] }, { name: "Oz", mime: "text/x-oz", mode: "oz", ext: ["oz"] }, { name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"] }, { name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"] }, { name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"] }, { name: "PHP", mime: "application/x-httpd-php", mode: "php", ext: ["php", "php3", "php4", "php5", "phtml"] }, { name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"] }, { name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"] }, { name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"] }, { name: "PowerShell", mime: "application/x-powershell", mode: "powershell", ext: ["ps1", "psd1", "psm1"] }, { name: "Properties files", mime: "text/x-properties", mode: "properties", ext: ["properties", "ini", "in"], alias: ["ini", "properties"] }, { name: "ProtoBuf", mime: "text/x-protobuf", mode: "protobuf", ext: ["proto"] }, { name: "Python", mime: "text/x-python", mode: "python", ext: ["BUILD", "bzl", "py", "pyw"], file: /^(BUCK|BUILD)$/ }, { name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"] }, { name: "Q", mime: "text/x-q", mode: "q", ext: ["q"] }, { name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r", "R"], alias: ["rscript"] }, { name: "reStructuredText", mime: "text/x-rst", mode: "rst", ext: ["rst"], alias: ["rst"] }, { name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm" }, { name: "RPM Spec", mime: "text/x-rpm-spec", mode: "rpm", ext: ["spec"] }, { name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"] }, { name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"] }, { name: "SAS", mime: "text/x-sas", mode: "sas", ext: ["sas"] }, { name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"] }, { name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"] }, { name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"] }, { name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"] }, { name: "Shell", mime: "text/x-sh", mode: "shell", ext: ["sh", "ksh", "bash"], alias: ["bash", "sh", "zsh"], file: /^PKGBUILD$/ }, { name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"] }, { name: "Slim", mimes: ["text/x-slim", "application/x-slim"], mode: "slim", ext: ["slim"] }, { name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"] }, { name: "Smarty", mime: "text/x-smarty", mode: "smarty", ext: ["tpl"] }, { name: "Solr", mime: "text/x-solr", mode: "solr" }, { name: "Soy", mime: "text/x-soy", mode: "soy", ext: ["soy"], alias: ["closure template"] }, { name: "SPARQL", mime: "application/sparql-query", mode: "sparql", ext: ["rq", "sparql"], alias: ["sparul"] }, { name: "Spreadsheet", mime: "text/x-spreadsheet", mode: "spreadsheet", alias: ["excel", "formula"] }, { name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"] }, { name: "SQLite", mime: "text/x-sqlite", mode: "sql" }, { name: "Squirrel", mime: "text/x-squirrel", mode: "clike", ext: ["nut"] }, { name: "Stylus", mime: "text/x-styl", mode: "stylus", ext: ["styl"] }, { name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"] }, { name: "sTeX", mime: "text/x-stex", mode: "stex" }, { name: "LaTeX", mime: "text/x-latex", mode: "stex", ext: ["text", "ltx"], alias: ["tex"] }, { name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v"] }, { name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"] }, { name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"] }, { name: "TiddlyWiki ", mime: "text/x-tiddlywiki", mode: "tiddlywiki" }, { name: "Tiki wiki", mime: "text/tiki", mode: "tiki" }, { name: "TOML", mime: "text/x-toml", mode: "toml", ext: ["toml"] }, { name: "Tornado", mime: "text/x-tornado", mode: "tornado" }, { name: "troff", mime: "text/troff", mode: "troff", ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }, { name: "TTCN", mime: "text/x-ttcn", mode: "ttcn", ext: ["ttcn", "ttcn3", "ttcnpp"] }, { name: "TTCN_CFG", mime: "text/x-ttcn-cfg", mode: "ttcn-cfg", ext: ["cfg"] }, { name: "Turtle", mime: "text/turtle", mode: "turtle", ext: ["ttl"] }, { name: "TypeScript", mime: "application/typescript", mode: "javascript", ext: ["ts"], alias: ["ts"] }, { name: "TypeScript-JSX", mime: "text/typescript-jsx", mode: "jsx", ext: ["tsx"], alias: ["tsx"] }, { name: "Twig", mime: "text/x-twig", mode: "twig" }, { name: "Web IDL", mime: "text/x-webidl", mode: "webidl", ext: ["webidl"] }, { name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"] }, { name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"] }, { name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"] }, { name: "Verilog", mime: "text/x-verilog", mode: "verilog", ext: ["v"] }, { name: "VHDL", mime: "text/x-vhdl", mode: "vhdl", ext: ["vhd", "vhdl"] }, { name: "Vue.js Component", mimes: ["script/x-vue", "text/x-vue"], mode: "vue", ext: ["vue"] }, { name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd", "svg"], alias: ["rss", "wsdl", "xsd"] }, { name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"] }, { name: "Yacas", mime: "text/x-yacas", mode: "yacas", ext: ["ys"] }, { name: "YAML", mimes: ["text/x-yaml", "text/yaml"], mode: "yaml", ext: ["yaml", "yml"], alias: ["yml"] }, { name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"] }, { name: "mscgen", mime: "text/x-mscgen", mode: "mscgen", ext: ["mscgen", "mscin", "msc"] }, { name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"] }, { name: "msgenny", mime: "text/x-msgenny", mode: "mscgen", ext: ["msgenny"] }];
  // Ensure all modes have a mime property for backwards compatibility
  for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
    var info = CodeMirror.modeInfo[i];
    if (info.mimes) info.mime = info.mimes[0];
  }

  CodeMirror.findModeByMIME = function (mime) {
    mime = mime.toLowerCase();
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.mime == mime) return info;
      if (info.mimes) for (var j = 0; j < info.mimes.length; j++) if (info.mimes[j] == mime) return info;
    }
    if (/\+xml$/.test(mime)) return CodeMirror.findModeByMIME("application/xml");
    if (/\+json$/.test(mime)) return CodeMirror.findModeByMIME("application/json");
  };

  CodeMirror.findModeByExtension = function (ext) {
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.ext) for (var j = 0; j < info.ext.length; j++) if (info.ext[j] == ext) return info;
    }
  };

  CodeMirror.findModeByFileName = function (filename) {
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.file && info.file.test(filename)) return info;
    }
    var dot = filename.lastIndexOf(".");
    var ext = dot > -1 && filename.substring(dot + 1, filename.length);
    if (ext) return CodeMirror.findModeByExtension(ext);
  };

  CodeMirror.findModeByName = function (name) {
    name = name.toLowerCase();
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.name.toLowerCase() == name) return info;
      if (info.alias) for (var j = 0; j < info.alias.length; j++) if (info.alias[j].toLowerCase() == name) return info;
    }
  };
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* latin-ext */\r\n@font-face {\r\n  font-family: 'Source Code Pro';\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(https://fonts.gstatic.com/s/sourcecodepro/v6/mrl8jkM18OlOQN8JLgasDy2Q8seG17bfDXYR_jUsrzg.woff2) format('woff2');\r\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\r\n}\r\n/* latin */\r\n@font-face {\r\n  font-family: 'Source Code Pro';\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(https://fonts.gstatic.com/s/sourcecodepro/v6/mrl8jkM18OlOQN8JLgasD9V_2ngZ8dMf8fLgjYEouxg.woff2) format('woff2');\r\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\r\n}", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports
exports.i(__webpack_require__(16), "");

// module
exports.push([module.i, "body, .CodeMirror{\r\n  font-family: \"Source Code Pro\";\r\n  font-size:  13px;\r\n  height: 100%;\r\n  width: 100%;\r\n  padding: 0px;\r\n  margin: 0px;\r\n  clear: both;\r\n  position: absolute;\r\n}\r\n\r\n.commandbar{\r\n    font-family: \"Source Code Pro\";\r\n    font-size:  13px;\r\n}\r\n\r\n@media screen and (max-device-width:1000px){\r\n    .phone-run{\r\n        display: block;\r\n        position: fixed;\r\n        bottom: 0px;\r\n        left: 0px;\r\n        right: 0px;\r\n        height: 60px;\r\n        z-index: 5000;\r\n        width: 100%;\r\n        border: 1px solid #845959;\r\n        background: #845959;\r\n        color: rgb(93, 85, 109);\r\n    }\r\n}\r\n\r\n\r\n@media screen and (min-device-width:1000px){\r\n    .phone-run{\r\n        display: none;\r\n    }\r\n}", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* BASICS */\n\n.CodeMirror {\n  /* Set height, width, borders, and global font properties here */\n  font-family: monospace;\n  height: 300px;\n  color: black;\n}\n\n/* PADDING */\n\n.CodeMirror-lines {\n  padding: 4px 0; /* Vertical padding around content */\n}\n.CodeMirror pre {\n  padding: 0 4px; /* Horizontal padding of content */\n}\n\n.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  background-color: white; /* The little square between H and V scrollbars */\n}\n\n/* GUTTER */\n\n.CodeMirror-gutters {\n  border-right: 1px solid #ddd;\n  background-color: #f7f7f7;\n  white-space: nowrap;\n}\n.CodeMirror-linenumbers {}\n.CodeMirror-linenumber {\n  padding: 0 3px 0 5px;\n  min-width: 20px;\n  text-align: right;\n  color: #999;\n  white-space: nowrap;\n}\n\n.CodeMirror-guttermarker { color: black; }\n.CodeMirror-guttermarker-subtle { color: #999; }\n\n/* CURSOR */\n\n.CodeMirror-cursor {\n  border-left: 1px solid black;\n  border-right: none;\n  width: 0;\n}\n/* Shown when moving in bi-directional text */\n.CodeMirror div.CodeMirror-secondarycursor {\n  border-left: 1px solid silver;\n}\n.cm-fat-cursor .CodeMirror-cursor {\n  width: auto;\n  border: 0 !important;\n  background: #7e7;\n}\n.cm-fat-cursor div.CodeMirror-cursors {\n  z-index: 1;\n}\n\n.cm-animate-fat-cursor {\n  width: auto;\n  border: 0;\n  -webkit-animation: blink 1.06s steps(1) infinite;\n  -moz-animation: blink 1.06s steps(1) infinite;\n  animation: blink 1.06s steps(1) infinite;\n  background-color: #7e7;\n}\n@-moz-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@-webkit-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n\n/* Can style cursor different in overwrite (non-insert) mode */\n.CodeMirror-overwrite .CodeMirror-cursor {}\n\n.cm-tab { display: inline-block; text-decoration: inherit; }\n\n.CodeMirror-rulers {\n  position: absolute;\n  left: 0; right: 0; top: -50px; bottom: -20px;\n  overflow: hidden;\n}\n.CodeMirror-ruler {\n  border-left: 1px solid #ccc;\n  top: 0; bottom: 0;\n  position: absolute;\n}\n\n/* DEFAULT THEME */\n\n.cm-s-default .cm-header {color: blue;}\n.cm-s-default .cm-quote {color: #090;}\n.cm-negative {color: #d44;}\n.cm-positive {color: #292;}\n.cm-header, .cm-strong {font-weight: bold;}\n.cm-em {font-style: italic;}\n.cm-link {text-decoration: underline;}\n.cm-strikethrough {text-decoration: line-through;}\n\n.cm-s-default .cm-keyword {color: #708;}\n.cm-s-default .cm-atom {color: #219;}\n.cm-s-default .cm-number {color: #164;}\n.cm-s-default .cm-def {color: #00f;}\n.cm-s-default .cm-variable,\n.cm-s-default .cm-punctuation,\n.cm-s-default .cm-property,\n.cm-s-default .cm-operator {}\n.cm-s-default .cm-variable-2 {color: #05a;}\n.cm-s-default .cm-variable-3 {color: #085;}\n.cm-s-default .cm-comment {color: #a50;}\n.cm-s-default .cm-string {color: #a11;}\n.cm-s-default .cm-string-2 {color: #f50;}\n.cm-s-default .cm-meta {color: #555;}\n.cm-s-default .cm-qualifier {color: #555;}\n.cm-s-default .cm-builtin {color: #30a;}\n.cm-s-default .cm-bracket {color: #997;}\n.cm-s-default .cm-tag {color: #170;}\n.cm-s-default .cm-attribute {color: #00c;}\n.cm-s-default .cm-hr {color: #999;}\n.cm-s-default .cm-link {color: #00c;}\n\n.cm-s-default .cm-error {color: #f00;}\n.cm-invalidchar {color: #f00;}\n\n.CodeMirror-composing { border-bottom: 2px solid; }\n\n/* Default styles for common addons */\n\ndiv.CodeMirror span.CodeMirror-matchingbracket {color: #0f0;}\ndiv.CodeMirror span.CodeMirror-nonmatchingbracket {color: #f22;}\n.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }\n.CodeMirror-activeline-background {background: #e8f2ff;}\n\n/* STOP */\n\n/* The rest of this file contains styles related to the mechanics of\n   the editor. You probably shouldn't touch them. */\n\n.CodeMirror {\n  position: relative;\n  overflow: hidden;\n  background: white;\n}\n\n.CodeMirror-scroll {\n  overflow: scroll !important; /* Things will break if this is overridden */\n  /* 30px is the magic margin used to hide the element's real scrollbars */\n  /* See overflow: hidden in .CodeMirror */\n  margin-bottom: -30px; margin-right: -30px;\n  padding-bottom: 30px;\n  height: 100%;\n  outline: none; /* Prevent dragging from highlighting the element */\n  position: relative;\n}\n.CodeMirror-sizer {\n  position: relative;\n  border-right: 30px solid transparent;\n}\n\n/* The fake, visible scrollbars. Used to force redraw during scrolling\n   before actual scrolling happens, thus preventing shaking and\n   flickering artifacts. */\n.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  position: absolute;\n  z-index: 6;\n  display: none;\n}\n.CodeMirror-vscrollbar {\n  right: 0; top: 0;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.CodeMirror-hscrollbar {\n  bottom: 0; left: 0;\n  overflow-y: hidden;\n  overflow-x: scroll;\n}\n.CodeMirror-scrollbar-filler {\n  right: 0; bottom: 0;\n}\n.CodeMirror-gutter-filler {\n  left: 0; bottom: 0;\n}\n\n.CodeMirror-gutters {\n  position: absolute; left: 0; top: 0;\n  min-height: 100%;\n  z-index: 3;\n}\n.CodeMirror-gutter {\n  white-space: normal;\n  height: 100%;\n  display: inline-block;\n  vertical-align: top;\n  margin-bottom: -30px;\n}\n.CodeMirror-gutter-wrapper {\n  position: absolute;\n  z-index: 4;\n  background: none !important;\n  border: none !important;\n}\n.CodeMirror-gutter-background {\n  position: absolute;\n  top: 0; bottom: 0;\n  z-index: 4;\n}\n.CodeMirror-gutter-elt {\n  position: absolute;\n  cursor: default;\n  z-index: 4;\n}\n.CodeMirror-gutter-wrapper ::selection { background-color: transparent }\n.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }\n\n.CodeMirror-lines {\n  cursor: text;\n  min-height: 1px; /* prevents collapsing before first draw */\n}\n.CodeMirror pre {\n  /* Reset some styles that the rest of the page might have set */\n  -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;\n  border-width: 0;\n  background: transparent;\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n  white-space: pre;\n  word-wrap: normal;\n  line-height: inherit;\n  color: inherit;\n  z-index: 2;\n  position: relative;\n  overflow: visible;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-font-variant-ligatures: contextual;\n  font-variant-ligatures: contextual;\n}\n.CodeMirror-wrap pre {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  word-break: normal;\n}\n\n.CodeMirror-linebackground {\n  position: absolute;\n  left: 0; right: 0; top: 0; bottom: 0;\n  z-index: 0;\n}\n\n.CodeMirror-linewidget {\n  position: relative;\n  z-index: 2;\n  overflow: auto;\n}\n\n.CodeMirror-widget {}\n\n.CodeMirror-rtl pre { direction: rtl; }\n\n.CodeMirror-code {\n  outline: none;\n}\n\n/* Force content-box sizing for the elements where we expect it */\n.CodeMirror-scroll,\n.CodeMirror-sizer,\n.CodeMirror-gutter,\n.CodeMirror-gutters,\n.CodeMirror-linenumber {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n\n.CodeMirror-measure {\n  position: absolute;\n  width: 100%;\n  height: 0;\n  overflow: hidden;\n  visibility: hidden;\n}\n\n.CodeMirror-cursor {\n  position: absolute;\n  pointer-events: none;\n}\n.CodeMirror-measure pre { position: static; }\n\ndiv.CodeMirror-cursors {\n  visibility: hidden;\n  position: relative;\n  z-index: 3;\n}\ndiv.CodeMirror-dragcursors {\n  visibility: visible;\n}\n\n.CodeMirror-focused div.CodeMirror-cursors {\n  visibility: visible;\n}\n\n.CodeMirror-selected { background: #d9d9d9; }\n.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }\n.CodeMirror-crosshair { cursor: crosshair; }\n.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }\n.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }\n\n.cm-searching {\n  background: #ffa;\n  background: rgba(255, 255, 0, .4);\n}\n\n/* Used to force a border model for a node */\n.cm-force-border { padding-right: .1px; }\n\n@media print {\n  /* Hide the cursor when printing */\n  .CodeMirror div.CodeMirror-cursors {\n    visibility: hidden;\n  }\n}\n\n/* See issue #2901 */\n.cm-tab-wrap-hack:after { content: ''; }\n\n/* Help users use markselection to safely style text background */\nspan.CodeMirror-selectedtext { background: none; }\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./codemirror.css", function() {
			var newContent = require("!!../../css-loader/index.js!./codemirror.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);