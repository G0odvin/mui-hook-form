import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).
  refine((val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val), { message: 'Invalid email address' }),
  states: z.array(z.string()).min(1).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1),
  skills: z.array(z.string()).min(1),
  registrationDateTime: z.date(),
  formEmploymentPeriod: z.array(z.date()).min(2).max(2),
  salaryRange: z.array(z.number()).max(2),
  isTeacher: z.boolean(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  name: '',
  email: '',
  states: [],
  languagesSpoken: [],
  gender: '',
  skills: [],
  registrationDateTime: new Date(),
  formEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
}