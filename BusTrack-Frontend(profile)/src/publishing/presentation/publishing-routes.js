const publishingRoutes = [
    {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('./views/perfil.vue')
    },
    {
        path: '/buscar-ruta',
        name: 'BuscarRuta',
        component: () => import('./views/buscar-ruta.vue')
    },
    {
        path: '/notificaciones',
        name: 'Notificaciones',
        component: () => import('./views/notificaciones.vue')
    },
    {
        path: '/paraderos',
        name: 'Paraderos',
        component: () => import('./views/paraderos.vue')
    }
];

export default publishingRoutes;