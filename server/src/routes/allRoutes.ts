import express, { Request, Response } from "express";
export const router = express.Router();
import {
  UserRegistration,
  UserLogin,
  getVerifiedToken,
} from "../controllers/handle";

router.post("/register", UserRegistration);
router.post("/login", UserLogin);
router.get("/protected", getVerifiedToken);
