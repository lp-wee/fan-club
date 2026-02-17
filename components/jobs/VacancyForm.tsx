'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
} from '@/lib/utils/constants'
import { Vacancy } from '@/lib/types'

interface VacancyFormProps {
  initialData?: Partial<Vacancy>
  isLoading?: boolean
  onSubmit: (data: Partial<Vacancy>) => void
}

const SKILL_SUGGESTIONS = [
  'React',
  'JavaScript',
  'TypeScript',
  'Python',
  'Node.js',
  'SQL',
  'CSS',
  'HTML',
  'Git',
  'Docker',
  'AWS',
  'DevOps',
]

export function VacancyForm({
  initialData,
  isLoading = false,
  onSubmit,
}: VacancyFormProps) {
  const [formData, setFormData] = useState<Partial<Vacancy>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    requirements: initialData?.requirements || '',
    location: initialData?.location || '',
    employmentType: initialData?.employmentType || '',
    experienceLevel: initialData?.experienceLevel || '',
    salaryMin: initialData?.salaryMin || 0,
    salaryMax: initialData?.salaryMax || 0,
    requiredSkills: initialData?.requiredSkills || [],
  })

  const [skillInput, setSkillInput] = useState('')

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddSkill = (skill: string) => {
    const skillsSet = new Set(formData.requiredSkills || [])
    skillsSet.add(skill)
    handleChange('requiredSkills', Array.from(skillsSet))
    setSkillInput('')
  }

  const handleRemoveSkill = (skill: string) => {
    const filtered = (formData.requiredSkills || []).filter((s) => s !== skill)
    handleChange('requiredSkills', filtered)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Основная информация</h3>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Должность
          </label>
          <Input
            placeholder="Например: Senior React Developer"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Описание вакансии
          </label>
          <Textarea
            placeholder="Подробное описание вакансии..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={5}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Требования
          </label>
          <Textarea
            placeholder="Требования к кандидату..."
            value={formData.requirements}
            onChange={(e) => handleChange('requirements', e.target.value)}
            rows={4}
            required
          />
        </div>
      </div>

      {/* Location & Type */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Условия</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Город</label>
            <Input
              placeholder="Москва"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Тип занятости
            </label>
            <Select
              value={formData.employmentType}
              onValueChange={(v) => handleChange('employmentType', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Уровень опыта
          </label>
          <Select
            value={formData.experienceLevel}
            onValueChange={(v) => handleChange('experienceLevel', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите уровень" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Salary */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Зарплата</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Минимальная зарплата ($)
            </label>
            <Input
              type="number"
              placeholder="0"
              value={formData.salaryMin}
              onChange={(e) => handleChange('salaryMin', parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Максимальная зарплата ($)
            </label>
            <Input
              type="number"
              placeholder="0"
              value={formData.salaryMax}
              onChange={(e) => handleChange('salaryMax', parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Требуемые навыки</h3>

        <div className="flex gap-2">
          <Input
            placeholder="Добавьте навык..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && skillInput.trim()) {
                e.preventDefault()
                handleAddSkill(skillInput.trim())
              }
            }}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (skillInput.trim()) {
                handleAddSkill(skillInput.trim())
              }
            }}
          >
            Добавить
          </Button>
        </div>

        {/* Suggestions */}
        {!skillInput && (
          <div className="flex flex-wrap gap-2">
            {SKILL_SUGGESTIONS.map((skill) => (
              <Button
                key={skill}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddSkill(skill)}
              >
                + {skill}
              </Button>
            ))}
          </div>
        )}

        {/* Selected Skills */}
        {formData.requiredSkills && formData.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {formData.requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="pl-3">
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : 'Сохранить вакансию'}
        </Button>
        <Button type="button" variant="outline" className="flex-1">
          Отмена
        </Button>
      </div>
    </form>
  )
}
