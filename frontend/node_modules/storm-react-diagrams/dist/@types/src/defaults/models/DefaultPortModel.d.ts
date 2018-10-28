import { PortModel } from "../../models/PortModel";
import { DiagramEngine } from "../../DiagramEngine";
import { DefaultLinkModel } from "./DefaultLinkModel";
import { LinkModel } from "../../models/LinkModel";
export declare class DefaultPortModel extends PortModel {
    in: boolean;
    label: string;
    links: {
        [id: string]: DefaultLinkModel;
    };
    constructor(isInput: boolean, name: string, label?: string, id?: string);
    deSerialize(object: any, engine: DiagramEngine): void;
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
    } & {
        in: boolean;
        label: string;
    };
    link(port: PortModel): LinkModel;
    canLinkToPort(port: PortModel): boolean;
    createLinkModel(): LinkModel;
}
