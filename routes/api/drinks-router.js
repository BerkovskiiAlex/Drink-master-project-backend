/** @format */

import express from "express";

import drinksController from "../../controllers/drinks-controller.js";

import { authenticate } from "../../middlewares/index.js";

const drinksRouter = express.Router();

drinksRouter.get("/mainpage", authenticate, drinksController.getMainPageDrinks);

drinksRouter.get("/popular", authenticate, drinksController.getPopularDrinks);

drinksRouter.get("/search", authenticate, drinksController.getFilteredDrinks);

drinksRouter.post(
  "/favorite/add",
  authenticate,
  drinksController.addToFavorites
);

drinksRouter.delete(
  "/favorite/remove",
  authenticate,
  drinksController.removeFromFavorites
);

drinksRouter.get("/favorite", authenticate, drinksController.getFavoriteDrinks);

drinksRouter.get("/:id", drinksController.getDrinkById);

export default drinksRouter;
