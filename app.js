import express from "express";
import { config } from "dotenv";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import { ErrorHandelers } from "./middleware/err.js";

export const app = express();

//config dotenv
config({
  path: "./database/config.env",
});
//middleware
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("bol jay babba ki");
});

app.use(ErrorHandelers);
