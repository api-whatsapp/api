/* eslint-disable no-console */
import "dotenv/config";

const getQRCode = async (req, res) => {
	const device_id = req.query.device_id;

	try {
		res.status(200).json({ message: `Hello ${device_id} public api` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

export default getQRCode;
//
