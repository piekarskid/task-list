import { z } from "zod";

export const DeleteTaskParamsSchema = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Id must be a number")
    .transform(Number),
});
