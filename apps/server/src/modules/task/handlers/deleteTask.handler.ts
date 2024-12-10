import { TaskService } from '../services/task.service'

const taskService = new TaskService()

export function deleteTaskHandler(id: number) {
	return taskService.deleteTask(id)
}
