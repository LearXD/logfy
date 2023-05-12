"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logfy = void 0;
var chalk = require("chalk");
var date_fns_1 = require("date-fns");
var Logfy = /** @class */ (function () {
    function Logfy(configuration) {
        this.configuration = configuration;
        this.loggers = {};
        if (!(configuration === null || configuration === void 0 ? void 0 : configuration.disableDefaults)) {
            this.registerDefaults();
        }
    }
    Logfy.prototype.registerDefaults = function () {
        this.registerLogger('info', {
            symbol: '!!',
            label: 'INFO',
            prefixBackground: '#0064c2',
            contentBackground: '#3b3b3b'
        });
        this.registerLogger('alert', {
            symbol: '★',
            label: 'ALERT',
            prefixBackground: '#FFA500',
            contentBackground: '#3b3b3b',
        }, ['warn']);
        this.registerLogger('error', {
            symbol: '✗',
            label: 'ERROR',
            prefixBackground: '#FF0000',
            contentBackground: '#3b3b3b',
        }, ['fail']);
        this.registerLogger('debug', {
            symbol: 'ϟ',
            label: 'DEBUG',
            prefixBackground: '#ebeb00',
            contentBackground: '#3b3b3b',
        });
        this.registerLogger('ok', {
            symbol: '✓',
            label: 'SUCCESS',
            prefixBackground: '#00FF00',
            contentBackground: '#3b3b3b',
        }, ['success']);
    };
    Logfy.prototype.getPrefix = function (options) {
        var text = " ".concat(options.symbol, " ").concat(options.label, " ");
        if (this.configuration.showTimestamp) {
            text += "[".concat((0, date_fns_1.format)(Date.now(), 'HH:mm:ss'), "] ");
        }
        if (options.prefixBackground) {
            text = chalk.bgHex(options.prefixBackground)(text);
        }
        return text;
    };
    Logfy.prototype.registerLogger = function (name, data, aliases) {
        var _this = this;
        if (aliases === void 0) { aliases = []; }
        aliases.push(name);
        aliases.forEach(function (logger) {
            // @ts-ignore
            if (_this[logger]) {
                throw new Error('You can\'t register 2 logger with the same name!');
            }
            // @ts-ignore
            _this[logger] = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.customLog.apply(_this, __spreadArray([data], args, false));
            });
        });
    };
    Logfy.prototype.agrsToString = function (args) {
        return args.map(function (value) {
            if (value instanceof Object || value instanceof Array) {
                return JSON.stringify(value);
            }
            return value === null || value === void 0 ? void 0 : value.toString();
        });
    };
    Logfy.prototype.customLog = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var text = "".concat(this.getPrefix(data), " ").concat(this.agrsToString(args), " ");
        if (data.contentBackground) {
            text = chalk.bgHex(data.contentBackground)(text);
        }
        console.log(text + chalk.reset(String.fromCharCode(12288)));
    };
    return Logfy;
}());
exports.Logfy = Logfy;
exports.default = new Logfy({ disableDefaults: false, showTimestamp: true });
