'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/lib/utils/constants'
import { AlertCircle, Loader2 } from 'lucide-react'

const DEMO_ACCOUNTS = [
  { email: 'seeker@example.com', password: 'password123', role: 'job_seeker' as const },
  { email: 'employer@example.com', password: 'password123', role: 'employer' as const },
  { email: 'admin@example.com', password: 'password123', role: 'admin' as const },
]

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'job_seeker' as const,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password, formData.role)
      // Redirect based on role
      const redirectUrl =
        formData.role === 'job_seeker'
          ? ROUTES.CABINET_DASHBOARD
          : formData.role === 'employer'
            ? ROUTES.EMPLOYER_DASHBOARD
            : ROUTES.ADMIN_DASHBOARD
      router.push(redirectUrl)
    } catch {
      // Error is handled by the hook
    }
  }

  const quickLogin = async (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setFormData({
      email: account.email,
      password: account.password,
      role: account.role,
    })

    try {
      await login(account.email, account.password, account.role)
      const redirectUrl =
        account.role === 'job_seeker'
          ? ROUTES.CABINET_DASHBOARD
          : account.role === 'employer'
            ? ROUTES.EMPLOYER_DASHBOARD
            : ROUTES.ADMIN_DASHBOARD
      router.push(redirectUrl)
    } catch {
      // Error is handled by the hook
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  >
                    <option value="job_seeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t pt-6">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Demo Accounts (Quick Login)
                </p>
                <div className="space-y-2">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => quickLogin(account)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 text-xs rounded-md border border-border hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                      {account.role === 'job_seeker' && '👤'} {account.role === 'employer' && '🏢'}{' '}
                      {account.role === 'admin' && '👨‍💼'} {account.email}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-center text-sm">
                Don't have an account?{' '}
                <Link href={ROUTES.REGISTER} className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
