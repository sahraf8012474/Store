import { ref, watch, computed } from 'vue';
import type { Product, CartItem } from '../types';

const cart = ref<CartItem[]>([]);

// Initialize cart from localStorage
const storedCart = localStorage.getItem('vue_spa_cart');
if (storedCart) {
  try {
    cart.value = JSON.parse(storedCart);
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e);
  }
}

// Watch for changes and update localStorage
watch(cart, (newCart) => {
  localStorage.setItem('vue_spa_cart', JSON.stringify(newCart));
}, { deep: true });

export function useCart() {
  const addToCart = (product: Product) => {
    const existing = cart.value.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.value.push({ product, quantity: 1 });
    }
  };

  const removeFromCart = (productId: number) => {
    const index = cart.value.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  };

  const totalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice
  };
}
