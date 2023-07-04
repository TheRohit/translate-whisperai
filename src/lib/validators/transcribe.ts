import { any, z } from "zod";


export const TValidator =z.object({
   file:z.any(),
   model:z.string(),
   response_format:z.string(),
   propmt: z.string(),
    language: z.string().optional(),
    text:any().optional(),

    });

    export type TRequest =z.infer<typeof TValidator>
