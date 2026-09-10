'use client'

import { useState, useEffect } from 'react'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('brantchat_token')
    if (token) {
      // Verify token is still valid by checking if it exists and isn't expired
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const now = Date.now() / 1000
        if (payload.exp && payload.exp > now) {
          setIsAuthenticated(true)
        } else {
          // Token expired, remove it
          localStorage.removeItem('brantchat_token')
        }
      } catch (error) {
        // Invalid token, remove it
        localStorage.removeItem('brantchat_token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (password: string) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('brantchat_token', data.token)
        setIsAuthenticated(true)
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('brantchat_token')
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  }
}
