'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockResumes } from '@/lib/mock-data'
import { FileText, Download, Trash2, Plus } from 'lucide-react'

export default function ResumesPage() {
  const { user } = useAuth()
  const userResumes = user ? mockResumes.filter((r) => r.user_id === user.id) : []
  const [selectedResume, setSelectedResume] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Resumes</h1>
          <p className="text-muted-foreground">Manage and organize your resumes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Resume
        </Button>
      </div>

      {userResumes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No resumes yet</p>
            <Button>Create Your First Resume</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userResumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">{resume.title}</h3>
                      {resume.is_primary && (
                        <Badge variant="default">Primary</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Updated {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-foreground mb-4 line-clamp-2">
                      {resume.content}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="capitalize">
                        {resume.is_public ? 'Public' : 'Private'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedResume(resume.id)}
                    >
                      <Download className="w-4 h-4" />
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
      )}
    </div>
  )
}
