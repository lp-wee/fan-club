'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockVacancies } from '@/lib/mock-data'
import { ROUTES } from '@/lib/utils/constants'
import { Edit, Trash2, Plus, Eye } from 'lucide-react'

export default function EmployerVacanciesPage() {
  const companyVacancies = mockVacancies.filter((v) => v.company_id === 'company-1')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Vacancies</h1>
          <p className="text-muted-foreground">Manage your job postings</p>
        </div>
        <Link href={ROUTES.EMPLOYER_VACANCY_NEW}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {companyVacancies.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No vacancies posted yet</p>
            <Link href={ROUTES.EMPLOYER_VACANCY_NEW}>
              <Button>Create Your First Job Post</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {companyVacancies.map((vacancy) => (
            <Card key={vacancy.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{vacancy.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{vacancy.employment_type}</Badge>
                      <Badge variant="outline">{vacancy.level}</Badge>
                      <Badge variant={vacancy.status === 'active' ? 'default' : 'secondary'}>
                        {vacancy.status}
                      </Badge>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span>{vacancy.applications_count} applications</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {vacancy.views_count} views
                      </span>
                      <span>Posted {new Date(vacancy.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link href={ROUTES.EMPLOYER_VACANCY_EDIT(vacancy.id)}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
