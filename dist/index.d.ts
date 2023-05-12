interface LoggerData {
    symbol: string;
    label: string;
    prefixBackground?: string;
    contentBackground?: string;
}
interface Options {
    disableDefaults?: boolean;
}
export declare class Logfy {
    options?: Options | undefined;
    loggers: Record<string, CallableFunction>;
    constructor(options?: Options | undefined);
    registerDefaults(): void;
    private getPrefix;
    registerLogger(name: string, data: LoggerData, aliases?: string[]): void;
    private agrsToString;
    private customLog;
}
declare const _default: Logfy;
export default _default;
