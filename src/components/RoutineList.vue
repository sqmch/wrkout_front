<template>
    <div class="routineList">
        <q-card flat v-show="routines.length === 0" class="emptyRoutineList">
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

                <div class="row">
                    <div class="col">
                        <q-btn
                            @click="confirmDeleteRoutine(routine)"
                            class="fit"
                            flat
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
                        <q-btn
                            disabled
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
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

import { useAuthStore, useGeneralStore } from '../store'

const generalStore = useGeneralStore()
const authStore = useAuthStore()

let routines = ref(generalStore.routines)
let editedItem = ref(null)
let confirmDelete = ref(false)

refreshRoutines()
console.log('Routines in RoutineList: ', routines.value)
console.log('Routines in store: ', generalStore.routines)

function refreshRoutines() {
    generalStore.getRoutines()
    routines.value = generalStore.routines
}
function confirmDeleteRoutine(routine) {
    confirmDelete.value = true
    editedItem.value = routine
}
function deleteRoutine() {
    axios
        .delete(`users/${authStore.user_id}/routines/${editedItem.value.id}`, {
            headers: { Authorization: 'Bearer ' + authStore.token },
        })
        .then(function (response) {
            refreshRoutines()
        })
}
</script>
