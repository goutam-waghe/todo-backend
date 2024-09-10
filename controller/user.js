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
      success: true,
      Message: "user already exits",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  user = await User.create({ name, email, password: hashPassword });
  console.log(user); 
  sendcookie(res, user, "register successful", 201);
}

//my profile api 
export async function getMyProfile(req, res, next) {
  console.log(req.cookies);
  const { token } = req.cookies;

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);

  const user = await User.findById(decode._id);
  if (!user) {
    res.json({
      success: true,
      Message: "login first",
    });
  }
  res.status(200).json({
    success: true,
    user: user,
  });
}
