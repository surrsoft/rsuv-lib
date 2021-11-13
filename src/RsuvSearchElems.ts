import { RsuvSearchElem } from "./RsuvSearchElem";

/**
 * Представление нескольких RsuvSearchElem-ID[1636803407] (пар ключ/значение).
 * 
 * Значения интерпретируются по правилу "И". Например, если элемента два, то поиск считается
 * успешным если успешен поиск [(для элемента 1) "И" (для элемента 2)]
 * 
 * ID [[1636805160]]
 */
export class RsuvSearchElems {

  /**
   * @param elems (1) --элементы
   */
  constructor(public elems: RsuvSearchElem[]) {}
}
