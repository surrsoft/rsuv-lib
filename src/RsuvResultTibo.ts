/*
[[tibo]]
 */

import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';

export class RsuvResultTibo<T> {
  success: boolean = true
  successCode?: string
  value?: T
  errCode?: string
  errMessage?: string

  constructor(tibo?: RsuvResultTibo<T>) {
    if (tibo) {
      this.success = tibo.success
      this.successCode = tibo.successCode
      this.value = tibo.value
      this.errCode = tibo.errCode
      this.errMessage = tibo.errMessage
    }
  }

  static fromPknz(pknz: RsuvResultBoolPknz): RsuvResultTibo<any> {
    if (pknz) {
      return new RsuvResultTibo({success: pknz.success, errCode: pknz.errCode, errMessage: pknz.errMessage})
    }
    return new RsuvResultTibo({success: false, errCode: '[[210725095953]]', errMessage: ''})
  }
}

