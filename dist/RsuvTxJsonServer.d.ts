import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvResultCountAndData } from './RsuvResultCountAndData';
/**
 * [[ktvg]]
 *
 * Утилита для запросав к json-server (https://github.com/typicode/json-server)
 */
export declare class RsuvTxJsonServer {
    readonly basePath: string;
    readonly collectionName: string;
    private readonly path;
    /**
     *
     * @param basePath (1) -- expample 'http://localhost:21884/'
     * @param collectionName (2) -- example 'products'
     */
    constructor(basePath: string, collectionName: string);
    elemsCountGetAll(): Promise<number>;
    elemsGetAll(): Promise<any>;
    elemsGetPage(pageNum: number, perPage: number): Promise<any>;
    elemsGet(offset: number, limit: number): Promise<any>;
    /**
     *
     * @param filter (1) -- см. [ntxe]
     */
    elemsGetByFilter(filter: string): Promise<any>;
    /**
     * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов).
     * Из всех возможных результатов, отбрасываются первые (3) и из оставшихся берутся первые (4)
     * @param fieldName (1) --
     * @param substring (2) --
     * @param offset (3) --
     * @param limit (4) --
     */
    elemsGetByFilterB(fieldName: string, substring: string, offset: number, limit: number): Promise<any>;
    /**
     * Отличается от BA только тем что (3) это не offset а pageNumber
     *
     * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов).
     * Из всех возможных результатов, берётся страница (3), (4) определяет число элементов на странице
     *
     * @param fieldName (1) --
     * @param substring (2) --
     * @param pageNumber (3) -- 1+
     * @param limit (4) --
     */
    elemsGetByFilterBB(fieldName: string, substring: string, pageNumber: number, limit: number): Promise<void>;
    elemsGetByFilterC<T>(fieldName: string, substring: string, offset: number, limit: number): Promise<RsuvResultCountAndData<T>>;
    elemsGetByFilterCB<T>(fieldName: string, substring: string, pageNumber: number, limit: number): Promise<RsuvResultCountAndData<T>>;
    elemDelete(id: string | number): Promise<RsuvResultBoolPknz>;
    elemsDelete(ids: string[] | number[]): Promise<RsuvResultBoolPknz[]>;
    /**
     *
     * @param filter (1) -- см. [ntxe]
     */
    elemsDeleteByFilter(filter: string): Promise<RsuvResultBoolPknz[]>;
    elemCreate(data: object): Promise<RsuvResultBoolPknz>;
    elemUpdate(data: any): Promise<RsuvResultBoolPknz>;
}