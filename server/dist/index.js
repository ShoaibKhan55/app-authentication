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
const userModel_1 = __importDefault(require("./userModel"));
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.post("/register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email, first_name } = request.body;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = new userModel_1.default({
            first_name,
            email,
            password: hashedPassword,
        });
        const userSaved = yield user.save();
        response.status(201).send({
            message: "User Created Successfully",
            userSaved,
        });
    }
    catch (error) {
        response.status(500).send({
            message: "Password was not hashed successfully",
            error,
        });
    }
}));
app.post("/login", (request, response) => {
    try {
        userModel_1.default.findOne({ email: request.body.email }).then((user) => {
            bcrypt
                .compare(request.body.password, user.password)
                .then((passwordCheck) => {
                if (!passwordCheck) {
                    return response.status(400).send({
                        message: "Passwords does not match",
                    });
                }
                const token = jwt.sign({
                    userId: user._id,
                    userEmail: user.email,
                }, "RANDOM-TOKEN", { expiresIn: "24h" });
                response.status(200).send({
                    message: "Login Successful",
                    email: user.email,
                    token,
                });
                const newToken = token;
                console.log("🚀 ~ file: index.ts:84 ~ response.status ~ token:", newToken);
            })
                .catch((error) => {
                response.status(400).send({
                    message: "Passwords does not match",
                    error,
                });
            });
        });
    }
    catch (e) {
        response.status(404).send({
            message: "Email not found",
            e,
        });
    }
});
const verifyToken = (req, res, next) => {
    const token = req.headers("authorization");
    if (!token) {
        return res.sendStatus(401);
    }
    const verified = jwt.verify(token, "RANDOM-TOKEN");
    req.body.user = verified;
    next();
};
app.get("/protected", verifyToken, (request, response) => {
    response.json({ message: "This is a protected route" });
});
// MONGO SETUP
const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.MONGO_URL);
mongoose.set("strictQuery", true);
mongoose
    .connect(MONGO_URL)
    .then(() => {
    /** running server */
    app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
})
    .catch((error) => console.log(`${error} did not connect`));
