<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    router.push('/')
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Glassmorphism Container -->
    <div class="max-w-md w-full space-y-8 p-10 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 hover:shadow-pink-500/20">
      <div>
        <h2 class="mt-6 text-center text-4xl font-extrabold text-white tracking-tight">
          Welcome Back
        </h2>
        <p class="mt-2 text-center text-sm text-white/70">
          Or
          <a href="#" class="font-medium text-white hover:text-pink-200 transition-colors">
            create a new account
          </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input 
              id="email-address" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="email"
              class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-white/10 bg-white/5 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all sm:text-sm" 
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required 
              v-model="password"
              class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-white/10 bg-white/5 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all sm:text-sm" 
              placeholder="Password"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-pink-500 focus:ring-pink-400 border-white/20 rounded bg-white/5">
            <label for="remember-me" class="ml-2 block text-sm text-white/80">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-white hover:text-pink-200 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/30"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
      
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/10"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-transparent text-white/50">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button class="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <span class="sr-only">Sign in with Google</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.24-1.92 4.24-1.2 1.2-3.08 2.48-5.92 2.48-4.72 0-8.64-3.84-8.64-8.56S7.76 3.76 12.48 3.76c2.56 0 4.44.96 5.8 2.32l2.32-2.32C18.6 1.92 15.84.56 12.48.56 6.08.56 1.04 5.6 1.04 12s5.04 11.44 11.44 11.44c3.44 0 6.08-1.12 8.12-3.24 2.08-2.08 2.72-4.96 2.72-7.36 0-.72-.08-1.44-.16-1.92h-10.68z" />
            </svg>
          </button>
          <button class="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <span class="sr-only">Sign in with GitHub</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations or refinements if needed */
</style>
