import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authRoutes from './authRoutes'
import productRoutes from '@/router/product-routes'
import ls from '@/utils/secure-ls'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    ...authRoutes,
    ...productRoutes
  ]
})

const requiresGuestPath = [
  '/login',
  '/register',
  '/forget-password',
  '/reset-password'
]

router.beforeEach((to, from, next) => {
  const credential = ls.get('token') ?? ls.get('user') // Ambil credential dari Secure-ls
  
  if (requiresGuestPath.includes(to.path) && credential) {
    // Jika rute memerlukan tamu (tidak login) dan pengguna sudah memiliki credential, arahkan ke rute beranda
    next('/');
  } else if (to.meta.requiresAuth && !credential && !requiresGuestPath.includes(to.path)) {
    // Jika halaman memerlukan auth tapi credential tidak tersedia dan bukan merupakan rute yang memerlukan tamu, arahkan ke halaman login

    ls.set('redirectRoute', to.fullPath);

    next('/login');
  } else {
    // Lanjutkan navigasi ke halaman yang diminta
    next();
  }
});
export default router;
