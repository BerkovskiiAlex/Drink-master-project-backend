/** @format */

import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import Drink from "../models/Drink.js";
import Favorite from "../models/Favorite.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getMainPageDrinks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const { isAdult = false } = req.user;

  const drinksCondition = isAdult
    ? {}
    : {
        alcoholic: "Non alcoholic",
      };

  const result = await Drink.find(drinksCondition, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(result);
};

const addToFavorites = async (req, res) => {
  const userId = req.user._id;
  const drinkId = req.body.drinkId;

  if (!drinkId) {
    return res.status(400).json({ message: "drinkId required" });
  }

  const existingFavorite = await Favorite.findOne({ userId, drinkId });

  if (existingFavorite) {
    return res
      .status(400)
      .json({ message: "This drink is already in favorites" });
  }

  const favoriteDrink = new Favorite({ userId, drinkId });

  await favoriteDrink.save();

  res.json({ message: "Drink has been added to favorites" });
};

const removeFromFavorites = async (req, res) => {
  const userId = req.user._id;
  const drinkId = req.body.drinkId;

  if (!drinkId) {
    return res.status(400).json({ message: "drinkId required" });
  }

  await Favorite.deleteOne({ userId, drinkId });

  res.json({ message: "Drink has been removed from favorites" });
};

const getPopularDrinks = async (req, res) => {
  const { isAdult = false } = req.user;
  const { top = 10 } = req.query;

  const topNum = parseInt(top);

  const popularDrinkIds = await Favorite.aggregate([
    { $group: { _id: "$drinkId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: topNum },
  ]);

  const popularDrinks = [];

  for (let i = 0; i < popularDrinkIds.length; i++) {
    const drinkDetails = await Drink.findById(popularDrinkIds[i]._id);
    console.log(drinkDetails.alcoholic);
    if (!isAdult && drinkDetails.alcoholic === "Alcoholic") {
      continue;
    }
    popularDrinks.push(drinkDetails);
  }

  res.json(popularDrinks);
};

export default {
  getMainPageDrinks: ctrlWrapper(getMainPageDrinks),
  addToFavorites: ctrlWrapper(addToFavorites),
  removeFromFavorites: ctrlWrapper(removeFromFavorites),
  getPopularDrinks: ctrlWrapper(getPopularDrinks),
};
