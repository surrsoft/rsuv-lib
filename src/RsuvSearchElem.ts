import {
  RsuvBnuwNT,
  RsuvEnDataTypes,
  RsuvSearchHow,
  RsuvTxFieldName,
  RsuvTxString,
} from '.';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';

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
export class RsuvSearchElem implements RsuvBnuwNT {
  constructor(
    public fieldName: RsuvTxFieldName,
    public searchHow: RsuvSearchHow,
    public value: RsuvTxString,
    public valueType: RsuvEnDataTypes = RsuvEnDataTypes.TEXT
  ) {}

  bnuwIsValid(): RsuvResultBoolPknz {
    // TODO
    return new RsuvResultBoolPknz()
  }
}
