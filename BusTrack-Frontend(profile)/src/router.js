import { createRouter, createWebHistory } from "vue-router";
import Home from "./shared/presentation/views/home.vue";
import PageNotFound from "./shared/presentation/views/page-not-found.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/buscar-ruta",
        name: "BuscarRuta",
        component: () => import("./publishing/presentation/views/buscar-ruta.vue")
    },
    {
        path: "/notificaciones",
        name: "Notificaciones",
        component: () => import("./publishing/presentation/views/notificaciones.vue")
    },
    {
        path: "/paraderos",
        name: "Paraderos",
        component: () => import("./publishing/presentation/views/paraderos.vue")
    },
    {
        path: "/perfil",
        name: "Perfil",
        component: () => import("./publishing/presentation/views/perfil.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "PageNotFound",
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;