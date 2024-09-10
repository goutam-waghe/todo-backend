import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendcookie } from "../utils/features.js";

//login user api
export async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    res.json({
      success: true,
      Message: "Invailid email or password",
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    res.status(404).json({
      success: false,
      Message: "Incorrect Password or password",
    });
  }
  sendcookie(res, user, `wellcome ${user.name}`, 200);
}

//register user api
export async function registerUser(req, res, next) {
  const { name, email, password } = req.body;
  console.log(req.body);
  let user = await User.findOne({ email });
  if (user) {
    res.json({
      success: false,
      Message: "user already exits",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashPassword });
  console.log(user);
  sendcookie(res, user, "register successful", 201);
}

//my profile api
export function getMyProfile(req, res, next) {
  res.status(200).json({
    success: true,
    user: req.user,
  });
}

//logout api
export function logoutUser(req, res) {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: res.user,
    });
}
