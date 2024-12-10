import { z } from 'zod'

export const CreateTaskSchema = z.object({
	title: z.string().nonempty("Title is required"),
	description: z.string().optional(),
	completed: z.boolean().optional()
})

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>
