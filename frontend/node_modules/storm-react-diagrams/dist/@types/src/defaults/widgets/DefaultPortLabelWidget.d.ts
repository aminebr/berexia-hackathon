import { DefaultPortModel } from "../models/DefaultPortModel";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";
export interface DefaultPortLabelProps extends BaseWidgetProps {
    model: DefaultPortModel;
}
export interface DefaultPortLabelState {
}
/**
 * @author Dylan Vorster
 */
export declare class DefaultPortLabel extends BaseWidget<DefaultPortLabelProps, DefaultPortLabelState> {
    constructor(props: any);
    getClassName(): string;
    render(): JSX.Element;
}
