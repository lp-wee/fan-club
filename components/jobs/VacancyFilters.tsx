'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from '@/lib/utils/constants'

export interface VacancyFiltersState {
  search: string
  location: string
  industry: string
  employmentType: string
  experienceLevel: string
  salaryMin: string
  salaryMax: string
}

interface VacancyFiltersProps {
  filters: VacancyFiltersState
  onFiltersChange: (filters: VacancyFiltersState) => void
  onReset?: () => void
}

export function VacancyFilters({
  filters,
  onFiltersChange,
  onReset,
}: VacancyFiltersProps) {
  const handleChange = (key: keyof VacancyFiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const activeFilters = Object.values(filters).filter(v => v !== '').length

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Поиск</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Профессия или навык"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="pl-10 border-gray-200 focus:ring-1 focus:ring-[#11a36d] focus:border-[#11a36d]"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Город</h3>
        <Input
          placeholder="Например, Москва"
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="border-gray-200"
        />
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Тип работы</h3>
        <Select value={filters.employmentType} onValueChange={(v) => handleChange('employmentType', v)}>
          <SelectTrigger className="border-gray-200">
            <SelectValue placeholder="Любой" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Любой</SelectItem>
            <SelectItem value="full_time">Полная занятость</SelectItem>
            <SelectItem value="part_time">Частичная занятость</SelectItem>
            <SelectItem value="contract">Контракт</SelectItem>
            <SelectItem value="freelance">Фриланс</SelectItem>
            <SelectItem value="internship">Стажировка</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Опыт</h3>
        <Select value={filters.experienceLevel} onValueChange={(v) => handleChange('experienceLevel', v)}>
          <SelectTrigger className="border-gray-200">
            <SelectValue placeholder="Любой" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Любой</SelectItem>
            <SelectItem value="entry">Без опыта</SelectItem>
            <SelectItem value="mid">1-3 года</SelectItem>
            <SelectItem value="senior">3-6 лет</SelectItem>
            <SelectItem value="lead">Более 6 лет</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Зарплата</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="От"
            value={filters.salaryMin}
            onChange={(e) => handleChange('salaryMin', e.target.value)}
            className="border-gray-200"
          />
          <Input
            type="number"
            placeholder="До"
            value={filters.salaryMax}
            onChange={(e) => handleChange('salaryMax', e.target.value)}
            className="border-gray-200"
          />
        </div>
      </div>

      {activeFilters > 0 && (
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
          onClick={onReset}
        >
          <X className="w-4 h-4 mr-2" />
          Сбросить фильтры
        </Button>
      )}
    </div>
  )
}
