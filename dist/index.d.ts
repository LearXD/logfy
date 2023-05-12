interface LoggerData {
    symbol: string;
    label: string;
    prefixBackground?: string;
    contentBackground?: string;
}
declare class Logfy {
    static loggers: Record<string, CallableFunction>;
    static registerDefaults(): void;
    private static getPrefix;
    static registerLogger(name: string, data: LoggerData, aliases?: string[]): void;
    private static agrsToString;
    private static customLog;
}
declare const _default: {
    Logfy: typeof Logfy;
};
export default _default;
