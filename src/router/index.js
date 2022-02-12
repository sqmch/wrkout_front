import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import Login from '/src/components/Login.vue'
import CreateAccount from '/src/components/CreateAccount.vue'
import Routines from '/src/components/Routines.vue'
import Dashboard from '/src/components/Dashboard.vue'
import CreateRoutine from '/src/components/CreateRoutine.vue'


import { check } from 'prettier'
import { useAuthStore } from '../store'


//const store = useAuthStore()


const routes = [
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

    {
        path: '',
        component: Home,
        meta: {
			requiresAuth: true,
		},
        children: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
			    requiresAuth: true,
		    },
        },
        {
            path: '/routines',
            name: 'Routines',
            component: Routines,
            meta: {
			    requiresAuth: true,
		    },
        },
        {
            path: '/createroutine',
            name: 'CreateRoutine',
            component: CreateRoutine,
            meta: {
			    requiresAuth: true,
		    },
        }
      ]
    }

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
