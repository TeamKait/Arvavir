import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'ARVAVIR',
            component: () => import('@/views/HomeView/HomeView.vue')
        },
        {
            path: '/login',
            name: 'Войти',
            component: () => import('@/views/Auth.vue'),
            props: {login: true}
        },
        {
            path: '/register',
            name: 'Регистрация',
            component: () => import('@/views/Auth.vue'),
            props: {login: false}
        },
        {
            path: '/about',
            name: 'О проекте',
            component: () => import('@/views/AboutView/AboutView.vue')
        },
        // 404 page
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/Page404.vue')
        }
    ],
})

router.beforeEach((to) => {
    if(to.path == '/' || !to.name){
        document.title = 'ARVAVIR'
        return
    }

    document.title = `ARVAVIR | ${to.name.toString()}`
})

export default router
