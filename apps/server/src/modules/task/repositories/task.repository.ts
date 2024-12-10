import db from '../../../db'
import { Task } from "tasks"

type TaskDb = {
	id: number
	title: string
	description: string
	completed: number
}

export class TaskRepository {
	getAll(): Task[] {
		const rows = db.prepare('SELECT * FROM tasks').all() as TaskDb[]
		return rows.map((row) => this.mapDbRowToTask(row))
	}

	getById(id: number): Task | null {
		const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as TaskDb | undefined
		return row ? this.mapDbRowToTask(row) : null
	}

	create(title: string, description: string, completed: boolean): Task {
		const info = db
			.prepare('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)')
			.run(title, description, completed ? 1 : 0)

		// Construct a Task-like object and map it to Task
		const newRow: TaskDb = {
			id: Number(info.lastInsertRowid),
			title,
			description,
			completed: completed ? 1 : 0
		}

		return this.mapDbRowToTask(newRow)
	}

	update(id: number, title?: string, description?: string, completed?: boolean): Task | null {
		const existing = this.getById(id)
		if (!existing) return null

		const newTitle = title ?? existing.title
		const newDescription = description ?? existing.description
		const newCompleted = typeof completed === 'boolean' ? (completed ? 1 : 0) : (existing.completed ? 1 : 0)

		db.prepare(
			'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?'
		).run(newTitle, newDescription, newCompleted, id)

		const updatedRow: TaskDb = {
			id,
			title: newTitle,
			description: newDescription,
			completed: newCompleted
		}
		return this.mapDbRowToTask(updatedRow)
	}

	delete(id: number): boolean {
		const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id)
		return info.changes > 0
	}

	private mapDbRowToTask(row: TaskDb): Task {
		return {
			id: row.id,
			title: row.title,
			description: row.description,
			completed: !!row.completed // Convert 0/1 to boolean
		}
	}
}
