'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockResumes } from '@/lib/mock-data'
import { FileText } from 'lucide-react'

export default function ResumesSearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Search Resumes</h1>
        <p className="text-muted-foreground">Find and review candidate resumes</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockResumes.slice(0, 3).map((resume) => (
              <div key={resume.id} className="pb-4 border-b last:border-0">
                <h3 className="font-semibold mb-2">{resume.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {resume.content}
                </p>
                <Button size="sm">View Resume</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
