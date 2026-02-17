'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/lib/utils/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, Search, Bell, Briefcase } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout, userRole } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push(ROUTES.HOME)
  }

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { label: 'Вакансии', href: ROUTES.VACANCIES },
        { label: 'Компании', href: '#' },
      ]
    }

    if (userRole === 'job_seeker') {
      return [
        { label: 'Вакансии', href: ROUTES.VACANCIES },
        { label: 'Компании', href: '#' },
        { label: 'Кабинет', href: ROUTES.CABINET_DASHBOARD },
      ]
    }

    if (userRole === 'employer') {
      return [
        { label: 'Кабинет', href: ROUTES.EMPLOYER_DASHBOARD },
        { label: 'Создать вакансию', href: ROUTES.EMPLOYER_VACANCY_NEW },
        { label: 'Заявки', href: ROUTES.EMPLOYER_APPLICATIONS },
      ]
    }

    if (userRole === 'admin') {
      return [
        { label: 'Кабинет', href: ROUTES.ADMIN_DASHBOARD },
        { label: 'Пользователи', href: ROUTES.ADMIN_USERS },
        { label: 'Отчеты', href: ROUTES.ADMIN_REPORTS },
      ]
    }

    return []
  }

  const navLinks = getNavLinks()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="hidden sm:inline font-bold text-xl text-foreground">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3 ml-auto">
            {isAuthenticated && (
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
            )}

            {!isAuthenticated ? (
              <div className="flex gap-2 items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(ROUTES.LOGIN)}
                  className="hidden sm:inline-flex"
                >
                  Вход
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push(ROUTES.REGISTER)}
                >
                  Регистрация
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {user?.email?.[0].toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-sm">{user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <span>{user?.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {userRole === 'job_seeker' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.CABINET_DASHBOARD}>Кабинет</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.CABINET_RESUMES}>Мои резюме</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.CABINET_APPLICATIONS}>Заявки</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.CABINET_SETTINGS}>Настройки</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {userRole === 'employer' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.EMPLOYER_DASHBOARD}>Кабинет</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.EMPLOYER_VACANCIES}>Мои вакансии</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.EMPLOYER_COMPANY}>Профиль компании</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {userRole === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.ADMIN_DASHBOARD}>Кабинет</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.ADMIN_USERS}>Пользователи</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Выход
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
