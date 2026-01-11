/**
 * Simple logger utility with configurable levels.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    silent: 4,
};

export class Logger {
    private level: number;
    private prefix: string;

    constructor(prefix: string, level: LogLevel = 'info') {
        this.prefix = prefix;
        this.level = LOG_LEVELS[level];
    }

    setLevel(level: LogLevel): void {
        this.level = LOG_LEVELS[level];
    }

    private formatMessage(level: string, ...args: unknown[]): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}] [${this.prefix}] ${args.map(a =>
            typeof a === 'object' ? JSON.stringify(a) : String(a)
        ).join(' ')}`;
    }

    debug(...args: unknown[]): void {
        if (this.level <= LOG_LEVELS.debug) {
            console.debug(this.formatMessage('debug', ...args));
        }
    }

    info(...args: unknown[]): void {
        if (this.level <= LOG_LEVELS.info) {
            console.info(this.formatMessage('info', ...args));
        }
    }

    warn(...args: unknown[]): void {
        if (this.level <= LOG_LEVELS.warn) {
            console.warn(this.formatMessage('warn', ...args));
        }
    }

    error(...args: unknown[]): void {
        if (this.level <= LOG_LEVELS.error) {
            console.error(this.formatMessage('error', ...args));
        }
    }
}

// Default logger instance
let defaultLogger = new Logger('polymarket-api');

export function setupLogging(level: LogLevel): void {
    defaultLogger.setLevel(level);
}

export function getLogger(prefix: string, level?: LogLevel): Logger {
    return new Logger(prefix, level);
}
