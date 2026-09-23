import "dotenv/config";

import app from "./src/app.js";

import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 5002;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Music service running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting music service:", error);

    process.exit(1);
  }
}

startServer();
