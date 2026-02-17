'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, CURRENCIES } from '@/lib/utils/constants'

export default function NewVacancyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary_min: '',
    salary_max: '',
    currency: 'USD',
    location: '',
    employment_type: '',
    level: '',
    deadline: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to the backend
    alert('Job posted successfully!')
    router.push(ROUTES.EMPLOYER_VACANCIES)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Create a new job vacancy</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Senior React Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the job, requirements, and responsibilities..."
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employment_type">Employment Type</Label>
                <select
                  id="employment_type"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  required
                >
                  <option value="">Select Type</option>
                  {EMPLOYMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="level">Experience Level</Label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  required
                >
                  <option value="">Select Level</option>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., San Francisco, CA"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="salary_min">Minimum Salary</Label>
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
                <Label htmlFor="salary_max">Maximum Salary</Label>
                <Input
                  id="salary_max"
                  name="salary_max"
                  type="number"
                  placeholder="150000"
                  value={formData.salary_max}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr.value} value={curr.value}>
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">Post Job</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
