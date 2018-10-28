import { BaseListener, BaseEntity, BaseEvent, BaseEntityType } from "../BaseEntity";
import { DiagramEngine } from "../DiagramEngine";
import { LinkModel } from "./LinkModel";
import { NodeModel } from "./NodeModel";
import { BaseModel, BaseModelListener } from "./BaseModel";
/**
 * @author Dylan Vorster
 *
 */
export interface DiagramListener extends BaseListener {
    nodesUpdated?(event: BaseEvent & {
        node: NodeModel;
        isCreated: boolean;
    }): void;
    linksUpdated?(event: BaseEvent & {
        link: LinkModel;
        isCreated: boolean;
    }): void;
    offsetUpdated?(event: BaseEvent<DiagramModel> & {
        offsetX: number;
        offsetY: number;
    }): void;
    zoomUpdated?(event: BaseEvent<DiagramModel> & {
        zoom: number;
    }): void;
    gridUpdated?(event: BaseEvent<DiagramModel> & {
        size: number;
    }): void;
}
/**
 *
 */
export declare class DiagramModel extends BaseEntity<DiagramListener> {
    links: {
        [s: string]: LinkModel;
    };
    nodes: {
        [s: string]: NodeModel;
    };
    offsetX: number;
    offsetY: number;
    zoom: number;
    rendered: boolean;
    gridSize: number;
    constructor();
    setGridSize(size?: number): void;
    getGridPosition(pos: any): any;
    deSerializeDiagram(object: any, diagramEngine: DiagramEngine): void;
    serializeDiagram(): {
        id: string;
    } & {
        offsetX: number;
        offsetY: number;
        zoom: number;
        gridSize: number;
        links: ({
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
        })[];
        nodes: ({
            id: string;
        } & {
            type: string;
            selected: boolean;
        } & {
            x: number;
            y: number;
            extras: any;
            ports: ({
                id: string;
            } & {
                type: string;
                selected: boolean;
            } & {
                name: string;
                parentNode: string;
                links: string[];
                maximumLinks: number;
            })[];
        })[];
    };
    clearSelection(ignore?: BaseModel<BaseEntity, BaseModelListener> | null): void;
    getSelectedItems(...filters: BaseEntityType[]): BaseModel<BaseEntity, BaseModelListener>[];
    setZoomLevel(zoom: number): void;
    setOffset(offsetX: number, offsetY: number): void;
    setOffsetX(offsetX: number): void;
    setOffsetY(offsetY: number): void;
    getOffsetY(): number;
    getOffsetX(): number;
    getZoomLevel(): number;
    getNode(node: string | NodeModel): NodeModel | null;
    getLink(link: string | LinkModel): LinkModel | null;
    addAll(...models: BaseModel[]): BaseModel[];
    addLink(link: LinkModel): LinkModel;
    addNode(node: NodeModel): NodeModel;
    removeLink(link: LinkModel | string): void;
    removeNode(node: NodeModel | string): void;
    getLinks(): {
        [s: string]: LinkModel;
    };
    getNodes(): {
        [s: string]: NodeModel;
    };
}
