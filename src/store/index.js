import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            token: null,
            user: null,
        }
    },
    actions: {
        setToken(payload) {
            this.token = payload.token
        }
    }
})
