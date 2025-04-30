import * as Sentry from "@sentry/electron";
import chalk from "chalk";
import electronLog from "electron-log";

class Logger {
  log(...args: any) {
    this.print(args);
    Sentry.captureMessage(args);
  }

  info(...args: any) {
    this.print(args);
    Sentry.captureMessage(args);
  }

  warn(...args: any) {
    this.print(args);
    Sentry.captureMessage(args);
  }

  error(...args: any) {
    this.print(args);
  }

  debug(...args: any) {
    this.print(args);
  }

  private print(message: any) {
    console.log(`${chalk.magenta("[leptum-main]")} ${message}`);

    // Print to log file with electron log
    electronLog.transports.console.level = false;
    electronLog.log(`[leptum-main] ${message}`);
  }
}

const log = new Logger();

export default log;
