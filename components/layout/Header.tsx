'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/lib/utils/constants'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, Bell, Briefcase, Search } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout, userRole } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push(ROUTES.HOME)
  }

  const navLinks = [
    { label: 'Найти работу', href: ROUTES.VACANCIES },
    { label: 'Компании', href: '#' },
    { label: 'Услуги', href: '#' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#11a36d] flex items-center justify-center text-white">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#222]">JobPortal</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#11a36d] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(ROUTES.LOGIN)}
                  className="text-gray-600 font-semibold"
                >
                  Вход
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push(ROUTES.REGISTER)}
                  className="bg-[#11a36d] hover:bg-[#0e8a5c] text-white font-semibold"
                >
                  Регистрация
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-500 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {user?.email?.[0].toUpperCase()}
                      </div>
                      <span className="hidden sm:inline text-sm text-gray-700">{user?.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.CABINET_DASHBOARD}>Личный кабинет</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4 px-4 shadow-lg animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            {!isAuthenticated && (
              <div className="flex flex-col gap-2">
                <Button onClick={() => router.push(ROUTES.LOGIN)} variant="outline">Вход</Button>
                <Button onClick={() => router.push(ROUTES.REGISTER)}>Регистрация</Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
