<template>
    <div class="row">
        <div class="col-md-2 col-xs-0"></div>
        <div class="col-md-8 col-xs-12">
            <div
                v-show="!generalStore.resting"
                style="margin-top: 30px"
                class="text-center text-subtitle1"
            >
                Current exercise:
            </div>
            <div
                v-show="generalStore.resting"
                style="margin-top: 30px"
                class="text-center text-subtitle1"
            >
                Next exercise:
            </div>
            <div
                style="margin-top: 10px"
                class="text-center text-h4 text-blue-4"
            >
                {{
                    generalStore.exercises[generalStore.performedExerciseID]
                        .title
                }}
            </div>

            <q-form
                ref="form"
                @submit="onSubmit"
                v-show="!generalStore.resting"
            >
                <q-input
                    type="number"
                    v-model="generalStore.reps"
                    style="width: 100%; margin-top: 30px"
                    class=""
                    outlined
                    label="Reps completed"
                ></q-input>
                <q-btn
                    :disabled="!generalStore.reps"
                    color="blue-4"
                    style="width: 100%; margin-top: 30px; margin-bottom: 30px"
                    class="text-black"
                    label="rest"
                    type="submit"
                ></q-btn
            ></q-form>
            <q-circular-progress
                v-show="generalStore.resting"
                :max="generalStore.totalRestTime"
                show-value
                class="text-light-blue q-ma-md"
                :value="generalStore.activeRestTime"
                size="100px"
                color="light-blue"
            />
        </div>

        <div class="col-md-2 col-xs-0"></div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import router from '../router'
import { useAuthStore, useGeneralStore } from '../store'

const generalStore = useGeneralStore()
const authStore = useAuthStore()

let form = ref(null)
let resting = ref(false)

console.log(generalStore.exercises)
function onSubmit() {
    form.value.validate()
    if (generalStore.exercises.length - 1 > generalStore.performedExerciseID) {
        generalStore.performedExerciseID += 1
        generalStore.reps = null
        generalStore.totalRestTime =
            generalStore.exercises[generalStore.performedExerciseID].rest_time
        generalStore.activeRestTime = generalStore.totalRestTime
        countDownTimer()
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
