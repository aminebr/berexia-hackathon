import { BaseModel, BaseModelListener } from "./BaseModel";
import { PortModel } from "./PortModel";
import { DiagramEngine } from "../DiagramEngine";
import { DiagramModel } from "./DiagramModel";
export declare class NodeModel extends BaseModel<DiagramModel, BaseModelListener> {
    x: number;
    y: number;
    extras: any;
    ports: {
        [s: string]: PortModel;
    };
    width: number;
    height: number;
    constructor(nodeType?: string, id?: string);
    setPosition(x: any, y: any): void;
    getSelectedEntities(): BaseModel<any, BaseModelListener>[];
    deSerialize(ob: any, engine: DiagramEngine): void;
    serialize(): {
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
    };
    doClone(lookupTable: {}, clone: any): void;
    remove(): void;
    getPortFromID(id: any): PortModel | null;
    getPort(name: string): PortModel | null;
    getPorts(): {
        [s: string]: PortModel;
    };
    removePort(port: PortModel): void;
    addPort<T extends PortModel>(port: T): T;
    updateDimensions({width, height}: {
        width: number;
        height: number;
    }): void;
}
