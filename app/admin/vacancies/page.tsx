'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockVacancies } from '@/lib/mock-data'
import { Eye, Trash2 } from 'lucide-react'

export default function AdminVacanciesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vacancies Moderation</h1>
        <p className="text-muted-foreground">Review and manage job postings</p>
      </div>

      <div className="space-y-4">
        {mockVacancies.slice(0, 5).map((vacancy) => (
          <Card key={vacancy.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{vacancy.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {vacancy.views_count} views • {vacancy.applications_count} applications
                  </p>
                  <Badge variant={vacancy.status === 'active' ? 'default' : 'secondary'}>
                    {vacancy.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
