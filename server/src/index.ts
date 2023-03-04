import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes/allRoutes";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ msg: "Express + TypeScript Server" });
});
app.use("/api", router);
// MONGO SETUP

const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.MONGO_URL);
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Mongo DB Connected`);
  })
  .catch((error: any) => console.log(`${error} did not connect`));

app.listen(port, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
);
