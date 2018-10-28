import { DiagramEngine } from "./DiagramEngine";
/**
 * @author Dylan Vorster
 */
export interface BaseEvent<T extends BaseEntity = any> {
    entity: BaseEntity<BaseListener>;
    stopPropagation: () => any;
    firing: boolean;
    id: string;
}
export interface BaseListener<T extends BaseEntity = any> {
    lockChanged?(event: BaseEvent<T> & {
        locked: boolean;
    }): void;
}
export declare type BaseEntityType = "node" | "link" | "port" | "point";
export declare class BaseEntity<T extends BaseListener = BaseListener> {
    listeners: {
        [s: string]: T;
    };
    id: string;
    locked: boolean;
    constructor(id?: string);
    getID(): string;
    doClone(lookupTable: {
        [s: string]: any;
    }, clone: any): void;
    clone(lookupTable?: {
        [s: string]: any;
    }): any;
    clearListeners(): void;
    deSerialize(data: {
        [s: string]: any;
    }, engine: DiagramEngine): void;
    serialize(): {
        id: string;
    };
    iterateListeners(cb: (t: T, event: BaseEvent) => any): void;
    removeListener(listener: string): boolean;
    addListener(listener: T): string;
    isLocked(): boolean;
    setLocked(locked?: boolean): void;
}
