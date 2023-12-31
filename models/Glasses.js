/** @format */
import { Schema, model } from "mongoose";
import Joi from "joi";

const glassSchema = new Schema(
  {
    glass: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const glassAddSchema = Joi.object({});

export const glassUpdateSchema = Joi.object({});

const Glasses = model("glasses", glassSchema);

export default Glasses;
