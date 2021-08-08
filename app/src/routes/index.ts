import express from "express";
import PingController from "../controllers/ping.controller";
import UserRouter from "./user.router";
import jobTitleRouter from "./jobTitle.router";
import profileRouter from "./userprofile.router";
import postRouter from "./post.router";
import loginRouter from "./login.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use("/users", UserRouter);
router.use("/jobtitles", jobTitleRouter);
router.use("/profiles", profileRouter);
router.use("/posts", postRouter);
router.use("/login", loginRouter)


export default router;