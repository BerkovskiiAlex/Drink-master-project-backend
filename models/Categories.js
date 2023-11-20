/** @format */
import { Schema, model } from "mongoose";
import Joi from "joi";

const categorySchema = new Schema(
  {
    category: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const ingredientAddSchema = Joi.object({});

export const ingredientUpdateSchema = Joi.object({});

const Categories = model("categories", categorySchema);

export default Categories;
