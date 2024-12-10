import { TaskService } from '../services/task.service'

const taskService = new TaskService()

export function getAllTasksHandler() {
	return taskService.getAllTasks()
}
