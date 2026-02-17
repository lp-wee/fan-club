'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockResumes, mockApplications, mockVacancies, mockJobSeekers } from '@/lib/mock-data'
import { ROUTES } from '@/lib/utils/constants'
import { FileText, Send, Bookmark, Eye, TrendingUp, Clock } from 'lucide-react'

export default function CabinetDashboardPage() {
  const { user } = useAuth()
  const userResumes = user ? mockResumes.filter((r) => r.user_id === user.id) : []
  const userApplications = user ? mockApplications.filter((a) => a.user_id === user.id) : []
  const userJobSeeker = mockJobSeekers[0]

  const applicationStats = {
    pending: userApplications.filter((a) => a.status === 'pending').length,
    reviewing: userApplications.filter((a) => a.status === 'reviewing').length,
    accepted: userApplications.filter((a) => a.status === 'accepted').length,
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userJobSeeker?.first_name}!</h1>
        <p className="text-muted-foreground">
          Manage your job applications and career development
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                <p className="text-3xl font-bold">{userApplications.length}</p>
              </div>
              <Send className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">My Resumes</p>
                <p className="text-3xl font-bold">{userResumes.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Under Review</p>
                <p className="text-3xl font-bold">{applicationStats.reviewing}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Profile Strength</p>
                <p className="text-3xl font-bold">80%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Link href={ROUTES.CABINET_APPLICATIONS}>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {userApplications.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No applications yet. Start exploring jobs!
              </p>
            ) : (
              <div className="space-y-3">
                {userApplications.slice(0, 5).map((app) => {
                  const vacancy = mockVacancies.find((v) => v.id === app.vacancy_id)
                  return (
                    <div key={app.id} className="pb-3 border-b last:border-0">
                      <h4 className="font-semibold text-sm mb-1">{vacancy?.title}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                        <Badge
                          variant={app.status === 'accepted' ? 'default' : 'outline'}
                          className="capitalize"
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Resumes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Resumes</CardTitle>
              <Link href={ROUTES.CABINET_RESUMES}>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {userResumes.length === 0 ? (
              <div>
                <p className="text-muted-foreground text-sm mb-4">
                  Create your first resume to start applying for jobs
                </p>
                <Link href={ROUTES.CABINET_RESUMES}>
                  <Button size="sm" variant="outline">
                    Create Resume
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userResumes.map((resume) => (
                  <div key={resume.id} className="pb-3 border-b last:border-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{resume.title}</h4>
                      {resume.is_primary && (
                        <Badge variant="default" className="text-xs">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Link href={ROUTES.VACANCIES}>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
              <Link href={ROUTES.CABINET_RESUMES}>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Resumes
                </Button>
              </Link>
              <Link href={ROUTES.CABINET_SAVED}>
                <Button variant="outline" className="w-full">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Saved Jobs
                </Button>
              </Link>
              <Link href={ROUTES.CABINET_SETTINGS}>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockVacancies.slice(0, 3).map((vacancy) => (
                <Link key={vacancy.id} href={ROUTES.VACANCY_DETAIL(vacancy.id)}>
                  <div className="p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">{vacancy.title}</h4>
                    <p className="text-xs text-muted-foreground">{vacancy.location}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href={ROUTES.VACANCIES} className="mt-4 block">
              <Button variant="outline" className="w-full">
                See All Recommendations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
