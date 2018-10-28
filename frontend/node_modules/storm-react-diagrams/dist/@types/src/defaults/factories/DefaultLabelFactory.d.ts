import { DiagramEngine } from "../../DiagramEngine";
import { AbstractLabelFactory } from "../../factories/AbstractLabelFactory";
import { DefaultLabelModel } from "../models/DefaultLabelModel";
/**
 * @author Dylan Vorster
 */
export declare class DefaultLabelFactory extends AbstractLabelFactory<DefaultLabelModel> {
    constructor();
    generateReactWidget(diagramEngine: DiagramEngine, label: DefaultLabelModel): JSX.Element;
    getNewInstance(initialConfig?: any): DefaultLabelModel;
}
