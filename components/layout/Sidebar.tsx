'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  FileText,
  Send,
  Bookmark,
  MessageSquare,
  Settings,
  LogOut,
  BarChart3,
  Users,
  Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

interface SidebarProps {
  userType: 'seeker' | 'employer' | 'admin'
  isOpen?: boolean
  onClose?: () => void
}

const SEEKER_NAV: NavItem[] = [
  { label: 'Дашборд', href: '/cabinet', icon: Home },
  { label: 'Мои резюме', href: '/cabinet/resumes', icon: FileText },
  { label: 'Мои заявки', href: '/cabinet/applications', icon: Send },
  { label: 'Сохраненные', href: '/cabinet/saved', icon: Bookmark },
  { label: 'Сообщения', href: '/cabinet/messages', icon: MessageSquare },
  { label: 'Настройки', href: '/cabinet/settings', icon: Settings },
]

const EMPLOYER_NAV: NavItem[] = [
  { label: 'Дашборд', href: '/employer', icon: Home },
  { label: 'Вакансии', href: '/employer/vacancies', icon: Briefcase },
  { label: 'Новая вакансия', href: '/employer/vacancy/new', icon: FileText },
  { label: 'Заявки', href: '/employer/applications', icon: Send },
  { label: 'Поиск резюме', href: '/employer/resumes-search', icon: Users },
  { label: 'Сообщения', href: '/employer/messages', icon: MessageSquare },
  { label: 'Профиль компании', href: '/employer/company', icon: Briefcase },
]

const ADMIN_NAV: NavItem[] = [
  { label: 'Дашборд', href: '/admin', icon: Home },
  { label: 'Пользователи', href: '/admin/users', icon: Users },
  { label: 'Вакансии', href: '/admin/vacancies', icon: Briefcase },
  { label: 'Отзывы', href: '/admin/reviews', icon: MessageSquare },
  { label: 'Статистика', href: '/admin/reports', icon: BarChart3 },
]

export function Sidebar({
  userType,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = {
    seeker: SEEKER_NAV,
    employer: EMPLOYER_NAV,
    admin: ADMIN_NAV,
  }[userType]

  const handleLogout = () => {
    logout()
    onClose?.()
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-200 md:static md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-sidebar-border p-4">
          <h2 className="text-lg font-bold text-sidebar-foreground">
            JobPortal
          </h2>
        </div>

        {/* User Info */}
        <div className="border-b border-sidebar-border p-4">
          <p className="text-sm font-medium text-sidebar-foreground">
            {user?.name}
          </p>
          <p className="text-xs text-sidebar-foreground/60 mt-1">
            {user?.email}
          </p>
          <p className="text-xs text-sidebar-foreground/50 mt-2">
            {userType === 'seeker' && 'Соискатель'}
            {userType === 'employer' && 'Работодатель'}
            {userType === 'admin' && 'Администратор'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-medium">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Выход</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
