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
                            Current exercise
                        </div>
                    </div>
                    <div
                        v-show="generalStore.resting"
                        style="margin-top: 30px"
                        class="text-center text-subtitle"
                    >
                        Next exercise
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
                    label="Enter amount of reps completed"
                ></q-input>
                <q-btn
                    :disabled="!generalStore.reps"
                    style="width: 100%; margin-top: 30px; margin-bottom: 30px"
                    class="text-black text-bold"
                    label="rest"
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
                <div class="">
                    <div
                        class="text-center text-subtitle"
                        style="margin-top: 10px; margin-bottom: 15px"
                    >
                        Reps in previous workouts
                    </div>
                </div>
                <div>
                    <LineChart
                        style="height: 30vh"
                        ref="lineRef"
                        :options="options"
                        :chartData="generalStore.repData"
                    />
                </div>
            </div>
        </div>

        <div class="col-md-2 col-xs-0"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '../router'
import { useAuthStore, useGeneralStore } from '../store'
import { defineComponent } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const generalStore = useGeneralStore()
const authStore = useAuthStore()

generalStore.setToolbarTitle('')

let form = ref([])

let options = ref({
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
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
            ticks: {
                precision: 0,
                beginAtZero: true,
            },
        },
    },
})
if (!generalStore.exercises) {
    router.push('/routines')
}

function onSubmit() {
    form.value.validate()
    generalStore.nextExercise()
}

onMounted(() => {
    generalStore.getPerformedRoutines()
})
</script>

<style lang="sass">
.exercisesLeftRow
    background-color: #518071
    padding: 0.5em
.exercisesLeftText
    color: #1d1d1d
.restForm
    padding-left: 10px
    padding-right: 10px
</style>
