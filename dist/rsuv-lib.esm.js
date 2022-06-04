import _ from 'lodash-es';
import dayjs from 'dayjs';
import EmailValidator from 'email-validator';
import toInteger from 'lodash-es/toInteger';

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
 *
 * представление результата вида "успех/не-успех"
 *
 * СМ. ТАКЖЕ: [220108130347]
 */
var RsuvResultBoolPknz = /*#__PURE__*/function () {
  function RsuvResultBoolPknz(success, errCode, errMessage) {
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
  }
  /**
   * Возвращает информацию о том какие элементы из (1) являются {success: true, ...} а какие {success: false, ...}
   * @param elems (1) --
   */


  RsuvResultBoolPknz.infoMulti = function infoMulti(elems) {
    var ret = {
      success: [],
      notSuccess: []
    };
    elems.forEach(function (el) {
      if (el.success) {
        ret.success.push(el);
      } else {
        ret.notSuccess.push(el);
      }
    });
    return ret;
  }
  /**
   * Возвращает TRUE если ВСЕ элементы (1) являются {success: true, ...}.
   * Если elems это пустой массив, то возвращает FALSE
   * @param elems (1) --
   */
  ;

  RsuvResultBoolPknz.successAllIsSugar = function successAllIsSugar(elems) {
    var info = RsuvResultBoolPknz.infoMulti(elems);
    var b1 = info.notSuccess.length === 0 && info.success.length > 0;

    if (b1) {
      return new RsuvResultBoolPknz(true);
    }

    if (info.notSuccess.length > 0) {
      return info.notSuccess[0];
    }

    return new RsuvResultBoolPknz(false, '[[210725095419]]', '');
  };

  return RsuvResultBoolPknz;
}();

/**
 * Представление результата "успешно/неуспешно" плюс значение <T> результата
 *
 * ID [[tibo]]
 */
var RsuvResultTibo = /*#__PURE__*/function () {
  function RsuvResultTibo(tibo) {
    this.success = true;

    if (tibo) {
      this.success = tibo.success;
      this.successCode = tibo.successCode;
      this.value = tibo.value;
      this.errCode = tibo.errCode;
      this.errMessage = tibo.errMessage;
    }
  }
  /**
   * [[220108130347]]
   * @param pknz
   */


  RsuvResultTibo.fromPknz = function fromPknz(pknz) {
    if (pknz) {
      return new RsuvResultTibo({
        success: pknz.success,
        errCode: pknz.errCode,
        errMessage: pknz.errMessage
      });
    }

    return new RsuvResultTibo({
      success: false,
      errCode: '[[210725095953]]',
      errMessage: ''
    });
  };

  return RsuvResultTibo;
}();

/*
константы разные
 */

/**
 * Когда что-то уже существует
 */
var RSUV_AL_ALREADY_EXIST = 'RSUV_AL_ALREADY_EXIST';

/**
 * Выполняет [bnuw]-проверку сущности (1) и если результат неуспешен то брасает исключение с результатом этой проверки
 * @param obj
 */

function bnuwUtilsThrowIf(obj) {
  var validRes = obj.bnuwIsValid();

  if (!validRes.success) {
    throw validRes;
  }
}
/**
 * Проверяет значение (1)
 * @param value (1) --
 */

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

/**
 * Представляет строку не нулевой длины
 *
 * ID [[1636807341]]
 *
 * @implements RsuvBnuwNT
 */

