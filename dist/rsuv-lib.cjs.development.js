'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));
var EmailValidator = _interopDefault(require('email-validator'));
var toInteger = _interopDefault(require('lodash/toInteger'));

var RsuvValueAnd =
/**
 * МОТИВАЦИЯ: допустим мы хотим получить значение ячейки столбца, но такого столбца не существует; в этом случае
 * возврат просто falsy значения (undefined и т.п.) не позволяет понять, это значение ячейки undefined или же это
 * означает что ячейки не существует.
 *
 * @param value
 * @param isValueExist (2) -- если здесь FALSE то это означает что значение поля {@link value} не следует брать во
 * внимание т.к. на самом деле значения получить не удалось (например сущности из которой предполагается взять
 * значение просто не существует)
 */
function RsuvValueAnd(value, isValueExist) {
  if (isValueExist === void 0) {
    isValueExist = true;
  }

  this.value = value;
  this.isValueExist = isValueExist;
};

/**
 * Представляет какую-либо ошибку
 */
var RsuvErr = /*#__PURE__*/function () {
  function RsuvErr(code, message) {
    if (code === void 0) {
      code = '';
    }

    if (message === void 0) {
      message = '';
    }

    this.code = code;
    this.message = message;
  }

  var _proto = RsuvErr.prototype;

  _proto.asString = function asString() {
    return "code [" + this.code + "] message [" + this.message + "]";
  };

  RsuvErr.asStringB = function asStringB(oj) {
    return "code [" + oj.code + "] message [" + oj.message + "]";
  };

  return RsuvErr;
}();

/**
 * [[gyth]]
 * Сущность для пагинации. Передаём в конструктор "общее кол-во элементов" и "кол-во элементов на странице", и затем
 * по "номеру страницы" узнаём начальный и конечный индексы с помощью метода {@link indexesByPageNum}
 */
var RsuvPaginationGyth = /*#__PURE__*/function () {
  /**
   * При интанцировании вычисляет поле {@link pageCount}
   *
   * @param elemsCount (1) -- общее количество элементов
   * @param elemsPerPageCount (2) -- элементов на одной странице
   */
  function RsuvPaginationGyth(elemsCount, elemsPerPageCount) {
    if (elemsCount === void 0) {
      elemsCount = 20;
    }

    if (elemsPerPageCount === void 0) {
      elemsPerPageCount = 10;
    }

    this.elemsCount = elemsCount;
    this.elemsPerPageCount = elemsPerPageCount;
    /**
     * Количество страниц
     */

    this.pageCount = 1; // --- вычисление this.pageCount

    if (elemsCount >= elemsPerPageCount) {
      var pagesFloat = elemsCount / elemsPerPageCount;
      var pages = Math.trunc(pagesFloat);
      var dev = pagesFloat - pages;

      if (dev === 0) {
        this.pageCount = pages;
      } else if (dev > 0) {
        this.pageCount = pages + 1;
      }
    }
  }
  /**
   *
   * @param pageNum (1) -- 1+, если больше реального количества страниц, то возвращаются данные для фактичесчки последней
   * страницы
   */


  var _proto = RsuvPaginationGyth.prototype;

  _proto.indexesByPageNum = function indexesByPageNum(pageNum) {
    var pageNum0 = pageNum > this.pageCount ? this.pageCount : pageNum; // ---

    var indexLast = pageNum0 * this.elemsPerPageCount - 1;
    var indexStart = indexLast - this.elemsPerPageCount + 1;
    return {
      indexStart: indexStart,
      indexLast: indexLast
    };
  };

  _proto.elemsByPageNum = function elemsByPageNum(elems, pageNum) {
    var _this$indexesByPageNu = this.indexesByPageNum(pageNum),
        indexStart = _this$indexesByPageNu.indexStart,
        indexLast = _this$indexesByPageNu.indexLast;

    return elems.slice(indexStart, indexLast + 1);
  };

  return RsuvPaginationGyth;
}();

/**
 * [[pknz]]
 */
var RsuvResultBoolPknz = function RsuvResultBoolPknz(success, errCode, errMessage) {
  if (success === void 0) {
    success = true;
  }

  if (errCode === void 0) {
    errCode = '';
  }

  if (errMessage === void 0) {
    errMessage = '';
  }

  this.success = success;
  this.errCode = errCode;
  this.errMessage = errMessage;
};

/*
[[tibo]]
 */
