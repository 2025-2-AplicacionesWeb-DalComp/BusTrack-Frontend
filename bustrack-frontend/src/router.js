import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/app/presentation/pages/LoginPage.vue'
import RegisterPage from '@/app/presentation/pages/RegisterPage.vue'
import HomePage from '@/app/presentation/pages/HomePage.vue'   // <-- faltaba

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'login', component: LoginPage },
        { path: '/register', name: 'register', component: RegisterPage },
        { path: '/home', name: 'home', component: HomePage },
    ],
})

export default router
