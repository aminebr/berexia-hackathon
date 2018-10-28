import { BaseModel } from "../models/BaseModel";
export declare abstract class AbstractFactory<T extends BaseModel> {
    type: string;
    constructor(name: string);
    getType(): string;
    abstract getNewInstance(initialConfig?: any): T;
}
