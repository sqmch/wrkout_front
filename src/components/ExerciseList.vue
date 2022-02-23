<template>
    <div>
        <div class="row q-pa-sm justify-center text-subtitle1">
            Exercises ({{ generalStore.exercises.length }})
        </div>
        <q-separator></q-separator>

        <q-list
            dense
            padding
            v-for="exercise in generalStore.exercises"
            v-bind:key="exercise"
        >
            <q-dialog v-model="confirmDelete" persistent>
                <q-card>
                    <q-card-section class="row items-center justify-center">
                        <q-avatar icon="warning" color="gray-9" size="xl" />
                    </q-card-section>
                    <q-card-section
                        >Are you sure you want to delete this
                        exercise?</q-card-section
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
            <q-dialog v-model="editDialog">
                <q-card class="my-card" style="width: 100vw">
                    <q-card-section>
                        <div
                            class="row text-h6"
                            style="margin-bottom: 40px; margin-top: 10px"
                        >
                            Exercise details
                        </div>
                        <form-base
                            :formTitle="generalStore.formTitle"
                            :formDescription="generalStore.formDescription"
                            :formRestTime="generalStore.formRestTime"
                            titleLabel="Exercise name"
                            descriptionLabel="Description (optional)"
                            titleHint="Name of the exercise"
                            descriptionHint="Description of the exercise"
                            restTimeHint="Rest time after exercise"
                            @submit="onExerciseEditSubmit"
                        />
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
                    </q-card-section>
                </q-card>
            </q-dialog>
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
import FormBase from './FormBase.vue'

const store = useAuthStore()
const generalStore = useGeneralStore()

let editDialog = ref(false)
let confirmDelete = ref(false)
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
    generalStore.formTitle = exercise.title
    generalStore.formDescription = exercise.description
    generalStore.formRestTime = exercise.rest_time
    generalStore.editedRoutineID = exercise.owner_id
    generalStore.editedExerciseID = exercise.id
}

function onExerciseEditSubmit(exercise) {
    generalStore.editExercise()
    editDialog.value = false
}

function confirmDeleteExercise(exercise) {
    console.log('exercise from confirmDeleteExercise: ', exercise)
    confirmDelete.value = true
    generalStore.editedRoutineID = exercise.owner_id
    generalStore.editedExerciseID = exercise.id
}
function deleteExercise() {
    generalStore.deleteExercise()
}
function onExerciseSubmit() {
    createExerciseForm.value.validate()
    generalStore.createExercise()
}
</script>
