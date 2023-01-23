import chalk from 'chalk'

export class Logfy {

    public chalk;

    public constructor() {
        
        this.init();
    }

    public init = () => {
        //this.chalk = import('chalk');
        this.registerLogger('teste', 
        {
           symbol: '!!!',
           label: 'TESTE',
           labelBackroudColor: '#FAE',
           level: 0
        })
    }

    public show = (...args: any[]) => {
        console.log(...args)
    }

    public parsePrefix = (data: LoggerData) => {
        console.log(chalk)
        const prefix = `${data.symbol} ${data.label}`
        return (
            data.labelBackroudColor ? 
                chalk.bgHex(data.labelBackroudColor)(prefix) : prefix
        )
    }

    public registerLogger = (name: string, data: LoggerData) => {
        if(this[name]) {
            throw new Error("Function already exists for " + name)
        }

        this[name] = (...args: any[]) => {
            if(args.length) {
                const prefix = this.parsePrefix(data);
                let message = "";
                args.forEach((arg) => {
                    if(typeof arg !== "string") {
                        if(arg.toString) {
                            message += arg.toString();
                        }
                        return;
                    }
                    message += arg;
                })
                this.show(prefix + " " + message);
            }
        }
    }
}


export interface LoggerData {
    level: number,
    symbol: string,
    label: string,
    labelColor?: string,
    labelBackroudColor?: string,
    textColor?: string,
    backgroundColor?: string,
}