var RsuvResultTibo = function RsuvResultTibo(tibo) {
  this.success = true;

  if (tibo) {
    this.success = tibo.success;
    this.successCode = tibo.successCode;
    this.value = tibo.value;
    this.errCode = tibo.errCode;
    this.errMessage = tibo.errMessage;
  }
};

/*
константы разные
 */

/**
 * Когда что-то уже существует
 */
var RSUV_AL_ALREADY_EXIST = 'RSUV_AL_ALREADY_EXIST';

/*
 * Представляет строку не нулевой длины
 */
var RsuvTxString = /*#__PURE__*/function () {
  function RsuvTxString(val) {
    this.val = val;
  }

  var _proto = RsuvTxString.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      if (!this.val) {
        return new RsuvResultBoolPknz(false, '[[210705185504]]', 'is falsy');
      }

      if (!_.isString(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210706090804]]', 'is not string');
      }

      if (this.val.length < 1) {
        return new RsuvResultBoolPknz(false, '[[210705185559]]', 'length < 1');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210705185560]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxString;
}();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var RsuvTxStringAA = /*#__PURE__*/function (_RsuvTxString) {
  _inheritsLoose(RsuvTxStringAA, _RsuvTxString);

  function RsuvTxStringAA() {
    return _RsuvTxString.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringAA.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxString.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (/\s/.test(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210706092510]]', 'includes whitespace(s)');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210706092135]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxStringAA;
}(RsuvTxString);

/*
утилиты для String
 */

/**
 * Возвращает TRUE если строка str это NULL, строка нулевой длины, или строка из одних пробелов
 *
 * source [210217114100]
 */
function isEmptyOrWhitespaces(str) {
  return !str || str.length === 0 || /^\s*$/.test(str);
}
/**
 * ID [[210713104651]] rev 1 1.0 2021-07-13
 * source ID [210518234642] rev 1 1.0 2021-05-18
 *
 * Возвращает сколько раз строка (2) встречается в строке (1).
 * Чувствительна к регистру.
 * Если не находит вхождений, и в невалидных случаях, возвращает 0.
 * @param target string (1) -- например 'aba'
 * @param substr string (2) -- например 'a'
 * @return number например 2
 */

function substrCount(target, substr) {
  if (target && substr) {
    var ret = target.split(substr).length - 1;
    return ret >= 0 ? ret : 0;
  }

  return 0;
}
/**
 * ID [[210713104605]] rev 1 1.0.0 2021-07-13
 * source ID [210518234643] rev 1 1.0 2021-05-19
 *
 * {тоже что и А только не чувствительна к регистру}
 *
 * Возвращает сколько раз строка (2) встречается в строке (1).
 * Не чувствительна к регистру.
 * Если не находит вхождений, и в невалидных случаях, возвращает 0.
 * @param target string (1) -- например 'aba'
 * @param substr string (2) -- например 'A'
 * @return number например 2
 */

function substrCountB(target, substr) {
  if (target && substr) {
    var ret = target.toLowerCase().split(substr.toLowerCase()).length - 1;
    return ret >= 0 ? ret : 0;
  }

  return 0;
}

var RsuvTuString = {
  __proto__: null,
  isEmptyOrWhitespaces: isEmptyOrWhitespaces,
  substrCount: substrCount,
  substrCountB: substrCountB
};

var RsuvTxStringB = /*#__PURE__*/function (_RsuvTxString) {
  _inheritsLoose(RsuvTxStringB, _RsuvTxString);

  function RsuvTxStringB() {
    return _RsuvTxString.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringB.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxString.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (isEmptyOrWhitespaces(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210705191242]]', 'contains only whitespaces');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210705190613]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxStringB;
}(RsuvTxString);

var RsuvTxStringC = /*#__PURE__*/function (_RsuvTxStringB) {
  _inheritsLoose(RsuvTxStringC, _RsuvTxStringB);

  function RsuvTxStringC() {
    return _RsuvTxStringB.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringC.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxStringB.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (/^\s/.test(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210705191717]]', 'started with whitespace');
      }

      if (/\s$/.test(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210705191826]]', 'ended with whitespace');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210705191508]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxStringC;
}(RsuvTxStringB);

var RsuvTxEmail = /*#__PURE__*/function (_RsuvTxStringAA) {
  _inheritsLoose(RsuvTxEmail, _RsuvTxStringAA);

  function RsuvTxEmail() {
    return _RsuvTxStringAA.apply(this, arguments) || this;
  }

  var _proto = RsuvTxEmail.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    var resV = EmailValidator.validate(this.val);

    if (!resV) {
      return new RsuvResultBoolPknz(false, '[[210706113857]]', 'EmailValidator');
    } // const resValid = super.bnuwIsValid();
    // if (!resValid.success) {
    //   return resValid;
    // }
    // // ---
    // const b1 = new RegExp(
    //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    // ).test(this.val)
    // if (!b1) {
    //   return new RsuvResultBoolPknz(false, '[[210706105956]]', 'is not email');
    // }
    // const splited = this.val.split('@');
    // if (splited.length > 2) {
    //   return new RsuvResultBoolPknz(false, '[[210706112944]]', 'only one @ allowed');
    // }
    // if(splited[0].length > 64) {
    //   return new RsuvResultBoolPknz(false, '[[210706113459]]', 'local-part is > 64 length');
    // }


    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxEmail;
}(RsuvTxStringAA);

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var RsuvZrnxSubData = function RsuvZrnxSubData(
/**
 * номер страницы
 */
page,
/**
 * общее количество страниц
 */
pageCount,
/**
 * общее количество элементов
 */
elemsAllCount,
/**
 * коллекция элементов страницы
 */
elemsOfPage) {
  if (page === void 0) {
    page = 0;
  }

  if (pageCount === void 0) {
    pageCount = 1;
  }

  if (elemsAllCount === void 0) {
    elemsAllCount = 0;
  }

  if (elemsOfPage === void 0) {
    elemsOfPage = [];
  }

  this.page = page;
  this.pageCount = pageCount;
  this.elemsAllCount = elemsAllCount;
  this.elemsOfPage = elemsOfPage;
};
/**
 * [[zrnx]]
 *
 * Сущность для использования в качестве посредника между абстрактным источником-данных (интерефейс
 * {@link RsuvDataSourceAecrNT}) и UI-списком-с-пагинацией.
 *
 * При вызове {@link make} делаются обращения к {@link dataSource} и на базе полученных данных вычисляются поля {@link page}
 * {@link elemsAllCount}, {@link elemsOfPage}, {@link pageCount}. Эти поля можно получить с помощью метода {@link dataGet}
 * в виде типа {@link RsuvZrnxSubData} для последующего использования в качестве входных данных для UI-списка-с-пагинацией
 */

var RsuvAdapterZrnx = /*#__PURE__*/function () {
  /**
   *
   * @param perPage (1) -- число-записей-на-странице, 1+
   * @param dataSource (2) -- источник-данных
   */
  function RsuvAdapterZrnx(perPage, dataSource) {
    this.perPage = perPage;
    this.dataSource = dataSource;
    this.page = 0;
    this.elemsAllCount = 0;
    this.elemsOfPage = [];
    this.pageCount = 0;
  }
  /**
   * Запрос данных и вычисление полей текущего объекта
   *
   * @param pageNum (1) -- номер страницы
   * @param last (2) -- если TRUE, то (1) игнирируется и вычисление выполняется для последней страницы
   */


  var _proto = RsuvAdapterZrnx.prototype;

  _proto.make =
  /*#__PURE__*/
  function () {
    var _make = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(pageNum, last) {
      var elemsCount, rmPagination, pageCount, _rmPagination$indexes, indexStart, indexLast;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (last === void 0) {
                last = false;
              }

              _context.next = 3;
              return this.dataSource.elemsAllCountGet();

            case 3:
              elemsCount = _context.sent;
              // ---
              rmPagination = new RsuvPaginationGyth(elemsCount, this.perPage);
              pageCount = rmPagination.pageCount;

              if (last) {
                this.page = pageCount;
              } else {
                this.page = pageCount < pageNum ? pageCount : pageNum;
              }

              this.elemsAllCount = elemsCount;
              this.pageCount = pageCount; // ---

              _rmPagination$indexes = rmPagination.indexesByPageNum(this.page), indexStart = _rmPagination$indexes.indexStart, indexLast = _rmPagination$indexes.indexLast;
              _context.next = 12;
              return this.dataSource.elemsGet(indexStart, indexLast - indexStart + 1);

            case 12:
              this.elemsOfPage = _context.sent;
              return _context.abrupt("return", new RsuvResultBoolPknz());

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function make(_x, _x2) {
      return _make.apply(this, arguments);
    }

    return make;
  }()
  /**
   * Получение результатов вычислений
   */
  ;

  _proto.dataGet = function dataGet() {
    return new RsuvZrnxSubData(this.page, this.pageCount, this.elemsAllCount, this.elemsOfPage);
  };

  return RsuvAdapterZrnx;
}();

/*
-- [[ntxe]] - фильтр, например 'id=1&id=2' или 'json-server&author=typicode'.
          Тут & работает как ИЛИ, т.е. для 'id=1&id=2' вернутся две записи (если они существуют с такими id)

 */

/**
 * [[ktvg]]
 *
 * Утилита для запросав к json-server (https://github.com/typicode/json-server)
 */

var RsuvTxJsonServer = /*#__PURE__*/function () {
  /**
   *
   * @param basePath (1) -- expample 'http://localhost:21884/'
   * @param collectionName (2) -- example 'products'
   */
  function RsuvTxJsonServer(basePath, collectionName) {
    this.basePath = basePath;
    this.collectionName = collectionName;
    this.path = "" + this.basePath + this.collectionName;
  }

  var _proto = RsuvTxJsonServer.prototype;

  _proto.elemsCountGetAll = /*#__PURE__*/function () {
    var _elemsCountGetAll = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var resp, countSt;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(this.path + "?_limit=1");

            case 2:
              resp = _context.sent;
              countSt = resp.headers.get('x-total-count');
              return _context.abrupt("return", toInteger(countSt));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function elemsCountGetAll() {
      return _elemsCountGetAll.apply(this, arguments);
    }

    return elemsCountGetAll;
  }();

  _proto.elemsGetAll = /*#__PURE__*/function () {
    var _elemsGetAll = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var resp;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetch(this.path);

            case 2:
              resp = _context2.sent;
              return _context2.abrupt("return", resp.json());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function elemsGetAll() {
      return _elemsGetAll.apply(this, arguments);
    }

    return elemsGetAll;
  }();

  _proto.elemsGetPage = /*#__PURE__*/function () {
    var _elemsGetPage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(pageNum, perPage) {
      var resp;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return fetch(this.path + "?_page=" + pageNum + "&_limit=" + perPage);

            case 2:
              resp = _context3.sent;
              return _context3.abrupt("return", resp.json());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function elemsGetPage(_x, _x2) {
      return _elemsGetPage.apply(this, arguments);
    }

    return elemsGetPage;
  }();

  _proto.elemsGet = /*#__PURE__*/function () {
    var _elemsGet = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(offset, limit) {
      var resp;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetch(this.path + "?_start=" + offset + "&_limit=" + limit);

            case 2:
              resp = _context4.sent;
              return _context4.abrupt("return", resp.json());

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function elemsGet(_x3, _x4) {
      return _elemsGet.apply(this, arguments);
    }

    return elemsGet;
  }()
  /**
   *
   * @param filter (1) -- см. [ntxe]
   */
  ;

  _proto.elemsGetByFilter =
  /*#__PURE__*/
  function () {
    var _elemsGetByFilter = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(filter) {
      var resp;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return fetch(this.path + "?" + filter);

            case 2:
              resp = _context5.sent;
              return _context5.abrupt("return", resp.json());

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function elemsGetByFilter(_x5) {
      return _elemsGetByFilter.apply(this, arguments);
    }

    return elemsGetByFilter;
  }()
  /**
   * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов)
   * @param fieldName (1) --
   * @param substring (2) --
   */
  ;

  _proto.elemsGetByFilterB =
  /*#__PURE__*/
  function () {
    var _elemsGetByFilterB = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(fieldName, substring) {
      var elems;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.elemsGetAll();

            case 2:
              elems = _context6.sent;
              return _context6.abrupt("return", elems.filter(function (elem) {
                return substrCountB(elem[fieldName], substring) > 0;
              }));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function elemsGetByFilterB(_x6, _x7) {
      return _elemsGetByFilterB.apply(this, arguments);
    }

    return elemsGetByFilterB;
  }();

  _proto.elemDelete = /*#__PURE__*/function () {
    var _elemDelete = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(id) {
      var ret;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return fetch(this.path + "/" + id, {
                method: 'DELETE'
              });

            case 2:
              ret = _context7.sent;

              if (!(ret.status !== 200)) {
                _context7.next = 5;
                break;
              }

              return _context7.abrupt("return", new RsuvResultBoolPknz(false, '210315153800', "err*: id not found; id [" + id + "]; ret.status [" + ret.status + "]"));

            case 5:
              return _context7.abrupt("return", new RsuvResultBoolPknz());

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function elemDelete(_x8) {
      return _elemDelete.apply(this, arguments);
    }

    return elemDelete;
  }();

  _proto.elemsDelete = /*#__PURE__*/function () {
    var _elemsDelete = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(ids) {
      var ret, _iterator, _step, id, res;

      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              ret = [];
              _iterator = _createForOfIteratorHelperLoose(ids);

            case 2:
              if ((_step = _iterator()).done) {
                _context8.next = 10;
                break;
              }

              id = _step.value;
              _context8.next = 6;
              return this.elemDelete(id);

            case 6:
              res = _context8.sent;
              ret.push(res);

            case 8:
              _context8.next = 2;
              break;

            case 10:
              return _context8.abrupt("return", ret);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function elemsDelete(_x9) {
      return _elemsDelete.apply(this, arguments);
    }

    return elemsDelete;
  }()
  /**
   *
   * @param filter (1) -- см. [ntxe]
   */
  ;

  _proto.elemsDeleteByFilter =
  /*#__PURE__*/
  function () {
    var _elemsDeleteByFilter = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(filter) {
      var elems;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.elemsGetByFilter(filter);

            case 2:
              elems = _context9.sent;
              _context9.next = 5;
              return this.elemsDelete(elems.map(function (el) {
                return el.id;
              }));

            case 5:
              return _context9.abrupt("return", _context9.sent);

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function elemsDeleteByFilter(_x10) {
      return _elemsDeleteByFilter.apply(this, arguments);
    }

    return elemsDeleteByFilter;
  }();

  _proto.elemCreate = /*#__PURE__*/function () {
    var _elemCreate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(data) {
      var res;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return fetch("" + this.path, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

            case 2:
              res = _context10.sent;

              if (!(res.status === 201)) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt("return", new RsuvResultBoolPknz());

            case 5:
              return _context10.abrupt("return", new RsuvResultBoolPknz(false, '210316120200', "err*: not created; status [" + res.status + "] url [" + res.url + "]"));

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function elemCreate(_x11) {
      return _elemCreate.apply(this, arguments);
    }

    return elemCreate;
  }();

  _proto.elemUpdate = /*#__PURE__*/function () {
    var _elemUpdate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(data) {
      var res;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return fetch(this.path + "/" + data.id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

            case 2:
              res = _context11.sent;

              if (!(res.status === 200)) {
                _context11.next = 5;
                break;
              }

              return _context11.abrupt("return", new RsuvResultBoolPknz());

            case 5:
              return _context11.abrupt("return", new RsuvResultBoolPknz(false, '210318111500', "err*: not updated; status [" + res.status + "] url [" + res.url + "]"));

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function elemUpdate(_x12) {
      return _elemUpdate.apply(this, arguments);
    }

    return elemUpdate;
  }();

  return RsuvTxJsonServer;
}();

var bnuwUtilsVerify = function bnuwUtilsVerify(value) {
  if (!value) {
    return new RsuvResultBoolPknz(false, '[[210711215605]]', 'value is falsy');
  }

  var res = value.bnuwIsValid();

  if (!res) {
    return new RsuvResultBoolPknz(false, '[[210711215805]]', 'invalid value');
  }

  return res;
};
/**
 * Если возвращает пустой массив, значит все элементы (1) валидные, иначе в массиве результы неудачных проверок
 * @param values (1) -- элементы для проверки; пустой массив не валиден
 */

var bnuwUtilsVerifyMulti = function bnuwUtilsVerifyMulti(values) {
  if (Array.isArray(values) && values.length > 0) {
    var ret = [];
    values.forEach(function (el) {
      var verif = bnuwUtilsVerify(el);

      if (!verif.success) {
        ret.push(verif);
      }
    });
    return ret;
  }

  return [new RsuvResultBoolPknz(false, '[[210711221552]]')];
};

/*
 * Представляет строку не нулевой длины
 */
var RsuvTxBoolean = /*#__PURE__*/function () {
  function RsuvTxBoolean(val) {
    this.val = val;
  }

  var _proto = RsuvTxBoolean.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      if (!_.isBoolean(this.val)) {
        return new RsuvResultBoolPknz(false, '[[210711220826]]', 'is not boolean');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[210705185560]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxBoolean;
}();

/*
[[ecxm]] - массив из [gnpw]-объектов или пустой массив
[[gnpw]] - объект вида {id: string, checked: boolean}
 */
var RsuvEcxm = /*#__PURE__*/function () {
  function RsuvEcxm() {}

  RsuvEcxm.find = function find(models, id) {
    return models.find(function (model) {
      return model.id === id;
    });
  }
  /**
   * Добавляет новый элемент (2) в конец (1)
   * @param modelsBack (1) --
   * @param model
   */
  ;

  RsuvEcxm.append = function append(modelsBack, model) {
    var fModel = RsuvEcxm.find(modelsBack, model.id);

    if (fModel) {
      return new RsuvResultBoolPknz(false, '[[210712155908]]', 'already exist');
    }

    modelsBack.push(model);
    return new RsuvResultBoolPknz(true);
  };

  RsuvEcxm.appendMulti = function appendMulti(modelsBack, models) {
    var ret = [];
    models.forEach(function (model) {
      var res = RsuvEcxm.append(modelsBack, model);

      if (!res.success) {
        ret.push(res);
      }
    });
    return ret;
  };

  RsuvEcxm.update = function update(modelsBack, model) {
    var elem = RsuvEcxm.find(modelsBack, model.id);

    if (elem) {
      elem.checked = model.checked;
      return new RsuvResultBoolPknz(true);
    }

    return new RsuvResultBoolPknz(false, '[[210712160222]]', 'not finded');
  };

  RsuvEcxm.updateMulti = function updateMulti(modelsBack, models) {
    var ret = [];
    models.forEach(function (model) {
      var res = RsuvEcxm.update(modelsBack, model);

      if (!res.success) {
        ret.push(res);
      }
    });
    return ret;
  };

  RsuvEcxm["delete"] = function _delete(modelsBack, model) {
    var index = modelsBack.findIndex(function (elModel) {
      return elModel.id === model.id;
    });

    if (index !== -1) {
      modelsBack.splice(index, 1);
      return new RsuvResultBoolPknz(true);
    }

    return new RsuvResultBoolPknz(false, '[[210712160441]]', 'not finded');
  };

  RsuvEcxm.deleteMulti = function deleteMulti(modelsBack, models) {
    var ret = [];
    models.forEach(function (model) {
      var res = RsuvEcxm["delete"](modelsBack, model);

      if (!res.success) {
        ret.push(res);
      }
    });
    return ret;
  };

  RsuvEcxm.filter = function filter(models, checked) {
    return models.filter(function (elModel) {
      return elModel.checked === checked;
    });
  };

  RsuvEcxm.inverse = function inverse(modelsBack) {
    modelsBack.forEach(function (elModel) {
      return elModel.checked = !elModel.checked;
    });
  };

  RsuvEcxm.selectAll = function selectAll(modelsBack) {
    modelsBack.forEach(function (elModel) {
      if (!elModel.checked) {
        elModel.checked = true;
      }
    });
  };

  RsuvEcxm.deselectAll = function deselectAll(modelsBack) {
    modelsBack.forEach(function (elModel) {
      if (elModel.checked) {
        elModel.checked = false;
      }
    });
  };

  return RsuvEcxm;
}();
/**
 * Представление [gnpw]
 */

var RsuvCheckModelGnpw = /*#__PURE__*/function () {
  function RsuvCheckModelGnpw(id, checked) {
    if (id === void 0) {
      id = '';
    }

    if (checked === void 0) {
      checked = false;
    }

    this.id = id;
    this.checked = checked;
  }

  var _proto = RsuvCheckModelGnpw.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    var res = bnuwUtilsVerifyMulti([new RsuvTxStringAA(this.id), new RsuvTxBoolean(this.checked)]);

    if (res.length > 0) {
      return res[0];
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvCheckModelGnpw;
}();

exports.RSUV_AL_ALREADY_EXIST = RSUV_AL_ALREADY_EXIST;
exports.RsuvAdapterZrnx = RsuvAdapterZrnx;
exports.RsuvCheckModelGnpw = RsuvCheckModelGnpw;
exports.RsuvEcxm = RsuvEcxm;
exports.RsuvErr = RsuvErr;
exports.RsuvPaginationGyth = RsuvPaginationGyth;
exports.RsuvResultBoolPknz = RsuvResultBoolPknz;
exports.RsuvResultTibo = RsuvResultTibo;
exports.RsuvTuString = RsuvTuString;
exports.RsuvTxEmail = RsuvTxEmail;
exports.RsuvTxJsonServer = RsuvTxJsonServer;
exports.RsuvTxString = RsuvTxString;
exports.RsuvTxStringAA = RsuvTxStringAA;
exports.RsuvTxStringB = RsuvTxStringB;
exports.RsuvTxStringC = RsuvTxStringC;
exports.RsuvValueAnd = RsuvValueAnd;
exports.RsuvZrnxSubData = RsuvZrnxSubData;
//# sourceMappingURL=rsuv-lib.cjs.development.js.map
