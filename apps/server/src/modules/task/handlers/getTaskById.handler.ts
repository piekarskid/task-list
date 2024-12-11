import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export function getTaskByIdHandler(id: number) {
  return taskService.getTaskById(id);
}
