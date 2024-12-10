import { TaskRepository } from '../repositories/task.repository'
import { CreateTaskDto } from '../dto/create-task.dto'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { Task } from 'tasks'

export class TaskService {
	private repository: TaskRepository

	constructor() {
		this.repository = new TaskRepository()
	}

	getAllTasks(): Task[] {
		return this.repository.getAll() // Already returns boolean for completed
	}

	getTaskById(id: number): Task | null {
		return this.repository.getById(id) // Returns Task-compatible object
	}

	createTask(dto: CreateTaskDto): Task {
		return this.repository.create(
			dto.title,
			dto.description || '',
			dto.completed || false
		)
	}

	updateTask(id: number, dto: UpdateTaskDto): Task | null {
		return this.repository.update(
			id,
			dto.title,
			dto.description,
			dto.completed
		)
	}

	deleteTask(id: number): boolean {
		return this.repository.delete(id)
	}
}
