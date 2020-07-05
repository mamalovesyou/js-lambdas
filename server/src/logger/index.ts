
export enum LogLevels {
    ERROR = "ERROR",
    INFO = "INFO",
    WARN = "WARN",
    DEBUG = "DEBUG"
}

export class Logger {


    moduleName: string;
    constructor(name: string) {
        this.moduleName = name;
    }

    private log(level: LogLevels, message: string) {
        const time = new Date().toJSON().substring(0, 19).replace('T', ' ');
        console.log(`[${level}] ${time} - ${this.moduleName} : ${message}`)
    }

    debug(message: string) {
        this.log(LogLevels.DEBUG, message);
    }

    info(message: string) {
        this.log(LogLevels.INFO, message);
    }

    warn(message: string) {
        this.log(LogLevels.WARN, message);
    }

    error(message: string) {
        this.log(LogLevels.ERROR, message);
    }


}