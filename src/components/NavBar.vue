<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import { useDarkMode } from '../composables/useDarkMode'
import CartMenu from './CartMenu.vue'

const { totalItems } = useCart()
const { isDark, toggleDarkMode } = useDarkMode()

const isCartOpen = ref(false)
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <span class="text-2xl font-bold text-primary dark:text-blue-400">VueStore</span>
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none">
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
          <router-link to="/login" class="flex items-center hover:opacity-80 transition-opacity">
            <span class="text-xl">👤</span>
            <span class="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200">Login</span>
          </router-link>
          <div @click="isCartOpen = true" class="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <span class="text-xl">🛒</span>
            <span v-if="totalItems > 0" class="ml-1 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              {{ totalItems }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <CartMenu :is-open="isCartOpen" @close="isCartOpen = false" />
</template>
