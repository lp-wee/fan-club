'use client'

import Link from 'next/link'
import { ROUTES } from '@/lib/utils/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'Для соискателей',
      links: [
        { label: 'Все вакансии', href: ROUTES.VACANCIES },
        { label: 'Кабинет', href: ROUTES.CABINET_DASHBOARD },
        { label: 'Мои резюме', href: ROUTES.CABINET_RESUMES },
        { label: 'Советы по поиску', href: '#' },
      ],
    },
    {
      title: 'Для работодателей',
      links: [
        { label: 'Разместить вакансию', href: ROUTES.EMPLOYER_VACANCY_NEW },
        { label: 'Поиск резюме', href: ROUTES.EMPLOYER_RESUMES },
        { label: 'Тарифы', href: '#' },
        { label: 'Помощь', href: '#' },
      ],
    },
    {
      title: 'О проекте',
      links: [
        { label: 'О нас', href: '#' },
        { label: 'Контакты', href: '#' },
        { label: 'Правила сервиса', href: '#' },
        { label: 'Конфиденциальность', href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-[#222] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="space-y-6">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#11a36d] flex items-center justify-center text-white">
                <span className="font-bold">JP</span>
              </div>
              <span className="font-bold text-xl tracking-tight">JobPortal</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Современная платформа для поиска работы и сотрудников в России. Мы делаем процесс найма проще и быстрее.
            </p>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#11a36d] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} JobPortal. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">ВКонтакте</Link>
            <Link href="#" className="hover:text-white transition-colors">Telegram</Link>
            <Link href="#" className="hover:text-white transition-colors">Дзен</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
