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
        path: "/search-rout",
        name: "SearchRout",
        component: () => import("./publishing/presentation/views/search-rout/search-rout.vue")
    },
    {
        path: "/notifications",
        name: "Notifications",
        component: () => import("./publishing/presentation/views/notifications/notifications.vue")
    },
    {
        path: "/bus-stops",
        name: "Bus-Stops",
        component: () => import("./publishing/presentation/views/bus-stops/bus-stops.vue")
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("./publishing/presentation/views/profile/profile.vue")
    },
    {
        path: '/profile/favorite-routes',
        name: 'FavoriteRoutes',
        component: () => import('./publishing/presentation/views/profile/components/favorite-routes.vue')
    },
    {
        path: '/profile/account-settings',
        name: 'AccountSettings',
        component: () => import('./publishing/presentation/views/profile/components/account-settings.vue')
    },
    {
        path: '/profile/travel-history',
        name: 'TravelHistory',
        component: () => import('./publishing/presentation/views/profile/components/travel-history.vue')
    },
    {
        path: '/profile/notifications',
        name: 'Notifications',
        component: () => import('./publishing/presentation/views/profile/components/notifications.vue')
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