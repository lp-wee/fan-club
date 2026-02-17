'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { mockVacancies, mockCompanies, mockApplications, mockResumes } from '@/lib/mock-data'
import { ROUTES } from '@/lib/utils/constants'
import {
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  Users,
  Eye,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

export default function VacancyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, isAuthenticated, userRole } = useAuth()
  const vacancy = mockVacancies.find((v) => v.id === params.id)
  const company = vacancy ? mockCompanies.find((c) => c.id === vacancy.company_id) : null
  const userApplications = user
    ? mockApplications.filter((a) => a.user_id === user.id && a.vacancy_id === params.id)
    : []
  const userApplication = userApplications[0]
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedResume, setSelectedResume] = useState(mockResumes[0]?.id || '')

  if (!vacancy || !company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Вакансия не найдена</h1>
            <Button onClick={() => router.push(ROUTES.VACANCIES)}>К списку вакансий</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN)
      return
    }

    if (userRole !== 'job_seeker') {
      alert('Only job seekers can apply for jobs')
      return
    }

    if (userApplication) {
      alert('You have already applied for this job')
      return
    }

    setShowApplicationForm(true)
  }

  const handleSubmitApplication = () => {
    if (selectedResume && isAuthenticated && user) {
      // In a real app, this would be sent to the backend
      alert('Application submitted successfully!')
      setShowApplicationForm(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:underline mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">{company.logo}</span>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{vacancy.title}</h1>
                    <Link
                      href={ROUTES.COMPANY_PROFILE(company.id)}
                      className="text-lg text-primary hover:underline"
                    >
                      {company.name}
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge>{vacancy.employment_type}</Badge>
                  <Badge variant="outline">{vacancy.level}</Badge>
                  <Badge variant="outline">{vacancy.status}</Badge>
                </div>
              </div>

              {/* Job Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {vacancy.location && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Местоположение</span>
                      </div>
                      <p className="font-semibold text-sm">{vacancy.location}</p>
                    </CardContent>
                  </Card>
                )}

                {vacancy.salary_max && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Зарплата</span>
                      </div>
                      <p className="font-semibold text-sm">
                        {vacancy.salary_min}-{vacancy.salary_max} ₽
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Откликов</span>
                    </div>
                    <p className="font-semibold text-sm">{vacancy.applications_count || 0}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Просмотров</span>
                    </div>
                    <p className="font-semibold text-sm">{vacancy.views_count || 0}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Описание вакансии</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{vacancy.description || 'Описание отсутствует'}</p>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>О компании {company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{company.description || 'Описание компании отсутствует'}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Отрасль</span>
                      <p className="font-semibold">{company.industry || 'Не указано'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Размер</span>
                      <p className="font-semibold">
                        {company.employee_count || 0} сотр.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Местоположение</span>
                      <p className="font-semibold">{company.location || 'Не указано'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Рейтинг</span>
                      <p className="font-semibold">★ {company.rating || 0}/5</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => router.push(ROUTES.COMPANY_PROFILE(company.id))}
                  >
                    Профиль компании
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Application Status/Button */}
              <Card className="sticky top-24 mb-4">
                <CardContent className="p-6">
                  {userApplication ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-accent">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Статус отклика</span>
                      </div>
                      <div className="bg-accent/10 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-accent capitalize">
                          {userApplication.status}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        Отправлено{' '}
                        {new Date(userApplication.created_at).toLocaleDateString('ru-RU')}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push(ROUTES.CABINET_APPLICATIONS)}
                      >
                        Мои отклики
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {!isAuthenticated ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">
                            Войдите, чтобы откликнуться на вакансию
                          </p>
                          <Button
                            onClick={() => router.push(ROUTES.LOGIN)}
                            className="w-full mb-2"
                          >
                            Вход
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push(ROUTES.REGISTER)}
                          >
                            Создать аккаунт
                          </Button>
                        </>
                      ) : userRole !== 'job_seeker' ? (
                        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-amber-700">
                            На эту вакансию могут откликаться только соискатели
                          </p>
                        </div>
                      ) : (
                        <Button onClick={handleApply} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-lg shadow-lg text-lg">
                          Откликнуться на вакансию
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Job Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Информация о вакансии</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">Опубликовано</span>
                    <p className="font-medium">
                      {new Date(vacancy.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  {vacancy.deadline && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Срок подачи заявок</span>
                      <p className="font-medium">
                        {new Date(vacancy.deadline).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground block mb-1">ID вакансии</span>
                    <p className="font-medium">{vacancy.id}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
