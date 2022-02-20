import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

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
        setToolbarTitle(toolbarTitle) {
            this.toolbarTitle = toolbarTitle
        }

    }
})
export const useGeneralStore = defineStore('general', {
    state: () => {
        return {
            toolbarTitle: ""
        }
    },
    actions: {
        setToolbarTitle(toolbarTitle) {
            this.toolbarTitle = toolbarTitle
        }

    }
})
