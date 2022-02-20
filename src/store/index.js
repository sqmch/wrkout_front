import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios'


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: useStorage('token', null),
            user: null,
            user_id: null,
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setUserId(user_id) {
            this.user_id = user_id
        },

    }
})
export const useGeneralStore = defineStore('general', {
    state: () => {
        return {
            toolbarTitle: "",
            routines: []
        }
    },
    actions: {
        setToolbarTitle(toolbarTitle) {
            this.toolbarTitle = toolbarTitle
        },
        setRoutines(routines) {
            this.routines = routines
        },
        getRoutines() {
            const authStore = useAuthStore()
            axios
                .get(`users/${authStore.user_id}/routines`, {
                    headers: { Authorization: 'Bearer ' + authStore.token },
                })
                .then((response) => {
                    this.routines = response.data
                })

        }


    }
})
