import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true,
        minLength: [6,'Email must be 6 charecter long'],
        maxLength: [50,'Email must not be over 50 charecter']
    },

    password :{
        type: String,
        select : false,
    }
})

//method to accept only password and return the hashed password

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

// Purpose: This is used to verify whether the provided plain-text password matches the hashed password stored in the database.
// Why it's needed: When a user attempts to log in, their plain-text password must be validated against the stored hashed password.
// How it works:
// bcrypt.compare() compares the plain-text password with the hashed password (this.password, referring to the current document's password field).
// If they match, it returns true; otherwise, it returns false.

userSchema.methods.isValidPassword = async function (password){

    // console.log(password,this.password);

    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWT = function (){
    return jwt.sign({email: this.email},process.env.JWT_SECRET,{expiresIn: '24h'});
}


const User = mongoose.model('user', userSchema);

export default User;