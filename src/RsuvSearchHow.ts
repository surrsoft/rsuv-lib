import { RsuvSearchMode } from './RsuvSearchMode';

/**
 * [[asau23]]
 * Сущность для указания как искать.
 * КЛЮЧЕВЫЕ СЛОВА: поиск
 */
export class RsuvSearchHow {
  constructor(
    public searchMode: RsuvSearchMode = RsuvSearchMode.CONTAINS,
    /** если true то значит нужно учитывать регистр символов при поиске */
    public isCaseSensitive: boolean = false
  ) {}
}
