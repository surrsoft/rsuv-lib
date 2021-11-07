import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringB } from './RsuvTxStringB';
/**
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов) И (не начинается с пробела/переноса)
 * И (не заканчивается пробелом/переносом)
 */
export declare class RsuvTxStringC extends RsuvTxStringB {
    bnuwIsValid(): RsuvResultBoolPknz;
}
