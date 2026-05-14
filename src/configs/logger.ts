import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const options: pino.LoggerOptions = {
  level: isProduction ? "info" : "debug",
};

if (!isProduction) {
  options.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  };
}

export const logger = pino(options);
