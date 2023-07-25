/* eslint-disable no-console */
import { web } from "./app/app.js";
import "dotenv/config";

const port = process.env.API_PORT || 3000;

web.listen(port, () => {
	console.info("Listening on port http://127.0.0.1:" + port);
});
