import "dotenv/config";

import app from "./src/app.js";

import { connectRabbit } from "./src/broker/rabbit.js";

import { startListener } from "./src/broker/listener.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectRabbit();

    await startListener();

    app.listen(PORT, () => {
      console.log(`Notification service running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

startServer();
