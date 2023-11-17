/** @format */

import express from "express";

import drinksController from "../../controllers/drinks-controller.js";

import { authenticate } from "../../middlewares/index.js";

const drinksRouter = express.Router();

drinksRouter.get("/mainpage", authenticate, drinksController.getMainPageDrinks);

drinksRouter.post(
  "/popular/own/add",
  authenticate,
  drinksController.addToFavorites
);

drinksRouter.delete(
  "/popular/own/remove",
  authenticate,
  drinksController.removeFromFavorites
);

drinksRouter.get("/popular", authenticate, drinksController.getPopularDrinks);

export default drinksRouter;
