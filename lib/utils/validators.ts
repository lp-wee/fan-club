import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['job_seeker', 'employer', 'admin']),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  phone: z.string().optional(),
  role: z.enum(['job_seeker', 'employer']),
  company_name: z.string().optional(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

export const vacancySchema = z.object({
  title: z.string().min(5, 'Title is required').max(200),
  description: z.string().min(20, 'Description is required'),
  salary_min: z.number().positive('Salary must be positive').optional(),
  salary_max: z.number().positive('Salary must be positive').optional(),
  currency: z.string().optional(),
  location: z.string().optional(),
  employment_type: z.string().optional(),
  level: z.string().optional(),
  deadline: z.string().optional(),
}).refine((data) => {
  if (data.salary_min && data.salary_max) {
    return data.salary_min <= data.salary_max
  }
  return true
}, {
  message: 'Minimum salary cannot be greater than maximum salary',
  path: ['salary_max'],
})

export const resumeSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  content: z.string().min(50, 'Content is required'),
  is_public: z.boolean().default(true),
  is_primary: z.boolean().default(false),
})

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(5000),
  receiver_id: z.string().uuid('Invalid receiver'),
})

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5),
  comment: z.string().min(10, 'Comment is required').max(5000),
})

export const vacancyFilterSchema = z.object({
  search: z.string().optional(),
  salary_min: z.number().optional(),
  salary_max: z.number().optional(),
  location: z.string().optional(),
  employment_type: z.string().optional(),
  level: z.string().optional(),
  company_id: z.string().uuid().optional(),
  page: z.number().positive().default(1),
  limit: z.number().positive().max(100).default(20),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type VacancyInput = z.infer<typeof vacancySchema>
export type ResumeInput = z.infer<typeof resumeSchema>
export type MessageInput = z.infer<typeof messageSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type VacancyFilterInput = z.infer<typeof vacancyFilterSchema>
