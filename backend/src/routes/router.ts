import express from "express";

import authRouter from "./authRouter";
import infoRouter from "./infoRouter";

const router: express.Router = express.Router();
//роутер
router.use("/auth", authRouter);
router.use("/info", infoRouter);

export default router;