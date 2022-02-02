import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import Login from '/src/components/Login.vue'
import CreateAccount from '/src/components/CreateAccount.vue'
import { check } from 'prettier'
import { useAuthStore } from '../store'


//const store = useAuthStore()


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
			requiresAuth: true,
		},
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/createaccount',
        name: 'CreateAccount',
        component: CreateAccount,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const store = useAuthStore()
    if (to.meta.requiresAuth && !store.token) return '/login'
})

export default router
