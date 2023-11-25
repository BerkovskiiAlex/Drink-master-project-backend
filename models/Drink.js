/** @format */

import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";

const categoryList = [
  "Beer",
  "Cocktail",
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
  "Highball glass",
  "Cocktail glass",
  "Old-fashioned glass",
  "Whiskey Glass",
  "Collins glass",
  "Pousse cafe glass",
  "Champagne flute",
  "Whiskey sour glass",
  "Cordial glass",
  "Brandy snifter",
  "White wine glass",
  "Nick and Nora Glass",
  "Hurricane glass",
  "Coffee mug",
  "Shot glass",
  "Jar",
  "Irish coffee cup",
  "Punch bowl",
  "Pitcher",
  "Pint glass",
  "Copper Mug",
  "Wine Glass",
  "Beer mug",
  "Margarita/Coupette glass",
  "Beer pilsner",
  "Beer Glass",
  "Parfait glass",
  "Mason jar",
  "Margarita glass",
  "Martini Glass",
  "Balloon Glass",
  "Coupe Glass",
];

const alcoholicList = ["Alcoholic", "Non alcoholic"];

const drinkSchema = new Schema(
  {
    drink: { type: String },
    drinkAlternate: { type: String, default: "" },
    tags: { type: String, default: "" },
    video: { type: String, default: "" },
    category: { type: String, enum: categoryList },
    IBA: { type: String, default: "" },
    alcoholic: { type: String, enum: alcoholicList },
    glass: { type: String, enum: glassList },
    description: { type: String },
    instructions: { type: String },
    instructionsES: { type: String, default: "" },
    instructionsDE: { type: String, default: "" },
    instructionsFR: { type: String, default: "" },
    instructionsIT: { type: String, default: "" },
    instructionsRU: { type: String, default: "" },
    instructionsPL: { type: String, default: "" },
    instructionsUK: { type: String, default: "" },
    drinkThumb: { type: String },
    ingredients: [
      {
        title: { type: String },
        measure: { type: String, default: "" },
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "ingredient",
        },
      },
    ],
    shortDescription: { type: String, default: "" },
    owner: { type: Schema.Types.ObjectId },
  },
  { versionKey: false, timestamps: true }
);

drinkSchema.post("save", handleSaveError);

drinkSchema.pre("findOneAndUpdate", preUpdate);

drinkSchema.post("findOneAndUpdate", handleSaveError);

const Drink = model("drink", drinkSchema);

export default Drink;

// const drinkSchema = new Schema(
//   {
//     drink: { type: String, required: true },
//     drinkAlternate: { type: String, default: "" },
//     tags: { type: String, default: "" },
//     video: { type: String, default: "" },
//     category: { type: String, enum: categoryList, required: true },
//     IBA: { type: String, default: "" },
//     alcoholic: { type: String, enum: alcoholicList, required: true },
//     glass: { type: String, enum: glassList, required: true },
//     description: { type: String, required: true },
//     instructions: { type: String, required: true },
//     instructionsES: { type: String, default: "" },
//     instructionsDE: { type: String, default: "" },
//     instructionsFR: { type: String, default: "" },
//     instructionsIT: { type: String, default: "" },
//     instructionsRU: { type: String, default: "" },
//     instructionsPL: { type: String, default: "" },
//     instructionsUK: { type: String, default: "" },
//     drinkThumb: { type: String, required: true },
//     ingredients: [
//       {
//         title: { type: String, required: true },
//         measure: { type: String, default: "" },
//         ingredientId: {
//           type: Schema.Types.ObjectId,
//           ref: "ingredient",
//           required: true,
//         },
//       },
//     ],
//     shortDescription: { type: String, default: "" },
//     owner: { type: Schema.Types.ObjectId, required: true },
//   },
//   { versionKey: false, timestamps: true }
// );
