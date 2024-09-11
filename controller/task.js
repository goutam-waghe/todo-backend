import { Task } from "../model/task.js";

export const addTask = async function (req, res, next) {
  const { title, description } = req.body;

  await Task.create({ title, description, user: req.user });
  res.status(201).json({
    success: true,
    Message: "task added successfully",
  });
};

export const getAllTask = async function (req, res, next) {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });

  res.status(200).json({
    success: true,
    tasks,
  });
};
export const deleteTask = async function (req, res, next) {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return next(new Error("Nice"));
  await task.deleteOne();
  res.status(200).json({
    success: true,
    Message: "task is deleted",
  });
};
export const updateTask = async function (req, res, next) {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return next(new Error("nice"));
  task.isCompleted = !task.isCompleted;

  await task.save();
  res.status(200).json({
    success: true,
    Message: "task is updated",
  });
};
