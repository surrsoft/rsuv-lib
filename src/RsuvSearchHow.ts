import { RsuvBnuwNT } from '.';
import { RsuvEnCaseSensitive } from './RsuvEnCaseSensitive';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvSearchMode } from './RsuvSearchMode';

/**
 * ID: [[asau23]]
 * Сущность для указания как искать.
 * КЛЮЧЕВЫЕ СЛОВА: поиск
 */
export class RsuvSearchHow implements RsuvBnuwNT {
  constructor(
    public searchMode: RsuvSearchMode = RsuvSearchMode.CONTAINS,
    /** учитывать ли регистр символов при поиске */
    public isCaseSensitive: RsuvEnCaseSensitive
  ) {}

  bnuwIsValid(): RsuvResultBoolPknz {
    return new RsuvResultBoolPknz(true);
  }
}
