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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = __webpack_require__(11);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(4);
/*</replacement>*/

var Readable = __webpack_require__(22);
var Writable = __webpack_require__(12);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(36);
var ieee754 = __webpack_require__(48);
var isArray = __webpack_require__(18);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return objectToString(e) === '[object Error]' || e instanceof Error;
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).Buffer))

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

let RE = window.RE = {};

RE.$B = RE.bootstrapFuncs = [];
RE.$P = {};
RE.$O = {};
RE.$A = RE.$P.axios = __webpack_require__(30);
RE.$P.bacon = __webpack_require__(31);
RE.Stream = __webpack_require__(33);
RE.Jison = __webpack_require__(32);
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

RE.$C = RE.config = __webpack_require__(26);
RE.$CMD = {};
RE.$CONTEXT = {};
RE.$R = __webpack_require__(29);

__webpack_require__(28);
__webpack_require__(27);
__webpack_require__(34);

RE.$B.initCodeMirror = cm => {

    window.location.hash.replace(/\+([^+]*)/g, function (thing) {
        RE.$R.get(thing)(_ => _);
    });

    window.location.search.replace(/\+([^+]*)/g, function (thing) {
        RE.$R.get(thing)(_ => _);
    });
    RE.$L.link("https://unpkg.com/codemirror/addon/dialog/dialog.css");
    var editor = RE.$O['editor'] = new cm(document.body);
    var extraKeys = RE.$O['keymap'] = {};
    RE.$L.link("https://unpkg.com/codemirror/theme/solarized.css");
    editor.setOption("theme", RE.$B.initTheme);
    editor.setOption("value", RE.$B.initValue);
    editor.setOption("extraKeys", extraKeys);
    RE.$CMD["run"] = function () {
        eval(RE.$O.editor.getValue());
    };
    RE.$CMD["command"] = function (text) {
        console.log(text);
    };
    RE.$O["keymap"]['Shift-Ctrl-1'] = RE.$O["keymap"]['Shift-Cmd-1'] = function () {
        RE.$CMD["run"]();
    };
    RE.$O["keymap"]['Ctrl-`'] = RE.$O["keymap"]['Cmd-`'] = function () {
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
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var buffer = __webpack_require__(3);
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
};
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
};
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
};
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version || process.version.indexOf('v0.') === 0 || process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
    case 0:
    case 1:
      return process.nextTick(fn);
    case 2:
      return process.nextTick(function afterTickOne() {
        fn.call(null, arg1);
      });
    case 3:
      return process.nextTick(function afterTickTwo() {
        fn.call(null, arg1, arg2);
      });
    case 4:
      return process.nextTick(function afterTickThree() {
        fn.call(null, arg1, arg2, arg3);
      });
    default:
      args = new Array(len - 1);
      i = 0;
      while (i < args.length) {
        args[i++] = arguments[i];
      }
      return process.nextTick(function afterTick() {
        fn.apply(null, args);
      });
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



module.exports = Writable;

/*<replacement>*/
var processNextTick = __webpack_require__(11);
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(4);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(61)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(24);
/*</replacement>*/

var Buffer = __webpack_require__(3).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(9);
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(1);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(1);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = Buffer.isBuffer(chunk);

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    chunk = decodeChunk(state, chunk, encoding);
    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(60).setImmediate))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(12);
exports.Duplex = __webpack_require__(1);
exports.Transform = __webpack_require__(23);
exports.PassThrough = __webpack_require__(53);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function () {
	throw new Error("define cannot be used indirect");
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 15;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var EBNF = function () {
    var parser = __webpack_require__(39);

    var transformExpression = function (e, opts, emit) {
        var type = e[0],
            value = e[1],
            name = false;

        if (type === 'xalias') {
            type = e[1];
            value = e[2];
            name = e[3];
            if (type) {
                e = e.slice(1, 2);
            } else {
                e = value;
                type = e[0];
                value = e[1];
            }
        }

        if (type === 'symbol') {
            var n;
            if (e[1][0] === '\\') n = e[1][1];else if (e[1][0] === '\'') n = e[1].substring(1, e[1].length - 1);else n = e[1];
            emit(n + (name ? "[" + name + "]" : ""));
        } else if (type === "+") {
            if (!name) {
                name = opts.production + "_repetition_plus" + opts.repid++;
            }
            emit(name);

            opts = optsForProduction(name, opts.grammar);
            var list = transformExpressionList([value], opts);
            opts.grammar[name] = [[list, "$$ = [$1];"], [name + " " + list, "$1.push($2);"]];
        } else if (type === "*") {
            if (!name) {
                name = opts.production + "_repetition" + opts.repid++;
            }
            emit(name);

            opts = optsForProduction(name, opts.grammar);
            opts.grammar[name] = [["", "$$ = [];"], [name + " " + transformExpressionList([value], opts), "$1.push($2);"]];
        } else if (type === "?") {
            if (!name) {
                name = opts.production + "_option" + opts.optid++;
            }
            emit(name);

            opts = optsForProduction(name, opts.grammar);
            opts.grammar[name] = ["", transformExpressionList([value], opts)];
        } else if (type === "()") {
            if (value.length == 1) {
                emit(transformExpressionList(value[0], opts));
            } else {
                if (!name) {
                    name = opts.production + "_group" + opts.groupid++;
                }
                emit(name);

                opts = optsForProduction(name, opts.grammar);
                opts.grammar[name] = value.map(function (handle) {
                    return transformExpressionList(handle, opts);
                });
            }
        }
    };

    var transformExpressionList = function (list, opts) {
        return list.reduce(function (tot, e) {
            transformExpression(e, opts, function (i) {
                tot.push(i);
            });
            return tot;
        }, []).join(" ");
    };

    var optsForProduction = function (id, grammar) {
        return {
            production: id,
            repid: 0,
            groupid: 0,
            optid: 0,
            grammar: grammar
        };
    };

    var transformProduction = function (id, production, grammar) {
        var transform_opts = optsForProduction(id, grammar);
        return production.map(function (handle) {
            var action = null,
                opts = null;
            if (typeof handle !== 'string') action = handle[1], opts = handle[2], handle = handle[0];
            var expressions = parser.parse(handle);

            handle = transformExpressionList(expressions, transform_opts);

            var ret = [handle];
            if (action) ret.push(action);
            if (opts) ret.push(opts);
            if (ret.length == 1) return ret[0];else return ret;
        });
    };

    var transformGrammar = function (grammar) {
        Object.keys(grammar).forEach(function (id) {
            grammar[id] = transformProduction(id, grammar[id], grammar);
        });
    };

    return {
        transform: function (ebnf) {
            transformGrammar(ebnf);
            return ebnf;
        }
    };
}();

exports.transform = EBNF.transform;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var Regex;

    // See also tools/generate-unicode-regex.py.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };

    function isDecimalDigit(ch) {
        return ch >= 48 && ch <= 57; // 0..9
    }

    function isHexDigit(ch) {
        return isDecimalDigit(ch) || 97 <= ch && ch <= 102 || 65 <= ch && ch <= 70;
    }

    function isOctalDigit(ch) {
        return ch >= 48 && ch <= 55; // 0..7
    }

    // 7.2 White Space

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return ch === 36 || ch === 95 || // $ (dollar) and _ (underscore)
        ch >= 65 && ch <= 90 || // A..Z
        ch >= 97 && ch <= 122 || // a..z
        ch === 92 || // \ (backslash)
        ch >= 0x80 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
    }

    function isIdentifierPart(ch) {
        return ch === 36 || ch === 95 || // $ (dollar) and _ (underscore)
        ch >= 65 && ch <= 90 || // A..Z
        ch >= 97 && ch <= 122 || // a..z
        ch >= 48 && ch <= 57 || // 0..9
        ch === 92 || // \ (backslash)
        ch >= 0x80 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStart: isIdentifierStart,
        isIdentifierPart: isIdentifierPart
    };
})();
/* vim: set sw=4 ts=4 et tw=80 : */

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Introduces a typal object to make classical/prototypal patterns easier
 * Plus some AOP sugar
 *
 * By Zachary Carter <zach@carter.name>
 * MIT Licensed
 * */

var typal = function () {

    var create = Object.create || function (o) {
        function F() {}F.prototype = o;return new F();
    };
    var position = /^(before|after)/;

    // basic method layering
    // always returns original method's return value
    function layerMethod(k, fun) {
        var pos = k.match(position)[0],
            key = k.replace(position, ''),
            prop = this[key];

        if (pos === 'after') {
            this[key] = function () {
                var ret = prop.apply(this, arguments);
                var args = [].slice.call(arguments);
                args.splice(0, 0, ret);
                fun.apply(this, args);
                return ret;
            };
        } else if (pos === 'before') {
            this[key] = function () {
                fun.apply(this, arguments);
                var ret = prop.apply(this, arguments);
                return ret;
            };
        }
    }

    // mixes each argument's own properties into calling object,
    // overwriting them or layering them. i.e. an object method 'meth' is
    // layered by mixin methods 'beforemeth' or 'aftermeth'
    function typal_mix() {
        var self = this;
        for (var i = 0, o, k; i < arguments.length; i++) {
            o = arguments[i];
            if (!o) continue;
            if (Object.prototype.hasOwnProperty.call(o, 'constructor')) this.constructor = o.constructor;
            if (Object.prototype.hasOwnProperty.call(o, 'toString')) this.toString = o.toString;
            for (k in o) {
                if (Object.prototype.hasOwnProperty.call(o, k)) {
                    if (k.match(position) && typeof this[k.replace(position, '')] === 'function') layerMethod.call(this, k, o[k]);else this[k] = o[k];
                }
            }
        }
        return this;
    }

    return {
        // extend object with own typalperties of each argument
        mix: typal_mix,

        // sugar for object begetting and mixing
        // - Object.create(typal).mix(etc, etc);
        // + typal.beget(etc, etc);
        beget: function typal_beget() {
            return arguments.length ? typal_mix.apply(create(this), arguments) : create(this);
        },

        // Creates a new Class function based on an object with a constructor method
        construct: function typal_construct() {
            var o = typal_mix.apply(create(this), arguments);
            var constructor = o.constructor;
            var Klass = o.constructor = function () {
                return constructor.apply(this, arguments);
            };
            Klass.prototype = o;
            Klass.mix = typal_mix; // allow for easy singleton property extension
            return Klass;
        },

        // no op
        constructor: function typal_constructor() {
            return this;
        }
    };
}();

if (true) exports.typal = typal;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, process) {/* parser generated by jison 0.4.6 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var lex = function () {
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "lex": 3, "definitions": 4, "%%": 5, "rules": 6, "epilogue": 7, "EOF": 8, "CODE": 9, "definition": 10, "ACTION": 11, "NAME": 12, "regex": 13, "START_INC": 14, "names_inclusive": 15, "START_EXC": 16, "names_exclusive": 17, "START_COND": 18, "rule": 19, "start_conditions": 20, "action": 21, "{": 22, "action_body": 23, "}": 24, "action_comments_body": 25, "ACTION_BODY": 26, "<": 27, "name_list": 28, ">": 29, "*": 30, ",": 31, "regex_list": 32, "|": 33, "regex_concat": 34, "regex_base": 35, "(": 36, ")": 37, "SPECIAL_GROUP": 38, "+": 39, "?": 40, "/": 41, "/!": 42, "name_expansion": 43, "range_regex": 44, "any_group_regex": 45, ".": 46, "^": 47, "$": 48, "string": 49, "escape_char": 50, "NAME_BRACE": 51, "ANY_GROUP_REGEX": 52, "ESCAPE_CHAR": 53, "RANGE_REGEX": 54, "STRING_LIT": 55, "CHARACTER_LIT": 56, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "%%", 8: "EOF", 9: "CODE", 11: "ACTION", 12: "NAME", 14: "START_INC", 16: "START_EXC", 18: "START_COND", 22: "{", 24: "}", 26: "ACTION_BODY", 27: "<", 29: ">", 30: "*", 31: ",", 33: "|", 36: "(", 37: ")", 38: "SPECIAL_GROUP", 39: "+", 40: "?", 41: "/", 42: "/!", 46: ".", 47: "^", 48: "$", 51: "NAME_BRACE", 52: "ANY_GROUP_REGEX", 53: "ESCAPE_CHAR", 54: "RANGE_REGEX", 55: "STRING_LIT", 56: "CHARACTER_LIT" },
        productions_: [0, [3, 4], [7, 1], [7, 2], [7, 3], [4, 2], [4, 2], [4, 0], [10, 2], [10, 2], [10, 2], [15, 1], [15, 2], [17, 1], [17, 2], [6, 2], [6, 1], [19, 3], [21, 3], [21, 1], [23, 0], [23, 1], [23, 5], [23, 4], [25, 1], [25, 2], [20, 3], [20, 3], [20, 0], [28, 1], [28, 3], [13, 1], [32, 3], [32, 2], [32, 1], [32, 0], [34, 2], [34, 1], [35, 3], [35, 3], [35, 2], [35, 2], [35, 2], [35, 2], [35, 2], [35, 1], [35, 2], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [43, 1], [45, 1], [50, 1], [44, 1], [49, 1], [49, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    this.$ = { rules: $$[$0 - 1] };
                    if ($$[$0 - 3][0]) this.$.macros = $$[$0 - 3][0];
                    if ($$[$0 - 3][1]) this.$.startConditions = $$[$0 - 3][1];
                    if ($$[$0]) this.$.moduleInclude = $$[$0];
                    if (yy.options) this.$.options = yy.options;
                    if (yy.actionInclude) this.$.actionInclude = yy.actionInclude;
                    delete yy.options;
                    delete yy.actionInclude;
                    return this.$;

                    break;
                case 2:
                    this.$ = null;
                    break;
                case 3:
                    this.$ = null;
                    break;
                case 4:
                    this.$ = $$[$0 - 1];
                    break;
                case 5:
                    this.$ = $$[$0];
                    if ('length' in $$[$0 - 1]) {
                        this.$[0] = this.$[0] || {};
                        this.$[0][$$[$0 - 1][0]] = $$[$0 - 1][1];
                    } else {
                        this.$[1] = this.$[1] || {};
                        for (var name in $$[$0 - 1]) {
                            this.$[1][name] = $$[$0 - 1][name];
                        }
                    }

                    break;
                case 6:
                    yy.actionInclude += $$[$0 - 1];this.$ = $$[$0];
                    break;
                case 7:
                    yy.actionInclude = '';this.$ = [null, null];
                    break;
                case 8:
                    this.$ = [$$[$0 - 1], $$[$0]];
                    break;
                case 9:
                    this.$ = $$[$0];
                    break;
                case 10:
                    this.$ = $$[$0];
                    break;
                case 11:
                    this.$ = {};this.$[$$[$0]] = 0;
                    break;
                case 12:
                    this.$ = $$[$0 - 1];this.$[$$[$0]] = 0;
                    break;
                case 13:
                    this.$ = {};this.$[$$[$0]] = 1;
                    break;
                case 14:
                    this.$ = $$[$0 - 1];this.$[$$[$0]] = 1;
                    break;
                case 15:
                    this.$ = $$[$0 - 1];this.$.push($$[$0]);
                    break;
                case 16:
                    this.$ = [$$[$0]];
                    break;
                case 17:
                    this.$ = $$[$0 - 2] ? [$$[$0 - 2], $$[$0 - 1], $$[$0]] : [$$[$0 - 1], $$[$0]];
                    break;
                case 18:
                    this.$ = $$[$0 - 1];
                    break;
                case 19:
                    this.$ = $$[$0];
                    break;
                case 20:
                    this.$ = '';
                    break;
                case 21:
                    this.$ = $$[$0];
                    break;
                case 22:
                    this.$ = $$[$0 - 4] + $$[$0 - 3] + $$[$0 - 2] + $$[$0 - 1] + $$[$0];
                    break;
                case 23:
                    this.$ = $$[$0 - 3] + $$[$0 - 2] + $$[$0 - 1] + $$[$0];
                    break;
                case 24:
                    this.$ = yytext;
                    break;
                case 25:
                    this.$ = $$[$0 - 1] + $$[$0];
                    break;
                case 26:
                    this.$ = $$[$0 - 1];
                    break;
                case 27:
                    this.$ = ['*'];
                    break;
                case 29:
                    this.$ = [$$[$0]];
                    break;
                case 30:
                    this.$ = $$[$0 - 2];this.$.push($$[$0]);
                    break;
                case 31:
                    this.$ = $$[$0];
                    if (!(yy.options && yy.options.flex) && this.$.match(/[\w\d]$/) && !this.$.match(/\\(r|f|n|t|v|s|b|c[A-Z]|x[0-9A-F]{2}|u[a-fA-F0-9]{4}|[0-7]{1,3})$/)) {
                        this.$ += "\\b";
                    }

                    break;
                case 32:
                    this.$ = $$[$0 - 2] + '|' + $$[$0];
                    break;
                case 33:
                    this.$ = $$[$0 - 1] + '|';
                    break;
                case 35:
                    this.$ = '';
                    break;
                case 36:
                    this.$ = $$[$0 - 1] + $$[$0];
                    break;
                case 38:
                    this.$ = '(' + $$[$0 - 1] + ')';
                    break;
                case 39:
                    this.$ = $$[$0 - 2] + $$[$0 - 1] + ')';
                    break;
                case 40:
                    this.$ = $$[$0 - 1] + '+';
                    break;
                case 41:
                    this.$ = $$[$0 - 1] + '*';
                    break;
                case 42:
                    this.$ = $$[$0 - 1] + '?';
                    break;
                case 43:
                    this.$ = '(?=' + $$[$0] + ')';
                    break;
                case 44:
                    this.$ = '(?!' + $$[$0] + ')';
                    break;
                case 46:
                    this.$ = $$[$0 - 1] + $$[$0];
                    break;
                case 48:
                    this.$ = '.';
                    break;
                case 49:
                    this.$ = '^';
                    break;
                case 50:
                    this.$ = '$';
                    break;
                case 54:
                    this.$ = yytext;
                    break;
                case 55:
                    this.$ = yytext;
                    break;
                case 56:
                    this.$ = yytext;
                    break;
                case 57:
                    this.$ = prepareString(yytext.substr(1, yytext.length - 2));
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 7], 10: 3, 11: [1, 4], 12: [1, 5], 14: [1, 6], 16: [1, 7] }, { 1: [3] }, { 5: [1, 8] }, { 4: 9, 5: [2, 7], 10: 3, 11: [1, 4], 12: [1, 5], 14: [1, 6], 16: [1, 7] }, { 4: 10, 5: [2, 7], 10: 3, 11: [1, 4], 12: [1, 5], 14: [1, 6], 16: [1, 7] }, { 5: [2, 35], 11: [2, 35], 12: [2, 35], 13: 11, 14: [2, 35], 16: [2, 35], 32: 12, 33: [2, 35], 34: 13, 35: 14, 36: [1, 15], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 15: 31, 18: [1, 32] }, { 17: 33, 18: [1, 34] }, { 6: 35, 11: [2, 28], 19: 36, 20: 37, 22: [2, 28], 27: [1, 38], 33: [2, 28], 36: [2, 28], 38: [2, 28], 41: [2, 28], 42: [2, 28], 46: [2, 28], 47: [2, 28], 48: [2, 28], 51: [2, 28], 52: [2, 28], 53: [2, 28], 55: [2, 28], 56: [2, 28] }, { 5: [2, 5] }, { 5: [2, 6] }, { 5: [2, 8], 11: [2, 8], 12: [2, 8], 14: [2, 8], 16: [2, 8] }, { 5: [2, 31], 11: [2, 31], 12: [2, 31], 14: [2, 31], 16: [2, 31], 22: [2, 31], 33: [1, 39] }, { 5: [2, 34], 11: [2, 34], 12: [2, 34], 14: [2, 34], 16: [2, 34], 22: [2, 34], 33: [2, 34], 35: 40, 36: [1, 15], 37: [2, 34], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 5: [2, 37], 11: [2, 37], 12: [2, 37], 14: [2, 37], 16: [2, 37], 22: [2, 37], 30: [1, 42], 33: [2, 37], 36: [2, 37], 37: [2, 37], 38: [2, 37], 39: [1, 41], 40: [1, 43], 41: [2, 37], 42: [2, 37], 44: 44, 46: [2, 37], 47: [2, 37], 48: [2, 37], 51: [2, 37], 52: [2, 37], 53: [2, 37], 54: [1, 45], 55: [2, 37], 56: [2, 37] }, { 32: 46, 33: [2, 35], 34: 13, 35: 14, 36: [1, 15], 37: [2, 35], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 32: 47, 33: [2, 35], 34: 13, 35: 14, 36: [1, 15], 37: [2, 35], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 35: 48, 36: [1, 15], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 35: 49, 36: [1, 15], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 5: [2, 45], 11: [2, 45], 12: [2, 45], 14: [2, 45], 16: [2, 45], 22: [2, 45], 30: [2, 45], 33: [2, 45], 36: [2, 45], 37: [2, 45], 38: [2, 45], 39: [2, 45], 40: [2, 45], 41: [2, 45], 42: [2, 45], 46: [2, 45], 47: [2, 45], 48: [2, 45], 51: [2, 45], 52: [2, 45], 53: [2, 45], 54: [2, 45], 55: [2, 45], 56: [2, 45] }, { 5: [2, 47], 11: [2, 47], 12: [2, 47], 14: [2, 47], 16: [2, 47], 22: [2, 47], 30: [2, 47], 33: [2, 47], 36: [2, 47], 37: [2, 47], 38: [2, 47], 39: [2, 47], 40: [2, 47], 41: [2, 47], 42: [2, 47], 46: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 52: [2, 47], 53: [2, 47], 54: [2, 47], 55: [2, 47], 56: [2, 47] }, { 5: [2, 48], 11: [2, 48], 12: [2, 48], 14: [2, 48], 16: [2, 48], 22: [2, 48], 30: [2, 48], 33: [2, 48], 36: [2, 48], 37: [2, 48], 38: [2, 48], 39: [2, 48], 40: [2, 48], 41: [2, 48], 42: [2, 48], 46: [2, 48], 47: [2, 48], 48: [2, 48], 51: [2, 48], 52: [2, 48], 53: [2, 48], 54: [2, 48], 55: [2, 48], 56: [2, 48] }, { 5: [2, 49], 11: [2, 49], 12: [2, 49], 14: [2, 49], 16: [2, 49], 22: [2, 49], 30: [2, 49], 33: [2, 49], 36: [2, 49], 37: [2, 49], 38: [2, 49], 39: [2, 49], 40: [2, 49], 41: [2, 49], 42: [2, 49], 46: [2, 49], 47: [2, 49], 48: [2, 49], 51: [2, 49], 52: [2, 49], 53: [2, 49], 54: [2, 49], 55: [2, 49], 56: [2, 49] }, { 5: [2, 50], 11: [2, 50], 12: [2, 50], 14: [2, 50], 16: [2, 50], 22: [2, 50], 30: [2, 50], 33: [2, 50], 36: [2, 50], 37: [2, 50], 38: [2, 50], 39: [2, 50], 40: [2, 50], 41: [2, 50], 42: [2, 50], 46: [2, 50], 47: [2, 50], 48: [2, 50], 51: [2, 50], 52: [2, 50], 53: [2, 50], 54: [2, 50], 55: [2, 50], 56: [2, 50] }, { 5: [2, 51], 11: [2, 51], 12: [2, 51], 14: [2, 51], 16: [2, 51], 22: [2, 51], 30: [2, 51], 33: [2, 51], 36: [2, 51], 37: [2, 51], 38: [2, 51], 39: [2, 51], 40: [2, 51], 41: [2, 51], 42: [2, 51], 46: [2, 51], 47: [2, 51], 48: [2, 51], 51: [2, 51], 52: [2, 51], 53: [2, 51], 54: [2, 51], 55: [2, 51], 56: [2, 51] }, { 5: [2, 52], 11: [2, 52], 12: [2, 52], 14: [2, 52], 16: [2, 52], 22: [2, 52], 30: [2, 52], 33: [2, 52], 36: [2, 52], 37: [2, 52], 38: [2, 52], 39: [2, 52], 40: [2, 52], 41: [2, 52], 42: [2, 52], 46: [2, 52], 47: [2, 52], 48: [2, 52], 51: [2, 52], 52: [2, 52], 53: [2, 52], 54: [2, 52], 55: [2, 52], 56: [2, 52] }, { 5: [2, 53], 11: [2, 53], 12: [2, 53], 14: [2, 53], 16: [2, 53], 22: [2, 53], 30: [2, 53], 33: [2, 53], 36: [2, 53], 37: [2, 53], 38: [2, 53], 39: [2, 53], 40: [2, 53], 41: [2, 53], 42: [2, 53], 46: [2, 53], 47: [2, 53], 48: [2, 53], 51: [2, 53], 52: [2, 53], 53: [2, 53], 54: [2, 53], 55: [2, 53], 56: [2, 53] }, { 5: [2, 54], 11: [2, 54], 12: [2, 54], 14: [2, 54], 16: [2, 54], 22: [2, 54], 30: [2, 54], 33: [2, 54], 36: [2, 54], 37: [2, 54], 38: [2, 54], 39: [2, 54], 40: [2, 54], 41: [2, 54], 42: [2, 54], 46: [2, 54], 47: [2, 54], 48: [2, 54], 51: [2, 54], 52: [2, 54], 53: [2, 54], 54: [2, 54], 55: [2, 54], 56: [2, 54] }, { 5: [2, 57], 11: [2, 57], 12: [2, 57], 14: [2, 57], 16: [2, 57], 22: [2, 57], 30: [2, 57], 33: [2, 57], 36: [2, 57], 37: [2, 57], 38: [2, 57], 39: [2, 57], 40: [2, 57], 41: [2, 57], 42: [2, 57], 46: [2, 57], 47: [2, 57], 48: [2, 57], 51: [2, 57], 52: [2, 57], 53: [2, 57], 54: [2, 57], 55: [2, 57], 56: [2, 57] }, { 5: [2, 58], 11: [2, 58], 12: [2, 58], 14: [2, 58], 16: [2, 58], 22: [2, 58], 30: [2, 58], 33: [2, 58], 36: [2, 58], 37: [2, 58], 38: [2, 58], 39: [2, 58], 40: [2, 58], 41: [2, 58], 42: [2, 58], 46: [2, 58], 47: [2, 58], 48: [2, 58], 51: [2, 58], 52: [2, 58], 53: [2, 58], 54: [2, 58], 55: [2, 58], 56: [2, 58] }, { 5: [2, 55], 11: [2, 55], 12: [2, 55], 14: [2, 55], 16: [2, 55], 22: [2, 55], 30: [2, 55], 33: [2, 55], 36: [2, 55], 37: [2, 55], 38: [2, 55], 39: [2, 55], 40: [2, 55], 41: [2, 55], 42: [2, 55], 46: [2, 55], 47: [2, 55], 48: [2, 55], 51: [2, 55], 52: [2, 55], 53: [2, 55], 54: [2, 55], 55: [2, 55], 56: [2, 55] }, { 5: [2, 9], 11: [2, 9], 12: [2, 9], 14: [2, 9], 16: [2, 9], 18: [1, 50] }, { 5: [2, 11], 11: [2, 11], 12: [2, 11], 14: [2, 11], 16: [2, 11], 18: [2, 11] }, { 5: [2, 10], 11: [2, 10], 12: [2, 10], 14: [2, 10], 16: [2, 10], 18: [1, 51] }, { 5: [2, 13], 11: [2, 13], 12: [2, 13], 14: [2, 13], 16: [2, 13], 18: [2, 13] }, { 5: [1, 55], 7: 52, 8: [1, 54], 11: [2, 28], 19: 53, 20: 37, 22: [2, 28], 27: [1, 38], 33: [2, 28], 36: [2, 28], 38: [2, 28], 41: [2, 28], 42: [2, 28], 46: [2, 28], 47: [2, 28], 48: [2, 28], 51: [2, 28], 52: [2, 28], 53: [2, 28], 55: [2, 28], 56: [2, 28] }, { 5: [2, 16], 8: [2, 16], 11: [2, 16], 22: [2, 16], 27: [2, 16], 33: [2, 16], 36: [2, 16], 38: [2, 16], 41: [2, 16], 42: [2, 16], 46: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 52: [2, 16], 53: [2, 16], 55: [2, 16], 56: [2, 16] }, { 11: [2, 35], 13: 56, 22: [2, 35], 32: 12, 33: [2, 35], 34: 13, 35: 14, 36: [1, 15], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 12: [1, 59], 28: 57, 30: [1, 58] }, { 5: [2, 33], 11: [2, 33], 12: [2, 33], 14: [2, 33], 16: [2, 33], 22: [2, 33], 33: [2, 33], 34: 60, 35: 14, 36: [1, 15], 37: [2, 33], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 5: [2, 36], 11: [2, 36], 12: [2, 36], 14: [2, 36], 16: [2, 36], 22: [2, 36], 30: [1, 42], 33: [2, 36], 36: [2, 36], 37: [2, 36], 38: [2, 36], 39: [1, 41], 40: [1, 43], 41: [2, 36], 42: [2, 36], 44: 44, 46: [2, 36], 47: [2, 36], 48: [2, 36], 51: [2, 36], 52: [2, 36], 53: [2, 36], 54: [1, 45], 55: [2, 36], 56: [2, 36] }, { 5: [2, 40], 11: [2, 40], 12: [2, 40], 14: [2, 40], 16: [2, 40], 22: [2, 40], 30: [2, 40], 33: [2, 40], 36: [2, 40], 37: [2, 40], 38: [2, 40], 39: [2, 40], 40: [2, 40], 41: [2, 40], 42: [2, 40], 46: [2, 40], 47: [2, 40], 48: [2, 40], 51: [2, 40], 52: [2, 40], 53: [2, 40], 54: [2, 40], 55: [2, 40], 56: [2, 40] }, { 5: [2, 41], 11: [2, 41], 12: [2, 41], 14: [2, 41], 16: [2, 41], 22: [2, 41], 30: [2, 41], 33: [2, 41], 36: [2, 41], 37: [2, 41], 38: [2, 41], 39: [2, 41], 40: [2, 41], 41: [2, 41], 42: [2, 41], 46: [2, 41], 47: [2, 41], 48: [2, 41], 51: [2, 41], 52: [2, 41], 53: [2, 41], 54: [2, 41], 55: [2, 41], 56: [2, 41] }, { 5: [2, 42], 11: [2, 42], 12: [2, 42], 14: [2, 42], 16: [2, 42], 22: [2, 42], 30: [2, 42], 33: [2, 42], 36: [2, 42], 37: [2, 42], 38: [2, 42], 39: [2, 42], 40: [2, 42], 41: [2, 42], 42: [2, 42], 46: [2, 42], 47: [2, 42], 48: [2, 42], 51: [2, 42], 52: [2, 42], 53: [2, 42], 54: [2, 42], 55: [2, 42], 56: [2, 42] }, { 5: [2, 46], 11: [2, 46], 12: [2, 46], 14: [2, 46], 16: [2, 46], 22: [2, 46], 30: [2, 46], 33: [2, 46], 36: [2, 46], 37: [2, 46], 38: [2, 46], 39: [2, 46], 40: [2, 46], 41: [2, 46], 42: [2, 46], 46: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 52: [2, 46], 53: [2, 46], 54: [2, 46], 55: [2, 46], 56: [2, 46] }, { 5: [2, 56], 11: [2, 56], 12: [2, 56], 14: [2, 56], 16: [2, 56], 22: [2, 56], 30: [2, 56], 33: [2, 56], 36: [2, 56], 37: [2, 56], 38: [2, 56], 39: [2, 56], 40: [2, 56], 41: [2, 56], 42: [2, 56], 46: [2, 56], 47: [2, 56], 48: [2, 56], 51: [2, 56], 52: [2, 56], 53: [2, 56], 54: [2, 56], 55: [2, 56], 56: [2, 56] }, { 33: [1, 39], 37: [1, 61] }, { 33: [1, 39], 37: [1, 62] }, { 5: [2, 43], 11: [2, 43], 12: [2, 43], 14: [2, 43], 16: [2, 43], 22: [2, 43], 30: [1, 42], 33: [2, 43], 36: [2, 43], 37: [2, 43], 38: [2, 43], 39: [1, 41], 40: [1, 43], 41: [2, 43], 42: [2, 43], 44: 44, 46: [2, 43], 47: [2, 43], 48: [2, 43], 51: [2, 43], 52: [2, 43], 53: [2, 43], 54: [1, 45], 55: [2, 43], 56: [2, 43] }, { 5: [2, 44], 11: [2, 44], 12: [2, 44], 14: [2, 44], 16: [2, 44], 22: [2, 44], 30: [1, 42], 33: [2, 44], 36: [2, 44], 37: [2, 44], 38: [2, 44], 39: [1, 41], 40: [1, 43], 41: [2, 44], 42: [2, 44], 44: 44, 46: [2, 44], 47: [2, 44], 48: [2, 44], 51: [2, 44], 52: [2, 44], 53: [2, 44], 54: [1, 45], 55: [2, 44], 56: [2, 44] }, { 5: [2, 12], 11: [2, 12], 12: [2, 12], 14: [2, 12], 16: [2, 12], 18: [2, 12] }, { 5: [2, 14], 11: [2, 14], 12: [2, 14], 14: [2, 14], 16: [2, 14], 18: [2, 14] }, { 1: [2, 1] }, { 5: [2, 15], 8: [2, 15], 11: [2, 15], 22: [2, 15], 27: [2, 15], 33: [2, 15], 36: [2, 15], 38: [2, 15], 41: [2, 15], 42: [2, 15], 46: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 52: [2, 15], 53: [2, 15], 55: [2, 15], 56: [2, 15] }, { 1: [2, 2] }, { 8: [1, 63], 9: [1, 64] }, { 11: [1, 67], 21: 65, 22: [1, 66] }, { 29: [1, 68], 31: [1, 69] }, { 29: [1, 70] }, { 29: [2, 29], 31: [2, 29] }, { 5: [2, 32], 11: [2, 32], 12: [2, 32], 14: [2, 32], 16: [2, 32], 22: [2, 32], 33: [2, 32], 35: 40, 36: [1, 15], 37: [2, 32], 38: [1, 16], 41: [1, 17], 42: [1, 18], 43: 19, 45: 20, 46: [1, 21], 47: [1, 22], 48: [1, 23], 49: 24, 50: 25, 51: [1, 26], 52: [1, 27], 53: [1, 30], 55: [1, 28], 56: [1, 29] }, { 5: [2, 38], 11: [2, 38], 12: [2, 38], 14: [2, 38], 16: [2, 38], 22: [2, 38], 30: [2, 38], 33: [2, 38], 36: [2, 38], 37: [2, 38], 38: [2, 38], 39: [2, 38], 40: [2, 38], 41: [2, 38], 42: [2, 38], 46: [2, 38], 47: [2, 38], 48: [2, 38], 51: [2, 38], 52: [2, 38], 53: [2, 38], 54: [2, 38], 55: [2, 38], 56: [2, 38] }, { 5: [2, 39], 11: [2, 39], 12: [2, 39], 14: [2, 39], 16: [2, 39], 22: [2, 39], 30: [2, 39], 33: [2, 39], 36: [2, 39], 37: [2, 39], 38: [2, 39], 39: [2, 39], 40: [2, 39], 41: [2, 39], 42: [2, 39], 46: [2, 39], 47: [2, 39], 48: [2, 39], 51: [2, 39], 52: [2, 39], 53: [2, 39], 54: [2, 39], 55: [2, 39], 56: [2, 39] }, { 1: [2, 3] }, { 8: [1, 71] }, { 5: [2, 17], 8: [2, 17], 11: [2, 17], 22: [2, 17], 27: [2, 17], 33: [2, 17], 36: [2, 17], 38: [2, 17], 41: [2, 17], 42: [2, 17], 46: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 52: [2, 17], 53: [2, 17], 55: [2, 17], 56: [2, 17] }, { 22: [2, 20], 23: 72, 24: [2, 20], 25: 73, 26: [1, 74] }, { 5: [2, 19], 8: [2, 19], 11: [2, 19], 22: [2, 19], 27: [2, 19], 33: [2, 19], 36: [2, 19], 38: [2, 19], 41: [2, 19], 42: [2, 19], 46: [2, 19], 47: [2, 19], 48: [2, 19], 51: [2, 19], 52: [2, 19], 53: [2, 19], 55: [2, 19], 56: [2, 19] }, { 11: [2, 26], 22: [2, 26], 33: [2, 26], 36: [2, 26], 38: [2, 26], 41: [2, 26], 42: [2, 26], 46: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 52: [2, 26], 53: [2, 26], 55: [2, 26], 56: [2, 26] }, { 12: [1, 75] }, { 11: [2, 27], 22: [2, 27], 33: [2, 27], 36: [2, 27], 38: [2, 27], 41: [2, 27], 42: [2, 27], 46: [2, 27], 47: [2, 27], 48: [2, 27], 51: [2, 27], 52: [2, 27], 53: [2, 27], 55: [2, 27], 56: [2, 27] }, { 1: [2, 4] }, { 22: [1, 77], 24: [1, 76] }, { 22: [2, 21], 24: [2, 21], 26: [1, 78] }, { 22: [2, 24], 24: [2, 24], 26: [2, 24] }, { 29: [2, 30], 31: [2, 30] }, { 5: [2, 18], 8: [2, 18], 11: [2, 18], 22: [2, 18], 27: [2, 18], 33: [2, 18], 36: [2, 18], 38: [2, 18], 41: [2, 18], 42: [2, 18], 46: [2, 18], 47: [2, 18], 48: [2, 18], 51: [2, 18], 52: [2, 18], 53: [2, 18], 55: [2, 18], 56: [2, 18] }, { 22: [2, 20], 23: 79, 24: [2, 20], 25: 73, 26: [1, 74] }, { 22: [2, 25], 24: [2, 25], 26: [2, 25] }, { 22: [1, 77], 24: [1, 80] }, { 22: [2, 23], 24: [2, 23], 25: 81, 26: [1, 74] }, { 22: [2, 22], 24: [2, 22], 26: [1, 78] }],
        defaultActions: { 9: [2, 5], 10: [2, 6], 52: [2, 1], 54: [2, 2], 63: [2, 3], 71: [2, 4] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                throw new Error(str);
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            this.lexer.setInput(input);
            this.lexer.yy = this.yy;
            this.yy.lexer = this.lexer;
            this.yy.parser = this;
            if (typeof this.lexer.yylloc == 'undefined') {
                this.lexer.yylloc = {};
            }
            var yyloc = this.lexer.yylloc;
            lstack.push(yyloc);
            var ranges = this.lexer.options && this.lexer.options.ranges;
            if (typeof this.yy.parseError === 'function') {
                this.parseError = this.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = self.lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (this.lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: this.lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: this.lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    function encodeRE(s) {
        return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1').replace(/\\\\u([a-fA-F0-9]{4})/g, '\\u$1');
    }

    function prepareString(s) {
        // unescape slashes
        s = s.replace(/\\\\/g, "\\");
        s = encodeRE(s);
        return s;
    };

    /* generated by jison-lex 0.2.1 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function (input) {
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        return 26;
                        break;
                    case 1:
                        return 26;
                        break;
                    case 2:
                        return 26; // regexp with braces or quotes (and no spaces)
                        break;
                    case 3:
                        return 26;
                        break;
                    case 4:
                        return 26;
                        break;
                    case 5:
                        return 26;
                        break;
                    case 6:
                        return 26;
                        break;
                    case 7:
                        yy.depth++;return 22;
                        break;
                    case 8:
                        yy.depth == 0 ? this.begin('trail') : yy.depth--;return 24;
                        break;
                    case 9:
                        return 12;
                        break;
                    case 10:
                        this.popState();return 29;
                        break;
                    case 11:
                        return 31;
                        break;
                    case 12:
                        return 30;
                        break;
                    case 13:
                        /* */
                        break;
                    case 14:
                        /* */
                        break;
                    case 15:
                        this.begin('indented');
                        break;
                    case 16:
                        this.begin('code');return 5;
                        break;
                    case 17:
                        return 56;
                        break;
                    case 18:
                        yy.options[yy_.yytext] = true;
                        break;
                    case 19:
                        this.begin('INITIAL');
                        break;
                    case 20:
                        this.begin('INITIAL');
                        break;
                    case 21:
                        /* empty */
                        break;
                    case 22:
                        return 18;
                        break;
                    case 23:
                        this.begin('INITIAL');
                        break;
                    case 24:
                        this.begin('INITIAL');
                        break;
                    case 25:
                        /* empty */
                        break;
                    case 26:
                        this.begin('rules');
                        break;
                    case 27:
                        yy.depth = 0;this.begin('action');return 22;
                        break;
                    case 28:
                        this.begin('trail');yy_.yytext = yy_.yytext.substr(2, yy_.yytext.length - 4);return 11;
                        break;
                    case 29:
                        yy_.yytext = yy_.yytext.substr(2, yy_.yytext.length - 4);return 11;
                        break;
                    case 30:
                        this.begin('rules');return 11;
                        break;
                    case 31:
                        /* ignore */
                        break;
                    case 32:
                        /* ignore */
                        break;
                    case 33:
                        /* */
                        break;
                    case 34:
                        /* */
                        break;
                    case 35:
                        return 12;
                        break;
                    case 36:
                        yy_.yytext = yy_.yytext.replace(/\\"/g, '"');return 55;
                        break;
                    case 37:
                        yy_.yytext = yy_.yytext.replace(/\\'/g, "'");return 55;
                        break;
                    case 38:
                        return 33;
                        break;
                    case 39:
                        return 52;
                        break;
                    case 40:
                        return 38;
                        break;
                    case 41:
                        return 38;
                        break;
                    case 42:
                        return 38;
                        break;
                    case 43:
                        return 36;
                        break;
                    case 44:
                        return 37;
                        break;
                    case 45:
                        return 39;
                        break;
                    case 46:
                        return 30;
                        break;
                    case 47:
                        return 40;
                        break;
                    case 48:
                        return 47;
                        break;
                    case 49:
                        return 31;
                        break;
                    case 50:
                        return 48;
                        break;
                    case 51:
                        this.begin('conditions');return 27;
                        break;
                    case 52:
                        return 42;
                        break;
                    case 53:
                        return 41;
                        break;
                    case 54:
                        return 53;
                        break;
                    case 55:
                        yy_.yytext = yy_.yytext.replace(/^\\/g, '');return 53;
                        break;
                    case 56:
                        return 48;
                        break;
                    case 57:
                        return 46;
                        break;
                    case 58:
                        yy.options = {};this.begin('options');
                        break;
                    case 59:
                        this.begin('start_condition');return 14;
                        break;
                    case 60:
                        this.begin('start_condition');return 16;
                        break;
                    case 61:
                        this.begin('rules');return 5;
                        break;
                    case 62:
                        return 54;
                        break;
                    case 63:
                        return 51;
                        break;
                    case 64:
                        return 22;
                        break;
                    case 65:
                        return 24;
                        break;
                    case 66:
                        /* ignore bad characters */
                        break;
                    case 67:
                        return 8;
                        break;
                    case 68:
                        return 9;
                        break;
                }
            },
            rules: [/^(?:\/\*(.|\n|\r)*?\*\/)/, /^(?:\/\/.*)/, /^(?:\/[^ /]*?['"{}'][^ ]*?\/)/, /^(?:"(\\\\|\\"|[^"])*")/, /^(?:'(\\\\|\\'|[^'])*')/, /^(?:[/"'][^{}/"']+)/, /^(?:[^{}/"']+)/, /^(?:\{)/, /^(?:\})/, /^(?:([a-zA-Z_][a-zA-Z0-9_-]*))/, /^(?:>)/, /^(?:,)/, /^(?:\*)/, /^(?:(\r\n|\n|\r)+)/, /^(?:\s+(\r\n|\n|\r)+)/, /^(?:\s+)/, /^(?:%%)/, /^(?:[a-zA-Z0-9_]+)/, /^(?:([a-zA-Z_][a-zA-Z0-9_-]*))/, /^(?:(\r\n|\n|\r)+)/, /^(?:\s+(\r\n|\n|\r)+)/, /^(?:\s+)/, /^(?:([a-zA-Z_][a-zA-Z0-9_-]*))/, /^(?:(\r\n|\n|\r)+)/, /^(?:\s+(\r\n|\n|\r)+)/, /^(?:\s+)/, /^(?:.*(\r\n|\n|\r)+)/, /^(?:\{)/, /^(?:%\{(.|(\r\n|\n|\r))*?%\})/, /^(?:%\{(.|(\r\n|\n|\r))*?%\})/, /^(?:.+)/, /^(?:\/\*(.|\n|\r)*?\*\/)/, /^(?:\/\/.*)/, /^(?:(\r\n|\n|\r)+)/, /^(?:\s+)/, /^(?:([a-zA-Z_][a-zA-Z0-9_-]*))/, /^(?:"(\\\\|\\"|[^"])*")/, /^(?:'(\\\\|\\'|[^'])*')/, /^(?:\|)/, /^(?:\[(\\\\|\\\]|[^\]])*\])/, /^(?:\(\?:)/, /^(?:\(\?=)/, /^(?:\(\?!)/, /^(?:\()/, /^(?:\))/, /^(?:\+)/, /^(?:\*)/, /^(?:\?)/, /^(?:\^)/, /^(?:,)/, /^(?:<<EOF>>)/, /^(?:<)/, /^(?:\/!)/, /^(?:\/)/, /^(?:\\([0-7]{1,3}|[rfntvsSbBwWdD\\*+()${}|[\]\/.^?]|c[A-Z]|x[0-9A-F]{2}|u[a-fA-F0-9]{4}))/, /^(?:\\.)/, /^(?:\$)/, /^(?:\.)/, /^(?:%options\b)/, /^(?:%s\b)/, /^(?:%x\b)/, /^(?:%%)/, /^(?:\{\d+(,\s?\d+|,)?\})/, /^(?:\{([a-zA-Z_][a-zA-Z0-9_-]*)\})/, /^(?:\{)/, /^(?:\})/, /^(?:.)/, /^(?:$)/, /^(?:(.|(\r\n|\n|\r))+)/],
            conditions: { "code": { "rules": [67, 68], "inclusive": false }, "start_condition": { "rules": [22, 23, 24, 25, 67], "inclusive": false }, "options": { "rules": [18, 19, 20, 21, 67], "inclusive": false }, "conditions": { "rules": [9, 10, 11, 12, 67], "inclusive": false }, "action": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 67], "inclusive": false }, "indented": { "rules": [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67], "inclusive": true }, "trail": { "rules": [26, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67], "inclusive": true }, "rules": { "rules": [13, 14, 15, 16, 17, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67], "inclusive": true }, "INITIAL": { "rules": [29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = lex;
    exports.Parser = lex.Parser;
    exports.parse = function () {
        return lex.parse.apply(lex, arguments);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(3).Buffer;

var isBufferEncoding = Buffer.isEncoding || function (encoding) {
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function (encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};

// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function (buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function (buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = buffer.length >= 3 ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function (buffer) {
  var res = '';
  if (buffer && buffer.length) res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = Readable;

/*<replacement>*/
var processNextTick = __webpack_require__(11);
/*</replacement>*/

/*<replacement>*/
var isArray = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(10).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(24);
/*</replacement>*/

var Buffer = __webpack_require__(3).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(9);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(4);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(74);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(54);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(1);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(21).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(1);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(21).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(1);

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(4);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10).EventEmitter;

/***/ }),
/* 25 */
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
	fixUrls = __webpack_require__(59);

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
/* 26 */
/***/ (function(module, exports) {

module.exports = {
    ["main.fonts"]: null
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
var RE = __webpack_require__(8);
window.require(['require', 'https://unpkg.com/codemirror/lib/codemirror', 'https://unpkg.com/codemirror/mode/meta.js'], function (req, CodeMirror) {
    module.exports = RE.$P['CodeMirror'] = window.CodeMirror = CodeMirror;
    RE.$B.initCodeMirror(CodeMirror);
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

let RE = __webpack_require__(8);
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
/* 29 */
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
  if (/^http/.test(url)) {
    //
  } else {
    url = "https://unpkg.com/" + url;
  }
  if (/\.css$/.test(url)) {
    return function (next) {
      RE.$L.link(url, next);
    };
  }

  return function (next) {
    RE.$L.script(url, next);
  };
});

/***/ }),
/* 30 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
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
  }, "undefined" != "function" && null !== __webpack_require__(72) && null != __webpack_require__(73) ? (!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return w;
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)), "undefined" != typeof this && null !== this && (this.Bacon = w)) : "undefined" != typeof module && null !== module && null != module.exports ? (module.exports = w, w.Bacon = w) : this.Bacon = w;
}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(2)(module)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// Jison, an LR(0), SLR(1), LARL(1), LR(1) Parser Generator
// Zachary Carter <zach@carter.name>
// MIT X Licensed

var typal = __webpack_require__(19).typal;
var Set = __webpack_require__(50).Set;
var Lexer = __webpack_require__(49);
var ebnfParser = __webpack_require__(37);
var JSONSelect = __webpack_require__(35);
var esprima = __webpack_require__(51);
var escodegen = __webpack_require__(40);

var version = __webpack_require__(68).version;

var Jison = exports.Jison = exports;
Jison.version = version;

// detect print
if (typeof console !== 'undefined' && console.log) {
    Jison.print = console.log;
} else if (typeof puts !== 'undefined') {
    Jison.print = function print() {
        puts([].join.call(arguments, ' '));
    };
} else if (typeof print !== 'undefined') {
    Jison.print = print;
} else {
    Jison.print = function print() {};
}

Jison.Parser = function () {

    // iterator utility
    function each(obj, func) {
        if (obj.forEach) {
            obj.forEach(func);
        } else {
            var p;
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    func.call(obj, obj[p], p, obj);
                }
            }
        }
    }

    var Nonterminal = typal.construct({
        constructor: function Nonterminal(symbol) {
            this.symbol = symbol;
            this.productions = new Set();
            this.first = [];
            this.follows = [];
            this.nullable = false;
        },
        toString: function Nonterminal_toString() {
            var str = this.symbol + "\n";
            str += this.nullable ? 'nullable' : 'not nullable';
            str += "\nFirsts: " + this.first.join(', ');
            str += "\nFollows: " + this.first.join(', ');
            str += "\nProductions:\n  " + this.productions.join('\n  ');

            return str;
        }
    });

    var Production = typal.construct({
        constructor: function Production(symbol, handle, id) {
            this.symbol = symbol;
            this.handle = handle;
            this.nullable = false;
            this.id = id;
            this.first = [];
            this.precedence = 0;
        },
        toString: function Production_toString() {
            return this.symbol + " -> " + this.handle.join(' ');
        }
    });

    var generator = typal.beget();

    generator.constructor = function Jison_Generator(grammar, opt) {
        if (typeof grammar === 'string') {
            grammar = ebnfParser.parse(grammar);
        }

        var options = typal.mix.call({}, grammar.options, opt);
        this.terms = {};
        this.operators = {};
        this.productions = [];
        this.conflicts = 0;
        this.resolutions = [];
        this.options = options;
        this.parseParams = grammar.parseParams;
        this.yy = {}; // accessed as yy free variable in the parser/lexer actions

        // source included in semantic action execution scope
        if (grammar.actionInclude) {
            if (typeof grammar.actionInclude === 'function') {
                grammar.actionInclude = String(grammar.actionInclude).replace(/^\s*function \(\) \{/, '').replace(/\}\s*$/, '');
            }
            this.actionInclude = grammar.actionInclude;
        }
        this.moduleInclude = grammar.moduleInclude || '';

        this.DEBUG = options.debug || false;
        if (this.DEBUG) this.mix(generatorDebug); // mixin debug methods

        this.processGrammar(grammar);

        if (grammar.lex) {
            this.lexer = new Lexer(grammar.lex, null, this.terminals_);
        }
    };

    generator.processGrammar = function processGrammarDef(grammar) {
        var bnf = grammar.bnf,
            tokens = grammar.tokens,
            nonterminals = this.nonterminals = {},
            productions = this.productions,
            self = this;

        if (!grammar.bnf && grammar.ebnf) {
            bnf = grammar.bnf = ebnfParser.transform(grammar.ebnf);
        }

        if (tokens) {
            if (typeof tokens === 'string') {
                tokens = tokens.trim().split(' ');
            } else {
                tokens = tokens.slice(0);
            }
        }

        var symbols = this.symbols = [];

        // calculate precedence of operators
        var operators = this.operators = processOperators(grammar.operators);

        // build productions from cfg
        this.buildProductions(bnf, productions, nonterminals, symbols, operators);

        if (tokens && this.terminals.length !== tokens.length) {
            self.trace("Warning: declared tokens differ from tokens found in rules.");
            self.trace(this.terminals);
            self.trace(tokens);
        }

        // augment the grammar
        this.augmentGrammar(grammar);
    };

    generator.augmentGrammar = function augmentGrammar(grammar) {
        if (this.productions.length === 0) {
            throw new Error("Grammar error: must have at least one rule.");
        }
        // use specified start symbol, or default to first user defined production
        this.startSymbol = grammar.start || grammar.startSymbol || this.productions[0].symbol;
        if (!this.nonterminals[this.startSymbol]) {
            throw new Error("Grammar error: startSymbol must be a non-terminal found in your grammar.");
        }
        this.EOF = "$end";

        // augment the grammar
        var acceptProduction = new Production('$accept', [this.startSymbol, '$end'], 0);
        this.productions.unshift(acceptProduction);

        // prepend parser tokens
        this.symbols.unshift("$accept", this.EOF);
        this.symbols_.$accept = 0;
        this.symbols_[this.EOF] = 1;
        this.terminals.unshift(this.EOF);

        this.nonterminals.$accept = new Nonterminal("$accept");
        this.nonterminals.$accept.productions.push(acceptProduction);

        // add follow $ to start symbol
        this.nonterminals[this.startSymbol].follows.push(this.EOF);
    };

    // set precedence and associativity of operators
    function processOperators(ops) {
        if (!ops) return {};
        var operators = {};
        for (var i = 0, k, prec; prec = ops[i]; i++) {
            for (k = 1; k < prec.length; k++) {
                operators[prec[k]] = { precedence: i + 1, assoc: prec[0] };
            }
        }
        return operators;
    }

    generator.buildProductions = function buildProductions(bnf, productions, nonterminals, symbols, operators) {
        var actions = ['/* this == yyval */', this.actionInclude || '', 'var $0 = $$.length - 1;', 'switch (yystate) {'];
        var actionGroups = {};
        var prods, symbol;
        var productions_ = [0];
        var symbolId = 1;
        var symbols_ = {};

        var her = false; // has error recovery

        function addSymbol(s) {
            if (s && !symbols_[s]) {
                symbols_[s] = ++symbolId;
                symbols.push(s);
            }
        }

        // add error symbol; will be third symbol, or "2" ($accept, $end, error)
        addSymbol("error");

        for (symbol in bnf) {
            if (!bnf.hasOwnProperty(symbol)) continue;

            addSymbol(symbol);
            nonterminals[symbol] = new Nonterminal(symbol);

            if (typeof bnf[symbol] === 'string') {
                prods = bnf[symbol].split(/\s*\|\s*/g);
            } else {
                prods = bnf[symbol].slice(0);
            }

            prods.forEach(buildProduction);
        }
        for (var action in actionGroups) actions.push(actionGroups[action].join(' '), action, 'break;');

        var sym,
            terms = [],
            terms_ = {};
        each(symbols_, function (id, sym) {
            if (!nonterminals[sym]) {
                terms.push(sym);
                terms_[id] = sym;
            }
        });

        this.hasErrorRecovery = her;

        this.terminals = terms;
        this.terminals_ = terms_;
        this.symbols_ = symbols_;

        this.productions_ = productions_;
        actions.push('}');

        actions = actions.join("\n").replace(/YYABORT/g, 'return false').replace(/YYACCEPT/g, 'return true');

        var parameters = "yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */";
        if (this.parseParams) parameters += ', ' + this.parseParams.join(', ');

        this.performAction = "function anonymous(" + parameters + ") {\n" + actions + "\n}";

        function buildProduction(handle) {
            var r, rhs, i;
            if (handle.constructor === Array) {
                rhs = typeof handle[0] === 'string' ? handle[0].trim().split(' ') : handle[0].slice(0);

                for (i = 0; i < rhs.length; i++) {
                    if (rhs[i] === 'error') her = true;
                    if (!symbols_[rhs[i]]) {
                        addSymbol(rhs[i]);
                    }
                }

                if (typeof handle[1] === 'string' || handle.length == 3) {
                    // semantic action specified
                    var label = 'case ' + (productions.length + 1) + ':',
                        action = handle[1];

                    // replace named semantic values ($nonterminal)
                    if (action.match(/[$@][a-zA-Z][a-zA-Z0-9_]*/)) {
                        var count = {},
                            names = {};
                        for (i = 0; i < rhs.length; i++) {
                            // check for aliased names, e.g., id[alias]
                            var rhs_i = rhs[i].match(/\[[a-zA-Z][a-zA-Z0-9_-]*\]/);
                            if (rhs_i) {
                                rhs_i = rhs_i[0].substr(1, rhs_i[0].length - 2);
                                rhs[i] = rhs[i].substr(0, rhs[i].indexOf('['));
                            } else {
                                rhs_i = rhs[i];
                            }

                            if (names[rhs_i]) {
                                names[rhs_i + ++count[rhs_i]] = i + 1;
                            } else {
                                names[rhs_i] = i + 1;
                                names[rhs_i + "1"] = i + 1;
                                count[rhs_i] = 1;
                            }
                        }
                        action = action.replace(/\$([a-zA-Z][a-zA-Z0-9_]*)/g, function (str, pl) {
                            return names[pl] ? '$' + names[pl] : str;
                        }).replace(/@([a-zA-Z][a-zA-Z0-9_]*)/g, function (str, pl) {
                            return names[pl] ? '@' + names[pl] : str;
                        });
                    }
                    action = action
                    // replace references to $$ with this.$, and @$ with this._$
                    .replace(/([^'"])\$\$|^\$\$/g, '$1this.$').replace(/@[0$]/g, "this._$")

                    // replace semantic value references ($n) with stack value (stack[n])
                    .replace(/\$(-?\d+)/g, function (_, n) {
                        return "$$[$0" + (parseInt(n, 10) - rhs.length || '') + "]";
                    })
                    // same as above for location references (@n)
                    .replace(/@(-?\d+)/g, function (_, n) {
                        return "_$[$0" + (n - rhs.length || '') + "]";
                    });
                    if (action in actionGroups) actionGroups[action].push(label);else actionGroups[action] = [label];

                    // done with aliases; strip them.
                    rhs = rhs.map(function (e, i) {
                        return e.replace(/\[[a-zA-Z_][a-zA-Z0-9_-]*\]/g, '');
                    });
                    r = new Production(symbol, rhs, productions.length + 1);
                    // precedence specified also
                    if (handle[2] && operators[handle[2].prec]) {
                        r.precedence = operators[handle[2].prec].precedence;
                    }
                } else {
                    // no action -> don't care about aliases; strip them.
                    rhs = rhs.map(function (e, i) {
                        return e.replace(/\[[a-zA-Z_][a-zA-Z0-9_-]*\]/g, '');
                    });
                    // only precedence specified
                    r = new Production(symbol, rhs, productions.length + 1);
                    if (operators[handle[1].prec]) {
                        r.precedence = operators[handle[1].prec].precedence;
                    }
                }
            } else {
                // no action -> don't care about aliases; strip them.
                handle = handle.replace(/\[[a-zA-Z_][a-zA-Z0-9_-]*\]/g, '');
                rhs = handle.trim().split(' ');
                for (i = 0; i < rhs.length; i++) {
                    if (rhs[i] === 'error') her = true;
                    if (!symbols_[rhs[i]]) {
                        addSymbol(rhs[i]);
                    }
                }
                r = new Production(symbol, rhs, productions.length + 1);
            }
            if (r.precedence === 0) {
                // set precedence
                for (i = r.handle.length - 1; i >= 0; i--) {
                    if (!(r.handle[i] in nonterminals) && r.handle[i] in operators) {
                        r.precedence = operators[r.handle[i]].precedence;
                    }
                }
            }

            productions.push(r);
            productions_.push([symbols_[r.symbol], r.handle[0] === '' ? 0 : r.handle.length]);
            nonterminals[symbol].productions.push(r);
        }
    };

    generator.createParser = function createParser() {
        throw new Error('Calling abstract method.');
    };

    // noop. implemented in debug mixin
    generator.trace = function trace() {};

    generator.warn = function warn() {
        var args = Array.prototype.slice.call(arguments, 0);
        Jison.print.call(null, args.join(""));
    };

    generator.error = function error(msg) {
        throw new Error(msg);
    };

    // Generator debug mixin

    var generatorDebug = {
        trace: function trace() {
            Jison.print.apply(null, arguments);
        },
        beforeprocessGrammar: function () {
            this.trace("Processing grammar.");
        },
        afteraugmentGrammar: function () {
            var trace = this.trace;
            each(this.symbols, function (sym, i) {
                trace(sym + "(" + i + ")");
            });
        }
    };

    /*
     * Mixin for common behaviors of lookahead parsers
     * */
    var lookaheadMixin = {};

    lookaheadMixin.computeLookaheads = function computeLookaheads() {
        if (this.DEBUG) this.mix(lookaheadDebug); // mixin debug methods

        this.computeLookaheads = function () {};
        this.nullableSets();
        this.firstSets();
        this.followSets();
    };

    // calculate follow sets typald on first and nullable
    lookaheadMixin.followSets = function followSets() {
        var productions = this.productions,
            nonterminals = this.nonterminals,
            self = this,
            cont = true;

        // loop until no further changes have been made
        while (cont) {
            cont = false;

            productions.forEach(function Follow_prod_forEach(production, k) {
                //self.trace(production.symbol,nonterminals[production.symbol].follows);
                // q is used in Simple LALR algorithm determine follows in context
                var q;
                var ctx = !!self.go_;

                var set = [],
                    oldcount;
                for (var i = 0, t; t = production.handle[i]; ++i) {
                    if (!nonterminals[t]) continue;

                    // for Simple LALR algorithm, self.go_ checks if
                    if (ctx) q = self.go_(production.symbol, production.handle.slice(0, i));
                    var bool = !ctx || q === parseInt(self.nterms_[t], 10);

                    if (i === production.handle.length + 1 && bool) {
                        set = nonterminals[production.symbol].follows;
                    } else {
                        var part = production.handle.slice(i + 1);

                        set = self.first(part);
                        if (self.nullable(part) && bool) {
                            set.push.apply(set, nonterminals[production.symbol].follows);
                        }
                    }
                    oldcount = nonterminals[t].follows.length;
                    Set.union(nonterminals[t].follows, set);
                    if (oldcount !== nonterminals[t].follows.length) {
                        cont = true;
                    }
                }
            });
        }
    };

    // return the FIRST set of a symbol or series of symbols
    lookaheadMixin.first = function first(symbol) {
        // epsilon
        if (symbol === '') {
            return [];
            // RHS
        } else if (symbol instanceof Array) {
            var firsts = [];
            for (var i = 0, t; t = symbol[i]; ++i) {
                if (!this.nonterminals[t]) {
                    if (firsts.indexOf(t) === -1) firsts.push(t);
                } else {
                    Set.union(firsts, this.nonterminals[t].first);
                }
                if (!this.nullable(t)) break;
            }
            return firsts;
            // terminal
        } else if (!this.nonterminals[symbol]) {
            return [symbol];
            // nonterminal
        } else {
            return this.nonterminals[symbol].first;
        }
    };

    // fixed-point calculation of FIRST sets
    lookaheadMixin.firstSets = function firstSets() {
        var productions = this.productions,
            nonterminals = this.nonterminals,
            self = this,
            cont = true,
            symbol,
            firsts;

        // loop until no further changes have been made
        while (cont) {
            cont = false;

            productions.forEach(function FirstSets_forEach(production, k) {
                var firsts = self.first(production.handle);
                if (firsts.length !== production.first.length) {
                    production.first = firsts;
                    cont = true;
                }
            });

            for (symbol in nonterminals) {
                firsts = [];
                nonterminals[symbol].productions.forEach(function (production) {
                    Set.union(firsts, production.first);
                });
                if (firsts.length !== nonterminals[symbol].first.length) {
                    nonterminals[symbol].first = firsts;
                    cont = true;
                }
            }
        }
    };

    // fixed-point calculation of NULLABLE
    lookaheadMixin.nullableSets = function nullableSets() {
        var firsts = this.firsts = {},
            nonterminals = this.nonterminals,
            self = this,
            cont = true;

        // loop until no further changes have been made
        while (cont) {
            cont = false;

            // check if each production is nullable
            this.productions.forEach(function (production, k) {
                if (!production.nullable) {
                    for (var i = 0, n = 0, t; t = production.handle[i]; ++i) {
                        if (self.nullable(t)) n++;
                    }
                    if (n === i) {
                        // production is nullable if all tokens are nullable
                        production.nullable = cont = true;
                    }
                }
            });

            //check if each symbol is nullable
            for (var symbol in nonterminals) {
                if (!this.nullable(symbol)) {
                    for (var i = 0, production; production = nonterminals[symbol].productions.item(i); i++) {
                        if (production.nullable) nonterminals[symbol].nullable = cont = true;
                    }
                }
            }
        }
    };

    // check if a token or series of tokens is nullable
    lookaheadMixin.nullable = function nullable(symbol) {
        // epsilon
        if (symbol === '') {
            return true;
            // RHS
        } else if (symbol instanceof Array) {
            for (var i = 0, t; t = symbol[i]; ++i) {
                if (!this.nullable(t)) return false;
            }
            return true;
            // terminal
        } else if (!this.nonterminals[symbol]) {
            return false;
            // nonterminal
        } else {
            return this.nonterminals[symbol].nullable;
        }
    };

    // lookahead debug mixin
    var lookaheadDebug = {
        beforenullableSets: function () {
            this.trace("Computing Nullable sets.");
        },
        beforefirstSets: function () {
            this.trace("Computing First sets.");
        },
        beforefollowSets: function () {
            this.trace("Computing Follow sets.");
        },
        afterfollowSets: function () {
            var trace = this.trace;
            each(this.nonterminals, function (nt, t) {
                trace(nt, '\n');
            });
        }
    };

    /*
     * Mixin for common LR parser behavior
     * */
    var lrGeneratorMixin = {};

    lrGeneratorMixin.buildTable = function buildTable() {
        if (this.DEBUG) this.mix(lrGeneratorDebug); // mixin debug methods

        this.states = this.canonicalCollection();
        this.table = this.parseTable(this.states);
        this.defaultActions = findDefaults(this.table);
    };

    lrGeneratorMixin.Item = typal.construct({
        constructor: function Item(production, dot, f, predecessor) {
            this.production = production;
            this.dotPosition = dot || 0;
            this.follows = f || [];
            this.predecessor = predecessor;
            this.id = parseInt(production.id + 'a' + this.dotPosition, 36);
            this.markedSymbol = this.production.handle[this.dotPosition];
        },
        remainingHandle: function () {
            return this.production.handle.slice(this.dotPosition + 1);
        },
        eq: function (e) {
            return e.id === this.id;
        },
        handleToString: function () {
            var handle = this.production.handle.slice(0);
            handle[this.dotPosition] = '.' + (handle[this.dotPosition] || '');
            return handle.join(' ');
        },
        toString: function () {
            var temp = this.production.handle.slice(0);
            temp[this.dotPosition] = '.' + (temp[this.dotPosition] || '');
            return this.production.symbol + " -> " + temp.join(' ') + (this.follows.length === 0 ? "" : " #lookaheads= " + this.follows.join(' '));
        }
    });

    lrGeneratorMixin.ItemSet = Set.prototype.construct({
        afterconstructor: function () {
            this.reductions = [];
            this.goes = {};
            this.edges = {};
            this.shifts = false;
            this.inadequate = false;
            this.hash_ = {};
            for (var i = this._items.length - 1; i >= 0; i--) {
                this.hash_[this._items[i].id] = true; //i;
            }
        },
        concat: function concat(set) {
            var a = set._items || set;
            for (var i = a.length - 1; i >= 0; i--) {
                this.hash_[a[i].id] = true; //i;
            }
            this._items.push.apply(this._items, a);
            return this;
        },
        push: function (item) {
            this.hash_[item.id] = true;
            return this._items.push(item);
        },
        contains: function (item) {
            return this.hash_[item.id];
        },
        valueOf: function toValue() {
            var v = this._items.map(function (a) {
                return a.id;
            }).sort().join('|');
            this.valueOf = function toValue_inner() {
                return v;
            };
            return v;
        }
    });

    lrGeneratorMixin.closureOperation = function closureOperation(itemSet /*, closureSet*/) {
        var closureSet = new this.ItemSet();
        var self = this;

        var set = itemSet,
            itemQueue,
            syms = {};

        do {
            itemQueue = new Set();
            closureSet.concat(set);
            set.forEach(function CO_set_forEach(item) {
                var symbol = item.markedSymbol;

                // if token is a non-terminal, recursively add closures
                if (symbol && self.nonterminals[symbol]) {
                    if (!syms[symbol]) {
                        self.nonterminals[symbol].productions.forEach(function CO_nt_forEach(production) {
                            var newItem = new self.Item(production, 0);
                            if (!closureSet.contains(newItem)) itemQueue.push(newItem);
                        });
                        syms[symbol] = true;
                    }
                } else if (!symbol) {
                    // reduction
                    closureSet.reductions.push(item);
                    closureSet.inadequate = closureSet.reductions.length > 1 || closureSet.shifts;
                } else {
                    // shift
                    closureSet.shifts = true;
                    closureSet.inadequate = closureSet.reductions.length > 0;
                }
            });

            set = itemQueue;
        } while (!itemQueue.isEmpty());

        return closureSet;
    };

    lrGeneratorMixin.gotoOperation = function gotoOperation(itemSet, symbol) {
        var gotoSet = new this.ItemSet(),
            self = this;

        itemSet.forEach(function goto_forEach(item, n) {
            if (item.markedSymbol === symbol) {
                gotoSet.push(new self.Item(item.production, item.dotPosition + 1, item.follows, n));
            }
        });

        return gotoSet.isEmpty() ? gotoSet : this.closureOperation(gotoSet);
    };

    /* Create unique set of item sets
     * */
    lrGeneratorMixin.canonicalCollection = function canonicalCollection() {
        var item1 = new this.Item(this.productions[0], 0, [this.EOF]);
        var firstState = this.closureOperation(new this.ItemSet(item1)),
            states = new Set(firstState),
            marked = 0,
            self = this,
            itemSet;

        states.has = {};
        states.has[firstState] = 0;

        while (marked !== states.size()) {
            itemSet = states.item(marked);marked++;
            itemSet.forEach(function CC_itemSet_forEach(item) {
                if (item.markedSymbol && item.markedSymbol !== self.EOF) self.canonicalCollectionInsert(item.markedSymbol, itemSet, states, marked - 1);
            });
        }

        return states;
    };

    // Pushes a unique state into the que. Some parsing algorithms may perform additional operations
    lrGeneratorMixin.canonicalCollectionInsert = function canonicalCollectionInsert(symbol, itemSet, states, stateNum) {
        var g = this.gotoOperation(itemSet, symbol);
        if (!g.predecessors) g.predecessors = {};
        // add g to que if not empty or duplicate
        if (!g.isEmpty()) {
            var gv = g.valueOf(),
                i = states.has[gv];
            if (i === -1 || typeof i === 'undefined') {
                states.has[gv] = states.size();
                itemSet.edges[symbol] = states.size(); // store goto transition for table
                states.push(g);
                g.predecessors[symbol] = [stateNum];
            } else {
                itemSet.edges[symbol] = i; // store goto transition for table
                states.item(i).predecessors[symbol].push(stateNum);
            }
        }
    };

    var NONASSOC = 0;
    lrGeneratorMixin.parseTable = function parseTable(itemSets) {
        var states = [],
            nonterminals = this.nonterminals,
            operators = this.operators,
            conflictedStates = {},
            // array of [state, token] tuples
        self = this,
            s = 1,
            // shift
        r = 2,
            // reduce
        a = 3; // accept

        // for each item set
        itemSets.forEach(function (itemSet, k) {
            var state = states[k] = {};
            var action, stackSymbol;

            // set shift and goto actions
            for (stackSymbol in itemSet.edges) {
                itemSet.forEach(function (item, j) {
                    // find shift and goto actions
                    if (item.markedSymbol == stackSymbol) {
                        var gotoState = itemSet.edges[stackSymbol];
                        if (nonterminals[stackSymbol]) {
                            // store state to go to after a reduce
                            //self.trace(k, stackSymbol, 'g'+gotoState);
                            state[self.symbols_[stackSymbol]] = gotoState;
                        } else {
                            //self.trace(k, stackSymbol, 's'+gotoState);
                            state[self.symbols_[stackSymbol]] = [s, gotoState];
                        }
                    }
                });
            }

            // set accept action
            itemSet.forEach(function (item, j) {
                if (item.markedSymbol == self.EOF) {
                    // accept
                    state[self.symbols_[self.EOF]] = [a];
                    //self.trace(k, self.EOF, state[self.EOF]);
                }
            });

            var allterms = self.lookAheads ? false : self.terminals;

            // set reductions and resolve potential conflicts
            itemSet.reductions.forEach(function (item, j) {
                // if parser uses lookahead, only enumerate those terminals
                var terminals = allterms || self.lookAheads(itemSet, item);

                terminals.forEach(function (stackSymbol) {
                    action = state[self.symbols_[stackSymbol]];
                    var op = operators[stackSymbol];

                    // Reading a terminal and current position is at the end of a production, try to reduce
                    if (action || action && action.length) {
                        var sol = resolveConflict(item.production, op, [r, item.production.id], action[0] instanceof Array ? action[0] : action);
                        self.resolutions.push([k, stackSymbol, sol]);
                        if (sol.bydefault) {
                            self.conflicts++;
                            if (!self.DEBUG) {
                                self.warn('Conflict in grammar: multiple actions possible when lookahead token is ', stackSymbol, ' in state ', k, "\n- ", printAction(sol.r, self), "\n- ", printAction(sol.s, self));
                                conflictedStates[k] = true;
                            }
                            if (self.options.noDefaultResolve) {
                                if (!(action[0] instanceof Array)) action = [action];
                                action.push(sol.r);
                            }
                        } else {
                            action = sol.action;
                        }
                    } else {
                        action = [r, item.production.id];
                    }
                    if (action && action.length) {
                        state[self.symbols_[stackSymbol]] = action;
                    } else if (action === NONASSOC) {
                        state[self.symbols_[stackSymbol]] = undefined;
                    }
                });
            });
        });

        if (!self.DEBUG && self.conflicts > 0) {
            self.warn("\nStates with conflicts:");
            each(conflictedStates, function (val, state) {
                self.warn('State ' + state);
                self.warn('  ', itemSets.item(state).join("\n  "));
            });
        }

        return states;
    };

    // find states with only one action, a reduction
    function findDefaults(states) {
        var defaults = {};
        states.forEach(function (state, k) {
            var i = 0;
            for (var act in state) {
                if ({}.hasOwnProperty.call(state, act)) i++;
            }

            if (i === 1 && state[act][0] === 2) {
                // only one action in state and it's a reduction
                defaults[k] = state[act];
            }
        });

        return defaults;
    }

    // resolves shift-reduce and reduce-reduce conflicts
    function resolveConflict(production, op, reduce, shift) {
        var sln = { production: production, operator: op, r: reduce, s: shift },
            s = 1,
            // shift
        r = 2,
            // reduce
        a = 3; // accept

        if (shift[0] === r) {
            sln.msg = "Resolve R/R conflict (use first production declared in grammar.)";
            sln.action = shift[1] < reduce[1] ? shift : reduce;
            if (shift[1] !== reduce[1]) sln.bydefault = true;
            return sln;
        }

        if (production.precedence === 0 || !op) {
            sln.msg = "Resolve S/R conflict (shift by default.)";
            sln.bydefault = true;
            sln.action = shift;
        } else if (production.precedence < op.precedence) {
            sln.msg = "Resolve S/R conflict (shift for higher precedent operator.)";
            sln.action = shift;
        } else if (production.precedence === op.precedence) {
            if (op.assoc === "right") {
                sln.msg = "Resolve S/R conflict (shift for right associative operator.)";
                sln.action = shift;
            } else if (op.assoc === "left") {
                sln.msg = "Resolve S/R conflict (reduce for left associative operator.)";
                sln.action = reduce;
            } else if (op.assoc === "nonassoc") {
                sln.msg = "Resolve S/R conflict (no action for non-associative operator.)";
                sln.action = NONASSOC;
            }
        } else {
            sln.msg = "Resolve conflict (reduce for higher precedent production.)";
            sln.action = reduce;
        }

        return sln;
    }

    lrGeneratorMixin.generate = function parser_generate(opt) {
        opt = typal.mix.call({}, this.options, opt);
        var code = "";

        // check for illegal identifier
        if (!opt.moduleName || !opt.moduleName.match(/^[A-Za-z_$][A-Za-z0-9_$]*$/)) {
            opt.moduleName = "parser";
        }
        switch (opt.moduleType) {
            case "js":
                code = this.generateModule(opt);
                break;
            case "amd":
                code = this.generateAMDModule(opt);
                break;
            default:
                code = this.generateCommonJSModule(opt);
                break;
        }

        return code;
    };

    lrGeneratorMixin.generateAMDModule = function generateAMDModule(opt) {
        opt = typal.mix.call({}, this.options, opt);
        var module = this.generateModule_();
        var out = '\n\ndefine(function(require){\n' + module.commonCode + '\nvar parser = ' + module.moduleCode + "\n" + this.moduleInclude + (this.lexer && this.lexer.generateModule ? '\n' + this.lexer.generateModule() + '\nparser.lexer = lexer;' : '') + '\nreturn parser;' + '\n});';
        return out;
    };

    lrGeneratorMixin.generateCommonJSModule = function generateCommonJSModule(opt) {
        opt = typal.mix.call({}, this.options, opt);
        var moduleName = opt.moduleName || "parser";
        var out = this.generateModule(opt) + "\n\n\nif (typeof require !== 'undefined' && typeof exports !== 'undefined') {" + "\nexports.parser = " + moduleName + ";" + "\nexports.Parser = " + moduleName + ".Parser;" + "\nexports.parse = function () { return " + moduleName + ".parse.apply(" + moduleName + ", arguments); };" + "\nexports.main = " + String(opt.moduleMain || commonjsMain) + ";" + "\nif (typeof module !== 'undefined' && require.main === module) {\n" + "  exports.main(process.argv.slice(1));\n}" + "\n}";

        return out;
    };

    lrGeneratorMixin.generateModule = function generateModule(opt) {
        opt = typal.mix.call({}, this.options, opt);
        var moduleName = opt.moduleName || "parser";
        var out = "/* parser generated by jison " + version + " */\n" + "/*\n" + "  Returns a Parser object of the following structure:\n" + "\n" + "  Parser: {\n" + "    yy: {}\n" + "  }\n" + "\n" + "  Parser.prototype: {\n" + "    yy: {},\n" + "    trace: function(),\n" + "    symbols_: {associative list: name ==> number},\n" + "    terminals_: {associative list: number ==> name},\n" + "    productions_: [...],\n" + "    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),\n" + "    table: [...],\n" + "    defaultActions: {...},\n" + "    parseError: function(str, hash),\n" + "    parse: function(input),\n" + "\n" + "    lexer: {\n" + "        EOF: 1,\n" + "        parseError: function(str, hash),\n" + "        setInput: function(input),\n" + "        input: function(),\n" + "        unput: function(str),\n" + "        more: function(),\n" + "        less: function(n),\n" + "        pastInput: function(),\n" + "        upcomingInput: function(),\n" + "        showPosition: function(),\n" + "        test_match: function(regex_match_array, rule_index),\n" + "        next: function(),\n" + "        lex: function(),\n" + "        begin: function(condition),\n" + "        popState: function(),\n" + "        _currentRules: function(),\n" + "        topState: function(),\n" + "        pushState: function(condition),\n" + "\n" + "        options: {\n" + "            ranges: boolean           (optional: true ==> token location info will include a .range[] member)\n" + "            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)\n" + "            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)\n" + "        },\n" + "\n" + "        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),\n" + "        rules: [...],\n" + "        conditions: {associative list: name ==> set},\n" + "    }\n" + "  }\n" + "\n" + "\n" + "  token location info (@$, _$, etc.): {\n" + "    first_line: n,\n" + "    last_line: n,\n" + "    first_column: n,\n" + "    last_column: n,\n" + "    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)\n" + "  }\n" + "\n" + "\n" + "  the parseError function receives a 'hash' object with these members for lexer and parser errors: {\n" + "    text:        (matched text)\n" + "    token:       (the produced terminal token, if any)\n" + "    line:        (yylineno)\n" + "  }\n" + "  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {\n" + "    loc:         (yylloc)\n" + "    expected:    (string describing the set of expected tokens)\n" + "    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)\n" + "  }\n" + "*/\n";
        out += (moduleName.match(/\./) ? moduleName : "var " + moduleName) + " = " + this.generateModuleExpr();

        return out;
    };

    lrGeneratorMixin.generateModuleExpr = function generateModuleExpr() {
        var out = '';
        var module = this.generateModule_();

        out += "(function(){\n";
        out += module.commonCode;
        out += "\nvar parser = " + module.moduleCode;
        out += "\n" + this.moduleInclude;
        if (this.lexer && this.lexer.generateModule) {
            out += this.lexer.generateModule();
            out += "\nparser.lexer = lexer;";
        }
        out += "\nfunction Parser () {\n  this.yy = {};\n}\n" + "Parser.prototype = parser;" + "parser.Parser = Parser;" + "\nreturn new Parser;\n})();";

        return out;
    };

    function addTokenStack(fn) {
        var parseFn = fn;
        try {
            var ast = esprima.parse(parseFn);
            var stackAst = esprima.parse(String(tokenStackLex)).body[0];
            stackAst.id.name = 'lex';

            var labeled = JSONSelect.match(':has(:root > .label > .name:val("_token_stack"))', ast);

            labeled[0].body = stackAst;

            return escodegen.generate(ast).replace(/_token_stack:\s?/, "").replace(/\\\\n/g, "\\n");
        } catch (e) {
            return parseFn;
        }
    }

    // lex function that supports token stacks
    function tokenStackLex() {
        var token;
        token = tstack.pop() || lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            if (token instanceof Array) {
                tstack = token;
                token = tstack.pop();
            }
            token = self.symbols_[token] || token;
        }
        return token;
    }

    // returns parse function without error recovery code
    function removeErrorRecovery(fn) {
        var parseFn = fn;
        try {
            var ast = esprima.parse(parseFn);

            var labeled = JSONSelect.match(':has(:root > .label > .name:val("_handle_error"))', ast);
            var reduced_code = labeled[0].body.consequent.body[3].consequent.body;
            reduced_code[0] = labeled[0].body.consequent.body[1]; // remove the line: error_rule_depth = locateNearestErrorRecoveryRule(state);
            reduced_code[4].expression.arguments[1].properties.pop(); // remove the line: 'recoverable: error_rule_depth !== false'
            labeled[0].body.consequent.body = reduced_code;

            return escodegen.generate(ast).replace(/_handle_error:\s?/, "").replace(/\\\\n/g, "\\n");
        } catch (e) {
            return parseFn;
        }
    }

    // Generates the code of the parser module, which consists of two parts:
    // - module.commonCode: initialization code that should be placed before the module
    // - module.moduleCode: code that creates the module object
    lrGeneratorMixin.generateModule_ = function generateModule_() {
        var parseFn = String(parser.parse);
        if (!this.hasErrorRecovery) {
            parseFn = removeErrorRecovery(parseFn);
        }

        if (this.options['token-stack']) {
            parseFn = addTokenStack(parseFn);
        }

        // Generate code with fresh variable names
        nextVariableId = 0;
        var tableCode = this.generateTableCode(this.table);

        // Generate the initialization code
        var commonCode = tableCode.commonCode;

        // Generate the module creation code
        var moduleCode = "{";
        moduleCode += ["trace: " + String(this.trace || parser.trace), "yy: {}", "symbols_: " + JSON.stringify(this.symbols_), "terminals_: " + JSON.stringify(this.terminals_).replace(/"([0-9]+)":/g, "$1:"), "productions_: " + JSON.stringify(this.productions_), "performAction: " + String(this.performAction), "table: " + tableCode.moduleCode, "defaultActions: " + JSON.stringify(this.defaultActions).replace(/"([0-9]+)":/g, "$1:"), "parseError: " + String(this.parseError || (this.hasErrorRecovery ? traceParseError : parser.parseError)), "parse: " + parseFn].join(",\n");
        moduleCode += "};";

        return { commonCode: commonCode, moduleCode: moduleCode };
    };

    // Generate code that represents the specified parser table
    lrGeneratorMixin.generateTableCode = function (table) {
        var moduleCode = JSON.stringify(table);
        var variables = [createObjectCode];

        // Don't surround numerical property name numbers in quotes
        moduleCode = moduleCode.replace(/"([0-9]+)"(?=:)/g, "$1");

        // Replace objects with several identical values by function calls
        // e.g., { 1: [6, 7]; 3: [6, 7], 4: [6, 7], 5: 8 } = o([1, 3, 4], [6, 7], { 5: 8 })
        moduleCode = moduleCode.replace(/\{\d+:[^\}]+,\d+:[^\}]+\}/g, function (object) {
            // Find the value that occurs with the highest number of keys
            var value,
                frequentValue,
                key,
                keys = {},
                keyCount,
                maxKeyCount = 0,
                keyValue,
                keyValues = [],
                keyValueMatcher = /(\d+):([^:]+)(?=,\d+:|\})/g;

            while (keyValue = keyValueMatcher.exec(object)) {
                // For each value, store the keys where that value occurs
                key = keyValue[1];
                value = keyValue[2];
                keyCount = 1;

                if (!(value in keys)) {
                    keys[value] = [key];
                } else {
                    keyCount = keys[value].push(key);
                }
                // Remember this value if it is the most frequent one
                if (keyCount > maxKeyCount) {
                    maxKeyCount = keyCount;
                    frequentValue = value;
                }
            }
            // Construct the object with a function call if the most frequent value occurs multiple times
            if (maxKeyCount > 1) {
                // Collect all non-frequent values into a remainder object
                for (value in keys) {
                    if (value !== frequentValue) {
                        for (var k = keys[value], i = 0, l = k.length; i < l; i++) {
                            keyValues.push(k[i] + ':' + value);
                        }
                    }
                }
                keyValues = keyValues.length ? ',{' + keyValues.join(',') + '}' : '';
                // Create the function call `o(keys, value, remainder)`
                object = 'o([' + keys[frequentValue].join(',') + '],' + frequentValue + keyValues + ')';
            }
            return object;
        });

        // Count occurrences of number lists
        var list;
        var lists = {};
        var listMatcher = /\[[0-9,]+\]/g;

        while (list = listMatcher.exec(moduleCode)) {
            lists[list] = (lists[list] || 0) + 1;
        }

        // Replace frequently occurring number lists with variables
        moduleCode = moduleCode.replace(listMatcher, function (list) {
            var listId = lists[list];
            // If listId is a number, it represents the list's occurrence frequency
            if (typeof listId === 'number') {
                // If the list does not occur frequently, represent it by the list
                if (listId === 1) {
                    lists[list] = listId = list;
                    // If the list occurs frequently, represent it by a newly assigned variable
                } else {
                    lists[list] = listId = createVariable();
                    variables.push(listId + '=' + list);
                }
            }
            return listId;
        });

        // Return the variable initialization code and the table code
        return {
            commonCode: 'var ' + variables.join(',') + ';',
            moduleCode: moduleCode
        };
    };
    // Function that extends an object with the given value for all given keys
    // e.g., o([1, 3, 4], [6, 7], { x: 1, y: 2 }) = { 1: [6, 7]; 3: [6, 7], 4: [6, 7], x: 1, y: 2 }
    var createObjectCode = 'o=function(k,v,o,l){' + 'for(o=o||{},l=k.length;l--;o[k[l]]=v);' + 'return o}';

    // Creates a variable with a unique name
    function createVariable() {
        var id = nextVariableId++;
        var name = '$V';

        do {
            name += variableTokens[id % variableTokensLength];
            id = ~~(id / variableTokensLength);
        } while (id !== 0);

        return name;
    }

    var nextVariableId = 0;
    var variableTokens = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
    var variableTokensLength = variableTokens.length;

    // debug mixin for LR parser generators

    function printAction(a, gen) {
        var s = a[0] == 1 ? 'shift token (then go to state ' + a[1] + ')' : a[0] == 2 ? 'reduce by rule: ' + gen.productions[a[1]] : 'accept';

        return s;
    }

    var lrGeneratorDebug = {
        beforeparseTable: function () {
            this.trace("Building parse table.");
        },
        afterparseTable: function () {
            var self = this;
            if (this.conflicts > 0) {
                this.resolutions.forEach(function (r, i) {
                    if (r[2].bydefault) {
                        self.warn('Conflict at state: ', r[0], ', token: ', r[1], "\n  ", printAction(r[2].r, self), "\n  ", printAction(r[2].s, self));
                    }
                });
                this.trace("\n" + this.conflicts + " Conflict(s) found in grammar.");
            }
            this.trace("Done.");
        },
        aftercanonicalCollection: function (states) {
            var trace = this.trace;
            trace("\nItem sets\n------");

            states.forEach(function (state, i) {
                trace("\nitem set", i, "\n" + state.join("\n"), '\ntransitions -> ', JSON.stringify(state.edges));
            });
        }
    };

    var parser = typal.beget();

    lrGeneratorMixin.createParser = function createParser() {

        var p = eval(this.generateModuleExpr());

        // for debugging
        p.productions = this.productions;

        var self = this;
        function bind(method) {
            return function () {
                self.lexer = p.lexer;
                return self[method].apply(self, arguments);
            };
        }

        // backwards compatability
        p.lexer = this.lexer;
        p.generate = bind('generate');
        p.generateAMDModule = bind('generateAMDModule');
        p.generateModule = bind('generateModule');
        p.generateCommonJSModule = bind('generateCommonJSModule');

        return p;
    };

    parser.trace = generator.trace;
    parser.warn = generator.warn;
    parser.error = generator.error;

    function traceParseError(err, hash) {
        this.trace(err);
    }

    function parseError(str, hash) {
        if (hash.recoverable) {
            this.trace(str);
        } else {
            function _parseError(msg, hash) {
                this.message = msg;
                this.hash = hash;
            }
            _parseError.prototype = Error;

            throw new _parseError(str, hash);
        }
    }

    parser.parseError = lrGeneratorMixin.parseError = parseError;

    parser.parse = function parse(input) {
        var self = this,
            stack = [0],
            tstack = [],
            // token stack
        vstack = [null],
            // semantic value stack
        lstack = [],
            // location stack
        table = this.table,
            yytext = '',
            yylineno = 0,
            yyleng = 0,
            recovering = 0,
            TERROR = 2,
            EOF = 1;

        var args = lstack.slice.call(arguments, 1);

        //this.reductionCount = this.shiftCount = 0;

        var lexer = Object.create(this.lexer);
        var sharedState = { yy: {} };
        // copy state
        for (var k in this.yy) {
            if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                sharedState.yy[k] = this.yy[k];
            }
        }

        lexer.setInput(input, sharedState.yy);
        sharedState.yy.lexer = lexer;
        sharedState.yy.parser = this;
        if (typeof lexer.yylloc == 'undefined') {
            lexer.yylloc = {};
        }
        var yyloc = lexer.yylloc;
        lstack.push(yyloc);

        var ranges = lexer.options && lexer.options.ranges;

        if (typeof sharedState.yy.parseError === 'function') {
            this.parseError = sharedState.yy.parseError;
        } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
        }

        function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
        }

        _token_stack: var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            // if token isn't its numeric value, convert
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };

        var symbol,
            preErrorSymbol,
            state,
            action,
            a,
            r,
            yyval = {},
            p,
            len,
            newState,
            expected;
        while (true) {
            // retreive state number from top of stack
            state = stack[stack.length - 1];

            // use default actions if available
            if (this.defaultActions[state]) {
                action = this.defaultActions[state];
            } else {
                if (symbol === null || typeof symbol == 'undefined') {
                    symbol = lex();
                }
                // read action for current state and first input
                action = table[state] && table[state][symbol];
            }

            _handle_error:
            // handle parse error
            if (typeof action === 'undefined' || !action.length || !action[0]) {
                var error_rule_depth;
                var errStr = '';

                // Return the rule stack depth where the nearest error rule can be found.
                // Return FALSE when no error recovery rule was found.
                function locateNearestErrorRecoveryRule(state) {
                    var stack_probe = stack.length - 1;
                    var depth = 0;

                    // try to recover from error
                    for (;;) {
                        // check for error recovery rule in this state
                        if (TERROR.toString() in table[state]) {
                            return depth;
                        }
                        if (state === 0 || stack_probe < 2) {
                            return false; // No suitable error recovery rule available.
                        }
                        stack_probe -= 2; // popStack(1): [symbol, action]
                        state = stack[stack_probe];
                        ++depth;
                    }
                }

                if (!recovering) {
                    // first see if there's any chance at hitting an error recovery rule:
                    error_rule_depth = locateNearestErrorRecoveryRule(state);

                    // Report error
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push("'" + this.terminals_[p] + "'");
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected,
                        recoverable: error_rule_depth !== false
                    });
                } else if (preErrorSymbol !== EOF) {
                    error_rule_depth = locateNearestErrorRecoveryRule(state);
                }

                // just recovered from another error
                if (recovering == 3) {
                    if (symbol === EOF || preErrorSymbol === EOF) {
                        throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                    }

                    // discard current lookahead and grab another
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    symbol = lex();
                }

                // try to recover from error
                if (error_rule_depth === false) {
                    throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
                }
                popStack(error_rule_depth);

                preErrorSymbol = symbol == TERROR ? null : symbol; // save the lookahead token
                symbol = TERROR; // insert generic error symbol as new lookahead
                state = stack[stack.length - 1];
                action = table[state] && table[state][TERROR];
                recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
            }

            // this shouldn't happen, unless resolve defaults are off
            if (action[0] instanceof Array && action.length > 1) {
                throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
            }

            switch (action[0]) {
                case 1:
                    // shift
                    //this.shiftCount++;

                    stack.push(symbol);
                    vstack.push(lexer.yytext);
                    lstack.push(lexer.yylloc);
                    stack.push(action[1]); // push state
                    symbol = null;
                    if (!preErrorSymbol) {
                        // normal execution/no error
                        yyleng = lexer.yyleng;
                        yytext = lexer.yytext;
                        yylineno = lexer.yylineno;
                        yyloc = lexer.yylloc;
                        if (recovering > 0) {
                            recovering--;
                        }
                    } else {
                        // error just occurred, resume old lookahead f/ before error
                        symbol = preErrorSymbol;
                        preErrorSymbol = null;
                    }
                    break;

                case 2:
                    // reduce
                    //this.reductionCount++;

                    len = this.productions_[action[1]][1];

                    // perform semantic action
                    yyval.$ = vstack[vstack.length - len]; // default to $$ = $1
                    // default location, uses first token for firsts, last for lasts
                    yyval._$ = {
                        first_line: lstack[lstack.length - (len || 1)].first_line,
                        last_line: lstack[lstack.length - 1].last_line,
                        first_column: lstack[lstack.length - (len || 1)].first_column,
                        last_column: lstack[lstack.length - 1].last_column
                    };
                    if (ranges) {
                        yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                    }
                    r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                    if (typeof r !== 'undefined') {
                        return r;
                    }

                    // pop off stack
                    if (len) {
                        stack = stack.slice(0, -1 * len * 2);
                        vstack = vstack.slice(0, -1 * len);
                        lstack = lstack.slice(0, -1 * len);
                    }

                    stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)
                    vstack.push(yyval.$);
                    lstack.push(yyval._$);
                    // goto new state = table[STATE][NONTERMINAL]
                    newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                    stack.push(newState);
                    break;

                case 3:
                    // accept
                    return true;
            }
        }

        return true;
    };

    parser.init = function parser_init(dict) {
        this.table = dict.table;
        this.defaultActions = dict.defaultActions;
        this.performAction = dict.performAction;
        this.productions_ = dict.productions_;
        this.symbols_ = dict.symbols_;
        this.terminals_ = dict.terminals_;
    };

    /*
     * LR(0) Parser
     * */

    var lr0 = generator.beget(lookaheadMixin, lrGeneratorMixin, {
        type: "LR(0)",
        afterconstructor: function lr0_afterconstructor() {
            this.buildTable();
        }
    });

    var LR0Generator = exports.LR0Generator = lr0.construct();

    /*
     * Simple LALR(1)
     * */

    var lalr = generator.beget(lookaheadMixin, lrGeneratorMixin, {
        type: "LALR(1)",

        afterconstructor: function (grammar, options) {
            if (this.DEBUG) this.mix(lrGeneratorDebug, lalrGeneratorDebug); // mixin debug methods

            options = options || {};
            this.states = this.canonicalCollection();
            this.terms_ = {};

            var newg = this.newg = typal.beget(lookaheadMixin, {
                oldg: this,
                trace: this.trace,
                nterms_: {},
                DEBUG: false,
                go_: function (r, B) {
                    r = r.split(":")[0]; // grab state #
                    B = B.map(function (b) {
                        return b.slice(b.indexOf(":") + 1);
                    });
                    return this.oldg.go(r, B);
                }
            });
            newg.nonterminals = {};
            newg.productions = [];

            this.inadequateStates = [];

            // if true, only lookaheads in inadequate states are computed (faster, larger table)
            // if false, lookaheads for all reductions will be computed (slower, smaller table)
            this.onDemandLookahead = options.onDemandLookahead || false;

            this.buildNewGrammar();
            newg.computeLookaheads();
            this.unionLookaheads();

            this.table = this.parseTable(this.states);
            this.defaultActions = findDefaults(this.table);
        },

        lookAheads: function LALR_lookaheads(state, item) {
            return !!this.onDemandLookahead && !state.inadequate ? this.terminals : item.follows;
        },
        go: function LALR_go(p, w) {
            var q = parseInt(p, 10);
            for (var i = 0; i < w.length; i++) {
                q = this.states.item(q).edges[w[i]] || q;
            }
            return q;
        },
        goPath: function LALR_goPath(p, w) {
            var q = parseInt(p, 10),
                t,
                path = [];
            for (var i = 0; i < w.length; i++) {
                t = w[i] ? q + ":" + w[i] : '';
                if (t) this.newg.nterms_[t] = q;
                path.push(t);
                q = this.states.item(q).edges[w[i]] || q;
                this.terms_[t] = w[i];
            }
            return { path: path, endState: q };
        },
        // every disjoint reduction of a nonterminal becomes a produciton in G'
        buildNewGrammar: function LALR_buildNewGrammar() {
            var self = this,
                newg = this.newg;

            this.states.forEach(function (state, i) {
                state.forEach(function (item) {
                    if (item.dotPosition === 0) {
                        // new symbols are a combination of state and transition symbol
                        var symbol = i + ":" + item.production.symbol;
                        self.terms_[symbol] = item.production.symbol;
                        newg.nterms_[symbol] = i;
                        if (!newg.nonterminals[symbol]) newg.nonterminals[symbol] = new Nonterminal(symbol);
                        var pathInfo = self.goPath(i, item.production.handle);
                        var p = new Production(symbol, pathInfo.path, newg.productions.length);
                        newg.productions.push(p);
                        newg.nonterminals[symbol].productions.push(p);

                        // store the transition that get's 'backed up to' after reduction on path
                        var handle = item.production.handle.join(' ');
                        var goes = self.states.item(pathInfo.endState).goes;
                        if (!goes[handle]) goes[handle] = [];
                        goes[handle].push(symbol);

                        //self.trace('new production:',p);
                    }
                });
                if (state.inadequate) self.inadequateStates.push(i);
            });
        },
        unionLookaheads: function LALR_unionLookaheads() {
            var self = this,
                newg = this.newg,
                states = !!this.onDemandLookahead ? this.inadequateStates : this.states;

            states.forEach(function union_states_forEach(i) {
                var state = typeof i === 'number' ? self.states.item(i) : i,
                    follows = [];
                if (state.reductions.length) state.reductions.forEach(function union_reduction_forEach(item) {
                    var follows = {};
                    for (var k = 0; k < item.follows.length; k++) {
                        follows[item.follows[k]] = true;
                    }
                    state.goes[item.production.handle.join(' ')].forEach(function reduction_goes_forEach(symbol) {
                        newg.nonterminals[symbol].follows.forEach(function goes_follows_forEach(symbol) {
                            var terminal = self.terms_[symbol];
                            if (!follows[terminal]) {
                                follows[terminal] = true;
                                item.follows.push(terminal);
                            }
                        });
                    });
                    //self.trace('unioned item', item);
                });
            });
        }
    });

    var LALRGenerator = exports.LALRGenerator = lalr.construct();

    // LALR generator debug mixin

    var lalrGeneratorDebug = {
        trace: function trace() {
            Jison.print.apply(null, arguments);
        },
        beforebuildNewGrammar: function () {
            this.trace(this.states.size() + " states.");
            this.trace("Building lookahead grammar.");
        },
        beforeunionLookaheads: function () {
            this.trace("Computing lookaheads.");
        }
    };

    /*
     * Lookahead parser definitions
     *
     * Define base type
     * */
    var lrLookaheadGenerator = generator.beget(lookaheadMixin, lrGeneratorMixin, {
        afterconstructor: function lr_aftercontructor() {
            this.computeLookaheads();
            this.buildTable();
        }
    });

    /*
     * SLR Parser
     * */
    var SLRGenerator = exports.SLRGenerator = lrLookaheadGenerator.construct({
        type: "SLR(1)",

        lookAheads: function SLR_lookAhead(state, item) {
            return this.nonterminals[item.production.symbol].follows;
        }
    });

    /*
     * LR(1) Parser
     * */
    var lr1 = lrLookaheadGenerator.beget({
        type: "Canonical LR(1)",

        lookAheads: function LR_lookAheads(state, item) {
            return item.follows;
        },
        Item: lrGeneratorMixin.Item.prototype.construct({
            afterconstructor: function () {
                this.id = this.production.id + 'a' + this.dotPosition + 'a' + this.follows.sort().join(',');
            },
            eq: function (e) {
                return e.id === this.id;
            }
        }),

        closureOperation: function LR_ClosureOperation(itemSet /*, closureSet*/) {
            var closureSet = new this.ItemSet();
            var self = this;

            var set = itemSet,
                itemQueue,
                syms = {};

            do {
                itemQueue = new Set();
                closureSet.concat(set);
                set.forEach(function (item) {
                    var symbol = item.markedSymbol;
                    var b, r;

                    // if token is a nonterminal, recursively add closures
                    if (symbol && self.nonterminals[symbol]) {
                        r = item.remainingHandle();
                        b = self.first(item.remainingHandle());
                        if (b.length === 0 || item.production.nullable || self.nullable(r)) {
                            b = b.concat(item.follows);
                        }
                        self.nonterminals[symbol].productions.forEach(function (production) {
                            var newItem = new self.Item(production, 0, b);
                            if (!closureSet.contains(newItem) && !itemQueue.contains(newItem)) {
                                itemQueue.push(newItem);
                            }
                        });
                    } else if (!symbol) {
                        // reduction
                        closureSet.reductions.push(item);
                    }
                });

                set = itemQueue;
            } while (!itemQueue.isEmpty());

            return closureSet;
        }
    });

    var LR1Generator = exports.LR1Generator = lr1.construct();

    /*
     * LL Parser
     * */
    var ll = generator.beget(lookaheadMixin, {
        type: "LL(1)",

        afterconstructor: function ll_aftercontructor() {
            this.computeLookaheads();
            this.table = this.parseTable(this.productions);
        },
        parseTable: function llParseTable(productions) {
            var table = {},
                self = this;
            productions.forEach(function (production, i) {
                var row = table[production.symbol] || {};
                var tokens = production.first;
                if (self.nullable(production.handle)) {
                    Set.union(tokens, self.nonterminals[production.symbol].follows);
                }
                tokens.forEach(function (token) {
                    if (row[token]) {
                        row[token].push(i);
                        self.conflicts++;
                    } else {
                        row[token] = [i];
                    }
                });
                table[production.symbol] = row;
            });

            return table;
        }
    });

    var LLGenerator = exports.LLGenerator = ll.construct();

    Jison.Generator = function Jison_Generator(g, options) {
        var opt = typal.mix.call({}, g.options, options);
        switch (opt.type) {
            case 'lr0':
                return new LR0Generator(g, opt);
            case 'slr':
                return new SLRGenerator(g, opt);
            case 'lr':
                return new LR1Generator(g, opt);
            case 'll':
                return new LLGenerator(g, opt);
            default:
                return new LALRGenerator(g, opt);
        }
    };

    return function Parser(g, options) {
        var gen = Jison.Generator(g, options);
        return gen.createParser();
    };
}();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(10).EventEmitter;
var inherits = __webpack_require__(4);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(13);
Stream.Writable = __webpack_require__(57);
Stream.Duplex = __webpack_require__(52);
Stream.Transform = __webpack_require__(56);
Stream.PassThrough = __webpack_require__(55);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function (dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }

  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(25)(content, options);
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/*! Copyright (c) 2011, Lloyd Hilaiel, ISC License */
/*
 * This is the JSONSelect reference implementation, in javascript.  This
 * code is designed to run under node.js or in a browser.  In the former
 * case, the "public API" is exposed as properties on the `export` object,
 * in the latter, as properties on `window.JSONSelect`.  That API is thus:
 *
 * Selector formating and parameter escaping:
 *
 * Anywhere where a string selector is selected, it may be followed by an
 * optional array of values.  When provided, they will be escaped and
 * inserted into the selector string properly escaped.  i.e.:
 *
 *   .match(':has(?)', [ 'foo' ], {}) 
 * 
 * would result in the seclector ':has("foo")' being matched against {}.
 *
 * This feature makes dynamically generated selectors more readable.
 *
 * .match(selector, [ values ], object)
 *
 *   Parses and "compiles" the selector, then matches it against the object
 *   argument.  Matches are returned in an array.  Throws an error when
 *   there's a problem parsing the selector.
 *
 * .forEach(selector, [ values ], object, callback)
 *
 *   Like match, but rather than returning an array, invokes the provided
 *   callback once per match as the matches are discovered. 
 * 
 * .compile(selector, [ values ]) 
 *
 *   Parses the selector and compiles it to an internal form, and returns
 *   an object which contains the compiled selector and has two properties:
 *   `match` and `forEach`.  These two functions work identically to the
 *   above, except they do not take a selector as an argument and instead
 *   use the compiled selector.
 *
 *   For cases where a complex selector is repeatedly used, this method
 *   should be faster as it will avoid recompiling the selector each time. 
 */
(function (exports) {

    var // localize references
    toString = Object.prototype.toString;

    function jsonParse(str) {
        try {
            if (JSON && JSON.parse) {
                return JSON.parse(str);
            }
            return new Function("return " + str)();
        } catch (e) {
            te("ijs", e.message);
        }
    }

    // emitted error codes.
    var errorCodes = {
        "bop": "binary operator expected",
        "ee": "expression expected",
        "epex": "closing paren expected ')'",
        "ijs": "invalid json string",
        "mcp": "missing closing paren",
        "mepf": "malformed expression in pseudo-function",
        "mexp": "multiple expressions not allowed",
        "mpc": "multiple pseudo classes (:xxx) not allowed",
        "nmi": "multiple ids not allowed",
        "pex": "opening paren expected '('",
        "se": "selector expected",
        "sex": "string expected",
        "sra": "string required after '.'",
        "uc": "unrecognized char",
        "ucp": "unexpected closing paren",
        "ujs": "unclosed json string",
        "upc": "unrecognized pseudo class"
    };

    // throw an error message
    function te(ec, context) {
        throw new Error(errorCodes[ec] + (context && " in '" + context + "'"));
    }

    // THE LEXER
    var toks = {
        psc: 1, // pseudo class
        psf: 2, // pseudo class function
        typ: 3, // type
        str: 4, // string
        ide: 5 // identifiers (or "classes", stuff after a dot)
    };

    // The primary lexing regular expression in jsonselect
    var pat = new RegExp("^(?:" +
    // (1) whitespace
    "([\\r\\n\\t\\ ]+)|" +
    // (2) one-char ops
    "([~*,>\\)\\(])|" +
    // (3) types names
    "(string|boolean|null|array|object|number)|" +
    // (4) pseudo classes
    "(:(?:root|first-child|last-child|only-child))|" +
    // (5) pseudo functions
    "(:(?:nth-child|nth-last-child|has|expr|val|contains))|" +
    // (6) bogusly named pseudo something or others
    "(:\\w+)|" +
    // (7 & 8) identifiers and JSON strings
    "(?:(\\.)?(\\\"(?:[^\\\\\\\"]|\\\\[^\\\"])*\\\"))|" +
    // (8) bogus JSON strings missing a trailing quote
    "(\\\")|" +
    // (9) identifiers (unquoted)
    "\\.((?:[_a-zA-Z]|[^\\0-\\0177]|\\\\[^\\r\\n\\f0-9a-fA-F])(?:[_a-zA-Z0-9\\-]|[^\\u0000-\\u0177]|(?:\\\\[^\\r\\n\\f0-9a-fA-F]))*)" + ")");

    // A regular expression for matching "nth expressions" (see grammar, what :nth-child() eats)
    var nthPat = /^\s*\(\s*(?:([+\-]?)([0-9]*)n\s*(?:([+\-])\s*([0-9]))?|(odd|even)|([+\-]?[0-9]+))\s*\)/;
    function lex(str, off) {
        if (!off) off = 0;
        var m = pat.exec(str.substr(off));
        if (!m) return undefined;
        off += m[0].length;
        var a;
        if (m[1]) a = [off, " "];else if (m[2]) a = [off, m[0]];else if (m[3]) a = [off, toks.typ, m[0]];else if (m[4]) a = [off, toks.psc, m[0]];else if (m[5]) a = [off, toks.psf, m[0]];else if (m[6]) te("upc", str);else if (m[8]) a = [off, m[7] ? toks.ide : toks.str, jsonParse(m[8])];else if (m[9]) te("ujs", str);else if (m[10]) a = [off, toks.ide, m[10].replace(/\\([^\r\n\f0-9a-fA-F])/g, "$1")];
        return a;
    }

    // THE EXPRESSION SUBSYSTEM

    var exprPat = new RegExp(
    // skip and don't capture leading whitespace
    "^\\s*(?:" +
    // (1) simple vals
    "(true|false|null)|" +
    // (2) numbers
    "(-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)|" +
    // (3) strings
    "(\"(?:[^\\]|\\[^\"])*\")|" +
    // (4) the 'x' value placeholder
    "(x)|" +
    // (5) binops
    "(&&|\\|\\||[\\$\\^<>!\\*]=|[=+\\-*/%<>])|" +
    // (6) parens
    "([\\(\\)])" + ")");

    function is(o, t) {
        return typeof o === t;
    }
    var operators = {
        '*': [9, function (lhs, rhs) {
            return lhs * rhs;
        }],
        '/': [9, function (lhs, rhs) {
            return lhs / rhs;
        }],
        '%': [9, function (lhs, rhs) {
            return lhs % rhs;
        }],
        '+': [7, function (lhs, rhs) {
            return lhs + rhs;
        }],
        '-': [7, function (lhs, rhs) {
            return lhs - rhs;
        }],
        '<=': [5, function (lhs, rhs) {
            return is(lhs, 'number') && is(rhs, 'number') && lhs <= rhs;
        }],
        '>=': [5, function (lhs, rhs) {
            return is(lhs, 'number') && is(rhs, 'number') && lhs >= rhs;
        }],
        '$=': [5, function (lhs, rhs) {
            return is(lhs, 'string') && is(rhs, 'string') && lhs.lastIndexOf(rhs) === lhs.length - rhs.length;
        }],
        '^=': [5, function (lhs, rhs) {
            return is(lhs, 'string') && is(rhs, 'string') && lhs.indexOf(rhs) === 0;
        }],
        '*=': [5, function (lhs, rhs) {
            return is(lhs, 'string') && is(rhs, 'string') && lhs.indexOf(rhs) !== -1;
        }],
        '>': [5, function (lhs, rhs) {
            return is(lhs, 'number') && is(rhs, 'number') && lhs > rhs;
        }],
        '<': [5, function (lhs, rhs) {
            return is(lhs, 'number') && is(rhs, 'number') && lhs < rhs;
        }],
        '=': [3, function (lhs, rhs) {
            return lhs === rhs;
        }],
        '!=': [3, function (lhs, rhs) {
            return lhs !== rhs;
        }],
        '&&': [2, function (lhs, rhs) {
            return lhs && rhs;
        }],
        '||': [1, function (lhs, rhs) {
            return lhs || rhs;
        }]
    };

    function exprLex(str, off) {
        var v,
            m = exprPat.exec(str.substr(off));
        if (m) {
            off += m[0].length;
            v = m[1] || m[2] || m[3] || m[5] || m[6];
            if (m[1] || m[2] || m[3]) return [off, 0, jsonParse(v)];else if (m[4]) return [off, 0, undefined];
            return [off, v];
        }
    }

    function exprParse2(str, off) {
        if (!off) off = 0;
        // first we expect a value or a '('
        var l = exprLex(str, off),
            lhs;
        if (l && l[1] === '(') {
            lhs = exprParse2(str, l[0]);
            var p = exprLex(str, lhs[0]);
            if (!p || p[1] !== ')') te('epex', str);
            off = p[0];
            lhs = ['(', lhs[1]];
        } else if (!l || l[1] && l[1] != 'x') {
            te("ee", str + " - " + (l[1] && l[1]));
        } else {
            lhs = l[1] === 'x' ? undefined : l[2];
            off = l[0];
        }

        // now we expect a binary operator or a ')'
        var op = exprLex(str, off);
        if (!op || op[1] == ')') return [off, lhs];else if (op[1] == 'x' || !op[1]) {
            te('bop', str + " - " + (op[1] && op[1]));
        }

        // tail recursion to fetch the rhs expression
        var rhs = exprParse2(str, op[0]);
        off = rhs[0];
        rhs = rhs[1];

        // and now precedence!  how shall we put everything together?
        var v;
        if (typeof rhs !== 'object' || rhs[0] === '(' || operators[op[1]][0] < operators[rhs[1]][0]) {
            v = [lhs, op[1], rhs];
        } else {
            v = rhs;
            while (typeof rhs[0] === 'object' && rhs[0][0] != '(' && operators[op[1]][0] >= operators[rhs[0][1]][0]) {
                rhs = rhs[0];
            }
            rhs[0] = [lhs, op[1], rhs[0]];
        }
        return [off, v];
    }

    function exprParse(str, off) {
        function deparen(v) {
            if (typeof v !== 'object' || v === null) return v;else if (v[0] === '(') return deparen(v[1]);else return [deparen(v[0]), v[1], deparen(v[2])];
        }
        var e = exprParse2(str, off ? off : 0);
        return [e[0], deparen(e[1])];
    }

    function exprEval(expr, x) {
        if (expr === undefined) return x;else if (expr === null || typeof expr !== 'object') {
            return expr;
        }
        var lhs = exprEval(expr[0], x),
            rhs = exprEval(expr[2], x);
        return operators[expr[1]][1](lhs, rhs);
    }

    // THE PARSER

    function parse(str, off, nested, hints) {
        if (!nested) hints = {};

        var a = [],
            am,
            readParen;
        if (!off) off = 0;

        while (true) {
            var s = parse_selector(str, off, hints);
            a.push(s[1]);
            s = lex(str, off = s[0]);
            if (s && s[1] === " ") s = lex(str, off = s[0]);
            if (!s) break;
            // now we've parsed a selector, and have something else...
            if (s[1] === ">" || s[1] === "~") {
                if (s[1] === "~") hints.usesSiblingOp = true;
                a.push(s[1]);
                off = s[0];
            } else if (s[1] === ",") {
                if (am === undefined) am = [",", a];else am.push(a);
                a = [];
                off = s[0];
            } else if (s[1] === ")") {
                if (!nested) te("ucp", s[1]);
                readParen = 1;
                off = s[0];
                break;
            }
        }
        if (nested && !readParen) te("mcp", str);
        if (am) am.push(a);
        var rv;
        if (!nested && hints.usesSiblingOp) {
            rv = normalize(am ? am : a);
        } else {
            rv = am ? am : a;
        }
        return [off, rv];
    }

    function normalizeOne(sel) {
        var sels = [],
            s;
        for (var i = 0; i < sel.length; i++) {
            if (sel[i] === '~') {
                // `A ~ B` maps to `:has(:root > A) > B`
                // `Z A ~ B` maps to `Z :has(:root > A) > B, Z:has(:root > A) > B`
                // This first clause, takes care of the first case, and the first half of the latter case.
                if (i < 2 || sel[i - 2] != '>') {
                    s = sel.slice(0, i - 1);
                    s = s.concat([{ has: [[{ pc: ":root" }, ">", sel[i - 1]]] }, ">"]);
                    s = s.concat(sel.slice(i + 1));
                    sels.push(s);
                }
                // here we take care of the second half of above:
                // (`Z A ~ B` maps to `Z :has(:root > A) > B, Z :has(:root > A) > B`)
                // and a new case:
                // Z > A ~ B maps to Z:has(:root > A) > B
                if (i > 1) {
                    var at = sel[i - 2] === '>' ? i - 3 : i - 2;
                    s = sel.slice(0, at);
                    var z = {};
                    for (var k in sel[at]) if (sel[at].hasOwnProperty(k)) z[k] = sel[at][k];
                    if (!z.has) z.has = [];
                    z.has.push([{ pc: ":root" }, ">", sel[i - 1]]);
                    s = s.concat(z, '>', sel.slice(i + 1));
                    sels.push(s);
                }
                break;
            }
        }
        if (i == sel.length) return sel;
        return sels.length > 1 ? [','].concat(sels) : sels[0];
    }

    function normalize(sels) {
        if (sels[0] === ',') {
            var r = [","];
            for (var i = i; i < sels.length; i++) {
                var s = normalizeOne(s[i]);
                r = r.concat(s[0] === "," ? s.slice(1) : s);
            }
            return r;
        } else {
            return normalizeOne(sels);
        }
    }

    function parse_selector(str, off, hints) {
        var soff = off;
        var s = {};
        var l = lex(str, off);
        // skip space
        if (l && l[1] === " ") {
            soff = off = l[0];l = lex(str, off);
        }
        if (l && l[1] === toks.typ) {
            s.type = l[2];
            l = lex(str, off = l[0]);
        } else if (l && l[1] === "*") {
            // don't bother representing the universal sel, '*' in the
            // parse tree, cause it's the default
            l = lex(str, off = l[0]);
        }

        // now support either an id or a pc
        while (true) {
            if (l === undefined) {
                break;
            } else if (l[1] === toks.ide) {
                if (s.id) te("nmi", l[1]);
                s.id = l[2];
            } else if (l[1] === toks.psc) {
                if (s.pc || s.pf) te("mpc", l[1]);
                // collapse first-child and last-child into nth-child expressions
                if (l[2] === ":first-child") {
                    s.pf = ":nth-child";
                    s.a = 0;
                    s.b = 1;
                } else if (l[2] === ":last-child") {
                    s.pf = ":nth-last-child";
                    s.a = 0;
                    s.b = 1;
                } else {
                    s.pc = l[2];
                }
            } else if (l[1] === toks.psf) {
                if (l[2] === ":val" || l[2] === ":contains") {
                    s.expr = [undefined, l[2] === ":val" ? "=" : "*=", undefined];
                    // any amount of whitespace, followed by paren, string, paren
                    l = lex(str, off = l[0]);
                    if (l && l[1] === " ") l = lex(str, off = l[0]);
                    if (!l || l[1] !== "(") te("pex", str);
                    l = lex(str, off = l[0]);
                    if (l && l[1] === " ") l = lex(str, off = l[0]);
                    if (!l || l[1] !== toks.str) te("sex", str);
                    s.expr[2] = l[2];
                    l = lex(str, off = l[0]);
                    if (l && l[1] === " ") l = lex(str, off = l[0]);
                    if (!l || l[1] !== ")") te("epex", str);
                } else if (l[2] === ":has") {
                    // any amount of whitespace, followed by paren
                    l = lex(str, off = l[0]);
                    if (l && l[1] === " ") l = lex(str, off = l[0]);
                    if (!l || l[1] !== "(") te("pex", str);
                    var h = parse(str, l[0], true);
                    l[0] = h[0];
                    if (!s.has) s.has = [];
                    s.has.push(h[1]);
                } else if (l[2] === ":expr") {
                    if (s.expr) te("mexp", str);
                    var e = exprParse(str, l[0]);
                    l[0] = e[0];
                    s.expr = e[1];
                } else {
                    if (s.pc || s.pf) te("mpc", str);
                    s.pf = l[2];
                    var m = nthPat.exec(str.substr(l[0]));
                    if (!m) te("mepf", str);
                    if (m[5]) {
                        s.a = 2;
                        s.b = m[5] === "odd" ? 1 : 0;
                    } else if (m[6]) {
                        s.a = 0;
                        s.b = parseInt(m[6], 10);
                    } else {
                        s.a = parseInt((m[1] ? m[1] : "+") + (m[2] ? m[2] : "1"), 10);
                        s.b = m[3] ? parseInt(m[3] + m[4], 10) : 0;
                    }
                    l[0] += m[0].length;
                }
            } else {
                break;
            }
            l = lex(str, off = l[0]);
        }

        // now if we didn't actually parse anything it's an error
        if (soff === off) te("se", str);

        return [off, s];
    }

    // THE EVALUATOR

    function isArray(o) {
        return Array.isArray ? Array.isArray(o) : toString.call(o) === "[object Array]";
    }

    function mytypeof(o) {
        if (o === null) return "null";
        var to = typeof o;
        if (to === "object" && isArray(o)) to = "array";
        return to;
    }

    function mn(node, sel, id, num, tot) {
        var sels = [];
        var cs = sel[0] === ">" ? sel[1] : sel[0];
        var m = true,
            mod;
        if (cs.type) m = m && cs.type === mytypeof(node);
        if (cs.id) m = m && cs.id === id;
        if (m && cs.pf) {
            if (cs.pf === ":nth-last-child") num = tot - num;else num++;
            if (cs.a === 0) {
                m = cs.b === num;
            } else {
                mod = (num - cs.b) % cs.a;

                m = !mod && num * cs.a + cs.b >= 0;
            }
        }
        if (m && cs.has) {
            // perhaps we should augment forEach to handle a return value
            // that indicates "client cancels traversal"?
            var bail = function () {
                throw 42;
            };
            for (var i = 0; i < cs.has.length; i++) {
                try {
                    forEach(cs.has[i], node, bail);
                } catch (e) {
                    if (e === 42) continue;
                }
                m = false;
                break;
            }
        }
        if (m && cs.expr) {
            m = exprEval(cs.expr, node);
        }
        // should we repeat this selector for descendants?
        if (sel[0] !== ">" && sel[0].pc !== ":root") sels.push(sel);

        if (m) {
            // is there a fragment that we should pass down?
            if (sel[0] === ">") {
                if (sel.length > 2) {
                    m = false;sels.push(sel.slice(2));
                }
            } else if (sel.length > 1) {
                m = false;sels.push(sel.slice(1));
            }
        }

        return [m, sels];
    }

    function forEach(sel, obj, fun, id, num, tot) {
        var a = sel[0] === "," ? sel.slice(1) : [sel],
            a0 = [],
            call = false,
            i = 0,
            j = 0,
            k,
            x;
        for (i = 0; i < a.length; i++) {
            x = mn(obj, a[i], id, num, tot);
            if (x[0]) {
                call = true;
            }
            for (j = 0; j < x[1].length; j++) {
                a0.push(x[1][j]);
            }
        }
        if (a0.length && typeof obj === "object") {
            if (a0.length >= 1) {
                a0.unshift(",");
            }
            if (isArray(obj)) {
                for (i = 0; i < obj.length; i++) {
                    forEach(a0, obj[i], fun, undefined, i, obj.length);
                }
            } else {
                for (k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        forEach(a0, obj[k], fun, k);
                    }
                }
            }
        }
        if (call && fun) {
            fun(obj);
        }
    }

    function match(sel, obj) {
        var a = [];
        forEach(sel, obj, function (x) {
            a.push(x);
        });
        return a;
    }

    function format(sel, arr) {
        sel = sel.replace(/\?/g, function () {
            if (arr.length === 0) throw "too few parameters given";
            var p = arr.shift();
            return typeof p === 'string' ? JSON.stringify(p) : p;
        });
        if (arr.length) throw "too many parameters supplied";
        return sel;
    }

    function compile(sel, arr) {
        if (arr) sel = format(sel, arr);
        return {
            sel: parse(sel)[1],
            match: function (obj) {
                return match(this.sel, obj);
            },
            forEach: function (obj, fun) {
                return forEach(this.sel, obj, fun);
            }
        };
    }

    exports._lex = lex;
    exports._parse = parse;
    exports.match = function (sel, arr, obj) {
        if (!obj) {
            obj = arr;arr = undefined;
        }
        return compile(sel, arr).match(obj);
    };
    exports.forEach = function (sel, arr, obj, fun) {
        if (!fun) {
            fun = obj;obj = arr;arr = undefined;
        }
        return compile(sel, arr).forEach(obj, fun);
    };
    exports.compile = compile;
})( false ? window.JSONSelect = {} : exports);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var bnf = __webpack_require__(38).parser,
    ebnf = __webpack_require__(16),
    jisonlex = __webpack_require__(20);

exports.parse = function parse(grammar) {
    return bnf.parse(grammar);
};
exports.transform = ebnf.transform;

// adds a declaration to the grammar
bnf.yy.addDeclaration = function (grammar, decl) {
    if (decl.start) {
        grammar.start = decl.start;
    } else if (decl.lex) {
        grammar.lex = parseLex(decl.lex);
    } else if (decl.operator) {
        if (!grammar.operators) grammar.operators = [];
        grammar.operators.push(decl.operator);
    } else if (decl.parseParam) {
        if (!grammar.parseParams) grammar.parseParams = [];
        grammar.parseParams = grammar.parseParams.concat(decl.parseParam);
    } else if (decl.include) {
        if (!grammar.moduleInclude) grammar.moduleInclude = '';
        grammar.moduleInclude += decl.include;
    } else if (decl.options) {
        if (!grammar.options) grammar.options = {};
        for (var i = 0; i < decl.options.length; i++) {
            grammar.options[decl.options[i]] = true;
        }
    }
};

// parse an embedded lex section
var parseLex = function (text) {
    return jisonlex.parse(text.replace(/(?:^%lex)|(?:\/lex$)/g, ''));
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, process) {/* parser generated by jison 0.4.11 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var bnf = function () {
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "spec": 3, "declaration_list": 4, "%%": 5, "grammar": 6, "optional_end_block": 7, "EOF": 8, "CODE": 9, "declaration": 10, "START": 11, "id": 12, "LEX_BLOCK": 13, "operator": 14, "ACTION": 15, "parse_param": 16, "options": 17, "OPTIONS": 18, "token_list": 19, "PARSE_PARAM": 20, "associativity": 21, "LEFT": 22, "RIGHT": 23, "NONASSOC": 24, "symbol": 25, "production_list": 26, "production": 27, ":": 28, "handle_list": 29, ";": 30, "|": 31, "handle_action": 32, "handle": 33, "prec": 34, "action": 35, "expression_suffix": 36, "handle_sublist": 37, "expression": 38, "suffix": 39, "ALIAS": 40, "ID": 41, "STRING": 42, "(": 43, ")": 44, "*": 45, "?": 46, "+": 47, "PREC": 48, "{": 49, "action_body": 50, "}": 51, "ARROW_ACTION": 52, "action_comments_body": 53, "ACTION_BODY": 54, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "%%", 8: "EOF", 9: "CODE", 11: "START", 13: "LEX_BLOCK", 15: "ACTION", 18: "OPTIONS", 20: "PARSE_PARAM", 22: "LEFT", 23: "RIGHT", 24: "NONASSOC", 28: ":", 30: ";", 31: "|", 40: "ALIAS", 41: "ID", 42: "STRING", 43: "(", 44: ")", 45: "*", 46: "?", 47: "+", 48: "PREC", 49: "{", 51: "}", 52: "ARROW_ACTION", 54: "ACTION_BODY" },
        productions_: [0, [3, 5], [3, 6], [7, 0], [7, 1], [4, 2], [4, 0], [10, 2], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [17, 2], [16, 2], [14, 2], [21, 1], [21, 1], [21, 1], [19, 2], [19, 1], [6, 1], [26, 2], [26, 1], [27, 4], [29, 3], [29, 1], [32, 3], [33, 2], [33, 0], [37, 3], [37, 1], [36, 3], [36, 2], [38, 1], [38, 1], [38, 3], [39, 0], [39, 1], [39, 1], [39, 1], [34, 2], [34, 0], [25, 1], [25, 1], [12, 1], [35, 3], [35, 1], [35, 1], [35, 0], [50, 0], [50, 1], [50, 5], [50, 4], [53, 1], [53, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    this.$ = $$[$0 - 4];
                    return extend(this.$, $$[$0 - 2]);

                    break;
                case 2:
                    this.$ = $$[$0 - 5];
                    yy.addDeclaration(this.$, { include: $$[$0 - 1] });
                    return extend(this.$, $$[$0 - 3]);

                    break;
                case 5:
                    this.$ = $$[$0 - 1];yy.addDeclaration(this.$, $$[$0]);
                    break;
                case 6:
                    this.$ = {};
                    break;
                case 7:
                    this.$ = { start: $$[$0] };
                    break;
                case 8:
                    this.$ = { lex: $$[$0] };
                    break;
                case 9:
                    this.$ = { operator: $$[$0] };
                    break;
                case 10:
                    this.$ = { include: $$[$0] };
                    break;
                case 11:
                    this.$ = { parseParam: $$[$0] };
                    break;
                case 12:
                    this.$ = { options: $$[$0] };
                    break;
                case 13:
                    this.$ = $$[$0];
                    break;
                case 14:
                    this.$ = $$[$0];
                    break;
                case 15:
                    this.$ = [$$[$0 - 1]];this.$.push.apply(this.$, $$[$0]);
                    break;
                case 16:
                    this.$ = 'left';
                    break;
                case 17:
                    this.$ = 'right';
                    break;
                case 18:
                    this.$ = 'nonassoc';
                    break;
                case 19:
                    this.$ = $$[$0 - 1];this.$.push($$[$0]);
                    break;
                case 20:
                    this.$ = [$$[$0]];
                    break;
                case 21:
                    this.$ = $$[$0];
                    break;
                case 22:
                    this.$ = $$[$0 - 1];
                    if ($$[$0][0] in this.$) this.$[$$[$0][0]] = this.$[$$[$0][0]].concat($$[$0][1]);else this.$[$$[$0][0]] = $$[$0][1];

                    break;
                case 23:
                    this.$ = {};this.$[$$[$0][0]] = $$[$0][1];
                    break;
                case 24:
                    this.$ = [$$[$0 - 3], $$[$0 - 1]];
                    break;
                case 25:
                    this.$ = $$[$0 - 2];this.$.push($$[$0]);
                    break;
                case 26:
                    this.$ = [$$[$0]];
                    break;
                case 27:
                    this.$ = [$$[$0 - 2].length ? $$[$0 - 2].join(' ') : ''];
                    if ($$[$0]) this.$.push($$[$0]);
                    if ($$[$0 - 1]) this.$.push($$[$0 - 1]);
                    if (this.$.length === 1) this.$ = this.$[0];

                    break;
                case 28:
                    this.$ = $$[$0 - 1];this.$.push($$[$0]);
                    break;
                case 29:
                    this.$ = [];
                    break;
                case 30:
                    this.$ = $$[$0 - 2];this.$.push($$[$0].join(' '));
                    break;
                case 31:
                    this.$ = [$$[$0].join(' ')];
                    break;
                case 32:
                    this.$ = $$[$0 - 2] + $$[$0 - 1] + "[" + $$[$0] + "]";
                    break;
                case 33:
                    this.$ = $$[$0 - 1] + $$[$0];
                    break;
                case 34:
                    this.$ = $$[$0];
                    break;
                case 35:
                    this.$ = ebnf ? "'" + $$[$0] + "'" : $$[$0];
                    break;
                case 36:
                    this.$ = '(' + $$[$0 - 1].join(' | ') + ')';
                    break;
                case 37:
                    this.$ = '';
                    break;
                case 41:
                    this.$ = { prec: $$[$0] };
                    break;
                case 42:
                    this.$ = null;
                    break;
                case 43:
                    this.$ = $$[$0];
                    break;
                case 44:
                    this.$ = yytext;
                    break;
                case 45:
                    this.$ = yytext;
                    break;
                case 46:
                    this.$ = $$[$0 - 1];
                    break;
                case 47:
                    this.$ = $$[$0];
                    break;
                case 48:
                    this.$ = '$$ =' + $$[$0] + ';';
                    break;
                case 49:
                    this.$ = '';
                    break;
                case 50:
                    this.$ = '';
                    break;
                case 51:
                    this.$ = $$[$0];
                    break;
                case 52:
                    this.$ = $$[$0 - 4] + $$[$0 - 3] + $$[$0 - 2] + $$[$0 - 1] + $$[$0];
                    break;
                case 53:
                    this.$ = $$[$0 - 3] + $$[$0 - 2] + $$[$0 - 1] + $$[$0];
                    break;
                case 54:
                    this.$ = yytext;
                    break;
                case 55:
                    this.$ = $$[$0 - 1] + $$[$0];
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 6], 11: [2, 6], 13: [2, 6], 15: [2, 6], 18: [2, 6], 20: [2, 6], 22: [2, 6], 23: [2, 6], 24: [2, 6] }, { 1: [3] }, { 5: [1, 3], 10: 4, 11: [1, 5], 13: [1, 6], 14: 7, 15: [1, 8], 16: 9, 17: 10, 18: [1, 13], 20: [1, 12], 21: 11, 22: [1, 14], 23: [1, 15], 24: [1, 16] }, { 6: 17, 12: 20, 26: 18, 27: 19, 41: [1, 21] }, { 5: [2, 5], 11: [2, 5], 13: [2, 5], 15: [2, 5], 18: [2, 5], 20: [2, 5], 22: [2, 5], 23: [2, 5], 24: [2, 5] }, { 12: 22, 41: [1, 21] }, { 5: [2, 8], 11: [2, 8], 13: [2, 8], 15: [2, 8], 18: [2, 8], 20: [2, 8], 22: [2, 8], 23: [2, 8], 24: [2, 8] }, { 5: [2, 9], 11: [2, 9], 13: [2, 9], 15: [2, 9], 18: [2, 9], 20: [2, 9], 22: [2, 9], 23: [2, 9], 24: [2, 9] }, { 5: [2, 10], 11: [2, 10], 13: [2, 10], 15: [2, 10], 18: [2, 10], 20: [2, 10], 22: [2, 10], 23: [2, 10], 24: [2, 10] }, { 5: [2, 11], 11: [2, 11], 13: [2, 11], 15: [2, 11], 18: [2, 11], 20: [2, 11], 22: [2, 11], 23: [2, 11], 24: [2, 11] }, { 5: [2, 12], 11: [2, 12], 13: [2, 12], 15: [2, 12], 18: [2, 12], 20: [2, 12], 22: [2, 12], 23: [2, 12], 24: [2, 12] }, { 12: 25, 19: 23, 25: 24, 41: [1, 21], 42: [1, 26] }, { 12: 25, 19: 27, 25: 24, 41: [1, 21], 42: [1, 26] }, { 12: 25, 19: 28, 25: 24, 41: [1, 21], 42: [1, 26] }, { 41: [2, 16], 42: [2, 16] }, { 41: [2, 17], 42: [2, 17] }, { 41: [2, 18], 42: [2, 18] }, { 5: [1, 30], 7: 29, 8: [2, 3] }, { 5: [2, 21], 8: [2, 21], 12: 20, 27: 31, 41: [1, 21] }, { 5: [2, 23], 8: [2, 23], 41: [2, 23] }, { 28: [1, 32] }, { 5: [2, 45], 11: [2, 45], 13: [2, 45], 15: [2, 45], 18: [2, 45], 20: [2, 45], 22: [2, 45], 23: [2, 45], 24: [2, 45], 28: [2, 45], 30: [2, 45], 31: [2, 45], 41: [2, 45], 42: [2, 45], 49: [2, 45], 52: [2, 45] }, { 5: [2, 7], 11: [2, 7], 13: [2, 7], 15: [2, 7], 18: [2, 7], 20: [2, 7], 22: [2, 7], 23: [2, 7], 24: [2, 7] }, { 5: [2, 15], 11: [2, 15], 12: 25, 13: [2, 15], 15: [2, 15], 18: [2, 15], 20: [2, 15], 22: [2, 15], 23: [2, 15], 24: [2, 15], 25: 33, 41: [1, 21], 42: [1, 26] }, { 5: [2, 20], 11: [2, 20], 13: [2, 20], 15: [2, 20], 18: [2, 20], 20: [2, 20], 22: [2, 20], 23: [2, 20], 24: [2, 20], 41: [2, 20], 42: [2, 20] }, { 5: [2, 43], 11: [2, 43], 13: [2, 43], 15: [2, 43], 18: [2, 43], 20: [2, 43], 22: [2, 43], 23: [2, 43], 24: [2, 43], 30: [2, 43], 31: [2, 43], 41: [2, 43], 42: [2, 43], 49: [2, 43], 52: [2, 43] }, { 5: [2, 44], 11: [2, 44], 13: [2, 44], 15: [2, 44], 18: [2, 44], 20: [2, 44], 22: [2, 44], 23: [2, 44], 24: [2, 44], 30: [2, 44], 31: [2, 44], 41: [2, 44], 42: [2, 44], 49: [2, 44], 52: [2, 44] }, { 5: [2, 14], 11: [2, 14], 12: 25, 13: [2, 14], 15: [2, 14], 18: [2, 14], 20: [2, 14], 22: [2, 14], 23: [2, 14], 24: [2, 14], 25: 33, 41: [1, 21], 42: [1, 26] }, { 5: [2, 13], 11: [2, 13], 12: 25, 13: [2, 13], 15: [2, 13], 18: [2, 13], 20: [2, 13], 22: [2, 13], 23: [2, 13], 24: [2, 13], 25: 33, 41: [1, 21], 42: [1, 26] }, { 8: [1, 34] }, { 8: [2, 4], 9: [1, 35] }, { 5: [2, 22], 8: [2, 22], 41: [2, 22] }, { 15: [2, 29], 29: 36, 30: [2, 29], 31: [2, 29], 32: 37, 33: 38, 41: [2, 29], 42: [2, 29], 43: [2, 29], 48: [2, 29], 49: [2, 29], 52: [2, 29] }, { 5: [2, 19], 11: [2, 19], 13: [2, 19], 15: [2, 19], 18: [2, 19], 20: [2, 19], 22: [2, 19], 23: [2, 19], 24: [2, 19], 41: [2, 19], 42: [2, 19] }, { 1: [2, 1] }, { 8: [1, 39] }, { 30: [1, 40], 31: [1, 41] }, { 30: [2, 26], 31: [2, 26] }, { 15: [2, 42], 30: [2, 42], 31: [2, 42], 34: 42, 36: 43, 38: 45, 41: [1, 46], 42: [1, 47], 43: [1, 48], 48: [1, 44], 49: [2, 42], 52: [2, 42] }, { 1: [2, 2] }, { 5: [2, 24], 8: [2, 24], 41: [2, 24] }, { 15: [2, 29], 30: [2, 29], 31: [2, 29], 32: 49, 33: 38, 41: [2, 29], 42: [2, 29], 43: [2, 29], 48: [2, 29], 49: [2, 29], 52: [2, 29] }, { 15: [1, 52], 30: [2, 49], 31: [2, 49], 35: 50, 49: [1, 51], 52: [1, 53] }, { 15: [2, 28], 30: [2, 28], 31: [2, 28], 41: [2, 28], 42: [2, 28], 43: [2, 28], 44: [2, 28], 48: [2, 28], 49: [2, 28], 52: [2, 28] }, { 12: 25, 25: 54, 41: [1, 21], 42: [1, 26] }, { 15: [2, 37], 30: [2, 37], 31: [2, 37], 39: 55, 40: [2, 37], 41: [2, 37], 42: [2, 37], 43: [2, 37], 44: [2, 37], 45: [1, 56], 46: [1, 57], 47: [1, 58], 48: [2, 37], 49: [2, 37], 52: [2, 37] }, { 15: [2, 34], 30: [2, 34], 31: [2, 34], 40: [2, 34], 41: [2, 34], 42: [2, 34], 43: [2, 34], 44: [2, 34], 45: [2, 34], 46: [2, 34], 47: [2, 34], 48: [2, 34], 49: [2, 34], 52: [2, 34] }, { 15: [2, 35], 30: [2, 35], 31: [2, 35], 40: [2, 35], 41: [2, 35], 42: [2, 35], 43: [2, 35], 44: [2, 35], 45: [2, 35], 46: [2, 35], 47: [2, 35], 48: [2, 35], 49: [2, 35], 52: [2, 35] }, { 31: [2, 29], 33: 60, 37: 59, 41: [2, 29], 42: [2, 29], 43: [2, 29], 44: [2, 29] }, { 30: [2, 25], 31: [2, 25] }, { 30: [2, 27], 31: [2, 27] }, { 49: [2, 50], 50: 61, 51: [2, 50], 53: 62, 54: [1, 63] }, { 30: [2, 47], 31: [2, 47] }, { 30: [2, 48], 31: [2, 48] }, { 15: [2, 41], 30: [2, 41], 31: [2, 41], 49: [2, 41], 52: [2, 41] }, { 15: [2, 33], 30: [2, 33], 31: [2, 33], 40: [1, 64], 41: [2, 33], 42: [2, 33], 43: [2, 33], 44: [2, 33], 48: [2, 33], 49: [2, 33], 52: [2, 33] }, { 15: [2, 38], 30: [2, 38], 31: [2, 38], 40: [2, 38], 41: [2, 38], 42: [2, 38], 43: [2, 38], 44: [2, 38], 48: [2, 38], 49: [2, 38], 52: [2, 38] }, { 15: [2, 39], 30: [2, 39], 31: [2, 39], 40: [2, 39], 41: [2, 39], 42: [2, 39], 43: [2, 39], 44: [2, 39], 48: [2, 39], 49: [2, 39], 52: [2, 39] }, { 15: [2, 40], 30: [2, 40], 31: [2, 40], 40: [2, 40], 41: [2, 40], 42: [2, 40], 43: [2, 40], 44: [2, 40], 48: [2, 40], 49: [2, 40], 52: [2, 40] }, { 31: [1, 66], 44: [1, 65] }, { 31: [2, 31], 36: 43, 38: 45, 41: [1, 46], 42: [1, 47], 43: [1, 48], 44: [2, 31] }, { 49: [1, 68], 51: [1, 67] }, { 49: [2, 51], 51: [2, 51], 54: [1, 69] }, { 49: [2, 54], 51: [2, 54], 54: [2, 54] }, { 15: [2, 32], 30: [2, 32], 31: [2, 32], 41: [2, 32], 42: [2, 32], 43: [2, 32], 44: [2, 32], 48: [2, 32], 49: [2, 32], 52: [2, 32] }, { 15: [2, 36], 30: [2, 36], 31: [2, 36], 40: [2, 36], 41: [2, 36], 42: [2, 36], 43: [2, 36], 44: [2, 36], 45: [2, 36], 46: [2, 36], 47: [2, 36], 48: [2, 36], 49: [2, 36], 52: [2, 36] }, { 31: [2, 29], 33: 70, 41: [2, 29], 42: [2, 29], 43: [2, 29], 44: [2, 29] }, { 30: [2, 46], 31: [2, 46] }, { 49: [2, 50], 50: 71, 51: [2, 50], 53: 62, 54: [1, 63] }, { 49: [2, 55], 51: [2, 55], 54: [2, 55] }, { 31: [2, 30], 36: 43, 38: 45, 41: [1, 46], 42: [1, 47], 43: [1, 48], 44: [2, 30] }, { 49: [1, 68], 51: [1, 72] }, { 49: [2, 53], 51: [2, 53], 53: 73, 54: [1, 63] }, { 49: [2, 52], 51: [2, 52], 54: [1, 69] }],
        defaultActions: { 34: [2, 1], 39: [2, 2] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                throw new Error(str);
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            this.lexer.setInput(input);
            this.lexer.yy = this.yy;
            this.yy.lexer = this.lexer;
            this.yy.parser = this;
            if (typeof this.lexer.yylloc == 'undefined') {
                this.lexer.yylloc = {};
            }
            var yyloc = this.lexer.yylloc;
            lstack.push(yyloc);
            var ranges = this.lexer.options && this.lexer.options.ranges;
            if (typeof this.yy.parseError === 'function') {
                this.parseError = this.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = self.lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (this.lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: this.lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: this.lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    var transform = __webpack_require__(16).transform;
    var ebnf = false;

    // transform ebnf to bnf if necessary
    function extend(json, grammar) {
        json.bnf = ebnf ? transform(grammar) : grammar;
        return json;
    }

    /* generated by jison-lex 0.2.1 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function (input) {
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        this.pushState('code');return 5;
                        break;
                    case 1:
                        return 43;
                        break;
                    case 2:
                        return 44;
                        break;
                    case 3:
                        return 45;
                        break;
                    case 4:
                        return 46;
                        break;
                    case 5:
                        return 47;
                        break;
                    case 6:
                        /* skip whitespace */
                        break;
                    case 7:
                        /* skip comment */
                        break;
                    case 8:
                        /* skip comment */
                        break;
                    case 9:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);return 40;
                        break;
                    case 10:
                        return 41;
                        break;
                    case 11:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);return 42;
                        break;
                    case 12:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);return 42;
                        break;
                    case 13:
                        return 28;
                        break;
                    case 14:
                        return 30;
                        break;
                    case 15:
                        return 31;
                        break;
                    case 16:
                        this.pushState(ebnf ? 'ebnf' : 'bnf');return 5;
                        break;
                    case 17:
                        if (!yy.options) yy.options = {};ebnf = yy.options.ebnf = true;
                        break;
                    case 18:
                        return 48;
                        break;
                    case 19:
                        return 11;
                        break;
                    case 20:
                        return 22;
                        break;
                    case 21:
                        return 23;
                        break;
                    case 22:
                        return 24;
                        break;
                    case 23:
                        return 20;
                        break;
                    case 24:
                        return 18;
                        break;
                    case 25:
                        return 13;
                        break;
                    case 26:
                        /* ignore unrecognized decl */
                        break;
                    case 27:
                        /* ignore type */
                        break;
                    case 28:
                        yy_.yytext = yy_.yytext.substr(2, yy_.yyleng - 4);return 15;
                        break;
                    case 29:
                        yy_.yytext = yy_.yytext.substr(2, yy_.yytext.length - 4);return 15;
                        break;
                    case 30:
                        yy.depth = 0;this.pushState('action');return 49;
                        break;
                    case 31:
                        yy_.yytext = yy_.yytext.substr(2, yy_.yyleng - 2);return 52;
                        break;
                    case 32:
                        /* ignore bad characters */
                        break;
                    case 33:
                        return 8;
                        break;
                    case 34:
                        return 54;
                        break;
                    case 35:
                        return 54;
                        break;
                    case 36:
                        return 54; // regexp with braces or quotes (and no spaces)
                        break;
                    case 37:
                        return 54;
                        break;
                    case 38:
                        return 54;
                        break;
                    case 39:
                        return 54;
                        break;
                    case 40:
                        return 54;
                        break;
                    case 41:
                        yy.depth++;return 49;
                        break;
                    case 42:
                        if (yy.depth == 0) this.begin(ebnf ? 'ebnf' : 'bnf');else yy.depth--;return 51;
                        break;
                    case 43:
                        return 9;
                        break;
                }
            },
            rules: [/^(?:%%)/, /^(?:\()/, /^(?:\))/, /^(?:\*)/, /^(?:\?)/, /^(?:\+)/, /^(?:\s+)/, /^(?:\/\/.*)/, /^(?:\/\*(.|\n|\r)*?\*\/)/, /^(?:\[([a-zA-Z][a-zA-Z0-9_-]*)\])/, /^(?:([a-zA-Z][a-zA-Z0-9_-]*))/, /^(?:"[^"]+")/, /^(?:'[^']+')/, /^(?::)/, /^(?:;)/, /^(?:\|)/, /^(?:%%)/, /^(?:%ebnf\b)/, /^(?:%prec\b)/, /^(?:%start\b)/, /^(?:%left\b)/, /^(?:%right\b)/, /^(?:%nonassoc\b)/, /^(?:%parse-param\b)/, /^(?:%options\b)/, /^(?:%lex[\w\W]*?\/lex\b)/, /^(?:%[a-zA-Z]+[^\r\n]*)/, /^(?:<[a-zA-Z]*>)/, /^(?:\{\{[\w\W]*?\}\})/, /^(?:%\{(.|\r|\n)*?%\})/, /^(?:\{)/, /^(?:->.*)/, /^(?:.)/, /^(?:$)/, /^(?:\/\*(.|\n|\r)*?\*\/)/, /^(?:\/\/.*)/, /^(?:\/[^ /]*?['"{}'][^ ]*?\/)/, /^(?:"(\\\\|\\"|[^"])*")/, /^(?:'(\\\\|\\'|[^'])*')/, /^(?:[/"'][^{}/"']+)/, /^(?:[^{}/"']+)/, /^(?:\{)/, /^(?:\})/, /^(?:(.|\n|\r)+)/],
            conditions: { "bnf": { "rules": [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], "inclusive": true }, "ebnf": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], "inclusive": true }, "action": { "rules": [33, 34, 35, 36, 37, 38, 39, 40, 41, 42], "inclusive": false }, "code": { "rules": [33, 43], "inclusive": false }, "INITIAL": { "rules": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = bnf;
    exports.Parser = bnf.Parser;
    exports.parse = function () {
        return bnf.parse.apply(bnf, arguments);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, process) {/* parser generated by jison 0.4.11 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var ebnf = function () {
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "production": 3, "handle": 4, "EOF": 5, "handle_list": 6, "|": 7, "expression_suffix": 8, "expression": 9, "suffix": 10, "ALIAS": 11, "symbol": 12, "(": 13, ")": 14, "*": 15, "?": 16, "+": 17, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "|", 11: "ALIAS", 12: "symbol", 13: "(", 14: ")", 15: "*", 16: "?", 17: "+" },
        productions_: [0, [3, 2], [6, 1], [6, 3], [4, 0], [4, 2], [8, 3], [8, 2], [9, 1], [9, 3], [10, 0], [10, 1], [10, 1], [10, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                    this.$ = [$$[$0]];
                    break;
                case 3:
                    $$[$0 - 2].push($$[$0]);
                    break;
                case 4:
                    this.$ = [];
                    break;
                case 5:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 6:
                    this.$ = ['xalias', $$[$0 - 1], $$[$0 - 2], $$[$0]];
                    break;
                case 7:
                    if ($$[$0]) this.$ = [$$[$0], $$[$0 - 1]];else this.$ = $$[$0 - 1];
                    break;
                case 8:
                    this.$ = ['symbol', $$[$0]];
                    break;
                case 9:
                    this.$ = ['()', $$[$0 - 1]];
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 4], 12: [2, 4], 13: [2, 4] }, { 1: [3] }, { 5: [1, 3], 8: 4, 9: 5, 12: [1, 6], 13: [1, 7] }, { 1: [2, 1] }, { 5: [2, 5], 7: [2, 5], 12: [2, 5], 13: [2, 5], 14: [2, 5] }, { 5: [2, 10], 7: [2, 10], 10: 8, 11: [2, 10], 12: [2, 10], 13: [2, 10], 14: [2, 10], 15: [1, 9], 16: [1, 10], 17: [1, 11] }, { 5: [2, 8], 7: [2, 8], 11: [2, 8], 12: [2, 8], 13: [2, 8], 14: [2, 8], 15: [2, 8], 16: [2, 8], 17: [2, 8] }, { 4: 13, 6: 12, 7: [2, 4], 12: [2, 4], 13: [2, 4], 14: [2, 4] }, { 5: [2, 7], 7: [2, 7], 11: [1, 14], 12: [2, 7], 13: [2, 7], 14: [2, 7] }, { 5: [2, 11], 7: [2, 11], 11: [2, 11], 12: [2, 11], 13: [2, 11], 14: [2, 11] }, { 5: [2, 12], 7: [2, 12], 11: [2, 12], 12: [2, 12], 13: [2, 12], 14: [2, 12] }, { 5: [2, 13], 7: [2, 13], 11: [2, 13], 12: [2, 13], 13: [2, 13], 14: [2, 13] }, { 7: [1, 16], 14: [1, 15] }, { 7: [2, 2], 8: 4, 9: 5, 12: [1, 6], 13: [1, 7], 14: [2, 2] }, { 5: [2, 6], 7: [2, 6], 12: [2, 6], 13: [2, 6], 14: [2, 6] }, { 5: [2, 9], 7: [2, 9], 11: [2, 9], 12: [2, 9], 13: [2, 9], 14: [2, 9], 15: [2, 9], 16: [2, 9], 17: [2, 9] }, { 4: 17, 7: [2, 4], 12: [2, 4], 13: [2, 4], 14: [2, 4] }, { 7: [2, 3], 8: 4, 9: 5, 12: [1, 6], 13: [1, 7], 14: [2, 3] }],
        defaultActions: { 3: [2, 1] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                throw new Error(str);
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            this.lexer.setInput(input);
            this.lexer.yy = this.yy;
            this.yy.lexer = this.lexer;
            this.yy.parser = this;
            if (typeof this.lexer.yylloc == 'undefined') {
                this.lexer.yylloc = {};
            }
            var yyloc = this.lexer.yylloc;
            lstack.push(yyloc);
            var ranges = this.lexer.options && this.lexer.options.ranges;
            if (typeof this.yy.parseError === 'function') {
                this.parseError = this.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = self.lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (this.lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: this.lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: this.lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    /* generated by jison-lex 0.2.1 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function (input) {
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        /* skip whitespace */
                        break;
                    case 1:
                        return 12;
                        break;
                    case 2:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);return 11;
                        break;
                    case 3:
                        return 12;
                        break;
                    case 4:
                        return 12;
                        break;
                    case 5:
                        return 'bar';
                        break;
                    case 6:
                        return 13;
                        break;
                    case 7:
                        return 14;
                        break;
                    case 8:
                        return 15;
                        break;
                    case 9:
                        return 16;
                        break;
                    case 10:
                        return 7;
                        break;
                    case 11:
                        return 17;
                        break;
                    case 12:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:\s+)/, /^(?:([a-zA-Z][a-zA-Z0-9_-]*))/, /^(?:\[([a-zA-Z][a-zA-Z0-9_-]*)\])/, /^(?:'[^']*')/, /^(?:\.)/, /^(?:bar\b)/, /^(?:\()/, /^(?:\))/, /^(?:\*)/, /^(?:\?)/, /^(?:\|)/, /^(?:\+)/, /^(?:$)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = ebnf;
    exports.Parser = ebnf.Parser;
    exports.parse = function () {
        return ebnf.parse.apply(ebnf, arguments);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), __webpack_require__(0)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*global exports:true, generateStatement:true, generateExpression:true, require:true, global:true*/
(function () {
    'use strict';

    var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, isArray, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse, sourceMap, FORMAT_MINIFY, FORMAT_DEFAULTS;

    estraverse = __webpack_require__(47);
    esutils = __webpack_require__(42);

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ComprehensionBlock: 'ComprehensionBlock',
        ComprehensionExpression: 'ComprehensionExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExportDeclaration: 'ExportDeclaration',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        Member: 17,
        Primary: 18
    };

    BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false
            },
            moz: {
                comprehensionExpressionStartsWithAssignment: false,
                starlessGenerator: false,
                parenthesizedComprehensionBlock: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null
        };
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function hasLineTerminator(str) {
        return (/[\r\n]/g.test(str)
        );
    }

    function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value !== value) {
            throw new Error('Numeric literal whose value is NaN');
        }
        if (value < 0 || value === 0 && 1 / value < 0) {
            throw new Error('Numeric literal whose value is negative');
        }

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        if (!json && result.charCodeAt(0) === 0x30 /* 0 */ && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30 /* 0 */) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length || hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length) && +temp === value) {
            result = temp;
        }

        return result;
    }

    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + (ch === 0x2028 ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {
            // \n, \r
            return (previousIsBackslash ? '' : '\\') + (ch === 10 ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {
                            // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {
                            // /
                            result += '\\';
                        } else if (ch === 91) {
                            // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92; // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex,
            result = '\\';

        switch (code) {
            case 0x08 /* \b */:
                result += 'b';
                break;
            case 0x0C /* \f */:
                result += 'f';
                break;
            case 0x09 /* \t */:
                result += 't';
                break;
            default:
                hex = code.toString(16).toUpperCase();
                if (json || code > 0xFF) {
                    result += 'u' + '0000'.slice(hex.length) + hex;
                } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
                    result += '0';
                } else if (code === 0x000B /* \v */) {
                        // '\v'
                        result += 'x0B';
                    } else {
                    result += 'x' + '00'.slice(hex.length) + hex;
                }
                break;
        }

        return result;
    }

    function escapeDisallowedCharacter(code) {
        var result = '\\';
        switch (code) {
            case 0x5C /* \ */:
                result += '\\';
                break;
            case 0x0A /* \n */:
                result += 'n';
                break;
            case 0x0D /* \r */:
                result += 'r';
                break;
            case 0x2028:
                result += 'u2028';
                break;
            case 0x2029:
                result += 'u2029';
                break;
            default:
                throw new Error('Incorrectly classified character');
        }

        return result;
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27 /* ' */) {
                    quote = '"';
                    break;
                } else if (code === 0x22 /* " */) {
                    quote = '\'';
                    break;
                } else if (code === 0x5C /* \ */) {
                    ++i;
                }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '',
            i,
            len,
            code,
            singleQuotes = 0,
            doubleQuotes = 0,
            single,
            quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27 /* ' */) {
                    ++singleQuotes;
                } else if (code === 0x22 /* " */) {
                    ++doubleQuotes;
                } else if (code === 0x2F /* / */ && json) {
                result += '\\';
            } else if (esutils.code.isLineTerminator(code) || code === 0x5C /* \ */) {
                    result += escapeDisallowedCharacter(code);
                    continue;
                } else if (json && code < 0x20 /* SP */ || !(json || escapeless || code >= 0x20 /* SP */ && code <= 0x7E /* ~ */)) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || quotes === 'auto' && doubleQuotes < singleQuotes);
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27 /* ' */ && single || code === 0x22 /* " */ && !single) {
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }

    /**
     * flatten an array to a string, where the array can contain
     * either strings or nested arrays
     */
    function flattenToString(arr) {
        var i,
            iz,
            elem,
            result = '';
        for (i = 0, iz = arr.length; i < iz; ++i) {
            elem = arr[i];
            result += isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
    }

    /**
     * convert generated to a SourceNode when source maps are enabled.
     */
    function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
            // with no source maps, generated is either an
            // array or a string.  if an array, flatten it.
            // if a string, just return it
            if (isArray(generated)) {
                return flattenToString(generated);
            } else {
                return generated;
            }
        }
        if (node == null) {
            if (generated instanceof SourceNode) {
                return generated;
            } else {
                node = {};
            }
        }
        if (node.loc == null) {
            return new SourceNode(null, null, sourceMap, generated, node.name || null);
        }
        return new SourceNode(node.loc.start.line, node.loc.start.column, sourceMap === true ? node.loc.source || null : sourceMap, generated, node.name || null);
    }

    function noEmptySpace() {
        return space ? space : ' ';
    }

    function join(left, right) {
        var leftSource = toSourceNodeWhenNeeded(left).toString(),
            rightSource = toSourceNodeWhenNeeded(right).toString(),
            leftCharCode = leftSource.charCodeAt(leftSource.length - 1),
            rightCharCode = rightSource.charCodeAt(0);

        if ((leftCharCode === 0x2B /* + */ || leftCharCode === 0x2D /* - */) && leftCharCode === rightCharCode || esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode) || leftCharCode === 0x2F /* / */ && rightCharCode === 0x69 /* i */) {
                // infix word operators all start with `i`
                return [left, noEmptySpace(), right];
            } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) || esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
            return [left, right];
        }
        return [left, space, right];
    }

    function addIndent(stmt) {
        return [base, stmt];
    }

    function withIndent(fn) {
        var previousBase, result;
        previousBase = base;
        base += indent;
        result = fn.call(this, base);
        base = previousBase;
        return result;
    }

    function calculateSpaces(str) {
        var i;
        for (i = str.length - 1; i >= 0; --i) {
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
                break;
            }
        }
        return str.length - 1 - i;
    }

    function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;

        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;

        // first line doesn't have indentation
        for (i = 1, len = array.length; i < len; ++i) {
            line = array[i];
            j = 0;
            while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
                ++j;
            }
            if (spaces > j) {
                spaces = j;
            }
        }

        if (typeof specialBase !== 'undefined') {
            // pattern like
            // {
            //   var t = 20;  /*
            //                 * this is comment
            //                 */
            // }
            previousBase = base;
            if (array[1][spaces] === '*') {
                specialBase += ' ';
            }
            base = specialBase;
        } else {
            if (spaces & 1) {
                // /*
                //  *
                //  */
                // If spaces are odd number, above pattern is considered.
                // We waste 1 space.
                --spaces;
            }
            previousBase = base;
        }

        for (i = 1, len = array.length; i < len; ++i) {
            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn.join('') : sn;
        }

        base = previousBase;

        return array.join('\n');
    }

    function generateComment(comment, specialBase) {
        if (comment.type === 'Line') {
            if (endsWithLineTerminator(comment.value)) {
                return '//' + comment.value;
            } else {
                // Always use LineTerminator
                return '//' + comment.value + '\n';
            }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
            return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
        }
        return '/*' + comment.value + '*/';
    }

    function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment;

        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;

            comment = stmt.leadingComments[0];
            result = [];
            if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                result.push('\n');
            }
            result.push(generateComment(comment));
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push('\n');
            }

            for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                comment = stmt.leadingComments[i];
                fragment = [generateComment(comment)];
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    fragment.push('\n');
                }
                result.push(addIndent(fragment));
            }

            result.push(addIndent(save));
        }

        if (stmt.trailingComments) {
            tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
            specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
            for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                comment = stmt.trailingComments[i];
                if (tailingToStatement) {
                    // We assume target like following script
                    //
                    // var t = 20;  /**
                    //               * This is comment of t
                    //               */
                    if (i === 0) {
                        // first case
                        result = [result, indent];
                    } else {
                        result = [result, specialBase];
                    }
                    result.push(generateComment(comment, specialBase));
                } else {
                    result = [result, addIndent(generateComment(comment))];
                }
                if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result = [result, '\n'];
                }
            }
        }

        return result;
    }

    function parenthesize(text, current, should) {
        if (current < should) {
            return ['(', text, ')'];
        }
        return text;
    }

    function maybeBlock(stmt, semicolonOptional, functionBody) {
        var result, noLeadingComment;

        noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, generateStatement(stmt, { functionBody: functionBody })];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        withIndent(function () {
            result = [newline, addIndent(generateStatement(stmt, { semicolonOptional: semicolonOptional, functionBody: functionBody }))];
        });

        return result;
    }

    function maybeBlockSuffix(stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    }

    function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for (i = 1, iz = result.length; i < iz; i++) {
            result[i] = newline + base + result[i];
        }
        return result;
    }

    function generateVerbatim(expr, option) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];

        if (typeof verbatim === 'string') {
            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, option.precedence);
        } else {
            // verbatim is object
            result = generateVerbatimString(verbatim.content);
            prec = verbatim.precedence != null ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, option.precedence);
        }

        return toSourceNodeWhenNeeded(result, expr);
    }

    function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
    }

    function generatePattern(node, options) {
        var result;

        if (node.type === Syntax.Identifier) {
            result = generateIdentifier(node);
        } else {
            result = generateExpression(node, {
                precedence: options.precedence,
                allowIn: options.allowIn,
                allowCall: true
            });
        }

        return result;
    }

    function generateFunctionBody(node) {
        var result, i, len, expr, arrow;

        arrow = node.type === Syntax.ArrowFunctionExpression;

        if (arrow && node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [generateIdentifier(node.params[0])];
        } else {
            result = ['('];
            for (i = 0, len = node.params.length; i < len; ++i) {
                result.push(generatePattern(node.params[i], {
                    precedence: Precedence.Assignment,
                    allowIn: true
                }));
                if (i + 1 < len) {
                    result.push(',' + space);
                }
            }
            result.push(')');
        }

        if (arrow) {
            result.push(space);
            result.push('=>');
        }

        if (node.expression) {
            result.push(space);
            expr = generateExpression(node.body, {
                precedence: Precedence.Assignment,
                allowIn: true,
                allowCall: true
            });
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(maybeBlock(node.body, false, true));
        }
        return result;
    }

    function generateIterationForStatement(operator, stmt, semicolonIsNotNeeded) {
        var result = ['for' + space + '('];
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(stmt.left.kind + noEmptySpace());
                    result.push(generateStatement(stmt.left.declarations[0], {
                        allowIn: false
                    }));
                });
            } else {
                result.push(generateExpression(stmt.left, {
                    precedence: Precedence.Call,
                    allowIn: true,
                    allowCall: true
                }));
            }

            result = join(result, operator);
            result = [join(result, generateExpression(stmt.right, {
                precedence: Precedence.Sequence,
                allowIn: true,
                allowCall: true
            })), ')'];
        });
        result.push(maybeBlock(stmt.body, semicolonIsNotNeeded));
        return result;
    }

    function generateLiteral(expr) {
        var raw;
        if (expr.hasOwnProperty('raw') && parse && extra.raw) {
            try {
                raw = parse(expr.raw).body[0].expression;
                if (raw.type === Syntax.Literal) {
                    if (raw.value === expr.value) {
                        return expr.raw;
                    }
                }
            } catch (e) {
                // not use raw property
            }
        }

        if (expr.value === null) {
            return 'null';
        }

        if (typeof expr.value === 'string') {
            return escapeString(expr.value);
        }

        if (typeof expr.value === 'number') {
            return generateNumber(expr.value);
        }

        if (typeof expr.value === 'boolean') {
            return expr.value ? 'true' : 'false';
        }

        return generateRegExp(expr.value);
    }

    function generateExpression(expr, option) {
        var result, precedence, type, currentPrecedence, i, len, fragment, multiline, leftCharCode, leftSource, rightCharCode, allowIn, allowCall, allowUnparenthesizedNew, property, isGenerator;

        precedence = option.precedence;
        allowIn = option.allowIn;
        allowCall = option.allowCall;
        type = expr.type || option.type;

        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
            return generateVerbatim(expr, option);
        }

        switch (type) {
            case Syntax.SequenceExpression:
                result = [];
                allowIn |= Precedence.Sequence < precedence;
                for (i = 0, len = expr.expressions.length; i < len; ++i) {
                    result.push(generateExpression(expr.expressions[i], {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    }));
                    if (i + 1 < len) {
                        result.push(',' + space);
                    }
                }
                result = parenthesize(result, Precedence.Sequence, precedence);
                break;

            case Syntax.AssignmentExpression:
                allowIn |= Precedence.Assignment < precedence;
                result = parenthesize([generateExpression(expr.left, {
                    precedence: Precedence.Call,
                    allowIn: allowIn,
                    allowCall: true
                }), space + expr.operator + space, generateExpression(expr.right, {
                    precedence: Precedence.Assignment,
                    allowIn: allowIn,
                    allowCall: true
                })], Precedence.Assignment, precedence);
                break;

            case Syntax.ArrowFunctionExpression:
                allowIn |= Precedence.ArrowFunction < precedence;
                result = parenthesize(generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
                break;

            case Syntax.ConditionalExpression:
                allowIn |= Precedence.Conditional < precedence;
                result = parenthesize([generateExpression(expr.test, {
                    precedence: Precedence.LogicalOR,
                    allowIn: allowIn,
                    allowCall: true
                }), space + '?' + space, generateExpression(expr.consequent, {
                    precedence: Precedence.Assignment,
                    allowIn: allowIn,
                    allowCall: true
                }), space + ':' + space, generateExpression(expr.alternate, {
                    precedence: Precedence.Assignment,
                    allowIn: allowIn,
                    allowCall: true
                })], Precedence.Conditional, precedence);
                break;

            case Syntax.LogicalExpression:
            case Syntax.BinaryExpression:
                currentPrecedence = BinaryPrecedence[expr.operator];

                allowIn |= currentPrecedence < precedence;

                fragment = generateExpression(expr.left, {
                    precedence: currentPrecedence,
                    allowIn: allowIn,
                    allowCall: true
                });

                leftSource = fragment.toString();

                if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPart(expr.operator.charCodeAt(0))) {
                    result = [fragment, noEmptySpace(), expr.operator];
                } else {
                    result = join(fragment, expr.operator);
                }

                fragment = generateExpression(expr.right, {
                    precedence: currentPrecedence + 1,
                    allowIn: allowIn,
                    allowCall: true
                });

                if (expr.operator === '/' && fragment.toString().charAt(0) === '/' || expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                    // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
                    result.push(noEmptySpace());
                    result.push(fragment);
                } else {
                    result = join(result, fragment);
                }

                if (expr.operator === 'in' && !allowIn) {
                    result = ['(', result, ')'];
                } else {
                    result = parenthesize(result, currentPrecedence, precedence);
                }

                break;

            case Syntax.CallExpression:
                result = [generateExpression(expr.callee, {
                    precedence: Precedence.Call,
                    allowIn: true,
                    allowCall: true,
                    allowUnparenthesizedNew: false
                })];

                result.push('(');
                for (i = 0, len = expr['arguments'].length; i < len; ++i) {
                    result.push(generateExpression(expr['arguments'][i], {
                        precedence: Precedence.Assignment,
                        allowIn: true,
                        allowCall: true
                    }));
                    if (i + 1 < len) {
                        result.push(',' + space);
                    }
                }
                result.push(')');

                if (!allowCall) {
                    result = ['(', result, ')'];
                } else {
                    result = parenthesize(result, Precedence.Call, precedence);
                }
                break;

            case Syntax.NewExpression:
                len = expr['arguments'].length;
                allowUnparenthesizedNew = option.allowUnparenthesizedNew === undefined || option.allowUnparenthesizedNew;

                result = join('new', generateExpression(expr.callee, {
                    precedence: Precedence.New,
                    allowIn: true,
                    allowCall: false,
                    allowUnparenthesizedNew: allowUnparenthesizedNew && !parentheses && len === 0
                }));

                if (!allowUnparenthesizedNew || parentheses || len > 0) {
                    result.push('(');
                    for (i = 0; i < len; ++i) {
                        result.push(generateExpression(expr['arguments'][i], {
                            precedence: Precedence.Assignment,
                            allowIn: true,
                            allowCall: true
                        }));
                        if (i + 1 < len) {
                            result.push(',' + space);
                        }
                    }
                    result.push(')');
                }

                result = parenthesize(result, Precedence.New, precedence);
                break;

            case Syntax.MemberExpression:
                result = [generateExpression(expr.object, {
                    precedence: Precedence.Call,
                    allowIn: true,
                    allowCall: allowCall,
                    allowUnparenthesizedNew: false
                })];

                if (expr.computed) {
                    result.push('[');
                    result.push(generateExpression(expr.property, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: allowCall
                    }));
                    result.push(']');
                } else {
                    if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                        fragment = toSourceNodeWhenNeeded(result).toString();
                        // When the following conditions are all true,
                        //   1. No floating point
                        //   2. Don't have exponents
                        //   3. The last character is a decimal digit
                        //   4. Not hexadecimal OR octal number literal
                        // we should add a floating point.
                        if (fragment.indexOf('.') < 0 && !/[eExX]/.test(fragment) && esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) && !(fragment.length >= 2 && fragment.charCodeAt(0) === 48) // '0'
                        ) {
                                result.push('.');
                            }
                    }
                    result.push('.');
                    result.push(generateIdentifier(expr.property));
                }

                result = parenthesize(result, Precedence.Member, precedence);
                break;

            case Syntax.UnaryExpression:
                fragment = generateExpression(expr.argument, {
                    precedence: Precedence.Unary,
                    allowIn: true,
                    allowCall: true
                });

                if (space === '') {
                    result = join(expr.operator, fragment);
                } else {
                    result = [expr.operator];
                    if (expr.operator.length > 2) {
                        // delete, void, typeof
                        // get `typeof []`, not `typeof[]`
                        result = join(result, fragment);
                    } else {
                        // Prevent inserting spaces between operator and argument if it is unnecessary
                        // like, `!cond`
                        leftSource = toSourceNodeWhenNeeded(result).toString();
                        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                        rightCharCode = fragment.toString().charCodeAt(0);

                        if ((leftCharCode === 0x2B /* + */ || leftCharCode === 0x2D /* - */) && leftCharCode === rightCharCode || esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode)) {
                            result.push(noEmptySpace());
                            result.push(fragment);
                        } else {
                            result.push(fragment);
                        }
                    }
                }
                result = parenthesize(result, Precedence.Unary, precedence);
                break;

            case Syntax.YieldExpression:
                if (expr.delegate) {
                    result = 'yield*';
                } else {
                    result = 'yield';
                }
                if (expr.argument) {
                    result = join(result, generateExpression(expr.argument, {
                        precedence: Precedence.Yield,
                        allowIn: true,
                        allowCall: true
                    }));
                }
                result = parenthesize(result, Precedence.Yield, precedence);
                break;

            case Syntax.UpdateExpression:
                if (expr.prefix) {
                    result = parenthesize([expr.operator, generateExpression(expr.argument, {
                        precedence: Precedence.Unary,
                        allowIn: true,
                        allowCall: true
                    })], Precedence.Unary, precedence);
                } else {
                    result = parenthesize([generateExpression(expr.argument, {
                        precedence: Precedence.Postfix,
                        allowIn: true,
                        allowCall: true
                    }), expr.operator], Precedence.Postfix, precedence);
                }
                break;

            case Syntax.FunctionExpression:
                isGenerator = expr.generator && !extra.moz.starlessGenerator;
                result = isGenerator ? 'function*' : 'function';

                if (expr.id) {
                    result = [result, isGenerator ? space : noEmptySpace(), generateIdentifier(expr.id), generateFunctionBody(expr)];
                } else {
                    result = [result + space, generateFunctionBody(expr)];
                }

                break;

            case Syntax.ArrayPattern:
            case Syntax.ArrayExpression:
                if (!expr.elements.length) {
                    result = '[]';
                    break;
                }
                multiline = expr.elements.length > 1;
                result = ['[', multiline ? newline : ''];
                withIndent(function (indent) {
                    for (i = 0, len = expr.elements.length; i < len; ++i) {
                        if (!expr.elements[i]) {
                            if (multiline) {
                                result.push(indent);
                            }
                            if (i + 1 === len) {
                                result.push(',');
                            }
                        } else {
                            result.push(multiline ? indent : '');
                            result.push(generateExpression(expr.elements[i], {
                                precedence: Precedence.Assignment,
                                allowIn: true,
                                allowCall: true
                            }));
                        }
                        if (i + 1 < len) {
                            result.push(',' + (multiline ? newline : space));
                        }
                    }
                });
                if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }
                result.push(multiline ? base : '');
                result.push(']');
                break;

            case Syntax.Property:
                if (expr.kind === 'get' || expr.kind === 'set') {
                    result = [expr.kind, noEmptySpace(), generateExpression(expr.key, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }), generateFunctionBody(expr.value)];
                } else {
                    if (expr.shorthand) {
                        result = generateExpression(expr.key, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        });
                    } else if (expr.method) {
                        result = [];
                        if (expr.value.generator) {
                            result.push('*');
                        }
                        result.push(generateExpression(expr.key, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        }));
                        result.push(generateFunctionBody(expr.value));
                    } else {
                        result = [generateExpression(expr.key, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        }), ':' + space, generateExpression(expr.value, {
                            precedence: Precedence.Assignment,
                            allowIn: true,
                            allowCall: true
                        })];
                    }
                }
                break;

            case Syntax.ObjectExpression:
                if (!expr.properties.length) {
                    result = '{}';
                    break;
                }
                multiline = expr.properties.length > 1;

                withIndent(function () {
                    fragment = generateExpression(expr.properties[0], {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true,
                        type: Syntax.Property
                    });
                });

                if (!multiline) {
                    // issues 4
                    // Do not transform from
                    //   dejavu.Class.declare({
                    //       method2: function () {}
                    //   });
                    // to
                    //   dejavu.Class.declare({method2: function () {
                    //       }});
                    if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result = ['{', space, fragment, space, '}'];
                        break;
                    }
                }

                withIndent(function (indent) {
                    result = ['{', newline, indent, fragment];

                    if (multiline) {
                        result.push(',' + newline);
                        for (i = 1, len = expr.properties.length; i < len; ++i) {
                            result.push(indent);
                            result.push(generateExpression(expr.properties[i], {
                                precedence: Precedence.Sequence,
                                allowIn: true,
                                allowCall: true,
                                type: Syntax.Property
                            }));
                            if (i + 1 < len) {
                                result.push(',' + newline);
                            }
                        }
                    }
                });

                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }
                result.push(base);
                result.push('}');
                break;

            case Syntax.ObjectPattern:
                if (!expr.properties.length) {
                    result = '{}';
                    break;
                }

                multiline = false;
                if (expr.properties.length === 1) {
                    property = expr.properties[0];
                    if (property.value.type !== Syntax.Identifier) {
                        multiline = true;
                    }
                } else {
                    for (i = 0, len = expr.properties.length; i < len; ++i) {
                        property = expr.properties[i];
                        if (!property.shorthand) {
                            multiline = true;
                            break;
                        }
                    }
                }
                result = ['{', multiline ? newline : ''];

                withIndent(function (indent) {
                    for (i = 0, len = expr.properties.length; i < len; ++i) {
                        result.push(multiline ? indent : '');
                        result.push(generateExpression(expr.properties[i], {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        }));
                        if (i + 1 < len) {
                            result.push(',' + (multiline ? newline : space));
                        }
                    }
                });

                if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }
                result.push(multiline ? base : '');
                result.push('}');
                break;

            case Syntax.ThisExpression:
                result = 'this';
                break;

            case Syntax.Identifier:
                result = generateIdentifier(expr);
                break;

            case Syntax.Literal:
                result = generateLiteral(expr);
                break;

            case Syntax.GeneratorExpression:
            case Syntax.ComprehensionExpression:
                // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
                // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6
                result = type === Syntax.GeneratorExpression ? ['('] : ['['];

                if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                    fragment = generateExpression(expr.body, {
                        precedence: Precedence.Assignment,
                        allowIn: true,
                        allowCall: true
                    });

                    result.push(fragment);
                }

                if (expr.blocks) {
                    withIndent(function () {
                        for (i = 0, len = expr.blocks.length; i < len; ++i) {
                            fragment = generateExpression(expr.blocks[i], {
                                precedence: Precedence.Sequence,
                                allowIn: true,
                                allowCall: true
                            });

                            if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                                result = join(result, fragment);
                            } else {
                                result.push(fragment);
                            }
                        }
                    });
                }

                if (expr.filter) {
                    result = join(result, 'if' + space);
                    fragment = generateExpression(expr.filter, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    });
                    if (extra.moz.parenthesizedComprehensionBlock) {
                        result = join(result, ['(', fragment, ')']);
                    } else {
                        result = join(result, fragment);
                    }
                }

                if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                    fragment = generateExpression(expr.body, {
                        precedence: Precedence.Assignment,
                        allowIn: true,
                        allowCall: true
                    });

                    result = join(result, fragment);
                }

                result.push(type === Syntax.GeneratorExpression ? ')' : ']');
                break;

            case Syntax.ComprehensionBlock:
                if (expr.left.type === Syntax.VariableDeclaration) {
                    fragment = [expr.left.kind, noEmptySpace(), generateStatement(expr.left.declarations[0], {
                        allowIn: false
                    })];
                } else {
                    fragment = generateExpression(expr.left, {
                        precedence: Precedence.Call,
                        allowIn: true,
                        allowCall: true
                    });
                }

                fragment = join(fragment, expr.of ? 'of' : 'in');
                fragment = join(fragment, generateExpression(expr.right, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                }));

                if (extra.moz.parenthesizedComprehensionBlock) {
                    result = ['for' + space + '(', fragment, ')'];
                } else {
                    result = join('for' + space, fragment);
                }
                break;

            default:
                throw new Error('Unknown expression type: ' + expr.type);
        }

        if (extra.comment) {
            result = addComments(expr, result);
        }
        return toSourceNodeWhenNeeded(result, expr);
    }

    function generateStatement(stmt, option) {
        var i, len, result, node, specifier, allowIn, functionBody, directiveContext, fragment, semicolon, isGenerator;

        allowIn = true;
        semicolon = ';';
        functionBody = false;
        directiveContext = false;
        if (option) {
            allowIn = option.allowIn === undefined || option.allowIn;
            if (!semicolons && option.semicolonOptional === true) {
                semicolon = '';
            }
            functionBody = option.functionBody;
            directiveContext = option.directiveContext;
        }

        switch (stmt.type) {
            case Syntax.BlockStatement:
                result = ['{', newline];

                withIndent(function () {
                    for (i = 0, len = stmt.body.length; i < len; ++i) {
                        fragment = addIndent(generateStatement(stmt.body[i], {
                            semicolonOptional: i === len - 1,
                            directiveContext: functionBody
                        }));
                        result.push(fragment);
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                            result.push(newline);
                        }
                    }
                });

                result.push(addIndent('}'));
                break;

            case Syntax.BreakStatement:
                if (stmt.label) {
                    result = 'break ' + stmt.label.name + semicolon;
                } else {
                    result = 'break' + semicolon;
                }
                break;

            case Syntax.ContinueStatement:
                if (stmt.label) {
                    result = 'continue ' + stmt.label.name + semicolon;
                } else {
                    result = 'continue' + semicolon;
                }
                break;

            case Syntax.DirectiveStatement:
                if (extra.raw && stmt.raw) {
                    result = stmt.raw + semicolon;
                } else {
                    result = escapeDirective(stmt.directive) + semicolon;
                }
                break;

            case Syntax.DoWhileStatement:
                // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
                result = join('do', maybeBlock(stmt.body));
                result = maybeBlockSuffix(stmt.body, result);
                result = join(result, ['while' + space + '(', generateExpression(stmt.test, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                }), ')' + semicolon]);
                break;

            case Syntax.CatchClause:
                withIndent(function () {
                    var guard;

                    result = ['catch' + space + '(', generateExpression(stmt.param, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }), ')'];

                    if (stmt.guard) {
                        guard = generateExpression(stmt.guard, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        });

                        result.splice(2, 0, ' if ', guard);
                    }
                });
                result.push(maybeBlock(stmt.body));
                break;

            case Syntax.DebuggerStatement:
                result = 'debugger' + semicolon;
                break;

            case Syntax.EmptyStatement:
                result = ';';
                break;

            case Syntax.ExportDeclaration:
                result = 'export ';
                if (stmt.declaration) {
                    // FunctionDeclaration or VariableDeclaration
                    result = [result, generateStatement(stmt.declaration, { semicolonOptional: semicolon === '' })];
                    break;
                }
                break;

            case Syntax.ExpressionStatement:
                result = [generateExpression(stmt.expression, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                })];
                // 12.4 '{', 'function' is not allowed in this position.
                // wrap expression with parentheses
                fragment = toSourceNodeWhenNeeded(result).toString();
                if (fragment.charAt(0) === '{' || // ObjectExpression
                fragment.slice(0, 8) === 'function' && '* ('.indexOf(fragment.charAt(8)) >= 0 || // function or generator
                directive && directiveContext && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string') {
                    result = ['(', result, ')' + semicolon];
                } else {
                    result.push(semicolon);
                }
                break;

            case Syntax.ImportDeclaration:
                // ES6: 15.2.1 valid import declarations:
                //     - import ImportClause FromClause ;
                //     - import ModuleSpecifier ;
                // If no ImportClause is present,
                // this should be `import ModuleSpecifier` so skip `from`
                //
                // ModuleSpecifier is StringLiteral.
                if (stmt.specifiers.length === 0) {
                    // import ModuleSpecifier ;
                    result = ['import', space, generateLiteral(stmt.source)];
                } else {
                    // import ImportClause FromClause ;
                    if (stmt.kind === 'default') {
                        // import ... from "...";
                        result = ['import', noEmptySpace(), stmt.specifiers[0].id.name, noEmptySpace()];
                    } else {
                        // stmt.kind === 'named'
                        result = ['import', space, '{'];

                        if (stmt.specifiers.length === 1) {
                            // import { ... } from "...";
                            specifier = stmt.specifiers[0];
                            result.push(space + specifier.id.name);
                            if (specifier.name) {
                                result.push(noEmptySpace() + 'as' + noEmptySpace() + specifier.name.name);
                            }
                            result.push(space + '}' + space);
                        } else {
                            // import {
                            //    ...,
                            //    ...,
                            // } from "...";
                            withIndent(function (indent) {
                                var i, iz;
                                result.push(newline);
                                for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                                    specifier = stmt.specifiers[i];
                                    result.push(indent + specifier.id.name);
                                    if (specifier.name) {
                                        result.push(noEmptySpace() + 'as' + noEmptySpace() + specifier.name.name);
                                    }

                                    if (i + 1 < iz) {
                                        result.push(',' + newline);
                                    }
                                }
                            });
                            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                                result.push(newline);
                            }
                            result.push(base + '}' + space);
                        }
                    }

                    result.push('from' + space);
                    result.push(generateLiteral(stmt.source));
                }
                result.push(semicolon);
                break;

            case Syntax.VariableDeclarator:
                if (stmt.init) {
                    result = [generateExpression(stmt.id, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    }), space, '=', space, generateExpression(stmt.init, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    })];
                } else {
                    result = generatePattern(stmt.id, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn
                    });
                }
                break;

            case Syntax.VariableDeclaration:
                result = [stmt.kind];
                // special path for
                // var x = function () {
                // };
                if (stmt.declarations.length === 1 && stmt.declarations[0].init && stmt.declarations[0].init.type === Syntax.FunctionExpression) {
                    result.push(noEmptySpace());
                    result.push(generateStatement(stmt.declarations[0], {
                        allowIn: allowIn
                    }));
                } else {
                    // VariableDeclarator is typed as Statement,
                    // but joined with comma (not LineTerminator).
                    // So if comment is attached to target node, we should specialize.
                    withIndent(function () {
                        node = stmt.declarations[0];
                        if (extra.comment && node.leadingComments) {
                            result.push('\n');
                            result.push(addIndent(generateStatement(node, {
                                allowIn: allowIn
                            })));
                        } else {
                            result.push(noEmptySpace());
                            result.push(generateStatement(node, {
                                allowIn: allowIn
                            }));
                        }

                        for (i = 1, len = stmt.declarations.length; i < len; ++i) {
                            node = stmt.declarations[i];
                            if (extra.comment && node.leadingComments) {
                                result.push(',' + newline);
                                result.push(addIndent(generateStatement(node, {
                                    allowIn: allowIn
                                })));
                            } else {
                                result.push(',' + space);
                                result.push(generateStatement(node, {
                                    allowIn: allowIn
                                }));
                            }
                        }
                    });
                }
                result.push(semicolon);
                break;

            case Syntax.ThrowStatement:
                result = [join('throw', generateExpression(stmt.argument, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                })), semicolon];
                break;

            case Syntax.TryStatement:
                result = ['try', maybeBlock(stmt.block)];
                result = maybeBlockSuffix(stmt.block, result);

                if (stmt.handlers) {
                    // old interface
                    for (i = 0, len = stmt.handlers.length; i < len; ++i) {
                        result = join(result, generateStatement(stmt.handlers[i]));
                        if (stmt.finalizer || i + 1 !== len) {
                            result = maybeBlockSuffix(stmt.handlers[i].body, result);
                        }
                    }
                } else {
                    stmt.guardedHandlers = stmt.guardedHandlers || [];

                    for (i = 0, len = stmt.guardedHandlers.length; i < len; ++i) {
                        result = join(result, generateStatement(stmt.guardedHandlers[i]));
                        if (stmt.finalizer || i + 1 !== len) {
                            result = maybeBlockSuffix(stmt.guardedHandlers[i].body, result);
                        }
                    }

                    // new interface
                    if (stmt.handler) {
                        if (isArray(stmt.handler)) {
                            for (i = 0, len = stmt.handler.length; i < len; ++i) {
                                result = join(result, generateStatement(stmt.handler[i]));
                                if (stmt.finalizer || i + 1 !== len) {
                                    result = maybeBlockSuffix(stmt.handler[i].body, result);
                                }
                            }
                        } else {
                            result = join(result, generateStatement(stmt.handler));
                            if (stmt.finalizer) {
                                result = maybeBlockSuffix(stmt.handler.body, result);
                            }
                        }
                    }
                }
                if (stmt.finalizer) {
                    result = join(result, ['finally', maybeBlock(stmt.finalizer)]);
                }
                break;

            case Syntax.SwitchStatement:
                withIndent(function () {
                    result = ['switch' + space + '(', generateExpression(stmt.discriminant, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }), ')' + space + '{' + newline];
                });
                if (stmt.cases) {
                    for (i = 0, len = stmt.cases.length; i < len; ++i) {
                        fragment = addIndent(generateStatement(stmt.cases[i], { semicolonOptional: i === len - 1 }));
                        result.push(fragment);
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                            result.push(newline);
                        }
                    }
                }
                result.push(addIndent('}'));
                break;

            case Syntax.SwitchCase:
                withIndent(function () {
                    if (stmt.test) {
                        result = [join('case', generateExpression(stmt.test, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        })), ':'];
                    } else {
                        result = ['default:'];
                    }

                    i = 0;
                    len = stmt.consequent.length;
                    if (len && stmt.consequent[0].type === Syntax.BlockStatement) {
                        fragment = maybeBlock(stmt.consequent[0]);
                        result.push(fragment);
                        i = 1;
                    }

                    if (i !== len && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }

                    for (; i < len; ++i) {
                        fragment = addIndent(generateStatement(stmt.consequent[i], { semicolonOptional: i === len - 1 && semicolon === '' }));
                        result.push(fragment);
                        if (i + 1 !== len && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                            result.push(newline);
                        }
                    }
                });
                break;

            case Syntax.IfStatement:
                withIndent(function () {
                    result = ['if' + space + '(', generateExpression(stmt.test, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }), ')'];
                });
                if (stmt.alternate) {
                    result.push(maybeBlock(stmt.consequent));
                    result = maybeBlockSuffix(stmt.consequent, result);
                    if (stmt.alternate.type === Syntax.IfStatement) {
                        result = join(result, ['else ', generateStatement(stmt.alternate, { semicolonOptional: semicolon === '' })]);
                    } else {
                        result = join(result, join('else', maybeBlock(stmt.alternate, semicolon === '')));
                    }
                } else {
                    result.push(maybeBlock(stmt.consequent, semicolon === ''));
                }
                break;

            case Syntax.ForStatement:
                withIndent(function () {
                    result = ['for' + space + '('];
                    if (stmt.init) {
                        if (stmt.init.type === Syntax.VariableDeclaration) {
                            result.push(generateStatement(stmt.init, { allowIn: false }));
                        } else {
                            result.push(generateExpression(stmt.init, {
                                precedence: Precedence.Sequence,
                                allowIn: false,
                                allowCall: true
                            }));
                            result.push(';');
                        }
                    } else {
                        result.push(';');
                    }

                    if (stmt.test) {
                        result.push(space);
                        result.push(generateExpression(stmt.test, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        }));
                        result.push(';');
                    } else {
                        result.push(';');
                    }

                    if (stmt.update) {
                        result.push(space);
                        result.push(generateExpression(stmt.update, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        }));
                        result.push(')');
                    } else {
                        result.push(')');
                    }
                });

                result.push(maybeBlock(stmt.body, semicolon === ''));
                break;

            case Syntax.ForInStatement:
                result = generateIterationForStatement('in', stmt, semicolon === '');
                break;

            case Syntax.ForOfStatement:
                result = generateIterationForStatement('of', stmt, semicolon === '');
                break;

            case Syntax.LabeledStatement:
                result = [stmt.label.name + ':', maybeBlock(stmt.body, semicolon === '')];
                break;

            case Syntax.Program:
                len = stmt.body.length;
                result = [safeConcatenation && len > 0 ? '\n' : ''];
                for (i = 0; i < len; ++i) {
                    fragment = addIndent(generateStatement(stmt.body[i], {
                        semicolonOptional: !safeConcatenation && i === len - 1,
                        directiveContext: true
                    }));
                    result.push(fragment);
                    if (i + 1 < len && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
                break;

            case Syntax.FunctionDeclaration:
                isGenerator = stmt.generator && !extra.moz.starlessGenerator;
                result = [isGenerator ? 'function*' : 'function', isGenerator ? space : noEmptySpace(), generateIdentifier(stmt.id), generateFunctionBody(stmt)];
                break;

            case Syntax.ReturnStatement:
                if (stmt.argument) {
                    result = [join('return', generateExpression(stmt.argument, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    })), semicolon];
                } else {
                    result = ['return' + semicolon];
                }
                break;

            case Syntax.WhileStatement:
                withIndent(function () {
                    result = ['while' + space + '(', generateExpression(stmt.test, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }), ')'];
                });
                result.push(maybeBlock(stmt.body, semicolon === ''));
                break;

            case Syntax.WithStatement:
                withIndent(function () {
                    result = ['with' + space + '(', generateExpression(stmt.object, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }), ')'];
                });
                result.push(maybeBlock(stmt.body, semicolon === ''));
                break;

            default:
                throw new Error('Unknown statement type: ' + stmt.type);
        }

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' && fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    }

    function generate(node, options) {
        var defaultOptions = getDefaultOptions(),
            result,
            pair;

        if (options != null) {
            // Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            indent = options.format.indent.style;
            if (typeof options.base === 'string') {
                base = options.base;
            } else {
                base = stringRepeat(indent, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) {
            newline = space = indent = base = '';
        }
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        extra = options;

        if (sourceMap) {
            if (!exports.browser) {
                // We assume environment is node.js
                // And prevent from including source-map by browserify
                SourceNode = __webpack_require__(43).SourceNode;
            } else {
                SourceNode = global.sourceMap.SourceNode;
            }
        }

        switch (node.type) {
            case Syntax.BlockStatement:
            case Syntax.BreakStatement:
            case Syntax.CatchClause:
            case Syntax.ContinueStatement:
            case Syntax.DirectiveStatement:
            case Syntax.DoWhileStatement:
            case Syntax.DebuggerStatement:
            case Syntax.EmptyStatement:
            case Syntax.ExpressionStatement:
            case Syntax.ForStatement:
            case Syntax.ForInStatement:
            case Syntax.ForOfStatement:
            case Syntax.FunctionDeclaration:
            case Syntax.IfStatement:
            case Syntax.LabeledStatement:
            case Syntax.Program:
            case Syntax.ReturnStatement:
            case Syntax.SwitchStatement:
            case Syntax.SwitchCase:
            case Syntax.ThrowStatement:
            case Syntax.TryStatement:
            case Syntax.VariableDeclaration:
            case Syntax.VariableDeclarator:
            case Syntax.WhileStatement:
            case Syntax.WithStatement:
                result = generateStatement(node);
                break;

            case Syntax.AssignmentExpression:
            case Syntax.ArrayExpression:
            case Syntax.ArrayPattern:
            case Syntax.BinaryExpression:
            case Syntax.CallExpression:
            case Syntax.ConditionalExpression:
            case Syntax.FunctionExpression:
            case Syntax.Identifier:
            case Syntax.Literal:
            case Syntax.LogicalExpression:
            case Syntax.MemberExpression:
            case Syntax.NewExpression:
            case Syntax.ObjectExpression:
            case Syntax.ObjectPattern:
            case Syntax.Property:
            case Syntax.SequenceExpression:
            case Syntax.ThisExpression:
            case Syntax.UnaryExpression:
            case Syntax.UpdateExpression:
            case Syntax.YieldExpression:

                result = generateExpression(node, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                });
                break;

            default:
                throw new Error('Unknown node type: ' + node.type);
        }

        if (!sourceMap) {
            pair = { code: result.toString(), map: null };
            return options.sourceMapWithCode ? pair : pair.code;
        }

        pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
        });

        if (options.sourceContent) {
            pair.map.setSourceContent(options.sourceMap, options.sourceContent);
        }

        if (options.sourceMapWithCode) {
            return pair;
        }

        return pair.map.toString();
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    FORMAT_DEFAULTS = getDefaultOptions().format;

    exports.version = __webpack_require__(66).version;
    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
})();
/* vim: set sw=4 ts=4 et tw=80 : */
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code = __webpack_require__(17);

    function isStrictModeReservedWordES6(id) {
        switch (id) {
            case 'implements':
            case 'interface':
            case 'package':
            case 'private':
            case 'protected':
            case 'public':
            case 'static':
            case 'let':
                return true;
            default:
                return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
            case 2:
                return id === 'if' || id === 'in' || id === 'do';
            case 3:
                return id === 'var' || id === 'for' || id === 'new' || id === 'try';
            case 4:
                return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
            case 5:
                return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
            case 6:
                return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
            case 7:
                return id === 'default' || id === 'finally' || id === 'extends';
            case 8:
                return id === 'function' || id === 'continue' || id === 'debugger';
            case 10:
                return id === 'instanceof';
            default:
                return false;
        }
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierName(id) {
        var i, iz, ch;

        if (id.length === 0) {
            return false;
        }

        ch = id.charCodeAt(0);
        if (!code.isIdentifierStart(ch) || ch === 92) {
            // \ (backslash)
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPart(ch) || ch === 92) {
                // \ (backslash)
                return false;
            }
        }
        return true;
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierName: isIdentifierName
    };
})();
/* vim: set sw=4 ts=4 et tw=80 : */

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
  'use strict';

  exports.code = __webpack_require__(17);
  exports.keyword = __webpack_require__(41);
})();
/* vim: set sw=4 ts=4 et tw=80 : */

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(45).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(44).SourceMapConsumer;
exports.SourceNode = __webpack_require__(46).SourceNode;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
  var define = __webpack_require__(14)(module, !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
}
define(function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');

  /**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    sources = sources.map(util.normalize);

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }

  /**
   * Create a SourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns SourceMapConsumer
   */
  SourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
    var smc = Object.create(SourceMapConsumer.prototype);

    smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
    smc.file = aSourceMap._file;

    smc.__generatedMappings = aSourceMap._mappings.toArray().slice();
    smc.__originalMappings = aSourceMap._mappings.toArray().slice().sort(util.compareByOriginalPositions);

    return smc;
  };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
      }, this);
    }
  });

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    get: function () {
      if (!this.__generatedMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    get: function () {
      if (!this.__originalMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  SourceMapConsumer.prototype._nextCharIsMappingSeparator = function SourceMapConsumer_nextCharIsMappingSeparator(aStr) {
    var c = aStr.charAt(0);
    return c === ";" || c === ",";
  };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var str = aStr;
    var temp = {};
    var mapping;

    while (str.length > 0) {
      if (str.charAt(0) === ';') {
        generatedLine++;
        str = str.slice(1);
        previousGeneratedColumn = 0;
      } else if (str.charAt(0) === ',') {
        str = str.slice(1);
      } else {
        mapping = {};
        mapping.generatedLine = generatedLine;

        // Generated column.
        base64VLQ.decode(str, temp);
        mapping.generatedColumn = previousGeneratedColumn + temp.value;
        previousGeneratedColumn = mapping.generatedColumn;
        str = temp.rest;

        if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
          // Original source.
          base64VLQ.decode(str, temp);
          mapping.source = this._sources.at(previousSource + temp.value);
          previousSource += temp.value;
          str = temp.rest;
          if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
            throw new Error('Found a source, but no line and column');
          }

          // Original line.
          base64VLQ.decode(str, temp);
          mapping.originalLine = previousOriginalLine + temp.value;
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;
          str = temp.rest;
          if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
            throw new Error('Found a source and line, but no column');
          }

          // Original column.
          base64VLQ.decode(str, temp);
          mapping.originalColumn = previousOriginalColumn + temp.value;
          previousOriginalColumn = mapping.originalColumn;
          str = temp.rest;

          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
            // Original name.
            base64VLQ.decode(str, temp);
            mapping.name = this._names.at(previousName + temp.value);
            previousName += temp.value;
            str = temp.rest;
          }
        }

        this.__generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          this.__originalMappings.push(mapping);
        }
      }
    }

    this.__generatedMappings.sort(util.compareByGeneratedPositions);
    this.__originalMappings.sort(util.compareByOriginalPositions);
  };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  SourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator);
  };

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
  SourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  SourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositions);

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source != null && this.sourceRoot != null) {
          source = util.join(this.sourceRoot, source);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: util.getArg(mapping, 'name', null)
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
  SourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource) {
    if (!this.sourcesContent) {
      return null;
    }

    if (this.sourceRoot != null) {
      aSource = util.relative(this.sourceRoot, aSource);
    }

    if (this._sources.has(aSource)) {
      return this.sourcesContent[this._sources.indexOf(aSource)];
    }

    var url;
    if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
      if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
      }

      if ((!url.path || url.path == "/") && this._sources.has("/" + aSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
      }
    }

    throw new Error('"' + aSource + '" is not in the SourceMap.');
  };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }

    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions);

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      return {
        line: util.getArg(mapping, 'generatedLine', null),
        column: util.getArg(mapping, 'generatedColumn', null),
        lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
      };
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

  /**
   * Returns all generated line and column information for the original source
   * and line provided. The only argument is an object with the following
   * properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    // When there is no exact match, SourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to Infinity, we thus find the last
    // mapping for the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: Infinity
    };

    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }

    var mappings = [];

    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      while (mapping && mapping.originalLine === needle.originalLine) {
        mappings.push({
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        });

        mapping = this._originalMappings[--index];
      }
    }

    return mappings.reverse();
  };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source;
      if (source != null && sourceRoot != null) {
        source = util.join(sourceRoot, source);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name
      };
    }).forEach(aCallback, context);
  };

  exports.SourceMapConsumer = SourceMapConsumer;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
  var define = __webpack_require__(14)(module, !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
}
define(function (require, exports, module) {

  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;
  var MappingList = require('./mapping-list').MappingList;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = new MappingList();
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null && !this._sources.has(source)) {
      this._sources.add(source);
    }

    if (name != null && !this._names.has(name)) {
      this._names.add(name);
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = {};
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }
    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    } else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
      // Cases 2 and 3.
      return;
    } else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var mapping;

    var mappings = this._mappings.toArray();

    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          result += ';';
          previousGeneratedLine++;
        }
      } else {
        if (i > 0) {
          if (!util.compareByGeneratedPositions(mapping, mappings[i - 1])) {
            continue;
          }
          result += ',';
        }
      }

      result += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        result += base64VLQ.encode(this._sources.indexOf(mapping.source) - previousSource);
        previousSource = this._sources.indexOf(mapping.source);

        // lines are stored 0-based in SourceMap spec version 3
        result += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        result += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          result += base64VLQ.encode(this._names.indexOf(mapping.name) - previousName);
          previousName = this._names.indexOf(mapping.name);
        }
      }
    }

    return result;
  };

  SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }, this);
  };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
    return JSON.stringify(this);
  };

  exports.SourceMapGenerator = SourceMapGenerator;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
  var define = __webpack_require__(14)(module, !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
}
define(function (require, exports, module) {

  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
  var util = require('./util');

  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
  var REGEX_NEWLINE = /(\r?\n)/;

  // Newline character code for charCodeAt() comparisons
  var NEWLINE_CODE = 10;

  // Private symbol for identifying `SourceNode`s when multiple versions of
  // the source-map library are loaded. This MUST NOT CHANGE across
  // versions!
  var isSourceNode = "$$$isSourceNode$$$";

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
  SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are removed from this array, by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var shiftNextLine = function () {
      var lineContents = remainingLines.shift();
      // The last line of a file might not have a newline.
      var newLine = remainingLines.shift() || "";
      return lineContents + newLine;
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1,
        lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          var code = "";
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[0];
          var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
          remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[0];
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[0] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLines.length > 0) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
      }
    }
  };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    } else {
      throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length - 1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    } else {
      throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      } else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
            line: this.line,
            column: this.column,
            name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len - 1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    } else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    } else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null && original.line !== null && original.column !== null) {
        if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length; idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*jslint vars:false, bitwise:true*/
/*jshint indent:4*/
/*global exports:true, define:true*/
(function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // and plain browser loading,

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory(root.estraverse = {});
    }
})(this, function (exports) {
    'use strict';

    var Syntax, isArray, VisitorOption, VisitorKeys, BREAK, SKIP;

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MethodDefinition: 'MethodDefinition',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    function ignoreJSHintError() {}

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function deepCopy(obj) {
        var ret = {},
            key,
            val;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object' && val !== null) {
                    ret[key] = deepCopy(val);
                } else {
                    ret[key] = val;
                }
            }
        }
        return ret;
    }

    function shallowCopy(obj) {
        var ret = {},
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    ignoreJSHintError(shallowCopy);

    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License

    function upperBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                len = diff;
            } else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }

    function lowerBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                i = current + 1;
                len -= diff + 1;
            } else {
                len = diff;
            }
        }
        return i;
    }
    ignoreJSHintError(lowerBound);

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'defaults', 'rest', 'body'],
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'body', 'superClass'],
        ClassExpression: ['id', 'body', 'superClass'],
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'defaults', 'rest', 'body'],
        FunctionExpression: ['id', 'params', 'defaults', 'rest', 'body'],
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        MethodDefinition: ['key', 'value'],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handlers', 'handler', 'guardedHandlers', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    // unique id
    BREAK = {};
    SKIP = {};

    VisitorOption = {
        Break: BREAK,
        Skip: SKIP
    };

    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }

    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };

    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }

    function Controller() {}

    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;

        function addToPath(result, path) {
            if (isArray(path)) {
                for (j = 0, jz = path.length; j < jz; ++j) {
                    result.push(path[j]);
                }
            } else {
                result.push(path);
            }
        }

        // root node
        if (!this.__current.path) {
            return null;
        }

        // first node is sentinel, second node is root element
        result = [];
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };

    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;

        // first node is sentinel
        result = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
        }

        return result;
    };

    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };

    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;

        result = undefined;

        previous = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        }
        this.__current = previous;

        return result;
    };

    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };

    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function () {
        this.notify(SKIP);
    };

    // API:
    // break traversals
    Controller.prototype['break'] = function () {
        this.notify(BREAK);
    };

    Controller.prototype.__initialize = function (root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
    };

    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                ret = this.__execute(visitor.leave, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {

                ret = this.__execute(visitor.enter, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (this.__state === SKIP || ret === SKIP) {
                    continue;
                }

                node = element.node;
                nodeType = element.wrap || node.type;
                candidates = VisitorKeys[nodeType];

                current = candidates.length;
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (!isArray(candidate)) {
                        worklist.push(new Element(candidate, key, null, null));
                        continue;
                    }

                    current2 = candidate.length;
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue;
                        }
                        if ((nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === candidates[current]) {
                            element = new Element(candidate[current2], [key, current2], 'Property', null);
                        } else {
                            element = new Element(candidate[current2], [key, current2], null, null);
                        }
                        worklist.push(element);
                    }
                }
            }
        }
    };

    Controller.prototype.replace = function replace(root, visitor) {
        var worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                target = this.__execute(visitor.leave, element);

                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP) {
                    // replace
                    element.ref.replace(target);
                }

                if (this.__state === BREAK || target === BREAK) {
                    return outer.root;
                }
                continue;
            }

            target = this.__execute(visitor.enter, element);

            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }

            if (this.__state === BREAK || target === BREAK) {
                return outer.root;
            }

            // node may be null
            node = element.node;
            if (!node) {
                continue;
            }

            worklist.push(sentinel);
            leavelist.push(element);

            if (this.__state === SKIP || target === SKIP) {
                continue;
            }

            nodeType = element.wrap || node.type;
            candidates = VisitorKeys[nodeType];

            current = candidates.length;
            while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                    continue;
                }

                if (!isArray(candidate)) {
                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                    continue;
                }

                current2 = candidate.length;
                while ((current2 -= 1) >= 0) {
                    if (!candidate[current2]) {
                        continue;
                    }
                    if (nodeType === Syntax.ObjectExpression && 'properties' === candidates[current]) {
                        element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
                    } else {
                        element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
                    }
                    worklist.push(element);
                }
            }
        }

        return outer.root;
    };

    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }

    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }

    function extendCommentRange(comment, tokens) {
        var target;

        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });

        comment.extendedRange = [comment.range[0], comment.range[1]];

        if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
        }

        target -= 1;
        if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
        }

        return comment;
    }

    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [],
            comment,
            len,
            i,
            cursor;

        if (!tree.range) {
            throw new Error('attachComments needs range information');
        }

        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for (i = 0, len = providedComments.length; i < len; i += 1) {
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [0, tree.range[0]];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }

        for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        }

        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) {
                        break;
                    }

                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) {
                            node.leadingComments = [];
                        }
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        cursor = 0;
        traverse(tree, {
            leave: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) {
                        break;
                    }

                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) {
                            node.trailingComments = [];
                        }
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        return tree;
    }

    exports.version = '1.5.1-dev';
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
});
/* vim: set sw=4 ts=4 et tw=80 : */

/***/ }),
/* 48 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Basic Lexer implemented using JavaScript regular expressions
// MIT Licensed



var lexParser = __webpack_require__(20);
var version = __webpack_require__(67).version;

// expand macros and convert matchers to RegExp's
function prepareRules(rules, macros, actions, tokens, startConditions, caseless) {
    var m,
        i,
        k,
        action,
        conditions,
        newRules = [];

    if (macros) {
        macros = prepareMacros(macros);
    }

    function tokenNumberReplacement(str, token) {
        return "return " + (tokens[token] || "'" + token + "'");
    }

    actions.push('switch($avoiding_name_collisions) {');

    for (i = 0; i < rules.length; i++) {
        if (Object.prototype.toString.apply(rules[i][0]) !== '[object Array]') {
            // implicit add to all inclusive start conditions
            for (k in startConditions) {
                if (startConditions[k].inclusive) {
                    startConditions[k].rules.push(i);
                }
            }
        } else if (rules[i][0][0] === '*') {
            // Add to ALL start conditions
            for (k in startConditions) {
                startConditions[k].rules.push(i);
            }
            rules[i].shift();
        } else {
            // Add to explicit start conditions
            conditions = rules[i].shift();
            for (k = 0; k < conditions.length; k++) {
                startConditions[conditions[k]].rules.push(i);
            }
        }

        m = rules[i][0];
        if (typeof m === 'string') {
            for (k in macros) {
                if (macros.hasOwnProperty(k)) {
                    m = m.split("{" + k + "}").join('(' + macros[k] + ')');
                }
            }
            m = new RegExp("^(?:" + m + ")", caseless ? 'i' : '');
        }
        newRules.push(m);
        if (typeof rules[i][1] === 'function') {
            rules[i][1] = String(rules[i][1]).replace(/^\s*function \(\)\s?\{/, '').replace(/\}\s*$/, '');
        }
        action = rules[i][1];
        if (tokens && action.match(/return '[^']+'/)) {
            action = action.replace(/return '([^']+)'/g, tokenNumberReplacement);
        }
        actions.push('case ' + i + ':' + action + '\nbreak;');
    }
    actions.push("}");

    return newRules;
}

// expand macros within macros
function prepareMacros(macros) {
    var cont = true,
        m,
        i,
        k,
        mnew;
    while (cont) {
        cont = false;
        for (i in macros) if (macros.hasOwnProperty(i)) {
            m = macros[i];
            for (k in macros) if (macros.hasOwnProperty(k) && i !== k) {
                mnew = m.split("{" + k + "}").join('(' + macros[k] + ')');
                if (mnew !== m) {
                    cont = true;
                    macros[i] = mnew;
                }
            }
        }
    }
    return macros;
}

function prepareStartConditions(conditions) {
    var sc,
        hash = {};
    for (sc in conditions) if (conditions.hasOwnProperty(sc)) {
        hash[sc] = { rules: [], inclusive: !!!conditions[sc] };
    }
    return hash;
}

function buildActions(dict, tokens) {
    var actions = [dict.actionInclude || '', "var YYSTATE=YY_START;"];
    var tok;
    var toks = {};

    for (tok in tokens) {
        toks[tokens[tok]] = tok;
    }

    if (dict.options && dict.options.flex) {
        dict.rules.push([".", "console.log(yytext);"]);
    }

    this.rules = prepareRules(dict.rules, dict.macros, actions, tokens && toks, this.conditions, this.options["case-insensitive"]);
    var fun = actions.join("\n");
    "yytext yyleng yylineno yylloc".split(' ').forEach(function (yy) {
        fun = fun.replace(new RegExp("\\b(" + yy + ")\\b", "g"), "yy_.$1");
    });

    return "function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {" + fun + "\n}";
}

function RegExpLexer(dict, input, tokens) {
    var opts = processGrammar(dict, tokens);
    var source = generateModuleBody(opts);
    var lexer = eval(source);

    lexer.yy = {};
    if (input) {
        lexer.setInput(input);
    }

    lexer.generate = function () {
        return generateFromOpts(opts);
    };
    lexer.generateModule = function () {
        return generateModule(opts);
    };
    lexer.generateCommonJSModule = function () {
        return generateCommonJSModule(opts);
    };
    lexer.generateAMDModule = function () {
        return generateAMDModule(opts);
    };

    return lexer;
}

RegExpLexer.prototype = {
    EOF: 1,
    parseError: function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

    // resets the lexer, sets new input
    setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
    },

    // consumes and returns one char from the input
    input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

    // unshifts one char (or a string) into the input
    unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

    // When called from action, caches matched text and appends it on next action
    more: function () {
        this._more = true;
        return this;
    },

    // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
    reject: function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
        return this;
    },

    // retain first n characters of the match
    less: function (n) {
        this.unput(this.match.slice(n));
    },

    // displays already matched input, i.e. for error messages
    pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
    },

    // displays upcoming input, i.e. for error messages
    upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

    // displays the character position where the lexing error occurred, i.e. for error messages
    showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

    // test the lexed token: return FALSE when not a match, otherwise return token
    test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

    // return next match in input
    next: function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

    // return next match that has a token
    lex: function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

    // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
    begin: function begin(condition) {
        this.conditionStack.push(condition);
    },

    // pop the previously active lexer condition state off the condition stack
    popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

    // produce the lexer rule set which is active for the currently active lexer condition state
    _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

    // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
    topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

    // alias for begin(condition)
    pushState: function pushState(condition) {
        this.begin(condition);
    },

    // return the number of states pushed
    stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
    }
};

// generate lexer source from a grammar
function generate(dict, tokens) {
    var opt = processGrammar(dict, tokens);

    return generateFromOpts(opt);
}

// process the grammar and build final data structures and functions
function processGrammar(dict, tokens) {
    var opts = {};
    if (typeof dict === 'string') {
        dict = lexParser.parse(dict);
    }
    dict = dict || {};

    opts.options = dict.options || {};
    opts.moduleType = opts.options.moduleType;
    opts.moduleName = opts.options.moduleName;

    opts.conditions = prepareStartConditions(dict.startConditions);
    opts.conditions.INITIAL = { rules: [], inclusive: true };

    opts.performAction = buildActions.call(opts, dict, tokens);
    opts.conditionStack = ['INITIAL'];

    opts.moduleInclude = (dict.moduleInclude || '').trim();
    return opts;
}

// Assemble the final source from the processed grammar
function generateFromOpts(opt) {
    var code = "";

    if (opt.moduleType === 'commonjs') {
        code = generateCommonJSModule(opt);
    } else if (opt.moduleType === 'amd') {
        code = generateAMDModule(opt);
    } else {
        code = generateModule(opt);
    }

    return code;
}

function generateModuleBody(opt) {
    var functionDescriptions = {
        setInput: "resets the lexer, sets new input",
        input: "consumes and returns one char from the input",
        unput: "unshifts one char (or a string) into the input",
        more: "When called from action, caches matched text and appends it on next action",
        reject: "When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.",
        less: "retain first n characters of the match",
        pastInput: "displays already matched input, i.e. for error messages",
        upcomingInput: "displays upcoming input, i.e. for error messages",
        showPosition: "displays the character position where the lexing error occurred, i.e. for error messages",
        test_match: "test the lexed token: return FALSE when not a match, otherwise return token",
        next: "return next match in input",
        lex: "return next match that has a token",
        begin: "activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)",
        popState: "pop the previously active lexer condition state off the condition stack",
        _currentRules: "produce the lexer rule set which is active for the currently active lexer condition state",
        topState: "return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available",
        pushState: "alias for begin(condition)",
        stateStackSize: "return the number of states currently on the stack"
    };
    var out = "({\n";
    var p = [];
    var descr;
    for (var k in RegExpLexer.prototype) {
        if (RegExpLexer.prototype.hasOwnProperty(k) && k.indexOf("generate") === -1) {
            // copy the function description as a comment before the implementation; supports multi-line descriptions
            descr = "\n";
            if (functionDescriptions[k]) {
                descr += "// " + functionDescriptions[k].replace(/\n/g, "\n\/\/ ") + "\n";
            }
            p.push(descr + k + ":" + (RegExpLexer.prototype[k].toString() || '""'));
        }
    }
    out += p.join(",\n");

    if (opt.options) {
        out += ",\noptions: " + JSON.stringify(opt.options);
    }

    out += ",\nperformAction: " + String(opt.performAction);
    out += ",\nrules: [" + opt.rules + "]";
    out += ",\nconditions: " + JSON.stringify(opt.conditions);
    out += "\n})";

    return out;
}

function generateModule(opt) {
    opt = opt || {};

    var out = "/* generated by jison-lex " + version + " */";
    var moduleName = opt.moduleName || "lexer";

    out += "\nvar " + moduleName + " = (function(){\nvar lexer = " + generateModuleBody(opt);

    if (opt.moduleInclude) {
        out += ";\n" + opt.moduleInclude;
    }

    out += ";\nreturn lexer;\n})();";

    return out;
}

function generateAMDModule(opt) {
    var out = "/* generated by jison-lex " + version + " */";

    out += "define([], function(){\nvar lexer = " + generateModuleBody(opt);

    if (opt.moduleInclude) {
        out += ";\n" + opt.moduleInclude;
    }

    out += ";\nreturn lexer;" + "\n});";

    return out;
}

function generateCommonJSModule(opt) {
    opt = opt || {};

    var out = "";
    var moduleName = opt.moduleName || "lexer";

    out += generateModule(opt);
    out += "\nexports.lexer = " + moduleName;
    out += ";\nexports.lex = function () { return " + moduleName + ".lex.apply(lexer, arguments); };";
    return out;
}

RegExpLexer.generate = generate;

module.exports = RegExpLexer;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// Set class to wrap arrays

var typal = __webpack_require__(19).typal;

var setMixin = {
    constructor: function Set_constructor(set, raw) {
        this._items = [];
        if (set && set.constructor === Array) this._items = raw ? set : set.slice(0);else if (arguments.length) this._items = [].slice.call(arguments, 0);
    },
    concat: function concat(setB) {
        this._items.push.apply(this._items, setB._items || setB);
        return this;
    },
    eq: function eq(set) {
        return this._items.length === set._items.length && this.subset(set);
    },
    indexOf: function indexOf(item) {
        if (item && item.eq) {
            for (var k = 0; k < this._items.length; k++) if (item.eq(this._items[k])) return k;
            return -1;
        }
        return this._items.indexOf(item);
    },
    union: function union(set) {
        return new Set(this._items).concat(this.complement(set));
    },
    intersection: function intersection(set) {
        return this.filter(function (elm) {
            return set.contains(elm);
        });
    },
    complement: function complement(set) {
        var that = this;
        return set.filter(function sub_complement(elm) {
            return !that.contains(elm);
        });
    },
    subset: function subset(set) {
        var cont = true;
        for (var i = 0; i < this._items.length && cont; i++) {
            cont = cont && set.contains(this._items[i]);
        }
        return cont;
    },
    superset: function superset(set) {
        return set.subset(this);
    },
    joinSet: function joinSet(set) {
        return this.concat(this.complement(set));
    },
    contains: function contains(item) {
        return this.indexOf(item) !== -1;
    },
    item: function item(v, val) {
        return this._items[v];
    },
    i: function i(v, val) {
        return this._items[v];
    },
    first: function first() {
        return this._items[0];
    },
    last: function last() {
        return this._items[this._items.length - 1];
    },
    size: function size() {
        return this._items.length;
    },
    isEmpty: function isEmpty() {
        return this._items.length === 0;
    },
    copy: function copy() {
        return new Set(this._items);
    },
    toString: function toString() {
        return this._items.toString();
    }
};

"push shift unshift forEach some every join sort".split(' ').forEach(function (e, i) {
    setMixin[e] = function () {
        return Array.prototype[e].apply(this._items, arguments);
    };
    setMixin[e].name = e;
});
"filter slice map".split(' ').forEach(function (e, i) {
    setMixin[e] = function () {
        return new Set(Array.prototype[e].apply(this._items, arguments), true);
    };
    setMixin[e].name = e;
});

var Set = typal.construct(setMixin).mix({
    union: function (a, b) {
        var ar = {};
        for (var k = a.length - 1; k >= 0; --k) {
            ar[a[k]] = true;
        }
        for (var i = b.length - 1; i >= 0; --i) {
            if (!ar[b[i]]) {
                a.push(b[i]);
            }
        }
        return a;
    }
});

if (true) exports.Set = Set;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
  Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint bitwise:true plusplus:true */
/*global esprima:true, define:true, exports:true, window: true,
createLocationMarker: true,
throwError: true, generateStatement: true, peek: true,
parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseFunctionSourceElements: true, parseVariableIdentifier: true,
parseLeftHandSideExpression: true,
parseUnaryExpression: true,
parseStatement: true, parseSourceElement: true */

(function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory(root.esprima = {});
    }
})(this, function (exports) {
    'use strict';

    var Token, TokenName, FnExprTokens, Syntax, PropertyKind, Messages, Regex, SyntaxTreeDelegate, source, strict, index, lineNumber, lineStart, length, delegate, lookahead, state, extra;

    Token = {
        BooleanLiteral: 1,
        EOF: 2,
        Identifier: 3,
        Keyword: 4,
        NullLiteral: 5,
        NumericLiteral: 6,
        Punctuator: 7,
        StringLiteral: 8,
        RegularExpression: 9
    };

    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';
    TokenName[Token.RegularExpression] = 'RegularExpression';

    // A function following one of those tokens is an expression.
    FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new', 'return', 'case', 'delete', 'throw', 'void',
    // assignment operators
    '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', ',',
    // binary/unary operators
    '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=', '<=', '<', '>', '!=', '!=='];

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };

    PropertyKind = {
        Data: 1,
        Get: 2,
        Set: 4
    };

    // Error messages should be identical to V8.
    Messages = {
        UnexpectedToken: 'Unexpected token %0',
        UnexpectedNumber: 'Unexpected number',
        UnexpectedString: 'Unexpected string',
        UnexpectedIdentifier: 'Unexpected identifier',
        UnexpectedReserved: 'Unexpected reserved word',
        UnexpectedEOS: 'Unexpected end of input',
        NewlineAfterThrow: 'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp: 'Invalid regular expression: missing /',
        InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
        InvalidLHSInForIn: 'Invalid left-hand side in for-in',
        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
        NoCatchOrFinally: 'Missing catch or finally after try',
        UnknownLabel: 'Undefined label \'%0\'',
        Redeclaration: '%0 \'%1\' has already been declared',
        IllegalContinue: 'Illegal continue statement',
        IllegalBreak: 'Illegal break statement',
        IllegalReturn: 'Illegal return statement',
        StrictModeWith: 'Strict mode code may not include a with statement',
        StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
        StrictVarName: 'Variable name may not be eval or arguments in strict mode',
        StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
        StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
        StrictDelete: 'Delete of an unqualified identifier in strict mode.',
        StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
        AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
        AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
        StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictReservedWord: 'Use of future reserved word in strict mode'
    };

    // See also tools/generate-unicode-regex.py.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };

    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.

    function assert(condition, message) {
        if (!condition) {
            throw new Error('ASSERT: ' + message);
        }
    }

    function isDecimalDigit(ch) {
        return ch >= 48 && ch <= 57; // 0..9
    }

    function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
        return '01234567'.indexOf(ch) >= 0;
    }

    // 7.2 White Space

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return ch === 0x24 || ch === 0x5F || // $ (dollar) and _ (underscore)
        ch >= 0x41 && ch <= 0x5A || // A..Z
        ch >= 0x61 && ch <= 0x7A || // a..z
        ch === 0x5C || // \ (backslash)
        ch >= 0x80 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
    }

    function isIdentifierPart(ch) {
        return ch === 0x24 || ch === 0x5F || // $ (dollar) and _ (underscore)
        ch >= 0x41 && ch <= 0x5A || // A..Z
        ch >= 0x61 && ch <= 0x7A || // a..z
        ch >= 0x30 && ch <= 0x39 || // 0..9
        ch === 0x5C || // \ (backslash)
        ch >= 0x80 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
    }

    // 7.6.1.2 Future Reserved Words

    function isFutureReservedWord(id) {
        switch (id) {
            case 'class':
            case 'enum':
            case 'export':
            case 'extends':
            case 'import':
            case 'super':
                return true;
            default:
                return false;
        }
    }

    function isStrictModeReservedWord(id) {
        switch (id) {
            case 'implements':
            case 'interface':
            case 'package':
            case 'private':
            case 'protected':
            case 'public':
            case 'static':
            case 'yield':
            case 'let':
                return true;
            default:
                return false;
        }
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    // 7.6.1.1 Keywords

    function isKeyword(id) {
        if (strict && isStrictModeReservedWord(id)) {
            return true;
        }

        // 'const' is specialized as Keyword in V8.
        // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
        // Some others are from future reserved words.

        switch (id.length) {
            case 2:
                return id === 'if' || id === 'in' || id === 'do';
            case 3:
                return id === 'var' || id === 'for' || id === 'new' || id === 'try' || id === 'let';
            case 4:
                return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
            case 5:
                return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
            case 6:
                return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
            case 7:
                return id === 'default' || id === 'finally' || id === 'extends';
            case 8:
                return id === 'function' || id === 'continue' || id === 'debugger';
            case 10:
                return id === 'instanceof';
            default:
                return false;
        }
    }

    // 7.4 Comments

    function addComment(type, value, start, end, loc) {
        var comment, attacher;

        assert(typeof start === 'number', 'Comment must have valid position');

        // Because the way the actual token is scanned, often the comments
        // (if any) are skipped twice during the lexical analysis.
        // Thus, we need to skip adding a comment if the comment array already
        // handled it.
        if (state.lastCommentStart >= start) {
            return;
        }
        state.lastCommentStart = start;

        comment = {
            type: type,
            value: value
        };
        if (extra.range) {
            comment.range = [start, end];
        }
        if (extra.loc) {
            comment.loc = loc;
        }
        extra.comments.push(comment);

        if (extra.attachComment) {
            attacher = {
                comment: comment,
                leading: null,
                trailing: null,
                range: [start, end]
            };
            extra.pendingComments.push(attacher);
        }
    }

    function skipSingleLineComment(offset) {
        var start, loc, ch, comment;

        start = index - offset;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart - offset
            }
        };

        while (index < length) {
            ch = source.charCodeAt(index);
            ++index;
            if (isLineTerminator(ch)) {
                if (extra.comments) {
                    comment = source.slice(start + offset, index - 1);
                    loc.end = {
                        line: lineNumber,
                        column: index - lineStart - 1
                    };
                    addComment('Line', comment, start, index - 1, loc);
                }
                if (ch === 13 && source.charCodeAt(index) === 10) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
                return;
            }
        }

        if (extra.comments) {
            comment = source.slice(start + offset, index);
            loc.end = {
                line: lineNumber,
                column: index - lineStart
            };
            addComment('Line', comment, start, index, loc);
        }
    }

    function skipMultiLineComment() {
        var start, loc, ch, comment;

        if (extra.comments) {
            start = index - 2;
            loc = {
                start: {
                    line: lineNumber,
                    column: index - lineStart - 2
                }
            };
        }

        while (index < length) {
            ch = source.charCodeAt(index);
            if (isLineTerminator(ch)) {
                if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
                    ++index;
                }
                ++lineNumber;
                ++index;
                lineStart = index;
                if (index >= length) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            } else if (ch === 0x2A) {
                // Block comment ends with '*/'.
                if (source.charCodeAt(index + 1) === 0x2F) {
                    ++index;
                    ++index;
                    if (extra.comments) {
                        comment = source.slice(start + 2, index - 2);
                        loc.end = {
                            line: lineNumber,
                            column: index - lineStart
                        };
                        addComment('Block', comment, start, index, loc);
                    }
                    return;
                }
                ++index;
            } else {
                ++index;
            }
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    function skipComment() {
        var ch, start;

        start = index === 0;
        while (index < length) {
            ch = source.charCodeAt(index);

            if (isWhiteSpace(ch)) {
                ++index;
            } else if (isLineTerminator(ch)) {
                ++index;
                if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
                start = true;
            } else if (ch === 0x2F) {
                // U+002F is '/'
                ch = source.charCodeAt(index + 1);
                if (ch === 0x2F) {
                    ++index;
                    ++index;
                    skipSingleLineComment(2);
                    start = true;
                } else if (ch === 0x2A) {
                    // U+002A is '*'
                    ++index;
                    ++index;
                    skipMultiLineComment();
                } else {
                    break;
                }
            } else if (start && ch === 0x2D) {
                // U+002D is '-'
                // U+003E is '>'
                if (source.charCodeAt(index + 1) === 0x2D && source.charCodeAt(index + 2) === 0x3E) {
                    // '-->' is a single-line comment
                    index += 3;
                    skipSingleLineComment(3);
                } else {
                    break;
                }
            } else if (ch === 0x3C) {
                // U+003C is '<'
                if (source.slice(index + 1, index + 4) === '!--') {
                    ++index; // `<`
                    ++index; // `!`
                    ++index; // `-`
                    ++index; // `-`
                    skipSingleLineComment(4);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    function scanHexEscape(prefix) {
        var i,
            len,
            ch,
            code = 0;

        len = prefix === 'u' ? 4 : 2;
        for (i = 0; i < len; ++i) {
            if (index < length && isHexDigit(source[index])) {
                ch = source[index++];
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    function getEscapedIdentifier() {
        var ch, id;

        ch = source.charCodeAt(index++);
        id = String.fromCharCode(ch);

        // '\u' (U+005C, U+0075) denotes an escaped character.
        if (ch === 0x5C) {
            if (source.charCodeAt(index) !== 0x75) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            ++index;
            ch = scanHexEscape('u');
            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            id = ch;
        }

        while (index < length) {
            ch = source.charCodeAt(index);
            if (!isIdentifierPart(ch)) {
                break;
            }
            ++index;
            id += String.fromCharCode(ch);

            // '\u' (U+005C, U+0075) denotes an escaped character.
            if (ch === 0x5C) {
                id = id.substr(0, id.length - 1);
                if (source.charCodeAt(index) !== 0x75) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                ++index;
                ch = scanHexEscape('u');
                if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                id += ch;
            }
        }

        return id;
    }

    function getIdentifier() {
        var start, ch;

        start = index++;
        while (index < length) {
            ch = source.charCodeAt(index);
            if (ch === 0x5C) {
                // Blackslash (U+005C) marks Unicode escape sequence.
                index = start;
                return getEscapedIdentifier();
            }
            if (isIdentifierPart(ch)) {
                ++index;
            } else {
                break;
            }
        }

        return source.slice(start, index);
    }

    function scanIdentifier() {
        var start, id, type;

        start = index;

        // Backslash (U+005C) starts an escaped character.
        id = source.charCodeAt(index) === 0x5C ? getEscapedIdentifier() : getIdentifier();

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            type = Token.Identifier;
        } else if (isKeyword(id)) {
            type = Token.Keyword;
        } else if (id === 'null') {
            type = Token.NullLiteral;
        } else if (id === 'true' || id === 'false') {
            type = Token.BooleanLiteral;
        } else {
            type = Token.Identifier;
        }

        return {
            type: type,
            value: id,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // 7.7 Punctuators

    function scanPunctuator() {
        var start = index,
            code = source.charCodeAt(index),
            code2,
            ch1 = source[index],
            ch2,
            ch3,
            ch4;

        switch (code) {

            // Check for most common single-character punctuators.
            case 0x2E: // . dot
            case 0x28: // ( open bracket
            case 0x29: // ) close bracket
            case 0x3B: // ; semicolon
            case 0x2C: // , comma
            case 0x7B: // { open curly brace
            case 0x7D: // } close curly brace
            case 0x5B: // [
            case 0x5D: // ]
            case 0x3A: // :
            case 0x3F: // ?
            case 0x7E:
                // ~
                ++index;
                if (extra.tokenize) {
                    if (code === 0x28) {
                        extra.openParenToken = extra.tokens.length;
                    } else if (code === 0x7B) {
                        extra.openCurlyToken = extra.tokens.length;
                    }
                }
                return {
                    type: Token.Punctuator,
                    value: String.fromCharCode(code),
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };

            default:
                code2 = source.charCodeAt(index + 1);

                // '=' (U+003D) marks an assignment or comparison operator.
                if (code2 === 0x3D) {
                    switch (code) {
                        case 0x25: // %
                        case 0x26: // &
                        case 0x2A: // *:
                        case 0x2B: // +
                        case 0x2D: // -
                        case 0x2F: // /
                        case 0x3C: // <
                        case 0x3E: // >
                        case 0x5E: // ^
                        case 0x7C:
                            // |
                            index += 2;
                            return {
                                type: Token.Punctuator,
                                value: String.fromCharCode(code) + String.fromCharCode(code2),
                                lineNumber: lineNumber,
                                lineStart: lineStart,
                                range: [start, index]
                            };

                        case 0x21: // !
                        case 0x3D:
                            // =
                            index += 2;

                            // !== and ===
                            if (source.charCodeAt(index) === 0x3D) {
                                ++index;
                            }
                            return {
                                type: Token.Punctuator,
                                value: source.slice(start, index),
                                lineNumber: lineNumber,
                                lineStart: lineStart,
                                range: [start, index]
                            };
                        default:
                            break;
                    }
                }
                break;
        }

        // Peek more characters.

        ch2 = source[index + 1];
        ch3 = source[index + 2];
        ch4 = source[index + 3];

        // 4-character punctuator: >>>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            if (ch4 === '=') {
                index += 4;
                return {
                    type: Token.Punctuator,
                    value: '>>>=',
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };
            }
        }

        // 3-character punctuators: === !== >>> <<= >>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '>>>',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '<<=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '>>=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // Other 2-character punctuators: ++ -- << >> && ||

        if (ch1 === ch2 && '+-<>&|'.indexOf(ch1) >= 0) {
            index += 2;
            return {
                type: Token.Punctuator,
                value: ch1 + ch2,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
            ++index;
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    // 7.8.3 Numeric Literals

    function scanHexLiteral(start) {
        var number = '';

        while (index < length) {
            if (!isHexDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (number.length === 0) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt('0x' + number, 16),
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanOctalLiteral(start) {
        var number = '0' + source[index++];
        while (index < length) {
            if (!isOctalDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt(number, 8),
            octal: true,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanNumericLiteral() {
        var number, start, ch;

        ch = source[index];
        assert(isDecimalDigit(ch.charCodeAt(0)) || ch === '.', 'Numeric literal must start with a decimal digit or a decimal point');

        start = index;
        number = '';
        if (ch !== '.') {
            number = source[index++];
            ch = source[index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    ++index;
                    return scanHexLiteral(start);
                }
                if (isOctalDigit(ch)) {
                    return scanOctalLiteral(start);
                }

                // decimal number starts with '0' such as '09' is illegal.
                if (ch && isDecimalDigit(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            }

            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === '.') {
            number += source[index++];
            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === 'e' || ch === 'E') {
            number += source[index++];

            ch = source[index];
            if (ch === '+' || ch === '-') {
                number += source[index++];
            }
            if (isDecimalDigit(source.charCodeAt(index))) {
                while (isDecimalDigit(source.charCodeAt(index))) {
                    number += source[index++];
                }
            } else {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // 7.8.4 String Literals

    function scanStringLiteral() {
        var str = '',
            quote,
            start,
            ch,
            code,
            unescaped,
            restore,
            octal = false;

        quote = source[index];
        assert(quote === '\'' || quote === '"', 'String literal must starts with a quote');

        start = index;
        ++index;

        while (index < length) {
            ch = source[index++];

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = source[index++];
                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                        case 'n':
                            str += '\n';
                            break;
                        case 'r':
                            str += '\r';
                            break;
                        case 't':
                            str += '\t';
                            break;
                        case 'u':
                        case 'x':
                            restore = index;
                            unescaped = scanHexEscape(ch);
                            if (unescaped) {
                                str += unescaped;
                            } else {
                                index = restore;
                                str += ch;
                            }
                            break;
                        case 'b':
                            str += '\b';
                            break;
                        case 'f':
                            str += '\f';
                            break;
                        case 'v':
                            str += '\x0B';
                            break;

                        default:
                            if (isOctalDigit(ch)) {
                                code = '01234567'.indexOf(ch);

                                // \0 is not octal escape sequence
                                if (code !== 0) {
                                    octal = true;
                                }

                                if (index < length && isOctalDigit(source[index])) {
                                    octal = true;
                                    code = code * 8 + '01234567'.indexOf(source[index++]);

                                    // 3 digits are only allowed when string starts
                                    // with 0, 1, 2, 3
                                    if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                                        code = code * 8 + '01234567'.indexOf(source[index++]);
                                    }
                                }
                                str += String.fromCharCode(code);
                            } else {
                                str += ch;
                            }
                            break;
                    }
                } else {
                    ++lineNumber;
                    if (ch === '\r' && source[index] === '\n') {
                        ++index;
                    }
                    lineStart = index;
                }
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.StringLiteral,
            value: str,
            octal: octal,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanRegExp() {
        var str,
            ch,
            start,
            pattern,
            flags,
            value,
            classMarker = false,
            restore,
            terminated = false;

        lookahead = null;
        skipComment();

        start = index;
        ch = source[index];
        assert(ch === '/', 'Regular expression literal must start with a slash');
        str = source[index++];

        while (index < length) {
            ch = source[index++];
            str += ch;
            if (ch === '\\') {
                ch = source[index++];
                // ECMA-262 7.8.5
                if (isLineTerminator(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnterminatedRegExp);
                }
                str += ch;
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
            } else if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '/') {
                    terminated = true;
                    break;
                } else if (ch === '[') {
                    classMarker = true;
                }
            }
        }

        if (!terminated) {
            throwError({}, Messages.UnterminatedRegExp);
        }

        // Exclude leading and trailing slash.
        pattern = str.substr(1, str.length - 2);

        flags = '';
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch.charCodeAt(0))) {
                break;
            }

            ++index;
            if (ch === '\\' && index < length) {
                ch = source[index];
                if (ch === 'u') {
                    ++index;
                    restore = index;
                    ch = scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        for (str += '\\u'; restore < index; ++restore) {
                            str += source[restore];
                        }
                    } else {
                        index = restore;
                        flags += 'u';
                        str += '\\u';
                    }
                } else {
                    str += '\\';
                }
            } else {
                flags += ch;
                str += ch;
            }
        }

        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            throwError({}, Messages.InvalidRegExp);
        }

        if (extra.tokenize) {
            return {
                type: Token.RegularExpression,
                value: value,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }
        return {
            literal: str,
            value: value,
            range: [start, index]
        };
    }

    function collectRegex() {
        var pos, loc, regex, token;

        skipComment();

        pos = index;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        regex = scanRegExp();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        if (!extra.tokenize) {
            // Pop the previous token, which is likely '/' or '/='
            if (extra.tokens.length > 0) {
                token = extra.tokens[extra.tokens.length - 1];
                if (token.range[0] === pos && token.type === 'Punctuator') {
                    if (token.value === '/' || token.value === '/=') {
                        extra.tokens.pop();
                    }
                }
            }

            extra.tokens.push({
                type: 'RegularExpression',
                value: regex.literal,
                range: [pos, index],
                loc: loc
            });
        }

        return regex;
    }

    function isIdentifierName(token) {
        return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
    }

    function advanceSlash() {
        var prevToken, checkToken;
        // Using the following algorithm:
        // https://github.com/mozilla/sweet.js/wiki/design
        prevToken = extra.tokens[extra.tokens.length - 1];
        if (!prevToken) {
            // Nothing before that: it cannot be a division.
            return collectRegex();
        }
        if (prevToken.type === 'Punctuator') {
            if (prevToken.value === ']') {
                return scanPunctuator();
            }
            if (prevToken.value === ')') {
                checkToken = extra.tokens[extra.openParenToken - 1];
                if (checkToken && checkToken.type === 'Keyword' && (checkToken.value === 'if' || checkToken.value === 'while' || checkToken.value === 'for' || checkToken.value === 'with')) {
                    return collectRegex();
                }
                return scanPunctuator();
            }
            if (prevToken.value === '}') {
                // Dividing a function by anything makes little sense,
                // but we have to check for that.
                if (extra.tokens[extra.openCurlyToken - 3] && extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
                    // Anonymous function.
                    checkToken = extra.tokens[extra.openCurlyToken - 4];
                    if (!checkToken) {
                        return scanPunctuator();
                    }
                } else if (extra.tokens[extra.openCurlyToken - 4] && extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
                    // Named function.
                    checkToken = extra.tokens[extra.openCurlyToken - 5];
                    if (!checkToken) {
                        return collectRegex();
                    }
                } else {
                    return scanPunctuator();
                }
                // checkToken determines whether the function is
                // a declaration or an expression.
                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                    // It is an expression.
                    return scanPunctuator();
                }
                // It is a declaration.
                return collectRegex();
            }
            return collectRegex();
        }
        if (prevToken.type === 'Keyword') {
            return collectRegex();
        }
        return scanPunctuator();
    }

    function advance() {
        var ch;

        skipComment();

        if (index >= length) {
            return {
                type: Token.EOF,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [index, index]
            };
        }

        ch = source.charCodeAt(index);

        // Very common: ( and ) and ;
        if (ch === 0x28 || ch === 0x29 || ch === 0x3A) {
            return scanPunctuator();
        }

        // String literal starts with single quote (U+0027) or double quote (U+0022).
        if (ch === 0x27 || ch === 0x22) {
            return scanStringLiteral();
        }

        if (isIdentifierStart(ch)) {
            return scanIdentifier();
        }

        // Dot (.) U+002E can also start a floating-point number, hence the need
        // to check the next character.
        if (ch === 0x2E) {
            if (isDecimalDigit(source.charCodeAt(index + 1))) {
                return scanNumericLiteral();
            }
            return scanPunctuator();
        }

        if (isDecimalDigit(ch)) {
            return scanNumericLiteral();
        }

        // Slash (/) U+002F can also start a regex.
        if (extra.tokenize && ch === 0x2F) {
            return advanceSlash();
        }

        return scanPunctuator();
    }

    function collectToken() {
        var start, loc, token, range, value;

        skipComment();
        start = index;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        token = advance();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        if (token.type !== Token.EOF) {
            range = [token.range[0], token.range[1]];
            value = source.slice(token.range[0], token.range[1]);
            extra.tokens.push({
                type: TokenName[token.type],
                value: value,
                range: range,
                loc: loc
            });
        }

        return token;
    }

    function lex() {
        var token;

        token = lookahead;
        index = token.range[1];
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();

        index = token.range[1];
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        return token;
    }

    function peek() {
        var pos, line, start;

        pos = index;
        line = lineNumber;
        start = lineStart;
        lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
        index = pos;
        lineNumber = line;
        lineStart = start;
    }

    SyntaxTreeDelegate = {

        name: 'SyntaxTree',

        markStart: function () {
            skipComment();
            if (extra.loc) {
                state.markerStack.push(index - lineStart);
                state.markerStack.push(lineNumber);
            }
            if (extra.range) {
                state.markerStack.push(index);
            }
        },

        processComment: function (node) {
            var i, attacher, pos, len, candidate;

            if (typeof node.type === 'undefined' || node.type === Syntax.Program) {
                return;
            }

            // Check for possible additional trailing comments.
            peek();

            for (i = 0; i < extra.pendingComments.length; ++i) {
                attacher = extra.pendingComments[i];
                if (node.range[0] >= attacher.comment.range[1]) {
                    candidate = attacher.leading;
                    if (candidate) {
                        pos = candidate.range[0];
                        len = candidate.range[1] - pos;
                        if (node.range[0] <= pos && node.range[1] - node.range[0] >= len) {
                            attacher.leading = node;
                        }
                    } else {
                        attacher.leading = node;
                    }
                }
                if (node.range[1] <= attacher.comment.range[0]) {
                    candidate = attacher.trailing;
                    if (candidate) {
                        pos = candidate.range[0];
                        len = candidate.range[1] - pos;
                        if (node.range[0] <= pos && node.range[1] - node.range[0] >= len) {
                            attacher.trailing = node;
                        }
                    } else {
                        attacher.trailing = node;
                    }
                }
            }
        },

        markEnd: function (node) {
            if (extra.range) {
                node.range = [state.markerStack.pop(), index];
            }
            if (extra.loc) {
                node.loc = {
                    start: {
                        line: state.markerStack.pop(),
                        column: state.markerStack.pop()
                    },
                    end: {
                        line: lineNumber,
                        column: index - lineStart
                    }
                };
                this.postProcess(node);
            }
            if (extra.attachComment) {
                this.processComment(node);
            }
            return node;
        },

        markEndIf: function (node) {
            if (node.range || node.loc) {
                if (extra.loc) {
                    state.markerStack.pop();
                    state.markerStack.pop();
                }
                if (extra.range) {
                    state.markerStack.pop();
                }
            } else {
                this.markEnd(node);
            }
            return node;
        },

        postProcess: function (node) {
            if (extra.source) {
                node.loc.source = extra.source;
            }
            return node;
        },

        createArrayExpression: function (elements) {
            return {
                type: Syntax.ArrayExpression,
                elements: elements
            };
        },

        createAssignmentExpression: function (operator, left, right) {
            return {
                type: Syntax.AssignmentExpression,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBinaryExpression: function (operator, left, right) {
            var type = operator === '||' || operator === '&&' ? Syntax.LogicalExpression : Syntax.BinaryExpression;
            return {
                type: type,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBlockStatement: function (body) {
            return {
                type: Syntax.BlockStatement,
                body: body
            };
        },

        createBreakStatement: function (label) {
            return {
                type: Syntax.BreakStatement,
                label: label
            };
        },

        createCallExpression: function (callee, args) {
            return {
                type: Syntax.CallExpression,
                callee: callee,
                'arguments': args
            };
        },

        createCatchClause: function (param, body) {
            return {
                type: Syntax.CatchClause,
                param: param,
                body: body
            };
        },

        createConditionalExpression: function (test, consequent, alternate) {
            return {
                type: Syntax.ConditionalExpression,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createContinueStatement: function (label) {
            return {
                type: Syntax.ContinueStatement,
                label: label
            };
        },

        createDebuggerStatement: function () {
            return {
                type: Syntax.DebuggerStatement
            };
        },

        createDoWhileStatement: function (body, test) {
            return {
                type: Syntax.DoWhileStatement,
                body: body,
                test: test
            };
        },

        createEmptyStatement: function () {
            return {
                type: Syntax.EmptyStatement
            };
        },

        createExpressionStatement: function (expression) {
            return {
                type: Syntax.ExpressionStatement,
                expression: expression
            };
        },

        createForStatement: function (init, test, update, body) {
            return {
                type: Syntax.ForStatement,
                init: init,
                test: test,
                update: update,
                body: body
            };
        },

        createForInStatement: function (left, right, body) {
            return {
                type: Syntax.ForInStatement,
                left: left,
                right: right,
                body: body,
                each: false
            };
        },

        createFunctionDeclaration: function (id, params, defaults, body) {
            return {
                type: Syntax.FunctionDeclaration,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
            };
        },

        createFunctionExpression: function (id, params, defaults, body) {
            return {
                type: Syntax.FunctionExpression,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
            };
        },

        createIdentifier: function (name) {
            return {
                type: Syntax.Identifier,
                name: name
            };
        },

        createIfStatement: function (test, consequent, alternate) {
            return {
                type: Syntax.IfStatement,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createLabeledStatement: function (label, body) {
            return {
                type: Syntax.LabeledStatement,
                label: label,
                body: body
            };
        },

        createLiteral: function (token) {
            return {
                type: Syntax.Literal,
                value: token.value,
                raw: source.slice(token.range[0], token.range[1])
            };
        },

        createMemberExpression: function (accessor, object, property) {
            return {
                type: Syntax.MemberExpression,
                computed: accessor === '[',
                object: object,
                property: property
            };
        },

        createNewExpression: function (callee, args) {
            return {
                type: Syntax.NewExpression,
                callee: callee,
                'arguments': args
            };
        },

        createObjectExpression: function (properties) {
            return {
                type: Syntax.ObjectExpression,
                properties: properties
            };
        },

        createPostfixExpression: function (operator, argument) {
            return {
                type: Syntax.UpdateExpression,
                operator: operator,
                argument: argument,
                prefix: false
            };
        },

        createProgram: function (body) {
            return {
                type: Syntax.Program,
                body: body
            };
        },

        createProperty: function (kind, key, value) {
            return {
                type: Syntax.Property,
                key: key,
                value: value,
                kind: kind
            };
        },

        createReturnStatement: function (argument) {
            return {
                type: Syntax.ReturnStatement,
                argument: argument
            };
        },

        createSequenceExpression: function (expressions) {
            return {
                type: Syntax.SequenceExpression,
                expressions: expressions
            };
        },

        createSwitchCase: function (test, consequent) {
            return {
                type: Syntax.SwitchCase,
                test: test,
                consequent: consequent
            };
        },

        createSwitchStatement: function (discriminant, cases) {
            return {
                type: Syntax.SwitchStatement,
                discriminant: discriminant,
                cases: cases
            };
        },

        createThisExpression: function () {
            return {
                type: Syntax.ThisExpression
            };
        },

        createThrowStatement: function (argument) {
            return {
                type: Syntax.ThrowStatement,
                argument: argument
            };
        },

        createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
            return {
                type: Syntax.TryStatement,
                block: block,
                guardedHandlers: guardedHandlers,
                handlers: handlers,
                finalizer: finalizer
            };
        },

        createUnaryExpression: function (operator, argument) {
            if (operator === '++' || operator === '--') {
                return {
                    type: Syntax.UpdateExpression,
                    operator: operator,
                    argument: argument,
                    prefix: true
                };
            }
            return {
                type: Syntax.UnaryExpression,
                operator: operator,
                argument: argument,
                prefix: true
            };
        },

        createVariableDeclaration: function (declarations, kind) {
            return {
                type: Syntax.VariableDeclaration,
                declarations: declarations,
                kind: kind
            };
        },

        createVariableDeclarator: function (id, init) {
            return {
                type: Syntax.VariableDeclarator,
                id: id,
                init: init
            };
        },

        createWhileStatement: function (test, body) {
            return {
                type: Syntax.WhileStatement,
                test: test,
                body: body
            };
        },

        createWithStatement: function (object, body) {
            return {
                type: Syntax.WithStatement,
                object: object,
                body: body
            };
        }
    };

    // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
        var pos, line, start, found;

        pos = index;
        line = lineNumber;
        start = lineStart;
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }

    // Throw an exception

    function throwError(token, messageFormat) {
        var error,
            args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(/%(\d)/g, function (whole, index) {
            assert(index < args.length, 'Message reference must be in range');
            return args[index];
        });

        if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.range[0];
            error.lineNumber = token.lineNumber;
            error.column = token.range[0] - lineStart + 1;
        } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
        }

        error.description = msg;
        throw error;
    }

    function throwErrorTolerant() {
        try {
            throwError.apply(null, arguments);
        } catch (e) {
            if (extra.errors) {
                extra.errors.push(e);
            } else {
                throw e;
            }
        }
    }

    // Throw an exception because of the token.

    function throwUnexpected(token) {
        if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
        }

        if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
        }

        if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
        }

        if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
        }

        if (token.type === Token.Keyword) {
            if (isFutureReservedWord(token.value)) {
                throwError(token, Messages.UnexpectedReserved);
            } else if (strict && isStrictModeReservedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictReservedWord);
                return;
            }
            throwError(token, Messages.UnexpectedToken, token.value);
        }

        // BooleanLiteral, NullLiteral, or Punctuator.
        throwError(token, Messages.UnexpectedToken, token.value);
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.

    function expect(value) {
        var token = lex();
        if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
        }
    }

    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.

    function expectKeyword(keyword) {
        var token = lex();
        if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
        }
    }

    // Return true if the next token matches the specified punctuator.

    function match(value) {
        return lookahead.type === Token.Punctuator && lookahead.value === value;
    }

    // Return true if the next token matches the specified keyword

    function matchKeyword(keyword) {
        return lookahead.type === Token.Keyword && lookahead.value === keyword;
    }

    // Return true if the next token is an assignment operator

    function matchAssign() {
        var op;

        if (lookahead.type !== Token.Punctuator) {
            return false;
        }
        op = lookahead.value;
        return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
    }

    function consumeSemicolon() {
        var line;

        // Catch the very common case first: immediately a semicolon (U+003B).
        if (source.charCodeAt(index) === 0x3B) {
            lex();
            return;
        }

        line = lineNumber;
        skipComment();
        if (lineNumber !== line) {
            return;
        }

        if (match(';')) {
            lex();
            return;
        }

        if (lookahead.type !== Token.EOF && !match('}')) {
            throwUnexpected(lookahead);
        }
    }

    // Return true if provided expression is LeftHandSideExpression

    function isLeftHandSide(expr) {
        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
        var elements = [];

        expect('[');

        while (!match(']')) {
            if (match(',')) {
                lex();
                elements.push(null);
            } else {
                elements.push(parseAssignmentExpression());

                if (!match(']')) {
                    expect(',');
                }
            }
        }

        expect(']');

        return delegate.createArrayExpression(elements);
    }

    // 11.1.5 Object Initialiser

    function parsePropertyFunction(param, first) {
        var previousStrict, body;

        previousStrict = strict;
        delegate.markStart();
        body = parseFunctionSourceElements();
        if (first && strict && isRestrictedWord(param[0].name)) {
            throwErrorTolerant(first, Messages.StrictParamName);
        }
        strict = previousStrict;
        return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body));
    }

    function parseObjectPropertyKey() {
        var token;

        delegate.markStart();
        token = lex();

        // Note: This function is called only from parseObjectProperty(), where
        // EOF and Punctuator tokens are already filtered out.

        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
            if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            return delegate.markEnd(delegate.createLiteral(token));
        }

        return delegate.markEnd(delegate.createIdentifier(token.value));
    }

    function parseObjectProperty() {
        var token, key, id, value, param;

        token = lookahead;
        delegate.markStart();

        if (token.type === Token.Identifier) {

            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                value = parsePropertyFunction([]);
                return delegate.markEnd(delegate.createProperty('get', key, value));
            }
            if (token.value === 'set' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead;
                if (token.type !== Token.Identifier) {
                    expect(')');
                    throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
                    value = parsePropertyFunction([]);
                } else {
                    param = [parseVariableIdentifier()];
                    expect(')');
                    value = parsePropertyFunction(param, token);
                }
                return delegate.markEnd(delegate.createProperty('set', key, value));
            }
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', id, value));
        }
        if (token.type === Token.EOF || token.type === Token.Punctuator) {
            throwUnexpected(token);
        } else {
            key = parseObjectPropertyKey();
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', key, value));
        }
    }

    function parseObjectInitialiser() {
        var properties = [],
            property,
            name,
            key,
            kind,
            map = {},
            toString = String;

        expect('{');

        while (!match('}')) {
            property = parseObjectProperty();

            if (property.key.type === Syntax.Identifier) {
                name = property.key.name;
            } else {
                name = toString(property.key.value);
            }
            kind = property.kind === 'init' ? PropertyKind.Data : property.kind === 'get' ? PropertyKind.Get : PropertyKind.Set;

            key = '$' + name;
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (map[key] === PropertyKind.Data) {
                    if (strict && kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                    } else if (kind !== PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    }
                } else {
                    if (kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    } else if (map[key] & kind) {
                        throwErrorTolerant({}, Messages.AccessorGetSet);
                    }
                }
                map[key] |= kind;
            } else {
                map[key] = kind;
            }

            properties.push(property);

            if (!match('}')) {
                expect(',');
            }
        }

        expect('}');

        return delegate.createObjectExpression(properties);
    }

    // 11.1.6 The Grouping Operator

    function parseGroupExpression() {
        var expr;

        expect('(');

        expr = parseExpression();

        expect(')');

        return expr;
    }

    // 11.1 Primary Expressions

    function parsePrimaryExpression() {
        var type, token, expr;

        if (match('(')) {
            return parseGroupExpression();
        }

        type = lookahead.type;
        delegate.markStart();

        if (type === Token.Identifier) {
            expr = delegate.createIdentifier(lex().value);
        } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            if (strict && lookahead.octal) {
                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
            }
            expr = delegate.createLiteral(lex());
        } else if (type === Token.Keyword) {
            if (matchKeyword('this')) {
                lex();
                expr = delegate.createThisExpression();
            } else if (matchKeyword('function')) {
                expr = parseFunctionExpression();
            }
        } else if (type === Token.BooleanLiteral) {
            token = lex();
            token.value = token.value === 'true';
            expr = delegate.createLiteral(token);
        } else if (type === Token.NullLiteral) {
            token = lex();
            token.value = null;
            expr = delegate.createLiteral(token);
        } else if (match('[')) {
            expr = parseArrayInitialiser();
        } else if (match('{')) {
            expr = parseObjectInitialiser();
        } else if (match('/') || match('/=')) {
            if (typeof extra.tokens !== 'undefined') {
                expr = delegate.createLiteral(collectRegex());
            } else {
                expr = delegate.createLiteral(scanRegExp());
            }
            peek();
        }

        if (expr) {
            return delegate.markEnd(expr);
        }

        throwUnexpected(lex());
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
        var args = [];

        expect('(');

        if (!match(')')) {
            while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return args;
    }

    function parseNonComputedProperty() {
        var token;

        delegate.markStart();
        token = lex();

        if (!isIdentifierName(token)) {
            throwUnexpected(token);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value));
    }

    function parseNonComputedMember() {
        expect('.');

        return parseNonComputedProperty();
    }

    function parseComputedMember() {
        var expr;

        expect('[');

        expr = parseExpression();

        expect(']');

        return expr;
    }

    function parseNewExpression() {
        var callee, args;

        delegate.markStart();
        expectKeyword('new');
        callee = parseLeftHandSideExpression();
        args = match('(') ? parseArguments() : [];

        return delegate.markEnd(delegate.createNewExpression(callee, args));
    }

    function parseLeftHandSideExpressionAllowCall() {
        var marker, previousAllowIn, expr, args, property;

        marker = createLocationMarker();

        previousAllowIn = state.allowIn;
        state.allowIn = true;
        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
        state.allowIn = previousAllowIn;

        while (match('.') || match('[') || match('(')) {
            if (match('(')) {
                args = parseArguments();
                expr = delegate.createCallExpression(expr, args);
            } else if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
            } else {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
            }
            if (marker) {
                marker.apply(expr);
            }
        }

        return expr;
    }

    function parseLeftHandSideExpression() {
        var marker, previousAllowIn, expr, property;

        marker = createLocationMarker();

        previousAllowIn = state.allowIn;
        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
        state.allowIn = previousAllowIn;

        while (match('.') || match('[')) {
            if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
            } else {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
            }
            if (marker) {
                marker.apply(expr);
            }
        }

        return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
        var expr, token;

        delegate.markStart();
        expr = parseLeftHandSideExpressionAllowCall();

        if (lookahead.type === Token.Punctuator) {
            if ((match('++') || match('--')) && !peekLineTerminator()) {
                // 11.3.1, 11.3.2
                if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                    throwErrorTolerant({}, Messages.StrictLHSPostfix);
                }

                if (!isLeftHandSide(expr)) {
                    throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
                }

                token = lex();
                expr = delegate.createPostfixExpression(token.value, expr);
            }
        }

        return delegate.markEndIf(expr);
    }

    // 11.4 Unary Operators

    function parseUnaryExpression() {
        var token, expr;

        delegate.markStart();

        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
            expr = parsePostfixExpression();
        } else if (match('++') || match('--')) {
            token = lex();
            expr = parseUnaryExpression();
            // 11.4.4, 11.4.5
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPrefix);
            }

            if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            expr = delegate.createUnaryExpression(token.value, expr);
        } else if (match('+') || match('-') || match('~') || match('!')) {
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
        } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
                throwErrorTolerant({}, Messages.StrictDelete);
            }
        } else {
            expr = parsePostfixExpression();
        }

        return delegate.markEndIf(expr);
    }

    function binaryPrecedence(token, allowIn) {
        var prec = 0;

        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
            return 0;
        }

        switch (token.value) {
            case '||':
                prec = 1;
                break;

            case '&&':
                prec = 2;
                break;

            case '|':
                prec = 3;
                break;

            case '^':
                prec = 4;
                break;

            case '&':
                prec = 5;
                break;

            case '==':
            case '!=':
            case '===':
            case '!==':
                prec = 6;
                break;

            case '<':
            case '>':
            case '<=':
            case '>=':
            case 'instanceof':
                prec = 7;
                break;

            case 'in':
                prec = allowIn ? 7 : 0;
                break;

            case '<<':
            case '>>':
            case '>>>':
                prec = 8;
                break;

            case '+':
            case '-':
                prec = 9;
                break;

            case '*':
            case '/':
            case '%':
                prec = 11;
                break;

            default:
                break;
        }

        return prec;
    }

    // 11.5 Multiplicative Operators
    // 11.6 Additive Operators
    // 11.7 Bitwise Shift Operators
    // 11.8 Relational Operators
    // 11.9 Equality Operators
    // 11.10 Binary Bitwise Operators
    // 11.11 Binary Logical Operators

    function parseBinaryExpression() {
        var marker, markers, expr, token, prec, stack, right, operator, left, i;

        marker = createLocationMarker();
        left = parseUnaryExpression();

        token = lookahead;
        prec = binaryPrecedence(token, state.allowIn);
        if (prec === 0) {
            return left;
        }
        token.prec = prec;
        lex();

        markers = [marker, createLocationMarker()];
        right = parseUnaryExpression();

        stack = [left, token, right];

        while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {

            // Reduce: make a binary expression from the three topmost entries.
            while (stack.length > 2 && prec <= stack[stack.length - 2].prec) {
                right = stack.pop();
                operator = stack.pop().value;
                left = stack.pop();
                expr = delegate.createBinaryExpression(operator, left, right);
                markers.pop();
                marker = markers.pop();
                if (marker) {
                    marker.apply(expr);
                }
                stack.push(expr);
                markers.push(marker);
            }

            // Shift.
            token = lex();
            token.prec = prec;
            stack.push(token);
            markers.push(createLocationMarker());
            expr = parseUnaryExpression();
            stack.push(expr);
        }

        // Final reduce to clean-up the stack.
        i = stack.length - 1;
        expr = stack[i];
        markers.pop();
        while (i > 1) {
            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
            i -= 2;
            marker = markers.pop();
            if (marker) {
                marker.apply(expr);
            }
        }

        return expr;
    }

    // 11.12 Conditional Operator

    function parseConditionalExpression() {
        var expr, previousAllowIn, consequent, alternate;

        delegate.markStart();
        expr = parseBinaryExpression();

        if (match('?')) {
            lex();
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            consequent = parseAssignmentExpression();
            state.allowIn = previousAllowIn;
            expect(':');
            alternate = parseAssignmentExpression();

            expr = delegate.markEnd(delegate.createConditionalExpression(expr, consequent, alternate));
        } else {
            delegate.markEnd({});
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function parseAssignmentExpression() {
        var token, left, right, node;

        token = lookahead;
        delegate.markStart();
        node = left = parseConditionalExpression();

        if (matchAssign()) {
            // LeftHandSideExpression
            if (!isLeftHandSide(left)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            // 11.13.1
            if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
                throwErrorTolerant(token, Messages.StrictLHSAssignment);
            }

            token = lex();
            right = parseAssignmentExpression();
            node = delegate.createAssignmentExpression(token.value, left, right);
        }

        return delegate.markEndIf(node);
    }

    // 11.14 Comma Operator

    function parseExpression() {
        var expr;

        delegate.markStart();
        expr = parseAssignmentExpression();

        if (match(',')) {
            expr = delegate.createSequenceExpression([expr]);

            while (index < length) {
                if (!match(',')) {
                    break;
                }
                lex();
                expr.expressions.push(parseAssignmentExpression());
            }
        }

        return delegate.markEndIf(expr);
    }

    // 12.1 Block

    function parseStatementList() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseSourceElement();
            if (typeof statement === 'undefined') {
                break;
            }
            list.push(statement);
        }

        return list;
    }

    function parseBlock() {
        var block;

        delegate.markStart();
        expect('{');

        block = parseStatementList();

        expect('}');

        return delegate.markEnd(delegate.createBlockStatement(block));
    }

    // 12.2 Variable Statement

    function parseVariableIdentifier() {
        var token;

        delegate.markStart();
        token = lex();

        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value));
    }

    function parseVariableDeclaration(kind) {
        var init = null,
            id;

        delegate.markStart();
        id = parseVariableIdentifier();

        // 12.2.1
        if (strict && isRestrictedWord(id.name)) {
            throwErrorTolerant({}, Messages.StrictVarName);
        }

        if (kind === 'const') {
            expect('=');
            init = parseAssignmentExpression();
        } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
        }

        return delegate.markEnd(delegate.createVariableDeclarator(id, init));
    }

    function parseVariableDeclarationList(kind) {
        var list = [];

        do {
            list.push(parseVariableDeclaration(kind));
            if (!match(',')) {
                break;
            }
            lex();
        } while (index < length);

        return list;
    }

    function parseVariableStatement() {
        var declarations;

        expectKeyword('var');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return delegate.createVariableDeclaration(declarations, 'var');
    }

    // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
    function parseConstLetDeclaration(kind) {
        var declarations;

        delegate.markStart();

        expectKeyword(kind);

        declarations = parseVariableDeclarationList(kind);

        consumeSemicolon();

        return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind));
    }

    // 12.3 Empty Statement

    function parseEmptyStatement() {
        expect(';');
        return delegate.createEmptyStatement();
    }

    // 12.4 Expression Statement

    function parseExpressionStatement() {
        var expr = parseExpression();
        consumeSemicolon();
        return delegate.createExpressionStatement(expr);
    }

    // 12.5 If statement

    function parseIfStatement() {
        var test, consequent, alternate;

        expectKeyword('if');

        expect('(');

        test = parseExpression();

        expect(')');

        consequent = parseStatement();

        if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
        } else {
            alternate = null;
        }

        return delegate.createIfStatement(test, consequent, alternate);
    }

    // 12.6 Iteration Statements

    function parseDoWhileStatement() {
        var body, test, oldInIteration;

        expectKeyword('do');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        if (match(';')) {
            lex();
        }

        return delegate.createDoWhileStatement(body, test);
    }

    function parseWhileStatement() {
        var test, body, oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return delegate.createWhileStatement(test, body);
    }

    function parseForVariableDeclaration() {
        var token, declarations;

        delegate.markStart();
        token = lex();
        declarations = parseVariableDeclarationList();

        return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value));
    }

    function parseForStatement() {
        var init, test, update, left, right, body, oldInIteration;

        init = test = update = null;

        expectKeyword('for');

        expect('(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var') || matchKeyword('let')) {
                state.allowIn = false;
                init = parseForVariableDeclaration();
                state.allowIn = true;

                if (init.declarations.length === 1 && matchKeyword('in')) {
                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            } else {
                state.allowIn = false;
                init = parseExpression();
                state.allowIn = true;

                if (matchKeyword('in')) {
                    // LeftHandSideExpression
                    if (!isLeftHandSide(init)) {
                        throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                    }

                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            }

            if (typeof left === 'undefined') {
                expect(';');
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression();
            }
            expect(';');

            if (!match(')')) {
                update = parseExpression();
            }
        }

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return typeof left === 'undefined' ? delegate.createForStatement(init, test, update, body) : delegate.createForInStatement(left, right, body);
    }

    // 12.7 The continue statement

    function parseContinueStatement() {
        var label = null,
            key;

        expectKeyword('continue');

        // Optimize the most common form: 'continue;'.
        if (source.charCodeAt(index) === 0x3B) {
            lex();

            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (peekLineTerminator()) {
            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !state.inIteration) {
            throwError({}, Messages.IllegalContinue);
        }

        return delegate.createContinueStatement(label);
    }

    // 12.8 The break statement

    function parseBreakStatement() {
        var label = null,
            key;

        expectKeyword('break');

        // Catch the very common case first: immediately a semicolon (U+003B).
        if (source.charCodeAt(index) === 0x3B) {
            lex();

            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (peekLineTerminator()) {
            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
        }

        return delegate.createBreakStatement(label);
    }

    // 12.9 The return statement

    function parseReturnStatement() {
        var argument = null;

        expectKeyword('return');

        if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalReturn);
        }

        // 'return' followed by a space and an identifier is very common.
        if (source.charCodeAt(index) === 0x20) {
            if (isIdentifierStart(source.charCodeAt(index + 1))) {
                argument = parseExpression();
                consumeSemicolon();
                return delegate.createReturnStatement(argument);
            }
        }

        if (peekLineTerminator()) {
            return delegate.createReturnStatement(null);
        }

        if (!match(';')) {
            if (!match('}') && lookahead.type !== Token.EOF) {
                argument = parseExpression();
            }
        }

        consumeSemicolon();

        return delegate.createReturnStatement(argument);
    }

    // 12.10 The with statement

    function parseWithStatement() {
        var object, body;

        if (strict) {
            throwErrorTolerant({}, Messages.StrictModeWith);
        }

        expectKeyword('with');

        expect('(');

        object = parseExpression();

        expect(')');

        body = parseStatement();

        return delegate.createWithStatement(object, body);
    }

    // 12.10 The swith statement

    function parseSwitchCase() {
        var test,
            consequent = [],
            statement;

        delegate.markStart();
        if (matchKeyword('default')) {
            lex();
            test = null;
        } else {
            expectKeyword('case');
            test = parseExpression();
        }
        expect(':');

        while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                break;
            }
            statement = parseStatement();
            consequent.push(statement);
        }

        return delegate.markEnd(delegate.createSwitchCase(test, consequent));
    }

    function parseSwitchStatement() {
        var discriminant, cases, clause, oldInSwitch, defaultFound;

        expectKeyword('switch');

        expect('(');

        discriminant = parseExpression();

        expect(')');

        expect('{');

        cases = [];

        if (match('}')) {
            lex();
            return delegate.createSwitchStatement(discriminant, cases);
        }

        oldInSwitch = state.inSwitch;
        state.inSwitch = true;
        defaultFound = false;

        while (index < length) {
            if (match('}')) {
                break;
            }
            clause = parseSwitchCase();
            if (clause.test === null) {
                if (defaultFound) {
                    throwError({}, Messages.MultipleDefaultsInSwitch);
                }
                defaultFound = true;
            }
            cases.push(clause);
        }

        state.inSwitch = oldInSwitch;

        expect('}');

        return delegate.createSwitchStatement(discriminant, cases);
    }

    // 12.13 The throw statement

    function parseThrowStatement() {
        var argument;

        expectKeyword('throw');

        if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterThrow);
        }

        argument = parseExpression();

        consumeSemicolon();

        return delegate.createThrowStatement(argument);
    }

    // 12.14 The try statement

    function parseCatchClause() {
        var param, body;

        delegate.markStart();
        expectKeyword('catch');

        expect('(');
        if (match(')')) {
            throwUnexpected(lookahead);
        }

        param = parseVariableIdentifier();
        // 12.14.1
        if (strict && isRestrictedWord(param.name)) {
            throwErrorTolerant({}, Messages.StrictCatchVariable);
        }

        expect(')');
        body = parseBlock();
        return delegate.markEnd(delegate.createCatchClause(param, body));
    }

    function parseTryStatement() {
        var block,
            handlers = [],
            finalizer = null;

        expectKeyword('try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
        }

        if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
        }

        if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
        }

        return delegate.createTryStatement(block, [], handlers, finalizer);
    }

    // 12.15 The debugger statement

    function parseDebuggerStatement() {
        expectKeyword('debugger');

        consumeSemicolon();

        return delegate.createDebuggerStatement();
    }

    // 12 Statements

    function parseStatement() {
        var type = lookahead.type,
            expr,
            labeledBody,
            key;

        if (type === Token.EOF) {
            throwUnexpected(lookahead);
        }

        delegate.markStart();

        if (type === Token.Punctuator) {
            switch (lookahead.value) {
                case ';':
                    return delegate.markEnd(parseEmptyStatement());
                case '{':
                    return delegate.markEnd(parseBlock());
                case '(':
                    return delegate.markEnd(parseExpressionStatement());
                default:
                    break;
            }
        }

        if (type === Token.Keyword) {
            switch (lookahead.value) {
                case 'break':
                    return delegate.markEnd(parseBreakStatement());
                case 'continue':
                    return delegate.markEnd(parseContinueStatement());
                case 'debugger':
                    return delegate.markEnd(parseDebuggerStatement());
                case 'do':
                    return delegate.markEnd(parseDoWhileStatement());
                case 'for':
                    return delegate.markEnd(parseForStatement());
                case 'function':
                    return delegate.markEnd(parseFunctionDeclaration());
                case 'if':
                    return delegate.markEnd(parseIfStatement());
                case 'return':
                    return delegate.markEnd(parseReturnStatement());
                case 'switch':
                    return delegate.markEnd(parseSwitchStatement());
                case 'throw':
                    return delegate.markEnd(parseThrowStatement());
                case 'try':
                    return delegate.markEnd(parseTryStatement());
                case 'var':
                    return delegate.markEnd(parseVariableStatement());
                case 'while':
                    return delegate.markEnd(parseWhileStatement());
                case 'with':
                    return delegate.markEnd(parseWithStatement());
                default:
                    break;
            }
        }

        expr = parseExpression();

        // 12.12 Labelled Statements
        if (expr.type === Syntax.Identifier && match(':')) {
            lex();

            key = '$' + expr.name;
            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.Redeclaration, 'Label', expr.name);
            }

            state.labelSet[key] = true;
            labeledBody = parseStatement();
            delete state.labelSet[key];
            return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody));
        }

        consumeSemicolon();

        return delegate.markEnd(delegate.createExpressionStatement(expr));
    }

    // 13 Function Definition

    function parseFunctionSourceElements() {
        var sourceElement,
            sourceElements = [],
            token,
            directive,
            firstRestricted,
            oldLabelSet,
            oldInIteration,
            oldInSwitch,
            oldInFunctionBody;

        delegate.markStart();
        expect('{');

        while (index < length) {
            if (lookahead.type !== Token.StringLiteral) {
                break;
            }
            token = lookahead;

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        oldLabelSet = state.labelSet;
        oldInIteration = state.inIteration;
        oldInSwitch = state.inSwitch;
        oldInFunctionBody = state.inFunctionBody;

        state.labelSet = {};
        state.inIteration = false;
        state.inSwitch = false;
        state.inFunctionBody = true;

        while (index < length) {
            if (match('}')) {
                break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }

        expect('}');

        state.labelSet = oldLabelSet;
        state.inIteration = oldInIteration;
        state.inSwitch = oldInSwitch;
        state.inFunctionBody = oldInFunctionBody;

        return delegate.markEnd(delegate.createBlockStatement(sourceElements));
    }

    function parseParams(firstRestricted) {
        var param,
            params = [],
            token,
            stricted,
            paramSet,
            key,
            message;
        expect('(');

        if (!match(')')) {
            paramSet = {};
            while (index < length) {
                token = lookahead;
                param = parseVariableIdentifier();
                key = '$' + token.value;
                if (strict) {
                    if (isRestrictedWord(token.value)) {
                        stricted = token;
                        message = Messages.StrictParamName;
                    }
                    if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                        stricted = token;
                        message = Messages.StrictParamDupe;
                    }
                } else if (!firstRestricted) {
                    if (isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamName;
                    } else if (isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictReservedWord;
                    } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                        firstRestricted = token;
                        message = Messages.StrictParamDupe;
                    }
                }
                params.push(param);
                paramSet[key] = true;
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return {
            params: params,
            stricted: stricted,
            firstRestricted: firstRestricted,
            message: message
        };
    }

    function parseFunctionDeclaration() {
        var id,
            params = [],
            body,
            token,
            stricted,
            tmp,
            firstRestricted,
            message,
            previousStrict;

        delegate.markStart();

        expectKeyword('function');
        token = lookahead;
        id = parseVariableIdentifier();
        if (strict) {
            if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
            }
        } else {
            if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
            }
        }

        tmp = parseParams(firstRestricted);
        params = tmp.params;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && stricted) {
            throwErrorTolerant(stricted, message);
        }
        strict = previousStrict;

        return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body));
    }

    function parseFunctionExpression() {
        var token,
            id = null,
            stricted,
            firstRestricted,
            message,
            tmp,
            params = [],
            body,
            previousStrict;

        delegate.markStart();
        expectKeyword('function');

        if (!match('(')) {
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
                if (isRestrictedWord(token.value)) {
                    throwErrorTolerant(token, Messages.StrictFunctionName);
                }
            } else {
                if (isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }

        tmp = parseParams(firstRestricted);
        params = tmp.params;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && stricted) {
            throwErrorTolerant(stricted, message);
        }
        strict = previousStrict;

        return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body));
    }

    // 14 Program

    function parseSourceElement() {
        if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
                case 'const':
                case 'let':
                    return parseConstLetDeclaration(lookahead.value);
                case 'function':
                    return parseFunctionDeclaration();
                default:
                    return parseStatement();
            }
        }

        if (lookahead.type !== Token.EOF) {
            return parseStatement();
        }
    }

    function parseSourceElements() {
        var sourceElement,
            sourceElements = [],
            token,
            directive,
            firstRestricted;

        while (index < length) {
            token = lookahead;
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        while (index < length) {
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }
        return sourceElements;
    }

    function parseProgram() {
        var body;

        delegate.markStart();
        strict = false;
        peek();
        body = parseSourceElements();
        return delegate.markEnd(delegate.createProgram(body));
    }

    function attachComments() {
        var i, attacher, comment, leading, trailing;

        for (i = 0; i < extra.pendingComments.length; ++i) {
            attacher = extra.pendingComments[i];
            comment = attacher.comment;
            leading = attacher.leading;
            if (leading) {
                if (typeof leading.leadingComments === 'undefined') {
                    leading.leadingComments = [];
                }
                leading.leadingComments.push(attacher.comment);
            }
            trailing = attacher.trailing;
            if (trailing) {
                if (typeof trailing.trailingComments === 'undefined') {
                    trailing.trailingComments = [];
                }
                trailing.trailingComments.push(attacher.comment);
            }
        }
        extra.pendingComments = [];
    }

    function filterTokenLocation() {
        var i,
            entry,
            token,
            tokens = [];

        for (i = 0; i < extra.tokens.length; ++i) {
            entry = extra.tokens[i];
            token = {
                type: entry.type,
                value: entry.value
            };
            if (extra.range) {
                token.range = entry.range;
            }
            if (extra.loc) {
                token.loc = entry.loc;
            }
            tokens.push(token);
        }

        extra.tokens = tokens;
    }

    function LocationMarker() {
        this.startIndex = index;
        this.startLine = lineNumber;
        this.startColumn = index - lineStart;
    }

    LocationMarker.prototype = {
        constructor: LocationMarker,

        apply: function (node) {
            if (extra.range) {
                node.range = [this.startIndex, index];
            }
            if (extra.loc) {
                node.loc = {
                    start: {
                        line: this.startLine,
                        column: this.startColumn
                    },
                    end: {
                        line: lineNumber,
                        column: index - lineStart
                    }
                };
                node = delegate.postProcess(node);
            }
            if (extra.attachComment) {
                delegate.processComment(node);
            }
        }
    };

    function createLocationMarker() {
        if (!extra.loc && !extra.range) {
            return null;
        }

        skipComment();

        return new LocationMarker();
    }

    function tokenize(code, options) {
        var toString, token, tokens;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = source.length > 0 ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
        };

        extra = {};

        // Options matching.
        options = options || {};

        // Of course we collect tokens here.
        options.tokens = true;
        extra.tokens = [];
        extra.tokenize = true;
        // The following two fields are necessary to compute the Regex tokens.
        extra.openParenToken = -1;
        extra.openCurlyToken = -1;

        extra.range = typeof options.range === 'boolean' && options.range;
        extra.loc = typeof options.loc === 'boolean' && options.loc;

        if (typeof options.comment === 'boolean' && options.comment) {
            extra.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
            extra.errors = [];
        }

        if (length > 0) {
            if (typeof source[0] === 'undefined') {
                // Try first to convert to a string. This is good as fast path
                // for old IE which understands string indexing for string
                // literals only and not for string object.
                if (code instanceof String) {
                    source = code.valueOf();
                }
            }
        }

        try {
            peek();
            if (lookahead.type === Token.EOF) {
                return extra.tokens;
            }

            token = lex();
            while (lookahead.type !== Token.EOF) {
                try {
                    token = lex();
                } catch (lexError) {
                    token = lookahead;
                    if (extra.errors) {
                        extra.errors.push(lexError);
                        // We have to break on the first error
                        // to avoid infinite loops.
                        break;
                    } else {
                        throw lexError;
                    }
                }
            }

            filterTokenLocation();
            tokens = extra.tokens;
            if (typeof extra.comments !== 'undefined') {
                tokens.comments = extra.comments;
            }
            if (typeof extra.errors !== 'undefined') {
                tokens.errors = extra.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            extra = {};
        }
        return tokens;
    }

    function parse(code, options) {
        var program, toString;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = source.length > 0 ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1,
            markerStack: []
        };

        extra = {};
        if (typeof options !== 'undefined') {
            extra.range = typeof options.range === 'boolean' && options.range;
            extra.loc = typeof options.loc === 'boolean' && options.loc;
            extra.attachComment = typeof options.attachComment === 'boolean' && options.attachComment;

            if (extra.loc && options.source !== null && options.source !== undefined) {
                extra.source = toString(options.source);
            }

            if (typeof options.tokens === 'boolean' && options.tokens) {
                extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
                extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
                extra.errors = [];
            }
            if (extra.attachComment) {
                extra.range = true;
                extra.pendingComments = [];
                extra.comments = [];
            }
        }

        if (length > 0) {
            if (typeof source[0] === 'undefined') {
                // Try first to convert to a string. This is good as fast path
                // for old IE which understands string indexing for string
                // literals only and not for string object.
                if (code instanceof String) {
                    source = code.valueOf();
                }
            }
        }

        try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
                program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
                filterTokenLocation();
                program.tokens = extra.tokens;
            }
            if (typeof extra.errors !== 'undefined') {
                program.errors = extra.errors;
            }
            if (extra.attachComment) {
                attachComments();
            }
        } catch (e) {
            throw e;
        } finally {
            extra = {};
        }

        return program;
    }

    // Sync with *.json manifests.
    exports.version = '1.1.1';

    exports.tokenize = tokenize;

    exports.parse = parse;

    // Deep copy.
    exports.Syntax = function () {
        var name,
            types = {};

        if (typeof Object.create === 'function') {
            types = Object.create(null);
        }

        for (name in Syntax) {
            if (Syntax.hasOwnProperty(name)) {
                types[name] = Syntax[name];
            }
        }

        if (typeof Object.freeze === 'function') {
            Object.freeze(types);
        }

        return types;
    }();
});
/* vim: set sw=4 ts=4 et tw=80 : */

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(23);

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(4);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(3).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(9);
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13).PassThrough;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13).Transform;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function (handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function (event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function (handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function (handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function (handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function (handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(0)))

/***/ }),
/* 59 */
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(58);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate(fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config(name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "/* latin-ext */\r\n@font-face {\r\n  font-family: 'Source Code Pro';\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(" + __webpack_require__(70) + ") format('woff2');\r\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\r\n}\r\n/* latin */\r\n@font-face {\r\n  font-family: 'Source Code Pro';\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(" + __webpack_require__(71) + ") format('woff2');\r\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\r\n}", ""]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports
exports.i(__webpack_require__(62), "");
exports.i(__webpack_require__(64), "");

// module
exports.push([module.i, "body, .CodeMirror{\r\n  font-family: \"Source Code Pro\";\r\n  font-size:  13px;\r\n  height: 100%;\r\n  width: 100%;\r\n  padding: 0px;\r\n  margin: 0px;\r\n  clear: both;\r\n  position: absolute;\r\n}\r\n\r\n.commandbar{\r\n    font-family: \"Source Code Pro\";\r\n    font-size:  13px;\r\n}\r\n\r\n@media screen and (max-device-width:1000px){\r\n    .phone-run{\r\n        display: block;\r\n        position: fixed;\r\n        bottom: 0px;\r\n        left: 0px;\r\n        right: 0px;\r\n        height: 60px;\r\n        z-index: 5000;\r\n        width: 100%;\r\n        border: 1px solid #845959;\r\n        background: #845959;\r\n        color: rgb(93, 85, 109);\r\n    }\r\n}\r\n\r\n\r\n@media screen and (min-device-width:1000px){\r\n    .phone-run{\r\n        display: none;\r\n    }\r\n}", ""]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nstellarized theme for code-mirror\r\n*/\r\n\r\n/*\r\nstellarized color palette\r\nrgss3.github.io\r\n\r\nderived from solarized theme\r\n*/\r\n\r\n.stellarized.base03 { color: rgb(0, 43, 54); }\r\n.stellarized.base02 { color: #073642; }\r\n.stellarized.base01 { color: #586e75; }\r\n.stellarized.base00 { color: #657b83; }\r\n.stellarized.base0 { color: #839496; }\r\n.stellarized.base1 { color: #93a1a1; }\r\n.stellarized.base2 { color: #eee8d5; }\r\n.stellarized.base3  { color: #fdf6e3; }\r\n.stellarized.solar-yellow  { color: #b58900; }\r\n.stellarized.solar-orange  { color: #cb4b16; }\r\n.stellarized.solar-red { color: #dc322f; }\r\n.stellarized.solar-magenta { color: #d33682; }\r\n.stellarized.solar-violet  { color: #6c71c4; }\r\n.stellarized.solar-blue { color: #268bd2; }\r\n.stellarized.solar-cyan { color: #2aa198; }\r\n.stellarized.solar-green { color: #859900; }\r\n\r\n/* Color scheme for code-mirror */\r\n\r\n.cm-s-stellarized {\r\n  line-height: 1.8em;\r\n  color-profile: sRGB;\r\n  rendering-intent: auto;\r\n}\r\n.cm-s-stellarized.cm-s-dark {\r\n  color: #839496;\r\n  background-color: #000;\r\n  text-shadow: rgba(246, 246, 246, 20%) 0 0 2px;\r\n}\r\n\r\n.cm-s-stellarized .CodeMirror-widget {\r\n  text-shadow: none;\r\n}\r\n\r\n.cm-s-stellarized .cm-header { color: #586e75; }\r\n.cm-s-stellarized .cm-quote { color: #93a1a1; }\r\n\r\n.cm-s-stellarized .cm-keyword { color: rgba(195, 236, 249, 0.75); text-transform: uppercase; text-shadow: 0 0 6px rgb(255, 255, 255);  }\r\n\r\n\r\n.cm-s-stellarized .cm-atom { color: rgba(195, 236, 249, 0.75); font-weight: bold;}\r\n.cm-s-stellarized .cm-number { color: rgba(195, 236, 249, 0.75); font-weight: bold;}\r\n.cm-s-stellarized .cm-def { color: rgba(195, 236, 249, 0.75); font-weight: bold; }\r\n\r\n.cm-s-stellarized .cm-variable { color: rgba(195, 236, 249, 1);   text-shadow: none; }\r\n.cm-s-stellarized .cm-variable-2 { color: rgba(195, 236, 249, 1); text-shadow: none;}\r\n.cm-s-stellarized .cm-variable-3 { color: rgba(195, 236, 249, 1); text-shadow: none;}\r\n.cm-s-stellarized .cm-variable:before,\r\n.cm-s-stellarized .cm-variable2:before,\r\n.cm-s-stellarized .cm-variable3:before {\r\n   content: \"\\A3\";\r\n   color: rgba(88, 110, 117, 0.45);\r\n   font-size:1em;\r\n }\r\n\r\n.cm-s-stellarized .cm-property { color: rgb(119, 222, 255);  }\r\n.cm-s-stellarized .cm-property:before {content: '\\2192'; color: rgba(88, 110, 117, 0.45);}\r\n\r\n.cm-s-stellarized .cm-operator { color: #6c71c4; }\r\n.cm-s-stellarized .cm-operator:before {content: \":\"; font-size: 0.5em; color: rgba(88, 110, 117, 0.45);}\r\n.cm-s-stellarized .cm-operator:after {content: \":\"; font-size: 0.5em; color: rgba(88, 110, 117, 0.45);}\r\n\r\n.cm-s-stellarized .cm-comment { color: rgba(88, 110, 117, 0.45); font-weight: 10;}\r\n\r\n.cm-s-stellarized .cm-string {  color: rgba(195, 236, 249, 0.75); }\r\n.cm-s-stellarized .cm-string-2 {  color: rgba(195, 236, 249, 0.75);  }\r\n.cm-s-stellarized .cm-string:before {content: \"\\266A\"; font-size: 1.5em; color: rgba(88, 110, 117, 0.45);}\r\n.cm-s-stellarized .cm-string-2:before {content: \"\\266A\"; font-size: 1.5em; color: rgba(88, 110, 117, 0.45);}\r\n\r\n.cm-s-stellarized .cm-meta { color: #859900; }\r\n.cm-s-stellarized .cm-qualifier { color: #b58900; }\r\n.cm-s-stellarized .cm-builtin { color: #d33682; }\r\n.cm-s-stellarized .cm-bracket { color: #cb4b16; }\r\n.cm-s-stellarized .CodeMirror-matchingbracket { color: #859900; }\r\n.cm-s-stellarized .CodeMirror-nonmatchingbracket { color: #dc322f; }\r\n.cm-s-stellarized .cm-tag { text-transform:lowercase; font-style: italic; font-size: 1em;}\r\n.cm-s-stellarized .cm-attribute {  color: rgb(119, 222, 255);  }\r\n.cm-s-stellarized .cm-hr {\r\n  color: transparent;\r\n  border-top: 1px solid #586e75;\r\n  display: block;\r\n}\r\n.cm-s-stellarized .cm-link { color: #93a1a1; cursor: pointer; }\r\n.cm-s-stellarized .cm-special { color: #6c71c4; }\r\n.cm-s-stellarized .cm-em {\r\n  color: #999;\r\n  text-decoration: underline;\r\n  text-decoration-style: dotted;\r\n}\r\n.cm-s-stellarized .cm-strong { color: #eee; }\r\n.cm-s-stellarized .cm-error,\r\n.cm-s-stellarized .cm-invalidchar {\r\n  color: #586e75;\r\n  border-bottom: 1px dotted #dc322f;\r\n}\r\n\r\n.cm-s-stellarized.cm-s-dark div.CodeMirror-selected { background: #073642; }\r\n.cm-s-stellarized.cm-s-dark.CodeMirror ::selection { background: rgba(7, 54, 66, 0.99); }\r\n.cm-s-stellarized.cm-s-dark .CodeMirror-line::-moz-selection, .cm-s-dark .CodeMirror-line > span::-moz-selection, .cm-s-dark .CodeMirror-line > span > span::-moz-selection { background: rgba(7, 54, 66, 0.99); }\r\n\r\n.cm-s-stellarized.cm-s-light div.CodeMirror-selected { background: #eee8d5; }\r\n.cm-s-stellarized.cm-s-light .CodeMirror-line::selection, .cm-s-light .CodeMirror-line > span::selection, .cm-s-light .CodeMirror-line > span > span::selection { background: #eee8d5; }\r\n.cm-s-stellarized.cm-s-light .CodeMirror-line::-moz-selection, .cm-s-ligh .CodeMirror-line > span::-moz-selection, .cm-s-ligh .CodeMirror-line > span > span::-moz-selection { background: #eee8d5; }\r\n\r\n/* Editor styling */\r\n\r\n\r\n\r\n/* Little shadow on the view-port of the buffer view */\r\n.cm-s-stellarized.CodeMirror {\r\n  -moz-box-shadow: inset 7px 0 12px -6px #000;\r\n  -webkit-box-shadow: inset 7px 0 12px -6px #000;\r\n  box-shadow: inset 7px 0 12px -6px #000;\r\n}\r\n\r\n/* Remove gutter border */\r\n.cm-s-stellarized .CodeMirror-gutters {\r\n  border-right: 0;\r\n}\r\n\r\n/* Gutter colors and line number styling based of color scheme (dark / light) */\r\n\r\n/* Dark */\r\n.cm-s-stellarized.cm-s-dark .CodeMirror-gutters {\r\n  background-color: #073642;\r\n}\r\n\r\n.cm-s-stellarized.cm-s-dark .CodeMirror-linenumber {\r\n  color: #586e75;\r\n  text-shadow: #021014 0 -1px;\r\n}\r\n\r\n/* Light */\r\n.cm-s-stellarized.cm-s-light .CodeMirror-gutters {\r\n  background-color: #eee8d5;\r\n}\r\n\r\n.cm-s-stellarized.cm-s-light .CodeMirror-linenumber {\r\n  color: #839496;\r\n}\r\n\r\n/* Common */\r\n.cm-s-stellarized .CodeMirror-linenumber {\r\n  padding: 0 5px;\r\n}\r\n.cm-s-stellarized .CodeMirror-guttermarker-subtle { color: #586e75; }\r\n.cm-s-stellarized.cm-s-dark .CodeMirror-guttermarker { color: #ddd; }\r\n.cm-s-stellarized.cm-s-light .CodeMirror-guttermarker { color: #cb4b16; }\r\n\r\n.cm-s-stellarized .CodeMirror-gutter .CodeMirror-gutter-text {\r\n  color: #586e75;\r\n}\r\n\r\n/* Cursor */\r\n.cm-s-stellarized .CodeMirror-cursor { border-left: 1px solid #819090; }\r\n\r\n/* Fat cursor */\r\n.cm-s-stellarized.cm-s-light.cm-fat-cursor .CodeMirror-cursor { background: #77ee77; }\r\n.cm-s-stellarized.cm-s-light .cm-animate-fat-cursor { background-color: #77ee77; }\r\n.cm-s-stellarized.cm-s-dark.cm-fat-cursor .CodeMirror-cursor { background: #586e75; }\r\n.cm-s-stellarized.cm-s-dark .cm-animate-fat-cursor { background-color: #586e75; }\r\n\r\n/* Active line */\r\n.cm-s-stellarized.cm-s-dark .CodeMirror-activeline-background {\r\n  background: rgba(255, 255, 255, 0.06);\r\n}\r\n.cm-s-stellarized.cm-s-light .CodeMirror-activeline-background {\r\n  background: rgba(0, 0, 0, 0.06);\r\n}\r\n\t", ""]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "/* BASICS */\n\n.CodeMirror {\n  /* Set height, width, borders, and global font properties here */\n  font-family: monospace;\n  height: 300px;\n  color: black;\n}\n\n/* PADDING */\n\n.CodeMirror-lines {\n  padding: 4px 0; /* Vertical padding around content */\n}\n.CodeMirror pre {\n  padding: 0 4px; /* Horizontal padding of content */\n}\n\n.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  background-color: white; /* The little square between H and V scrollbars */\n}\n\n/* GUTTER */\n\n.CodeMirror-gutters {\n  border-right: 1px solid #ddd;\n  background-color: #f7f7f7;\n  white-space: nowrap;\n}\n.CodeMirror-linenumbers {}\n.CodeMirror-linenumber {\n  padding: 0 3px 0 5px;\n  min-width: 20px;\n  text-align: right;\n  color: #999;\n  white-space: nowrap;\n}\n\n.CodeMirror-guttermarker { color: black; }\n.CodeMirror-guttermarker-subtle { color: #999; }\n\n/* CURSOR */\n\n.CodeMirror-cursor {\n  border-left: 1px solid black;\n  border-right: none;\n  width: 0;\n}\n/* Shown when moving in bi-directional text */\n.CodeMirror div.CodeMirror-secondarycursor {\n  border-left: 1px solid silver;\n}\n.cm-fat-cursor .CodeMirror-cursor {\n  width: auto;\n  border: 0 !important;\n  background: #7e7;\n}\n.cm-fat-cursor div.CodeMirror-cursors {\n  z-index: 1;\n}\n\n.cm-animate-fat-cursor {\n  width: auto;\n  border: 0;\n  -webkit-animation: blink 1.06s steps(1) infinite;\n  -moz-animation: blink 1.06s steps(1) infinite;\n  animation: blink 1.06s steps(1) infinite;\n  background-color: #7e7;\n}\n@-moz-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@-webkit-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n\n/* Can style cursor different in overwrite (non-insert) mode */\n.CodeMirror-overwrite .CodeMirror-cursor {}\n\n.cm-tab { display: inline-block; text-decoration: inherit; }\n\n.CodeMirror-rulers {\n  position: absolute;\n  left: 0; right: 0; top: -50px; bottom: -20px;\n  overflow: hidden;\n}\n.CodeMirror-ruler {\n  border-left: 1px solid #ccc;\n  top: 0; bottom: 0;\n  position: absolute;\n}\n\n/* DEFAULT THEME */\n\n.cm-s-default .cm-header {color: blue;}\n.cm-s-default .cm-quote {color: #090;}\n.cm-negative {color: #d44;}\n.cm-positive {color: #292;}\n.cm-header, .cm-strong {font-weight: bold;}\n.cm-em {font-style: italic;}\n.cm-link {text-decoration: underline;}\n.cm-strikethrough {text-decoration: line-through;}\n\n.cm-s-default .cm-keyword {color: #708;}\n.cm-s-default .cm-atom {color: #219;}\n.cm-s-default .cm-number {color: #164;}\n.cm-s-default .cm-def {color: #00f;}\n.cm-s-default .cm-variable,\n.cm-s-default .cm-punctuation,\n.cm-s-default .cm-property,\n.cm-s-default .cm-operator {}\n.cm-s-default .cm-variable-2 {color: #05a;}\n.cm-s-default .cm-variable-3 {color: #085;}\n.cm-s-default .cm-comment {color: #a50;}\n.cm-s-default .cm-string {color: #a11;}\n.cm-s-default .cm-string-2 {color: #f50;}\n.cm-s-default .cm-meta {color: #555;}\n.cm-s-default .cm-qualifier {color: #555;}\n.cm-s-default .cm-builtin {color: #30a;}\n.cm-s-default .cm-bracket {color: #997;}\n.cm-s-default .cm-tag {color: #170;}\n.cm-s-default .cm-attribute {color: #00c;}\n.cm-s-default .cm-hr {color: #999;}\n.cm-s-default .cm-link {color: #00c;}\n\n.cm-s-default .cm-error {color: #f00;}\n.cm-invalidchar {color: #f00;}\n\n.CodeMirror-composing { border-bottom: 2px solid; }\n\n/* Default styles for common addons */\n\ndiv.CodeMirror span.CodeMirror-matchingbracket {color: #0f0;}\ndiv.CodeMirror span.CodeMirror-nonmatchingbracket {color: #f22;}\n.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }\n.CodeMirror-activeline-background {background: #e8f2ff;}\n\n/* STOP */\n\n/* The rest of this file contains styles related to the mechanics of\n   the editor. You probably shouldn't touch them. */\n\n.CodeMirror {\n  position: relative;\n  overflow: hidden;\n  background: white;\n}\n\n.CodeMirror-scroll {\n  overflow: scroll !important; /* Things will break if this is overridden */\n  /* 30px is the magic margin used to hide the element's real scrollbars */\n  /* See overflow: hidden in .CodeMirror */\n  margin-bottom: -30px; margin-right: -30px;\n  padding-bottom: 30px;\n  height: 100%;\n  outline: none; /* Prevent dragging from highlighting the element */\n  position: relative;\n}\n.CodeMirror-sizer {\n  position: relative;\n  border-right: 30px solid transparent;\n}\n\n/* The fake, visible scrollbars. Used to force redraw during scrolling\n   before actual scrolling happens, thus preventing shaking and\n   flickering artifacts. */\n.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  position: absolute;\n  z-index: 6;\n  display: none;\n}\n.CodeMirror-vscrollbar {\n  right: 0; top: 0;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.CodeMirror-hscrollbar {\n  bottom: 0; left: 0;\n  overflow-y: hidden;\n  overflow-x: scroll;\n}\n.CodeMirror-scrollbar-filler {\n  right: 0; bottom: 0;\n}\n.CodeMirror-gutter-filler {\n  left: 0; bottom: 0;\n}\n\n.CodeMirror-gutters {\n  position: absolute; left: 0; top: 0;\n  min-height: 100%;\n  z-index: 3;\n}\n.CodeMirror-gutter {\n  white-space: normal;\n  height: 100%;\n  display: inline-block;\n  vertical-align: top;\n  margin-bottom: -30px;\n}\n.CodeMirror-gutter-wrapper {\n  position: absolute;\n  z-index: 4;\n  background: none !important;\n  border: none !important;\n}\n.CodeMirror-gutter-background {\n  position: absolute;\n  top: 0; bottom: 0;\n  z-index: 4;\n}\n.CodeMirror-gutter-elt {\n  position: absolute;\n  cursor: default;\n  z-index: 4;\n}\n.CodeMirror-gutter-wrapper ::selection { background-color: transparent }\n.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }\n\n.CodeMirror-lines {\n  cursor: text;\n  min-height: 1px; /* prevents collapsing before first draw */\n}\n.CodeMirror pre {\n  /* Reset some styles that the rest of the page might have set */\n  -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;\n  border-width: 0;\n  background: transparent;\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n  white-space: pre;\n  word-wrap: normal;\n  line-height: inherit;\n  color: inherit;\n  z-index: 2;\n  position: relative;\n  overflow: visible;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-font-variant-ligatures: contextual;\n  font-variant-ligatures: contextual;\n}\n.CodeMirror-wrap pre {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  word-break: normal;\n}\n\n.CodeMirror-linebackground {\n  position: absolute;\n  left: 0; right: 0; top: 0; bottom: 0;\n  z-index: 0;\n}\n\n.CodeMirror-linewidget {\n  position: relative;\n  z-index: 2;\n  overflow: auto;\n}\n\n.CodeMirror-widget {}\n\n.CodeMirror-rtl pre { direction: rtl; }\n\n.CodeMirror-code {\n  outline: none;\n}\n\n/* Force content-box sizing for the elements where we expect it */\n.CodeMirror-scroll,\n.CodeMirror-sizer,\n.CodeMirror-gutter,\n.CodeMirror-gutters,\n.CodeMirror-linenumber {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n\n.CodeMirror-measure {\n  position: absolute;\n  width: 100%;\n  height: 0;\n  overflow: hidden;\n  visibility: hidden;\n}\n\n.CodeMirror-cursor {\n  position: absolute;\n  pointer-events: none;\n}\n.CodeMirror-measure pre { position: static; }\n\ndiv.CodeMirror-cursors {\n  visibility: hidden;\n  position: relative;\n  z-index: 3;\n}\ndiv.CodeMirror-dragcursors {\n  visibility: visible;\n}\n\n.CodeMirror-focused div.CodeMirror-cursors {\n  visibility: visible;\n}\n\n.CodeMirror-selected { background: #d9d9d9; }\n.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }\n.CodeMirror-crosshair { cursor: crosshair; }\n.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }\n.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }\n\n.cm-searching {\n  background: #ffa;\n  background: rgba(255, 255, 0, .4);\n}\n\n/* Used to force a border model for a node */\n.cm-force-border { padding-right: .1px; }\n\n@media print {\n  /* Hide the cursor when printing */\n  .CodeMirror div.CodeMirror-cursors {\n    visibility: hidden;\n  }\n}\n\n/* See issue #2901 */\n.cm-tab-wrap-hack:after { content: ''; }\n\n/* Help users use markselection to safely style text background */\nspan.CodeMirror-selectedtext { background: none; }\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = {
	"_args": [
		[
			{
				"raw": "escodegen@1.3.x",
				"scope": null,
				"escapedName": "escodegen",
				"name": "escodegen",
				"rawSpec": "1.3.x",
				"spec": ">=1.3.0 <1.4.0",
				"type": "range"
			},
			"E:\\gits\\rgss3.github.io\\node_modules\\jison"
		]
	],
	"_from": "escodegen@>=1.3.0 <1.4.0",
	"_id": "escodegen@1.3.3",
	"_inCache": true,
	"_location": "/escodegen",
	"_npmUser": {
		"name": "constellation",
		"email": "utatane.tea@gmail.com"
	},
	"_npmVersion": "1.4.3",
	"_phantomChildren": {
		"amdefine": "1.0.1"
	},
	"_requested": {
		"raw": "escodegen@1.3.x",
		"scope": null,
		"escapedName": "escodegen",
		"name": "escodegen",
		"rawSpec": "1.3.x",
		"spec": ">=1.3.0 <1.4.0",
		"type": "range"
	},
	"_requiredBy": [
		"/jison"
	],
	"_resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.3.3.tgz",
	"_shasum": "f024016f5a88e046fd12005055e939802e6c5f23",
	"_shrinkwrap": null,
	"_spec": "escodegen@1.3.x",
	"_where": "E:\\gits\\rgss3.github.io\\node_modules\\jison",
	"bin": {
		"esgenerate": "./bin/esgenerate.js",
		"escodegen": "./bin/escodegen.js"
	},
	"bugs": {
		"url": "https://github.com/Constellation/escodegen/issues"
	},
	"dependencies": {
		"esprima": "~1.1.1",
		"estraverse": "~1.5.0",
		"esutils": "~1.0.0",
		"source-map": "~0.1.33"
	},
	"description": "ECMAScript code generator",
	"devDependencies": {
		"bluebird": "~1.2.0",
		"bower-registry-client": "~0.2.0",
		"chai": "~1.7.2",
		"commonjs-everywhere": "~0.9.6",
		"esprima-moz": "*",
		"gulp": "~3.5.0",
		"gulp-eslint": "~0.1.2",
		"gulp-jshint": "~1.4.0",
		"gulp-mocha": "~0.4.1",
		"jshint-stylish": "~0.1.5",
		"semver": "*"
	},
	"directories": {},
	"dist": {
		"shasum": "f024016f5a88e046fd12005055e939802e6c5f23",
		"tarball": "https://registry.npmjs.org/escodegen/-/escodegen-1.3.3.tgz"
	},
	"engines": {
		"node": ">=0.10.0"
	},
	"homepage": "http://github.com/Constellation/escodegen",
	"licenses": [
		{
			"type": "BSD",
			"url": "http://github.com/Constellation/escodegen/raw/master/LICENSE.BSD"
		}
	],
	"main": "escodegen.js",
	"maintainers": [
		{
			"name": "constellation",
			"email": "utatane.tea@gmail.com"
		}
	],
	"name": "escodegen",
	"optionalDependencies": {
		"source-map": "~0.1.33"
	},
	"readme": "ERROR: No README data found!",
	"repository": {
		"type": "git",
		"url": "git+ssh://git@github.com/Constellation/escodegen.git"
	},
	"scripts": {
		"build": "cjsify -a path: tools/entry-point.js > escodegen.browser.js",
		"build-min": "cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
		"lint": "gulp lint",
		"release": "node tools/release.js",
		"test": "gulp travis",
		"unit-test": "gulp test"
	},
	"version": "1.3.3"
};

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = {
	"_args": [
		[
			{
				"raw": "jison-lex@0.3.x",
				"scope": null,
				"escapedName": "jison-lex",
				"name": "jison-lex",
				"rawSpec": "0.3.x",
				"spec": ">=0.3.0 <0.4.0",
				"type": "range"
			},
			"E:\\gits\\rgss3.github.io\\node_modules\\jison"
		]
	],
	"_from": "jison-lex@>=0.3.0 <0.4.0",
	"_id": "jison-lex@0.3.4",
	"_inCache": true,
	"_location": "/jison-lex",
	"_npmUser": {
		"name": "zaach",
		"email": "zack.carter@gmail.com"
	},
	"_npmVersion": "1.4.3",
	"_phantomChildren": {},
	"_requested": {
		"raw": "jison-lex@0.3.x",
		"scope": null,
		"escapedName": "jison-lex",
		"name": "jison-lex",
		"rawSpec": "0.3.x",
		"spec": ">=0.3.0 <0.4.0",
		"type": "range"
	},
	"_requiredBy": [
		"/jison"
	],
	"_resolved": "https://registry.npmjs.org/jison-lex/-/jison-lex-0.3.4.tgz",
	"_shasum": "81ca28d84f84499dfa8c594dcde3d8a3f26ec7a5",
	"_shrinkwrap": null,
	"_spec": "jison-lex@0.3.x",
	"_where": "E:\\gits\\rgss3.github.io\\node_modules\\jison",
	"author": {
		"name": "Zach Carter",
		"email": "zach@carter.name",
		"url": "http://zaa.ch"
	},
	"bin": {
		"jison-lex": "cli.js"
	},
	"bugs": {
		"url": "http://github.com/zaach/jison-lex/issues",
		"email": "jison@librelist.com"
	},
	"dependencies": {
		"lex-parser": "0.1.x",
		"nomnom": "1.5.2"
	},
	"description": "lexical analyzer generator used by jison",
	"devDependencies": {
		"test": "0.4.4"
	},
	"directories": {
		"lib": "lib",
		"tests": "tests"
	},
	"dist": {
		"shasum": "81ca28d84f84499dfa8c594dcde3d8a3f26ec7a5",
		"tarball": "https://registry.npmjs.org/jison-lex/-/jison-lex-0.3.4.tgz"
	},
	"engines": {
		"node": ">=0.4"
	},
	"homepage": "http://jison.org",
	"keywords": [
		"jison",
		"parser",
		"generator",
		"lexer",
		"flex",
		"tokenizer"
	],
	"main": "regexp-lexer",
	"maintainers": [
		{
			"name": "zaach",
			"email": "zack.carter@gmail.com"
		}
	],
	"name": "jison-lex",
	"optionalDependencies": {},
	"readme": "ERROR: No README data found!",
	"repository": {
		"type": "git",
		"url": "git://github.com/zaach/jison-lex.git"
	},
	"scripts": {
		"test": "node tests/all-tests.js"
	},
	"version": "0.3.4"
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = {
	"_args": [
		[
			{
				"raw": "jison@^0.4.17",
				"scope": null,
				"escapedName": "jison",
				"name": "jison",
				"rawSpec": "^0.4.17",
				"spec": ">=0.4.17 <0.5.0",
				"type": "range"
			},
			"E:\\gits\\rgss3.github.io"
		]
	],
	"_from": "jison@>=0.4.17 <0.5.0",
	"_id": "jison@0.4.17",
	"_inCache": true,
	"_location": "/jison",
	"_nodeVersion": "4.2.3",
	"_npmUser": {
		"name": "zaach",
		"email": "zack.carter@gmail.com"
	},
	"_npmVersion": "2.14.7",
	"_phantomChildren": {},
	"_requested": {
		"raw": "jison@^0.4.17",
		"scope": null,
		"escapedName": "jison",
		"name": "jison",
		"rawSpec": "^0.4.17",
		"spec": ">=0.4.17 <0.5.0",
		"type": "range"
	},
	"_requiredBy": [
		"#DEV:/",
		"#USER"
	],
	"_resolved": "https://registry.npmjs.org/jison/-/jison-0.4.17.tgz",
	"_shasum": "bc12d46c5845e6fee89ccf35bd2a8cc73eba17f3",
	"_shrinkwrap": null,
	"_spec": "jison@^0.4.17",
	"_where": "E:\\gits\\rgss3.github.io",
	"author": {
		"name": "Zach Carter",
		"email": "zach@carter.name",
		"url": "http://zaa.ch"
	},
	"bin": {
		"jison": "lib/cli.js"
	},
	"bugs": {
		"url": "http://github.com/zaach/jison/issues",
		"email": "jison@librelist.com"
	},
	"dependencies": {
		"JSONSelect": "0.4.0",
		"cjson": "0.3.0",
		"ebnf-parser": "0.1.10",
		"escodegen": "1.3.x",
		"esprima": "1.1.x",
		"jison-lex": "0.3.x",
		"lex-parser": "~0.1.3",
		"nomnom": "1.5.2"
	},
	"description": "A parser generator with Bison's API",
	"devDependencies": {
		"browserify": "2.x.x",
		"jison": "0.4.x",
		"test": "0.6.x",
		"uglify-js": "~2.4.0"
	},
	"directories": {},
	"dist": {
		"shasum": "bc12d46c5845e6fee89ccf35bd2a8cc73eba17f3",
		"tarball": "https://registry.npmjs.org/jison/-/jison-0.4.17.tgz"
	},
	"engines": {
		"node": ">=0.4"
	},
	"gitHead": "9f2f188419f7790a46a5e9a6c882834d0fa16314",
	"homepage": "http://jison.org",
	"keywords": [
		"jison",
		"bison",
		"yacc",
		"parser",
		"generator",
		"lexer",
		"flex",
		"tokenizer",
		"compiler"
	],
	"license": "MIT",
	"main": "lib/jison",
	"maintainers": [
		{
			"name": "zaach",
			"email": "zack.carter@gmail.com"
		}
	],
	"name": "jison",
	"optionalDependencies": {},
	"preferGlobal": true,
	"readme": "ERROR: No README data found!",
	"repository": {
		"type": "git",
		"url": "git://github.com/zaach/jison.git"
	},
	"scripts": {
		"test": "node tests/all-tests.js"
	},
	"version": "0.4.17"
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(25)(content, options);
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
/* 70 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff2;base64,d09GMgABAAAAACuIABEAAAAAcmwAACsqAAEEWgAAAAAAAAAAAAAAAAAAAAAAAAAAGnAbDBwMBmAAhWgIIgmCcxEICoGzUIGeJgE2AiQDhGQLhGAABCAFg0YHlUMMQRs6ZDV488Qq0B2go2Tv4hiJEDYOAKT4iUURbBwARG1d9v+fdHTIGBsO4PprWpWJSTQsMkvKsuphe0H1AUfhtM5sWFkZFiZbp+oqK9BL9+iE8jXIFXZC+NeqQxjTVuIuOkwgiGAi8i0+IBSPzYSJ8mTnbns9vFmSC2R304ZA4ZvI/TFJTNpsX0z0KybR+YS/RU+xAR994XIIJwz7Jbkd/6Da8M0HleZW031IUpTDP/3R79xz/7pW+NImkbgvEKAkkjUercPz2+wB30SdI0RElMgPSItKSJeKhRULe5EuylXc5rbb3bldJHNRF7XKdinR9yfuPfDEEqNKp1j5lVCMqlzlHjwfc5tcX2hv4ohY4/pvmVRIgZjMfx2buNw9iL/RHLtFGHCW///f5nvOQG0faB3yVPzO3IRpF3HaReVTFH7Db8QFIqYUw0NNIxyQ3bcGFDCLHwAvnX0F67R/qcPusnCRxAoe9v+d/uu1JUvW9pC9ZXk9+60/OtaGpCiohT1hXQQVpbAAhvUEkAI0ZoMDhJ8ft7nRKqWYqrNFSzJFvAd8F/Gd6MTANq/JD8QUQiA0g3OKSkyYo7wrwwiCLaeUAV6dJ/qLPcCdNMCDDxYoX2I7vlMicWCNDfl2YCjBkk2r28XcOiWJhUQJHBnWKpk+c0zlZd1Kc+sJdplyS3+ohFKMX5a7urmFq/v3Oq1WsvQW2IfQEfcKVFsdFA1gUfp/QfwlK46caDeynb3EE8+swg5rUQHSMoXKYzAseQ8Rq52rriiB2uuru46qg//vD5OTA9s4E2tkZ0KXIAJbvqVXsKVMOPYm9IEDFuB+pZq2vwvlWMbpVXTgv2S3sqvS1fNwCw4ILFcBHyA6po9K6bCEZo44Uk6pdOXOtTvXzrUrV72h5jIGzB9XMM396DGmmTsyfphf1tK8sYoEkSBLo4HOsb9f5WO+en73dnuyrgZQSTCBBJze9QkAbMCTKUgmeHYjgNKNAI50CFClGgJ0mwIBlqzcCLDCjQBr3Eiw3o0A37uRYJMbCXYcGgkOOQwBLh4aCR56BAE+0IhtAaueoLz2IouySBQA9kwI4JXehIRJQgGIjopDQSgkErpvMAfgIeDpEX153H9EWuB7kE8aDfRchr4ZiKUA5NosAxhQACAASC6FgoD3BoQ8BXCjFQUSEKLY4ktdJqU7C7MkXyeSS7mbh0NSoeEckvFITJUpW2poYQY8Mjoe/xF6iZd7tTd5q3eVgxGAkMWZYBoVpfoqv+Vw7uTBpK5uWULGIKLCgA0lDKcbDmnF/OiMHl2n9HTa/4R/u81O/O9XPDTu+cdT4p3o+ylRrJCPhzMEuPVzZwK0sgAcMD67mYpbvWVeEzMLK9TgH0NjMBeKuyuQ/8ueLMWzjMAKQiuJrCKxmlgvqTWyrZPja7m+kaeP0noKX1HZQO1bGt/J9z29n5j8yuw3FhFWGzlsYuO0hctW27ht57WLxw4+OxX4S5F/FPtPyL/2KrdP2H4VDqhxRJ2jah3T5JRmpw131jBntLukzUWjXDfaDWPcNNYt49zW7aHpnprlhdnme2uhdxYYUOWQKR7hW86uX6WDxrtjgrsmumeS+yZ7QOsH1Q4b4ZwOl8msJfclnR8Z/MzoF36/C/hD0J8K/a3E/0rtVmaPesc1OKHRSSOd1+KCTld0uWqqx6Z5YoZn5nhpkfdmeq7HK3O9Ns8bOEaFAJtBKQmIOxKQmpyeRC+i9j2U24Hn14E472oLYsFHBmdsNx47jDiAqrhObTcQmXGlUExNxgii8igPecVAnKmHzaCuFHMExTT7Q/RiSs9MaavtoZgpjVW1EYhJUWOCup5iISUCAqupaBpc1Ii2mPRaUldcnKfCBTFQXk8xOqVZmmlGa/LphDsVdXVQIiiWN+QLRbqNpIjWWEyiUimmyN/etbzGSysuFvBHG4lo0cSmVHPpGC36vPbFKlhPIBTRkiKg+NtTsdCpke6eHlKPC+J+ZdvB35vxIgBoA9vBBgWh3LQd0e1t9naXTHrPsz0TmagVG/VScUYgZNpT1BuLEgAyOJgAQIQAMAxghwCbjcDhbWzqZ2B6Dhi3ERWJFUTe6rMTkqEit5mh7KgMPmH+7AyCBC3rcyJvdqKmh1KdImEjHdvlqG5Di63apn6b0oIsW9XTenUu6FCHoEPAT5GJAgjQ3lGxOig87e2YBWr43CrPCQGCGzMQIoTHs2DyKKVVZLD5pLHk2bidEz7rudKeZc8mlUqnytr8ti9mx3mvWD1j67WdNnu5nJSi7jmtnjfeP898J4lqssJOJ7ut5YnT/TmCI31PSImNYxGZLtQPB4zFcVzVHbKZhIAxILAKZZq5jCso51/kuMUXl8VRqgz3u3mwbMtwO1SCZUEpW2uYZsBqp/0ohbPKhIJffoAd5owj4bG79S8INo5gHInP3OsHSEb89xphXiemI8wQ5vS7yUW5KN3fMRb7bjfD/QSDxahVgQzZvDjhcBnQ8hHYTXAKAd10rin5XOw2QrB8Irm/tkpAVAJ8ioZInKS2XxJM0XbnvLCfZIc7BE7l5bkeosAJlhP3bvoslGFdTtKosmu+DfN3sSLvLbI5SPZRtGCLTTE/+WDgoxNdC+UqQQ9gc/JWfe9hq/o22M70l3qKuXW3nqDkBpqx2CGz6jrQRkZbbgfBXxCcgzGNEA7MeKBqaItPnDJWN3mYGyjCXVLCe7SYh4fGlu/hy/e2I9eJi0eKT8wmPCUtfEZLPEEHXeymH8nN0eH91pbOt5pnIVw9XzM3NzUxlmAhCnB4e+lQta7rEvgOr69PN+qJxYOVl8G1MuSExJ3+msXixH7UNpGQgCFwr45Jl+H1uyQrG0T51lXUXZDf7sa5qJESpn2kv3WnKXGTuK+FuWEZI0+0UYX3N7i65bXoCa7fhc6MCaHOX8M783VHh6PkKhcYvSmS7HAnh5PaRoJ+ITV0G6HgOE9kEO0/Ot5BQ1LmB2vd3NBTSp/rnIbEB1v2SctbyrwRpHoFXJykA9liikIHPVckT8gjk0iNhaFRf+Cu9Jh1eEhVjyCobmYMpXd7ldVNi83zhLlWe1CbS9BUyDt8c+m6DdZaSAgUcpti0vnIuU5m3dFNfmFhavhZI+NYrtohdraPeFjFtPsGYaeCmVWU/mf2+CQhb04FCje6InGtAxcQnWqLAAnTMifwxdgNDd6MTwaFnRsiKiVSFgRvnO6QSq4ZklpjsHZcJ/RI94fRoByVk9pC+aKy91TvJXzCFWCHNIylb3GANQu58+4SB3TU6pW6TLE/gd/IxUrL+TI0KUpZupcYzFLJ5+LAaIkLvjDVM+d0zZOkyHEzGgRVZWVUsL62k0IwzGti+abaycPzKu3pB3VXac9Yg7OP9+vi+1UBlXDWV/Z0engHsI8jm8T/YHs3ajsPMoLD+QqgVXt70dYmu3wuFJufV6rTG3Bag5G97k1WSzgqE/7oBvs7A5qd/dyhx/DQq4Sb1lD5CwtVXMdefHSI5UKggEzI/V6rlgRbMQlyTNxClF6CYBHt9Vt00UgPWwgLVHbmrlWpybUkZlZ20baAcb7AbqN289Tp4M9YMWtpSRa2u3M1bDG8HOL7jTvwbOPrFt7zktLA18cHMuFJfZcDlbI+tdMeN9+tRMwUhpApanSMmufVDNsFDd5uWvYzPH+xM/xZ+STI0X2Ui9qfkA35d/2ycbnNCt8QiYY/9LqG78nhC1UT0rylgg+/Z5fgpLEwbq8QVCH9gyPPgSQzNWsN1nJgiwMjKVVJv1gk/+3Faaub3Urqh4cK+ks8BZ9WrNaiJBKDZFXTYy+za574nveJxR2Z2+KnHyNb87zV8i0xXjaDx27WX7gpiLlNCFnqd0J5i+EqBRinvpNdMMU6z9hGllhIyrsGK8c98S5fTKzdRrIjfADkICknfCiE+XWMOAjHL+8uUNYt0G7wJy5T2aQM7EYtHpAx1NyE6zH8pgzkyIzkAZkR4UldzVNniST3rRAEV5pfXGJGU35bVwSezPJlesJCXXjspWFyeZXgp5qpPdj29xu3w07PGb+jy+wIYX394jXA4uKWXKylmDB26x7eGhvXsM5TjY/suKhxHhDaY9jbLyb+3jUILajk64BPv63hL9lL1TykFJHCDaxZYBDBjFL9RAcrcbCVN65YV6XVd2wMv1BfhPAmzJqLt0veVio3FHgl12iM1l311FJb79jStbaliDjpmLk0JRN/Ro2p6+xNKlK2izUuWFMPZPdcM6Qyw1s9HpbxU/7XrPG5HWlGxnsrBKrBa+Xc39KTPB7KRUGL/Yqi24gp3r8lW6/dkwzWkiaK2Ep0/ODunrnO53z4TIqcrYq9v4jZ4bWa5BnJCxdQYzQJLJaplj9nx+Sd9X+LgmKv7jv5AO0yRdU+kINv7aweUNtetiVoyV4VnBzcPJh9U0d2dU6Tqn5oTL566aVll/4OTL57pPjIpLs+onWatB6S19umTbOKynWjHiq+uFw9Lz6jJjpz+AA0UN7os/k5/RPN3oJLC8P+0g/pdBYPPNFVNCxLqyoWHr3V+wwWOhlyY3qVWpNeLTc5mUKBifnixfAqcb6mUeAs5E3KDS78annvd2vdrHGOYAvftr7X0DpyzsSJI6e1WmNz2xcuN+uODLEMeeKwrHPJFO80yVnYvCFq+R7elVtjj4uy7JuHPa1aYnIwRfTN1J+mmY7hBmugVtMgcBRyJ7ncC4NYDDa4KCjHyIO2sLkP1WfuLV6cll7dzCUHLVyWRWv3tWPN9X9l4b08P02d0yhNlVctDNpQWGv4yLs7y8v/CLZNPxYcNmOh32ayfMHzLiwrS6E0QZlNpSlliyxtODyLgUXBc4s/CuJe8OaiULJsPK7N7PIvLDi1VjcDmRzbLAt6Fh3dSUxsvbTIU8xD55QK9SHGJI+HMUFfWCrIUZRl6QvHnXB7GJP0oTJhtpV5GjYTqjVqQhVsOMVk/R+EYOdbk1ANm3fLt4ZGuLwarc4rdY3AONfiuvCBRYckAcxBqknq8pTqk78lBzoXGKv42WZHnoiIGejrKefMIc1awWAOLnAThZoGvnTLRydFrDJJBKna2MXWUvZFd2M9g51p6C9Iz7aOkR6yIWznzJD5nD0o9eCD3ivFme3YjAxsCc4s7fWttFCqvvSSRCIf6VdKlUUatyggW02MdXNQ3+M8K43PlXqwZ+G830OcGA9HvNpTuajMjhm+y4kq2zXBgilxIe5f3BCq/pdJtysgBdPBDP9T+HrxPAhqteKRqR7zFkkLoctyQe2dyB0e5M0glcfEXjyGoouKGLi3pNiaS5TayuGlsCFah1pYLZDR+v9d4mHh0/9txMNexpJuV9TxN+/Jim7PczUctumqqQpVIffS9PNaMgs2pSFIRhhOM4B302CBnXZf1lHNzs6tpFq07HCu8rmSEVbpPHSewEBNRxbv8u8ztqCu+PkCkZOq0JLLg+qQvcpo1VpfJN2nUJq7CYZpxucqbtioC9GEMh9lLjkgTYxNnRB9GK0ncHhmAm53dilVmR2mmbWc8lk1NofLmFGz9azBsMDL8grdsCH5wzQsvSGnAq9/RfvenE6eVQ/lnc4kHOuHpmbxOU9VxlQ258P+/KmITRT2YdiYwsZ+n1NEIdtFI8IlUg2t3CSoIWmGdZouNAu1ajmReLmbQOi+PJ5CuU7dX7bX/y+qvbFInlvkra7K8tNNUr0qxS73mgL+uqa9/htQ1OCF/r7IKOt/0T5yun+Ed+8AL/ucD1q2C72I4/YWFd34Vq68rW1BDY2D7UMDBWquNNtpK/MUFMrTgsxKPeMUabIrwtNXdtsY7YdCWuIpn6tZYZ2ukCoSrRidjhVWq6qgpbQ3I6iE8YbuHjq9pxtvgGG8cUppTsEb5YtVvu3bUSUjDUbSuWaMeSWbrKjV8Bxkf7Cla345Xa//QEk38kL4kJ6IOZ9GXsJw4iSKBkZO5xsXSUC70L8jKcPH0iVXp4bzczI2NXhTZNYx/CO2w9/M0cyF4mcZZz81PL1LjWx8RqePX0VCe5I5ckv6eoxN4HpniA5C9kJ5bsgaKvBHU6JXwwZ4gc9fF3M7mJdajdbpoKpEfVveB7PyQ3uirg2qitf581LdTbdrcl9Xo42dUAXaMEfxqrozMGNJDVr6Pv3mjTuBUQlXM2w3oH/TrJGmBPfpxJPqdC2Ry9iRrC0185yjOIYv+a5RIcPhFHuD8/+9cAzHGcbDnfb8sA+r3ptwfycEhyiEPUMJgjqmpqBcb9aVKouG1S0ULmxXlwRtipxsl9AZPv3YEu/xmCR0q1ZUQlAc2OiCnVBkl8Q/dAMaFinsv9bsE0MI5LxXOMIeTAJrRZnGW8Aez4OztBvt4c0PMS2YlSNNj+Ko9ZEJNkJdwS5MvoBpWkpdT99bbCbhDIaQONzcG8db3bWtMt1s+eKmFzZ4eU1+3fXRRg32fxtPFd82iNv7y19YwZQDO4WzS+OhoyJefj/z3XUTM9AdTZZV2x78jeOM51HzlmsRZbmqcPpYXUr99s6o6HNTc87xFyQSzgxNERTuPfNz53D/JiEVLiiiK91VgRRT5xdFOF+VlU3Q//2QI/Ozv3o1D87gf5YQ7gcexpm6Vh5fyDc6QuGvChqjJJ23Ld2Ob1xv7Gi0fCR5kzcxDf5vZf3sEYjmaRP9zJdEK88DEXu+JdiZTp1WptsSeud7uqUJ7CVaB2yHKF8v+6DZZ23vL4s/YJJL4/4z4lNgSVp0k69LbywcHdPoyn5awMnLLc7SFFIneDz0idpQqVChCAnVIep4ZxQaWorsCkzzcrWUOYZU+926aCeZsBWTkh66cBXLyoNxp1p23huRfF9GM35tyzIT07SBykJnfpmNYqUVIAzUQjZP7KDyiUXZKnq5Suuh8uheWhaqTq+08axQub/8lOiUbcP3FUn3Mylj5xO07IC97LF61R8WSBmLrZmTyMXKXEbJUVkhUpfofxX9mt0M6waIT9jX91UyYSsWzVpuvXDUzOmwm/Ibvy/C4pLw7KvS9cS0rSl6UvjHSalzxzT/kAXy/QP9kLOU39wwyO6cZpL13Qg7jOsXhHqxmTayjkzWk9P9fd2+huLbsjv+vhvCptt+MMLnxLvT0/YRU/XU5IRb/MN4s1mHePmtYQD9TYlFOZ+Of4iL8PPfydyMLUmUegq9l8LJzHU4uvS0BCXDI5F7HBVhWYCrvypj72so8d8xRjtG8BTRVIGj7McWz//lKJbfttMrqDXE4VxVnN5qs6O2LCCjO5ss98dgv/ooH3U9QFdr6aV5cXwKaarzwPvJQsWsCCewZmwWJ7Qsmvcte7d7xvw5A9yPb6K9KfZTNVszcu1RLOHFykxoTyS2pNI/0NCdxVU+ffO8EGDtd1xkJcuCOfzzmvnpjOcbv8rcckOOsp25m0JkdlzhjFyQvzztUXmKvesyP633zqdTe5NlfHeck3ChUWlCcYsSajwNwbQPMfoM83CkGr2Yho6K1Tac0k6vddLbKcwh7IAwgK5m6S5c23wyYTgrabyB5lrd1tP1Y/1QdD0LXTUEV0vf1IltvUeRST9W71V+YFSv3YgxW3ZLHqrCuVET+IVQhuZnd5XAg/J1YmGyocVJFGmC8NHP9b/AeqNWhq32HRH/6Zqf9Yv4u2g5wxSGZq1VpZUIXEZYod4ALTs2DmGNYqHqlPqNkOyiysqzPgtWPm19pntmZ9kglZ1Zf12fVN3HYZ90n6zwwUFBuXLHnOkgDD8zziUycfu0DoZ2hxMnML32fO2Q2qENywSuod+6ndqaMaJx4nHYMRv+zSBMeZpG1OQYZek5q5eN5rugX/JKoPrLbGdJZRk3XZd0j8q2LEf5aavFqw0WQ2Hv11EJMXFDYs4o8zpaKfZDDkL+foQ5PZvboIsZEheTGKXlWhd3t5qGsM84bqyD8RQpHUw7aswyd3s2Tmufn6jSq4tia1W1+IBYGaB0WM2Z7XnBgERRp6o56eb9mtj7FYuvZ2RFZUr151HFN2gZMGX55x86TX912YyWROec4a3OuZaEs6lRbiGjVl4jKxCpA9Qum4XSoQoUSs1V8sobbvjPpPqMl0Nw/jXj0c61SevbbWIL5CgrsiYeRYb3fCg2eAIVuY4YvgPa/kcZ0+kxftX6Uqd14bWceexYyGUcqoUT83PL69Sz092IoQ1CuSjrIWUNor3BL7cUyCnrjZVtKXxUvv1YSfHSfHT8Ukm4qMWE5qry75NL0Op/TCNeGB17zFy5NF9fDfk+84l9/1S0eHcy6A1QWuJavednDubYtNaEzBlC9y+v9PRrnylkN+zBDfatS0oqzs1y/87YvDJKcrJcf/Aii9/kvklEozADuQOJPA317pvPBGm+n4n5g/VHppTw+c1dIu+/jP7LbxkSSwqNlmKRMN5e7ifybOk+MtmfnohqJvL2pyamEsLTXgJxEw86Uq8SCFdTCU8JpvwACqEWj3z6QMpP+JQfU/A7fdiuL0L4lJ0PW/1P5Gj3qJdYth+5UIewcFgpGXcmBEjRV+vxiDwyVwLDYi5X3IeQTMf9kUb8AxePmPYHgbeTq+Fy8uMueDhcdwd2J5GwC4vbRSDuJAzZbytaoDi/wArNyX/+o2tx+Vv6qkGgRUn+7pgXz61yqZlIMkg8uQDvun13I0nIPkFLmdzl3Di6E8LhThjxpFSkfPpoYWbDTv1jOqPPE3SWjEFmr+/8XTLvMOXOqY9RUpWGTteopPhHp+4kfvvj27y3iacduFVYxcHh5uCwc1bi5mCN4I63iF11+9hb4VseGjV3IGuAuZhbayUONxuHu+XfIfJpWcXDLVV46uvzKNMUfEqYePrW0paRRtp46U8XN/6mQv0UeqouqTdLYHV4pw88TCY/qBjplRCqS+ZVHs2rr/e0P+jW/e/+PiQX/9JibBlZOv6BdPe/labjlpUt6LEyVt+K1u+Pqf6jVHcIQ7n9Jbh14QY4ACIBKNM6YyAKfmfpAVuJXIPwv6+sdwu+4UC7wYMTZ1hiS2dv+DEuHppqWCcB7Vng1k6c2TaH9wWuFsjxuKE6/hDXb778ro238JrK4cGfMAf+gy1IHtbuiBWrdgHTcQIeYoRqWW/k9lasictOGrhvQNrxCDzEaAd+5sw7UW0GC0IWXFh6iFnFyKvl73lWzQ1txHOMgT1rtbPB1raBW/cevPnoM1cKx+aWlLUUrSV/59LW3nVzlarjhniwHXtBHUY7xdEEu1jYkX/R/o66CXLYNU2FICtdOGPjlJw+BHXq3Ld2mJ8cAFDy/8G4JLwGGC+Kn0Ld2zjF8TeiDkkN/8B/k8EsJBP46tT/ul/m8PUfizyNHyAD//kemP//qU9hZRz7iClYZhejqjnLfm8F5jDg1B2OJdg5xh+qg4H/YAvMuTbTvCCswZCFXUy6JZIGNec3PDgE/fKBykyyfJrF+IX9YJ2yXfw/jO1J/QM2Tt24s/PBu09c2IOCmQUFx6DYYpC/pjz8CDO7iiGKU8cs2jm/8yk8Pb9kT/r6MP8d9Acnd/m///x7cfx//pVsfPAaeDkAc4qhA8nu9FVh0Fg5BYDMamFBYbiLGNk7GZB34A5ATCVOGNi3HHlVfCuAWVQ2PtfEYvAAxiHx6KLjQp52yIErgLyrFDAg8cvR9FXzGEi16kMbZpGZgGQehnkWsYaQMSAdGFwGrZgqU0D7SAyYAcAokgNI1h/FouQI+CqSwaShqCqnGJq55Hi1gFykiuZ64DC8GEUIMeCqiJUgVR3uGsgwKnIXMFhhwKxKgEVIFhIYBAowcmBP1TiUFDAgcRpWlQDmZr7VjAdAN2kHxApgAUpIKyCxKPmwMtpF0HjZpOgASZUAJUeiQZKLpzwqCrkEYbf7OG/2SO79pImCM4Cq5IP7VowQE9JEAWAJ7D7yftZ6Znscdksspz08ZYnridCoMuVFNHIfYTr7LwHyYCLkrAiGba/M7v1fm+MUTc3mZmpEsUthYutxJwfg5ectC88BjByGt1URRK59KPl5QTkgGnkckYwfTXz7TcNVRDDxUKmmu4TCbjhQftwSIERyp25EpKo8CxHwNOISLhMQllurJoWkVUJVeZ6aAQYcSoUqDrlBc4DSVXokZAAIEtGq1VWpeWcEYQnshrNwgD3+K+0teXbFB7EA6MUGsHEncZuyqwrA/plgIXeAz8JLi7AA4jw+s39H6Yr+8QUdeG+Bu2cA6vW+ZILhgRD67bjgRw4k7+zZu8mGPFHHNSpU6DwMvugo+hkVab0xikfo0HVb3krSJ3MIpfNah4y84M4BmnG4iBxFTAD67ZQA6WPRE54JRGesQ8cltkQalryeM3MteeTAPZMhqNdmoQCLwmVIbvrdfhvdUMRhPMsw8GMc5dtIbz7zRhZnmGxJrE/GYAoKvSkEmmBcxNEdRqixcxstEhqgL8u7DOUguU0RBuSg60aZACYnwyq52wWLgqLEursmBpME2enCFQJSohwI4oGWhCCWlSApEn1b9pqQ6ziCnDixJO4cmhbejQuKXnFRnANnTV1bgsxIE6+wjJd4790f+o2Je+WsO8rk7uGpUenemYUYxHFIC5r3j8IUhDBxdKBot1ihaJ9Y5QLHYjxY6CN+YEyJd2ayTUHYMpS0Gx2sM6HNTvZ2SOmMOo9FFEcOsdOlAcIocsx/OEclMJlgVVQLn4rkqsdERx6Wztwh37OxrHCSk3SmUck/btJ51S4GLyz2bKkE617kxEww87MkUG6RWbzLsxBf0TJRzDKQFq1RzzHNLJApxuWxLVoCwB4pbuuA9e+c8RA/4NE/TnCP7/jOD73jGlO3pcetpQzhrhYth738hY+eXu8fUvYczR8xb3gu+p63m0Un2Q8LDsHPJc3ZYiQ+AUfnOIyY6jBCbkSSWQBQpyXxbqWcFDYR63x+LgQgXwgQc4jYpsnUGlYUAYwnHnrC5HS4ISoP5LD264nT6Iz5PFYiCCEWQSGJK4TxYNS1hxytw9ODaZ4lCGcrZw91+qMpzMZJQ/jgstsTUvpgOkhBcLoLQlpYe3gYOovhueXcPPgsRpyf8tt7ufPtc6LDpw12yWHRHFmftNnaqjRuAiJGcpwOkeIOoeZr93+ufIpsK/UVqZk5DqdJJoFfIQAmN+OG7oHkO6+o1Fqp0Do3bPxGompNmBt3vVYwspU99xQ7v6uEWPiFo5DCSJXxItgbP0CgOlQ6mBM7C+AwNljcUhQPGc1KVRY1V81HSypaq4D6k8jJWL6WuT2Gqje6j9e0kCGKyCIkWr197B2IZXS900Az6WvfZiNfnDka0MwY2AORWC+tyMpbkKETl2OCHl0tJ5Jm4jMufURnGI8JvONIY/XysxIJsuAjq28G7LMbXuNXnMfmg+ZrO7lxa3adD9rArcpy5qAxp4c5QLZGQQdsx8bK1BT3nR+e/NO2Odw5D0wwVsfKfATG6UhomTk/wM46Op4WoU4/svitSpkkt66qa3z4vPdn5qD0GjrGSIJG6txuSw9JrGvc0/eZ7D9zmGGIaBaCG2eJYojawILrY5AzArzGnSmx+qqdm0Fd2J0eRpdYpWsfRNp6rntZFOiTVVzq3syZ0Qu+XtgOAOKqCY0JqalWmPKVKmecVuIUnLSJQ8LM7g8T7Y+IUuu8ypmhcITJP200Ld9K6RsySkhvvzcyAheAryxGjSKL2z5CGYlXMiXyJaNDZrDUfQMbXPzd4Rpe1b1idGaiA16/5ooPMag1vuKnN+O7vZQjvcWRFWw1SmGkwn2F5cN5XgFABkHQ3mcAkuKlLPsGutxqfX1YbqVXJ02bJXHLIBqnI5CUqv/TMLqZplCcqz4b6BTYzuj9gN6cFOUq4kJnNjHC/JOkOY6OhbrtIaK8gQJnhSj7ADI2dU/pT0l3OE6nUu2OnYauakFW0KUw9TfeFBYYP93StBDVqOeTEppD9O4WTXArtoO/KYqmUMRzEd8W1nd7ER7ZsqZ7oQsj9XihyBjbnpasYJKDlbO6exNcybKV6ikWgcbe7ydOW9YHmo0LRk/S+tkuKpOOXKJp14b0rmw7DFGOorxRI5BZOeCRkAOjPSjCFbeOzqMpK2GxlYttMSCVZeKNv4eQ3rDYXoHkTtiC7ZuyHHNwuyxv3G5IeRjy+XS3YKNznZCveip/5sS94dnm3nlNrBIS9uwAfU2atAT8UqLaABCpvWBxncgpZGmybmr5/sO2/RghuGmjdCcD40DAi3+Z6BditSpwxx7JhtKEHSwflLglYK+Rcrp3aVOQ3YpwuMeMLQnQR+vqwzcmnp/QhJuTRmXo1VPt0csrLOwL4B2UHRUk6mysjAFmBSFeGRoYW0XyZFtXpwbYSNMxtb/aUwziR0W6+8KHl7oLf2x4F7+jUkiWABYtcvdzjaWkhT94At8npu5TXYuEBQoYaGlE+LJ7fPsm8AwDtorOdgJRuRSOvNVZYN8R2xtBlqdvGl6IUKG2CnpNKIYj5567PdERiOLEUuXXZyttNAMaT6nXOk2SPp3qYfHLE3Fdd9kWJ31Me1RmOugtJj0PwH1+5vWknFElHcteGaV2kkfMl1mllmZ0zZLol5S+bdlvLPmFjwIIul5fPASv/Rz8+IXxCF0jbZTwusgiWMD78dY8EEea9de+ghwztaI4RdIvPDKAxWhflta+lb1kqx/CEUfCegDmacOURiBb5FYygvjw7QD7pe2AfEnmCI1uEXDW2mHnVBLEgwB6VONhCUD2M5MnXGaVbw8Zf4zwiG8YJX/bEkOCHGI0Rl7gTBQYJ67SSY3wiBiXwSyxfXckf2QMo4WbpbAk9rli8xZnZHp2TYXCb2nZLiYkpwm/KIEvhltojD+2Dfg3UYaPYCA2qgufx/UTRqj6cfDkJGVubyccf2wyjCnaGWPpUrNvQ9fMMucpg11nT2fiRHDStx5BALGAm03gv0EAQKCSu/PzU+GovohD3QPgfftqRx/chxqD5z+39i/r7ywBEgAgAPTc/6kBDP3sGFwh/j0okfOLDNEA8E8BMOgV6CDnUcGn2szivwgQqWUA84gHLDo+XiomVuWa+ajgj1WWsDJxiQViFpTnoyT6qOB4so64PPJcGg8qrPYU5hnOJDfFwbgoXttpOO4BX4hna3wna6uuSqbJLBzF8R6WUm03xa0H40H5pTglQ4XmYM0jPFU2dD1c6FWhhWqJzjybBeMuxb5Vowl4A7I1Ni7eavl1BbFKbkI8I/IsWPnnw+XY4QcPvfO99b602kYRPxb3PvDSChs8InB0eMBf/OqBs1Cd8KuIfA/99cUfJhrchQAgQgolG7HMHoUVAAJEx/e1rs9ByeENKA4gkMG+QoKknYVzKODE9yH+uSgwNVvGnCNwfv/PNHyYCAQwXAchRgbM8aHy6giEGxNcCZB/8p0lEiuUOjKRgjXpdGu3be9gJXJvV02QrOplWxUr1kZqz4hXZMTFzx7qNmIGiOnf70JZil3dEYAC4RNKYofLQD+gyHMlV0EnmUzSfeyg8St8ZkZ7sFbBGIiUpOZAKrbZ6aQhoc/h0jRQPrZFlTLdVOgqSTutPCXPHQAJUxCsv42bmgPz+IIsYWDumkSercjJU6mNVBqdyeKSR8IXCI1NTM0srMw1lHszLdvRr7j+/3HPXTxdbo/XUBhYuD54KQhSEf1/hje1dGQZMvtRUNHQMTCxsHFwwVEQn0AWIRExCSkZuWwKOXLlUVJR08iP4QhEEplCpdEZTBabw+XxBUKR2NiEl76ZuYVlu4DWNrZ23cGD3SfACCqR9lmTpzQrlCrPfkyj1el7pxO3d3B0cnZxdXP38Nd/jvrvCgJDoDA4AonqJhGDxeEJRBKZQqXRGUwWm8Pl8QXdJonEEqlMrlCq1BqtTm8wmswWq83ucLrcHp5e3j5QJ1OoNDqDyWJzuDy+QCiCEbFEKpMrlCq1RqvTG1AjZjJbrDa7w+lye7yee+GlV1574+27j91xUZykEIWKnKmAAI0XRl7XN8qNAgsq3FbvIqs0CdXm5t53vCUS1omcY5lARtQRC0TvhUlJNdUzpQkUjqr0zygTE6VrASqP86ea4m5aGz+Q3sygkV6MTb8T66rSa5uXDsnAGOquZDR0in34EqN50NDoYKqIdyNxsIGbJ9452hDDWJdtjtC/Lk5hsLNUGdxuXFdX46iK4CuM2xvYdWk9XjpLIJv7jmanG256eakav7QmhMgNVVOm26SQoYJIcKFp5GC+FepMw9cdgeXeURDfC03oVJiQ4YJxiNlxPoyn9nJdx10tIR+7ogoFgw4RXjgel8B17HJNmCZGC2/+br50akXKeIprNh7rEeb8habz+TBqlH5eFD6hHyxULZgsLjLksmBlJY1zA2d6gAVx1EJwXBrYEAdlwLDDB0iTStQyZL6EGOAjj/OnSZ+OyZVwNIHkmKmlYNusK2WzjBm7d994Z5nn19rfRWLM0pGUtYNy5jGlfimXAxJRE6CrQdlVqgJ1tx71sgAHEx+/skarwaDjZDpUjGyJHNt52FH5xbZd0AnHw6zbQ6XbQtjbHegz7+FAAK0gMCwNEFiwfQd2iw4cOMsZnhUHBYcBc/tEznD2wB64h6EH9pT5CQ684bvdH86ZnkVrhbG+uTcKfhDrVHoVnsj2S5kZNVseOB0aMjIqLphJ2OqLKDAYhOBgVBAbRL//30CAuATMZRCugHIVnOvQuR0Gd0BwAyZ3wuIuSE7qLAAumsDlAi6YIGQKwvn1U2IxO5tLmRE3M0suujA3NtX3OwxjJ1uLfC46RX8QSB6iH1ncjG1IbTZMxYHYC9gWl1bCILzW729MDC8C/rV+bUek0h+KIP6PfjCCWAA="

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff2;base64,d09GMgABAAAAADBMABEAAAAAbQwAAC/uAAEEWgAAAAAAAAAAAAAAAAAAAAAAAAAAGjobYhwMBmAAg2YIIgmCcxEICoG7aIGjXAE2AiQDg2ILg14ABCAFg0YHhiUMQRvuXUUHcmQeCCBiPzZR1OYkKh8ZqBmMEjT7/5hAhwxbNgPg9F4oEVVVQnRhaakqqwpG3NhUa9Qc6x5aJ+2s5GXHb0cPb8ByLvxy4/N4Eh3iIYRNrwHB1yEL/xARfTH7DkmCSOfh//eL/T7nDTPgD1FNJppIkIiexTOdxCIONJWJyLeQVO8SXZbMLHxUiS30Nq4PEQO0zXSgc3MWgkQdHHlUiQLSR5SAgFEYtc1luEq3+VEuXbSLcl0uqt9VDs5lAWySpgwHOOh1xA/uhX1h7OD+19rMcng1m70jnVoTsd8Ot0j0lO3T5i+h8DopQjzWr2q+dq/kwOuVff/AJuKZ6S9NElneVK1dCt0AV1fpakZ9E+DqcksCIAEFAKbmrN2fU5s5BwjjTz+SQxS21W+piClhwoWDpEALINm5y9t9BoIjqLbia+pra+GEL/d49pdsUNDx4IHzxBpv4+rm7h7UWa6WdX4iGDYVcOrcYeowSrKTt6zkP/ahk7vr20/o5AjSRxcQJyT7EWgq4NpOHdthmoj/VzVd/UHpeGPSZ7cxbdh06WvbBhH8oB4O/PoudFEYunXZ78JL6SBE+1GElN630srUb0y2NcMSy6XmWVyuWQITjEuIgwhnER9pXf/cNpxd9qLSjQrSAAn4/2Xb+5PqqeenBh7ENqvQL3kF0BP3SzxGFlRA9I8q8IrVsv9YHTSK1at+rBscR21Md7piuq0uUW5D8snGN2dAwADKL1dSXxaRU42vjiFZpQJiUSgaCIuTsP//DE8g4oijwalYFVBlTZyDBXkpa0GMTbQ5cRSkAQBkD1akDCWECQFogSERw3fqitXJDOjF/JPd3pV4gOpjmAYQexsQ3+UUYAwKJAAboDjiZGLiErBYCIYX6CVZjkIKlBlhjL3Ou++9/7E+DJAjeSvvjEHTEq2RleKUpht6HYeyzpomGLm8IXR5FFao3EgLHXDBAx8Syd8+nRZo5aKxQwjLH8TYKKYcBCi7AWWYmDJUTFGC//v9/Mfw7iPguzN3/d3ku5y79ts7v2m3B1Z0PrBbjKNinNBbjLvA01UH4tf62T1/jyqjjLfefsf0NtN8C6x0ynAzDLPUCCOdd84FY6yz0HKLXDLPNYsts8Rlb4122AH7HLTCKressdM0V8y01m17XbTRJtddtdocd22wy3THnXDSWNXZ2Dk4ubidUoFPLr+AoJB+hqpVp16D3vo4rYP+BhhokMGGGcKr0Wy5JplgosmsigmJ0bMEKPGMkgUkGAAmCCe2ZxvM2MQkbq/1yRg8wPz/vk3FRioieqyBi+EMosxhWnKjuQiZAROn6e086AzKykxkttm3CXoRM92w89JhpYPNHZmN1GSpz+5L3kNS1f2HqnC1/bpcLpY7a1eIeAiRgdnIywGk09FoeERSNlxhndgZJZJVVL3f6MtkwbJcnhbLuk4Zec8XkaPMRF2I70FclETn3B0uxAt4nZuWhoQAs2j15ZxlqfalqlHMpsuL1Wrz9G0IlA/FDmRXGyAVMlhG9sKYDPOg7cvVQTNteQHXWJAYdZGeVhDNVj9TCnpJAFFMhOf9HhBfnZar1eceGHALVM9BvgQTZgGbsCzSt0MEii6ZaEsU07bi78wfi4XfelQeh51PgHyfDLMWSJFwTRZvI9P4UBqqGJ2SIqMS64SfyXspCScnmGKiHeyHFkLWnqpsQQyirZfsN9un1lH629CoqBrGHBFJOSipnY3WkWFNxE3Jy8qol94sCm+o9oEzuKk/pG4r02D2UqYTbfw+jaLUpm54VsXuUNQO95QqQmmML8/VOjKli2gj7+Nlal33oD1tutlRW3f0XLNKBuuQaZHV6AoLCgLOCYmIdYW4vyfcab1bYqIoinm78kpWRGuZL5kqnEgzrz6ads3EW0J0gimLCCFtp2DbX+HeSLMlMt9+QfDfEO208i7IZUzeORjjVWFt7C7QLvjwGGNhUJRvpV+NvL5P8AL6TGpMc8T6GmMolvJNlq8wEC/H0Dn1LlwBQyXMQ2Kj597CkCY0ROC3kubLFnMUkgz26QHCPNXFdWGyqNAazoglOBGMRG5JFhn/Baj0A+cIWaFQT6+1JJ+Qc0GC363I5qXFJRaTR8GQYnO07GJxkreiXjhSCXI2v34GK0R2+ikGxkD0EOXJSxYcDhIaJYlhXmUAiRau1muwVMmUNn+NF/2NyM3cwFJG4H+5Cdn6PWzeUkRSd2VWbYIJw6LTXkQLbC4gQL9px5i83ibfe6Z5ccsdM+/kIQWQodWZOadOISYpQdi0R43bOYBB8Vll8ABCFlhYCbltWDPfXcZHgj3zQ8prHn2ejBWnNaJevrHBbPaSVvGydhX7Qn/aPoVdgTnYfDO98AWxO1Oz4szMq/Tm4Xbl92DLzhhER92fJiMlw0ZvOEHLIedoU45CrTQaDd3lSZsQTxl3vPXyqYSvw+Eahoa0e5HE46WPzWYz9uzUKyFz1y7kNG4aVvDiOiG0h7bR7sxyhxlKQWq+9g7E91WGBwfLT3UsWXQh9h1LdjBf8I0Zcq/vfTqYwfvPxDYRunOd40bTx14zowrdZjlvZRd+PXYJMSWEABmwckXEeGYnWi52MwMxsdXy1LXk00pjOkfS3hm2z3zdSWxzz3kyB2Tbn3ZI2LoGGBIgXDcu7B1bCVmNJQGyfkZyqPQSxaq8EyCfW9Y3qqoQjUsB5C/RBN8T/xQGjT96IUmZIBykkSBGKa5Y0pHujL10vT3ZqRsvnZLpac/uFUlPQMoHT0/nxYoWN6HcDdo04/5z/4QeWNayhH7T35TkS637eDKH73mqrMsYWJ1EtQAPZ1HaNMfKSGwCPrDeIYmnjDdn4gFOjS/GbACxC8qIY6yYB6sKCYESf0rguho89tKPJR6k/MLh1pkcHeRsApud4Xws6F54P/nI6KYXbh9tu07cYqCuurHV1DmQnKvdGuYajW4vSH5nTBl7dJ3sLdU4TMD3VpzBuVRslSjkkyHlHEHTHD1pZJFhZ+PqZt7JPY1P23L8YzNNz6STgo90qq8wGZcrFOI4+vZDFSMQyqTmpEN5pwcVhfLYIBpwBlpheojuFe8Z18ekQevZh7TO/WBh5DAmbY91Fx+F3+ioEkiLzjFNohyy0Zkju+nTJ96m621y4GHaqPoFcUTubHxyHV3ur5m2vj743vqpCv28MLtW0EO7EBxmFpsBStU7jL2oQxVQUrNxp1Y3TX8+EvnEYoV9bEiZMX9WTgJx4Y3uaAybb9t4DZIWzTsMmqWWgdQhphFpmm2dupMCXgHIKUaR8SGe9ztFRqbpLDNK691p86+TqTrS4sskdgfLh/IhTdq00Dnu0HkndI+DdVzKeNVIQOqbU2dL402qT0zbP/PEW45bgazcHnKezDzLugWb83ppqaqE4tPYd9XrwqRE1wPTF72ZYH6/KGTJgJ82WMa0ca0okTtk1t0EqGKyzfErKazgpNbKa+XT3RRTYy/P7gjnaa8LTfoSqjjwlRnx7tK6QjZ5xpRA4JBjCUS3CsJF8eGFsdb1lGme6VTCgOUKQ/rixl40PA7P+PzZJ3WX0WvQO8SVvK8Lu9Y0dtgnyDFQk/OnzXTSNawro6XRMAxywwezSHOErLowJUNQknIF+uZBXGOzUz8bxKyezh6+VS4Djk7yZsYwxXU2SPXZy0b3lj/I1nT4bU3ZiemFOUh8Y6Fe9E2+MpUX+1xLCQeGmUNW2TWSlfmdsrPjjHd7v9pJYFDj4EyZGA/SCkuzsVcSCxqUr+GO7UfNhgxjN5ULgjY4XYCyzjR2RuRmWzKzXJLHD6D+UbW/oEwLRsmYHynkEu6pOpNbtp1hG0epbjYW6abYj2ml1mx5vgjZVoJeL8TBX2JqV33O7ch0M5SYXEK1ecIF1L7oAnrcbY4h7vjFjxa9kX+2LfT6NRbzkzGM8UyRuCw1cj0HwM4eYLZRutuv3TJWMZYt/pSyfIGi/I6yBLBVPxlV125Vlq/V2CnORMc1iNpNhx2RAaXDMMGkr9zoe4f3p2x1Z4Xao1brqkkLjMTR9G1pSCb+jKHlTjE5/O/B9fUw9Jk+BDCXm1vbVthDmw4ZOmMbT0w5a4kjn2Q+SGOOBfgemhUSWr5SBhPQzApSE4DYhoXL00JC4NPp5x5HE32XzlQguUF/iOEjr8UPmV9O0qWe8CcKlruaYmoSqkOZv79BiomtqzVS5AJ0UovAVyvbcgNqJFnRmOrMrL4evXySsrwjALrTWKENQfNAB5tNjOprCR3z5lFlQ+NIj3j+GRkLAoNVCM8s3ZXGkOueUceXtEMbUIoOVycV4SX2GfMUDXSTQwfSKPBZbAfZY4IUFZSUNqnVI4cqLo++0DrN2T77rbtc90JBbtLsHTvDSYm7bzTJpU60DP60qvlVk9lPx/hyGdkeqxKu3ZcajycQ+MlTv3wRUSnjD+w/WugxGZp1S76MmQPUXX6R80906Iz6FfHmmFkB2JmM3MUmOiwlnKKhyV1q4eeA93HgxdusEOv0s+zC1JEr/jsxE71lt1gAy2QO4B+ZET9yfGyhPaHdwCvUckxmji53OucFiVtBtDVcdaopm2kaLxKSBWkq0FVRkfPDkpyJqzwkwRUHYi+fbST/PGV8k4g2UIk2xhs44o1cmoMqNKQsefzxNOB1VQVegiuayMwv/cRUDBspn/QH2Rz67iuuImnHGY60/n+5fk93HkHWu5BNiGZgDkssfv8sXsmlnmBRhookPQmejaI2ZnF/4+9h7uBaF5ceI8YCkCv4Vo3wEeQPP30Frqer3tKVS/XVxOyFpYkxKG6dO7GfIpvWcE/lF07ytL7u+pvZ9BUxTfGG6Wdix509tW/UttkVieKll+xnsP0Qg7LtZOy4DtZgnbUtN3+7uS8w9smZ/DNjnuTibRNk1UhFtX3CBJu42DDkReUtKdbO7EmpiKf2/oz8PFPju6JXja91R/NuNpfQz2DEUN28WepPW9qLJ8n0zEfCPb1usxiE9aICrOrg0qFBm1qldAldoctRRV6hzqTNzwxXfA4bYC802h1uEOo1+aKzD//5HxK5GAozqVyrI0UVFhdTJLAw375tVy7J0dUKXCHeGHWweeHv/yxv9bBGOIONfHvbP6Z+faeNHt13Qj9bgnpA8+9Ww5kUOOW1E17gntw816q7nWRNYgVM8kmajXGF6mdHKz7Cu/1w+Dmx0JHtcEJUanEyxeBm2uoJlk70r6Y8va5G4Axxx7g9zcF0VHpwTlCBUgTtJdYliCXWf9SxCf9jmDzvJMxlwXpH7oB0a/VeIcbH89O1mbUynKK8OWhHpNtKznx5/Hvx7mD/iZ3BhknNfrsF/pPnay4qygDqkNS6woyiOXB/NIbFSEdAM/K/C9gm8GYgEHIlBt3f6vY3511sNUzqlppQLw9658ytIyqhWhb25vMSMwtFxghjjNfLGGUMFQoyVUVCYyhdB4+XMcYYKRIpbcxLkBUb1Wmx5ZDpIpN1iDHsZu4DbBSyHlZUNR9X5qe/pNuVcrqzK4JTDkEGdsNhv94KB5V5DXHwJIc2owKyHmExjwC3qtawo5D5UADVTOuymPRBlRHuHcYZn7iUyhB5MOwFRxlChcJMlfxZMITA0R4raaAs5FAd62GHZCmTJji3Rvq4fTq9wSdz90G5WtGDMYE5p6QB1EmaReb2FhpTl5EDg2aby/lKqzNLjEd9XjK9mDONOOUPBvNX0IMX6Wr4si3fXYBEY5EKcPqEubZC9g1PbTWDTTVtzCMpbcNkp+yx9qtWpPWqIyg7YB7/yNBWRzqFkl6g96Hsn9y/YKB8vo8oFucS1wHlsAxqjtSV9yRW4JEz3z94NKq2PO9sc7msx5yA/F98goeDWIH2/mXuyq6OwSlo3wokp7uXI/nXWzanyIHqvdOFKNo5CkYVuL/4t2qKCpcfGfEdedOxNX95ZKv+oKco2n5lcRLy1ryj5e2R4thnN5ZGogeYoEOFVDGdzJL9oYVj53lQr5f0xXmtW6SN2MHwda1vNLd3kDeJWNw94UYnAhSHGehPxISKm0BlWe9CyBRvQDRHBXL6xgPzvCwM6UAtBvIx5jW545q/0a//aCo66j8QW0wLsXkSJ12qxxdk6sByjclL54E+uhBRZcztL7TiCUBBPwws4KQYktUMwEbPm+Dt0kIldkOUptKEuDcnXtOTWZCFEEs0QxDBFJOegwQO+jP5wChbqS6jwXp2iTq7K5tRojF4QZ7ARCN1y9/pP2ZuRNz28wViF02lJxcHtRFHudmmt71NfgYA9U1Y0wRzl4ZbYjZE6CJ5LjCDHJAlJeBGxZ9ONGI5PCsWfVhZSMtWltCtek7xlAq7022mVGy9YjIJh9/iAMZMo4Z/ynRqSe6SGbrpSG5+SUOVzUQMzfaxfCIPZEr9NiEdrMksxRjf01dYSeQp1cisS1Rs50bkeCGf80ZjxrE5347njI/dBLBPn7Q7lJ2+IjMMkB3iPiUFMh292CKoIOoaBlmu14v0WgUef6sJi226hccrDNqNe3QbIgbUhhXqsC9aLvSDFplRk+FQ+CwBf1X+I/lj/5L7scvIBjLZSCb5lZ6bveRb8laQ7njsJmezYNTpNf/NIjG6NiykbvFZD0PdUf99ZNyvkv37bjCKNr4d0Heiv4/v6GeeMt5tq3QnzuF4fOHw/WWK7Ef6RkRaD8iRFsjTcmVKl73ImxdSEILMMmNeSEWQ6/fDu6TokTnej4z8Ra/sLi2rxGAI0cRi6TAYWCVajSnpBf0KBLMhjKlpOghOb8KYIAhjHtevxDiMWbGO0+bfZO6DoEa4AonjlBLUYtnX5NM9QBJFaMHjjYGqwpMp+dQwLTTRSfe+bvJvQoR/+iCwubFf8AMQBX1NZuLVepT1LzZZVanjOcn+YOPgWcWg0fgNIJl5EUzEiEddI5DnMVxoqaqGkTnoo5sooF/fuCOZkssypEZxJTmZlE01vgy5bRj/jP304mm6GcieU8xT35jePKG1b/gfBEf+TUz0pnIUMKkNZRe4v5jig0hHSKGO7DQhsMxSoxYyQbNz/VXSR4HG9IcE6wHkAZz1Yff76z32qEjT/VEwCxdNNBiQ5UnG/lnfrNnfBiQZ+iPLexr8WThP3aMK9YdoonkQsjTRNE31Pjro87dVzwpd9QePP0Be2HnQVhte8/+O9wXBxodJ75GPrj/2NkaqApPmVSTKvpIe3H8cGNLrDsV+H3mAYGuv6+W5lHRBS9LjuYwdqfpCK881hGOaz3cPiZhOazWxLoQCqlUIhvzeAaP2zrftCSOaTdbdp1vgljfVewfaewO3/Xz5zU/so2hpudL1zoknyANsz4Y5qgq+yz2/dEWnKIPtjw/fopcKz5vRgGP+zOWjt3z7nP0N/u31KZitK+ObguCIPPeYwNQQJgETCoz3FuidkAMJLPrtKfyk1n/Wzn0C+91sFjX/CFQ2B/sOecDUf0W3CS4B2+yP4J5r1XJgQXFaI9WpTfaRoZGoOJZZRNDjGp9c8FIF4uXXxpilYmaFK80rSMaTunVzZhdlk+65Djfp8SwFLBox0yNgaSyOn5epQ7MScKLMXKTt/znsoXTChXmDK3slFKZ41EsvzmUQHSuclAXOaMKYIdq1I5do6eS5euMwlgpXjsip66kR1bVQMfAGcrnXU8PKi4Uu/D8bHX4L9TLPKSRkOOckmSEoyTTXkUEomNvL5OJqCSUifRdTZNaolHqtmG7ipfkEyfHULoRTXaQklGkPl60ExXBmCGosZnUJ9YQSZCl1KOFqhkDkj4NnheOFRKfCThJxjv5lprA2E7cTcHc67JsusoGq5VuZkAX7vscmKRk6QyVfOpW57yZIbyftAZjtkErncH7zF/BUnDWVKJifmNFTmMtkc47OcNBZ/3VsG8E1aLyrhmuAqNYaZqlEeVSDhhVSymj+E36qVBTgbkkyayqv/O6qnWCa154aGGDn4iebaxvWnfL/7j8eG6LlPUEY4VKHDB8ew0nrFeOdQvNPvfp+GQ6fPmoH4PxcGL6OqKF2Eqj//vklWIH59p+FT/xyy+PZ9z6DvIoG5tUp9emwUhpiZ/Jhgohk5AAK/tb+tgwPSIPtME1rgLOACWNwLW/9xUe2cUquutL0ssGy3fo5vMSG4WsWLhq+vKFBRhYt7OdRH6CN5ugxUcu04DiTCZFpFvhw9KMBI94IUI03oZ8CKmB0ppjM68xbLk9VsJ0Zd7RZWpvYB48aGCzjBTgqkwUWuPhvXq+Oys1iF8FHskACqMBd1lCrz9p/kHwe3m+KTvgREeho/WbVE0mz+4fTcnLUnjRqA15kVWQLvOD3TQOq+DqBCzP1GzvLad+E/Dh9+yQaBJpeB3DiQKOSTn+bu470IOHjHlM+rrk231DR7mm3q3R/RGZW5Jc1/cha4gTobVsm0YxBu40zELUTLa2DgdRdO91MoRe7kOaQy1legzJIEvLMyTVnUvP0clK63AgYLWYjK8CanVAULL17a7KBwGBZiF6gNqb8rIQv5ttwepJdIqQ7fneRefII0+BiDHCX8Sbbg2UseXaI9T18H1GA/00yyTVaaewHn5Hp4NwJkqmYP7sVh2SzVylDJofNqZXSXpbacK3PtPrOJq/aKjboc5QGlYj8151jnw7SBuYn/4sclmmTMU86YCxPZMPx1zEFmZ6RyP9uYeh0xqvWIF6lDOH3pIRxCmaA1dqj2F8KkxFyE9VoNkdODDEQmSwzUa6n1sS6qop4kohFcT2aY2ljSJ4P+GKpwPS4DrNe0+mvWaxXap1f4Q4tvKH1EPVNccBFFvMjIOCbsyNFw/yUxLic2GJf5d0jnMlfCq6gUFaAjJUYsVKQm2+rsYxRgwH+IEhdTwJYwbbqvwlQtYqlp6zqhSoUZEEmTMIKBm1x/VGn0VsVIgZV//Bt/g8eGtyOvOp7tyI7WBmw5QWzJeLqZYztgSfeAX3Ux/bpW21P3N3MxJHTn8s94JZkag0A/g2whWqnc4iJnnh11he5h7ElGagGwH8ADnVZtcHGeRy64PtrQXRM25il5Ym537QaNcgn/llrL3W7bXtSOlVsEyfxBlCCkwfTaIMnByntvBKJZvgunNS+vsY37MHcuRLriY9XBkuOjh0LjCceTxw+yUhyzyvx3kG0+ML3C2I0Vl7z/Xx9rBShxdhfZiIgEOBTOj7M4sv5sz50pIgTiuRs/y1LL5FWLGf1aJuH48UViCTRTGRmVCKLCwhx89p6sORircjS65af93sNhM3dCeMCMom/G79EFFfAEzYDGTC/kC1PKBIHH4UXCABiJpqXzluzwIGeUO3Axb9yPHUkRg8by3TSYXd1OjrTp81saFtk+bFMmbBLXOFa/TE3sqGtdeh8sc9FA/b+YNLpMzptpK43Nipt+l0bMVDfMhyEggRiyysb+fl/QnHipDuPCZT+LW0MVSHzf9KfJyHuUTLp91t20jXHPhGIBt2JJxCEgUEsqY922dvSnHs3VyEBFPk4g5yRq84GfffzMFIek2x0cUbYglGBWi0jtmCvu9xm/VBUWE9oC3kJXEZqfZbLz5VKaWSWi1pvRPu6LKefo3I07rexxcAjWM6tpIE9ZRk/7qKFKke2Ue4SEAJJ1yqyWPRVG3E2N0/HNpNAEszns+KgmcRmm0ggucT49QJNpEpqdV09A6yvr6EC4RH1IKN+eIjT3QW8ZKA8cQK/kG7hWrnGKnS/tBQalmTS0iqkdchCK5dNvEcTU9xT3GNTkhkpOTPYglyuzs8YFfCBo7R5Ab5EYMw4vKs+lyjNrpN6o8KWsjJ+s7e0XqyTO0EqLiT7tR5czswcO6YmKazMWXrSqw6hWvKyCrFbFRlbJ6r55GaFUS0hdTH2pBJ3clKyLFeRqJZJaS0zeIlad9jrcQe0WkQ83r7ofuCqRnMRAC7SL+RVDu2RH0I2O6WSHMpW0J3ld9OIb8jo0PmyusUM5UUpmhW/fdJUxRv+Sd+9BCKRiZeVsaAGLPoPMmrA60vgMVC0mqMa+KmKKrCIZKCROE3jHpiJyEXw9QrbKUhqV9sXU1uOwbulmcsiiipV755JN9hkedH0+TCBk6OBcw7Kzd0GTAN4G17jMvDYtqjfl2BkqGe1ceavmgwAkztmczizO1rvVfMNbEUKj5eikIv1NZb7CMtbg98P6MgUHW0/Hn8uzUMhe1LPzaK3gsxWOq2VCbZi1WMDwXguCBLi/Xm7Qvnvc3RItvW7AnnxEAhy4wPBXeFIdDxFFxeKeD9QgHeLcbjF7wAKO/exB172ekgZipetYZEeWMm5ZCv3hRCY/FRPqJinmTuogsevLSjgqDX7WNSnFqqfbOE85edEvLbuEzUTKu3cmzDKCh+WvtCUqAmjBsujiPUuACKbGl14sS4Inf1ZvRYymvVyAFq/O3NtAVnBsJQgw9NGF66KAYx0JIpmTM22sX9HzmLRNsM28bb5/vlbxFsMW0SLtuf0VvgKC8W66OQm1GA9b0kCqkdCavds/vvPY2LmxHpZmN+Z/PdCliO/PCnEkvDikxN6picgxD+SguFSC08Pnu+jvjkqJ2w06cIz9yZcg2nRGlntITvoIgUUcoq/kFb+93pZzYauqoGSw3MjXVmGIqKr+Io0/pv/ddWlZYddOb/SmPcwnU+r2XTm/Mz4V7d77G55JnhEO1rVBWIiLu8o9hWuAtjhuFcuSUuUvvD5iKLMofWDvnv5J5BM9TYPyr7DN/SeotDmHuMeZW0wbtGv6mnu3mr7a5zNsF48EVnherlsLCcGb4GVLMqz5jpML6sxbRpspigs7DgEO65jJNZ4sHeS61EANMnM6vRIuF6qCcRGu52JoH/JpHv5bjaZJbcjPvnkIrAth5WdjiIHBm7vLMhvyUns2SItCTdaErmanK+RBYna/ZbUqyQxodNa1pJjjCKrbnPwS/aXNvqamYwm5HzxrUbvGg6qc0K/XtRJIs/aDkxc9GQRu+YI+tfiBcnJ+WqhZxcjW9aCTKF7N6997kf1x6STTtwdLPYODvsGS3yl4tiBF/nSiYzVmIxVGZgOqrbzT9zzjk/P1WQemSuFIAmXK1H9SCeidxPwu9FeeMJuLK+Dq+NyctiPlpfD9QxM78Bjd6ajd2LxHVhcN8XEoSJqxtjBro3DBsWj0cgr5LmB0pTDpTwZ2Y0FDNB0H/ToQ/Qx+hR9AV9Brsab2VC40v3R6EP0MXzhVqZHFVRxK1NCU42nTbd5HGpGzW5z7KjZ7QTqRJ1uJ3N73dB/h3u9e/QB+gh9gj6HL2FIjdfTYNiV7vVBH6CP4HPY8kr35qAP0EfwOYyv8aRfKIG5AH2APkKfwOehVLj+BfoAfQSfw8wrPWiA587JMAzEiYLoZPDh4WuMu1Zj3Gke/IFBmAtyhZYF/ns0Kiu3zNYamKBrLAqmuPkUXzgVTB3ehNMUb03E+muwFbQbboPh7SbfgRgHu/35HsWPxBi/pYwMN7CMalqpRlguuvWSdzTcZmSV7a6hfnGT4LS2IkublsdEORrKcVCOgLLvY014puDLnNdN4Cv4X/n+89vP72MgGp+/AX483jpQ/YHk9RkDcv6IVEsySTC/BjCWfULaf7qKyX4+UwCnABqKib/MKYBTAFXFZJfQo/TySzi2KaCgq74AKoIeUwCM9lEg54HKjwRBLkLaIO0yr6u0LaOI+BYsxPA+U8CcHeqIiTtEIX2QvmM/Y1R9MdkjNMjHSJgCFkS9DuWr45cpAEb7lOJJtgKzw20UH00QcLTwYibmPzQa4eVcr2GU4JvcrWUCPvV/s1Bjon5qwKd+A+TxGQ9pXD3j+64ePA2Bred/I3jsj+0uxI5oTJ5Zl0y0PL/CmhB8CcwdsdNWfLk/0ZEVYDbAiW5JQlKj9SPbkqXVpqMnkMu0MWAxYLM9zL+6/Unxip2ZH/sQe01gAVgB2s15WTSk/wbTshweyF02Zm0isv0mOZ9+nJbX3V1rtSGw+B1gzX4mmD1cAb2Wik8iqUfQhSuS4K+sfNUG9QPm4+HGr3SJoKihmqiKavUv6o+Imc40yL6MWjNTR3jSkkWLaDENinj2g779YixituKFREMSwfu1GtTcMyGzvIDIpAuRRVnRJ/rIL0NqRRECvovaJ62LKIUkSFo/k+AyWEQZkTlVPYcnmwN4zgCQb4UwkShegnhx4pSuXgxHwqEGwrkTmO8XzgLw3SZ+w643SDQHiJBkQd2G1jk8r+cy3tWC8TOT5IpAjBjTDjHX2TRFYYWCBcLYMaKIFmEOXvW6KqhPQkgF4y6keGnmAp/WugGdWeKy8kG8mYNoZPGz/EVmiIkbAinGZwV0veTrc9koU+As6J0ItpIhIdt5WPP9Og8pZGjKGGtFJeJzmflCcd8CpXIMbA2Es+GKyhExXKzQHqfMNkUrL9OOKUREb4Rwp27rQErgYHdm0RF7geFTd9csqZOkRgbJz0bTZqc8m4KkBSSmKxJ53OsQ9l670Bs6DcsGR2ef9KS9Vnxf14ew061JVLK1QPCCLzORWkEdZmYpJqwdK/PhN7O6vTB0DCE7s0IoEZKG2B68gQQhAZcZOsTaZu384MDKvULhTJ3W1/BsSHgR9zJiBM7InYfUL9uc9fR9dK1nSf0a7AN+GscK2kut2E/WBeCnjlDlys8XmviTcKSOhdezLByHGDu7bLFUhxajlQ2VJBqJjS4OllOuWomT+vpaiQ8RwTU52crNvj4J0sFbldou5Bg3WhlxZI3DMhtrxf2yjavPJBBV011pHtmjwmutW0iBpbcIegOhO3qjQAWFKyhdHGgr4zeoSIQeKjJHt3wlw8A6NByKLx1U5LnR9nGFEdkuPoQX4cBU6ohYNpcTiE1z80mse9fi48U/UJnhh9FBdEjclGvufzg5bX/Yp6+e9AT3chVVl43Ogy2vWQhL77+cb9nATUuLdJNq1IUYQ56F1hst4HuaVSwlTBLZNrbGta6YyrLraNIMEZCFwpA8cbXepW6YVdB2dxGbEeBzU+BFKAvUtWSlUUqy9cv4e4lACbjV9T0Z3Z2V3blD6k9d6TaohcDelcMQ4yRRBGU76gxq5apzwRBAV5dcPXJHdKXUcR7DS0fVWVoCqib4+F8TB/FSmtaNTNV3LxGSRZ/TfyhcdKc8LD/HUme379zJULUxLRSuyV5363aF21nCH/pAPheYZbB2REl3fRS7ll2jRLtCl1jprrVCu81ToueRCles+kw4s2Kri26YthqpQuN2rdtsH259kYXXFM4RYOmWaJlHQ3FIn7PXFOxYR6KfpUceYwb45hZpVF4BWMTt6nY+kffm1rDqYxyC8jpEwiSfnsCUBaoJ0d2h3Qn4KSHmXP4uuzNMpHHXP3dLBOtJ9+heHNBf8xJzZHMwHF7M2VbF8BD73r1oOo2OG7N3FHuPm5KycxkcULzn8fILJXw56/oijZLlqR5Lcyt2TSgYE/o+8qmNnBrYI5Dxefp/4ZBTsRoZmEBFhoM/2gBPqMtTivtkDCOG1HpKlaLuUBar3pU4pIdo4RxKKDcOVZzhK7zEoZxnxVw6ucra03ALIcx3d8geqMv1/G7dqzJnOdGKdlTSYB4p6SbQdtFND9qlh26a9X2RFq7CmVUPdCdsHYmpOXlT3HRu4BHWkWUgz7v5uMo0SdAkZ2TXmZxKI7xvsBhacde8S1eUokRwLWdRQ1xEa+bDWyrN44WYm3OsFR0G1oHSNRnw/MmdWR0l7SyCvcWnJh5suIIbzwUHbrWjS8jV1OujYD+OEqEdYhJJJfgiDK6tEKfmqW+54UJUafVGfaOVE3qndAvfCULAz/ZtWztPIVVaABr2+4BuSvitn+VHruJvqaBPhVcMqtOalI+qtGyhpZJvbBiY+5WSzXja/4hO0GqEaoLxqQk5wUz3B42ympTbrWqrusysyg7Kjdr6OcJcX0wkcdFKh7KiUzTLr8bq6Ldqap32Wc9YljvgxzK8Yd4Mfa7alE+Zw3ufS14em14nxMFIA357gLnFcZZjhCDCPATdYwIx+lgu9VXYr9E+mE8rFZNYbJvb+8Xj1KOjbRAap2ASt0Kdy8pTx91keKNuqixWlKq0AyogjZMmXXo0MrbZZ2FvFXV/GS/1jX5rDP7ZW1ZA/Mrk0HXjIb/cS5RhMAikaOD9h+voB8x8wIWcwH/gMtop83gRQt7um1LbISqEhA6ln/8d005+Tn87wB0GfKtLC+z0N2euAwXmig2Aoeca5PXyzwk0O8hNsSFV/nVFOlUDD18ObqhAGRgGzOY+rbV3reEGFv2iYVGpv4qYH6LrQHGGQd23zb3vyBVuDHt1ImPI6dmxTouERepT/i9QmDOYEhGa/3K+KTqTZM66TGLFo0Tjgcd5BfmKFtyheF7Fr484lhatyuOtilOceYpGMOxeptnANUwYNGCrJw3nEMGcXpYcmmBJ5/h772/bg3nwYh/YAulcsxik64DfVkXvfQpVuBkV/X8fyaWItTgkyHETRXJIA2GEZRQ3hytoRsg9sdfjOIFRsPyDAOjObvwI0aqzblRyRsYTkeVwFkOY9ZgF/OUnIFsKkIHgnnnkJaFoTJyw9t7zOKOwQR4ibbAFsjPBvR5KScYQyZu+kYqQUccboS6x9yfNF9Bh3ZvZ6cONyAfFz+r2Xa9BFxWzLblm+oj94OLXkkiXkIqqLKqfTFPgorfPSdueFitZ0apQ2wDmAtWFr4OrAMWgkpYmecbGb30v+/rV/DhTlclQqE/IhOTUXbKxna+mGNv3ViJuxtEqWRi7VRsD/NN9eT8bG2wKg35MgwTC9syxugR4+qy9KkMxWtPeD6yZiiaXJMOWkoGLWUrK2CG1raYyvT9CoEK27EgPBhZw0guxjxHrXzEicMHL+ZQc55BjrJSQwa6Ap+SFJEDgmJWB2clyeW31rnhBgvlMLaAMnQJwMgJYEzmOOCMZ2YesQzNHbxOfSxaaJzn3nFaFaa/CQbZKFtCNCBgJkn4KaiP9ndGiwGyb8hvgxQRiBRbRS48YfwQbVG6HvKXPzXFdt5ZksdlJ1jO32LOoKCnL1YxZIzPa9nzDTlDdNhBhGDgrn3dEAvuU230CStSDKT9LAkYw7O4MR+iSQNyJp/3afAyd50PaHnVG7D4hIz1ipsFD0yzC6hX9/WXAEF3Wn+PWWfsc4hEcHODvUptzqH/lX8GkBKJRZ+vBvf0bGjR/9aheAN4NXHgBBun7D0qD/9f+f8kDNur2T5A/FKD6+P//ALnfsWj+od5mavF7VVkLdIDzH0EMxmjJKM9AU2SoqFSuqMlq7QFiLUg0YwKpiEeSKUph/FgxH43iatj6qxZQaSOXBuX/MUkpFm4ygkIkSgLEZYr5bmC3VE6UYJQotET0MTJqXli0OU0llrBATmhhs6wWN0hkROshJUV/Wy1atvKszExuOCr1Y/qx9kb6YIKLbpKuUbqldeVlVZXLY2vxQbttunwu6OO+pobJCyui+1qqKWRD0YlETZ3WWYOTC12wts2XC9K918ujOjeF3tsZiZno8KZanT9MQ97I5bWWHV5bYZ5pNjrvrp1WDvTPQi8pYPZomqXWvrj9uktnwIN8r4ZU7U/jB9MdJDx9w7qtpU67vSG+/BGUI0IrEJupcvhNxr2ZNUSvzZw4v9amKRUMqKrRYANUqAIoSqayHVUygIF/ZY3Beitna5FIokuRJa/CzIwsVBmd5Ji3CYAjjLcYhVT9jAaqy5/fFxD2nVQSADil6KPcSqNBKqw8pMiTZBXl9so1qHLraraynTpRUpgMaXICnKOYdW25cpB+siSLoGcfP9dYpUZRVYRR3LsPkW6G64dcpN1oKDfCvOij99VOj1O2SD3ek+DO70Ek0p+VjRApSrQYseLES5AoSfLe+b5TpUmXIVOWbDnyyCuf/IqxsILfJXxNDy/LK06+sIh8BQoVKbbWScet00SFOZo5qbljTjnvjLPOaeGCCy5ar6W5NrjmiqtaeeGlt9qo07BVpftaqKP++h2tk3uwQYYY6opeRhhupNFGWWSj0QYao8lgb+zyyjsiCysbOwcnFzcPLxMDHz/GYmEWkbC22W6Lre/MPvj77LfSKsZAwiabHTZSEYkUBRRSogxKQzleUI0wylhjhOOCRQ55FFB8x82viIIqzDUvNDTAUHvxhpsWRhhmT5hA8NV7HyV774PtQgSEmqywcm1hhqJmueGmoFvuuhcWRCMGMxCLOMQjAYlIQjJSkIoA0pBu8VQvlzVTlfHBHQ693kR6orHDrvv69uJ6YlDP82bs1KBWV7vDsZPVHW+v2tIjml+du3fOzk9XlhkFRQC0U0Db1LHyMaGxcKMtlu5X5+sb6vf7QusNJXXrgNc7Pcy9vXkxlHyoT/KjfimABsJB1I5OJ9vDCUISOf7INA3AgrwJrxRvUyCJx42pVmBbFsq06zMgTIftUb6Qf2O+y7up4vl46Y3P8SW5odmX/O/O0fscBA=="

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 74 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);