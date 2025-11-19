import User from "../models/users.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
