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
import { useGeneralStore } from '../store'
import RoutineList from './RoutineList.vue'

const generalStore = useGeneralStore()
generalStore.setToolbarTitle('Routines')
</script>

<style lang="sass">
.createRoutineInput
    margin-bottom: 25px
.emptyRoutineList
    margin-top: 5vh
</style>
