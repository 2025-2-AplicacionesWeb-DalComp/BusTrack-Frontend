import { createRouter, createWebHistory } from "vue-router";
import Home from "./shared/presentation/views/home.vue";
import PageNotFound from "./shared/presentation/views/page-not-found.vue";
import LoginPage from '@/app/presentation/pages/LoginPage.vue'
import RegisterPage from '@/app/presentation/pages/RegisterPage.vue'
import HomePage from '@/app/presentation/pages/HomePage.vue'
import FavoriteRoutes from "@/publishing/presentation/views/profile/components/favorite-routes.vue";
import AccountSettings from "@/publishing/presentation/views/profile/components/account-settings.vue";
import TravelHistory from "@/publishing/presentation/views/profile/components/travel-history.vue";
import Notifications from "@/publishing/presentation/views/notifications/notifications.vue";
import BusStops from "@/publishing/presentation/views/bus-stops/bus-stops.vue";
import Profile from "@/publishing/presentation/views/profile/profile.vue";
import RouteForm from "@/searchroute/presentation/views/route-form.vue";


const routes = [
  // Público
  { path: '/', redirect: '/login', meta: { public: true } },
  { path: '/login', name: 'login', component: LoginPage, meta: { public: true } },
  { path: '/register', name: 'register', component: RegisterPage, meta: { public: true } },

  // Autenticado
  { path: '/home', name: 'home', component: HomePage, meta: { requiresAuth: true } },

  // Secciones (post login)
  { path: '/dashboard', name: 'dashboard', component: Home, meta: { requiresAuth: true } },
  { path: '/search-route', name: 'search-route', component: RouteForm, meta: { requiresAuth: true } }, // (antes: /search-rout)
  { path: '/notifications', name: 'notifications', component: Notifications, meta: { requiresAuth: true } },
  { path: '/bus-stops', name: 'bus-stops', component: BusStops, meta: { requiresAuth: true } },
  { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/profile/favorite-routes', name: 'profile-favorite-routes', component: FavoriteRoutes, meta: { requiresAuth: true } },
  { path: '/profile/account-settings', name: 'profile-account-settings', component: AccountSettings, meta: { requiresAuth: true } },
  { path: '/profile/travel-history', name: 'profile-travel-history', component: TravelHistory, meta: { requiresAuth: true } },
  //{ path: '/profile/notifications', name: 'profile-notifications', component: ProfileNotifications, meta: { requiresAuth: true } },

 
  { path: '/:pathMatch(.*)*', name: 'page-not-found', component: PageNotFound, meta: { public: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/*
// Guard sencillo DESACTIVADO TEMPORALMENTE
router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem('token') // o revisa tu store
  if (!to.meta?.public && !isAuth) {
    // bloquea acceso a rutas protegidas si no hay sesión
    return next({ name: 'login' })
  }
  if (to.name === 'login' && isAuth) {
    // si ya está logueado, evita volver a /login
    return next({ name: 'home' })
  }
  next()
})
*/

export default router
