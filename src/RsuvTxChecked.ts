/**
 * Представляет элемент который может быть чекнут (например элемент выпадающего списка)
 */
export class RsuvTxChecked {
  constructor(
    public id: string,
    public visibleText: string,
    public checked: boolean = false,
    public disabled: boolean = false,
    public payload?: any
  ) {

  }
}
