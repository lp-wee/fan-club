'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/lib/utils/constants'
import { Bookmark } from 'lucide-react'

export default function SavedJobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
        <p className="text-muted-foreground">Your bookmarked job listings</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">No saved jobs yet</p>
          <Link href={ROUTES.VACANCIES}>
            <Button>Explore Jobs</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
