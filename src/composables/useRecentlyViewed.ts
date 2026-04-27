import { ref, onMounted } from 'vue'
import type { Product } from '../types'

const RECENTLY_VIEWED_KEY = 'recently_viewed_products'
const MAX_RECENT_PRODUCTS = 5

export function useRecentlyViewed() {
  const recentlyViewed = ref<Product[]>([])

  const loadRecentlyViewed = () => {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY)
    if (stored) {
      try {
        recentlyViewed.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse recently viewed products', e)
        recentlyViewed.value = []
      }
    }
  }

  const addToRecentlyViewed = (product: Product) => {
    loadRecentlyViewed()
    
    // Remove if already exists to move it to the front
    const filtered = recentlyViewed.value.filter(p => p.id !== product.id)
    
    // Add to the beginning
    const updated = [product, ...filtered].slice(0, MAX_RECENT_PRODUCTS)
    
    recentlyViewed.value = updated
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated))
  }

  const clearRecentlyViewed = () => {
    recentlyViewed.value = []
    localStorage.removeItem(RECENTLY_VIEWED_KEY)
  }

  onMounted(() => {
    loadRecentlyViewed()
  })

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    loadRecentlyViewed
  }
}
