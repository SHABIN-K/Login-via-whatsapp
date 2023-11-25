const { Client, LocalAuth } = require("whatsapp-web.js");

const initializeClient = () => {
  const client = new Client({ authStrategy: new LocalAuth() });
  return client;
};


const client = initializeClient();

module.exports = {
  getClient: () => client,
  initializeClient: () => client.initialize(),
};
