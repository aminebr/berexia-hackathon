import { BaseModel, BaseModelListener } from "./BaseModel";
import { PortModel } from "./PortModel";
import { PointModel } from "./PointModel";
import { BaseEvent } from "../BaseEntity";
import { LabelModel } from "./LabelModel";
import { DiagramEngine } from "../DiagramEngine";
import { DiagramModel } from "./DiagramModel";
export interface LinkModelListener extends BaseModelListener {
    sourcePortChanged?(event: BaseEvent<LinkModel> & {
        port: null | PortModel;
    }): void;
    targetPortChanged?(event: BaseEvent<LinkModel> & {
        port: null | PortModel;
    }): void;
}
export declare class LinkModel<T extends LinkModelListener = LinkModelListener> extends BaseModel<DiagramModel, T> {
    sourcePort: PortModel | null;
    targetPort: PortModel | null;
    labels: LabelModel[];
    points: PointModel[];
    extras: {};
    constructor(linkType?: string, id?: string);
    deSerialize(ob: any, engine: DiagramEngine): void;
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
    };
    doClone(lookupTable: {}, clone: any): void;
    remove(): void;
    isLastPoint(point: PointModel): boolean;
    getPointIndex(point: PointModel): number;
    getPointModel(id: string): PointModel | null;
    getPortForPoint(point: PointModel): PortModel;
    getPointForPort(port: PortModel): PointModel;
    getFirstPoint(): PointModel;
    getLastPoint(): PointModel;
    setSourcePort(port: PortModel): void;
    getSourcePort(): PortModel;
    getTargetPort(): PortModel;
    setTargetPort(port: PortModel): void;
    point(x: number, y: number): PointModel;
    addLabel(label: LabelModel): void;
    getPoints(): PointModel[];
    setPoints(points: PointModel[]): void;
    removePoint(pointModel: PointModel): void;
    removePointsBefore(pointModel: PointModel): void;
    removePointsAfter(pointModel: PointModel): void;
    removeMiddlePoints(): void;
    addPoint<P extends PointModel>(pointModel: P, index?: number): P;
    generatePoint(x?: number, y?: number): PointModel;
}
