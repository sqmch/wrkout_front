import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            token: null,
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
    // arrow function recommended for full type inference
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
