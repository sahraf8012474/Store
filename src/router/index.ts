import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetail from '../views/ProductDetail.vue';
import LoginView from '../views/LoginView.vue';
import ContactView from '../views/ContactView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/category/:category',
      name: 'category',
      component: HomeView
    }
  ]
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');
  
  if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
