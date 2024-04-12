import express from "express";

import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", authController.welcome);

router.post("/pre-register", authController.preRegister);

router.post("/register", authController.register);

router.post("/login", authController.login);

export default router;
