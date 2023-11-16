/** @format */

/** @format */
/** @format */

import express from "express";

import { validateBody } from "../../decorators/index.js";

import {} from "../../models/Ingredient.js";

import ingredientController from "../../controllers/ingredients-controller.js";

import { authenticate } from "../../middlewares/index.js";

const ingredientRouter = express.Router();

ingredientRouter.get("/ingredients", authenticate, ingredientController.getAll);

export default ingredientRouter;
