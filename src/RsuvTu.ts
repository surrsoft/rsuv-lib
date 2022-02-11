export const testData = [
  {id: 1, val: '', desc: 'пустая строка', res: true},
  {
    id: 2, val: ' ',
    desc: 'строка только из пробелов',
    res: true
  },
  {id: 3, val: 'text', desc: 'строка без пробелов', res: true},
  {id: 4, val: 'text text', desc: 'строка с пробелами только внутри', res: true},
  {id: 5, val: ' text', desc: 'строка с пробелом в начале', res: true},
  {id: 6, val: 'text ', desc: 'строка с пробелом в конце', res: true},
  {id: 7, val: ' text ', desc: 'строка с пробелом в начале и конце', res: true},
  {
    id: 8, val: `text1
  text2`, desc: 'строка переносом внутри', res: true
  },
  {id: 9, val: '100', desc: 'строка целое число', res: true},
  {id: 10, val: null, desc: 'null', res: true},
  {id: 11, val: undefined, desc: 'undefined', res: true},
  {id: 12, val: NaN, desc: 'NaN', res: true},
  {id: 13, val: Infinity, desc: 'Infinity', res: true},
  {id: 14, val: 0, desc: 'ноль', res: true},
  {id: 15, val: +0, desc: '+0', res: true},
  {id: 16, val: -0, desc: '-0', res: true},
  {id: 17, val: 100, desc: 'число 100', res: true},
  {id: 18, val: 100.06, desc: 'число 100.06', res: true},
  {id: 19, val: [], desc: 'пустой массив', res: true},
  {id: 20, val: [{a: 1}], desc: 'непустой массив', res: true},
  {id: 21, val: {}, desc: 'пустой объект', res: true},
  {id: 22, val: {a: 1}, desc: 'непустой объект', res: true},
  {
    id: 23, val: () => {
    }, desc: 'стрелочная функция', res: true
  },
  {
    id: 24, val: `
  text`, desc: 'строка с переносом в начале', res: true
  },
  {
    id: 25, val: `text
  `, desc: 'строка с переносом в конце', res: true
  },
  {
    id: 26, val: `
    text
  `, desc: 'строка с переносом в начале, середине и конце', res: true
  },
  {
    id: 27, val: `
    `, desc: 'строка из одних переносов', res: true
  },
]

export const RSUV_NO_TAGS_SPC_VALUE = '<no tags>'
