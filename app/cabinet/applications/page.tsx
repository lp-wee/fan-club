'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockApplications, mockVacancies, mockCompanies } from '@/lib/mock-data'
import { ROUTES } from '@/lib/utils/constants'
import { Send, Calendar, MapPin } from 'lucide-react'

const STATUS_COLORS = {
  pending: 'outline',
  reviewing: 'secondary',
  accepted: 'default',
  rejected: 'destructive',
  withdrawn: 'outline',
} as const

export default function ApplicationsPage() {
  const { user } = useAuth()
  const userApplications = user ? mockApplications.filter((a) => a.user_id === user.id) : []

  const groupedApplications = {
    accepted: userApplications.filter((a) => a.status === 'accepted'),
    reviewing: userApplications.filter((a) => a.status === 'reviewing'),
    pending: userApplications.filter((a) => a.status === 'pending'),
    rejected: userApplications.filter((a) => a.status === 'rejected'),
  }

  const ApplicationCard = ({ applicationId }: { applicationId: string }) => {
    const application = userApplications.find((a) => a.id === applicationId)
    const vacancy = application ? mockVacancies.find((v) => v.id === application.vacancy_id) : null
    const company = vacancy ? mockCompanies.find((c) => c.id === vacancy.company_id) : null

    if (!application || !vacancy || !company) return null

    return (
      <Link
        href={ROUTES.VACANCY_DETAIL(vacancy.id)}
        className="block"
      >
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{company.logo}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{vacancy.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{company.name}</p>

                <div className="flex flex-wrap gap-4 mb-3 text-sm">
                  {vacancy.location && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {vacancy.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Applied {new Date(application.created_at).toLocaleDateString()}
                  </div>
                </div>

                <Badge
                  variant={STATUS_COLORS[application.status] as any}
                  className="capitalize"
                >
                  {application.status}
                </Badge>
              </div>

              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track the status of all your job applications</p>
      </div>

      {userApplications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No applications yet</p>
            <Link href={ROUTES.VACANCIES}>
              <Button>Browse Jobs</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {groupedApplications.accepted.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Accepted ({groupedApplications.accepted.length})</h2>
              <div className="space-y-3">
                {groupedApplications.accepted.map((app) => (
                  <ApplicationCard key={app.id} applicationId={app.id} />
                ))}
              </div>
            </div>
          )}

          {groupedApplications.reviewing.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Under Review ({groupedApplications.reviewing.length})</h2>
              <div className="space-y-3">
                {groupedApplications.reviewing.map((app) => (
                  <ApplicationCard key={app.id} applicationId={app.id} />
                ))}
              </div>
            </div>
          )}

          {groupedApplications.pending.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Pending ({groupedApplications.pending.length})</h2>
              <div className="space-y-3">
                {groupedApplications.pending.map((app) => (
                  <ApplicationCard key={app.id} applicationId={app.id} />
                ))}
              </div>
            </div>
          )}

          {groupedApplications.rejected.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Rejected ({groupedApplications.rejected.length})</h2>
              <div className="space-y-3">
                {groupedApplications.rejected.map((app) => (
                  <ApplicationCard key={app.id} applicationId={app.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
