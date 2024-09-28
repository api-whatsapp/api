import "dotenv/config";
import pino from "pino";

const logLevel: string = process.env.LOG_LEVEL ?? "prod";
const timestamp: string = new Date().toISOString();
const logFolder: string = `./logs/${timestamp.slice(0, 10).replace(/-/g, "")}/${timestamp.slice(0, 10)}`;

const customLevel = {
	query: 25, // Any number between debug (20) and info (30) will work the same
	notice: 35, // Any number between info (30) and warn (40) will work the same
};

const pinoOption = {
	formatters: {
		bindings: (bindings: pino.Bindings) => {
			return {
				pid: bindings.pid,
			};
		},
		level: (label: string, number: number) => {
			return { log: label.toUpperCase(), level: number };
		},
	},
	timestamp: () => {
		return `,"timestamp":"${new Date(Date.now()).toISOString()}"`;
	},
	redact: {
		paths: ["host"],
		censor: "***",
		remove: false,
	},
	customLevels: customLevel,
};

const transport = pino.transport({
	targets: [
		{
			level: logLevel,
			target: "pino/file",
			options: {
				destination: 1,
				colorize: true,
			}, // this writes to STDOUT
		},
		{
			level: logLevel,
			target: "pino/file",
			options: {
				destination: `${logFolder}-${logLevel}.log`,
				mkdir: true,
			},
		},
	],
});

export const logger: Logger = pino(pinoOption, transport);
