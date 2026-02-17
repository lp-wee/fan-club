'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { VacancyCard } from '@/components/jobs/VacancyCard'
import { VacancyFilters, type VacancyFiltersState } from '@/components/jobs/VacancyFilters'
import { EmptyState } from '@/components/ui/EmptyState'
import { mockVacancies } from '@/lib/mock-data'
import { Search } from 'lucide-react'

export default function VacanciesPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [filters, setFilters] = useState<VacancyFiltersState>({
    search: initialSearch,
    location: '',
    industry: '',
    employmentType: '',
    experienceLevel: '',
    salaryMin: '',
    salaryMax: '',
  })

  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())

  const filteredVacancies = useMemo(() => {
    return mockVacancies.filter((vacancy) => {
      const matchesSearch =
        !filters.search ||
        vacancy.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        vacancy.description.toLowerCase().includes(filters.search.toLowerCase())

      const matchesLocation =
        !filters.location || vacancy.location?.toLowerCase().includes(filters.location.toLowerCase())

      const matchesEmploymentType =
        !filters.employmentType || vacancy.employment_type === filters.employmentType

      const matchesLevel = !filters.experienceLevel || vacancy.level === filters.experienceLevel

      const salaryMin = filters.salaryMin ? parseInt(filters.salaryMin) : 0
      const salaryMax = filters.salaryMax ? parseInt(filters.salaryMax) : Infinity
      const matchesSalary =
        (!vacancy.salary_min || vacancy.salary_min >= salaryMin) &&
        (!vacancy.salary_max || vacancy.salary_max <= salaryMax)

      return (
        matchesSearch &&
        matchesLocation &&
        matchesEmploymentType &&
        matchesLevel &&
        matchesSalary
      )
    })
  }, [filters])

  const handleFiltersChange = (newFilters: VacancyFiltersState) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      location: '',
      industry: '',
      employmentType: '',
      experienceLevel: '',
      salaryMin: '',
      salaryMax: '',
    })
  }

  const handleSaveToggle = (vacancyId: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(vacancyId)) {
        newSet.delete(vacancyId)
      } else {
        newSet.add(vacancyId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-balance text-foreground">Поиск вакансий</h1>
            <p className="text-lg text-muted-foreground mt-3">
              Найдите свою идеальную работу среди тысяч предложений от ведущих компаний
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <VacancyFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onReset={handleResetFilters}
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-8 flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                <div>
                  <p className="text-sm text-muted-foreground">Результаты поиска</p>
                  <p className="text-2xl font-bold text-foreground">{filteredVacancies.length} вакансий</p>
                </div>
              </div>

              {filteredVacancies.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12">
                  <EmptyState
                    icon={Search}
                    title="Вакансии не найдены"
                    description="Попробуйте изменить критерии поиска или очистить фильтры"
                    action={{
                      label: 'Очистить фильтры',
                      onClick: handleResetFilters,
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredVacancies.map((vacancy) => (
                    <VacancyCard
                      key={vacancy.id}
                      vacancy={vacancy}
                      isSaved={savedJobs.has(vacancy.id)}
                      onSaveToggle={handleSaveToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
