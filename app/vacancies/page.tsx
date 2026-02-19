'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { VacancyCard } from '@/components/jobs/VacancyCard'
import { VacancyFilters, type VacancyFiltersState } from '@/components/jobs/VacancyFilters'
import { EmptyState } from '@/components/ui/EmptyState'
import { Search } from 'lucide-react'
import { fetchVacancies } from '@/lib/api-client'

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

  const [vacancies, setVacancies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadVacancies = async () => {
      setLoading(true)
      try {
        const data = await fetchVacancies({
          search: filters.search,
          location: filters.location,
          employmentType: filters.employmentType,
          experienceLevel: filters.experienceLevel,
          salaryMin: filters.salaryMin ? parseInt(filters.salaryMin) : undefined,
          salaryMax: filters.salaryMax ? parseInt(filters.salaryMax) : undefined,
        })
        setVacancies(data)
      } catch (error) {
        console.error('Failed to fetch vacancies:', error)
      } finally {
        setLoading(false)
      }
    }
    loadVacancies()
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="bg-[#f2f2f2] border-b border-gray-200">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-foreground">Поиск вакансий</h1>
            <p className="text-muted-foreground mt-2">
              Найдите подходящую работу среди актуальных предложений
            </p>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6">
                <VacancyFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onReset={handleResetFilters}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">
                  Найдено: <span className="text-foreground">{vacancies.length}</span>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : vacancies.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <EmptyState
                    icon={Search}
                    title="Вакансии не найдены"
                    description="Попробуйте изменить параметры поиска или сбросить фильтры"
                    action={{
                      label: 'Сбросить фильтры',
                      onClick: handleResetFilters,
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {vacancies.map((vacancy) => (
                    <VacancyCard
                      key={vacancy.id}
                      vacancy={vacancy}
                      isSaved={savedJobs.has(vacancy.id.toString())}
                      onSaveToggle={() => handleSaveToggle(vacancy.id.toString())}
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
