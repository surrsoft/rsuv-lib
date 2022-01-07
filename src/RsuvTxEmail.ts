import { RsuvTxStringAB } from './RsuvTxStringAB';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import EmailValidator from 'email-validator';

export class RsuvTxEmail extends RsuvTxStringAB {
  bnuwIsValid(): RsuvResultBoolPknz {
    const resV = EmailValidator.validate(this.val)
    if(!resV) {
      return new RsuvResultBoolPknz(false, '[[210706113857]]', 'EmailValidator')
    }

    // const resValid = super.bnuwIsValid();
    // if (!resValid.success) {
    //   return resValid;
    // }
    // // ---
    // const b1 = new RegExp(
    //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    // ).test(this.val)
    // if (!b1) {
    //   return new RsuvResultBoolPknz(false, '[[210706105956]]', 'is not email');
    // }
    // const splited = this.val.split('@');
    // if (splited.length > 2) {
    //   return new RsuvResultBoolPknz(false, '[[210706112944]]', 'only one @ allowed');
    // }
    // if(splited[0].length > 64) {
    //   return new RsuvResultBoolPknz(false, '[[210706113459]]', 'local-part is > 64 length');
    // }
    return new RsuvResultBoolPknz(true)
  }
}
