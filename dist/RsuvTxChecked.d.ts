/**
 * Представляет элемент который может быть чекнут (например элемент выпадающего списка)
 */
export declare class RsuvTxChecked {
    id: string;
    visibleText: string;
    checked: boolean;
    disabled: boolean;
    payload?: any;
    constructor(id: string, visibleText: string, checked?: boolean, disabled?: boolean, payload?: any);
}
