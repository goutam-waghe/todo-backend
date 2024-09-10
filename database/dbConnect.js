import mongoose from "mongoose";

export const dbConnect = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "todoBeckend",
    });

    console.log("db connect");
  } catch (error) {
    console.log(error);
  }
};
