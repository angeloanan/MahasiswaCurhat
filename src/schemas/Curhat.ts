import * as z from 'zod'

export const CurhatMoodEnum = z.enum([
  'HAPPY',
  'SAD',
  'ANGRY',
  'ANXIOUS',
  'CONFUSED',
  'EXCITED',
  'RELAXED',
  'STRESSED',
  'TIRED'
])

export const CreateCurhatSchema = z.object({
  content: z
    .string()
    .min(5, { message: 'Curhat must be longer' })
    .max(280, { message: 'Curhat has exceeded 280 characters limit' }),
  mood: CurhatMoodEnum.optional(),
  attachment: z.string().url({ message: 'Attachment must be a valid URL' }).optional()
})
