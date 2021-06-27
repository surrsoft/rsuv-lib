export declare class RsuvValueAnd {
    readonly value: string;
    readonly isValueExist: boolean;
    /**
     * МОТИВАЦИЯ: допустим мы хотим получить значение ячейки столбца, но такого столбца не существует; в этом случае
     * возврат просто falsy значения (undefined и т.п.) не позволяет понять, это значение ячейки undefined или же это
     * означает что ячейки не существует.
     *
     * @param value
     * @param isValueExist (2) -- если здесь FALSE то это означает что значение поля {@link value} не следует брать во
     * внимание т.к. на самом деле значения получить не удалось (например сущности из которой предполагается взять
     * значение просто не существует)
     */
    constructor(value: string, isValueExist?: boolean);
}
