/** @format */

import PrivacyPolicy from "../models/PrivacyPolicy.js";

import PublicOffering from "../models/PublicOffering.js";

import { ctrlWrapper } from "../decorators/index.js";

const getPolicy = async (req, res) => {
  const result = await PrivacyPolicy.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getPublicOffering = async (req, res) => {
  const result = await PublicOffering.find({}, "-createdAt -updatedAt");
  res.json(result);
};

export default {
  getPolicy: ctrlWrapper(getPolicy),
  getPublicOffering: ctrlWrapper(getPublicOffering),
};
