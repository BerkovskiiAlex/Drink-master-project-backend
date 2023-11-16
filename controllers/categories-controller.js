/** @format */

import Categories from "../models/Categories.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Categories.find({}, "-createdAt -updatedAt");
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
};
