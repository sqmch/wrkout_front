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
                <q-form @submit="onExerciseEditSubmit" class="q-gutter-md">
                    <q-input
                        class="createRoutineInput"
                        filled
                        v-model="editedItem.title"
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
                        v-model="editedItem.description"
                        label="Routine description (optional)"
                        hint="Description of your workout routine"
                    />

                    <q-input
                        class="createRoutineInput"
                        filled
                        color="grey-2"
                        type="number"
                        v-model="editedItem.rest_time"
                        label="Rest time"
                        hint="Rest time between exercises in seconds"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val !== null && val !== '') ||
                                'Please enter a rest time',
                        ]"
                    />

                    <div
                        class="row text-h6"
                        style="margin-bottom: 40px; margin-top: 10px"
                    >
                        Exercises
                    </div>

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
    <div>
        <div class="row">
            <q-toolbar>
                <q-btn flat round icon="arrow_back" @click="goBack"></q-btn>
                <q-toolbar-title>Create workout routine</q-toolbar-title>
            </q-toolbar>
        </div>

        <!--  "header-nav" into stepper for clickable steps-->
        <q-stepper
            dark
            v-model="step"
            vertical
            color="primary"
            animated
            class="no-border"
        >
            <q-step
                :name="1"
                title="Routine details"
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
                        class="createRoutineInput"
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
                        class="createRoutineInput"
                        filled
                        v-model="routine_description"
                        label="Routine description (optional)"
                        hint="Description of your workout routine"
                    />

                    <q-input
                        class="createRoutineInput"
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
                            label="Create routine"
                            type="submit"
                            color="blue-4"
                    /></q-stepper-navigation>
                </q-form>
            </q-step>

            <q-step
                :name="2"
                title="Add exercises"
                icon="create_new_folder"
                :done="step > 2"
            >
                <q-form
                    ref="createExerciseForm"
                    @submit="onExerciseSubmit"
                    class="q-gutter-md q-pb-sm"
                >
                    <q-input
                        class="createRoutineInput"
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
                        class="createRoutineInput"
                        filled
                        v-model="exercise_description"
                        label="Exercise description (optional)"
                        hint="Description of the exercise"
                    />

                    <q-input
                        class="createRoutineInput"
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
                                            @click="editExercise(exercise)"
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
        <q-dialog v-model="confirmDelete" persistent>
            <q-card>
                <q-card-section class="row items-center justify-center">
                    <q-avatar
                        icon="warning"
                        color="gray-9"
                        size="xl"
                        style="margin-bottom: 20px"
                    />

                    <span class="q-ml-sm"
                        >Are you sure you want to delete this exercise?</span
                    >
                </q-card-section>

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
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'
import axios from 'axios'
import { useAuthStore } from '../store'

const store = useAuthStore()
let routines = ref(null)
let exercises = ref([])

let rest_time = ref(90)
let routine_title = ref('')
let routine_description = ref('')
let exercise_title = ref('')
let exercise_description = ref('')
let exercise_rest_time = ref(90)

let createDialog = ref(false)
let confirmDelete = ref(false)
let editedItem = ref(null)
let step = ref(1)
let createForm = ref(null)
let createExerciseForm = ref(null)
let created_routine_id = ref(null)

let splitterModel = ref(50)

function goBack() {
    router.go(-1)
}

function closeDialog() {
    createDialog.value = false
}
function getRoutines() {
    axios
        .get(`https://wrkout1.herokuapp.com/users/${store.user_id}/routines`)
        .then(function (response) {
            routines.value = response.data
        })
}
function getExercises() {
    console.log('getExercises - ', created_routine_id.value)
    axios
        .get(
            `https://wrkout1.herokuapp.com/users/${store.user_id}/routines/${created_routine_id.value}/exercises`
        )
        .then(function (response) {
            exercises.value = response.data
            console.log('... ', exercises.value)
        })
}

function createRoutine() {
    axios
        .post(`https://wrkout1.herokuapp.com/users/${store.user_id}/routines`, {
            user_id: store.user_id,
            title: routine_title.value,
            description: routine_description.value,
        })
        .then(function (response) {
            getRoutines()
            created_routine_id.value = response.data.id
            routine_title.value = ''
            routine_description.value = ''
        })
}
function createExercise() {
    axios
        .post(
            `https://wrkout1.herokuapp.com/users/${store.user_id}/routines/${created_routine_id.value}/exercises`,
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
function editExercise(exercise) {
    axios
        .put(
            `https://wrkout1.herokuapp.com/users/${store.user_id}/routines/${exercise.owner_id}/exercises/${exercise.id}`,
            {
                owner_id: exercise.owner_id,
                title: exercise.title,
                description: exercise.description,
                rest_time: exercise.rest_time,
            }
        )
        .then(function (response) {
            getExercises()
            exercise_title.value = ''
            exercise_description.value = ''
        })
}

function confirmDeleteExercise(exercise) {
    confirmDelete.value = true
    editedItem.value = exercise
}
function deleteExercise(exercise) {
    console.log('before deleteExercise - ', editedItem.value)
    axios
        .delete(
            `https://wrkout1.herokuapp.com/users/${store.user_id}/routines/${editedItem.value.owner_id}/exercises/${editedItem.value.id}`
        )
        .then(function (response) {
            getExercises()
        })
}
function onSubmit() {
    createForm.value.validate()
    createRoutine()
    step.value = 2
}
function onExerciseSubmit() {
    createExerciseForm.value.validate()
    createExercise()
}

function onExerciseEditSubmit() {
    createExerciseForm.value.validate()
    editExercise()
}

function onReset() {
    routine_title.value = null
    routine_description.value = null
    rest_time.value = 90
}
</script>
