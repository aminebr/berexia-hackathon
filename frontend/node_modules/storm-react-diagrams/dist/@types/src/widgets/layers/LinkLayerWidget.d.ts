import { DiagramEngine } from "../../DiagramEngine";
import { PointModel } from "../../models/PointModel";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";
export interface LinkLayerProps extends BaseWidgetProps {
    diagramEngine: DiagramEngine;
    pointAdded: (point: PointModel, event: MouseEvent) => any;
}
export interface LinkLayerState {
}
/**
 * @author Dylan Vorster
 */
export declare class LinkLayerWidget extends BaseWidget<LinkLayerProps, LinkLayerState> {
    constructor(props: LinkLayerProps);
    render(): JSX.Element;
}
