import express from "express";
import * as infoController from "../controllers/infoController";
import {authMiddleware} from "../middlewares/authMiddleware";

//роутер нашего приложения
const infoRouter = express.Router();

infoRouter
  .route('/get-info/:user_id')
  .get(authMiddleware, infoController.getInfo);

infoRouter
  .route('/update-info/:user_id')
  .put(authMiddleware, infoController.updateInfo);

infoRouter
  .route('/delete-account/:user_id')
  .post(authMiddleware, infoController.deleteAcc);

export default infoRouter;
