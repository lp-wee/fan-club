// User Roles
export type UserRole = 'job_seeker' | 'employer' | 'admin'

// Database Models
export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  avatar?: string
  created_at: string
  updated_at: string
}

export interface JobSeeker {
  id: string
  user_id: string
  first_name: string
  last_name: string
  phone?: string
  location?: string
  bio?: string
  resume_count: number
  rating: number
  created_at: string
  updated_at: string
}

export interface Employer {
  id: string
  user_id: string
  company_id: string
  position?: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  description?: string
  logo?: string
  website?: string
  location?: string
  employee_count?: number
  industry?: string
  rating: number
  created_at: string
  updated_at: string
}

export interface Resume {
  id: string
  user_id: string
  title: string
  content: string
  file_url?: string
  is_public: boolean
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface Vacancy {
  id: string
  company_id: string
  title: string
  description: string
  salary_min?: number
  salary_max?: number
  currency?: string
  location?: string
  employment_type?: string
  level?: string
  status: 'active' | 'closed' | 'draft' | 'archived'
  applications_count: number
  views_count: number
  created_at: string
  updated_at: string
  deadline?: string
}

export interface Application {
  id: string
  user_id: string
  vacancy_id: string
  resume_id: string
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'withdrawn'
  cover_letter?: string
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category?: string
  created_at: string
}

export interface SavedVacancy {
  id: string
  user_id: string
  vacancy_id: string
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  vacancy_id?: string
  content: string
  is_read: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  reviewer_id: string
  subject_id: string
  subject_type: 'user' | 'company'
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  link?: string
  is_read: boolean
  created_at: string
}

export interface SavedSearch {
  id: string
  user_id: string
  name: string
  filters: Record<string, any>
  created_at: string
  updated_at: string
}

// Auth Types
export interface AuthToken {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface AuthResponse {
  user: User
  token: AuthToken
}

// Request/Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
  }
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
  role: UserRole
}

export interface RegisterFormData {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  phone?: string
  role: UserRole
  company_name?: string
}

export interface VacancyFilterData {
  search?: string
  salary_min?: number
  salary_max?: number
  location?: string
  employment_type?: string
  level?: string
  company_id?: string
  page?: number
  limit?: number
}

export interface ResumeFormData {
  title: string
  content: string
  is_public: boolean
  is_primary: boolean
}

export interface VacancyFormData {
  title: string
  description: string
  salary_min?: number
  salary_max?: number
  currency?: string
  location?: string
  employment_type?: string
  level?: string
  deadline?: string
}
