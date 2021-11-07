* [[rsuv]] - universal components, standard library, TS, JS
* on base `tsdx` https://github.com/formium/tsdx

# Элементы
## _
* `RsuvTx..` - представление разных сущностей - строк, чисел, email и т.д.
* `RsuvTu..` - утилиты для работы с сущностями - строками, числами, массивами и т.д.

## _
* `RsuvTuString` - утилиты для работы со строками
* `RsuvTuArray` - утилиты для работы с массивами

## RsuvTxString ...
* `RsuvTxString` - строка не нулевой длины
* `RsuvTxStringAA` - тоже что `RsuvTxString` только ещё не содержит пробелов/переносов
* `RsuvTxStringB` - тоже что `RsuvTxString` только не состоит из одних только пробелов/переносов
* `RsuvTxStringC` - тоже что `RsuvTxStringB` только не начинается с пробела/переноса и не заканчивается пробелом/переносом
* `RsuvTxStringAB` - тоже что `RsuvTxString` только состоит только из символов [a-zA-Z0-9_]
* `RsuvTxStringABB` - тоже что `RsuvTxStringAB` только начинается не с цифры

## RsuvTxNumInt ...
* `RsuvTxNumInt` - целое число (не NaN, Infinity, +Infinity, -Infinity, не дробное)
* `RsuvTxNumIntAB` - тоже что `RsuvTxNumInt` но >= 0
* `RsuvTxNumIntABB` - тоже что `RsuvTxNumIntAB` но > 0
* `RsuvTxNumIntAC` - тоже что `RsuvTxNumInt` но >= -1

## _
* `RsuvTxJsonServer` - утилиты для работы с JsonServer (https://github.com/typicode/json-server)
* `RsuvTxEmail` - представление email-адреса

## _
* `RsuvSearchMode`, `RsuvSearchHow` - для использования при поиске

# Тесты
* запуск `npm run test`