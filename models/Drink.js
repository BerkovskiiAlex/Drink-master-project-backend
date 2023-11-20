/** @format */

import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const categoryList = [
  "Beer",
  "love Cocktail",
  "Cocoa",
  "Coffee / Tea",
  "Homemade Liqueur",
  "Ordinary Drink",
  "Other/Unknown",
  "Punch / Party Drink",
  "Shake",
  "Shot",
  "Soft Drink",
];

const glassList = [
  "Balloon Glass",
  "Beer Glass",
  "Beer mug",
  "Beer pilsner",
  "Brandy snifter",
  "Champagne Flute",
  "Champagne flute",
  "Cocktail Glass",
  "Cocktail glass",
  "Coffee Mug",
  "Coffee mug",
  "Collins Glass",
  "Collins glass",
  "Copper Mug",
  "Cordial glass",
  "Coupe Glass",
  "Highball Glass",
  "Highball glass",
  "Hurricane glass",
  "Irish coffee cup",
  "Jar",
  "Margarita glass",
  "Margarita/Coupette glass",
  "Martini Glass",
  "Mason jar",
  "Nick and Nora Glass",
  "Old-Fashioned glass",
  "Old-fashioned glass",
  "Pint glass",
  "Pitcher",
  "Pousse cafe glass",
  "Punch Bowl",
  "Punch bowl",
  "Shot Glass",
  "Shot glass",
  "Whiskey Glass",
  "Whiskey sour glass",
  "White wine glass",
  "Wine Glass",
];

const alcoholicList = ["Yes", "Non alcoholic"];

const drinkSchema = new Schema(
  {
    drink: { type: String, required: true },
    drinkAlternate: { type: String, default: "" },
    tags: { type: String, default: "" },
    video: { type: String, default: "" },
    category: { type: String, enum: categoryList, required: true },
    IBA: { type: String, default: "" },
    alcoholic: { type: String, enum: alcoholicList, required: true },
    glass: { type: String, enum: glassList, required: true },
    description: { type: String, required: true },
    instructions: { type: String, required: true },
    instructionsES: { type: String, default: "" },
    instructionsDE: { type: String, default: "" },
    instructionsFR: { type: String, default: "" },
    instructionsIT: { type: String, default: "" },
    instructionsRU: { type: String, default: "" },
    instructionsPL: { type: String, default: "" },
    instructionsUK: { type: String, default: "" },
    drinkThumb: { type: String, required: true },
    ingredients: [
      {
        title: { type: String, required: true },
        measure: { type: String, default: "" },
        ingredientId: { type: Schema.Types.ObjectId, required: true },
      },
    ],
    shortDescription: { type: String, default: "" },
    owner: { type: Schema.Types.ObjectId, required: true },
  },
  { versionKey: false, timestamps: true }
);

drinkSchema.post("save", handleSaveError);

drinkSchema.pre("findOneAndUpdate", preUpdate);

drinkSchema.post("findOneAndUpdate", handleSaveError);

const Drink = model("drink", drinkSchema);

export default Drink;
