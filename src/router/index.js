import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import Login from '/src/components/Login.vue'
import CreateAccount from '/src/components/CreateAccount.vue'
import Routines from '/src/components/Routines.vue'
import Dashboard from '/src/components/Dashboard.vue'
import CreateRoutine from '/src/components/CreateRoutine.vue'
import Stats from '/src/components/Stats.vue'
import EditRoutine from '/src/components/EditRoutine.vue'




import { check } from 'prettier'
import { useAuthStore } from '../store'




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
        path: '/',
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

        },
         {
            path: '/stats',
            name: 'Stats',
            component: Stats,
            meta: {
			    requiresAuth: true,
		    },
            },
         {
            path: '/editroutine',
            name: 'EditRoutine',
            component: EditRoutine,
            meta: {
			    requiresAuth: true,
             },
            props: true
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
