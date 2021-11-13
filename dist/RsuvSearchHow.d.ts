import { RsuvEnCaseSensitive } from './RsuvEnCaseSensitive';
import { RsuvSearchMode } from './RsuvSearchMode';
/**
 * ID: [[asau23]]
 * Сущность для указания как искать.
 * КЛЮЧЕВЫЕ СЛОВА: поиск
 */
export declare class RsuvSearchHow {
    searchMode: RsuvSearchMode;
    /** учитывать ли регистр символов при поиске */
    isCaseSensitive: RsuvEnCaseSensitive;
    constructor(searchMode: RsuvSearchMode, 
    /** учитывать ли регистр символов при поиске */
    isCaseSensitive: RsuvEnCaseSensitive);
}
