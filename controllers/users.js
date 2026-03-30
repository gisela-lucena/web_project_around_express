import { User } from '../models/users.js';

export const createUser = async (req, res, next) => {
  try {
  const { name, about, avatar } = req.body;
  const user = await User.create({ name, about, avatar });
  res.status(201).json(user);
 } catch (err) {
  next(err);
 }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
  const { userId } = req.params;

  const user = await User.findById(userId).orFail();
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const patchUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const patchAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { 
        new: true,
        runValidators: true
      }
    ).orFail();

    res.json(user);
  } catch (err) {
    next(err);
  }
}

