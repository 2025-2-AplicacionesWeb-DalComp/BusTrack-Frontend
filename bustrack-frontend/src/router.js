import { createRouter, createWebHistory } from 'vue-router';

// Componente funcional para la búsqueda
const RouteSearch = () => import('../src/searchroute/presentation/views/route-form.vue');

// Componente genérico para las páginas no implementadas
const Placeholder = { template: '<div style="padding: 2rem; text-align: center;"><h2>🚧 Página en construcción 🚧</h2></div>' };
const PageNotFound = () => import('../src/shared/presentation/views/page-not-found.vue');


const routes = [
    // 1. La ruta funcional
    {
        path: '/search',
        name: 'search',
        component: RouteSearch,
        meta: { title: 'Buscar Ruta' }
    },
    // 2. Rutas temporales que usan el componente Placeholder
    {
        path: '/notificaciones',
        name: 'notificaciones',
        component: Placeholder,
        meta: { title: 'Notificaciones' }
    },
    {
        path: '/paraderos',
        name: 'paraderos',
        component: Placeholder,
        meta: { title: 'Paraderos Cercanos' }
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: Placeholder,
        meta: { title: 'Perfil' }
    },
    // 3. Redirigimos la raíz de la app a la página de búsqueda
    {
        path: '/',
        redirect: '/search'
    },
    // 4. Ruta para páginas no encontradas (404)
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;