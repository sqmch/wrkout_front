<template>
    <q-dialog v-model="editDialog">
        <q-card class="my-card" style="width: 100vw">
            <q-card-section>
                <div
                    class="row text-h6"
                    style="margin-bottom: 40px; margin-top: 10px"
                >
                    Exercise details
                </div>
                <q-form
                    ref="editExerciseForm"
                    @submit="onExerciseEditSubmit(exercise)"
                    class="q-gutter-md"
                >
                    <q-input
                        class="createRoutineInput"
                        filled
                        v-model="edit_exercise_title"
                        label="Routine name"
                        hint="Name of your workout routine"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'Please enter a name',
                        ]"
                    />
                    <q-input
                        class="createRoutineInput"
                        filled
                        v-model="edit_exercise_description"
                        label="Routine description (optional)"
                        hint="Description of your workout routine"
                    />

                    <q-input
                        class="createRoutineInput"
                        filled
                        color="grey-2"
                        type="number"
                        v-model="edit_exercise_rest_time"
                        label="Rest time"
                        hint="Rest time between exercises in seconds"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val !== null && val !== '') ||
                                'Please enter a rest time',
                        ]"
                    />

                    <div class="row">
                        <q-btn
                            class="text-black fit"
                            label="Edit exercise"
                            type="submit"
                            color="blue-4"
                        />
                    </div>
                    <div class="row">
                        <q-btn
                            class="fit"
                            @click="closeDialog"
                            v-close-popup
                            flat
                            color="grey-2"
                            label="Close"
                        />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDelete" persistent>
        <q-card>
            <q-card-section class="row items-center justify-center">
                <q-avatar icon="warning" color="gray-9" size="xl" />
            </q-card-section>
            <q-card-section
                >Are you sure you want to delete this exercise?</q-card-section
            >

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="" v-close-popup />
                <q-btn
                    @click="deleteExercise"
                    label="Delete"
                    color="red"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <div>
        <q-stepper
            header-nav
            dark
            v-model="step"
            vertical
            color="primary"
            animated
            class="no-border"
        >
            <q-step
                :name="1"
                title="Edit routine details"
                icon="settings"
                :done="step > 1"
            >
                <q-form
                    ref="createForm"
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                >
                    <q-input
                        class="editRoutineInput"
                        filled
                        v-model="routine_title"
                        label="Routine name *"
                        hint="Name of your workout routine"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'Please enter a name',
                        ]"
                    />
                    <q-input
                        class="editRoutineInput"
                        filled
                        type="textarea"
                        v-model="routine_description"
                        label="Routine description (optional)"
                        hint="Description of your workout routine"
                    />

                    <q-input
                        class="editRoutineInput"
                        filled
                        color="grey-2"
                        type="number"
                        v-model="rest_time"
                        label="Rest time"
                        hint="Rest time between exercises in seconds"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val !== null && val !== '') ||
                                'Please enter a rest time',
                        ]"
                    />

                    <q-stepper-navigation>
                        <q-btn
                            class="text-grey-9 text-bold fit"
                            label="Edit routine"
                            type="submit"
                            color="blue-4"
                    /></q-stepper-navigation>
                </q-form>
            </q-step>

            <q-step
                :name="2"
                title="Edit exercises"
                icon="list"
                :done="step > 2"
            >
                <q-form
                    ref="createExerciseForm"
                    @submit="onExerciseSubmit"
                    class="q-gutter-md q-pb-sm"
                >
                    <q-input
                        class="editRoutineInput"
                        filled
                        v-model="exercise_title"
                        label="Exercise name *"
                        hint="Name of the exercise"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'Please enter a name',
                        ]"
                    />
                    <q-input
                        class="editRoutineInput"
                        filled
                        v-model="exercise_description"
                        label="Exercise description (optional)"
                        hint="Description of the exercise"
                    />

                    <q-input
                        class="editRoutineInput"
                        filled
                        color="grey-2"
                        type="number"
                        v-model="exercise_rest_time"
                        label="Rest time"
                        hint="Rest time between exercises in seconds"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val !== null && val !== '') ||
                                'Please enter a rest time',
                        ]"
                    />

                    <q-stepper-navigation>
                        <q-btn
                            class="text-grey-9 text-bold fit"
                            label="Add exercise"
                            type="submit"
                            color="blue-4"
                    /></q-stepper-navigation>
                </q-form>
                <div class="row q-pa-sm justify-center text-subtitle1">
                    Exercises ({{ exercises.length }})
                </div>
                <q-separator></q-separator>

                <q-list
                    dense
                    padding
                    v-for="exercise in exercises"
                    v-bind:key="exercise"
                >
                    <q-item-section>
                        <q-expansion-item
                            switch-toggle-side
                            icon=""
                            :label="exercise.title"
                        >
                            <q-card class="bg-grey-10">
                                <q-card-section>
                                    <div class="row">
                                        <div class="row">
                                            {{ exercise.description }}
                                        </div>
                                        <div class="row">
                                            Rest time: {{ exercise.rest_time }}s
                                        </div>
                                    </div>
                                </q-card-section>

                                <div class="row" style="">
                                    <div class="col">
                                        <q-btn
                                            @click="
                                                confirmDeleteExercise(exercise)
                                            "
                                            class="fit"
                                            flat
                                            color=""
                                            icon="delete"
                                        ></q-btn>
                                    </div>
                                    <div class="col">
                                        <q-btn
                                            @click="
                                                editExerciseDialog(exercise)
                                            "
                                            class="fit"
                                            flat
                                            icon="edit"
                                        ></q-btn>
                                    </div>
                                </div>
                            </q-card>
                        </q-expansion-item>
                    </q-item-section>
                </q-list>
            </q-step>
        </q-stepper>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'
