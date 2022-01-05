/*
Утилиты для получения информации об объектах.

Статус: в разработке
 */


export enum TypeAsau42 {
  KFRX = 'kfrx'
}

export function info(entry: any) {
  const is = []
  if (entry) {
    const con = entry.constructor
    if (con) {
      if (con.name === 'Function') {
        is.push(TypeAsau42.KFRX)
      }
    }
  }
}
