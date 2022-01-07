import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Вызывает (1) и возвращает его результат если не было брошено исключения внутри (1), иначе возвращает null
 * @param fn (1) --
 */
export declare function bnuwFactory<T extends RsuvBnuwNT>(fn: () => T): T | null;
/**
 * Выполняет [bnuw]-проверку сущности (1) и если результат неуспешен то брасает исключение с результатом этой проверки
 * @param obj
 */
export declare function bnuwUtilsThrowIf(obj: RsuvBnuwNT): void;
/**
 * Проверяет значение (1)
 * @param value (1) --
 */
export declare const bnuwUtilsVerify: (value: RsuvBnuwNT | any) => RsuvResultBoolPknz;
/**
 * Если возвращает пустой массив, значит все элементы (1) валидные, иначе в массиве результы неудачных проверок
 * @param values (1) -- элементы для проверки; пустой массив не валиден
 */
export declare const bnuwUtilsVerifyMulti: (values: any[]) => RsuvResultBoolPknz[];
