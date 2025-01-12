import projectModel from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });

    const userId = loggedInUser._id;

    const newProject = await projectService.createProject({ name, userId });

    res.status(201).json(newProject);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const getAllProject = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const allUserProjects = await projectService.getAllProjectByUserId({
      userId: loggedInUser._id,
    });

    return res.status(200).json({ projects: allUserProjects });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, user } = req.body;
    console.log(projectId);

    //this userId is the of the one who is trying to add collaborators into theis project

    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const project = await projectService.addUsersToProject({
      projectId,
      user,
      userId: loggedInUser._id,
    });

    return res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message }); 
  }
};

export const getProjectByProjectId = async (req, res)=>{
  const { projectId }= req.params;
  try{

    const project = await projectService.getProjectByProjectIds({projectId})

    return res.status(200).json({project})

  }catch(err)
  {
    return res.status(400).json({error: err.message})
  }
};
