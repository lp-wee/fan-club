'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/lib/utils/constants'
import { Search, Briefcase, Users, TrendingUp, ArrowRight, MapPin, DollarSign } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`${ROUTES.VACANCIES}?search=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push(ROUTES.VACANCIES)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 sm:py-28 lg:py-36 border-b border-blue-100">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-foreground text-balance">
                Найдите идеальную работу
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
                Присоединитесь к миллионам соискателей, которые нашли свою работу мечты на JobPortal
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Должность, компания, навык..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-white text-foreground placeholder:text-gray-400 text-base rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none shadow-sm"
                  />
                </div>
                <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg h-14 px-8 rounded-lg">
                  Поиск
                </Button>
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push(ROUTES.VACANCIES)}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg"
                >
                  Смотреть вакансии
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push(ROUTES.REGISTER)}
                  className="border-2 border-primary text-primary hover:bg-blue-50 font-semibold rounded-lg"
                >
                  Разместить вакансию
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Активных вакансий</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Зарегистрировано компаний</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <p className="text-muted-foreground">Талантливых профессионалов</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vacancies CTA */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12 text-center">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Тысячи вакансий ждут вас</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Откройте лучшие возможности от ведущих компаний и начните свою карьеру прямо сейчас
              </p>
              <Button
                size="lg"
                onClick={() => router.push(ROUTES.VACANCIES)}
                className="bg-primary hover:bg-primary/90 text-white font-semibold gap-2 rounded-lg shadow-lg"
              >
                Просмотреть все вакансии <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Почему выбрать JobPortal?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Проверенные вакансии</h3>
                <p className="text-sm text-muted-foreground">
                  Все объявления о вакансиях проверены нашей командой
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Профессиональная сеть</h3>
                <p className="text-sm text-muted-foreground">
                  Общайтесь с профессионалами своей отрасли
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Карьерный рост</h3>
                <p className="text-sm text-muted-foreground">
                  Инструменты для развития вашей карьеры
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Умный подбор</h3>
                <p className="text-sm text-muted-foreground">
                  Рекомендации вакансий на основе AI
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Готовы начать?</h2>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              Присоединитесь к тысячам профессионалов, нашедших свою следующую возможность, или компании, создающие свои команды
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push(ROUTES.REGISTER)}
                className="bg-white text-primary hover:bg-blue-50"
              >
                Зарегистрироваться как соискатель
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push(ROUTES.REGISTER)}
                className="border-white text-white hover:bg-white/10"
              >
                Размещать вакансии
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
