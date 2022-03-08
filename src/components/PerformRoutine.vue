<template>
    <div class="row">
        <div class="col-md-2 col-xs-0"></div>
        <div class="col-md-8 col-xs-12">
            <q-linear-progress
                :value="generalStore.normalizedProgress"
                class="q-mt-md"
            />
            <div class="row exercisesLeftRow items-center">
                <div class="col-xs-6">
                    <div class="row">
                        <div
                            class="
                                col-xs-4
                                text-h3
                                items-center
                                exercisesLeftText
                            "
                            style=""
                        >
                            {{
                                generalStore.exercises.length -
                                generalStore.performedExerciseID
                            }}
                        </div>
                        <div class="col-xs-8 text-subtitle2 exercisesLeftText">
                            <div class="row text-bold" style="padding-top: 2px">
                                Exercises
                            </div>
                            <div
                                class="row exercisesLeftText text-bold"
                                style="padding: 0px"
                            >
                                remaining
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col" style="margin-top: 20px; margin-bottom: 20px">
                    <div
                        v-show="!generalStore.resting"
                        style="margin-top: 30px"
                        class=""
                    >
                        <div class="text-center text-subtitle">
                            Current exercise:
                        </div>
                    </div>
                    <div
                        v-show="generalStore.resting"
                        style="margin-top: 30px"
                        class="text-center text-subtitle"
                    >
                        Next exercise:
                    </div>
                    <div
                        style="margin-top: 10px"
                        class="text-center text-h4 text-primary"
                    >
                        {{
                            generalStore.exercises[
                                generalStore.performedExerciseID
                            ].title
                        }}
                    </div>
                </div>
            </div>
            <q-form
                ref="form"
                class="restForm"
                @submit="onSubmit"
                v-show="!generalStore.resting"
            >
                <q-input
                    type="number"
                    v-model="generalStore.reps"
                    style="width: 100%; margin-top: 30px"
                    outlined
                    label="Reps completed"
                ></q-input>
                <q-btn
                    :disabled="!generalStore.reps"
                    style="width: 100%; margin-top: 30px; margin-bottom: 30px"
                    class="text-black"
                    label="next"
                    type="submit"
                    color="primary"
                ></q-btn
            ></q-form>
            <q-circular-progress
                v-show="generalStore.resting"
                :max="generalStore.totalRestTime"
                show-value
                class="text-primary q-ma-xl"
                :value="generalStore.activeRestTime"
                size="200px"
                color="primary"
            />
            <div class="restForm" v-show="!generalStore.resting">
                <LineChart
                    ref="lineRef"
                    height="75px"
                    :options="options"
                    :chartData="testData"
                />
            </div>
        </div>

        <div class="col-md-2 col-xs-0"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'
import { useAuthStore, useGeneralStore } from '../store'
import { defineComponent } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const generalStore = useGeneralStore()
const authStore = useAuthStore()

generalStore.setToolbarTitle('')

let form = ref(null)
let testData = {
    labels: ['01/03/22', '02/03/22', '03/03/22', '04/03/22', '06/03/22'],
    datasets: [
        {
            data: [5, 4, 7, 7, 8],
            backgroundColor: ['#00C896'],
        },
    ],
}

let options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Reps in previous workouts',
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
        },
    },
}
if (!generalStore.exercises) {
    router.push('/routines')
}
function onSubmit() {
    form.value.validate()
    if (generalStore.exercises.length - 1 > generalStore.performedExerciseID) {
        generalStore.performedExercise =
            generalStore.exercises[generalStore.performedExerciseID]
        generalStore.createPerformedExercise(generalStore.performedRoutineID)
        generalStore.performedExerciseID += 1
        generalStore.reps = null
        generalStore.totalRestTime =
            generalStore.exercises[generalStore.performedExerciseID].rest_time
        generalStore.activeRestTime = generalStore.totalRestTime
        countDownTimer()
    } else if (
        generalStore.exercises.length - 1 ===
        generalStore.performedExerciseID
    ) {
        generalStore.performedExercise =
            generalStore.exercises[generalStore.performedExerciseID]
        generalStore.createPerformedExercise(generalStore.performedRoutineID)
        generalStore.reps = null
        generalStore.performedExerciseID = 0
        router.push('/complete')
    } else {
        generalStore.performedExerciseID = 0
        router.push('/complete')
    }
}
function countDownTimer() {
    if (generalStore.activeRestTime > 0) {
        generalStore.resting = true

        setTimeout(() => {
            generalStore.activeRestTime -= 1
            countDownTimer()
            if (generalStore.activeRestTime === 0) {
                generalStore.activeRestTime = generalStore.totalRestTime
                generalStore.resting = false
            }
        }, 1000)
    }
}
</script>

<style lang="sass">
.exercisesLeftRow
    background-color: #518071
    padding: 1em
.exercisesLeftText
    color: #1d1d1d
.restForm
    padding-left: 10px
    padding-right: 10px
</style>
