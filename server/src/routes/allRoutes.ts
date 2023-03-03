import express, {Request, Response } from "express";
export const router = express.Router();
import {
  homeResponse,
  UserRegistration,
  UserLogin,
  getVerifiedToken,
} from '../controllers/handle';

router.route("/").get(homeResponse);
router.route("/register").post(UserRegistration);
router.route("/login").post(UserLogin);
router.route("/protected").get(getVerifiedToken);

