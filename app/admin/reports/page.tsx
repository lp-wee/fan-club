'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockVacancies, mockApplications, mockJobSeekers, mockCompanies } from '@/lib/mock-data'

export default function AdminReportsPage() {
  const reportData = {
    newUsersThisMonth: 12,
    newJobsThisMonth: 8,
    activeApplications: mockApplications.length,
    totalRevenue: '$125,000',
    conversionRate: '3.2%',
    averageTimeToHire: '14 days',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">Platform statistics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">New Users This Month</p>
            <p className="text-3xl font-bold">{reportData.newUsersThisMonth}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">New Jobs This Month</p>
            <p className="text-3xl font-bold">{reportData.newJobsThisMonth}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Active Applications</p>
            <p className="text-3xl font-bold">{reportData.activeApplications}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">{reportData.totalRevenue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
            <p className="text-3xl font-bold">{reportData.conversionRate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Avg. Time to Hire</p>
            <p className="text-3xl font-bold">{reportData.averageTimeToHire}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <p className="text-2xl font-bold">{mockJobSeekers.length + 5}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Companies</p>
              <p className="text-2xl font-bold">{mockCompanies.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Vacancies</p>
              <p className="text-2xl font-bold">{mockVacancies.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
              <p className="text-2xl font-bold">4.6/5</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Satisfaction Rate</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Sessions</p>
              <p className="text-2xl font-bold">542</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
