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
            currentRoutine: null,
            routines: [],
            exercises: [],
            editedRoutineID: null,
            editedExerciseID: null,
            formTitle: "",
            formDescription: "",
            formRestTime: 90,
            exerciseFormTitle: "",
            exerciseFormDescription: "",
            exerciseFormRestTime: "",
            createdRoutineID: null,
            step: 1
        }
    },
    getters: {
        exercisesSortedByID: (state) => state.exercises.sort((a, b) => (a.id > b.id ? 1 : -1)),
        routinesSortedByID: (state) => state.routines.sort((a, b) => (a.id > b.id ? 1 : -1))

    },
    actions: {
        setToolbarTitle(toolbarTitle) {
            this.toolbarTitle = toolbarTitle
        },
        ////////////////
        // ROUTINES
        ////////////////
        getRoutines() {
            const authStore = useAuthStore()
            axios
                .get(`users/${authStore.user_id}/routines`, {
                    headers: { Authorization: 'Bearer ' + authStore.token },
                })
                .then((response) => {
                    this.routines = response.data
                })

        },
        createRoutine() {
            const authStore = useAuthStore()
            axios
                .post(
                    `users/${authStore.user_id}/routines`,
                    {
                        user_id: authStore.user_id,
                        title: this.formTitle,
                        description: this.formDescription
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then( (response) => {
                    this.getRoutines()
                    this.formTitle = ''
                    this.formDescription = ''
                    this.createdRoutineID = response.data.id
                    this.getExercises(this.createdRoutineID)
                })
        },
        editRoutine(routine_id) {
            const authStore = useAuthStore()
            console.log("routine_id from editRoutine in store: ", routine_id);
            axios
                .put(
                    `users/${authStore.user_id}/routines/${routine_id}`,
                    {
                        user_id: authStore.user_id,
                        title: this.formTitle,
                        description: this.formDescription
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getRoutines()
                    this.getExercises(routine_id)
                    this.formTitle = ""
                    this.formDescription = ""
                })
        },
        deleteRoutine(routine_id) {
            const authStore = useAuthStore()

            axios
                .delete(`users/${authStore.user_id}/routines/${routine_id}`, {
                    headers: { Authorization: 'Bearer ' + authStore.token },
                })
                .then((response) => {
                    this.getRoutines()

                })
        },
        ////////////////
        // EXERCISES
        ////////////////
        getExercises(routine_id) {
            const authStore = useAuthStore()
            axios
                .get(
                    `users/${authStore.user_id}/routines/${routine_id}/exercises`,
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.exercises = response.data
                })
        },
        createExercise(routine_id) {
            const authStore = useAuthStore()

            axios
                .post(
                    `users/${authStore.user_id}/routines/${routine_id}/exercises`,
                    {
                        owner_id:  routine_id,
                        title: this.formTitle,
                        description: this.formDescription,
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getExercises(routine_id)
                    this.formTitle = ""
                    this.formDescription = ""
                })
        },

        editExercise() {
            const authStore = useAuthStore()

            axios
                .put(
                    `users/${authStore.user_id}/routines/${this.editedRoutineID}/exercises/${this.editedExerciseID}`,
                    {
                        title: this.formTitle,
                        description: this.formDescription,
                        rest_time: this.formRestTime,
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getExercises(this.editedRoutineID)

                    this.formTitle = ''
                    this.formDescription = ''
                    this.formRestTime = 90
                })
        },
        deleteExercise() {
            const authStore = useAuthStore()
            axios
                .delete(
                    `users/${authStore.user_id}/routines/${this.editedRoutineID}/exercises/${this.editedExerciseID}`,
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getExercises(this.editedRoutineID)
                })
        }


    }
})
