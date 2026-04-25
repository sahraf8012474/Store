import { ref, watch, onMounted } from 'vue';

const isDark = ref(false);

export function useDarkMode() {
  onMounted(() => {
    if (localStorage.getItem('vue_spa_theme') === 'dark' || 
        (!('vue_spa_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true;
      document.documentElement.classList.add('dark');
    } else {
      isDark.value = false;
      document.documentElement.classList.remove('dark');
    }
  });

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
