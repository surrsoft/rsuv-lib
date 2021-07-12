import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Вместо этого типа нужно передавать тип UnwrapRef<RsuvCheckModelGnpw[]>, т.е. value из ref сделанного на RsuvCheckModelGnpw[]
 * <code lang="js">
 *   ref([new RsuvCheckModelGnpw('1', false)]).value
 * </code>
 */
export declare type RsuvT1 = any[];
export declare class RsuvEcxm {
    static find(models: RsuvT1, id: string): any;
    /**
     * Добавляет новый элемент (2) в конец (1)
     * @param modelsBack (1) --
     * @param model
     */
    static append(modelsBack: RsuvT1, model: RsuvCheckModelGnpw): RsuvResultBoolPknz;
    static appendMulti(modelsBack: RsuvT1, models: RsuvCheckModelGnpw[]): RsuvResultBoolPknz[];
    static update(modelsBack: RsuvT1, model: RsuvCheckModelGnpw): RsuvResultBoolPknz;
    static updateMulti(modelsBack: RsuvT1, models: RsuvCheckModelGnpw[]): RsuvResultBoolPknz[];
    static delete(modelsBack: RsuvT1, model: RsuvCheckModelGnpw): RsuvResultBoolPknz;
    static deleteMulti(modelsBack: RsuvT1, models: RsuvCheckModelGnpw[]): RsuvResultBoolPknz[];
    static filter(models: RsuvT1, checked: boolean): any[];
    static inverse(modelsBack: RsuvT1): void;
}
/**
 * Представление [gnpw]
 */
export declare class RsuvCheckModelGnpw implements RsuvBnuwNT {
    id: string;
    checked: boolean;
    constructor(id?: string, checked?: boolean);
    bnuwIsValid(): RsuvResultBoolPknz;
}
