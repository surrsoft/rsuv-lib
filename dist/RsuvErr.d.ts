/**
 * Представляет какую-либо ошибку
 */
export declare class RsuvErr {
    readonly code: string;
    readonly message: string;
    constructor(code?: string, message?: string);
    asString(): string;
}
