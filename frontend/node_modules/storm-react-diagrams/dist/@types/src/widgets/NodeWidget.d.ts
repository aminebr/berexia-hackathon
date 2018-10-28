import { DiagramEngine } from "../DiagramEngine";
import { NodeModel } from "../models/NodeModel";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";
export interface NodeProps extends BaseWidgetProps {
    node: NodeModel;
    children?: any;
    diagramEngine: DiagramEngine;
}
export interface NodeState {
}
/**
 * @author Dylan Vorster
 */
export declare class NodeWidget extends BaseWidget<NodeProps, NodeState> {
    constructor(props: NodeProps);
    shouldComponentUpdate(): boolean;
    getClassName(): string;
    render(): JSX.Element;
}
