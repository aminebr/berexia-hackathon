import { DiagramEngine } from "../../DiagramEngine";
import { PointModel } from "../../models/PointModel";
import { DefaultLinkModel } from "../models/DefaultLinkModel";
import PathFinding from "../../routing/PathFinding";
import { LabelModel } from "../../models/LabelModel";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";
export interface DefaultLinkProps extends BaseWidgetProps {
    color?: string;
    width?: number;
    smooth?: boolean;
    link: DefaultLinkModel;
    diagramEngine: DiagramEngine;
    pointAdded?: (point: PointModel, event: MouseEvent) => any;
}
export interface DefaultLinkState {
    selected: boolean;
}
export declare class DefaultLinkWidget extends BaseWidget<DefaultLinkProps, DefaultLinkState> {
    static defaultProps: DefaultLinkProps;
    refLabels: {
        [id: string]: HTMLElement;
    };
    refPaths: SVGPathElement[];
    pathFinding: PathFinding;
    constructor(props: DefaultLinkProps);
    calculateAllLabelPosition(): void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    addPointToLink: (event: MouseEvent, index: number) => void;
    generatePoint(pointIndex: number): JSX.Element;
    generateLabel(label: LabelModel): JSX.Element;
    generateLink(path: string, extraProps: any, id: string | number): JSX.Element;
    findPathAndRelativePositionToRenderLabel: (index: number) => {
        path: any;
        position: number;
    };
    calculateLabelPosition: (label: any, index: number) => void;
    /**
     * Smart routing is only applicable when all conditions below are true:
     * - smart routing is set to true on the engine
     * - current link is between two nodes (not between a node and an empty point)
     * - no custom points exist along the line
     */
    isSmartRoutingApplicable(): boolean;
    render(): JSX.Element;
}
