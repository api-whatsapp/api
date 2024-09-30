import { DeviceData, DeviceRequest } from "../models/deviceModel";
import { UserData } from "../models/userModel";
import { DeviceService } from "../services/deviceService";

export class DeviceUseCase {
	public async addDevice(
		request: DeviceRequest,
		userData: UserData
	): Promise<DeviceData> {
		const result: DeviceData = await DeviceService.add(request, userData);

		return result;
	}
}
