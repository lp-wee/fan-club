'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Shield, Rocket } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: 'Премиум резюме',
      description: 'Выделите свое резюме в поиске и получайте больше приглашений.',
      price: '499 ₽',
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />
    },
    {
      title: 'Автоподнятие',
      description: 'Ваше резюме будет автоматически подниматься в начало списка каждый день.',
      price: '299 ₽',
      icon: <Zap className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Проверка компании',
      description: 'Детальный отчет о благонадежности работодателя перед собеседованием.',
      price: '999 ₽',
      icon: <Shield className="w-8 h-8 text-green-500" />
    },
    {
      title: 'Быстрый старт',
      description: 'Рассылка вашего резюме по базе подходящих компаний за 24 часа.',
      price: '1 499 ₽',
      icon: <Rocket className="w-8 h-8 text-purple-500" />
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Наши услуги</h1>
          <p className="text-xl text-gray-500 font-medium">Инструменты, которые помогут вам найти работу быстрее и эффективнее.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-2xl transition-all rounded-3xl overflow-hidden bg-white group">
              <CardContent className="p-10">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform shadow-sm">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-gray-900 mb-3">{service.title}</h2>
                    <p className="text-gray-500 font-medium mb-6 leading-relaxed">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-primary">{service.price}</span>
                      <Button className="bg-primary hover:bg-primary/90 text-white font-black px-8 rounded-xl h-12 shadow-lg shadow-primary/20">
                        Подключить
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
