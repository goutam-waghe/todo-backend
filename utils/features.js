import jwt from "jsonwebtoken";

export const sendcookie = async function (
  res,
  user,
  Message,
  statuscode = 200
) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  console.log(token);
  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      Message: Message,
    });
};
