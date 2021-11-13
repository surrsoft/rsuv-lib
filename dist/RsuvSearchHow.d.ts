import { RsuvCaseSensitive } from '.';
import { RsuvSearchMode } from './RsuvSearchMode';
/**
 * [[asau23]]
 * Сущность для указания как искать.
 * КЛЮЧЕВЫЕ СЛОВА: поиск
 */
export declare class RsuvSearchHow {
    searchMode: RsuvSearchMode;
    /** учитывать ли регистр символов при поиске */
    isCaseSensitive: RsuvCaseSensitive;
    constructor(searchMode: RsuvSearchMode, 
    /** учитывать ли регистр символов при поиске */
    isCaseSensitive: RsuvCaseSensitive);
}
