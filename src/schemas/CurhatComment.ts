import * as z from 'zod'

export const CreateCurhatCommentSchema = z.object({
  curhatId: z.string(),
  content: z
    .string()
    .min(5, { message: 'Comment must be longer' })
    .max(280, { message: 'Comment must be shorter than 280 characters' })
})
