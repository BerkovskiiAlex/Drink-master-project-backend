/** @format */

import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const drinkSchema = new Schema(
  {
    drink: { type: String },
    glass: { type: String },
    alcoholic: { type: String },
  },
  { versionKey: false, timestamps: true }
);

drinkSchema.post("save", handleSaveError);

drinkSchema.pre("findOneAndUpdate", preUpdate);

drinkSchema.post("findOneAndUpdate", handleSaveError);

export const drinkAddSchema = Joi.object({});

export const drinkUpdateSchema = Joi.object({});

const Drink = model("drink", drinkSchema);

export default Drink;
