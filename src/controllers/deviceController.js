import { logger } from "../app/logger.js";
import { prismaClient } from "../app/database.js";

const addDevice = async (req, res) => {
	const device_id = req.body.device_id;

	if (!device_id) {
		return res.status(400).json({
			success: false,
			message: "Missing device_id",
		});
	}

	const device_id_exists = await prismaClient.device.findFirst({
		where: {
			device_id: device_id,
			User: {
				token: global.token,
			},
		},
		select: {
			device_id: true,
		},
	});

	if (device_id_exists) {
		res.status(400).json({
			message: "Error: Device id already exists, choose another one.",
		});
	} else {
		const user = await prismaClient.user.findFirst({
			where: {
				token: global.token,
			},
			select: {
				email: true,
			},
		});
		if (user) {
			try {
				const device = await prismaClient.device.create({
					data: {
						device_id: device_id,
						userEmail: user.email,
					},
					select: {
						device_id: true,
						status: true,
						created_at: true,
					},
				});
				res.status(201).json({
					id: device.device_id,
					status: device.status,
					created_at: device.created_at,
					meta: {
						location: `${global.host}/v1/devices/${device.device_id}`,
					},
				});
			} catch (error) {
				res.status(500).json({ message: "Error: Internal server error" });
				logger.error(error);
			}
		} else {
			res.status(403).json({
				message: "Invalid API token.",
			});
		}
	}
};

export { addDevice };
