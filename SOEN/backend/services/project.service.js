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
        name,users:[userId]
    })

    return project;
}


