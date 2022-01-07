import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringAD } from './RsuvTxStringAD';
/**
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов) И (не начинается с пробела/переноса)
 * И (не заканчивается пробелом/переносом)
 */
export declare class RsuvTxStringADB extends RsuvTxStringAD {
    bnuwIsValid(): RsuvResultBoolPknz;
}
