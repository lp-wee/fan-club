'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from '@/lib/utils/constants'
import { createVacancy } from '@/lib/api-client'
import { Loader2 } from 'lucide-react'

export default function NewVacancyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary_min: '',
    salary_max: '',
    location: '',
    employment_type: '',
    experience_level: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await createVacancy({
        title: formData.title,
        description: formData.description,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : undefined,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : undefined,
        location: formData.location,
        employment_type: formData.employment_type,
        experience_level: formData.experience_level,
      })
      router.push(ROUTES.EMPLOYER_VACANCIES)
    } catch (e: any) {
      setError(e.message || 'Не удалось создать вакансию')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Создать вакансию</h1>
        <p className="text-muted-foreground">Новое объявление о работе</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Детали вакансии</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Название должности</Label>
              <Input
                id="title"
                name="title"
                placeholder="например: Senior React Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Описание вакансии</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Опишите обязанности, требования и условия работы..."
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employment_type">Тип занятости</Label>
                <select
                  id="employment_type"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  required
                >
                  <option value="">Выберите тип</option>
                  {EMPLOYMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="experience_level">Уровень опыта</Label>
                <select
                  id="experience_level"
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  required
                >
                  <option value="">Выберите уровень</option>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Город / Местоположение</Label>
              <Input
                id="location"
                name="location"
                placeholder="например: Москва, Санкт-Петербург или Удалённо"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salary_min">Зарплата от (₽)</Label>
                <Input
                  id="salary_min"
                  name="salary_min"
                  type="number"
                  placeholder="50000"
                  value={formData.salary_min}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="salary_max">Зарплата до (₽)</Label>
                <Input
                  id="salary_max"
                  name="salary_max"
                  type="number"
                  placeholder="150000"
                  value={formData.salary_max}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Опубликовать вакансию
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
