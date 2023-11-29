/** @format */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import User from "../models/User.js";
import Subscription from "../models/Subscriptions.js";

import {
  HttpError,
  cloudinary,
  isUserAdult,
  sendEmail,
} from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password, birthdate } = req.body;

  if (!birthdate) {
    throw HttpError(400, "Birthdate is required");
  }

  const userBirthdate = new Date(birthdate);
  const currentDate = new Date();

  if (currentDate < userBirthdate) {
    throw HttpError(400, "Incorrect date");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let avatarUrl;

  if (req.file) {
    const { url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "drinkMasterPhotos",
    });
    avatarUrl = url;
    await fs.unlink(req.file.path);
  } else {
    const options = {
      s: "200",
      r: "pg",
      d: "mm",
    };
    avatarUrl = gravatar.url(email, options, true);
  }

  const newUser = await User.create({
    ...req.body,
    avatarUrl,
    password: hashPassword,
    birthdate,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    avatarUrl: newUser.avatarUrl,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const isAdult = isUserAdult(user.birthdate);

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {
    $set: { token: token, isAdult: isAdult },
  });

  res.json({
    token,
    username: user.username,
    email: user.email,
    isAdult: isAdult,
    avatarUrl: user.avatarUrl,
  });
};

const getCurrent = async (req, res) => {
  const { user } = req;

  res.json({
    token: user.token,
    username: user.username,
    email: user.email,
    isAdult: user.isAdult,
    avatarUrl: user.avatarUrl,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { _id } = req.user;

  let updatedUser;

  if (req.file) {
    const { url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "drinkMasterPhotos",
    });
    updatedUser = { ...req.body, avatarUrl: url };
    await fs.unlink(req.file.path);
  } else {
    updatedUser = { ...req.body };
  }

  const result = await User.findByIdAndUpdate(_id, updatedUser, { new: true });
  if (!result) {
    throw HttpError(404, `User with id=${_id} not found`);
  }

  res.json({ avatarUrl: result.avatarUrl, username: result.username });
};

const sendSubscriptionEmail = async (req, res) => {
  const { _id } = req.user;
  const { email } = req.query;

  console.log(email);

  const userSubscription = await Subscription.findOne({ userEmail: email });

  if (userSubscription) {
    throw HttpError(409, "Email already subscribed");
  }

  const subscription = {
    to: email,
    subject: "Subscription",
    html: `<h1>Congratulations, you have subscribed to the news of the Drink Master website!</h1>`,
  };

  await sendEmail(subscription);

  const newSubscription = new Subscription({ userId: _id, userEmail: email });

  await newSubscription.save();

  res.json({
    message: "Subscription email send success",
  });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
  sendSubscriptionEmail: ctrlWrapper(sendSubscriptionEmail),
};
