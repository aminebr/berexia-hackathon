import { DiagramEngine } from "../DiagramEngine";
import { LinkModel } from "../models/LinkModel";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";
export interface LinkProps extends BaseWidgetProps {
    link: LinkModel;
    diagramEngine: DiagramEngine;
    children?: any;
}
export interface LinkState {
}
/**
 * @author Dylan Vorster
 */
export declare class LinkWidget extends BaseWidget<LinkProps, LinkState> {
    constructor(props: LinkProps);
    shouldComponentUpdate(): boolean;
    render(): any;
}
