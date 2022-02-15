<template>
    <q-dialog v-model="createDialog">
        <q-card class="my-card" style="width: 100vw">
            <q-card-section>
                <div
                    class="row text-h6"
                    style="margin-bottom: 40px; margin-top: 10px"
                >
                    Routine details
                </div>
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <q-input
                        class="createRoutineInput"
                        filled
                        v-model="routine_title"
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
                        type="textarea"
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

                    <div
                        class="row text-h6"
                        style="margin-bottom: 40px; margin-top: 10px"
                    >
                        Exercises
                    </div>

                    <div class="row">
                        <q-btn
                            class="text-black fit"
                            label="Create routine"
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
                >Are you sure you want to delete this workout
                routine?</q-card-section
            >

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="" v-close-popup />
                <q-btn
                    @click="deleteRoutine"
                    label="Delete"
                    color="red"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <div class="">
        <!-- <div class="row">
            <q-space></q-space>
            <q-btn
                class="text-black"
                to="/createroutine"
                color="blue-4"
                icon="add"
                label="create"
            ></q-btn>
        </div>
        <q-separator dark></q-separator>-->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                fab
                to="/createroutine"
                icon="add"
                color="blue-4"
                class="text-black"
            />
        </q-page-sticky>
        <div class="routineList">
            <q-card
                flat
                v-show="routines.length === 0"
                class="emptyRoutineList"
            >
                <q-card-section
                    ><div class="text-subtitle2">
                        No routines found, add your first routine!
                    </div></q-card-section
                >
            </q-card>
            <q-expansion-item
                v-for="routine in routines"
                v-bind:key="routine"
                switch-toggle-side
                icon=""
                :label="routine.title"
            >
                <q-card class="bg-grey-10">
                    <q-card-section v-show="routine.description.length > 0">
                        <div class="row">
                            <div class="row">
                                {{ routine.description }}
                            </div>
                        </div>
                    </q-card-section>

                    <div class="row" style="">
                        <div class="col">
                            <q-btn
                                @click="confirmDeleteRoutine(routine)"
                                class="fit"
                                flat
                                color=""
                                icon="delete"
                            ></q-btn>
                        </div>
                        <div class="col">
                            <q-btn
                                @click="editRoutine(routine)"
                                class="fit"
                                flat
                                icon="edit"
                            ></q-btn>
                        </div>

                        <div class="col">
                            <q-btn class="fit" flat color="blue-4" size="lg">
                                <q-icon name="play_arrow"></q-icon>
                            </q-btn>
                        </div>
                    </div>
                </q-card>
            </q-expansion-item>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore, useGeneralStore } from '../store'
import router from '../router'

const store = useAuthStore()
const generalStore = useGeneralStore()

let routines = ref([])
let rest_time = ref(90)
let routine_title = ref('')
let routine_description = ref('')
let createDialog = ref(false)
let confirmDelete = ref(false)
let editedItem = ref(null)
let drag = ref(false)

setTitle()

function setTitle() {
    generalStore.setToolbarTitle('Routines')
}

function getRoutines() {
    axios
        .get(`users/${store.user_id}/routines`, {
            headers: { Authorization: 'Bearer ' + store.token },
        })
        .then(function (response) {
            routines.value = response.data
            console.log(response.data)
        })
}
function createRoutineDialog() {
    createDialog.value = true
}
function createRoutine() {
    axios
        .post(
            `users/${store.user_id}/routines`,
            {
                user_id: store.user_id,
                title: routine_title.value,
                description: routine_description.value,
            },
            {
                headers: { Authorization: 'Bearer ' + store.token },
            }
        )
        .then(function (response) {
            routines.value = response.data
            console.log(response.data)
            getRoutines()
            closeDialog()
            routine_title.value = ''
            routine_description.value = ''
        })
}

function confirmDeleteRoutine(routine) {
    confirmDelete.value = true
    editedItem.value = routine
}

function deleteRoutine() {
    axios
        .delete(`users/${store.user_id}/routines/${editedItem.value.id}`, {
            headers: { Authorization: 'Bearer ' + store.token },
        })
        .then(function (response) {
            getRoutines()
        })
}

function editRoutine(routine) {
    router.push({
        name: 'EditRoutine',
        params: { routine: JSON.stringify(routine) },
    })
}

function closeDialog() {
    createDialog.value = false
}

function onSubmit() {
    createRoutine()
}

function onReset() {
    routine_title.value = null
    routine_description.value = null
    rest_time.value = 90
}

getRoutines()
</script>
<style lang="sass">
.createRoutineInput
    margin-bottom: 25px
.emptyRoutineList
    margin-top: 5vh
</style>
