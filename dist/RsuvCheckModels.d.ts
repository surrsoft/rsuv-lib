import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Представление [gnpw]
 */
export declare class RsuvCheckModelGnpw implements RsuvBnuwNT {
    id: string;
    checked: boolean;
    constructor(id?: string, checked?: boolean);
    bnuwIsValid(): RsuvResultBoolPknz;
}
/**
 * Представление [ecxm]
 */
export declare class RsuvCheckModelsEcxm implements RsuvBnuwNT {
    models: RsuvCheckModelGnpw[];
    appendMulti(modelsAppending: RsuvCheckModelGnpw[]): RsuvResultBoolPknz;
    remove(id: string): RsuvResultBoolPknz;
    update(id: string, checked: boolean): RsuvResultBoolPknz;
    /**
     *
     * @param id
     * @return undefined если не находит
     */
    find(id: string): RsuvCheckModelGnpw | undefined;
    bnuwIsValid(): RsuvResultBoolPknz;
}
export declare class RsuvCheckModelsEcxmB {
}
