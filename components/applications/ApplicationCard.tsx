'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User, Calendar, MapPin, FileText } from 'lucide-react'
import { Application } from '@/lib/types'

interface ApplicationCardProps {
  application: Application
  variant?: 'seeker' | 'employer'
  onViewDetails?: () => void
  onChangeStatus?: (status: string) => void
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Рассмотрение' },
  accepted: { bg: 'bg-green-50', text: 'text-green-700', label: 'Принята' },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', label: 'Отклонена' },
  interview: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Интервью' },
  offered: { bg: 'bg-green-50', text: 'text-green-700', label: 'Предложение' },
}

export function ApplicationCard({
  application,
  variant = 'seeker',
  onViewDetails,
  onChangeStatus,
}: ApplicationCardProps) {
  const statusInfo = STATUS_COLORS[application.status] || STATUS_COLORS.pending

  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          {variant === 'seeker' ? (
            <>
              <h3 className="font-semibold text-lg text-foreground">
                {application.vacancyTitle}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {application.companyName}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-lg text-foreground">
                {application.candidateName}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                На должность: {application.vacancyTitle}
              </p>
            </>
          )}
        </div>

        <Badge className={`${statusInfo.bg} ${statusInfo.text} border-0`}>
          {statusInfo.label}
        </Badge>
      </div>

      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Подана: {new Date(application.appliedDate).toLocaleDateString('ru-RU')}
        </div>
        {variant === 'seeker' && application.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {application.location}
          </div>
        )}
      </div>

      {application.coverLetter && (
        <div className="bg-secondary/50 rounded p-3 mb-4">
          <p className="text-sm text-foreground line-clamp-3">
            {application.coverLetter}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onViewDetails}
        >
          <FileText className="w-4 h-4 mr-2" />
          Детали
        </Button>

        {variant === 'employer' && onChangeStatus && (
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onChangeStatus(application.status)}
          >
            Изменить статус
          </Button>
        )}
      </div>
    </div>
  )
}
