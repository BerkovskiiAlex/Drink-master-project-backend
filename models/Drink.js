/** @format */

import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const drinkSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    drink: { type: String },
    drinkAlternate: { type: String },
    tags: { type: String },
    video: { type: String },
    category: { type: String },
    IBA: { type: String },
    alcoholic: { type: String },
    glass: { type: String },
    description: { type: String },
    instructions: { type: String },
    instructionsES: { type: String },
    instructionsDE: { type: String },
    instructionsFR: { type: String },
    instructionsIT: { type: String },
    instructionsRU: { type: String },
    instructionsPL: { type: String },
    instructionsUK: { type: String },
    drinkThumb: { type: String },
    ingredients: [
      {
        title: { type: String },
        measure: { type: String },
        ingredientId: { type: Schema.Types.ObjectId },
      },
    ],
    shortDescription: { type: String },
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
