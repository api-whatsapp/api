import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, label } = format;

//Using the printf format.
const customFormat = printf(({ level, message, timestamp }) => {
	return `"${timestamp}": {"${level}": "${message}"},`;
});

var todayDate = new Date().toISOString().slice(0, 10);
const infoFile = todayDate + "-info.log";
const errorFile = todayDate + "-error.log";
const queryFile = todayDate + "-query.log";

export const logger = createLogger({
	format: combine(
		label({ label: "right meow!" }),
		timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
		customFormat
	),
	transports: [
		new transports.Console({
			level: "error",
		}),
		new transports.Console({
			level: "info",
		}),
		new transports.File({
			filename: "./logs/" + errorFile,
			level: "error",
		}),
		new transports.File({
			filename: "./logs/" + infoFile,
			level: "info",
		}),
		new transports.File({
			filename: "./logs/" + queryFile,
			level: "verbose",
		}),
	],
});
