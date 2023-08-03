import "dotenv/config";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, label } = format;

//Using the printf format.
const logsFormat = printf(({ level, message, timestamp }) => {
	return `"${timestamp}": {"${level}": "${message}"},`;
});

var todayDate = new Date().toISOString().slice(0, 10);
const infoFile = todayDate + "-info.log";
const errorFile = todayDate + "-error.log";
const queryFile = todayDate + "-query.log";
const appEnv = process.env.APP_ENV || "development";

const myTransports = [
	new transports.Console({
		level: "error",
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
];

if (appEnv === "development" || appEnv === "dev" || appEnv === "test") {
	myTransports.push(
		new transports.Console({
			level: "info",
		})
	);
}

export const logger = createLogger({
	format: combine(timestamp({ format: "YYYY-MM DD_HH:mm:ss.SSS" }), logsFormat),
	transports: myTransports,
});
