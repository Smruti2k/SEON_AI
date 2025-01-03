import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [true, 'Project Name must be Unique'],
    },

    user : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ]
})

//here we are converting the schema to a model

const Project = mongoose.model('project',projectSchema)

export default Project;