import express from "express";
import {registerController, loginController,getUserController } from "../controllers/user.controller.js";

//router object
const router = express.Router();

//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// get all user
router.get("/get-user", getUserController)


export default router;