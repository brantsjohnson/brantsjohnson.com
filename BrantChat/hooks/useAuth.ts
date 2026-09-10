'use client'

import { useState, useEffect } from 'react'
import { getAuthToken, setAuthToken, clearAuthToken } from '@/lib/api'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = (token: string) => {
    setAuthToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    clearAuthToken()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  }
}
