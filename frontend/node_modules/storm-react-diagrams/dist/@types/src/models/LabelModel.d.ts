import { BaseModel } from "./BaseModel";
import { LinkModel } from "./LinkModel";
import { DiagramEngine } from "../DiagramEngine";
export declare class LabelModel extends BaseModel<LinkModel> {
    offsetX: number;
    offsetY: number;
    constructor(type?: string, id?: string);
    deSerialize(ob: any, engine: DiagramEngine): void;
    serialize(): {
        id: string;
    } & {
        type: string;
        selected: boolean;
    } & {
        offsetX: number;
        offsetY: number;
    };
}
