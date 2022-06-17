import express from "express";
import * as authController from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter
  .route('/')
  .post(authController.login);

authRouter
  .route('/register')
  .post(authController.register);

authRouter
  .route('/check-token')
  .get(authMiddleware, authController.isTokenValid);

export default authRouter;
