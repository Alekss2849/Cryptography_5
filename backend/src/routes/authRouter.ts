import express from "express";
import * as authController from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";

//роутер нашего приложения
const authRouter = express.Router();

//когда в строке запроса будет СерверURL+/auth/login то будет вызвана функция логина
authRouter
  .route('/login')
  .post(authController.login);

authRouter
  .route('/register')
  .post(authController.register);

//когда в строке запроса будет СерверURL+/auth/login то будет вызвана функция проверки токена, а если все ок, то после нее функция обновления токена
authRouter
  .route('/check-token')
  .get(authMiddleware, authController.refreshToken);

export default authRouter;
