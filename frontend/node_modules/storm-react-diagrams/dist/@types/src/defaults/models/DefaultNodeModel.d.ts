import { DefaultPortModel } from "./DefaultPortModel";
import { NodeModel } from "../../models/NodeModel";
import { DiagramEngine } from "../../DiagramEngine";
/**
 * @author Dylan Vorster
 */
export declare class DefaultNodeModel extends NodeModel {
    name: string;
    color: string;
    ports: {
        [s: string]: DefaultPortModel;
    };
    constructor(name?: string, color?: string);
    addInPort(label: string): DefaultPortModel;
    addOutPort(label: string): DefaultPortModel;
    deSerialize(object: any, engine: DiagramEngine): void;
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
    } & {
        name: string;
        color: string;
    };
    getInPorts(): DefaultPortModel[];
    getOutPorts(): DefaultPortModel[];
}
