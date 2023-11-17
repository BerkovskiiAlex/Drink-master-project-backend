/** @format */

import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const drinkSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarUrl: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
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
