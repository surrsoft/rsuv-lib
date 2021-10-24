/**
 * -- success - TRUE означает успешный результат
 * -- codeNum - любое положительное число означает ошибку, -1 означает неопределённый результат, значение
 * меньшее -1 означает код успешного результата
 */
export class RsuvResultAsau11 {
  success: boolean = false
  codeNum: number = 0

  constructor(codeNum = -1, success: boolean = false) {
    this.success = success
    this.codeNum = codeNum
  }
}
