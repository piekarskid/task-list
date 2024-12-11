import { RequestHandler } from "express";
import { DeleteTaskParamsSchema } from "../dto/delete-task.dto";
import { deleteTaskHandler } from "../handlers/deleteTask.handler";

export const deleteTaskController: RequestHandler = (req, res) => {
  const parseResult = DeleteTaskParamsSchema.safeParse(req.params);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.issues });
    return;
  }

  const { id } = parseResult.data;
  const success = deleteTaskHandler(id);
  if (!success) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.status(204).send();
};
