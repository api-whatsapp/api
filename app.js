import QRCode from "qrcode";
import { Client } from "whatsapp-web.js";

const client = new Client();

client.on("qr", (qr) => {
  QRCode.toString(qr, { type: "terminal", small: true }, (err, qr) => {
    try {
      console.info("QR Code received");
      console.info(qr);
    } catch (err) {
      console.error(err);
    }
  });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();
