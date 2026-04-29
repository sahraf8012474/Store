import { ref, onMounted } from 'vue'

const SEARCH_HISTORY_KEY = 'search_history'
const MAX_SEARCH_HISTORY = 5

export function useSearchHistory() {
  const searchHistory = ref<string[]>([])

  const loadSearchHistory = () => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (stored) {
      try {
        searchHistory.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse search history', e)
        searchHistory.value = []
      }
    }
  }

  const addToSearchHistory = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase()
    if (!trimmedQuery || trimmedQuery.length < 2) return

    loadSearchHistory()
    
    // Remove if already exists to move it to the front
    const filtered = searchHistory.value.filter(q => q !== trimmedQuery)
    
    // Add to the beginning
    const updated = [trimmedQuery, ...filtered].slice(0, MAX_SEARCH_HISTORY)
    
    searchHistory.value = updated
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))
  }

  const clearSearchHistory = () => {
    searchHistory.value = []
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  }

  onMounted(() => {
    loadSearchHistory()
  })

  return {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    loadSearchHistory
  }
}
