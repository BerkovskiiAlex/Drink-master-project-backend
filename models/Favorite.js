/** @format */

import { Schema, model } from "mongoose";

const favoriteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    drinkId: {
      type: Schema.Types.ObjectId,
      ref: "drinks",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Favorite = model("favorite", favoriteSchema);

export default Favorite;
