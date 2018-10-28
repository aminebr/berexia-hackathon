import { BaseEntity, BaseListener } from "./BaseEntity";
import { DiagramModel } from "./models/DiagramModel";
import { BaseModel, BaseModelListener } from "./models/BaseModel";
import { NodeModel } from "./models/NodeModel";
import { PortModel } from "./models/PortModel";
import { LinkModel } from "./models/LinkModel";
import { AbstractLabelFactory } from "./factories/AbstractLabelFactory";
import { AbstractLinkFactory } from "./factories/AbstractLinkFactory";
import { AbstractNodeFactory } from "./factories/AbstractNodeFactory";
import { AbstractPortFactory } from "./factories/AbstractPortFactory";
import { LabelModel } from "./models/LabelModel";
/**
 * @author Dylan Vorster
 */
export interface DiagramEngineListener extends BaseListener {
    portFactoriesUpdated?(): void;
    nodeFactoriesUpdated?(): void;
    linkFactoriesUpdated?(): void;
    labelFactoriesUpdated?(): void;
    repaintCanvas?(): void;
}
/**
 * Passed as a parameter to the DiagramWidget
 */
export declare class DiagramEngine extends BaseEntity<DiagramEngineListener> {
    nodeFactories: {
        [s: string]: AbstractNodeFactory;
    };
    linkFactories: {
        [s: string]: AbstractLinkFactory;
    };
    portFactories: {
        [s: string]: AbstractPortFactory;
    };
    labelFactories: {
        [s: string]: AbstractLabelFactory;
    };
    diagramModel: DiagramModel;
    canvas: Element;
    paintableWidgets: {};
    linksThatHaveInitiallyRendered: {};
    nodesRendered: boolean;
    maxNumberPointsPerLink: number;
    smartRouting: boolean;
    canvasMatrix: number[][];
    routingMatrix: number[][];
    hAdjustmentFactor: number;
    vAdjustmentFactor: number;
    constructor();
    installDefaultFactories(): void;
    repaintCanvas(): void;
    clearRepaintEntities(): void;
    enableRepaintEntities(entities: BaseModel<BaseEntity, BaseModelListener>[]): void;
    /**
     * Checks to see if a model is locked by running through
     * its parents to see if they are locked first
     */
    isModelLocked(model: BaseEntity<BaseListener>): boolean;
    recalculatePortsVisually(): void;
    canEntityRepaint(baseModel: BaseModel<BaseEntity, BaseModelListener>): boolean;
    setCanvas(canvas: Element | null): void;
    setDiagramModel(model: DiagramModel): void;
    getDiagramModel(): DiagramModel;
    getNodeFactories(): {
        [s: string]: AbstractNodeFactory;
    };
    getLinkFactories(): {
        [s: string]: AbstractLinkFactory;
    };
    getLabelFactories(): {
        [s: string]: AbstractLabelFactory;
    };
    registerLabelFactory(factory: AbstractLabelFactory): void;
    registerPortFactory(factory: AbstractPortFactory): void;
    registerNodeFactory(factory: AbstractNodeFactory): void;
    registerLinkFactory(factory: AbstractLinkFactory): void;
    getPortFactory(type: string): AbstractPortFactory;
    getNodeFactory(type: string): AbstractNodeFactory;
    getLinkFactory(type: string): AbstractLinkFactory;
    getLabelFactory(type: string): AbstractLabelFactory;
    getFactoryForNode(node: NodeModel): AbstractNodeFactory | null;
    getFactoryForLink(link: LinkModel): AbstractLinkFactory | null;
    getFactoryForLabel(label: LabelModel): AbstractLabelFactory | null;
    generateWidgetForLink(link: LinkModel): JSX.Element | null;
    generateWidgetForNode(node: NodeModel): JSX.Element | null;
    getRelativeMousePoint(event: any): {
        x: number;
        y: number;
    };
    getRelativePoint(x: any, y: any): {
        x: number;
        y: number;
    };
    getNodeElement(node: NodeModel): Element;
    getNodePortElement(port: PortModel): any;
    getPortCenter(port: PortModel): {
        x: number;
        y: number;
    };
    /**
     * Calculate rectangular coordinates of the port passed in.
     */
    getPortCoords(port: PortModel): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Determine the width and height of the node passed in.
     * It currently assumes nodes have a rectangular shape, can be overriden for customised shapes.
     */
    getNodeDimensions(node: NodeModel): {
        width: number;
        height: number;
    };
    getMaxNumberPointsPerLink(): number;
    setMaxNumberPointsPerLink(max: number): void;
    isSmartRoutingEnabled(): boolean;
    setSmartRoutingStatus(status: boolean): void;
    /**
     * A representation of the canvas in the following format:
     *
     * +-----------------+
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * +-----------------+
     *
     * In which all walkable points are marked by zeros.
     * It uses @link{#ROUTING_SCALING_FACTOR} to reduce the matrix dimensions and improve performance.
     */
    getCanvasMatrix(): number[][];
    calculateCanvasMatrix(): void;
    /**
     * A representation of the canvas in the following format:
     *
     * +-----------------+
     * | 0 0 1 1 0 0 0 0 |
     * | 0 0 1 1 0 0 1 1 |
     * | 0 0 0 0 0 0 1 1 |
     * | 1 1 0 0 0 0 0 0 |
     * | 1 1 0 0 0 0 0 0 |
     * +-----------------+
     *
     * In which all points blocked by a node (and its ports) are
     * marked as 1; points were there is nothing (ie, free) receive 0.
     */
    getRoutingMatrix(): number[][];
    calculateRoutingMatrix(): void;
    /**
     * The routing matrix does not have negative indexes, but elements could be negatively positioned.
     * We use the functions below to translate back and forth between these coordinates, relying on the
     * calculated values of hAdjustmentFactor and vAdjustmentFactor.
     */
    translateRoutingX(x: number, reverse?: boolean): number;
    translateRoutingY(y: number, reverse?: boolean): number;
    /**
     * Despite being a long method, we simply iterate over all three collections (nodes, ports and points)
     * to find the highest X and Y dimensions, so we can build the matrix large enough to contain all elements.
     */
    calculateMatrixDimensions: () => {
        width: number;
        hAdjustmentFactor: number;
        height: number;
        vAdjustmentFactor: number;
    };
    /**
     * Updates (by reference) where nodes will be drawn on the matrix passed in.
     */
    markNodes: (matrix: number[][]) => void;
    /**
     * Updates (by reference) where ports will be drawn on the matrix passed in.
     */
    markPorts: (matrix: number[][]) => void;
    markMatrixPoint: (matrix: number[][], x: number, y: number) => void;
    zoomToFit(): void;
}
