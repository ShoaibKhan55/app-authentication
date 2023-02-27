import express, { Express, Request, Response } from "express";
const router = express.Router();
const {
  homeResponse,
  UserRegistration,
  UserLogin,
  getVerifiedToken,
} = require("../controllers/handle");

router.route("/").get(homeResponse);
router.route("/register").post(UserRegistration);
router.route("/login").post(UserLogin);
router.route("/protected").get(getVerifiedToken);

module.exports = router;
