import { ref, computed } from 'vue'
import type { User, LoginResponse } from '../types'
import { login as loginApi } from '../services/api'

const user = ref<User | null>(null)
const token = ref<string | null>(localStorage.getItem('auth_token'))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  const login = async (username: string, password: string) => {
    try {
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
    logout,
    initializeAuth
  }
}
