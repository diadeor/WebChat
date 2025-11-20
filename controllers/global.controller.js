import Global from "../models/global.model.js";

export const getGlobalMessages = async (req, res, next) => {
  try {
    const messages = await Global.find({}, "sender text -_id");
    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
};
