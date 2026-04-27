<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProductById } from '../services/api'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

import { useRecentlyViewed } from '../composables/useRecentlyViewed'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()
const { addToRecentlyViewed } = useRecentlyViewed()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const activeImage = ref(0)

onMounted(async () => {
  try {
    const id = route.params.id as string
    product.value = await fetchProductById(id)
    if (product.value) {
      addToRecentlyViewed(product.value)
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load product'
  } finally {
    loading.value = false
  }
})

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value)
  }
}
</script>

<template>
  <div>
    <button @click="router.back()" class="mb-6 flex items-center text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Products
    </button>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center text-red-700 dark:text-red-400">
      <p class="font-medium text-lg mb-2">Product not found</p>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="product" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <!-- Image Gallery -->
        <div class="flex flex-col gap-4">
          <div class="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4">
            <img 
              :src="product.images[activeImage] || product.thumbnail" 
              :alt="product.title" 
              class="w-full h-full object-contain"
            />
          </div>
          <div v-if="product.images.length > 1" class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              v-for="(img, idx) in product.images" 
              :key="idx"
              @click="activeImage = idx"
              class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors focus:outline-none"
              :class="activeImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'"
            >
              <img :src="img" :alt="`${product.title} view ${idx + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-col">
          <div class="mb-2">
            <span class="text-sm font-semibold text-primary dark:text-blue-400 uppercase tracking-wider">{{ product.category }}</span>
            <span class="mx-2 text-gray-400">•</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.brand }}</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ product.title }}</h1>
          
          <div class="flex items-center gap-4 mb-6">
            <div class="flex flex-col">
              <span class="text-3xl font-extrabold text-gray-900 dark:text-white">${{ product.price }}</span>
              <span v-if="product.discountPercentage > 0" class="text-sm text-green-600 dark:text-green-400 font-medium">
                Save {{ Math.round(product.discountPercentage) }}%
              </span>
            </div>
            <div class="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
              <span class="text-yellow-600 dark:text-yellow-500">★</span>
              <span class="font-bold text-yellow-700 dark:text-yellow-500">{{ product.rating }}</span>
            </div>
          </div>

          <p class="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
            {{ product.description }}
          </p>

          <div class="mt-auto space-y-4">
            <div class="flex items-center gap-2 text-sm" :class="product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
              <span class="w-3 h-3 rounded-full" :class="product.stock > 0 ? 'bg-green-500' : 'bg-red-500'"></span>
              {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
            </div>
            
            <button 
              @click="handleAddToCart"
              :disabled="product.stock === 0"
              class="w-full md:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
