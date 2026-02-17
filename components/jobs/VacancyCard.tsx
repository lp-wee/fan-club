'use client'

import Link from 'next/link'
import { MapPin, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Vacancy } from '@/lib/types'

interface VacancyCardProps {
  vacancy: any
  isSaved?: boolean
  onSaveToggle?: (vacancyId: string) => void
  variant?: 'default' | 'compact'
}

export function VacancyCard({
  vacancy,
  isSaved = false,
  onSaveToggle,
  variant = 'default',
}: VacancyCardProps) {
  const isCompact = variant === 'compact'
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Зарплата не указана'
    if (!min) return `до ${max} ₽`
    if (!max) return `от ${min} ₽`
    return `${min} - ${max} ₽`
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      
      if (days === 0) return 'Сегодня'
      if (days === 1) return 'Вчера'
      if (days < 7) return `${days} дн. назад`
      if (days < 30) return `${Math.floor(days / 7)} нед. назад`
      
      return date.toLocaleDateString('ru-RU', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return 'Недавно'
    }
  }

  return (
    <Link href={`/vacancies/${vacancy.id}`}>
      <div
        className="rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:bg-gray-50 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-2">
              {vacancy.title}
            </h3>

            <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
              {vacancy.company_name || 'Компания не указана'}
            </p>

            {/* Key info row */}
            <div className="flex flex-wrap gap-4 mt-5">
              {(vacancy.salary_min || vacancy.salary_max) && (
                <div className="flex items-center gap-2 text-lg font-bold text-primary">
                  <span>₽</span>
                  <span>{formatSalary(vacancy.salary_min, vacancy.salary_max)}</span>
                </div>
              )}
              {vacancy.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{vacancy.location}</span>
                </div>
              )}
            </div>

            {!isCompact && (
              <>
                {vacancy.description && (
                  <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                    {vacancy.description}
                  </p>
                )}

                {vacancy.employment_type && (
                  <div className="mt-4">
                    <Badge className="bg-blue-100 text-primary hover:bg-blue-200">
                      {vacancy.employment_type}
                    </Badge>
                  </div>
                )}
              </>
            )}

            <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(vacancy.created_at)}
              </span>
              {vacancy.applications_count && (
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">
                  {vacancy.applications_count} откликов
                </span>
              )}
            </div>
          </div>

          {onSaveToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSaveToggle(vacancy.id)
              }}
              className="flex-shrink-0 mt-1 hover:bg-blue-100 transition-colors"
              title={isSaved ? 'Убрать из сохранённых' : 'Сохранить'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400 hover:text-primary" />
              )}
            </Button>
          )}
        </div>
      </div>
    </Link>
  )
}
