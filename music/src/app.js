import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import musicRoutes from "./routes/music.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(
  "/api/music",

  musicRoutes,
);

export default app;
