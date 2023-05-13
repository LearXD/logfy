interface LoggerData {
    symbol: string;
    label: string;
    prefixBackground?: string;
    contentBackground?: string;
}
interface Options {
    disableDefaults?: boolean;
    showTimestamp: boolean;
}
export declare class Logfy {
    configuration: Options;
    loggers: Record<string, CallableFunction>;
    constructor(configuration: Options);
    registerDefaults(): void;
    private getPrefix;
    registerLogger(name: string, data: LoggerData, aliases?: string[]): void;
    private agrsToString;
    private customLog;
}
declare const _default: any;
export default _default;
