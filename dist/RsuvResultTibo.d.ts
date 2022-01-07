import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Представление результата "успешно/неуспешно" плюс значение <T> результата
 *
 * ID [[tibo]]
 */
export declare class RsuvResultTibo<T> {
    success: boolean;
    successCode?: string;
    value?: T;
    errCode?: string;
    errMessage?: string;
    constructor(tibo?: RsuvResultTibo<T>);
    static fromPknz(pknz: RsuvResultBoolPknz): RsuvResultTibo<any>;
}
