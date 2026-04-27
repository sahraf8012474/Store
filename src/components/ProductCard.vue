<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const { addToCart } = useCart()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}

const handleAddToCart = (e: Event) => {
  e.stopPropagation() // Prevent navigating to detail page when clicking the button
  addToCart(props.product)
}
</script>

<template>
  <div 
    class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full border border-gray-100 dark:border-gray-700"
    @click="goToDetail"
  >
    <div class="relative overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-square flex items-center justify-center p-4">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div v-if="product.discountPercentage > 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        -{{ Math.round(product.discountPercentage) }}%
      </div>
    </div>
    
    <div class="p-5 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{{ product.title }}</h3>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{{ product.description }}</p>
      
      <div class="mt-auto flex items-center justify-between gap-3">
        <div class="flex flex-col">
          <span class="text-xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
          <span class="text-xs text-yellow-500 flex items-center">
            ★ {{ product.rating }}
          </span>
        </div>
        <div class="flex gap-2">
          <button 
            @click="goToDetail"
            class="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-lg transition-colors focus:outline-none"
            title="View Details"
          >
            View Product
          </button>
          <button 
            @click="handleAddToCart"
            class="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
            title="Add to Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
