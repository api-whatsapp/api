/* eslint-disable no-console */
import QRCode from "qrcode";

let QRCodeOK;
let QRCodeData;

function makeid(length) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	console.info("QR Code received " + result);

	QRCode.toString(result, { type: "terminal", small: true }, (err, result) => {
		try {
			console.info(result);
			QRCodeOK = true;
		} catch (err) {
			console.error(err);
			QRCodeOK = false;
		}
	});

	QRCodeData = result;
	return result;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

const qrLength = getRandomInt(123);
const qr = makeid(qrLength);

test("QRCode Test Length = ${qrLength}", () => {
	expect(qr).toHaveLength(qrLength);
});

test("QRCode Test Not Null", () => {
	expect(qr).not.toBeNull;
});

test("QRCodeData = QRCode", () => {
	expect(qr).toBe(QRCodeData);
});

test("QRCode Test OK", () => {
	expect(QRCodeOK).toBeTruthy();
});
