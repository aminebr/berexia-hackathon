import { DiagramEngine } from "../DiagramEngine";
import { BaseAction } from "../actions/BaseAction";
import { BaseModel, BaseModelListener } from "../models/BaseModel";
import { BaseEntity } from "../BaseEntity";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";
export interface DiagramProps extends BaseWidgetProps {
    diagramEngine: DiagramEngine;
    allowLooseLinks?: boolean;
    allowCanvasTranslation?: boolean;
    allowCanvasZoom?: boolean;
    inverseZoom?: boolean;
    maxNumberPointsPerLink?: number;
    smartRouting?: boolean;
    actionStartedFiring?: (action: BaseAction) => boolean;
    actionStillFiring?: (action: BaseAction) => void;
    actionStoppedFiring?: (action: BaseAction) => void;
    deleteKeys?: number[];
}
export interface DiagramState {
    action: BaseAction | null;
    wasMoved: boolean;
    renderedNodes: boolean;
    windowListener: any;
    diagramEngineListener: any;
    document: any;
}
/**
 * @author Dylan Vorster
 */
export declare class DiagramWidget extends BaseWidget<DiagramProps, DiagramState> {
    static defaultProps: DiagramProps;
    onKeyUpPointer: (this: Window, ev: KeyboardEvent) => void;
    constructor(props: DiagramProps);
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: DiagramProps): void;
    componentWillUpdate(nextProps: DiagramProps): void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    /**
     * Gets a model and element under the mouse cursor
     */
    getMouseElement(event: any): {
        model: BaseModel<BaseEntity, BaseModelListener>;
        element: Element;
    };
    fireAction(): void;
    stopFiringAction(shouldSkipEvent?: boolean): void;
    startFiringAction(action: BaseAction): void;
    onMouseMove(event: any): void;
    onKeyUp(event: any): void;
    onMouseUp(event: any): void;
    drawSelectionBox(): JSX.Element;
    render(): JSX.Element;
}
