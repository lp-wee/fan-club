'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockReviews = [
  {
    id: '1',
    reviewer: 'John Developer',
    subject: 'TechCorp Solutions',
    rating: 5,
    comment: 'Great company to work for',
    type: 'company',
  },
  {
    id: '2',
    reviewer: 'Jane Smith',
    subject: 'CloudBase Inc',
    rating: 4,
    comment: 'Good work environment',
    type: 'company',
  },
]

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews Moderation</h1>
        <p className="text-muted-foreground">Review and moderate user reviews</p>
      </div>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{review.reviewer}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Reviewed {review.subject}
                  </p>
                  <p className="text-sm mb-2">{review.comment}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{'★'.repeat(review.rating)}</span>
                    <Badge variant="outline" className="capitalize">
                      {review.type}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-destructive">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
