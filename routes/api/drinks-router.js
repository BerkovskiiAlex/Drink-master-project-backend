/** @format */

import express from "express";

import drinksController from "../../controllers/drinks-controller.js";

import { authenticate } from "../../middlewares/index.js";

const drinksRouter = express.Router();

drinksRouter.get("/mainpage", authenticate, drinksController.getMainPageDrinks);

export default drinksRouter;
