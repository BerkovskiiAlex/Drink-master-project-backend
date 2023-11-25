/** @format */

import Ingredient from "../models/Ingredient.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Ingredient.find({}, "-createdAt -updatedAt");
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
};
