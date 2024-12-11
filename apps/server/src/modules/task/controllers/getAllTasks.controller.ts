import { RequestHandler } from "express";
import { getAllTasksHandler } from "../handlers/getAllTasks.handler";

export const getAllTasksController: RequestHandler = (_req, res) => {
  const tasks = getAllTasksHandler();
  res.json(tasks);
};
