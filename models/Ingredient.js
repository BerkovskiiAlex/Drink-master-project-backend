/** @format */

/** @format */
import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const ingredientSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for ingredient"],
    },
    abv: {
      type: Number,
      default: 0,
    },
    alcohol: {
      type: String,
      default: "No",
    },
    description: {
      type: String,
      default: "",
    },
    type: { type: String, default: "" },
    flavour: {
      type: String,
      default: "",
    },
    country: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

ingredientSchema.post("save", handleSaveError);

ingredientSchema.pre("findOneAndUpdate", preUpdate);

ingredientSchema.post("findOneAndUpdate", handleSaveError);

export const ingredientAddSchema = Joi.object({});

export const ingredientUpdateSchema = Joi.object({});

const Ingredient = model("ingredient", ingredientSchema);

export default Ingredient;
