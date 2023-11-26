/** @format */

import express from "express";

import applicationController from "../../controllers/application-controller.js";

const applicationRouter = express.Router();

applicationRouter.get("/application", applicationController.startApi);

export default applicationRouter;
