<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchProducts, fetchCategories } from '../services/api'
import type { Product } from '../types'
import FilterBar from '../components/FilterBar.vue'
import ProductList from '../components/ProductList.vue'

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const searchQuery = ref('')
const selectedCategory = ref('')

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
      
      <ProductList :products="filteredProducts" />
    </div>
  </div>
</template>
