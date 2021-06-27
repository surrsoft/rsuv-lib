'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var RsuvValueAnd =
/**
 * МОТИВАЦИЯ: допустим мы хотим получить значение ячейки столбца, но такого столбца не существует; в этом случае
 * возврат просто значения не позволяет понять, это значение ячейки или же ячейки не существует.
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

exports.RsuvErr = RsuvErr;
exports.RsuvPaginationGyth = RsuvPaginationGyth;
exports.RsuvValueAnd = RsuvValueAnd;
//# sourceMappingURL=rsuv-lib.cjs.development.js.map
