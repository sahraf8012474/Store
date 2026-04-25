<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  categories: string[]
  searchQuery: string
  selectedCategory: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedCategory', value: string): void
}>()

const localSearch = ref(props.searchQuery)
const localCategory = ref(props.selectedCategory)

watch(localSearch, (newVal) => emit('update:searchQuery', newVal))
watch(localCategory, (newVal) => emit('update:selectedCategory', newVal))
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
    <div class="flex-1">
      <label for="search" class="sr-only">Search products</label>
      <input 
        id="search"
        type="text" 
        v-model="localSearch"
        placeholder="Search products..." 
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors"
      />
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
