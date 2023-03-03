import express, { Request, Response } from "express";
import Users from "../userModel";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




export const UserRegistration = async (req: Request, res: Response) => {
  console.log(req.body, "req");

  try {
    const { password, email, first_name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      first_name,
      email,
      password: hashedPassword,
    });
    const userSaved = await user.save();
    res.status(201).send({
      message: "User Created Successfully",
      userSaved,
    });
  } catch (error: any) {
    res.status(500).send({
      message: "Password was not hashed successfully",
      error,
    });
  }
};

export const UserLogin = async (req: Request, res: Response) => {
  try {
    Users.findOne({
      email: req.body.email,
    }).then((user: any) => {
      bcrypt
        .compare(req.body.password, user.password)

        .then((passwordCheck: any) => {
          if (!passwordCheck) {
            return res.status(400).send({
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

          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
          const newToken = token;
          console.log(
            "🚀 ~ file: index.ts:84 ~ response.status ~ token:",
            newToken
          );
        })
        .catch((error: any) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    });
  } catch (e: any) {
    res.status(404).send({
      message: "Email not found",
      e,
    });
  }
};

export const getVerifiedToken = (req: any, res: any, next: any) => {
  try {
    const token = req.get("authorization");
    if (!token) {
      return res.sendStatus(401);
    }

    const verified = jwt.verify(token, "RANDOM-TOKEN");
    req.body.user = verified;
    res.json({ msg: "verifiedToken" });
    next();
  } catch (error) {
    res.status(400).send({
      massage: "not verified",
      error,
    });
  }
};
