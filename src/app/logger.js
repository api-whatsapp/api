import "dotenv/config";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

const logsFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp}|[${level.toUpperCase()}]|${message}|`;
});

let todayDate = new Date().toISOString().slice(0, 10);
const appEnv = process.env.APP_ENV || "development";
const appDebug = process.env.APP_DEBUG || "false";

const myTransports = [
	new transports.Console({
		level: "error",
	}),
	new transports.File({
		filename: `./logs/${todayDate}-error.log`,
		level: "error",
	}),
	new transports.File({
		filename: `./logs/${todayDate}-warn.log`,
		level: "warn",
	}),
	new transports.File({
		filename: `./logs/${todayDate}-info.log`,
		level: "info",
	}),
	new transports.File({
		filename: `./logs/${todayDate}-query.log`,
		level: "verbose",
	}),
];

/* istanbul ignore next */
if (appEnv.includes("dev")) {
	myTransports.push(
		new transports.Console({
			level: "info",
		})
	);
}

/* istanbul ignore next */
if (appDebug === "true") {
	myTransports.push(
		new transports.Console({
			level: "verbose",
		})
	);
}

export const logger = createLogger({
	format: combine(
		timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
		logsFormat,
		colorize()
	),
	transports: myTransports,
	rejectionHandlers: [
		new transports.File({ filename: `./logs/${todayDate}-rejections.log` }),
	],
});
