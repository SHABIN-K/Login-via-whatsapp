const qrcode = require("qrcode-terminal");

module.exports = {
  connectWeb: (client) => {
    return new Promise((resolve, reject) => {
      client.removeAllListeners();
      client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
      });

      client.on("authenticated", (session) => {
        console.log("WHATSAPP WEB => Authenticated");
        resolve("authenticated");
      });

      client.on("message", (message) => {
        if (message.body === "!ping") {
          message.reply("pong");
        }
      });

      client.initialize();
    });
  },
  getStatus: (client) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("cheking status...");
        await client.on("authenticated", () => {
          console.log("WHATSAPP WEB => Authenticated");
          resolve("authenticated");
        });

        await client.on("auth_failure", () => {
          console.log("WHATSAPP WEB => unauthorized");
          resolve("unauthorized");
        });
      } catch (error) {
        console.error("Error occurred:", error);
        reject(false);
      }
    });
  },
};
