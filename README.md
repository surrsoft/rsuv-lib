- [[rsuv]] - universal components, utilities, standard library, TS, JS
- on base `tsdx` https://github.com/formium/tsdx
- https://www.npmjs.com/package/rsuv-lib

# Rev 2
- в этой редакции, все `RsuvTx...`-сущности бросают исключение, если их невозможно создать с указанными входными параметрами конструктора 

# Элементы

## Приставки

- `RsuvTx...` - представление разных сущностей - строк, чисел, email и т.д.
- `RsuvTu...` - утилиты для работы с сущностями - строками, числами, массивами и т.д.
- `RsuvEn...` - сущности преимущественно являющиеся перечислениями, например разновидностей чего-либо (типы данных, виды дат и т.п.)

## Разное

- `RsuvConst` - константы разные
- `RsuvTu` - разное общее
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
  - `elemsSwap` - поменять местами два элемента
- `RsuvTuPromiseAllSettled` - утилиты для работы с Promise.allSettled()

## Представления примитивов

### Строка

- `RsuvTxString` - строка не нулевой длины
- `RsuvTxStringAB` - тоже что `RsuvTxString` только не содержит пробелов/переносов
- `RsuvTxStringAC` - тоже что `RsuvTxString` но состоит только из символов [a-zA-Z0-9_]
- `RsuvTxStringACB` - тоже что `RsuvTxStringAC` только начинается не с цифры
- `RsuvTxStringACC` - тоже что `RsuvTxStringAC` только состоит только из символов [0-9] (т.е. только из цифр)
- `RsuvTxStringAD` - тоже что `RsuvTxString` только эта строка не может состоять из одних только пробелов/переносов
- `RsuvTxStringADB` - тоже что `RsuvTxStringAD` только не начинается с пробела/переноса и не заканчивается пробелом/переносом

### Целое число

- `RsuvTxNumInt` - целое число (не NaN, Infinity, +Infinity, -Infinity, не дробное)
- `RsuvTxNumIntAB` - тоже что `RsuvTxNumInt` но >= 0
- `RsuvTxNumIntABB` - тоже что `RsuvTxNumIntAB` но > 0
- `RsuvTxNumIntAC` - тоже что `RsuvTxNumInt` но >= -1

### Диапазон целых чисел
- `RsuvTxNumIntDiap` - представление диапазона целых положительных чисел (>= 0), второе число >= первого

### Boolean

- `RsuvTxBoolean` - представление boolean

## RsuvEn...

- `RsuvEnCaseSensitive` (enum) - представляет нужно ли искать с учетом регистра символов или без
- `RsuvEnDataTypes` (enum) - обозначения основных типов данных, например использующихся в базах данных
- `RsuvEnSort` (enum) - представляет направления сортировки ("по возрастанию", "по убыванию", "не определено")
- `RsuvEnResultCrudSet` (enum) - представление результата set operation ([asau45])

## Представление разного

- `RsuvTxJsonServer` - утилиты для работы с JsonServer (https://github.com/typicode/json-server)
- `RsuvTxEmail` - представление email-адреса
- `RsuvTxFieldName` - представляет типовой "ключ", "имя поля", "имя столбца таблицы БД" и т.п., т.е. это строка состоящая только из символов [a-zA-Z0-9_] и начинающаяся не с цифры
- `RsuvTxSort` - представление направления сортировки (id абстратной сущности + само направление)
- `RsuvTxChecked` - представляет элемент который может быть чекнут (например элемент выпадающего списка)

## Списки

- `RsuvAdapterZrnx` - сущность для использования в качестве посредника между абстрактным источником-данных (интерефейс RsuvDataSourceAecrNT) и UI-списком-с-пагинацией
- `RsuvDataSourceAecrNT` (interface) - Сущность представляющая абстрактный "источник данных". Позволяет получать диапазон элементов, узнавать сколько всего есть элементов, удалять элементы, создавать и обновлять
- `RsuvPaginationGyth` - сущность для пагинации. Передаём в конструктор "общее кол-во элементов" и "кол-во элементов на странице", и затем по "номеру страницы" узнаём начальный и конечный индексы с помощью метода indexesByPageNum
- `RsuvCheckModels` - сущности для работы с checked-списками (списки хранящие информацию о том какой элемент чекнут, какой нет)

## Представление результата чего-либо

- `RsuvResultBoolPknz` - представление результата вида "успех/не-успех"
- `RsuvResultTibo` - предсвляет помимо "успешно/не-успешно" также значение результата. ID[1636805160]
- `RsuvResultAsau11` - `success` - TRUE означает успешный результат, `codeNum` - любое положительное число означает ошибку, -1 означает неопределённый результат, значение меньшее -1 означает код успешного результата
- `RsuvResultCountAndData` - простой класс вида `{ countAll: number, data: T[], hasNext: boolean }`
- `RsuvValueAnd` - представления значения полученного откуда либо.
  - МОТИВАЦИЯ: допустим мы хотим получить значение ячейки столбца, но такого столбца не существует; в этом случае возврат просто falsy значения (undefined и т.п.) не позволяет понять, это значение ячейки undefined или же это означает что ячейки не существует.
- `RsuvEnResultCrudSet` (enum) - представление результата set operation ([asau45]) или upsert opertaion ([asau46])

## Представления ошибок

- `RsuvErr` - Представляет какую-либо ошибку
- `RsuvErrNT` -

## Валидация

- `RsuvBnuwNT` (interface) - универсальный интерфейс проверки чего-либо на валидность
- `RsuvBnuwUtils` - методы для работы с `RsuvBnuwNT`

## Разное

- `RsuvSearchMode` (enum) - представляет как сравнивать две строки
- `RsuvSearchHow` - тоже что `RsuvSearchMode` только ещё с указанием необходимости учитывать регистр (см. `RsuvEnCaseSensitive`)
- `RsuvSearchElem` - ID [1636803407]; представление единичного элемента поиска "ключ/значение"
- `RsuvSearchElems` - Представление нескольких RsuvSearchElem (ID [1636803407]) применяемых по правилу "И". 
- `RsuvPairAndOjRrzh` - представляет [ymuz]-пару и объект <T>
- `RsuvPairYmuz` - представляет "имя поля" и "значение поля". И то и другое - строка
- `RsuvTuInfo` - {в разработке} информация о программных сущностях
- `RsuvTu.RSUV_NO_TAGS_SPC_VALUE` - специальное значение "нет тега"

# Тесты

- запуск `npm run test`

# Пометки в коде
- `// del+` - временные комментарии которые нужно удалить
- `#aadesc` - места где нужно добавить поясняющие комментарии
