import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Arvavir',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('@/views/ProfileView.vue')
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
    ],
})

export default router
