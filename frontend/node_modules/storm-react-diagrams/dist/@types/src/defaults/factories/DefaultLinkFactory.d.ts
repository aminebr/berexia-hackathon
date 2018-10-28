import { DefaultLinkWidget } from "../widgets/DefaultLinkWidget";
import { DiagramEngine } from "../../DiagramEngine";
import { AbstractLinkFactory } from "../../factories/AbstractLinkFactory";
import { DefaultLinkModel } from "../models/DefaultLinkModel";
/**
 * @author Dylan Vorster
 */
export declare class DefaultLinkFactory extends AbstractLinkFactory<DefaultLinkModel> {
    constructor();
    generateReactWidget(diagramEngine: DiagramEngine, link: DefaultLinkModel): JSX.Element;
    getNewInstance(initialConfig?: any): DefaultLinkModel;
    generateLinkSegment(model: DefaultLinkModel, widget: DefaultLinkWidget, selected: boolean, path: string): JSX.Element;
}
