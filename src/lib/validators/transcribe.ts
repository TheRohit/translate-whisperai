import { z } from "zod";

export const TValidator = z.object({
 
  model: z.string(),
  prompt: z.string().optional(),
 
  
  
});

export type TRequest = z.infer<typeof TValidator>;
