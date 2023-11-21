/** @format */

import express from "express";

import { validateBody } from "../../decorators/index.js";

import {
  userSignupSchema,
  userSigninSchema,
  userUpdateSchema,
} from "../../models/User.js";

import authController from "../../controllers/auth-controller.js";

import { authenticate, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/users/signup",
  upload.single("avatar"),
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/users/login",
  validateBody(userSigninSchema),
  authController.login
);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/logout", authenticate, authController.logout);

authRouter.patch(
  "/users/update",
  authenticate,
  upload.single("avatar"),
  validateBody(userUpdateSchema),
  authController.updateUser
);

authRouter.get(
  "/users/subscribe",
  authenticate,
  authController.sendSubscriptionEmail
);

export default authRouter;
