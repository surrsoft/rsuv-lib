/**
 * [[rkyr]]
 */
import { RsuvDataSourceAecrNT } from './RsuvDataSourceAecrNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
export declare class RsuvZrnxSubData<T> {
    /**
     * номер страницы
     */
    page: number;
    /**
     * общее количество страниц
     */
    pageCount: number;
    /**
     * общее количество элементов
     */
    elemsAllCount: number;
    /**
     * коллекция элементов страницы
     */
    elemsOfPage: T[];
    constructor(
    /**
     * номер страницы
     */
    page?: number, 
    /**
     * общее количество страниц
     */
    pageCount?: number, 
    /**
     * общее количество элементов
     */
    elemsAllCount?: number, 
    /**
     * коллекция элементов страницы
     */
    elemsOfPage?: T[]);
}
/**
 * [[zrnx]]
 *
 * Сущность для использования в качестве посредника между абстрактным источником-данных (интерефейс
 * {@link RsuvDataSourceAecrNT}) и UI-списком-с-пагинацией.
 *
 * При вызове {@link make} делаются обращения к {@link dataSource} и на базе полученных данных вычисляются поля {@link page}
 * {@link elemsAllCount}, {@link elemsOfPage}, {@link pageCount}. Эти поля можно получить с помощью метода {@link dataGet}
 * в виде типа {@link RsuvZrnxSubData} для последующего использования в качестве входных данных для UI-списка-с-пагинацией
 */
export declare class RsuvAdapterZrnx<T> {
    readonly perPage: number;
    readonly dataSource: RsuvDataSourceAecrNT<T>;
    private page;
    private elemsAllCount;
    private elemsOfPage;
    private pageCount;
    /**
     *
     * @param perPage (1) -- число-записей-на-странице, 1+
     * @param dataSource (2) -- источник-данных
     */
    constructor(perPage: number, dataSource: RsuvDataSourceAecrNT<T>);
    /**
     * Запрос данных и вычисление полей текущего объекта
     *
     * @param pageNum (1) -- номер страницы
     * @param last (2) -- если TRUE, то (1) игнирируется и вычисление выполняется для последней страницы
     */
    make(pageNum: number, last?: boolean): Promise<RsuvResultBoolPknz>;
    /**
     * Получение результатов вычислений
     */
    dataGet(): RsuvZrnxSubData<T>;
}
