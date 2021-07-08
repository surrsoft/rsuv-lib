import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
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
