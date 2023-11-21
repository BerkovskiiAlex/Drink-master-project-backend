/** @format */

import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Subscription = model("subscriptions", subscriptionSchema);

export default Subscription;
