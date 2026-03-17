'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES, APPLICATION_STATUS } from '@/lib/utils/constants'
import { Briefcase, Send, Eye, TrendingUp, Plus } from 'lucide-react'
import { fetchEmployerVacancies, fetchApplications } from '@/lib/api-client'

export default function EmployerDashboardPage() {
  const { user } = useAuth()
  const [vacancies, setVacancies] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    fetchEmployerVacancies().then(setVacancies).catch(console.error)
    fetchApplications().then(setApplications).catch(console.error)
  }, [])

  const totalViews = vacancies.reduce((acc, v) => acc + (v.views_count || 0), 0)
  const reviewing = applications.filter(a => a.status === 'reviewing').length
  const companyName = user?.first_name || 'Компания'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
        <p className="text-muted-foreground">Добро пожаловать, {companyName}! Управляйте вакансиями и откликами.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Активных вакансий</p>
                <p className="text-3xl font-bold">{vacancies.filter(v => v.is_active).length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Откликов</p>
                <p className="text-3xl font-bold">{applications.length}</p>
              </div>
              <Send className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Просмотров</p>
                <p className="text-3xl font-bold">{totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">На рассмотрении</p>
                <p className="text-3xl font-bold">{reviewing}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Мои вакансии</CardTitle>
              <Link href={ROUTES.EMPLOYER_VACANCY_NEW}>
                <Button variant="ghost" size="sm"><Plus className="w-4 h-4" /></Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {vacancies.length === 0 ? (
              <div>
                <p className="text-muted-foreground text-sm mb-3">Нет активных вакансий</p>
                <Link href={ROUTES.EMPLOYER_VACANCY_NEW}>
                  <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-1" />Создать вакансию</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {vacancies.slice(0, 5).map((vacancy) => (
                  <div key={vacancy.id} className="pb-3 border-b last:border-0">
                    <h4 className="font-semibold text-sm mb-1">{vacancy.title}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{vacancy.applications_count} откликов</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${vacancy.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {vacancy.is_active ? 'Активна' : 'Закрыта'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Последние отклики</CardTitle>
              <Link href={ROUTES.EMPLOYER_APPLICATIONS}>
                <Button variant="ghost" size="sm">Все</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-muted-foreground text-sm">Откликов пока нет</p>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="pb-3 border-b last:border-0">
                    <p className="text-xs text-muted-foreground mb-1">{new Date(app.created_at).toLocaleDateString('ru-RU')}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{app.first_name} {app.last_name}</p>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {APPLICATION_STATUS[app.status as keyof typeof APPLICATION_STATUS] || app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Быстрые действия</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Link href={ROUTES.EMPLOYER_VACANCY_NEW}>
                <Button variant="outline" className="w-full"><Plus className="w-4 h-4 mr-2" />Новая вакансия</Button>
              </Link>
              <Link href={ROUTES.EMPLOYER_VACANCIES}>
                <Button variant="outline" className="w-full"><Briefcase className="w-4 h-4 mr-2" />Вакансии</Button>
              </Link>
              <Link href={ROUTES.EMPLOYER_APPLICATIONS}>
                <Button variant="outline" className="w-full"><Send className="w-4 h-4 mr-2" />Отклики</Button>
              </Link>
              <Link href={ROUTES.EMPLOYER_COMPANY}>
                <Button variant="outline" className="w-full">Профиль компании</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
