<template>
    <div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                fab
                to="/createroutine"
                icon="add"
                color="blue-4"
                class="text-black"
            />
        </q-page-sticky>
        <routine-list></routine-list>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore, useGeneralStore } from '../store'
import router from '../router'
import RoutineList from './RoutineList.vue'

const store = useAuthStore()
const generalStore = useGeneralStore()

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
</script>

<style lang="sass">
.createRoutineInput
    margin-bottom: 25px
.emptyRoutineList
    margin-top: 5vh
</style>
