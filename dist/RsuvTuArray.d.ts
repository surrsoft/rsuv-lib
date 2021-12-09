import { RsuvResultAsau11 } from './RsuvResultAsau11';
/**
 * Утилитные статические методы для работы с массивами
 */
export declare class RsuvTuArray {
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
    static fnIndexValidIs(arr: Array<any>, index: number): boolean;
    static fnIndexValidIsB(arr: Array<any>, index: number): boolean;
    static fnArrValidIs(arr: Array<any>): boolean;
}
