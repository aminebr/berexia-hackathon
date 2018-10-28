import { DiagramEngine } from "../../DiagramEngine";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";
export interface NodeLayerProps extends BaseWidgetProps {
    diagramEngine: DiagramEngine;
}
export interface NodeLayerState {
}
export declare class NodeLayerWidget extends BaseWidget<NodeLayerProps, NodeLayerState> {
    constructor(props: NodeLayerProps);
    updateNodeDimensions: () => void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
