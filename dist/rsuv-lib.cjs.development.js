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
var RsuvErr = function RsuvErr(code, message) {
  if (code === void 0) {
    code = '';
  }

  if (message === void 0) {
    message = '';
  }

  this.code = code;
  this.message = message;
};

exports.RsuvErr = RsuvErr;
exports.RsuvValueAnd = RsuvValueAnd;
//# sourceMappingURL=rsuv-lib.cjs.development.js.map
