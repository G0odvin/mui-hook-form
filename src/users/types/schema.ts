import { z } from 'zod';

export const schema = z
  .intersection(
    z.object({
      name: z.string().min(1, { message: 'Required' }),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .refine((val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val), {
          message: 'Invalid email address',
        }),
      states: z.array(z.string()).min(1).max(2),
      languagesSpoken: z.array(z.string()),
      gender: z.string().min(1),
      skills: z.array(z.string()).max(2),
      registrationDateAndTime: z.date(),
      formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
      salaryRange: z.array(z.number()).max(2),
    }),
    z.discriminatedUnion('variant', [
      z.object({ variant: z.literal('create') }),
      z.object({ variant: z.literal('update'), id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4),
          })
        ),
      }),
    ])
  );

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  name: '',
  email: '',
  states: [],
  languagesSpoken: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
  variant: 'create'
}