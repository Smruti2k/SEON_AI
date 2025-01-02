import { Router } from "express";
import * as userController from "../contollers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";


const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid Email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password should have min length 3"),
  userController.createUserController
);

router.post(
    "/login",
    body("email").isEmail().withMessage("Email must be a valid Email address"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password should have min length 3"),
    userController.loginUserController
  );

  // this route is profile route so only the users who are logged in can access this route thus for that we have to make sure the token in there

  router.get('/profile' , authMiddleware.authUser ,  userController.profileController);

  //log out route
  //here on thing to notice is the flow is according to the sequence the functions are written in the routes

  router.get("/logOut" , userController.logoutUserController, authMiddleware.authUser);

  



export default router;
