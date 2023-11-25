/** @format */

import express from "express";

import drinksController from "../../controllers/drinks-controller.js";

import { authenticate, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const drinksRouter = express.Router();

drinksRouter.get(
  "/cocktails/main",
  authenticate,
  drinksController.getMainPageDrinks
);

drinksRouter.get("/popular", authenticate, drinksController.getPopularDrinks);

drinksRouter.get("/search", authenticate, drinksController.getFilteredDrinks);

drinksRouter.post(
  "/own/add",
  upload.single("drinkPhoto"),
  authenticate,
  drinksController.addDrink
);

drinksRouter.delete(
  "/own/remove/:id",
  authenticate,
  drinksController.removeDrink
);

drinksRouter.get("/own", authenticate, drinksController.getUsersDrinks);

drinksRouter.post(
  "/favorite/add",
  authenticate,
  drinksController.addToFavorites
);

drinksRouter.delete(
  "/favorite/remove/:drinkId",
  authenticate,
  drinksController.removeFromFavorites
);

drinksRouter.get("/favorite", authenticate, drinksController.getFavoriteDrinks);

drinksRouter.get("/:id", authenticate, drinksController.getDrinkById);

export default drinksRouter;
