import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
export declare class RsuvListCheckingGnpw implements RsuvBnuwNT {
    models: RsuvCheckModel001[];
    appendMulti(modelsAppending: RsuvCheckModel001[]): RsuvResultBoolPknz;
    remove(id: string): RsuvResultBoolPknz;
    update(id: string, checked: boolean): RsuvResultBoolPknz;
    /**
     *
     * @param id
     * @return undefined если не находит
     */
    find(id: string): RsuvCheckModel001 | undefined;
    bnuwIsValid(): RsuvResultBoolPknz;
}
export declare class RsuvCheckModel001 implements RsuvBnuwNT {
    id: string;
    checked: boolean;
    bnuwIsValid(): RsuvResultBoolPknz;
}
