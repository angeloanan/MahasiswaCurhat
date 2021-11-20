import * as z from 'zod'

export const SexualityPronouns = z.enum(['MALE', 'FEMALE'])

export const NewUserFormSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username must only contain letters, numbers or underscores',
    })
    .min(3, { message: 'Username must be longer' })
    .max(16, { message: 'Username must not be longer than 16 characters' }),
  gender: SexualityPronouns,
  birthdate: z.date(),
  university: z.string().min(3),
})
