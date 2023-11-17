/** @format */

import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import Drink from "../models/Drink.js";

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

export default {
  getMainPageDrinks: ctrlWrapper(getMainPageDrinks),
};
