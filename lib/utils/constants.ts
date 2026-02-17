export const INDUSTRIES = [
  { value: 'technology', label: 'Информационные технологии' },
  { value: 'finance', label: 'Финансы' },
  { value: 'healthcare', label: 'Здравоохранение' },
  { value: 'education', label: 'Образование' },
  { value: 'retail', label: 'Розница' },
  { value: 'manufacturing', label: 'Производство' },
  { value: 'construction', label: 'Строительство' },
  { value: 'transportation', label: 'Транспорт' },
  { value: 'hospitality', label: 'Гостинично-ресторанный' },
  { value: 'other', label: 'Прочее' },
]

export const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Полная занятость' },
  { value: 'part_time', label: 'Неполная занятость' },
  { value: 'contract', label: 'Контрактная' },
  { value: 'internship', label: 'Стажировка' },
  { value: 'freelance', label: 'Фриланс' },
]

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Начальный уровень' },
  { value: 'mid', label: 'Средний уровень' },
  { value: 'senior', label: 'Старший специалист' },
  { value: 'lead', label: 'Руководитель' },
  { value: 'executive', label: 'Руководящий состав' },
]

export const CURRENCIES = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'RUB', label: 'RUB' },
  { value: 'GBP', label: 'GBP' },
  { value: 'JPY', label: 'JPY' },
]

export const APPLICATION_STATUS = {
  pending: 'На рассмотрении',
  reviewing: 'Проверяется',
  accepted: 'Принято',
  rejected: 'Отклонено',
  withdrawn: 'Отозвано',
}

export const VACANCY_STATUS = {
  active: 'Активна',
  closed: 'Закрыта',
  draft: 'Черновик',
  archived: 'В архиве',
}

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
}

export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Job Seeker
  VACANCIES: '/vacancies',
  VACANCY_DETAIL: (id: string) => `/vacancies/${id}`,
  COMPANY_PROFILE: (id: string) => `/company/${id}`,
  CABINET: '/cabinet',
  CABINET_DASHBOARD: '/cabinet',
  CABINET_RESUMES: '/cabinet/resumes',
  CABINET_APPLICATIONS: '/cabinet/applications',
  CABINET_SAVED: '/cabinet/saved',
  CABINET_MESSAGES: '/cabinet/messages',
  CABINET_SETTINGS: '/cabinet/settings',

  // Employer
  EMPLOYER_DASHBOARD: '/employer',
  EMPLOYER_VACANCIES: '/employer/vacancies',
  EMPLOYER_VACANCY_NEW: '/employer/vacancy/new',
  EMPLOYER_VACANCY_EDIT: (id: string) => `/employer/vacancy/${id}/edit`,
  EMPLOYER_APPLICATIONS: '/employer/applications',
  EMPLOYER_RESUMES: '/employer/resumes-search',
  EMPLOYER_MESSAGES: '/employer/messages',
  EMPLOYER_COMPANY: '/employer/company',

  // Admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_VACANCIES: '/admin/vacancies',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_REPORTS: '/admin/reports',
}
