import winston from "winston";

export const logger = winston.createLogger({
	level: "verbose",
	format: winston.format.combine(
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console({
			level: "error",
		}),
		new winston.transports.File({
			filename: "./logs/error.log",
			level: "error",
		}),
		new winston.transports.File({
			filename: "./logs/info.log",
			level: "info",
		}),
		new winston.transports.File({
			filename: "./logs/query.log",
			level: "verbose",
		}),
	],
});