import axios from 'axios'
import { useAuthStore, useGeneralStore } from '../store'

const store = useAuthStore()
const generalStore = useGeneralStore()

const props = defineProps({
    routine: String,
})
let parsedRoutine = ref(JSON.parse(props.routine))
let routines = ref(null)
let exercises = ref([])

let rest_time = ref(90)
let routine_title = ref(parsedRoutine._value.title)
let routine_description = ref(parsedRoutine._value.description)
let exercise_title = ref('')
let exercise_description = ref('')
let exercise_rest_time = ref(90)

let edit_exercise_title = ref('')
let edit_exercise_description = ref('')
let edit_exercise_rest_time = ref(90)

let editDialog = ref(false)

let createDialog = ref(false)
let confirmDelete = ref(false)
let editedItem = ref(null)
let step = ref(1)
let createForm = ref(null)
let createExerciseForm = ref(null)
let created_routine_id = ref(null)
let editExerciseForm = ref(null)

let splitterModel = ref(50)

getExercises()
setTitle()

function setTitle() {
    generalStore.setToolbarTitle('Edit routine')
}

function goBack() {
    router.go(-1)
}

function closeDialog() {
    createDialog.value = false
}
function getRoutines() {
    axios.get(`users/${store.user_id}/routines`).then(function (response) {
        routines.value = response.data
    })
}
function getExercises() {
    axios
        .get(
            `users/${store.user_id}/routines/${parsedRoutine.value.id}/exercises`
        )
        .then(function (response) {
            exercises.value = response.data
        })
}

function editRoutine() {
    axios
        .put(`users/${store.user_id}/routines/${parsedRoutine.value.id}`, {
            user_id: store.user_id,
            title: routine_title.value,
            description: routine_description.value,
        })
        .then(function (response) {
            getRoutines()
            getExercises()
            routine_title.value = ''
            routine_description.value = ''
        })
}
function createExercise() {
    axios
        .post(
            `users/${store.user_id}/routines/${parsedRoutine.value.id}/exercises`,
            {
                owner_id: created_routine_id.value,
                title: exercise_title.value,
                description: exercise_description.value,
            }
        )
        .then(function (response) {
            getExercises()
            exercise_title.value = ''
            exercise_description.value = ''
        })
}
function editExerciseDialog(exercise) {
    editDialog.value = true
    editedItem.value = exercise
    edit_exercise_title.value = exercise.title
    edit_exercise_description.value = exercise.description
    edit_exercise_rest_time.value = exercise.rest_time
}
function editExercise(exercise) {
    axios
        .put(
            `users/${store.user_id}/routines/${parsedRoutine.value.id}/exercises/${editedItem.value.id}`,
            {
                title: edit_exercise_title.value,
                description: edit_exercise_description.value,
                rest_time: edit_exercise_rest_time.value,
            }
        )
        .then(function (response) {
            getExercises()
            editDialog.value = false
            edit_exercise_title.value = ''
            edit_exercise_description.value = ''
            edit_exercise_rest_time.value = 90
        })
}
function onExerciseEditSubmit(exercise) {
    editExerciseForm.value.validate()
    editExercise(exercise)
}

function confirmDeleteExercise(exercise) {
    confirmDelete.value = true
    editedItem.value = exercise
}
function deleteExercise(exercise) {
    axios
        .delete(
            `users/${store.user_id}/routines/${parsedRoutine.value.id}/exercises/${editedItem.value.id}`
        )
        .then(function (response) {
            getExercises()
        })
}
function onSubmit() {
    createForm.value.validate()
    editRoutine()
    step.value = 2
}
function onExerciseSubmit() {
    createExerciseForm.value.validate()
    createExercise()
}

function onReset() {
    routine_title.value = null
    routine_description.value = null
    rest_time.value = 90
}
</script>
