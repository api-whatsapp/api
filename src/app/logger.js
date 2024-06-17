import "dotenv/config";
const { combine, timestamp, printf, colorize } = format;
import { createLogger, format, transports } from "winston";

const logsFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp}|[${level.toUpperCase()}]|${message}|`;
});

const logLevel = process.env.LOG_LEVEL;
const todayDate = new Date().toISOString().slice(0, 10);

const myTransports = [
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
if (logLevel === "verbose") {
	myTransports.push(
		new transports.Console({
			level: "verbose",
		})
	);
	/* istanbul ignore next */
} else if (logLevel === "info") {
	myTransports.push(
		new transports.Console({
			level: "info",
		})
	);
	/* istanbul ignore next */
} else if (logLevel === "warn") {
	myTransports.push(
		new transports.Console({
			level: "warn",
		})
	);
	/* istanbul ignore next */
} else {
	myTransports.push(
		new transports.Console({
			level: "error",
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
