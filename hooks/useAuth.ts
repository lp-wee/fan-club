'use client'

import { useState, useCallback, useEffect } from 'react'
import { User, AuthToken, UserRole } from '@/lib/types'

// Mock auth data - in production this would come from a backend
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'seeker@example.com': {
    user: {
      id: 'user-1',
      email: 'seeker@example.com',
      password: 'password123', // This would be hashed
      role: 'job_seeker',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    password: 'password123',
  },
  'employer@example.com': {
    user: {
      id: 'user-2',
      email: 'employer@example.com',
      password: 'password123',
      role: 'employer',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    password: 'password123',
  },
  'admin@example.com': {
    user: {
      id: 'user-3',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    password: 'password123',
  },
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<AuthToken | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      try {
        const { user: savedUser, token: savedToken } = JSON.parse(savedAuth)
        setUser(savedUser)
        setToken(savedToken)
      } catch (err) {
        localStorage.removeItem('auth')
      }
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string, role: UserRole) => {
      setIsLoading(true)
      setError(null)
      try {
        // Mock authentication
        const userEntry = MOCK_USERS[email]
        if (!userEntry || userEntry.password !== password) {
          throw new Error('Invalid credentials')
        }

        if (userEntry.user.role !== role) {
          throw new Error(`User is not a ${role}`)
        }

        const mockToken: AuthToken = {
          access_token: 'mock-token-' + Date.now(),
          refresh_token: 'mock-refresh-' + Date.now(),
          expires_in: 86400,
        }

        setUser(userEntry.user)
        setToken(mockToken)

        // Save to localStorage
        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: userEntry.user,
            token: mockToken,
          })
        )

        return { user: userEntry.user, token: mockToken }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const register = useCallback(
    async (
      email: string,
      password: string,
      first_name: string,
      last_name: string,
      role: UserRole,
      phone?: string
    ) => {
      setIsLoading(true)
      setError(null)
      try {
        if (MOCK_USERS[email]) {
          throw new Error('Email already registered')
        }

        const newUser: User = {
          id: 'user-' + Date.now(),
          email,
          password, // This would be hashed in production
          role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        MOCK_USERS[email] = { user: newUser, password }

        const mockToken: AuthToken = {
          access_token: 'mock-token-' + Date.now(),
          refresh_token: 'mock-refresh-' + Date.now(),
          expires_in: 86400,
        }

        setUser(newUser)
        setToken(mockToken)

        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: newUser,
            token: mockToken,
          })
        )

        return { user: newUser, token: mockToken }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const logout = useCallback(async () => {
    setUser(null)
    setToken(null)
    setError(null)
    localStorage.removeItem('auth')
  }, [])

  const isAuthenticated = !!user && !!token
  const userRole = user?.role

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userRole,
    login,
    register,
    logout,
  }
}
