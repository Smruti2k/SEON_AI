import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is Required");
  }
  if (!userId) {
    throw new Error("UserId is Required");
  }

  const project = await projectModel.create({
    name,
    user: [userId],
  });
  console.log(project);

  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  const allUserProjects = await projectModel.find({
    user: userId,
  });

  return allUserProjects;
};

export const addUsersToProject = async ({ projectId, user, userId }) => {
  if (!projectId) {
    throw new Error("ProjectId is Required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project Id");
  }
  if (!user) {
    throw new Error("Users are Required");
  }
  if (
    !Array.isArray(user) ||
    user.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid userId(s) in users array");
  }
  if (!userId) {
    throw new Error("userId is Required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User Id");
  }

  const project = await projectModel.findOne({
    _id: projectId,
    user: userId,
  });

  if (!project) {
    throw new Error("User does not belong to this project");
  }

  const updatedProject = await projectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $addToSet: {
        user: {
          $each: user,
        },
      },
    },
    {
      new: true,
    }
  );

  return updatedProject;
};

export const getProjectByProjectIds = async({projectId})=>{
  if(!projectId)
  {
    throw new Error("ProjectId Not found")
  }
  if(!mongoose.Types.ObjectId.isValid(projectId))
  {
    throw new Error("Invalid ProjectId")
  }

  const project = await projectModel.findOne({
    _id:projectId
  }).populate('user')
  return project;
}
