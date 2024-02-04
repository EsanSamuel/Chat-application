import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import connectDB from "./libs/connect.js";
import dotenv from "dotenv";
import auth from "./routes/auth.router.js";
import message from "./routes/message.router.js";
import user from "./routes/user.router.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5000;
const server = http.createServer(app);
app.use("/api", auth);
app.use("/api", user);
app.use("/api", message);

app.get("/", (req, res) => {
  res.send("Hello to the chat app server!");
});

const startServer = () => {
  connectDB();
  server.listen(PORT, () => console.log(`server is running at port ${PORT}`));
};

startServer();