var RsuvTxString = /*#__PURE__*/function () {
  function RsuvTxString(val) {
    this.val = val;
    bnuwUtilsThrowIf(this);
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

/**
 * Представляет строку которая: (не нулевой длины) И (не содержит пробелов/переносов)
 */

var RsuvTxStringAB = /*#__PURE__*/function (_RsuvTxString) {
  _inheritsLoose(RsuvTxStringAB, _RsuvTxString);

  function RsuvTxStringAB() {
    return _RsuvTxString.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringAB.prototype;

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

  return RsuvTxStringAB;
}(RsuvTxString);

/**
 * Представляет строку которая: (не нулевой длины) И (состоит только из символов [a-zA-Z0-9_])
 *
 * ID [[1636807311]]
 * @implements RsuvBnuwNT
 */

var RsuvTxStringAC = /*#__PURE__*/function (_RsuvTxString) {
  _inheritsLoose(RsuvTxStringAC, _RsuvTxString);

  function RsuvTxStringAC() {
    return _RsuvTxString.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringAC.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxString.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (!/^[a-zA-Z0-9_]+$/.test(this.val)) {
        return new RsuvResultBoolPknz(false, '[[1636300398]]', 'allowable only [a-zA-Z0-9_] symbols');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[1636300404]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxStringAC;
}(RsuvTxString);

/**
 * Представляет строку которая: (не нулевой длины) И (состоит только из символов [a-zA-Z0-9_])
 * И (начинается не с цифры)
 *
 * ID [[1636807220]]
 * @implements RsuvBnuwNT
 */

var RsuvTxStringACB = /*#__PURE__*/function (_RsuvTxStringAC) {
  _inheritsLoose(RsuvTxStringACB, _RsuvTxStringAC);

  function RsuvTxStringACB() {
    return _RsuvTxStringAC.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringACB.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxStringAC.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (/^[0-9]$/.test(this.val[0])) {
        return new RsuvResultBoolPknz(false, '[[1636301354]]', 'first number is not allowable');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[1636301361]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxStringACB;
}(RsuvTxStringAC);

/**
 * Представляет строку которая: (не нулевой длины) И (состоит только из символов [0-9] т.е. только из цифр)
 *
 * ID [[211210125644]]
 * @implements RsuvBnuwNT
 */

var RsuvTxStringACC = /*#__PURE__*/function (_RsuvTxStringAC) {
  _inheritsLoose(RsuvTxStringACC, _RsuvTxStringAC);

  function RsuvTxStringACC() {
    return _RsuvTxStringAC.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringACC.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxStringAC.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (!/^[0-9]+$/.test(this.val)) {
        return new RsuvResultBoolPknz(false, '[[211210125801]]', 'only numbers allowable');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[211210125818]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxStringACC;
}(RsuvTxStringAC);

/*
утилиты для String
 */
/**
 * Возвращает TRUE если строка str это falsy, строка нулевой длины, или строка из одних пробелов
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
/**
 * Возвращает информацию о том в каких местах строки (1) встречается строка (2).
 * Допускает содержание в (2) символов считающихся специальными для регулярных выражений - экранирует их.
 * ID [[210801094836]] rev 1 1.0.0 2021-08-01
 * @param target (1) --
 * @param substr (2) --
 * @param ignoreCase (3) -- TRUE если нужно игнорировать регистр символов
 * @return RsuvT7[] - пустой массив если вхождений не найдено и при нештатах
 */

function substrIndexes(target, substr, ignoreCase) {
  var ret = [];

  if (!target || !substr || !_.isString(target) || !_.isString(substr) || target.length < 1 || substr.length < 1 || target.length < substr.length) {
    return ret;
  }

  var substrEscape = _.escapeRegExp(substr);

  var rg = new RegExp(substrEscape, 'g' + (ignoreCase ? 'i' : ''));
  var res = true;

  while (res) {
    res = rg.exec(target);

    if (res) {
      ret.push(new RsuvT7(res.index, res.index + substr.length));
    }
  }

  return ret;
}
/**
 * Предоставляет полную информацию о том как строка (2) соотносится со строкой (1), например содержит ли (1) подстроку
 * (2), начинается ли с неё, заканчивается ли ей, имеет ли с ней полное соответствие. Вся эта информация проверяется для
 * двух вариантов - с учетом регистра и без учета регистра символов (этим отличается от версии А текущей функции)
 *
 * @param strTarget (1) --
 * @param strSub (2) --
 * @return RsuvResultTibo<RsuvT5>
 */

function stringsTwoInfoB(strTarget, strSub) {
  // --- verify
  var verif = RsuvResultBoolPknz.successAllIsSugar([strTarget.bnuwIsValid(), strSub.bnuwIsValid()]);

  if (!verif.success) {
    return RsuvResultTibo.fromPknz(verif);
  } // ---


  var strTargetRaw = strTarget.val;
  var strSubRaw = strSub.val; // ---

  var t5 = new RsuvT5(); // ---

  if (strSubRaw.length > strTargetRaw.length) {
    return new RsuvResultTibo({
      success: true,
      value: t5
    }); // <=== RETURN
  } // --- --- без учета регистра


  var t4NoSens = new RsuvT4(); // --- full match

  if (strTargetRaw.length === strSubRaw.length && strTargetRaw.toLowerCase() === strSubRaw.toLowerCase()) {
    t4NoSens.rsuvT3.push(RSUV_T3.COMPLETE_MATCH);
    t4NoSens.rsuvT3.push(RSUV_T3.STARTED);
    t4NoSens.rsuvT3.push(RSUV_T3.ENDED);
    t4NoSens.rsuvT3.push(RSUV_T3.CONTAINS);
    t4NoSens.containsCount = 1; // ---

    t4NoSens.containsIndexes.push(new RsuvT7(0, strSubRaw.length));
  } else {
    var indexes = substrIndexes(strTargetRaw, strSubRaw, true);
    t4NoSens.containsIndexes = indexes; // -- contains

    t4NoSens.containsCount = indexes.length;

    if (t4NoSens.containsCount > 0) {
      t4NoSens.rsuvT3.push(RSUV_T3.CONTAINS);
    } // -- started


    if (strTargetRaw.substring(0, strSubRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
      t4NoSens.rsuvT3.push(RSUV_T3.STARTED);
    } // -- ended


    if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
      t4NoSens.rsuvT3.push(RSUV_T3.ENDED);
    }
  } // --- --- с учетом регистра


  var t4Sens = new RsuvT4();

  if (strTargetRaw.length === strSubRaw.length && strTargetRaw === strSubRaw) {
    t4Sens.rsuvT3.push(RSUV_T3.COMPLETE_MATCH);
    t4Sens.rsuvT3.push(RSUV_T3.STARTED);
    t4Sens.rsuvT3.push(RSUV_T3.ENDED);
    t4Sens.rsuvT3.push(RSUV_T3.CONTAINS);
    t4Sens.containsCount = 1;
    t4Sens.containsIndexes.push(new RsuvT7(0, strSubRaw.length));
  } else {
    var indexes2 = substrIndexes(strTargetRaw, strSubRaw, false);
    t4Sens.containsIndexes = indexes2;
    t4Sens.containsCount = indexes2.length;

    if (t4Sens.containsCount > 0) {
      t4Sens.rsuvT3.push(RSUV_T3.CONTAINS);
    } // -- started


    if (strTargetRaw.substring(0, strSubRaw.length) === strSubRaw) {
      t4Sens.rsuvT3.push(RSUV_T3.STARTED);
    } // -- ended


    if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length) === strSubRaw) {
      t4Sens.rsuvT3.push(RSUV_T3.ENDED);
    }
  } // --- ---


  t5.sensitive = t4Sens;
  t5.notSensitive = t4NoSens; // ---

  return new RsuvResultTibo({
    success: true,
    value: t5
  });
}
/**
 * Предоставляет полную информацию о том как строка (2) соотносится со строкой (1), например содержит ли (1) подстроку
 * (2), начинается ли с неё, заканчивается ли ей, имеет ли с ней полное соответствие, на каких индексах начинается и
 * заканчивается подстрока (2) в строке (1). Вся эта информация проверяется для
 * двух варинатов - с учетом регистра и без учета регистра символов (3)
 * ID [[210801103621]] rev 1 1.0.0 2021-08-01
 * @param strTarget (1) --
 * @param strSub (2) --
 * @param ignoreCase (3) -- TRUE если нужно игнорировать регистр символов
 * @return RsuvResultTibo<RsuvT4>
 */

function stringsTwoInfo(strTarget, strSub, ignoreCase) {
  if (ignoreCase === void 0) {
    ignoreCase = true;
  }

  // --- verify
  var verif = RsuvResultBoolPknz.successAllIsSugar([strTarget.bnuwIsValid(), strSub.bnuwIsValid()]);

  if (!verif.success) {
    return RsuvResultTibo.fromPknz(verif);
  } // ---


  var strTargetRaw = strTarget.val;
  var strSubRaw = strSub.val; // ---

  var t4 = new RsuvT4();

  if (strSubRaw.length > strTargetRaw.length) {
    return new RsuvResultTibo({
      success: true,
      value: t4
    }); // <=== RETURN
  } // --- --- без учета регистра


  if (ignoreCase) {
    // --- full match
    if (strTargetRaw.length === strSubRaw.length && strTargetRaw.toLowerCase() === strSubRaw.toLowerCase()) {
      t4.rsuvT3.push(RSUV_T3.COMPLETE_MATCH);
      t4.rsuvT3.push(RSUV_T3.STARTED);
      t4.rsuvT3.push(RSUV_T3.ENDED);
      t4.rsuvT3.push(RSUV_T3.CONTAINS);
      t4.containsCount = 1; // ---

      t4.containsIndexes.push(new RsuvT7(0, strSubRaw.length));
    } else {
      var indexes = substrIndexes(strTargetRaw, strSubRaw, true);
      t4.containsIndexes = indexes; // -- contains

      t4.containsCount = indexes.length;

      if (t4.containsCount > 0) {
        t4.rsuvT3.push(RSUV_T3.CONTAINS);
      } // -- started


      if (strTargetRaw.substring(0, strSubRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
        t4.rsuvT3.push(RSUV_T3.STARTED);
      } // -- ended


      if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
        t4.rsuvT3.push(RSUV_T3.ENDED);
      }
    }
  } else {
    // --- --- с учетом регистра
    if (strTargetRaw.length === strSubRaw.length && strTargetRaw === strSubRaw) {
      t4.rsuvT3.push(RSUV_T3.COMPLETE_MATCH);
      t4.rsuvT3.push(RSUV_T3.STARTED);
      t4.rsuvT3.push(RSUV_T3.ENDED);
      t4.rsuvT3.push(RSUV_T3.CONTAINS);
      t4.containsCount = 1;
      t4.containsIndexes.push(new RsuvT7(0, strSubRaw.length));
    } else {
      var indexes2 = substrIndexes(strTargetRaw, strSubRaw, false);
      t4.containsIndexes = indexes2;
      t4.containsCount = indexes2.length;

      if (t4.containsCount > 0) {
        t4.rsuvT3.push(RSUV_T3.CONTAINS);
      } // -- started


      if (strTargetRaw.substring(0, strSubRaw.length) === strSubRaw) {
        t4.rsuvT3.push(RSUV_T3.STARTED);
      } // -- ended


      if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length) === strSubRaw) {
        t4.rsuvT3.push(RSUV_T3.ENDED);
      }
    }
  } // ---


  return new RsuvResultTibo({
    success: true,
    value: t4
  });
}
/**
 * [[asau24]]
 * СМ. ТАКЖЕ: [asau22]
 */

var RSUV_T3;

(function (RSUV_T3) {
  // target начинается с sub
  RSUV_T3["STARTED"] = "rsuv_t3_started"; // target заканчивается на sub

  RSUV_T3["ENDED"] = "rsuv_t3_ended"; // target содержит sub

  RSUV_T3["CONTAINS"] = "rsuv_t3_contains"; // target полностью совпадает с sub

  RSUV_T3["COMPLETE_MATCH"] = "rsuv_t3_complete_match";
})(RSUV_T3 || (RSUV_T3 = {}));
/**
 * Учёт регистра символов
 */


var RSUV_T6_CASE;

(function (RSUV_T6_CASE) {
  RSUV_T6_CASE["SENSITIVE"] = "rsuv_t6_case_sensitive";
  RSUV_T6_CASE["NOT_SENSITIVE"] = "rsuv_t6_not_case_sensitive";
})(RSUV_T6_CASE || (RSUV_T6_CASE = {}));

var RsuvT4 = function RsuvT4() {
  // сколько раз sub встречается в target
  this.containsCount = 0;
  this.containsIndexes = [];
  this.rsuvT3 = [];
};
var RsuvT5 = function RsuvT5() {
  // информация для варианта "чувствительно к регистру"
  this.sensitive = new RsuvT4(); // информация для варианта "НЕ чувствительно к регистру"

  this.notSensitive = new RsuvT4();
};
var RsuvT7 = function RsuvT7(startIndex, endIndex) {
  if (startIndex === void 0) {
    startIndex = 0;
  }

  if (endIndex === void 0) {
    endIndex = 0;
  }

  this.startIndex = startIndex;
  this.endIndex = endIndex;
};

var RsuvTuString = {
  __proto__: null,
  isEmptyOrWhitespaces: isEmptyOrWhitespaces,
  substrCount: substrCount,
  substrCountB: substrCountB,
  substrIndexes: substrIndexes,
  stringsTwoInfoB: stringsTwoInfoB,
  stringsTwoInfo: stringsTwoInfo,
  get RSUV_T3 () { return RSUV_T3; },
  get RSUV_T6_CASE () { return RSUV_T6_CASE; },
  RsuvT4: RsuvT4,
  RsuvT5: RsuvT5,
  RsuvT7: RsuvT7
};

/**
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов)
 */

var RsuvTxStringAD = /*#__PURE__*/function (_RsuvTxString) {
  _inheritsLoose(RsuvTxStringAD, _RsuvTxString);

  function RsuvTxStringAD() {
    return _RsuvTxString.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringAD.prototype;

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

  return RsuvTxStringAD;
}(RsuvTxString);

/**
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов) И (не начинается с пробела/переноса)
 * И (не заканчивается пробелом/переносом)
 */

var RsuvTxStringADB = /*#__PURE__*/function (_RsuvTxStringAD) {
  _inheritsLoose(RsuvTxStringADB, _RsuvTxStringAD);

  function RsuvTxStringADB() {
    return _RsuvTxStringAD.apply(this, arguments) || this;
  }

  var _proto = RsuvTxStringADB.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxStringAD.prototype.bnuwIsValid.call(this);

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
      return new RsuvResultBoolPknz(false, '[[210705191508]]', err == null ? void 0 : err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxStringADB;
}(RsuvTxStringAD);

/*
ПОНЯТИЯ:
-- [yata] - {number} милисекунды с 01.01.1970
-- [eavv] - {number} секунды с 01.01.1970
-- [necz] - {string} [yata] в виде строки
-- [tafb] - {string} [eavv] в виде строки
-- [rvuo] - {string} формат YYYY-MM-DDTHH:mm, например '2021-12-12T12:04'
 */

var DATETIME;

(function (DATETIME) {
  DATETIME["YATA"] = "yata";
  DATETIME["NECZ"] = "necz";
  DATETIME["RVUO"] = "rvuo";
})(DATETIME || (DATETIME = {}));

var ResultAsau36 = function ResultAsau36(success, value, code) {
  this.success = success;
  this.value = value;
  this.code = code;
}; // export function convert(from: DATETIME, to: DATETIME, fromVal: any): ResultAsau36<any> {
//   if (!from) {
//     return new ResultAsau36(false, null, 1)
//   }
//   if (!to) {
//     return new ResultAsau36(false, null, 2)
//   }
//   if (!fromVal) {
//     return new ResultAsau36(false, null, 3)
//   }
//
// }

/**
 * Преобразование формата [yata] (1) в формат [rvuo].
 * @param yata {number} (1) -- [yata], например 1637347161129
 * @return null если (1) не finite-число
 */

function rvuoFromYata(yata) {
  if (!yataIs(yata)) {
    return null;
  }

  return dayjs(yata).format('YYYY-MM-DDTHH:mm');
}
function yataFromRvuo(rvuo) {
  if (!_.isString(rvuo)) {
    return new ResultAsau36(false, 0, 2);
  }

  var necz = rvuoIs(rvuo);

  if (necz) {
    var yata = _.toInteger(necz);

    return new ResultAsau36(true, yata, 0);
  }

  return new ResultAsau36(false, 0, 1);
}
function yataIs(yata) {
  if (!_.isFinite(yata)) {
    return false;
  }

  return true;
}
function yataFromEavv(eavv) {
  if (!eavvIs(eavv)) {
    return new ResultAsau36(false, 0, 1);
  }

  var yata = eavv * 1000;
  return new ResultAsau36(true, yata, 0);
}
/**
 * Возвращает {success: true, value: true, ...} если дата (1) не достигла даты (2) (т.е. меньше даты (2))
 * @param yata (1) -- [yata]
 * @param yataExpire (2) -- [yata]
 */

function yataIsActual(yata, yataExpire) {
  if (!yataIs(yata)) {
    return new ResultAsau36(false, false, 1);
  }

  if (!yataIs(yataExpire)) {
    return new ResultAsau36(false, false, 2);
  }

  if (yata > yataExpire) {
    return new ResultAsau36(true, false, 0);
  }

  return new ResultAsau36(true, true, 0);
}
function eavvIs(eavv) {
  if (!_.isFinite(eavv)) {
    return false;
  }

  return true;
}
/**
 * Возвращает [necz] ([yata] как строка) от (1) если (1) это валидный [rvuo], иначе возвращает null
 * @param rvuo (1) -- [rvuo], например '2021-12-10T12:04'
 */

function rvuoIs(rvuo) {
  if (!_.isString(rvuo)) {
    return null;
  }

  var ex = /^(\d\d\d\d+)-(\d\d)-(\d\d)T(\d\d):(\d\d)$/.exec(rvuo);

  if (ex) {
    var month = Number(ex[2]);

    var _day = Number(ex[3]);

    var hour = Number(ex[4]);
    var minute = Number(ex[5]);

    if (month < 1 || month > 12) {
      return null;
    }

    if (_day < 1 || _day > 31) {
      return null;
    }

    if (hour < 0 && hour > 24) {
      return null;
    }

    if (minute < 0 && minute > 59) {
      return null;
    }
  } // ---


  var day = dayjs(rvuo);
  var yata = day.toDate().getTime();

  if (!_.isFinite(yata)) {
    return null;
  }

  return yata + '';
}

var RsuvTuDateTime = {
  __proto__: null,
  get DATETIME () { return DATETIME; },
  ResultAsau36: ResultAsau36,
  rvuoFromYata: rvuoFromYata,
  yataFromRvuo: yataFromRvuo,
  yataIs: yataIs,
  yataFromEavv: yataFromEavv,
  yataIsActual: yataIsActual,
  eavvIs: eavvIs,
  rvuoIs: rvuoIs
};

var RsuvTxEmail = /*#__PURE__*/function (_RsuvTxStringAB) {
  _inheritsLoose(RsuvTxEmail, _RsuvTxStringAB);

  function RsuvTxEmail() {
    return _RsuvTxStringAB.apply(this, arguments) || this;
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
}(RsuvTxStringAB);

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

/**
 * @class
 */

var RsuvZrnxSubData =
/** @constructor */
function RsuvZrnxSubData(
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
 *
 * @class
 */

var RsuvAdapterZrnx = /*#__PURE__*/function () {
  /**
   * @constructor
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
   * @async
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
 * Представляет boolean
 */
var RsuvTxBoolean = /*#__PURE__*/function () {
  function RsuvTxBoolean(val) {
    this.val = val;
    bnuwUtilsThrowIf(this);
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
Сущности для работы с checked-списками (списки хранящие информацию о том какой элемент чекнут, какой нет)

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
    var res = bnuwUtilsVerifyMulti([new RsuvTxStringAB(this.id), new RsuvTxBoolean(this.checked)]);

    if (res.length > 0) {
      return res[0];
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvCheckModelGnpw;
}();

/**
 * -- success - TRUE означает успешный результат
 * -- codeNum - любое положительное число означает ошибку, -1 означает неопределённый результат, значение
 * меньшее -1 означает код успешного результата
 */
var RsuvResultAsau11 = function RsuvResultAsau11(codeNum, success) {
  if (codeNum === void 0) {
    codeNum = -1;
  }

  if (success === void 0) {
    success = false;
  }

  this.success = false;
  this.codeNum = 0;
  this.success = success;
  this.codeNum = codeNum;
};

/**
 * Утилитные статические методы для работы с массивами
 */

var RsuvTuArray = /*#__PURE__*/function () {
  function RsuvTuArray() {}

  /**
   * Извлекает из массива (1) элементы с индекса (2) по индекс (3) (включая эти индексы), и возвращает их в виде нового
   * массива.
   * В случае проблем возвращает тип {@link RsuvResultAsau11}
   * @param arr (1) -- например ['aa', 'ab', 'ac', 'ad']
   * @param indexStart (2) -- например 1
   * @param indexEnd (3) -- например 2
   * @return например ['ab', 'ac']
   */
  RsuvTuArray.elemsDiap = function elemsDiap(arr, indexStart, indexEnd) {
    if (!RsuvTuArray.fnArrValidIs(arr)) return new RsuvResultTibo({
      success: false,
      errCode: '1'
    });
    if (!RsuvTuArray.fnIndexValidIs(arr, indexStart)) return new RsuvResultTibo({
      success: false,
      errCode: '2'
    });
    if (!RsuvTuArray.fnIndexValidIs(arr, indexEnd)) return new RsuvResultTibo({
      success: false,
      errCode: '3'
    });

    if (indexEnd < indexStart) {
      return new RsuvResultTibo({
        success: false,
        errCode: '4'
      });
    }

    if (indexEnd === indexStart) {
      return new RsuvResultTibo({
        success: true,
        value: [arr[indexStart]],
        successCode: '100'
      });
    }

    return new RsuvResultTibo({
      success: true,
      value: arr.slice(indexStart, indexEnd + 1),
      successCode: '101'
    });
  }
  /**
   * Удаляет элемент по индексу (2)
   * @param arrBack
   * @param index
   * @return RsuvResultAsau11
   */
  ;

  RsuvTuArray.elemDelete = function elemDelete(arrBack, index) {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1);
    if (!RsuvTuArray.fnIndexValidIs(arrBack, index)) return new RsuvResultAsau11(2);
    arrBack.splice(index, 1);
    return new RsuvResultAsau11(0, true);
  }
  /**
   * Добавляет элемент (3) по индексу (2), существующие элементы сдвигаются. Если нужно добавить в самый конец,
   * указать индекс (2) равный длине массива (1)
   * @param arrBack (1) -- массив, мутируется, например [1, 2, 3]
   * @param index (2) -- например 1
   * @param elem (3) -- например 's'
   * @return RsuvResultAsau11 ..., (1) например [1, 's',  2, 3]
   */
  ;

  RsuvTuArray.elemAdd = function elemAdd(arrBack, index, elem) {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1);
    if (!RsuvTuArray.fnIndexValidIsB(arrBack, index)) return new RsuvResultAsau11(2);
    arrBack.splice(index, 0, elem);
    return new RsuvResultAsau11(0, true);
  }
  /**
   * В массиве (1) перемещает элемент с индекса (2) на индекс (3)
   * @param arrBack {any[]} (1) -- массив, мутируется
   * @param indexFrom {number} (2) --
   * @param indexTo {number} (3) --
   * @return RsuvResultAsau11
   */
  ;

  RsuvTuArray.elemMove = function elemMove(arrBack, indexFrom, indexTo) {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1);
    if (!RsuvTuArray.fnIndexValidIs(arrBack, indexFrom)) return new RsuvResultAsau11(2);
    if (!RsuvTuArray.fnIndexValidIs(arrBack, indexTo)) return new RsuvResultAsau11(3);

    if (indexFrom === indexTo) {
      return new RsuvResultAsau11(0, true);
    } // ---


    var el = arrBack.splice(indexFrom, 1);
    arrBack.splice(indexTo, 0, el[0]);
    return new RsuvResultAsau11(0, true);
  }
  /**
   * Меняет местами элементы (2) и (3)
   * @param arrBack (1) -- массив, мутируется
   * @param index1 (2) --
   * @param index2 (3) --
   * @return RsuvResultAsau11
   */
  ;

  RsuvTuArray.elemsSwap = function elemsSwap(arrBack, index1, index2) {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1);
    if (!RsuvTuArray.fnIndexValidIs(arrBack, index1)) return new RsuvResultAsau11(2);
    if (!RsuvTuArray.fnIndexValidIs(arrBack, index2)) return new RsuvResultAsau11(3);

    if (index1 === index2) {
      return new RsuvResultAsau11(0, true);
    } // ---


    var a = arrBack[index1];
    arrBack[index1] = arrBack[index2];
    arrBack[index2] = a;
    return new RsuvResultAsau11(0, true);
  }
  /**
   * Заменяет значением (2), первый элемент (1) удовлетворяющий предикату (3).
   * Неудачей считаются (среди прочего): пустой массив (1), если предикат (3) не функция
   * @param arrBack (1) -- массив, мутируется
   * @param value (2) -- новое значение
   * @param predicate (3) -- вызывается для каждого элемента (1); аргументы - первый это сам элемент, второй это
   * индекс этого элемента
   */
  ;

  RsuvTuArray.elemUpdate = function elemUpdate(arrBack, value, predicate) {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1);

    if (!_.isFunction(predicate)) {
      return new RsuvResultAsau11(2);
    }

    if (arrBack.length < 1) {
      return new RsuvResultAsau11(3);
    }

    var ix = arrBack.findIndex(function (el, index) {
      return predicate(el, index);
    });

    if (ix === -1) {
      return new RsuvResultAsau11(4);
    }

    arrBack[ix] = value;
    return new RsuvResultAsau11(0, true);
  }
  /**
   * Возвращает TRUE если массив (1) содержит ВСЕ элементы присутствующие в массиве (2), при условии выбрасывания
   * из (2) всех повторяющихся элементов.
   * Если (1) или (2) это пустые массивы, то возвращает FALSE.
   * @param arr1
   * @param arr2
   */
  ;

  RsuvTuArray.containsAll = function containsAll(arr1, arr2) {
    if (arr1.length < 1 || arr2.length < 1) return false;

    var arr3 = _.uniq(arr2);

    return _.intersection(arr1, arr3).length === arr3.length;
  };

  RsuvTuArray.fnIndexValidIs = function fnIndexValidIs(arr, index) {
    if (index < 0) {
      return false;
    }

    return index <= arr.length - 1;
  };

  RsuvTuArray.fnIndexValidIsB = function fnIndexValidIsB(arr, index) {
    if (index < 0) {
      return false;
    }

    return index <= arr.length;
  };

  RsuvTuArray.fnArrValidIs = function fnArrValidIs(arr) {
    return !!_.isArray(arr);
  };

  return RsuvTuArray;
}();

/**
 работа с "деревом" которое образуют поля объектов
 */
/**
 * Используется в RsuvTuTree.accum()
 */

var RsuvAsau90;

(function (RsuvAsau90) {
  RsuvAsau90["SUCCESS_CODE_1"] = "1";
  RsuvAsau90["SUCCESS_CODE_2"] = "2";
})(RsuvAsau90 || (RsuvAsau90 = {}));
/**
 * Используется в RsuvTuTree.accum().
 * Префикс используемый если не найден валидный ID *элемента.
 */


var RSUV_SPC_ID_PLUG_PREFIX = 'rsuv-spc-id-plug-';
var RsuvAsau92;

(function (RsuvAsau92) {
  RsuvAsau92["SUCCESS_CODE_1"] = "1";
  RsuvAsau92["SUCCESS_CODE_2"] = "2";
  RsuvAsau92["ERR_CODE_1"] = "100";
})(RsuvAsau92 || (RsuvAsau92 = {}));

var RsuvTuTree = /*#__PURE__*/function () {
  function RsuvTuTree() {}

  /**
   * Собирает из *объектов значения поля (2). *Объекты ищет как в (1), если (1) это массив, так и во всех полях (3),
   * если они массивы, рекурсивно.
   *
   * ПОНЯТИЯ
   * -- *объект - объект из (1) если (1) это массив, или объект из (3) если это массив. В *объекте ищется значение
   * поля (2)
   *
   * Моё видео-объяснение - https://www.notion.so/surr/video-220515-1250-dfeab95377e74c238c1eb066b51f730c
   *
   * @param obj (1) -- например [{id: 1, childs: [{id: 3}]}, {id: 2}]
   * @param fieldValueName (2) -- например 'id'
   * @param fieldChildsName (3) -- например 'childs'; если значение falsy то искать в этом поле не будет
   * @return например [1, 3, 2]
   */
  RsuvTuTree.values = function values(obj, fieldValueName, fieldChildsName) {
    function recurs(arrBack, elems) {
      elems.forEach(function (obj) {
        if (obj.hasOwnProperty(fieldValueName)) {
          arrBack.push(obj[fieldValueName]);
        }

        var childs = obj[fieldChildsName];

        if (childs && Array.isArray(childs) && childs.length > 0) {
          recurs(arrBack, childs);
        }
      });
    }

    var result = [];

    if (Array.isArray(obj)) {
      recurs(result, obj);
    } else {
      if (obj.hasOwnProperty(fieldValueName)) {
        result.push(obj[fieldValueName]);
      }

      var childs = obj[fieldChildsName];

      if (childs && Array.isArray(childs) && childs.length > 0) {
        recurs(result, childs);
      }
    }

    return result;
  }
  /**
   * Подсчитывает (аккумулирует) *строки. Для каждой *строки создаёт *рез-объект.
   * Числовые значения из (2) и (3) преобразуются к строке.
   * Если *ид-значение это не строка и не целое число, либо поля (3) в *элементе нет, то генерирует специальную
   * ID-заглушку с префиксом "{@link RSUV_SPC_ID_PLUG_PREFIX} + число-соответствующее-индексу-*элемента".
   * Регистр символов *строк учитывается.
   * Если *строка повторяется в *массиве-тегов несколько раз, то и *ид-значение будет встречаться несколько раз
   * в *рез-объекте если (4) is FALSE, иначе только один раз
   *
   * Моё видео-объяснение: https://www.notion.so/surr/video-220514-2257-6195c03c8fe3412b846401d181f6f6c0
   *
   * ПОНЯТИЯ
   * -- *массив - массив объектов (1)
   * -- *элемент - отдельный элемент *массива
   * -- *массив-тегов - массив из поля (2) *элемента
   * -- *ид-значение - содержимое поля (3) *элемента
   * -- *строка - элемент *массива-тегов
   * -- *рез-объект, тип {@link RsuvAsau89}  - объект описывающий результат по отдельной *строке; имеет вид
   * {value: X, ids: Y[]},
   * где X - это *строка, а Y - это массив *ид-значений *элементов где эта *строка встречается
   *
   * @param arr (1) -- массив объектов, например [
   *         {name: 'name1', tags: ['tag1', 'tag2']},
   *         {name: 'name2', tags: ['tag2', 'tag3']},
   *       ]
   * @param fieldNameValues (2) -- поле содежащее массив string | number, например 'tags'
   * @param fieldNameId (3) -- поле содержащее идентификатор типа string | number, например 'name'
   * @param isUniqueIds (4) --
   * @return например { success: true, value: [{value: 'tag1', ids: ['name1'], ...}], ...}
   */
  ;

  RsuvTuTree.accum = function accum(arr, fieldNameValues, fieldNameId, isUniqueIds) {
    /**
     * Добавляет (или не добавляет) в аккумулятор (1) запись
     * @param acc
     * @param key
     * @param id
     */
    function fnToAcc(acc, key, id) {
      if (!acc.has(key)) {
        acc.set(key, [id]);
      } else {
        var arr0 = acc.get(key);

        if (isUniqueIds) {
          arr0.includes(id) || arr0.push(id);
        } else {
          arr0.push(id);
        }
      }
    }

    if (arr.length > 0) {
      // --- acc
      var acc = new Map();
      arr.map(function (elObj, ix) {
        var values = _.get(elObj, fieldNameValues, []);

        if (_.isArray(values) && values.length > 0) {
          values.map(function (elVal) {
            if (_.isString(elVal) || _.isFinite(elVal)) {
              var elVal0 = elVal + '';

              var id = _.get(elObj, fieldNameId);

              var id0 = _.isString(id) ? id : _.isFinite(id) ? String(id) : null;

              if (id0 === null) {
                id0 = RSUV_SPC_ID_PLUG_PREFIX + String(ix);
              }

              fnToAcc(acc, elVal0, id0);
            }
          });
        }
      }); // --- преобразуем acc к RsuvAsau89[]

      var ret = [];
      acc.forEach(function (val, key) {
        ret.push({
          value: key,
          ids: val
        });
      }); // ---

      return new RsuvResultTibo({
        success: true,
        value: ret,
        successCode: RsuvAsau90.SUCCESS_CODE_1
      });
    }

    return new RsuvResultTibo({
      success: true,
      value: [],
      successCode: RsuvAsau90.SUCCESS_CODE_2
    });
  }
  /**
   * Проверяет на уникальность поле (2) объектов из (1). Если они все уникальны, то возвращает пустой массив, иначе
   * возвращает массив тех значений из (2) которые повторяются и то сколько раз они повторяются, и на каких индексах
   * эти повторы располагаются
   * @param arr (1) --
   * @param fieldName (2) -- например 'profile.name'
   * @param errInit (3) -- если TRUE то, если хоть в одном объекте из (1) не будет поля (2), то будет возвращён неуспех
   */
  ;

  RsuvTuTree.uniqValuesIs = function uniqValuesIs(arr, fieldName, errInit) {
    if (arr.length < 1) {
      return new RsuvResultTibo({
        success: true,
        value: [],
        successCode: RsuvAsau92.SUCCESS_CODE_2
      });
    } // --- mp


    var mp = new Map();
    var isSomeFieldNotExist = false;
    arr.map(function (el, ix) {
      var isHasField = _.has(el, fieldName);

      if (isHasField) {
        var value = _.get(el, fieldName);

        if (mp.has(value)) {
          var rr = mp.get(value);
          rr.count++;
          rr.indexes.push(ix);
        } else {
          mp.set(value, {
            count: 1,
            indexes: [ix]
          });
        }
      } else if (errInit) {
        isSomeFieldNotExist = true;
      }
    }); // ---

    if (isSomeFieldNotExist) {
      return new RsuvResultTibo({
        success: false,
        errCode: RsuvAsau92.ERR_CODE_1
      });
    } // ---


    var ret = [];
    mp.forEach(function (val, key) {
      if (val.count > 1) {
        ret.push({
          value: key,
          count: val.count,
          indexes: val.indexes
        });
      }
    }); // ---

    return new RsuvResultTibo({
      success: true,
      value: ret,
      successCode: RsuvAsau92.SUCCESS_CODE_1
    });
  }
  /**
   * Проходит по всем(*A*) сущностям (1), рекурсивно, и возвращает те их них (в виде массива объектов), для которых (2) даёт TRUE.
   *
   * (*A*) если (3) is FALSY по прекращает поиск после первой же находки.
   *
   * @param entry (1) -- массив или объект, например {aa: 1, bb: { cc: 3 }}
   * @param predicate (2) -- 1-параметр это ключ сущности, 2-й это значение сущности; например (key) => key === 'cc'
   * @param isEvery (3) -- например true
   * @return например [{ cc: 3 }]
   */
  ;

  RsuvTuTree.findDeepBy = function findDeepBy(entry, predicate, isEvery) {
    if (!entry) return [];
    var acc = [];
    var isFinded = false;
    var isFirst = true;
    JSON.stringify(entry, function (key0, value0) {
      if (!isFirst && (isEvery || !isEvery && !isFinded)) {
        if (predicate(key0, value0)) {
          var _acc$push;

          acc.push((_acc$push = {}, _acc$push[key0] = value0, _acc$push));
          isFinded = true;
        }
      }

      if (!isFirst && !isEvery && isFinded) {
        return undefined;
      }

      isFirst = false;
      return value0;
    });
    return acc;
  };

  return RsuvTuTree;
}();

/*
ПОНЯТИЯ:
-- [[asau55]], pResults - массив представляющий результат работы Promise.allSettled()
-- [[asau66]], pElem - отдельный элемент массива pResults
 */

/**
 * [[asau56]]
 * Статусы Promise.allSettled()
 */
var EnStatusAsau56;

(function (EnStatusAsau56) {
  EnStatusAsau56["REJECTED"] = "rejected";
  EnStatusAsau56["FULFILLED"] = "fulfilled";
})(EnStatusAsau56 || (EnStatusAsau56 = {}));

var Asau57 = function Asau57() {
  this.ix = -1;
};
/**
 * Утилиты для работы с Promise.allSettled()
 */

var RsuvTuPromiseAllSettled = /*#__PURE__*/function () {
  function RsuvTuPromiseAllSettled() {}

  /**
   * Извлекает reason-ы "реджектнутых" промисов
   * @param pResults
   */
  RsuvTuPromiseAllSettled.rejected = function rejected(pResults) {
    var ret = [];
    pResults.forEach(function (el, ix) {
      if (el.status === EnStatusAsau56.REJECTED) {
        ret.push({
          ix: ix,
          reason: el.reason
        });
      }
    });
    return ret;
  }
  /**
   * Извлекает value-ы успешных промисов
   * @param pResults
   */
  ;

  RsuvTuPromiseAllSettled.fulfilled = function fulfilled(pResults) {
    var ret = [];
    pResults.forEach(function (el, ix) {
      if (el.status === EnStatusAsau56.FULFILLED) {
        ret.push({
          ix: ix,
          value: el.value
        });
      }
    });
    return ret;
  }
  /**
   * Возвращает TRUE если все результаты в (1) являются успешными
   * @param pResults
   */
  ;

  RsuvTuPromiseAllSettled.isAllSuccess = function isAllSuccess(pResults) {
    return pResults.every(function (el) {
      return el.status === EnStatusAsau56.FULFILLED;
    });
  }
  /**
   * Возвращает TRUE если *pElem (1) обладает статусом (2)
   * @param pElem
   * @param status
   */
  ;

  RsuvTuPromiseAllSettled.pElemIs = function pElemIs(pElem, status) {
    return pElem.status === status;
  }
  /**
   * Для каждого *pElem из (1) вызвает (2) если *pElem is fulfilled или (3) если *pElem is rejected, и результат (2)(3)
   * добавляет в итоговый массив
   * @param pResults (1) --
   * @param cbFulfilled (2) --
   * @param cbRejected (3) --
   */
  ;

  RsuvTuPromiseAllSettled.handle = function handle(pResults, cbFulfilled, cbRejected) {
    var _this = this;

    return pResults.map(function (elPElem) {
      if (_this.pElemIs(elPElem, EnStatusAsau56.FULFILLED)) {
        return cbFulfilled(elPElem.value);
      } else {
        return cbRejected(elPElem.reason);
      }
    });
  };

  return RsuvTuPromiseAllSettled;
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
  }()
  /**
   * см. также функцию elemsGetPage()
   * @param offset (1) -- сколько элементов пропустить, с начала
   * @param limit (2) -- сколько элементов взять после пропуска
   */
  ;

  _proto.elemsGet =
  /*#__PURE__*/
  function () {
    var _elemsGet = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(offset, limit) {
      var resp;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return fetch(this.path + "?_start=" + offset + "&_limit=" + limit);

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

    function elemsGet(_x, _x2) {
      return _elemsGet.apply(this, arguments);
    }

    return elemsGet;
  }()
  /**
   * Другой вариант функции elemsGet()
   * @param pageNum (1) -- номер страницы, 1+
   * @param limit (2) -- количество элементов на странице
   */
  ;

  _proto.elemsGetPage =
  /*#__PURE__*/
  function () {
    var _elemsGetPage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(pageNum, limit) {
      var resp;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetch(this.path + "?_page=" + pageNum + "&_limit=" + limit);

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

    function elemsGetPage(_x3, _x4) {
      return _elemsGetPage.apply(this, arguments);
    }

    return elemsGetPage;
  }()
  /**
   * Возвращает все записи удовлетворяющие [ntxe]-фильтру (1)
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
   * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов).
   * Из всех возможных результатов, отбрасываются первые (3) и из оставшихся берутся первые (4)
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param offset (3) --
   * @param limit (4) --
   */
  ;

  _proto.elemsGetByFilterB =
  /*#__PURE__*/
  function () {
    var _elemsGetByFilterB = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(fieldName, substring, offset, limit) {
      var elems, elemsFiltered;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.elemsGetAll();

            case 2:
              elems = _context6.sent;
              elemsFiltered = elems.filter(function (elem) {
                return substrCountB(elem[fieldName], substring) > 0;
              });
              return _context6.abrupt("return", elemsFiltered.slice(offset, offset + limit));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function elemsGetByFilterB(_x6, _x7, _x8, _x9) {
      return _elemsGetByFilterB.apply(this, arguments);
    }

    return elemsGetByFilterB;
  }()
  /**
   * Отличается от BA только тем что (3) это не offset а pageNumber
   *
   * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов).
   * Из всех возможных результатов, берётся страница (3), (4) определяет число элементов на странице
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param pageNumber (3) -- 1+
   * @param limit (4) --
   */
  ;

  _proto.elemsGetByFilterBB =
  /*#__PURE__*/
  function () {
    var _elemsGetByFilterBB = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(fieldName, substring, pageNumber, limit) {
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.elemsGetByFilterB(fieldName, substring, (pageNumber - 1) * limit, limit);

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function elemsGetByFilterBB(_x10, _x11, _x12, _x13) {
      return _elemsGetByFilterBB.apply(this, arguments);
    }

    return elemsGetByFilterBB;
  }()
  /**
   * Отличается от B тем что возвращает более развёрнутый ответ
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param offset (3) --
   * @param limit (4) --
   * @return RsuvResultCountAndData где
   * countAll - количество элементов удовлетворяющих фильтру (1)(2) без учета (3)(4),
   * data - сами элементы удовлетворяющие (1)-(4),
   * hasNext - TRUE если возвращены НЕ все данные удовлетворяющие фильтру (1)(2)
   */
  ;

  _proto.elemsGetByFilterC =
  /*#__PURE__*/
  function () {
    var _elemsGetByFilterC = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(fieldName, substring, offset, limit) {
      var elems, elemsFiltered, elemsFilteredSliced;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.elemsGetAll();

            case 2:
              elems = _context8.sent;
              elemsFiltered = elems.filter(function (elem) {
                return substrCountB(elem[fieldName], substring) > 0;
              });
              elemsFilteredSliced = elemsFiltered.slice(offset, offset + limit);
              return _context8.abrupt("return", {
                countAll: elemsFiltered.length,
                data: elemsFilteredSliced,
                hasNext: offset + limit < elemsFiltered.length
              });

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function elemsGetByFilterC(_x14, _x15, _x16, _x17) {
      return _elemsGetByFilterC.apply(this, arguments);
    }

    return elemsGetByFilterC;
  }()
  /**
   * Отличается от CA только параметром (3)
   *
   * @param fieldName (1) --
   * @param substring (2) --
   * @param pageNumber (3) -- 1+
   * @param limit (4) --
   */
  ;

  _proto.elemsGetByFilterCB =
  /*#__PURE__*/
  function () {
    var _elemsGetByFilterCB = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(fieldName, substring, pageNumber, limit) {
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", this.elemsGetByFilterC(fieldName, substring, (pageNumber - 1) * limit, limit));

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function elemsGetByFilterCB(_x18, _x19, _x20, _x21) {
      return _elemsGetByFilterCB.apply(this, arguments);
    }

    return elemsGetByFilterCB;
  }();

  _proto.elemDelete = /*#__PURE__*/function () {
    var _elemDelete = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(id) {
      var ret;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return fetch(this.path + "/" + id, {
                method: 'DELETE'
              });

            case 2:
              ret = _context10.sent;

              if (!(ret.status !== 200)) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt("return", new RsuvResultBoolPknz(false, '210315153800', "err*: id not found; id [" + id + "]; ret.status [" + ret.status + "]"));

            case 5:
              return _context10.abrupt("return", new RsuvResultBoolPknz());

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function elemDelete(_x22) {
      return _elemDelete.apply(this, arguments);
    }

    return elemDelete;
  }();

  _proto.elemsDelete = /*#__PURE__*/function () {
    var _elemsDelete = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(ids) {
      var ret, _iterator, _step, id, res;

      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              ret = [];
              _iterator = _createForOfIteratorHelperLoose(ids);

            case 2:
              if ((_step = _iterator()).done) {
                _context11.next = 10;
                break;
              }

              id = _step.value;
              _context11.next = 6;
              return this.elemDelete(id);

            case 6:
              res = _context11.sent;
              ret.push(res);

            case 8:
              _context11.next = 2;
              break;

            case 10:
              return _context11.abrupt("return", ret);

            case 11:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function elemsDelete(_x23) {
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
    var _elemsDeleteByFilter = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(filter) {
      var elems;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.elemsGetByFilter(filter);

            case 2:
              elems = _context12.sent;
              _context12.next = 5;
              return this.elemsDelete(elems.map(function (el) {
                return el.id;
              }));

            case 5:
              return _context12.abrupt("return", _context12.sent);

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function elemsDeleteByFilter(_x24) {
      return _elemsDeleteByFilter.apply(this, arguments);
    }

    return elemsDeleteByFilter;
  }();

  _proto.elemCreate = /*#__PURE__*/function () {
    var _elemCreate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(data) {
      var res;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return fetch("" + this.path, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

            case 2:
              res = _context13.sent;

              if (!(res.status === 201)) {
                _context13.next = 5;
                break;
              }

              return _context13.abrupt("return", new RsuvResultBoolPknz());

            case 5:
              return _context13.abrupt("return", new RsuvResultBoolPknz(false, '210316120200', "err*: not created; status [" + res.status + "] url [" + res.url + "]"));

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function elemCreate(_x25) {
      return _elemCreate.apply(this, arguments);
    }

    return elemCreate;
  }()
  /**
   * Отличается от А тем что возвращает также информацию об ID созданного элемента (в поле 'value' в виде строки)
   * @param data (1) -- объект без поля 'id'
   * @return
   */
  ;

  _proto.elemCreateB =
  /*#__PURE__*/
  function () {
    var _elemCreateB = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(data) {
      var res, createdElem;
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return fetch("" + this.path, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

            case 2:
              res = _context14.sent;

              if (!(res.status === 201)) {
                _context14.next = 8;
                break;
              }

              _context14.next = 6;
              return res.json();

            case 6:
              createdElem = _context14.sent;
              return _context14.abrupt("return", new RsuvResultTibo({
                success: true,
                value: createdElem.id + ''
              }));

            case 8:
              return _context14.abrupt("return", new RsuvResultTibo({
                success: false,
                errCode: res.status + '',
                errMessage: res.url
              }));

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function elemCreateB(_x26) {
      return _elemCreateB.apply(this, arguments);
    }

    return elemCreateB;
  }();

  _proto.elemUpdate = /*#__PURE__*/function () {
    var _elemUpdate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee15(data) {
      var res;
      return runtime_1.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return fetch(this.path + "/" + data.id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

            case 2:
              res = _context15.sent;

              if (!(res.status === 200)) {
                _context15.next = 5;
                break;
              }

              return _context15.abrupt("return", new RsuvResultBoolPknz());

            case 5:
              return _context15.abrupt("return", new RsuvResultBoolPknz(false, '210318111500', "err*: not updated; status [" + res.status + "] url [" + res.url + "]"));

            case 6:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function elemUpdate(_x27) {
      return _elemUpdate.apply(this, arguments);
    }

    return elemUpdate;
  }();

  return RsuvTxJsonServer;
}();

/**
 * Представляет целое число, положительное, отрицательное, ноль, но не дробное, NaN, Infinity и т.п.
 */

var RsuvTxNumInt = /*#__PURE__*/function () {
  function RsuvTxNumInt(val) {
    this.val = val;
    bnuwUtilsThrowIf(this);
  }

  var _proto = RsuvTxNumInt.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      if (!this.val && this.val !== 0) {
        return new RsuvResultBoolPknz(false, '[[1636272243]]', 'is falsy');
      }

      if (!_.isFinite(this.val)) {
        return new RsuvResultBoolPknz(false, '[[1636272327]]', 'is not number');
      }

      if (!_.isSafeInteger(this.val)) {
        return new RsuvResultBoolPknz(false, '[[1636272328]]', 'is not integer');
      }
    } catch (error) {
      return new RsuvResultBoolPknz(false, '[[1636279573]]', error.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxNumInt;
}();

/**
 * Представляет целое число большее нуля или равное нулю
 */

var RsuvTxNumIntAB = /*#__PURE__*/function (_RsuvTxNumInt) {
  _inheritsLoose(RsuvTxNumIntAB, _RsuvTxNumInt);

  function RsuvTxNumIntAB() {
    return _RsuvTxNumInt.apply(this, arguments) || this;
  }

  var _proto = RsuvTxNumIntAB.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxNumInt.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (this.val < 0) {
        return new RsuvResultBoolPknz(false, '[[1636279844]]', 'number is < 0');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[1636279706]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxNumIntAB;
}(RsuvTxNumInt);

/**
 * Представляет целое число большее нуля
 */

var RsuvTxNumIntABB = /*#__PURE__*/function (_RsuvTxNumIntAB) {
  _inheritsLoose(RsuvTxNumIntABB, _RsuvTxNumIntAB);

  function RsuvTxNumIntABB() {
    return _RsuvTxNumIntAB.apply(this, arguments) || this;
  }

  var _proto = RsuvTxNumIntABB.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxNumIntAB.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (this.val === 0) {
        return new RsuvResultBoolPknz(false, '[[1636280020]]', 'number is === 0');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[1636280025]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxNumIntABB;
}(RsuvTxNumIntAB);

/**
 * Представляет целое число большее нуля, или равное нулю или равное -1
 */

var RsuvTxNumIntAC = /*#__PURE__*/function (_RsuvTxNumInt) {
  _inheritsLoose(RsuvTxNumIntAC, _RsuvTxNumInt);

  function RsuvTxNumIntAC() {
    return _RsuvTxNumInt.apply(this, arguments) || this;
  }

  var _proto = RsuvTxNumIntAC.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    try {
      var res = _RsuvTxNumInt.prototype.bnuwIsValid.call(this);

      if (!res.success) {
        return res;
      } // ---


      if (this.val < -1) {
        return new RsuvResultBoolPknz(false, '[[1636280874]]', 'number is < -1');
      }
    } catch (err) {
      return new RsuvResultBoolPknz(false, '[[1636280879]]', err.message);
    }

    return new RsuvResultBoolPknz(true);
  };

  return RsuvTxNumIntAC;
}(RsuvTxNumInt);

/**
 Представление диапазона целых положительных чисел (>= 0), второе число >= первого
 */

var RsuvTxNumIntDiap = /*#__PURE__*/function () {
  function RsuvTxNumIntDiap(indexStart, indexEnd) {
    this.indexStart = indexStart;
    this.indexEnd = indexEnd;
    bnuwUtilsThrowIf(this);
  }

  var _proto = RsuvTxNumIntDiap.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    var ixStart = this.indexStart.val;
    var ixEnd = this.indexEnd.val; // ---

    if (ixStart <= ixEnd) {
      return new RsuvResultBoolPknz();
    }

    return new RsuvResultBoolPknz(false, '[[220107123149]]', "end index must be greater than start index; ixStart " + ixStart + ", ixEnd " + ixEnd);
  };

  return RsuvTxNumIntDiap;
}();

/**
 * Представляет типовой "ключ", "имя поля", "имя столбца таблицы БД" и т.п.,
 * т.е. это строка состоящая только из символов [a-zA-Z0-9_] и начинающаяся
 * не с цифры
 *
 * ID [[1636807194]]
 *
 * @implements RsuvBnuwNT
 * @extends RsuvTxStringACB
 * @extends RsuvTxStringAB
 * @extends RsuvTxString
 */

var RsuvTxFieldName = /*#__PURE__*/function (_RsuvTxStringACB) {
  _inheritsLoose(RsuvTxFieldName, _RsuvTxStringACB);

  function RsuvTxFieldName() {
    return _RsuvTxStringACB.apply(this, arguments) || this;
  }

  return RsuvTxFieldName;
}(RsuvTxStringACB);

/**
 * Представление сортировки чего-либо абстрактного, обозначенного идентификатором
 */
var RsuvTxSort =
/**
 *
 * @param id (1) -- условный идентификатор
 * @param sortDirect (2) -- направление сортировки
 * @throws Error если идентификатор (1) невалиден
 */
function RsuvTxSort(id, sortDirect) {
  this.id = id;
  this.sortDirect = sortDirect; // --- id verify

  var validRes = id.bnuwIsValid();

  if (!validRes.success) {
    throw new Error(validRes.errCode + ' : ' + validRes.errMessage);
  } // ---

};

/**
 * Представляет элемент который может быть чекнут (например элемент выпадающего списка)
 */
var RsuvTxChecked = function RsuvTxChecked(id, visibleText, checked, disabled, payload) {
  if (checked === void 0) {
    checked = false;
  }

  if (disabled === void 0) {
    disabled = false;
  }

  this.id = id;
  this.visibleText = visibleText;
  this.checked = checked;
  this.disabled = disabled;
  this.payload = payload;
};

/**
 * Представление для имени поля объекта, как единичного, так и составного через точку '.' (в lodash стиле).
 * Примеры: 'name', 'user.profile', 'users.0.name'
 */

var RsuvTxFieldNameLodash = /*#__PURE__*/function () {
  function RsuvTxFieldNameLodash(val) {
    this.val = val;
    bnuwUtilsThrowIf(this);
  }

  var _proto = RsuvTxFieldNameLodash.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    if (this.val) {
      return new RsuvResultBoolPknz();
    }

    return new RsuvResultBoolPknz(false, '[[220509121136]]');
  };

  return RsuvTxFieldNameLodash;
}();

/**
 * [[asau22]]
 * КЛЮЧЕВЫЕ СЛОВА: поиск, строка
 * СМ ТАКЖЕ: [asau24]
 */
var RsuvSearchMode;

(function (RsuvSearchMode) {
  /** строгое равенство */
  RsuvSearchMode["EQUAL_STRICT"] = "equal_strict_asau22";
  /**содержит */

  RsuvSearchMode["CONTAINS"] = "contains_asau22";
  /** начинается с */

  RsuvSearchMode["START_WITH"] = "start_with_asau22";
  /** заканчивается на */

  RsuvSearchMode["END_WITH"] = "end_with_asau22";
})(RsuvSearchMode || (RsuvSearchMode = {}));

/**
 * ID: [[asau23]]
 * Сущность для указания как искать.
 * КЛЮЧЕВЫЕ СЛОВА: поиск
 */

var RsuvSearchHow = /*#__PURE__*/function () {
  function RsuvSearchHow(searchMode,
  /** учитывать ли регистр символов при поиске */
  isCaseSensitive) {
    if (searchMode === void 0) {
      searchMode = RsuvSearchMode.CONTAINS;
    }

    this.searchMode = searchMode;
    this.isCaseSensitive = isCaseSensitive;
  }

  var _proto = RsuvSearchHow.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    return new RsuvResultBoolPknz(true);
  };

  return RsuvSearchHow;
}();

/**
* ID [[asau26]]
*/
var RsuvEnCaseSensitive;

(function (RsuvEnCaseSensitive) {
  RsuvEnCaseSensitive["CASE_SENSITIVE_TRUE"] = "case_sensitive_true_asau26";
  RsuvEnCaseSensitive["CASE_SENSITIVE_FALSE"] = "case_sensitive_false_asau26";
})(RsuvEnCaseSensitive || (RsuvEnCaseSensitive = {}));

/**
 * ID [[asau27]]
 * Обозначения основных типов данных, например использующихся в базах данных
 */
var RsuvEnDataTypes;

(function (RsuvEnDataTypes) {
  /**
   * строка
   */
  RsuvEnDataTypes["TEXT"] = "text_asau27";
  /**
   * целое число, положительное или отрицательное, в том числе ноль
   */

  RsuvEnDataTypes["INT"] = "int_asau27";
  /**
   * число дробное, с плавающей запятой
   */

  RsuvEnDataTypes["FLOAT"] = "real_asau27";
})(RsuvEnDataTypes || (RsuvEnDataTypes = {}));

/**
 * Представление направления сортировки
 */
var RsuvEnSort;

(function (RsuvEnSort) {
  /** по возрастанию */
  RsuvEnSort["ASC"] = "asc";
  /** по убыванию */

  RsuvEnSort["DESC"] = "desc";
  /** не определено */

  RsuvEnSort["UNDEF"] = "undef";
})(RsuvEnSort || (RsuvEnSort = {}));

/**
 * Представление результата set operation ([asau45]) или upsert opertaion ([asau46])
 *
 * ID [[220108131133]] rev 1 1.0.0 2022-01-08
 */
var RsuvEnResultCrudSet;

(function (RsuvEnResultCrudSet) {
  /**
   * Была создана новая запись
   */
  RsuvEnResultCrudSet["CREATED"] = "created";
  /**
   * Была обновлена существующая запись
   */

  RsuvEnResultCrudSet["UPDATED"] = "updated";
  /**
   * Возникли проблемы. Новая запись создана не была, текущая обновлена не была
   */

  RsuvEnResultCrudSet["ERROR"] = "error";
})(RsuvEnResultCrudSet || (RsuvEnResultCrudSet = {}));

/**
 * ID [[1636803407]]
 *
 * Представление единичного элемента поиска "ключ/значение"
 *
 * @param fieldName (1) -- имя поля (ключ) в котором нужно искать значение (3)
 * @param searchHow (2) -- указания как искать совпадение
 * @param value: (3) -- значение. Вне зависимости какой это тип значения (4), тут должна быть строка
 * @param valueType (4) -- тип значения (3)
 */

var RsuvSearchElem = /*#__PURE__*/function () {
  function RsuvSearchElem(fieldName, searchHow, value, valueType) {
    if (valueType === void 0) {
      valueType = RsuvEnDataTypes.TEXT;
    }

    this.fieldName = fieldName;
    this.searchHow = searchHow;
    this.value = value;
    this.valueType = valueType;
  }

  var _proto = RsuvSearchElem.prototype;

  _proto.bnuwIsValid = function bnuwIsValid() {
    // TODO
    return new RsuvResultBoolPknz();
  };

  return RsuvSearchElem;
}();

/**
 * Представление нескольких RsuvSearchElem-ID[1636803407] (пар ключ/значение).
 *
 * Значения интерпретируются по правилу "И". Например, если элемента два, то поиск считается
 * успешным если успешен поиск [(для элемента 1) "И" (для элемента 2)]
 *
 * ID [[1636805160]]
 */
var RsuvSearchElems =
/**
 * @param elems (1) --элементы
 */
function RsuvSearchElems(elems) {
  this.elems = elems;
};

/*
Утилиты для получения информации об объектах.

Статус: в разработке
 */
var TypeAsau42;

(function (TypeAsau42) {
  TypeAsau42["KFRX"] = "kfrx";
})(TypeAsau42 || (TypeAsau42 = {}));

function info(entry) {
}

var RsuvTuInfo = {
  __proto__: null,
  get TypeAsau42 () { return TypeAsau42; },
  info: info
};

var testData = [{
  id: 1,
  val: '',
  desc: 'пустая строка',
  res: true
}, {
  id: 2,
  val: ' ',
  desc: 'строка только из пробелов',
  res: true
}, {
  id: 3,
  val: 'text',
  desc: 'строка без пробелов',
  res: true
}, {
  id: 4,
  val: 'text text',
  desc: 'строка с пробелами только внутри',
  res: true
}, {
  id: 5,
  val: ' text',
  desc: 'строка с пробелом в начале',
  res: true
}, {
  id: 6,
  val: 'text ',
  desc: 'строка с пробелом в конце',
  res: true
}, {
  id: 7,
  val: ' text ',
  desc: 'строка с пробелом в начале и конце',
  res: true
}, {
  id: 8,
  val: "text1\n  text2",
  desc: 'строка переносом внутри',
  res: true
}, {
  id: 9,
  val: '100',
  desc: 'строка целое число',
  res: true
}, {
  id: 10,
  val: null,
  desc: 'null',
  res: true
}, {
  id: 11,
  val: undefined,
  desc: 'undefined',
  res: true
}, {
  id: 12,
  val: NaN,
  desc: 'NaN',
  res: true
}, {
  id: 13,
  val: Infinity,
  desc: 'Infinity',
  res: true
}, {
  id: 14,
  val: 0,
  desc: 'ноль',
  res: true
}, {
  id: 15,
  val: +0,
  desc: '+0',
  res: true
}, {
  id: 16,
  val: -0,
  desc: '-0',
  res: true
}, {
  id: 17,
  val: 100,
  desc: 'число 100',
  res: true
}, {
  id: 18,
  val: 100.06,
  desc: 'число 100.06',
  res: true
}, {
  id: 19,
  val: [],
  desc: 'пустой массив',
  res: true
}, {
  id: 20,
  val: [{
    a: 1
  }],
  desc: 'непустой массив',
  res: true
}, {
  id: 21,
  val: {},
  desc: 'пустой объект',
  res: true
}, {
  id: 22,
  val: {
    a: 1
  },
  desc: 'непустой объект',
  res: true
}, {
  id: 23,
  val: function val() {},
  desc: 'стрелочная функция',
  res: true
}, {
  id: 24,
  val: "\n  text",
  desc: 'строка с переносом в начале',
  res: true
}, {
  id: 25,
  val: "text\n  ",
  desc: 'строка с переносом в конце',
  res: true
}, {
  id: 26,
  val: "\n    text\n  ",
  desc: 'строка с переносом в начале, середине и конце',
  res: true
}, {
  id: 27,
  val: "\n    ",
  desc: 'строка из одних переносов',
  res: true
}];
var RSUV_NO_TAGS_SPC_VALUE = '<no tags>';

var RsuvTu = {
  __proto__: null,
  testData: testData,
  RSUV_NO_TAGS_SPC_VALUE: RSUV_NO_TAGS_SPC_VALUE
};

export { Asau57, EnStatusAsau56, RSUV_AL_ALREADY_EXIST, RSUV_SPC_ID_PLUG_PREFIX, RsuvAdapterZrnx, RsuvAsau90, RsuvAsau92, RsuvCheckModelGnpw, RsuvEcxm, RsuvEnCaseSensitive, RsuvEnDataTypes, RsuvEnResultCrudSet, RsuvEnSort, RsuvErr, RsuvPaginationGyth, RsuvResultAsau11, RsuvResultBoolPknz, RsuvResultTibo, RsuvSearchElem, RsuvSearchElems, RsuvSearchHow, RsuvSearchMode, RsuvTu, RsuvTuArray, RsuvTuDateTime, RsuvTuInfo, RsuvTuPromiseAllSettled, RsuvTuString, RsuvTuTree, RsuvTxChecked, RsuvTxEmail, RsuvTxFieldName, RsuvTxFieldNameLodash, RsuvTxJsonServer, RsuvTxNumInt, RsuvTxNumIntAB, RsuvTxNumIntABB, RsuvTxNumIntAC, RsuvTxNumIntDiap, RsuvTxSort, RsuvTxString, RsuvTxStringAB, RsuvTxStringAC, RsuvTxStringACB, RsuvTxStringACC, RsuvTxStringAD, RsuvTxStringADB, RsuvValueAnd, RsuvZrnxSubData };
//# sourceMappingURL=rsuv-lib.esm.js.map
