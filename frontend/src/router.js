import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Dashboard from './components/Dashboard.vue';

const routes = [
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const tokenExists = document.cookie.includes('token=');
  if(to.meta.requiresAuth && !tokenExists) return next('/login');
  next();
});

export default router;
