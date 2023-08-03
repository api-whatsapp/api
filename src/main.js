import "dotenv/config";
import { api } from "./app/api.js";
import { logger } from "./app/logger.js";

const port = process.env.API_PORT || 3000;
global.host = process.env.API_HOST || "https://pakaiwa.my.id";

api.listen(port, () => {
	logger.info("Listening on port http://127.0.0.1:" + port + "\n");
});
