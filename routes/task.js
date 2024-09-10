import express from "express";
import {
  addTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controller/task.js";
import { isAuthanticated } from "../middleware/auth.js";

const router = express.Router();
router.post("/new", isAuthanticated, addTask);
router.get("/all", isAuthanticated, getAllTask);
router
  .route("/:id")
  .put(isAuthanticated, updateTask)
  .delete(isAuthanticated, deleteTask);
export default router;
