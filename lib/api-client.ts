const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface FetchOptions extends RequestInit {
  skipErrorHandling?: boolean
}

async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipErrorHandling, ...fetchOptions } = options

  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      if (!skipErrorHandling) {
        console.error(`[API Error] ${endpoint}:`, error)
      }
      throw new Error(error.error || `API Error: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (!skipErrorHandling) {
      console.error(`[API Fetch Error] ${endpoint}:`, error)
    }
    throw error
  }
}

// ==================== VACANCIES ====================

export async function fetchVacancies(filters?: {
  search?: string
  location?: string
  employmentType?: string
  experienceLevel?: string
  salaryMin?: number
  salaryMax?: number
}) {
  const params = new URLSearchParams()

  if (filters?.search) params.append('search', filters.search)
  if (filters?.location) params.append('location', filters.location)
  if (filters?.employmentType) params.append('employmentType', filters.employmentType)
  if (filters?.experienceLevel) params.append('experienceLevel', filters.experienceLevel)
  if (filters?.salaryMin) params.append('salaryMin', filters.salaryMin.toString())
  if (filters?.salaryMax) params.append('salaryMax', filters.salaryMax.toString())

  return apiFetch(`/vacancies?${params.toString()}`)
}

export async function fetchVacancy(id: string) {
  return apiFetch(`/vacancies/${id}`)
}

export async function createVacancy(data: {
  company_id: number
  title: string
  description: string
  salary_min?: number
  salary_max?: number
  employment_type: string
  experience_level: string
  location?: string
  skills_required?: string[]
}) {
  return apiFetch('/vacancies', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateVacancy(
  id: string,
  data: {
    title?: string
    description?: string
    salary_min?: number
    salary_max?: number
    employment_type?: string
    experience_level?: string
    location?: string
    is_active?: boolean
  }
) {
  return apiFetch(`/vacancies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// ==================== APPLICATIONS ====================

export async function fetchApplications(filters?: {
  job_seeker_id?: number
  vacancy_id?: number
}) {
  const params = new URLSearchParams()

  if (filters?.job_seeker_id) params.append('job_seeker_id', filters.job_seeker_id.toString())
  if (filters?.vacancy_id) params.append('vacancy_id', filters.vacancy_id.toString())

  return apiFetch(`/applications?${params.toString()}`)
}

export async function createApplication(data: {
  vacancy_id: number
  job_seeker_id: number
  resume_id?: number
  cover_letter?: string
}) {
  return apiFetch('/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateApplicationStatus(id: number, status: string) {
  return apiFetch(`/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })
}

// ==================== SAVED JOBS ====================

export async function fetchSavedJobs(jobSeekerId: number) {
  return apiFetch(`/saved-jobs/${jobSeekerId}`)
}

export async function toggleSaveJob(jobSeekerId: number, vacancyId: number) {
  return apiFetch(`/saved-jobs/${jobSeekerId}/${vacancyId}`, {
    method: 'POST',
  })
}

// ==================== COMPANIES ====================

export async function fetchCompany(id: number) {
  return apiFetch(`/companies/${id}`)
}

// ==================== HEALTH CHECK ====================

export async function checkAPIHealth() {
  try {
    return await apiFetch('/health')
  } catch (error) {
    console.error('[API] Health check failed:', error)
    return null
  }
}
