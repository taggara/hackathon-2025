import { LogLevel } from "@azure/msal-browser";

export class AuthLogger {
  static logLevels = {
    Error: 0,
    Warning: 1,
    Info: 2,
    Verbose: 3,
    Debug: 4
  };

  static logMessages: string[] = [];

  static log(level: LogLevel, message: string, containsPii: boolean = false) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${LogLevel[level]}: ${message}`;
    
    this.logMessages.push(logMessage);
    
    if (!containsPii) {
      switch (level) {
        case LogLevel.Error:
          console.error(logMessage);
          break;
        case LogLevel.Warning:
          console.warn(logMessage);
          break;
        case LogLevel.Info:
          console.info(logMessage);
          break;
        case LogLevel.Verbose:
        case LogLevel.Debug:
          console.debug(logMessage);
          break;
      }
    }
  }

  static getLogs(): string[] {
    return this.logMessages;
  }

  static clearLogs(): void {
    this.logMessages = [];
  }
}