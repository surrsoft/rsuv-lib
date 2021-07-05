/*
[[tibo]]
 */

export class RsuvResultTibo {
  success: boolean = true
  successCode: string = ''
  value: any = undefined
  errCode: string = ''
  errMessage: string = ''

  constructor(tibo?: RsuvResultTibo) {
    if(tibo) {
      this.success = tibo.success
      this.successCode = tibo.successCode
      this.value = tibo.value
      this.errCode = tibo.errCode
      this.errMessage = tibo.errMessage
    }
  }
}

