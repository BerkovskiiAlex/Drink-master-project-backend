/** @format */

import express from "express";

import policyPublicCotroller from "../../controllers/policy-public-controller.js";

const policyPublicRouter = express.Router();

policyPublicRouter.get("/policy", policyPublicCotroller.getPolicy);
policyPublicRouter.get("/public", policyPublicCotroller.getPublicOffering);

export default policyPublicRouter;
