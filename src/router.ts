import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'ARVAVIR',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/login',
            component: () => import('@/views/Auth.vue'),
            props: {login: true}
        },
        {
            path: '/register',
            component: () => import('@/views/Auth.vue'),
            props: {login: false}
        },
        {
            path: '/about',
            name: 'О проекте',
            component: () => import('@/views/AboutView.vue')
        },
        {
            path: '/settings',
            name: 'Настройки',
            component: () => import('@/views/SettingsView.vue')
        },
        {
            path: '/admin',
            name: 'Админ Панель',
            component: () => import('@/views/AdminPanel.vue')
        },

        // 404 page
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/NotFound.vue')
        }
    ],
})

export default router
