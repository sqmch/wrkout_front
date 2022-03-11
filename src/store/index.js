import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
import router from '../router'



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
            performedExerciseID: 0,
            routines: [],
            exercises: [],
            editedRoutineID: null,
            editedExerciseID: null,
            formTitle: "",
            formDescription: "",
            formRestTime: 90,
            exerciseFormTitle: "",
            exerciseFormDescription: "",
            createdRoutineID: null,
            step: 1,
            reps: null,
            totalRestTime: null,
            activeRestTime: null,
            resting: false,
            performedRoutineTitle: null,
            performedExercise: null,
            currentPerformedRoutines: null,
            repsHistoryList: [],
            repsLabelList: [],
            processedDate: null,
            repsChartDataSliceSize: -10
        }
    },
    getters: {
        exercisesSortedByID: (state) => state.exercises.sort((a, b) => (a.id > b.id ? 1 : -1)),
        routinesSortedByID: (state) => state.routines.sort((a, b) => (a.id > b.id ? 1 : -1)),
        normalizedProgress: (state) => 1-(state.exercises.length - state.performedExerciseID - 0) /
            (state.exercises.length - 0),
        repData: (state) => ({
                labels: state.repsLabelList.slice(state.repsChartDataSliceSize),
                datasets: [
                    {
                        label: " " + state.performedExercise.title,
                        data: state.repsHistoryList.slice(state.repsChartDataSliceSize),
                        backgroundColor: ['#00C896'],
                        borderColor: ['#00C896'],
                        pointHitRadius: 50,
                        pointRadius: 5,
                        pointBorderWidth: 5,
                        pointHoverBorderWidth: 5,
                        pointHoverRadius: 10

                    },
                ],
            }),
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
                    this.resting = false
                    this.activeRestTime = null
                    this.totalRestTime = null
                    this.reps = null
                    this.performedExerciseID = 0

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
                        description: this.formDescription,
                        rest_time: this.formRestTime
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then( (response) => {
                    this.getRoutines()
                    this.formTitle = ''
                    this.formDescription = ''
                    this.formRestTime = 90
                    this.createdRoutineID = response.data.id
                    this.getExercises(this.createdRoutineID)
                })
        },
        editRoutine(routine_id) {
            const authStore = useAuthStore()
            axios
                .put(
                    `users/${authStore.user_id}/routines/${routine_id}`,
                    {
                        user_id: authStore.user_id,
                        title: this.formTitle,
                        description: this.formDescription,
                        rest_time: this.formRestTime
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
                    this.formRestTime = 90
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
                        rest_time: this.formRestTime
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
        },
        createPerformedRoutine() {
            const authStore = useAuthStore()
            axios
                .post(
                    `users/${authStore.user_id}/performed_routines`,
                    {
                        user_id: authStore.user_id,
                        title: this.performedRoutineTitle,
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.performedRoutineID = response.data.id
                })
        },
        createPerformedExercise() {
            const authStore = useAuthStore()
            axios
                .post(
                    `users/${authStore.user_id}/performed_routines/${this.performedRoutineID}/performed_exercises`,
                    {
                        user_id: authStore.user_id,
                        title: this.performedExercise.title,
                        reps: this.reps
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {

                })
        },
        getPerformedRoutines() {
            const authStore = useAuthStore()
             axios
                .get(`users/${authStore.user_id}/performed_routines/${this.performedRoutineTitle}`,
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    })
                .then((response) => {
                    this.currentPerformedRoutines = response.data
                    this.repsHistoryList = []
                    this.repsLabelList = []
                    for (var routine in this.currentPerformedRoutines) {
                        if ( this.currentPerformedRoutines[routine].performed_exercises.length > 0)
                        {
                            for (var exercise in this.currentPerformedRoutines[routine].performed_exercises)
                            {
                                if (this.currentPerformedRoutines[routine].performed_exercises[exercise].title ===
                                    this.performedExercise.title)
                                {
                                    this.repsHistoryList.push(this.currentPerformedRoutines[routine].performed_exercises[exercise].reps)
                                    this.processedDate = this.currentPerformedRoutines[routine].performed_exercises[exercise].date.slice(0, 10)
                                    this.processedDate = this.processedDate.slice(-2) + "-" + this.processedDate.slice(-5, -3) + "-" +  this.processedDate.slice(2, 4)
                                    this.repsLabelList.push(this.processedDate)

                                }

                            }
                        } else {
                            console.log("no exercises, skipping");
                        }
                    }
                })
        },
        countDownTimer() {
            if (this.activeRestTime > 0) {
                this.resting = true
                setTimeout(() => {
                    this.activeRestTime -= 1
                    this.countDownTimer()
                    if (this.activeRestTime === 0) {
                        this.activeRestTime = this.totalRestTime
                        this.resting = false
                    }
                }, 1000)
            }
        },
        nextExercise() {
            if (this.exercises.length - 1 > this.performedExerciseID) {
                this.createPerformedExercise(this.performedRoutineID)
                this.performedExerciseID += 1
                this.performedExercise =
                    this.exercises[this.performedExerciseID]
                this.getPerformedRoutines()
                this.reps = null
                this.totalRestTime =
                    this.exercises[this.performedExerciseID].rest_time
                this.activeRestTime = this.totalRestTime
                this.countDownTimer()
            } else if (
                this.exercises.length - 1 ===
                this.performedExerciseID
            ) {

                this.createPerformedExercise(this.performedRoutineID)
                this.performedExercise =
                this.exercises[this.performedExerciseID]
                this.getPerformedRoutines()
                this.reps = null
                this.performedExerciseID = 0
                router.push('/routines')
            } else {
                this.performedExerciseID = 0
                router.push('/routines')
            }
        }


    }
})
