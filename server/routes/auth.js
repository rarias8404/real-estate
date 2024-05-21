import express from "express";

import * as authController from "../controllers/auth.controller.js";
import { requireSignIn } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", requireSignIn, authController.welcome);
router.post("/pre-register", authController.preRegister);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.put("/update-password", requireSignIn, authController.updatePassword);
router.post("/access-account", authController.accessAccount);
router.get("/refresh-token", authController.refreshToken);
router.get("/current-user", requireSignIn, authController.currentUser);
router.put("/update-profile", requireSignIn, authController.updateProfile);
router.get("/profile/:username", authController.publicProfile);

export default router;
