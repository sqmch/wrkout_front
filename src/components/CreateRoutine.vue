<template>
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
                <form-base
                    :formTitle="generalStore.formTitle"
                    :formDescription="generalStore.formDescription"
                    :formRestTime="generalStore.formRestTime"
                    titleLabel="Routine name"
                    descriptionLabel="Routine description (optional)"
                    titleHint="Name of your workout routine"
                    descriptionHint="Description of your workout routine"
                    restTimeHint="Rest time between exercises in seconds"
                    @submit="createRoutine"
                />
            </q-step>
            <q-step
                :name="2"
                title="Add exercises"
                icon="create_new_folder"
                :done="step > 2"
            >
                <form-base
                    :formTitle="generalStore.formTitle"
                    :formDescription="generalStore.formDescription"
                    :formRestTime="generalStore.formRestTime"
                    titleLabel="Exercise name"
                    descriptionLabel="Description (optional)"
                    titleHint="Name of the exercise"
                    descriptionHint="Description of the exercise"
                    restTimeHint="Rest time after exercise"
                    @submit="createExercise"
                />
                <exercise-list></exercise-list>
            </q-step>
        </q-stepper>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore, useGeneralStore } from '../store'
import FormBase from './FormBase.vue'
import ExerciseList from './ExerciseList.vue'

const store = useAuthStore()
const generalStore = useGeneralStore()

let step = ref(1)
let confirmDelete = ref(false)

function createRoutine() {
    generalStore.createRoutine()
    step.value = 2
    generalStore.formTitle = ''
    generalStore.formDescription = ''
}
function createExercise() {
    generalStore.createExercise(generalStore.createdRoutineID)
    generalStore.formTitle = ''
    generalStore.formDescription = ''
}
</script>
