<script setup lang="ts">
import { ref, watch } from 'vue'

import { useRecentlyViewed } from '../composables/useRecentlyViewed'
import { useRouter } from 'vue-router'

const props = defineProps<{
  categories: string[]
  searchQuery: string
  selectedCategory: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedCategory', value: string): void
}>()

const router = useRouter()
const { recentlyViewed, loadRecentlyViewed } = useRecentlyViewed()
const localSearch = ref(props.searchQuery)
const localCategory = ref(props.selectedCategory)
const isSearchFocused = ref(false)

watch(localSearch, (newVal) => emit('update:searchQuery', newVal))
watch(localCategory, (newVal) => emit('update:selectedCategory', newVal))

const handleFocus = () => {
  loadRecentlyViewed()
  isSearchFocused.value = true
}

const handleBlur = () => {
  // Delay blurring to allow clicking on items
  setTimeout(() => {
    isSearchFocused.value = false
  }, 200)
}

const navigateToProduct = (id: number) => {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300 relative">
    <div class="flex-1 relative">
      <label for="search" class="sr-only">Search products</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          id="search"
          type="text" 
          v-model="localSearch"
          placeholder="Search products..." 
          @focus="handleFocus"
          @blur="handleBlur"
          class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all duration-300"
        />
        
        <!-- Recently Viewed Suggestions -->
        <div 
          v-if="isSearchFocused && !localSearch && recentlyViewed.length > 0"
          class="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2"
        >
          <div class="p-3 border-b border-gray-100 dark:border-gray-700">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Recently Viewed</h3>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div 
              v-for="product in recentlyViewed" 
              :key="product.id"
              @click="navigateToProduct(product.id)"
              class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <img :src="product.thumbnail" :alt="product.title" class="w-10 h-10 object-cover rounded-lg bg-gray-100 dark:bg-gray-900" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ product.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Category Direct Access -->
  <div class="mb-8">
    <div class="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <button 
        @click="localCategory = ''"
        class="whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2"
        :class="localCategory === '' 
          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary dark:hover:border-primary'"
      >
        All Categories
      </button>
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="localCategory = cat"
        class="whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2"
        :class="localCategory === cat 
          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary dark:hover:border-primary'"
      >
        {{ cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ') }}
      </button>
    </div>
  </div>
</template>
