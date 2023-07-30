/* eslint-disable no-console */
import { api } from "./app/api.js";
import "dotenv/config";

const port = process.env.API_PORT || 3000;

api.listen(port, () => {
	console.info("Listening on port http://127.0.0.1:" + port + "\n");
});
