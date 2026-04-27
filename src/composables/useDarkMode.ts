import { ref } from 'vue';

const isDark = ref(false);

// Initialize state immediately based on localStorage or system preference
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('vue_spa_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
}

export function useDarkMode() {

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vue_spa_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vue_spa_theme', 'light');
    }
  };

  return {
    isDark,
    toggleDarkMode
  };
}
