import { RequestHandler } from "express";
import { GetTaskByIdParamsSchema } from "../dto/get-task-by-id.dto";
import { getTaskByIdHandler } from "../handlers/getTaskById.handler";

export const getTaskByIdController: RequestHandler = (req, res) => {
  const parseResult = GetTaskByIdParamsSchema.safeParse(req.params);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.issues });
    return;
  }

  const { id } = parseResult.data;
  const task = getTaskByIdHandler(id);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(task);
};
