import { GOOGLE_CLIENT_ID, JWT_EXPIRE, JWT_SECRET } from "../config/env.js";
import User from "../models/users.model.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
    const { sub: googleId, name, email, picture } = ticket.getPayload();

    const userObject = {
      googleId,
      name,
      email,
      picture,
    };

    const userExists = await User.findOne({ email });
    const user = userExists ? userExists : await User.create({ ...userObject });

    const appToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res.cookie("token", appToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: "none",
    });

    res.json({
      success: true,
      message: "User logged in",
      user,
    });
  } catch (error) {
    next(error);
  }
};
