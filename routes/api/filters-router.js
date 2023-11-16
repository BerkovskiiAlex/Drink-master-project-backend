/** @format */

import express from "express";

import ingredientController from "../../controllers/ingredients-controller.js";
import categoriesController from "../../controllers/categories-controller.js";
import glassesController from "../../controllers/glasses-controller.js";

import { authenticate } from "../../middlewares/index.js";

const filtersRouter = express.Router();

filtersRouter.get("/ingredients", authenticate, ingredientController.getAll);

filtersRouter.get("/categories", authenticate, categoriesController.getAll);

filtersRouter.get("/glasses", authenticate, glassesController.getAll);

export default filtersRouter;
