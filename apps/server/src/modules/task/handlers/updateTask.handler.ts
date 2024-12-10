import { TaskService } from '../services/task.service'
import { UpdateTaskDto } from '../dto/update-task.dto'

const taskService = new TaskService()

export function updateTaskHandler(id: number, dto: UpdateTaskDto) {
	return taskService.updateTask(id, dto)
}
