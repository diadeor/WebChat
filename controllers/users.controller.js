import User from "../models/users.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-createdAt -updatedAt -__v");
    const { role } = req.user;
    const isAdmin = role === "admin";
    if (!isAdmin) throw new Error("Unauthorized: Not an admin");
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id, "-createdAt -updatedAt -__v");
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
