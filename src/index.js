import chalk from 'chalk'

export const LogLevel = {
    INFO: 0,
    ALERT: 1,
    ERROR: 2,
    DEBUG: 3,
    OK: 4,
    ALL: 5
}

export const DEFAULT_LOG_LEVEL = LogLevel.INFO;
export const HIGH_LOG_LEVEL = LogLevel.ALL;
export class Logfy {

    loggerFunctions = {};

    constructor(options) {
        this.logLevel = options?.logLevel || DEFAULT_LOG_LEVEL;
        this.init();
    }

    init = () => {
        this.registerLogger('info', 
        {
           symbol: '‼',
           label: 'INFO',
           labelBackgroundColor: '#0064c2',
           backgroundColor: '#3b3b3b',
           level: LogLevel.INFO
        })

        this.registerLogger('alert', 
        {
           symbol: '★',
           label: 'ALERT',
           labelBackgroundColor: '#FFA500',
           backgroundColor: '#3b3b3b',
           level: LogLevel.ALERT
        }, ['warn'])

        this.registerLogger('error', 
        {
           symbol: '✗',
           label: 'ERROR',
           labelBackgroundColor: '#FF0000',
           backgroundColor: '#3b3b3b',
           level: LogLevel.ERROR
        }, ['fail'])

        this.registerLogger('debug', 
        {
           symbol: 'ϟ',
           label: 'DEBUG',
           labelBackgroundColor: '#ebeb00',
           backgroundColor: '#3b3b3b',
           level: LogLevel.DEBUG
        })

        this.registerLogger('ok', 
        {
           symbol: '✓',
           label: 'SUCCESS',
           labelBackgroundColor: '#00FF00',
           backgroundColor: '#3b3b3b',
           level: LogLevel.OK
        }, ['success'])
    }

    show = (...args) => {
        console.log(...args)
    }

    parsePrefix = (data) => {
        const prefix = ` ${data.symbol} ${data.label} [${getDefaultMoment()}] `
        return (
            data.labelBackgroundColor ? 
                chalk.bold.bgHex(data.labelBackgroundColor)(prefix) : chalk.bold(prefix)
        )
    }

    parseBody = (data, message) => {
        return (
            data.backgroundColor ?
                chalk.bgHex(data.backgroundColor)(message) : message
        )
    }


    registerLogger = (name, data, aliases) => {
        if(this[name]) {
            throw new Error("Function already exists for " + name)
        }

        
        this[name] = (...args) => {

            if(this.logLevel < data.level) {
                return;
            } 

            if(args.length) {
                const prefix = this.parsePrefix(data);
                let message = "";
                args.forEach((arg) => {
                    message += toString(arg);
                })
                this.show(this.parseBody(data, `${prefix} ${message} `));
            }
        }
        this.loggerFunctions[name] = this[name];

        if(aliases) {
            aliases.forEach((alias) => {
                this[alias] = this[name];
                this.loggerFunctions[alias] = this[name];
            })
        }
    }
}

export const toString = (obj) => {
    if(typeof obj === "string") {
        return obj;
    }
    if(typeof obj !== "object" && obj.toString) {
        return obj.toString();
    }
    
    return JSON.stringify(obj);
}

export const getDefaultMoment = () => {
    return new Date(Date.now()).toLocaleTimeString();
}

const logger = new Logfy({logLevel: HIGH_LOG_LEVEL});
export default {
    ...logger.loggerFunctions,
    println (){
        console.log("\n")
    }
};