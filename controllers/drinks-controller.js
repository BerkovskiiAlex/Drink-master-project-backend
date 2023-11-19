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

const getFilteredDrinks = async (req, res) => {
  const { page = 1, limit = 10, category, keyword, ingredientId } = req.query;
  const skip = (page - 1) * limit;

  const { isAdult = false } = req.user;

  const drinksCondition = {
    ...(!isAdult && { alcoholic: "Non alcoholic" }),
    ...(category && { category }),
    ...(keyword && {
      $or: [
        { drink: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }),
    ...(ingredientId && { "ingredients.ingredientId": ingredientId }),
  };

  const result = await Drink.find(drinksCondition, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(result);
};

const getDrinkById = async (req, res) => {
  const { id } = req.params;

  const result = await Drink.findById(id);

  if (!result) {
    throw HttpError(404, `Drink with id=${id} not found`);
  }

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

  res.status(201).json({ message: "Drink has been added to favorites" });
};

const removeFromFavorites = async (req, res) => {
  const userId = req.user._id;
  const drinkId = req.body.drinkId;

  if (!drinkId) {
    return res.status(400).json({ message: "drinkId required" });
  }

  await Favorite.deleteOne({ userId, drinkId });

  res.sendStatus(204);
};

const getFavoriteDrinks = async (req, res) => {
  const userId = req.user._id;

  const favorites = await Favorite.find({ userId });

  const favoriteDrinkIds = favorites.map((fav) => fav.drinkId);
  console.log(favoriteDrinkIds);
  const favoriteDrinks = await Drink.find({
    _id: { $in: favoriteDrinkIds },
  });

  res.json(favoriteDrinks);
};

export default {
  getMainPageDrinks: ctrlWrapper(getMainPageDrinks),
  addToFavorites: ctrlWrapper(addToFavorites),
  removeFromFavorites: ctrlWrapper(removeFromFavorites),
  getPopularDrinks: ctrlWrapper(getPopularDrinks),
  getFilteredDrinks: ctrlWrapper(getFilteredDrinks),
  getDrinkById: ctrlWrapper(getDrinkById),
  getFavoriteDrinks: ctrlWrapper(getFavoriteDrinks),
};
