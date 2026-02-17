'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { INDUSTRIES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from '@/lib/utils/constants'

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

  const activeFilters = Object.values(filters).filter(
    (v) => v && v !== ''
  ).length

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Должность, компания..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="pl-12 h-11 border-gray-200 focus:border-primary focus:ring-primary bg-gray-50"
        />
      </div>

      {/* Main Filters */}
      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold mb-3 block text-foreground">Город</label>
          <Input
            placeholder="Москва, Санкт-Петербург..."
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="h-10 border-gray-200 focus:border-primary bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-3 block text-foreground">Тип занятости</label>
          <Select value={filters.employmentType} onValueChange={(v) => handleChange('employmentType', v)}>
            <SelectTrigger className="h-10 border-gray-200 bg-gray-50">
              <SelectValue placeholder="Все типы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все типы</SelectItem>
              {EMPLOYMENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters */}
      <Accordion type="single" collapsible className="border-0">
        <AccordionItem value="advanced" className="border-0">
          <AccordionTrigger className="px-0 py-3 hover:no-underline font-semibold text-foreground">
            Дополнительные фильтры
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-primary">
                {activeFilters}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            {/* Industry */}
            <div>
              <label className="text-sm font-medium mb-2 block">Индустрия</label>
              <Select value={filters.industry} onValueChange={(v) => handleChange('industry', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите индустрию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все индустрии</SelectItem>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="text-sm font-medium mb-2 block">Уровень опыта</label>
              <Select value={filters.experienceLevel} onValueChange={(v) => handleChange('experienceLevel', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все уровни</SelectItem>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Зарплатный диапазон</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="От"
                  value={filters.salaryMin}
                  onChange={(e) => handleChange('salaryMin', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="До"
                  value={filters.salaryMax}
                  onChange={(e) => handleChange('salaryMax', e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      {activeFilters > 0 && (
        <Button
          variant="outline"
          className="w-full justify-center gap-2"
          onClick={onReset}
        >
          <X className="w-4 h-4" />
          Очистить фильтры
        </Button>
      )}
    </div>
  )
}
