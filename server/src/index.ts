import express, { Express, Request, Response } from "express";
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
import dotenv from "dotenv";
import Users from "./userModel";
const bcrypt = require('bcryptjs');

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword: any) => {
      const user = new Users({
        first_name: request.body.first_name,
        email: request.body.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result: any) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error: any) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e: any) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/login", (request, response) => {
  Users.findOne({ email: request.body.email })

    .then((user: any) => {
      bcrypt
        .compare(request.body.password, user.password)

        .then((passwordCheck: any) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((error: any) => {
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
    app.listen(port, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    );
  })
  .catch((error: any) => console.log(`${error} did not connect`));
