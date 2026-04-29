<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProducts, fetchCategories } from '../services/api'
import type { Product } from '../types'
import FilterBar from '../components/FilterBar.vue'
import ProductList from '../components/ProductList.vue'
import ProductCard from '../components/ProductCard.vue'
import { useSearchHistory } from '../composables/useSearchHistory'

const route = useRoute()
const router = useRouter()
const products = ref<Product[]>([])
const categories = ref<string[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const searchQuery = ref('')
const selectedCategory = ref((route.params.category as string) || '')
const { searchHistory, addToSearchHistory } = useSearchHistory()

// Watch for route changes (e.g. clicking a category link)
watch(() => route.params.category, (newCategory) => {
  selectedCategory.value = (newCategory as string) || ''
})

// Update route when category is selected from dropdown
watch(selectedCategory, (newVal) => {
  if (newVal) {
    router.push(`/category/${newVal}`)
  } else if (route.name === 'category') {
    router.push('/')
  }
})

// Save search query to history with debounce
let searchTimeout: any = null
watch(searchQuery, (newVal) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  if (newVal.trim().length >= 3) {
    searchTimeout = setTimeout(() => {
      addToSearchHistory(newVal)
    }, 2000)
  }
})

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const [productsData, categoriesData] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ])
    products.value = productsData
    categories.value = categoriesData
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data'
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const suggestedProducts = computed(() => {
  if (searchHistory.value.length === 0 || searchQuery.value) return []
  
  const suggestions: Product[] = []
  const seenIds = new Set<number>()
  
  for (const query of searchHistory.value) {
    const matches = products.value.filter(p => 
      !seenIds.has(p.id) && 
      (p.title.toLowerCase().includes(query) || 
       p.category.toLowerCase().includes(query) ||
       p.description.toLowerCase().includes(query))
    )
    
    matches.forEach(m => {
      if (suggestions.length < 8) {
        suggestions.push(m)
        seenIds.add(m.id)
      }
    })
    
    if (suggestions.length >= 8) break
  }
  
  return suggestions
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Products</h1>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center text-red-700 dark:text-red-400">
      <p class="font-medium text-lg mb-2">Oops! Something went wrong.</p>
      <p>{{ error }}</p>
      <button @click="() => window.location.reload()" class="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 rounded-md transition-colors">
        Try Again
      </button>
    </div>

    <div v-else>
      <FilterBar 
        :categories="categories"
        v-model:searchQuery="searchQuery"
        v-model:selectedCategory="selectedCategory"
      />

      <!-- Recommendations Section -->
      <div v-if="suggestedProducts.length > 0 && !searchQuery" class="mb-12 transition-all duration-700">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Based on your recent searches</p>
            </div>
          </div>
        </div>
        
        <div class="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
          <div v-for="product in suggestedProducts" :key="product.id" class="w-72 flex-shrink-0">
            <ProductCard :product="product" />
          </div>
        </div>
        <div class="h-px bg-gray-100 dark:bg-gray-700 mt-4"></div>
      </div>
      
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'All Products' }}
        </h2>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ filteredProducts.length }} items</span>
      </div>

      <ProductList :products="filteredProducts" />
    </div>
  </div>
</template>
