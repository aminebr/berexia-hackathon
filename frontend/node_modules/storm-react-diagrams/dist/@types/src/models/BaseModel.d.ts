import { BaseEntity, BaseListener } from "../BaseEntity";
import { BaseEvent } from "../BaseEntity";
import { DiagramEngine } from "../DiagramEngine";
export interface BaseModelListener extends BaseListener {
    selectionChanged?(event: BaseEvent<BaseModel> & {
        isSelected: boolean;
    }): void;
    entityRemoved?(event: BaseEvent<BaseModel>): void;
}
/**
 * @author Dylan Vorster
 */
export declare class BaseModel<X extends BaseEntity = BaseEntity, T extends BaseModelListener = BaseModelListener> extends BaseEntity<T> {
    type: string;
    selected: boolean;
    parent: X;
    constructor(type?: string, id?: string);
    getParent(): X;
    setParent(parent: X): void;
    getSelectedEntities(): BaseModel<any, T>[];
    deSerialize(ob: any, engine: DiagramEngine): void;
    serialize(): {
        id: string;
    } & {
        type: string;
        selected: boolean;
    };
    getType(): string;
    getID(): string;
    isSelected(): boolean;
    setSelected(selected?: boolean): void;
    remove(): void;
}
