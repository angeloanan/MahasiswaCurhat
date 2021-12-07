import * as z from 'zod'

// TODO: Use Prisma's built in enum
export const SexualityPronouns = z.enum(['MALE', 'FEMALE'])
export type SexualityPronouns = z.infer<typeof SexualityPronouns>

export const NewUserFormSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username must only contain letters, numbers or underscores'
    })
    .min(3, { message: 'Username must be longer' })
    .max(16, { message: 'Username must not be longer than 16 characters' }),
  photo: z.string().url().optional(),
  gender: SexualityPronouns,
  // Support for Date is in RFC, https://github.com/colinhacks/zod/issues/126
  birthdate: z.string(),
  university: z.string().min(3)
})
