'use client'

import Link from 'next/link'
import { MapPin, Clock, Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface VacancyCardProps {
  vacancy: any
  isSaved?: boolean
  onSaveToggle?: (vacancyId: string) => void
}

export function VacancyCard({
  vacancy,
  isSaved = false,
  onSaveToggle,
}: VacancyCardProps) {
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
      
      return date.toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return 'Недавно'
    }
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <Link href={`/vacancies/${vacancy.id}`} className="block">
            <h3 className="text-lg font-bold text-[#11a36d] hover:underline mb-1">
              {vacancy.title}
            </h3>
          </Link>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-gray-700">
              {vacancy.company_name}
            </span>
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
            <div className="text-lg font-bold text-gray-900">
              {formatSalary(vacancy.salary_min, vacancy.salary_max)}
            </div>
            {vacancy.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {vacancy.location}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-[#f0f9f4] text-[#11a36d] border-none font-normal">
              {vacancy.employment_type === 'full_time' ? 'Полная занятость' : 
               vacancy.employment_type === 'part_time' ? 'Частичная занятость' : 
               vacancy.employment_type === 'contract' ? 'Контракт' : 
               vacancy.employment_type === 'freelance' ? 'Фриланс' : 'Стажировка'}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(vacancy.created_at)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {onSaveToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                onSaveToggle(vacancy.id.toString())
              }}
              className="text-gray-400 hover:text-[#11a36d]"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-[#11a36d] fill-[#11a36d]" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
