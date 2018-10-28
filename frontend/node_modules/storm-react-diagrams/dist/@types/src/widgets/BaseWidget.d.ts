/// <reference types="react" />
import * as React from "react";
export interface BaseWidgetProps {
    /**
     * Override the base class name
     */
    baseClass?: string;
    /**
     * append additional classes
     */
    className?: string;
    /**
     * Additional props to add
     */
    extraProps?: any;
}
export declare class BaseWidget<P extends BaseWidgetProps = BaseWidgetProps, S = any> extends React.Component<P, S> {
    className: string;
    constructor(name: string, props: P);
    bem(selector: string): string;
    getClassName(): string;
    getProps(): any;
}
