import express from "express";
import * as infoController from "../controllers/infoController";

//роутер нашего приложения
const infoRouter = express.Router();

infoRouter
  .route('/update-info/:user_id')
  .post(infoController.updateInfo);

infoRouter
  .route('/delete-account/:user_id')
  .post(infoController.deleteAcc);

export default infoRouter;
