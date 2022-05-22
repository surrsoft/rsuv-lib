import { RsuvResultAsau11 } from './RsuvResultAsau11';
import { RsuvResultTibo } from './RsuvResultTibo';
/**
 * Утилитные статические методы для работы с массивами
 */
export declare class RsuvTuArray {
    /**
     * Извлекает из массива (1) элементы с индекса (2) по индекс (3) (включая эти индексы), и возвращает их в виде нового
     * массива.
     * В случае проблем возвращает тип {@link RsuvResultAsau11}
     * @param arr (1) -- например ['aa', 'ab', 'ac', 'ad']
     * @param indexStart (2) -- например 1
     * @param indexEnd (3) -- например 2
     * @return например ['ab', 'ac']
     */
    static elemsDiap(arr: Array<any>, indexStart: number, indexEnd: number): RsuvResultTibo<any>;
    /**
     * Удаляет элемент по индексу (2)
     * @param arrBack
     * @param index
     * @return RsuvResultAsau11
     */
    static elemDelete(arrBack: Array<any>, index: number): RsuvResultAsau11;
    /**
     * Добавляет элемент (3) по индексу (2), существующие элементы сдвигаются. Если нужно добавить в самый конец,
     * указать индекс (2) равный длине массива (1)
     * @param arrBack (1) -- массив, мутируется, например [1, 2, 3]
     * @param index (2) -- например 1
     * @param elem (3) -- например 's'
     * @return RsuvResultAsau11 ..., (1) например [1, 's',  2, 3]
     */
    static elemAdd(arrBack: Array<any>, index: number, elem: any): RsuvResultAsau11;
    /**
     * В массиве (1) перемещает элемент с индекса (2) на индекс (3)
     * @param arrBack {any[]} (1) -- массив, мутируется
     * @param indexFrom {number} (2) --
     * @param indexTo {number} (3) --
     * @return RsuvResultAsau11
     */
    static elemMove(arrBack: Array<any>, indexFrom: number, indexTo: number): RsuvResultAsau11;
    /**
     * Меняет местами элементы (2) и (3)
     * @param arrBack (1) -- массив, мутируется
     * @param index1 (2) --
     * @param index2 (3) --
     * @return RsuvResultAsau11
     */
    static elemsSwap(arrBack: Array<any>, index1: number, index2: number): RsuvResultAsau11;
    /**
     * Заменяет значением (2), первый элемент (1) удовлетворяющий предикату (3).
     * Неудачей считаются (среди прочего): пустой массив (1), если предикат (3) не функция
     * @param arrBack (1) -- массив, мутируется
     * @param value (2) -- новое значение
     * @param predicate (3) -- вызывается для каждого элемента (1); аргументы - первый это сам элемент, второй это
     * индекс этого элемента
     */
    static elemUpdate(arrBack: Array<any>, value: any, predicate: (elem: any, index: number) => boolean): RsuvResultAsau11;
    /**
     * Возвращает TRUE если массив (1) содержит ВСЕ элементы присутствующие в массиве (2), при условии выбрасывания
     * из (2) всех повторяющихся элементов.
     * Если (1) или (2) это пустые массивы, то возвращает FALSE.
     * @param arr1
     * @param arr2
     */
    static containsAll(arr1: any[], arr2: any[]): boolean;
    static fnIndexValidIs(arr: Array<any>, index: number): boolean;
    static fnIndexValidIsB(arr: Array<any>, index: number): boolean;
    static fnArrValidIs(arr: Array<any>): boolean;
}
