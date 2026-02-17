'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockApplications, mockVacancies, mockVacancies as allVacancies } from '@/lib/mock-data'
import { Send } from 'lucide-react'

export default function EmployerApplicationsPage() {
  const companyVacancies = allVacancies.filter((v) => v.company_id === 'company-1')
  const vacancyApplications = mockApplications.filter((a) =>
    companyVacancies.some((v) => v.id === a.vacancy_id)
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-muted-foreground">Manage all applications for your vacancies</p>
      </div>

      {vacancyApplications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No applications yet</p>
            <Button variant="outline">Post a Job</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {vacancyApplications.map((app) => {
            const vacancy = mockVacancies.find((v) => v.id === app.vacancy_id)
            return (
              <Card key={app.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">Application for {vacancy?.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Applied {new Date(app.created_at).toLocaleDateString()}
                      </p>
                      {app.cover_letter && (
                        <p className="text-sm mb-3 line-clamp-2">{app.cover_letter}</p>
                      )}
                      <Badge
                        variant={app.status === 'accepted' ? 'default' : 'outline'}
                        className="capitalize"
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Resume
                      </Button>
                      <Button size="sm">Reply</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
