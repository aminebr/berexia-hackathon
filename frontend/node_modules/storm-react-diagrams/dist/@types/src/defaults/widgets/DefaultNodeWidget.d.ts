import { DefaultNodeModel } from "../models/DefaultNodeModel";
import { DiagramEngine } from "../../DiagramEngine";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";
export interface DefaultNodeProps extends BaseWidgetProps {
    node: DefaultNodeModel;
    diagramEngine: DiagramEngine;
}
export interface DefaultNodeState {
}
/**
 * @author Dylan Vorster
 */
export declare class DefaultNodeWidget extends BaseWidget<DefaultNodeProps, DefaultNodeState> {
    constructor(props: DefaultNodeProps);
    generatePort(port: any): JSX.Element;
    render(): JSX.Element;
}
