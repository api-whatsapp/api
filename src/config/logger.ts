import pino from "pino";

const timestamp: string = new Date().toISOString();
const logFolder: string = `./logs/${timestamp.slice(0, 10).replace(/-/g, "")}/${timestamp.slice(0, 10)}`;

const customLevel = {
	query: 25,
};

const pinoOption = {
	formatters: {
		bindings: (bindings: pino.Bindings) => {
			return {
				pid: bindings.pid,
				host: bindings.hostname,
				node_version: process.version,
			};
		},
		// level: (level: string) => {
		// 	return { level: level.toUpperCase() };
		// },
	},
	timestamp: () => `,"timestamp":"${timestamp}"`,
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
			level: "warn",
			target: "pino/file",
			options: {
				destination: 1,
				colorize: true,
			}, // this writes to STDOUT
		},
		{
			level: "debug",
			target: "pino/file",
			options: {
				destination: `${logFolder}-query.log`,
				mkdir: true,
			},
		},
		{
			level: "info",
			target: "pino/file",
			options: {
				destination: `${logFolder}-info.log`,
				mkdir: true,
			},
		},
		{
			level: "warn",
			target: "pino/file",
			options: {
				destination: `${logFolder}-warn.log`,
				mkdir: true,
			},
		},
		{
			level: "error",
			target: "pino/file",
			options: {
				destination: `${logFolder}-error.log`,
				mkdir: true,
			},
		},
	],
});

export const logger = pino(pinoOption, transport);
