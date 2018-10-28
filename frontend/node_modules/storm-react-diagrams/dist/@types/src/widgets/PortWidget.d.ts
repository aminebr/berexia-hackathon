import { NodeModel } from "../models/NodeModel";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";
export interface PortProps extends BaseWidgetProps {
    name: string;
    node: NodeModel;
}
export interface PortState {
    selected: boolean;
}
/**
 * @author Dylan Vorster
 */
export declare class PortWidget extends BaseWidget<PortProps, PortState> {
    constructor(props: PortProps);
    getClassName(): string;
    render(): JSX.Element;
}
