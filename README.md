- [[rsuv]] - universal components, utilities, standard library, TS, JS
- on base `tsdx` https://github.com/formium/tsdx

# Элементы

## Приставки

- `RsuvTx...` - представление разных сущностей - строк, чисел, email и т.д.
- `RsuvTu...` - утилиты для работы с сущностями - строками, числами, массивами и т.д.

## Разное

- `RsuvTuString` - утилиты для работы со строками
  - `stringsTwoInfo` - сравнение двух строк, с учетом регистра и без, с возвратом подробнейшей информации
  - `stringsTwoInfoB` - отличается от А тем что сразу возвращает информацию с учетом регистра и без, не спрашивая об этом в параметрах
  - `isEmptyOrWhitespaces` - возвращает TRUE если строка является falsy, или нулевой длины, или состоит из одних пробелов
  - `substrCount` - возвращает сколько раз строка (2) встречается в строке (1). Чувствительна к регистру. Если не находит вхождений, и в невалидных случаях, возвращает 0.
  - `substrCountB` - тоже что и А только не чувствительна к регистру
  - `substrIndexes` - возвращает информацию о том в каких местах строки (1) встречается строка (2). Допускает содержание в (2) символов считающихся специальными для регулярных выражений - экранирует их
- `RsuvTuArray` - статические методы-утилиты для работы с массивом, с защитами от неверных входных данных
  - `elemDelete` - удалить элемент по индексу
  - `elemAdd` - добавить элемент по индексу
  - `elemMove` - переместить элемент с индекса А на индекс Б
  - `elemsSwap` - поменять местами для элемента 
- `RsuvConst` - константы разные
- `RsuvTu` - разное общее

## Представления примитивов

### Строка

- `RsuvTxString` - строка не нулевой длины
- `RsuvTxStringAA` - тоже что `RsuvTxString` только ещё не содержит пробелов/переносов
- `RsuvTxStringB` - тоже что `RsuvTxString` только не состоит из одних только пробелов/переносов
- `RsuvTxStringC` - тоже что `RsuvTxStringB` только не начинается с пробела/переноса и не заканчивается пробелом/переносом
- `RsuvTxStringAB` - тоже что `RsuvTxString` только состоит только из символов [a-zA-Z0-9_]
- `RsuvTxStringABB` - тоже что `RsuvTxStringAB` только начинается не с цифры

### Целое число

- `RsuvTxNumInt` - целое число (не NaN, Infinity, +Infinity, -Infinity, не дробное)
- `RsuvTxNumIntAB` - тоже что `RsuvTxNumInt` но >= 0
- `RsuvTxNumIntABB` - тоже что `RsuvTxNumIntAB` но > 0
- `RsuvTxNumIntAC` - тоже что `RsuvTxNumInt` но >= -1

### Boolean

- `RsuvTxBoolean` - представление boolean

## Представление разного

- `RsuvTxJsonServer` - утилиты для работы с JsonServer (https://github.com/typicode/json-server)
- `RsuvTxEmail` - представление email-адреса

## Списки

- `RsuvAdapterZrnx` - Сущность для использования в качестве посредника между абстрактным источником-данных (интерефейс RsuvDataSourceAecrNT) и UI-списком-с-пагинацией
- `RsuvDataSourceAecrNT` (interface) - Сущность представляющая абстрактный "источник данных". Позволяет получать диапазон элементов, узнавать сколько всего есть элементов, удалять элементы, создавать и обновлять
- `RsuvPaginationGyth` - Сущность для пагинации. Передаём в конструктор "общее кол-во элементов" и "кол-во элементов на странице", и затем по "номеру страницы" узнаём начальный и конечный индексы с помощью метода indexesByPageNum
- `RsuvCheckModels` - сущности для работы с checked-списками (списки хранящие информацию о том какой элемент чекнут, какой нет)

## Представление результата чего-либо

- `RsuvResultAsau11` - `success` - TRUE означает успешный результат, `codeNum` - любое положительное число означает ошибку, -1 означает неопределённый результат, значение меньшее -1 означает код успешного результата
- `RsuvResultBoolPknz` - представление результата вида "успех/не-успех"
- `RsuvResultCountAndData` - простой класс вида `{ countAll: number, data: T[], hasNext: boolean }`
- `RsuvResultTibo` - предсвляет помиму "успешно/не-успешно" также значение результата
- `RusvValueAnd` - представления значения полученного откуда либо.
  - МОТИВАЦИЯ: допустим мы хотим получить значение ячейки столбца, но такого столбца не существует; в этом случае возврат просто falsy значения (undefined и т.п.) не позволяет понять, это значение ячейки undefined или же это означает что ячейки не существует.

## Представления ошибок

- `RsuvErr` - Представляет какую-либо ошибку
- `RsuvErrNT` -

## Валидация

- `RsuvBnuwNT` (interface) - универсальный интерфейс проверки чего-либо на валидность
- `RsuvBnuwUtils` - методы для работы с `RsuvBnuwNT`

## Разное

- `RsuvSearchMode` (enum) - представляет как сравнивать две строки
- `RsuvSearchHow` - тоже что `RsuvSearchMode` только ещё с указанием необходимости учитывать регистр (см. `RsuvCaseSensitive`)
- `RsuvCaseSensitive` (enum) - представляет нужно ли искать с учетом регистра символов или без
- `RsuvPairAndOjRrzh` - представляет [ymuz]-пару и объект <T>
- `RsuvPairYmuz` - представляет "имя поля" и "значение поля". И то и другое - строка

# Тесты

- запуск `npm run test`
