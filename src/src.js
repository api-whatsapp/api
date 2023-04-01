const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
  },
  authStrategy: new LocalAuth()
});

client.on("authenticated", () => {
  console.log("Authenticated");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body.toLowerCase().includes("hi")) {
    message.reply("Hallo...");
  } else if (message.body.toLowerCase().includes("hallo")) {
    message.reply("Hai...");
  }
});

client.on("disconnected", (reason) => {
  console.log("Disconnected because:", reason);
  client.destroy();
  client.initialize();
});
client.initialize();
