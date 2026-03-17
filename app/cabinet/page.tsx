'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES, APPLICATION_STATUS } from '@/lib/utils/constants'
import { FileText, Send, Bookmark, Eye, TrendingUp, Clock } from 'lucide-react'
import { fetchApplications, fetchResumes } from '@/lib/api-client'

export default function CabinetDashboardPage() {
  const { user } = useAuth()
  const [resumes, setResumes] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    fetchResumes().then(setResumes).catch(console.error)
    fetchApplications().then(setApplications).catch(console.error)
  }, [])

  const stats = {
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
  }

  const firstName = user?.first_name || user?.email?.split('@')[0] || ''

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Добро пожаловать, {firstName}!</h1>
        <p className="text-muted-foreground">Управляйте откликами и развивайте карьеру</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Всего откликов</p>
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
                <p className="text-sm text-muted-foreground mb-1">Мои резюме</p>
                <p className="text-3xl font-bold">{resumes.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">На рассмотрении</p>
                <p className="text-3xl font-bold">{stats.reviewing}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Принято</p>
                <p className="text-3xl font-bold">{stats.accepted}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Последние отклики</CardTitle>
              <Link href={ROUTES.CABINET_APPLICATIONS}>
                <Button variant="ghost" size="sm">Все</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-muted-foreground text-sm">Откликов пока нет. Начните искать работу!</p>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="pb-3 border-b last:border-0">
                    <h4 className="font-semibold text-sm mb-1">{app.vacancy_title}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{app.company_name}</p>
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Мои резюме</CardTitle>
              <Link href={ROUTES.CABINET_RESUMES}>
                <Button variant="ghost" size="sm">Управление</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div>
                <p className="text-muted-foreground text-sm mb-4">Создайте первое резюме, чтобы откликаться на вакансии</p>
                <Link href={ROUTES.CABINET_RESUMES}>
                  <Button size="sm" variant="outline">Создать резюме</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div key={resume.id} className="pb-3 border-b last:border-0">
                    <h4 className="font-semibold text-sm">{resume.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Добавлено {new Date(resume.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Быстрые действия</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href={ROUTES.VACANCIES}>
                <Button variant="outline" className="w-full"><Eye className="w-4 h-4 mr-2" />Найти вакансии</Button>
              </Link>
              <Link href={ROUTES.CABINET_RESUMES}>
                <Button variant="outline" className="w-full"><FileText className="w-4 h-4 mr-2" />Резюме</Button>
              </Link>
              <Link href={ROUTES.CABINET_SAVED}>
                <Button variant="outline" className="w-full"><Bookmark className="w-4 h-4 mr-2" />Сохранённые</Button>
              </Link>
              <Link href={ROUTES.CABINET_SETTINGS}>
                <Button variant="outline" className="w-full">Редактировать профиль</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
