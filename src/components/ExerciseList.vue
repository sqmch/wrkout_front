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
        <div class="row q-pa-sm justify-center text-subtitle1">
            Exercises ({{ exercises.length }})
        </div>
        <q-separator></q-separator>

        <q-list
            dense
            padding
            v-for="exercise in generalStore.exercises"
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
                                <div class="col">
                                    Rest time: {{ exercise.rest_time }}s
                                    <div
                                        v-show="exercise.description.length > 0"
                                        class="col"
                                    >
                                        Description:
                                        {{ exercise.description }}
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <div class="row" style="">
                            <div class="col">
                                <q-btn
                                    @click="confirmDeleteExercise(exercise)"
                                    class="fit"
                                    flat
                                    color=""
                                    icon="delete"
                                ></q-btn>
                            </div>
                            <div class="col">
                                <q-btn
                                    @click="editExerciseDialog(exercise)"
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
    </div>
</template>
<script setup>
import { ref } from 'vue'
import router from '../router'
import axios from 'axios'
import { useAuthStore, useGeneralStore } from '../store'

const store = useAuthStore()
const generalStore = useGeneralStore()

let editDialog = ref(false)
let confirmDelete = ref(false)
let editedItem = ref(null)

let exercise_title = ref('')
let exercise_description = ref('')
let exercise_rest_time = ref(90)

let edit_exercise_title = ref('')
let edit_exercise_description = ref('')
let edit_exercise_rest_time = ref(90)

let editedItem = ref(null)
let exercises = ref([])

function closeDialog() {
    editDialog.value = false
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
            `users/${store.user_id}/routines/${editedItem.value.owner_id}/exercises/${editedItem.value.id}`,
            {
                title: edit_exercise_title.value,
                description: edit_exercise_description.value,
                rest_time: edit_exercise_rest_time.value,
            },
            {
                headers: { Authorization: 'Bearer ' + store.token },
            }
        )
        .then(function (response) {
            generalStore.getExercises(exercise.owner_id)
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
            `users/${store.user_id}/routines/${editedItem.value.owner_id}/exercises/${editedItem.value.id}`,
            {
                headers: { Authorization: 'Bearer ' + store.token },
            }
        )
        .then(function (response) {
            generalStore.getExercises(exercise.owner_id)
        })
}
function onExerciseSubmit() {
    createExerciseForm.value.validate()
    createExercise()
}
</script>
