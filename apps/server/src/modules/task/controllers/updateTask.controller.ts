import { RequestHandler } from "express";
import { GetTaskByIdParamsSchema } from "../dto/get-task-by-id.dto";
import { UpdateTaskSchema } from "../dto/update-task.dto";
import { updateTaskHandler } from "../handlers/updateTask.handler";

export const updateTaskController: RequestHandler = (req, res) => {
  // Validate path params
  const paramsResult = GetTaskByIdParamsSchema.safeParse(req.params);
  if (!paramsResult.success) {
    res.status(400).json({ errors: paramsResult.error.issues });
    return;
  }

  // Validate body
  const bodyResult = UpdateTaskSchema.safeParse(req.body);
  if (!bodyResult.success) {
    res.status(400).json({ errors: bodyResult.error.issues });
    return;
  }

  const { id } = paramsResult.data;
  const dto = bodyResult.data;

  const updatedTask = updateTaskHandler(id, dto);
  if (!updatedTask) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(updatedTask);
};
