import { RsuvEnCaseSensitive } from './RsuvEnCaseSensitive';
import { RsuvSearchMode } from './RsuvSearchMode';

/**
 * ID: [[asau23]]
 * Сущность для указания как искать.
 * КЛЮЧЕВЫЕ СЛОВА: поиск
 */
export class RsuvSearchHow {
  constructor(
    public searchMode: RsuvSearchMode = RsuvSearchMode.CONTAINS,
    /** учитывать ли регистр символов при поиске */
    public isCaseSensitive: RsuvEnCaseSensitive
  ) {}
}
