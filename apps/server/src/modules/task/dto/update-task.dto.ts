import { z } from 'zod'

export const UpdateTaskSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	completed: z.boolean().optional()
})

export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>
