import "dotenv/config";

import connectDB from "./src/Db/Db.js";

import app from "./src/app.js";

import { connectRabbit } from "./src/broker/rabbit.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await connectRabbit();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();
