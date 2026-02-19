'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/lib/utils/constants'
import { Search, Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Qwork style */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#222] mb-6 leading-tight">
                  Маркетплейс <span className="text-[#11a36d]">фриланс-услуг</span> и вакансий
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                  Найдите профессиональных исполнителей или идеальную работу в один клик. Проверенные компании и соискатели.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto lg:mx-0 shadow-xl rounded-lg overflow-hidden border border-gray-200">
                  <Input
                    type="text"
                    placeholder="Какую работу вы ищете?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-16 pl-6 pr-32 text-lg border-none focus-visible:ring-0 placeholder:text-gray-400"
                  />
                  <Button 
                    type="submit" 
                    className="absolute right-2 top-2 h-12 px-8 bg-[#11a36d] hover:bg-[#0e8a5c] text-white font-bold rounded"
                  >
                    Найти
                  </Button>
                </form>

                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                  <span className="text-sm text-gray-500 py-1">Популярно:</span>
                  {['Дизайн', 'Разработка', 'Маркетинг', 'Тексты'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag)
                        router.push(`${ROUTES.VACANCIES}?search=${encodeURIComponent(tag)}`)
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="hidden lg:block flex-1 relative h-[500px] w-full bg-[#f9f9f9] rounded-2xl overflow-hidden border border-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase className="w-32 h-32 text-[#11a36d] opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-[#f2f2f2]">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Популярные категории</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Дизайн', icon: '🎨' },
                { name: 'IT и разработка', icon: '💻' },
                { name: 'Маркетинг', icon: '📊' },
                { name: 'Копирайтинг', icon: '✍️' },
                { name: 'Переводы', icon: '🌍' },
                { name: 'Аудио и видео', icon: '🎵' },
              ].map(cat => (
                <div key={cat.name} className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <div className="font-semibold text-gray-800">{cat.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-t border-gray-200">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#11a36d] mb-2">50 000+</div>
                <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Активных вакансий</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#11a36d] mb-2">10 000+</div>
                <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Проверенных компаний</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#11a36d] mb-2">100 000+</div>
                <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Специалистов</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#11a36d] text-white overflow-hidden relative">
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-balance">Готовы изменить свою карьеру?</h2>
            <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto">
              Присоединяйтесь к сообществу профессионалов и находите лучшие предложения на рынке труда прямо сейчас.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push(ROUTES.REGISTER)}
                className="bg-white text-[#11a36d] hover:bg-gray-100 font-bold px-10 h-14 text-lg"
              >
                Создать аккаунт
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push(ROUTES.VACANCIES)}
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 h-14 text-lg"
              >
                Найти работу
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </section>
      </main>

      <Footer />
    </div>
  )
}
