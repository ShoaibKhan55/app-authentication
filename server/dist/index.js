"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.post("/register", (request, response) => {
    bcrypt_1.default
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
        const user = new Users({
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
    Users.findOne({ email: request.body.email })
        .then((user) => {
        bcrypt_1.default
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
