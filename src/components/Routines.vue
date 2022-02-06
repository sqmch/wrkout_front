<template>
    <q-dialog v-model="createDialog">
        <q-card class="my-card" style="width: 100vw">
            <q-card-section>
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
                        hint="The rest time in seconds"
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
                <q-avatar
                    icon="warning"
                    color="gray-9"
                    size="xl"
                    style="margin-bottom: 20px"
                />

                <span class="q-ml-sm"
                    >Are you sure you want to delete this workout
                    routine?.</span
                >
            </q-card-section>

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
        <div class="row text-subtitle2 items-center">
            Workout routines
            <q-space></q-space>
            <q-btn
                @click="createRoutineDialog"
                round
                flat
                color="blue-4"
                size="md"
                label=""
                icon="add"
                class="text-black"
            />
        </div>
        <q-separator style="margin-bottom: 15px"></q-separator>
        <q-list v-for="routine in routines" v-bind:key="routine">
            <q-item-section>
                <q-expansion-item
                    switch-toggle-side
                    icon=""
                    :label="routine.title"
                >
                    <q-card class="bg-grey-10">
                        <q-card-section v-show="routine.description.length > 0">
                            <div class="row">
                                <div class="row">{{ routine.description }}</div>
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
                                    @click="editRoutine"
                                    class="fit"
                                    flat
                                    icon="edit"
                                ></q-btn>
                            </div>

                            <div class="col">
                                <q-btn
                                    @click=""
                                    class="fit"
                                    flat
                                    color="blue-4"
                                    size="lg"
                                >
                                    <q-icon name="play_arrow"></q-icon>
                                </q-btn>
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
import axios from 'axios'
import { useAuthStore } from '../store'

const store = useAuthStore()

let routines = ref(null)
let rest_time = ref(90)
let routine_title = ref('')
let routine_description = ref('')
let createDialog = ref(false)
let confirmDelete = ref(false)
let editedItem = ref(null)

function getRoutines() {
    axios
        .get(`http://localhost:8000/users/${store.user_id}/routines`)
        .then(function (response) {
            routines.value = response.data
            console.log(response.data)
        })
}
function createRoutineDialog() {
    console.log('createRoutineDialog ran')
    createDialog.value = true
}
function createRoutine() {
    axios
        .post(`http://localhost:8000/users/${store.user_id}/routines`, {
            user_id: store.user_id,
            title: routine_title.value,
            description: routine_description.value,
        })
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
        .delete(
            `http://localhost:8000/users/${store.user_id}/routines/${editedItem.value.id}`
        )
        .then(function (response) {
            getRoutines()
        })
}

function editRoutine() {}

function closeDialog() {
    createDialog.value = false
}

function onSubmit() {
    createRoutine()
    console.log('onSubmit ran')
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
</style>
