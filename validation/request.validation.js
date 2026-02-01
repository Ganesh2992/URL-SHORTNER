import {z} from 'zod';

export const signupPostRequestBodySchema = z.object({
  firstName: z.string(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(3),
}); 