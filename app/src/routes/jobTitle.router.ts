import express from "express";
import JobTitleController from "../controllers/jobTitle.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
    
    const controller = new JobTitleController();
    const response = await controller.getJobTitles();
    return res.send(response);
});

router.post("/", async (req, res) => {
    const controller = new JobTitleController();
    const response = await controller.createJobTitle(req.body);
    return res.send(response);
});

router.get("/:id", async (req, res) => {
    const controller = new JobTitleController();
    const response = await controller.getJobTitle(req.params.id);
    if(!response) res.status(404).send({ message: "No job title found" });
    return res.send(response);
});

export default router;