import { createRouter, createWebHistory } from 'vue-router'

// Usa las rutas CORRECTAS según tu estructura
const Home = () => import('./shared/presentation/views/home.vue')
const BuscarRuta = () => import('./shared/presentation/views/buscar-ruta.vue')
const Notificaciones = () => import('./shared/presentation/views/notificaciones.vue')
const ParaderosCercanos = () => import('./shared/presentation/views/paraderos-cercanos.vue')
const Perfil = () => import('./shared/presentation/views/perfil.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/buscar-ruta',
        name: 'BuscarRuta',
        component: BuscarRuta
    },
    {
        path: '/notificaciones',
        name: 'Notificaciones',
        component: Notificaciones
    },
    {
        path: '/paraderos',
        name: 'ParaderosCercanos',
        component: ParaderosCercanos
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router