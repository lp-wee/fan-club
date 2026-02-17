'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockJobSeekers } from '@/lib/mock-data'
import { Trash2, Ban } from 'lucide-react'

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>

      <div className="space-y-4">
        {mockJobSeekers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-2">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{user.location}</p>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-600">
                    <Ban className="w-4 h-4" />
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
