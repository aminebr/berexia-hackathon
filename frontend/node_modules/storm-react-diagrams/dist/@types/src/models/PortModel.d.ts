import { BaseModel, BaseModelListener } from "./BaseModel";
import { NodeModel } from "./NodeModel";
import { LinkModel } from "./LinkModel";
import { DiagramEngine } from "../DiagramEngine";
export declare class PortModel extends BaseModel<NodeModel, BaseModelListener> {
    name: string;
    links: {
        [id: string]: LinkModel;
    };
    maximumLinks: number;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(name: string, type?: string, id?: string, maximumLinks?: number);
    deSerialize(ob: any, engine: DiagramEngine): void;
    serialize(): {
        id: string;
    } & {
        type: string;
        selected: boolean;
    } & {
        name: string;
        parentNode: string;
        links: string[];
        maximumLinks: number;
    };
    doClone(lookupTable: {}, clone: any): void;
    getNode(): NodeModel;
    getName(): string;
    getMaximumLinks(): number;
    setMaximumLinks(maximumLinks: number): void;
    removeLink(link: LinkModel): void;
    addLink(link: LinkModel): void;
    getLinks(): {
        [id: string]: LinkModel;
    };
    createLinkModel(): LinkModel | null;
    updateCoords({x, y, width, height}: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    canLinkToPort(port: PortModel): boolean;
    isLocked(): boolean;
}
