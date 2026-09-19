import express from "express";
import authRoutes from "./Routes/Auth.routes.js";
import passport from "./config/passport.js";


const app = express();


app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);


export default app;
