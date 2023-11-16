/** @format */
import { Schema, model } from "mongoose";
import Joi from "joi";

const categorySchema = new Schema(
  {
    categories: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

export const ingredientAddSchema = Joi.object({});

export const ingredientUpdateSchema = Joi.object({});

const Categories = model("categories", categorySchema);

export default Categories;
