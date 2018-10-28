import { DefaultLabelModel } from "../models/DefaultLabelModel";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";
export interface DefaultLabelWidgetProps extends BaseWidgetProps {
    model: DefaultLabelModel;
}
export declare class DefaultLabelWidget extends BaseWidget<DefaultLabelWidgetProps> {
    constructor(props: any);
    render(): JSX.Element;
}
