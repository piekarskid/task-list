import { RequestHandler } from "express";
import { CreateTaskSchema } from "../dto/create-task.dto";
import { createTaskHandler } from "../handlers/createTask.handler";

export const createTaskController: RequestHandler = (req, res) => {
  const parseResult = CreateTaskSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.issues });
    return;
  }

  const dto = parseResult.data;
  const newTask = createTaskHandler(dto);
  res.status(201).json(newTask);
};
