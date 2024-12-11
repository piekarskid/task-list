import { Router } from "express";
import { getAllTasksController } from "../controllers/getAllTasks.controller";
import { getTaskByIdController } from "../controllers/getTaskById.controller";
import { createTaskController } from "../controllers/createTask.controller";
import { updateTaskController } from "../controllers/updateTask.controller";
import { deleteTaskController } from "../controllers/deleteTask.controller";

export const taskRouter = Router();

taskRouter.get("/", getAllTasksController); // GET /tasks
taskRouter.get("/:id", getTaskByIdController); // GET /tasks/:id
taskRouter.post("/", createTaskController); // POST /tasks
taskRouter.put("/:id", updateTaskController); // PUT /tasks/:id
taskRouter.delete("/:id", deleteTaskController); // DELETE /tasks/:id
