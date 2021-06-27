import { RsuvPairYmuz } from './RsuvPairYmuz';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvPairAndOjRrzh } from './RsuvPairAndOjRrzh';
export interface RsuvDataSourceAecrNT<T> {
    elemsGet(offset: number, limit: number): Promise<T[]>;
    elemsAllCountGet(): Promise<number>;
    elemsDelete(pairs: RsuvPairYmuz[]): Promise<RsuvResultBoolPknz[]>;
    elemsCreate(ojs: T[]): Promise<RsuvResultBoolPknz[]>;
    elemsUpdate(pairAndOjs: RsuvPairAndOjRrzh<T>[]): Promise<RsuvResultBoolPknz[]>;
}
