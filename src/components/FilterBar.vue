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
        <input 
          id="search"
          type="text" 
          v-model="localSearch"
          placeholder="Search products..." 
          @focus="handleFocus"
          @blur="handleBlur"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors"
        />
        
        <!-- Recently Viewed Suggestions -->
        <div 
          v-if="isSearchFocused && !localSearch && recentlyViewed.length > 0"
          class="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden"
        >
          <div class="p-3 border-b border-gray-100 dark:border-gray-700">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recently Viewed</h3>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div 
              v-for="product in recentlyViewed" 
              :key="product.id"
              @click="navigateToProduct(product.id)"
              class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <img :src="product.thumbnail" :alt="product.title" class="w-10 h-10 object-cover rounded bg-gray-100 dark:bg-gray-900" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ product.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-64">
      <label for="category" class="sr-only">Filter by category</label>
      <select 
        id="category"
        v-model="localCategory"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ') }}
        </option>
      </select>
    </div>
  </div>
</template>
