interface LoggerData {
    symbol: string;
    label: string;
    prefixBackground?: string;
    contentBackground?: string;
}
declare class Logfy {
    loggers: Record<string, CallableFunction>;
    registerDefaults(): void;
    private getPrefix;
    registerLogger(name: string, data: LoggerData, aliases?: string[]): void;
    private agrsToString;
    private customLog;
}
declare const _default: {
    Logfy: typeof Logfy;
};
export default _default;
