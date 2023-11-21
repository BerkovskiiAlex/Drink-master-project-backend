/** @format */
import { Schema, model } from "mongoose";

const policySchema = new Schema(
  {
    paragraph1: {
      type: String,
    },
    paragraph2: {
      type: String,
    },
    paragraph3: {
      type: String,
    },
    paragraph4: {
      type: String,
    },
    paragraph5: {
      type: String,
    },
    paragraph6: {
      type: String,
    },
    paragraph7: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const PrivacyPolicy = model("privacypolicies", policySchema);

export default PrivacyPolicy;
