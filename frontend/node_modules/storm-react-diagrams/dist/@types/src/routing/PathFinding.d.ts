import { DiagramEngine } from "../main";
export declare const ROUTING_SCALING_FACTOR = 5;
export default class PathFinding {
    instance: any;
    diagramEngine: DiagramEngine;
    constructor(diagramEngine: DiagramEngine);
    /**
     * Taking as argument a fully unblocked walking matrix, this method
     * finds a direct path from point A to B.
     */
    calculateDirectPath(from: {
        x: number;
        y: number;
    }, to: {
        x: number;
        y: number;
    }): number[][];
    /**
     * Using @link{#calculateDirectPath}'s result as input, we here
     * determine the first walkable point found in the matrix that includes
     * blocked paths.
     */
    calculateLinkStartEndCoords(matrix: number[][], path: number[][]): {
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
        pathToStart: number[][];
        pathToEnd: number[][];
    };
    /**
     * Puts everything together: merges the paths from/to the centre of the ports,
     * with the path calculated around other elements.
     */
    calculateDynamicPath(routingMatrix: number[][], start: {
        x: number;
        y: number;
    }, end: {
        x: number;
        y: number;
    }, pathToStart: number[][], pathToEnd: number[][]): any;
}
