import { RsuvSearchMode } from './RsuvSearchMode';
/**
 * [[asau23]]
 * Сущность для указания как искать.
 * КЛЮЧЕВЫЕ СЛОВА: поиск
 */
export declare class RsuvSearchHow {
    searchMode: RsuvSearchMode;
    /** если true то значит нужно учитывать регистр символов при поиске */
    isCaseSensitive: boolean;
    constructor(searchMode?: RsuvSearchMode, 
    /** если true то значит нужно учитывать регистр символов при поиске */
    isCaseSensitive?: boolean);
}
