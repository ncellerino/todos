import winston, { createLogger, transports } from "winston";
import appRoot from "app-root-path";

const LOG_FILE_PATH = `${appRoot}/logs/app.log`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

const options = {
  file: {
    level: "info",
    filename: LOG_FILE_PATH,
    handleExceptions: true,
    json: true,
    maxsize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
    colorize: false
  },

  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

//custom levels
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    debug: "blue",
    info: "green",
    warn: "yellow",
    error: "red"
  }
};

winston.addColors(customLevels.colors);

// instantiate a new Winston Logger with the settings defined above
export let logger: winston.Logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});
