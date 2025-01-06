import { Router } from "express";
import { body } from "express-validator";
import * as projectContoller from "../contollers/project.controller.js";
import * as authMiddelware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authMiddelware.authUser,
  body("name").isString().withMessage("Name is Required"),
  projectContoller.createProject
);

router.get("/all", authMiddelware.authUser, projectContoller.getAllProject);

export default router;
