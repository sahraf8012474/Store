<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login, signup } = useAuth()

const isLogin = ref(true)
const username = ref('123')
const email = ref('')
const password = ref('123')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  errorMessage.value = ''
}

const handleAuth = async () => {
  errorMessage.value = ''
  
  if (isLogin.value) {
    if (!username.value || !password.value) {
      errorMessage.value = 'Please enter both username and password'
      return
    }
  } else {
    if (!username.value || !email.value || !password.value || !confirmPassword.value) {
      errorMessage.value = 'Please fill in all fields'
      return
    }
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }
  }

  isLoading.value = true
  
  try {
    if (isLogin.value) {
      await login(username.value, password.value)
      router.push('/')
    } else {
      await signup({ 
        username: username.value, 
        email: email.value, 
        password: password.value,
        firstName: username.value, // Mocking required fields
        lastName: 'User'
      })
      // For UX, after signup we can show a message or switch to login
      errorMessage.value = 'Account created successfully! Please sign in.'
      isLogin.value = true
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Authentication failed.'
    console.error('Auth error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <!-- Animated background elements -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>

    <!-- Glassmorphism Container -->
    <div class="max-w-md w-full space-y-8 p-10 bg-white dark:bg-[#16161a]/80 backdrop-blur-2xl rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 relative z-10">
      <div>
        <h2 class="text-center text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {{ isLogin ? 'Welcome Back' : 'Create Account' }}
        </h2>
        <p class="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
          {{ isLogin ? 'New here?' : 'Already have an account?' }}
          <button 
            @click="toggleMode" 
            class="ml-1 font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors focus:outline-none"
          >
            {{ isLogin ? 'Create a new account' : 'Sign in to your account' }}
          </button>
        </p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="handleAuth">
        <div v-if="errorMessage" 
             :class="errorMessage.includes('successfully') ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border-red-500/50 text-red-400'"
             class="border px-4 py-3 rounded-2xl text-sm text-center font-medium transition-all animate-in fade-in slide-in-from-top-2">
          {{ errorMessage }}
        </div>

        <div class="space-y-4">
          <div class="relative group">
            <label for="username" class="sr-only">Username</label>
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <input 
              id="username" 
              name="username" 
              type="text" 
              required 
              v-model="username"
              class="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-[#1f1f23] border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all sm:text-sm" 
              placeholder="Username"
            >
          </div>

          <div v-if="!isLogin" class="relative group animate-in fade-in slide-in-from-top-2">
            <label for="email" class="sr-only">Email address</label>
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <input 
              id="email" 
              name="email" 
              type="email" 
              :required="!isLogin"
              v-model="email"
              class="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-[#1f1f23] border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all sm:text-sm" 
              placeholder="Email address"
            >
          </div>

          <div class="relative group">
            <label for="password" class="sr-only">Password</label>
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              v-model="password"
              class="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-[#1f1f23] border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all sm:text-sm" 
              placeholder="Password"
            >
          </div>

          <div v-if="!isLogin" class="relative group animate-in fade-in slide-in-from-top-2">
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <input 
              id="confirm-password" 
              name="confirm-password" 
              type="password" 
              :required="!isLogin"
              v-model="confirmPassword"
              class="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-[#1f1f23] border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all sm:text-sm" 
              placeholder="Confirm Password"
            >
          </div>
        </div>

        <div v-if="isLogin" class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-purple-500 focus:ring-purple-400 border-white/10 rounded bg-[#1f1f23]">
            <label for="remember-me" class="ml-2 block text-sm text-gray-400">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-purple-400 hover:text-purple-300 transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign in' : 'Create Account') }}
          </button>
        </div>
      </form>
      
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/5"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white dark:bg-[#16161a] text-gray-500">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4">
          <button class="w-full inline-flex justify-center py-3 px-4 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#1f1f23] text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2f] transition-all duration-200">
            <span class="sr-only">Sign in with Google</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.24-1.92 4.24-1.2 1.2-3.08 2.48-5.92 2.48-4.72 0-8.64-3.84-8.64-8.56S7.76 3.76 12.48 3.76c2.56 0 4.44.96 5.8 2.32l2.32-2.32C18.6 1.92 15.84.56 12.48.56 6.08.56 1.04 5.6 1.04 12s5.04 11.44 11.44 11.44c3.44 0 6.08-1.12 8.12-3.24 2.08-2.08 2.72-4.96 2.72-7.36 0-.72-.08-1.44-.16-1.92h-10.68z" />
            </svg>
          </button>
          <button class="w-full inline-flex justify-center py-3 px-4 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#1f1f23] text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2f] transition-all duration-200">
            <span class="sr-only">Sign in with GitHub</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInFromTop {
  from { transform: translateY(-10px); }
  to { transform: translateY(0); }
}

.fade-in {
  animation-name: fadeIn;
}

.slide-in-from-top-2 {
  animation-name: slideInFromTop;
}
</style>

<style scoped>
/* Custom animations or refinements if needed */
</style>
