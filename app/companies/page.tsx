'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchVacancies } from '@/lib/api-client'
import { ROUTES } from '@/lib/utils/constants'
import Link from 'next/link'
import { Building2, Star, MapPin, Loader2 } from 'lucide-react'

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        // Since we don't have a specific list-companies endpoint, we'll derive them from vacancies for now
        // or we could add a fetchCompanies endpoint to api-client
        const vacancies = await fetchVacancies()
        const uniqueCompanies = Array.from(new Map(vacancies.map((v: any) => [v.company_id, {
          id: v.company_id,
          name: v.company_name,
          logo: v.company_logo,
          rating: v.company_rating || '5.0',
          location: v.location,
          industry: v.industry
        }])).values())
        setCompanies(uniqueCompanies)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter">Компании</h1>
        
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="border-none shadow-sm hover:shadow-xl transition-all rounded-2xl overflow-hidden group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-4xl border border-gray-100 group-hover:scale-110 transition-transform">
                      {company.logo || '🏢'}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-900 mb-1">{company.name}</h2>
                      <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                        <Star className="w-4 h-4 fill-current" /> {company.rating}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                      <MapPin className="w-4 h-4" /> {company.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                      <Building2 className="w-4 h-4" /> {company.industry || 'IT & Технологии'}
                    </div>
                  </div>
                  <Link href={ROUTES.COMPANY_PROFILE(company.id.toString())}>
                    <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black rounded-xl">
                      Профиль компании
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <p className="text-gray-400 font-bold uppercase tracking-widest">Компании пока не зарегистрированы</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
