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

router.put('/add-user',
  authMiddelware.authUser,
  body('projectId').isString().withMessage('Project ID is required'),
  body('user').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
      .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
      projectContoller.addUserToProject
);

router.get("/getProject/:projectId",authMiddelware.authUser,projectContoller.getProjectByProjectId)

export default router;
