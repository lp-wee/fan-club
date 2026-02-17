import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'primary' | 'accent' | 'success' | 'warning'
}

const COLOR_CLASSES = {
  primary: 'bg-blue-50 text-blue-600',
  accent: 'bg-green-50 text-green-600',
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color = 'primary',
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {trend && (
            <p
              className={`text-sm font-medium mt-2 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '+' : ''}{trend.value}% от прошлого месяца
            </p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${COLOR_CLASSES[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
