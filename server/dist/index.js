"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("./userModel"));
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
app.post("/register", (request, response) => {
    bcrypt
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
        const user = new userModel_1.default({
            first_name: request.body.first_name,
            email: request.body.email,
            password: hashedPassword,
        });
        user
            .save()
            .then((result) => {
            response.status(201).send({
                message: "User Created Successfully",
                result,
            });
        })
            .catch((error) => {
            response.status(500).send({
                message: "Error creating user",
                error,
            });
        });
    })
        .catch((e) => {
        response.status(500).send({
            message: "Password was not hashed successfully",
            e,
        });
    });
});
app.post("/login", (request, response) => {
    userModel_1.default.findOne({ email: request.body.email })
        .then((user) => {
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
        })
            .catch((error) => {
            response.status(400).send({
                message: "Passwords does not match",
                error,
            });
        });
    })
        .catch((e) => {
        response.status(404).send({
            message: "Email not found",
            e,
        });
    });
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
