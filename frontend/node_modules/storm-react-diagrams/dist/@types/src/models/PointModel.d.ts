import { BaseModel, BaseModelListener } from "./BaseModel";
import { LinkModel } from "./LinkModel";
import { DiagramEngine } from "../DiagramEngine";
export declare class PointModel extends BaseModel<LinkModel, BaseModelListener> {
    x: number;
    y: number;
    constructor(link: LinkModel, points: {
        x: number;
        y: number;
    });
    getSelectedEntities(): this[];
    isConnectedToPort(): boolean;
    getLink(): LinkModel;
    deSerialize(ob: any, engine: DiagramEngine): void;
    serialize(): {
        id: string;
    } & {
        type: string;
        selected: boolean;
    } & {
        x: number;
        y: number;
    };
    remove(): void;
    updateLocation(points: {
        x: number;
        y: number;
    }): void;
    getX(): number;
    getY(): number;
    isLocked(): boolean;
}
