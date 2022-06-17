import express from "express";

import authRouter from "./authRouter";

const router: express.Router = express.Router();

router.use("/login", authRouter);

export default router;