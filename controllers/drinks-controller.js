/** @format */

import fs from "fs/promises";
import path from "path";

import Drink from "../models/Drink.js";
import Favorite from "../models/Favorite.js";

import { HttpError, cloudinary } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const drinksPath = path.resolve("public", "drinkPhoto");

const getMainPageDrinks = async (req, res) => {
  const { page = 1, limit = 4, category } = req.query;

  if (page < 1 || limit < 1) {
    throw HttpError(400, `page and limit must be equal to or greater than 1`);
  }

  const categories = category ? category.split(",") : undefined;

  if (!category) {
    throw HttpError(400, `At least one category is required`);
  }

  const skip = (page - 1) * limit;

  const { isAdult = false } = req.user;

  const isUserAdult = isAdult ? "Alcoholic" : "Non alcoholic";

  const result = await Drink.aggregate([
    {
      $facet: {
        [categories[0]]: [
          {
            $match: {
              category: { $in: [categories[0]] },
              alcoholic: isUserAdult,
            },
          },
          { $project: { createdAt: 0, updatedAt: 0 } },
          { $skip: skip },
          { $limit: limit },
        ],
        [categories[1]]: [
          {
            $match: {
              category: { $in: [categories[1]] },
              alcoholic: isUserAdult,
            },
          },
          { $project: { createdAt: 0, updatedAt: 0 } },
          { $skip: skip },
          { $limit: limit },
        ],
        [categories[2]]: [
          {
            $match: {
              category: { $in: [categories[2]] },
              alcoholic: isUserAdult,
            },
          },
          { $project: { createdAt: 0, updatedAt: 0 } },
          { $skip: skip },
          { $limit: limit },
        ],
        [categories[3]]: [
          {
            $match: {
              category: { $in: [categories[3]] },
              alcoholic: isUserAdult,
            },
          },
          { $project: { createdAt: 0, updatedAt: 0 } },
          { $skip: skip },
          { $limit: limit },
        ],
      },
    },
  ]);

  res.json(result);
};

const getPopularDrinks = async (req, res) => {
  const { isAdult = false } = req.user;
  const { top = 10 } = req.query;

  if (top < 1) {
    throw HttpError(400, `top must be equal to or greater than 1`);
  }

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

  const totalDrinks = await Drink.countDocuments(drinksCondition);

  const result = await Drink.find(drinksCondition, "-createdAt -updatedAt", {
    skip,
    limit: parseInt(limit),
  });

  res.json({
    totalDrinks: totalDrinks,
    totalPages: Math.ceil(totalDrinks / parseInt(limit)),
    currentPage: parseInt(page),
    perPage: parseInt(limit),
    data: result,
  });
};

const getDrinkById = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const favoriteDrink = await Favorite.findOne({ userId, drinkId: id });

  const result = await Drink.findById(id)
    .populate("ingredients.ingredientId", "thumb-medium")
    .lean();

  if (!result) {
    throw HttpError(404, `Drink with id=${id} not found`);
  }

  result.isFavorite = !!favoriteDrink;

  res.json(result);
};

const addDrink = async (req, res) => {
  const { _id: owner, isAdult } = req.user;
  const { body } = req;

  if (!req.file) {
    throw HttpError(400, `drinkPhoto required`);
  }

  const { url } = await cloudinary.uploader.upload(req.file.path, {
    folder: "drinkMasterPhotos",
  });
  await fs.unlink(req.file.path);

  if (!isAdult && body.alcoholic === "Alcoholic") {
    throw HttpError(
      403,
      `A minor user is prohibited from adding alcoholic drinks`
    );
  }

  const result = await Drink.create({
    ...body,
    drinkThumb: url,
    owner,
  });
  res.status(201).json(result);
};

const removeDrink = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const drink = await Drink.findById(id);

  if (!drink) {
    throw HttpError(404, `Drink with id=${id} not found`);
  }

  if (String(drink.owner) !== String(owner)) {
    throw HttpError(403, `You do not have permission to delete this drink`);
  }

  await Drink.findByIdAndDelete(id);

  res.sendStatus(204);
};

const getUsersDrinks = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Drink.find({ owner });

  if (!result) {
    throw HttpError(404, `User's drinks not found`);
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
  const { drinkId } = req.params;

  if (!drinkId) {
    return res.status(400).json({ message: "drinkId required" });
  }

  const favorite = await Favorite.findOne({ userId, drinkId });

  if (!favorite) {
    return res.status(404).json({
      message: "The drink was not found in the user's favorites",
    });
  }

  await Favorite.deleteOne({ userId, drinkId });

  res.sendStatus(204);
};

const getFavoriteDrinks = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  if (page < 1 || limit < 1) {
    throw HttpError(400, `page and limit must be equal to or greater than 1`);
  }

  const skip = (page - 1) * limit;

  const favorites = await Favorite.find({ userId });

  const favoriteDrinkIds = favorites.map((fav) => fav.drinkId);

  const totalFavorites = await Drink.countDocuments({
    _id: { $in: favoriteDrinkIds },
  });

  const favoriteDrinks = await Drink.find(
    { _id: { $in: favoriteDrinkIds } },
    "-createdAt -updatedAt",
    { skip, limit: parseInt(limit) }
  );

  res.json({
    totalFavorites: totalFavorites,
    totalPages: Math.ceil(totalFavorites / parseInt(limit)),
    currentPage: parseInt(page),
    perPage: parseInt(limit),
    data: favoriteDrinks,
  });
};

export default {
  getMainPageDrinks: ctrlWrapper(getMainPageDrinks),
  getPopularDrinks: ctrlWrapper(getPopularDrinks),
  getFilteredDrinks: ctrlWrapper(getFilteredDrinks),
  getDrinkById: ctrlWrapper(getDrinkById),
  addDrink: ctrlWrapper(addDrink),
  removeDrink: ctrlWrapper(removeDrink),
  getUsersDrinks: ctrlWrapper(getUsersDrinks),
  addToFavorites: ctrlWrapper(addToFavorites),
  removeFromFavorites: ctrlWrapper(removeFromFavorites),
  getFavoriteDrinks: ctrlWrapper(getFavoriteDrinks),
};
