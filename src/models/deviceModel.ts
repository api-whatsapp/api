import { Device } from "@prisma/client";
import { logger } from "../config/logger";

export type DeviceRequest = {
	device_id: string;
};

export type DeviceList = {
	data: DeviceData[];
	meta: {
		last_key: string;
	};
};

export type DeviceData = {
	id: string;
	status: string;
	created_at: Date;
	phone_number?: string | null;
	connected_at?: Date | null;
	disconnected_at?: Date | null;
	disconnected_reason?: string | null;
};

export function toDeviceResponse(device: Device): DeviceData {
	return {
		id: device.device_id,
		status: device.status,
		created_at: device.created_at,
		phone_number: device.phone_number,
		connected_at: device.connected_at,
		disconnected_at: device.disconnected_at,
		disconnected_reason: device.disconnected_reason,
	};
}

export function addDeviceResponse(device: Device): DeviceData {
	return {
		id: device.device_id,
		status: device.status,
		created_at: device.created_at,
	};
}

export function deviceListResponse(devices: Device[]): DeviceList {
	const deviceList: DeviceData[] = [];

	for (const device of devices) {
		deviceList.push(toDeviceResponse(device));
		logger.warn(JSON.stringify(toDeviceResponse(device)));
	}

	logger.warn(JSON.stringify(deviceList));

	return {
		data: deviceList,
		meta: {
			last_key: devices.at(-1)!.device_id,
		},
	};
}
