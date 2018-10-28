/**
 * @author Dylan Vorster
 */
import { LinkModel, LinkModelListener } from "../../models/LinkModel";
import { BaseEvent } from "../../BaseEntity";
import { DiagramEngine } from "../../DiagramEngine";
import { LabelModel } from "../../models/LabelModel";
export interface DefaultLinkModelListener extends LinkModelListener {
    colorChanged?(event: BaseEvent<DefaultLinkModel> & {
        color: null | string;
    }): void;
    widthChanged?(event: BaseEvent<DefaultLinkModel> & {
        width: 0 | number;
    }): void;
}
export declare class DefaultLinkModel extends LinkModel<DefaultLinkModelListener> {
    width: number;
    color: string;
    curvyness: number;
    constructor(type?: string);
    serialize(): {
        id: string;
    } & {
        type: string;
        selected: boolean;
    } & {
        source: string;
        sourcePort: string;
        target: string;
        targetPort: string;
        points: ({
            id: string;
        } & {
            type: string;
            selected: boolean;
        } & {
            x: number;
            y: number;
        })[];
        extras: {};
        labels: ({
            id: string;
        } & {
            type: string;
            selected: boolean;
        } & {
            offsetX: number;
            offsetY: number;
        })[];
    } & {
        width: number;
        color: string;
        curvyness: number;
    };
    deSerialize(ob: any, engine: DiagramEngine): void;
    addLabel(label: LabelModel | string): void;
    setWidth(width: number): void;
    setColor(color: string): void;
}
