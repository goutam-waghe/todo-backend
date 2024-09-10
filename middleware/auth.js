import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const isAuthanticated = async function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: true,
      Message: "login first",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode._id);

  next();
};
