import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
export declare class RsuvResultTibo<T> {
    success: boolean;
    successCode?: string;
    value?: T;
    errCode?: string;
    errMessage?: string;
    constructor(tibo?: RsuvResultTibo<T>);
    static fromPknz(pknz: RsuvResultBoolPknz): RsuvResultTibo<any>;
}
