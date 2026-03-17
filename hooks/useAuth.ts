'use client'

import { useState, useCallback, useEffect } from 'react'
import { User, UserRole } from '@/lib/types'
import { loginUser, registerUser, logoutUser } from '@/lib/api-client'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const restoreAuth = () => {
      try {
        const savedAuth = localStorage.getItem('auth')
        if (savedAuth) {
          const auth = JSON.parse(savedAuth)
          const { user: savedUser, access_token, expires_at } = auth

          if (expires_at && expires_at < Date.now()) {
            localStorage.removeItem('auth')
            setIsInitialized(true)
            return
          }

          if (savedUser && access_token) {
            setUser(savedUser)
            setToken(access_token)
          }
        }
      } catch (err) {
        console.error('[Auth] Failed to restore auth:', err)
        localStorage.removeItem('auth')
      } finally {
        setIsInitialized(true)
      }
    }

    restoreAuth()
  }, [])

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loginUser({ email, password, role })
      const { user: apiUser, token: apiToken } = response

      localStorage.setItem('auth', JSON.stringify({
        user: apiUser,
        access_token: apiToken,
        expires_at: Date.now() + 24 * 60 * 60 * 1000,
      }))

      setUser(apiUser)
      setToken(apiToken)

      return { user: apiUser, token: apiToken }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка входа'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    role: UserRole,
    phone?: string,
    company_name?: string
  ) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await registerUser({
        email,
        password,
        first_name,
        last_name,
        role,
        phone,
        company_name,
      })
      const { user: apiUser, token: apiToken } = response

      localStorage.setItem('auth', JSON.stringify({
        user: apiUser,
        access_token: apiToken,
        expires_at: Date.now() + 24 * 60 * 60 * 1000,
      }))

      setUser(apiUser)
      setToken(apiToken)

      return { user: apiUser, token: apiToken }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка регистрации'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error('[Auth] Logout error:', err)
    } finally {
      setUser(null)
      setToken(null)
      setError(null)
      localStorage.removeItem('auth')
    }
  }, [])

  const isAuthenticated = !!user && !!token
  const userRole = user?.role

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    isInitialized,
    userRole,
    login,
    register,
    logout,
  }
}
