import express from "express";
import { config } from "dotenv";
import router from "./routes/user.js";
import cookieParser from "cookie-parser";

export const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/", router);

//config dotenv
config({
  path: "./database/config.env",
});

app.get("/", (req, res) => {
  res.send("bol jay babba ki");
});
