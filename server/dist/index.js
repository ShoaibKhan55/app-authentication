"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const allRoutes_1 = require("./routes/allRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
dotenv_1.default.config();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ msg: "Express + TypeScript Server" });
}));
app.use("/api", allRoutes_1.router);
// MONGO SETUP
const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.MONGO_URL);
mongoose.set("strictQuery", true);
mongoose
    .connect(MONGO_URL)
    .then(() => {
    console.log(`Mongo DB Connected`);
})
    .catch((error) => console.log(`${error} did not connect`));
app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
