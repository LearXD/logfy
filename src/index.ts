import chalk = require('chalk')

interface LoggerData {
  symbol: string,
  label: string,
  prefixBackground?: string;
  contentBackground?: string;
}

class Logfy {

  public loggers: Record<string, CallableFunction> = {}

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
    const text = ` ${options.symbol} ${options.label} `
    if (options.prefixBackground) {
      return chalk.bgHex(options.prefixBackground)(text)
    }
    return text;
  }

  public registerLogger(name: string, data: LoggerData, aliases: string[] = []) {
    aliases.push(name);

    aliases.forEach((logger: string) => {
      if (this.loggers[logger]) {
        throw new Error('You can\'t register 2 logger with the same name!');
      }
      this.loggers[logger] = ((...args: any) => {
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

Logfy.registerDefaults();

export default {
  ...Logfy.loggers,
  Logfy
};