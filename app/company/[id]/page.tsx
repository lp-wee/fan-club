'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockCompanies, mockVacancies } from '@/lib/mock-data'
import { ROUTES } from '@/lib/utils/constants'
import { MapPin, Globe, Users, Star, Briefcase, ArrowLeft } from 'lucide-react'

export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const company = mockCompanies.find((c) => c.id === params.id)
  const companyVacancies = company ? mockVacancies.filter((v) => v.company_id === company.id) : []

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Компания не найдена</h1>
            <Button onClick={() => router.push(ROUTES.HOME)}>На главную</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
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

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start gap-6 mb-6">
              <span className="text-6xl">{company.logo}</span>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{company.rating}</span>
                  <span className="text-muted-foreground">(45 reviews)</span>
                </div>
                <p className="text-lg text-muted-foreground">{company.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>О компании</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Отрасль</p>
                  <p className="font-semibold">{company.industry || 'Не указано'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Размер</p>
                  <p className="font-semibold">{company.employee_count || 0} сотр.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Местоположение</p>
                  </div>
                  <p className="font-semibold">{company.location || 'Не указано'}</p>
                </div>
                {company.website && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Веб-сайт</p>
                    </div>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {company.website}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">
                    {companyVacancies.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Открытых вакансий</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">
                    {companyVacancies.reduce((sum, v) => sum + (v.applications_count || 0), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Всего откликов</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Вакансии</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {companyVacancies.length > 0
                    ? `${companyVacancies.length} открытых вакансий`
                    : 'Нет открытых вакансий'}
                </p>
                <Link href={ROUTES.VACANCIES}>
                  <Button className="w-full">Смотреть вакансии</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Open Positions */}
          {companyVacancies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Открытые вакансии</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companyVacancies.map((vacancy) => (
                    <Link
                      key={vacancy.id}
                      href={ROUTES.VACANCY_DETAIL(vacancy.id)}
                      className="block p-4 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold mb-2">{vacancy.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {vacancy.location || 'Не указано'}
                        </div>
                        {vacancy.salary_max && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span>{vacancy.salary_min}-{vacancy.salary_max} ₽</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{vacancy.employment_type || 'Не указано'}</Badge>
                        <Badge variant="outline">{vacancy.level || 'Не указано'}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
