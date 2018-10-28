import { BaseAction } from "./BaseAction";
import { DiagramModel } from "../models/DiagramModel";
export declare class SelectingAction extends BaseAction {
    mouseX2: number;
    mouseY2: number;
    constructor(mouseX: number, mouseY: number);
    getBoxDimensions(): {
        left: number;
        top: number;
        width: number;
        height: number;
        right: number;
        bottom: number;
    };
    containsElement(x: number, y: number, diagramModel: DiagramModel): boolean;
}
