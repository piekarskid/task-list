import { TaskService } from '../services/task.service'
import { CreateTaskDto } from '../dto/create-task.dto'

const taskService = new TaskService()

export function createTaskHandler(dto: CreateTaskDto) {
	return taskService.createTask(dto)
}
