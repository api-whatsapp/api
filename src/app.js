import "dotenv/config";
import { app } from "./app/api.js";
import { logger } from "./app/logger.js";

const port = process.env.API_PORT || 3000;
global.host = process.env.API_HOST || "https://pakaiwa.my.id";

app.listen(port, () => {
	logger.info(`App run on port ${port}`);
});
