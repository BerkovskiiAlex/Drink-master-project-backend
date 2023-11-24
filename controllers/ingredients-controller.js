/** @format */

import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import Ingredient from "../models/Ingredient.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  if (page < 1 || limit < 1) {
    throw HttpError(400, `page and limit must be equal to or greater than 1`);
  }

  const skip = (page - 1) * limit;
  const result = await Ingredient.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
};
