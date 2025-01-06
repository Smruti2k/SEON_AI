import projectModel from "../models/project.model.js";

export const createProject = async ({name,userId}) =>{
    if(!name)
    {
        throw new Error('Name is Required')
    }
    if(!userId)
    {
        throw new Error('UserId is Required')
    }

    const project = await projectModel.create({
        name, user:[userId]
    })
    console.log(project);

    return project;
}

export const getAllProjectByUserId = async({userId}) =>{
    if(!userId)
    {
        throw new Error('UserId is required')
    }

    const allUserProjects = await projectModel.find({
        user: userId
    })

    return allUserProjects;


}


