import chalk from 'chalk'

export default class Logfy {

    constructor() {
        this.init();
    }

    init = () => {
        this.registerLogger('info', 
        {
           symbol: 'ℹ',
           label: 'INFO',
           labelBackgroundColor: '#0064c2',
           backgroundColor: '#3b3b3b',
           level: 0
        })

        this.registerLogger('alert', 
        {
           symbol: '⚠',
           label: 'ALERT',
           labelBackgroundColor: '#FFA500',
           backgroundColor: '#3b3b3b',
           level: 0
        }, ['warn'])

        this.registerLogger('error', 
        {
           symbol: '❌',
           label: 'ERROR',
           labelBackgroundColor: '#FF0000',
           backgroundColor: '#3b3b3b',
           level: 0
        }, ['fail'])

        this.registerLogger('debug', 
        {
           symbol: '🐛',
           label: 'DEBUG',
           labelBackgroundColor: '#ebeb00',
           backgroundColor: '#3b3b3b',
           level: 0
        })

        this.registerLogger('ok', 
        {
           symbol: '✅',
           label: 'SUCCESS',
           labelBackgroundColor: '#00FF00',
           backgroundColor: '#3b3b3b',
           level: 0
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
                this.show(this.parseBody(data, `${prefix} ${message} `));
            }
        }

        if(aliases) {
            aliases.forEach((alias) => {
                this[alias] = this[name];
            })
        }
    }
}

export const getDefaultMoment = () => {
    return new Date(Date.now()).toLocaleTimeString();
}
