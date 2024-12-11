import { z } from "zod";

export const UpdateTaskSchema = z.object({
  title: z.string().nonempty("Title is required").max(50).optional(),
  description: z.string().min(0).max(200).optional(),
  completed: z.boolean().optional(),
});

export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
