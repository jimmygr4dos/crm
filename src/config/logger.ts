import "winston-daily-rotate-file";

import winston from "winston";

const transport = new winston.transports.DailyRotateFile({
  level: "info",
  filename: "./log/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "2d",
});

export const logger = winston.createLogger({
  transports: [transport],
});
