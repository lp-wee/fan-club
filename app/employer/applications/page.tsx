'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { fetchApplications, updateApplicationStatus } from '@/lib/api-client'
import { APPLICATION_STATUS } from '@/lib/utils/constants'

export default function EmployerApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const data = await fetchApplications()
      setApplications(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateApplicationStatus(id, status)
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    } catch (e) {
      console.error(e)
    }
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    reviewing: 'bg-blue-50 text-blue-700 border-blue-200',
    accepted: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
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
      <div>
        <h1 className="text-3xl font-bold">Отклики соискателей</h1>
        <p className="text-muted-foreground mt-2">Управляйте откликами на ваши вакансии</p>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={Send}
          title="Откликов пока нет"
          description="Отклики от соискателей появятся здесь после публикации вакансий"
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app: any) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-lg">
                        {app.first_name} {app.last_name}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[app.status] || ''}`}>
                        {APPLICATION_STATUS[app.status as keyof typeof APPLICATION_STATUS] || app.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Вакансия: <span className="font-medium text-gray-700">{app.vacancy_title}</span>
                    </p>
                    {app.skills && app.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {app.skills.slice(0, 5).map((skill: string) => (
                          <span key={skill} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{skill}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Получен {new Date(app.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  {app.status === 'pending' || app.status === 'reviewing' ? (
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50"
                        onClick={() => handleStatusChange(app.id, 'accepted')}>
                        Принять
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50"
                        onClick={() => handleStatusChange(app.id, 'rejected')}>
                        Отклонить
                      </Button>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
