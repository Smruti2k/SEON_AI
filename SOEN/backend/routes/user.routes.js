import { Router } from "express";
import * as userController from "../contollers/user.controller.js";
import { body } from "express-validator";

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid Email address'),
    body('password').isLength({min:3}).withMessage('Password should have min length 3'),
    userController.createUserController);

