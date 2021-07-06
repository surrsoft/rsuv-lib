import _ from 'lodash-es';
import EmailValidator from 'email-validator';

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

var RsuvTuString = {
  __proto__: null,
  isEmptyOrWhitespaces: isEmptyOrWhitespaces
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

export { RSUV_AL_ALREADY_EXIST, RsuvErr, RsuvPaginationGyth, RsuvResultBoolPknz, RsuvResultTibo, RsuvTuString, RsuvTxEmail, RsuvTxString, RsuvTxStringAA, RsuvTxStringB, RsuvTxStringC, RsuvValueAnd };
//# sourceMappingURL=rsuv-lib.esm.js.map
