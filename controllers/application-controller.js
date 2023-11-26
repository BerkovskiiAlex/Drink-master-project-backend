/** @format */

import { ctrlWrapper } from "../decorators/index.js";

const startApi = async (req, res) => {
  const result = { message: "Api started" };
  res.json(result);
};

export default {
  startApi: ctrlWrapper(startApi),
};
