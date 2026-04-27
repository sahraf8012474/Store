import { ref, computed } from 'vue'
import type { User, LoginResponse } from '../types'
import { login as loginApi, signup as signupApi } from '../services/api'

const user = ref<User | null>(null)
const token = ref<string | null>(localStorage.getItem('auth_token'))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  const login = async (username: string, password: string) => {
    try {
      // Mock login for 123/123
      if (username === '123' && password === '123') {
        const mockResponse: LoginResponse = {
          id: 123,
          username: '123',
          email: 'admin@123.com',
          firstName: 'Admin',
          lastName: 'User',
          gender: 'other',
          image: 'https://robohash.org/123',
          accessToken: 'mock-token-123'
        }
        
        user.value = mockResponse
        token.value = mockResponse.accessToken
        
        localStorage.setItem('auth_token', mockResponse.accessToken)
        localStorage.setItem('user_data', JSON.stringify(mockResponse))
        
        return mockResponse
      }

      const response: LoginResponse = await loginApi(username, password)
      
      const { accessToken, ...userData } = response
      
      user.value = userData
      token.value = accessToken
      
      localStorage.setItem('auth_token', accessToken)
      localStorage.setItem('user_data', JSON.stringify(userData))
      
      return response
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData: any) => {
    try {
      const response = await signupApi(userData)
      // Since DummyJSON doesn't actually create a user we can log in with,
      // we'll simulate a successful signup and then log them in with a dummy token
      // or just return the response. For a real app, you'd log them in here.
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user_data')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Failed to parse saved user data', e)
        logout()
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    logout,
    initializeAuth
  }
}
