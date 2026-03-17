'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/lib/utils/constants'
import { Plus, Loader2, Briefcase, Eye, Users } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { fetchEmployerVacancies } from '@/lib/api-client'

export default function EmployerVacanciesPage() {
  const [vacancies, setVacancies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVacancies()
  }, [])

  const loadVacancies = async () => {
    try {
      const data = await fetchEmployerVacancies()
      setVacancies(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Мои вакансии</h1>
          <p className="text-muted-foreground">Управляйте своими объявлениями</p>
        </div>
        <Link href={ROUTES.EMPLOYER_VACANCY_NEW}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Создать вакансию
          </Button>
        </Link>
      </div>

      {vacancies.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Вакансий ещё нет"
          description="Создайте первую вакансию, чтобы начать поиск кандидатов"
        />
      ) : (
        <div className="space-y-4">
          {vacancies.map((vacancy: any) => (
            <Card key={vacancy.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{vacancy.title}</h3>
                      <Badge variant={vacancy.is_active ? 'default' : 'outline'}>
                        {vacancy.is_active ? 'Активна' : 'Закрыта'}
                      </Badge>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" />{vacancy.applications_count} откликов</span>
                      <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{vacancy.views_count} просмотров</span>
                      <span>Создана {new Date(vacancy.created_at).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                  <Link href={ROUTES.EMPLOYER_VACANCY_EDIT(vacancy.id.toString())}>
                    <Button variant="outline" size="sm">Редактировать</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
