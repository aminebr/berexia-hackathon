import { DefaultPortModel } from "../models/DefaultPortModel";
import { AbstractPortFactory } from "../../factories/AbstractPortFactory";
export declare class DefaultPortFactory extends AbstractPortFactory<DefaultPortModel> {
    constructor();
    getNewInstance(initialConfig?: any): DefaultPortModel;
}
