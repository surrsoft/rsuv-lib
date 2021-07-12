import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
export declare const bnuwUtilsVerify: (value: RsuvBnuwNT | any) => RsuvResultBoolPknz;
/**
 * Если возвращает пустой массив, значит все элементы (1) валидные, иначе в массиве результы неудачных проверок
 * @param values (1) -- элементы для проверки; пустой массив не валиден
 */
export declare const bnuwUtilsVerifyMulti: (values: any[]) => RsuvResultBoolPknz[];
