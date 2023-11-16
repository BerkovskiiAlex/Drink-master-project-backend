/** @format */

import Glasses from "../models/Glasses.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Glasses.find({}, "-createdAt -updatedAt");
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
};
