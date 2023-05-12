import chalk = require('chalk');
import { format } from 'date-fns';


interface LoggerData {
  symbol: string,
  label: string,
  prefixBackground?: string;
  contentBackground?: string;
}

interface Options {
  disableDefaults?: boolean;
  showTimestamp: boolean;
}

export class Logfy {

  public loggers: Record<string, CallableFunction> = {}

  public constructor(public configuration: Options) {
    if (!configuration?.disableDefaults) {
      this.registerDefaults();
    }
  }

  public registerDefaults() {
    this.registerLogger('info', {
      symbol: '!!',
      label: 'INFO',
      prefixBackground: '#0064c2',
      contentBackground: '#3b3b3b'
    })

    this.registerLogger('alert', {
      symbol: '★',
      label: 'ALERT',
      prefixBackground: '#FFA500',
      contentBackground: '#3b3b3b',
    }, ['warn'])

    this.registerLogger('error', {
      symbol: '✗',
      label: 'ERROR',
      prefixBackground: '#FF0000',
      contentBackground: '#3b3b3b',
    }, ['fail'])

    this.registerLogger('debug',
      {
        symbol: 'ϟ',
        label: 'DEBUG',
        prefixBackground: '#ebeb00',
        contentBackground: '#3b3b3b',
      })

    this.registerLogger('ok',
      {
        symbol: '✓',
        label: 'SUCCESS',
        prefixBackground: '#00FF00',
        contentBackground: '#3b3b3b',
      }, ['success'])
  }

  private getPrefix(options: LoggerData) {
    let text = ` ${options.symbol} ${options.label} `

    if (this.configuration.showTimestamp) {
      text += `[${format(Date.now(), 'HH:mm:ss')}] `;
    }

    if (options.prefixBackground) {
      text = chalk.bgHex(options.prefixBackground)(text)
    }

    return text;
  }

  public registerLogger(name: string, data: LoggerData, aliases: string[] = []) {
    aliases.push(name);
    aliases.forEach((logger: string) => {
      // @ts-ignore
      if (this[logger]) {
        throw new Error('You can\'t register 2 logger with the same name!');
      }

      // @ts-ignore
      this[logger] = ((...args: any) => {
        this.customLog(data, ...args);
      })
    })

  }

  private agrsToString(args: any[]) {
    return args.map((value: any) => {
      if (value instanceof Object || value instanceof Array) {
        return JSON.stringify(value);
      }
      return value?.toString();
    })
  }

  private customLog(data: LoggerData, ...args: any) {
    let text = `${this.getPrefix(data)} ${this.agrsToString(args)} `
    if (data.contentBackground) {
      text = chalk.bgHex(data.contentBackground)(text)
    }
    console.log(text + chalk.reset(String.fromCharCode(12288)))
  }
}

export default new Logfy({ disableDefaults: false, showTimestamp: true });