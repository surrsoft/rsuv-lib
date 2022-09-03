import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvResultCountAndData } from './RsuvResultCountAndData';
import { RsuvResultTibo } from './RsuvResultTibo';
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
    /**
     * см. также функцию elemsGetPage()
     * @param offset (1) -- сколько элементов пропустить, с начала
     * @param limit (2) -- сколько элементов взять после пропуска
     */
    elemsGet(offset: number, limit: number): Promise<any>;
    /**
     * Другой вариант функции elemsGet()
     * @param pageNum (1) -- номер страницы, 1+
     * @param limit (2) -- количество элементов на странице
     */
    elemsGetPage(pageNum: number, limit: number): Promise<any>;
    /**
     * Возвращает все записи удовлетворяющие [ntxe]-фильтру (1)
     * @param filter (1) -- см. [ntxe]
     */
    elemsGetByFilter(filter: string): Promise<any>;
    /**
     * Отбор записей у которых в поле (1) значение содержит подстроку (2) (без учета регистра символов).
     * Из всех возможных результатов, отбрасываются первые (3) и из оставшихся берутся первые (4)
     *
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
    elemsGetByFilterBB(fieldName: string, substring: string, pageNumber: number, limit: number): Promise<any>;
    /**
     * Отличается от B тем что возвращает более развёрнутый ответ
     *
     * @param fieldName (1) --
     * @param substring (2) --
     * @param offset (3) --
     * @param limit (4) --
     * @return RsuvResultCountAndData где
     * countAll - количество элементов удовлетворяющих фильтру (1)(2) без учета (3)(4),
     * data - сами элементы удовлетворяющие (1)-(4),
     * hasNext - TRUE если возвращены НЕ все данные удовлетворяющие фильтру (1)(2)
     */
    elemsGetByFilterC<T>(fieldName: string, substring: string, offset: number, limit: number): Promise<RsuvResultCountAndData<T>>;
    /**
     * Отличается от CA только параметром (3)
     *
     * @param fieldName (1) --
     * @param substring (2) --
     * @param pageNumber (3) -- 1+
     * @param limit (4) --
     */
    elemsGetByFilterCB<T>(fieldName: string, substring: string, pageNumber: number, limit: number): Promise<RsuvResultCountAndData<T>>;
    /**
     * Удаляет элемент с id {@param id}. Возвращает информацию о том было ли удаление успешным
     */
    elemDelete(id: string | number): Promise<RsuvResultBoolPknz>;
    elemsDelete(ids: string[] | number[]): Promise<RsuvResultBoolPknz[]>;
    /**
     * Отличается от А тем что даёт больше информации об итогах удаления элементов
     * @param ids
     */
    elemsDeleteB(ids: Array<string | number>): Promise<RsuvRemoveResultAsau100>;
    /**
     *
     * @param filter (1) -- см. [ntxe]
     */
    elemsDeleteByFilter(filter: string): Promise<RsuvResultBoolPknz[]>;
    elemCreate(data: object): Promise<RsuvResultBoolPknz>;
    /**
     * Отличается от А тем что возвращает также информацию об ID созданного элемента (в поле 'value' в виде строки)
     * @param data (1) -- объект без поля 'id'
     * @return
     */
    elemCreateB(data: object): Promise<RsuvResultTibo<string>>;
    elemUpdate(data: any): Promise<RsuvResultBoolPknz>;
}
/**
 * Представляет результат удаления элементов
 */
export declare type RsuvRemoveResultAsau100 = {
    /** TRUE если все элементы были успешно удалены */
    isAllSuccess: boolean;
    /** id элементов которые были успешно удалены */
    idsSuccess: Array<string | number>;
    /** id элементов которые НЕ были успешно удалены */
    idsNotSuccess: Array<string | number>;
};
