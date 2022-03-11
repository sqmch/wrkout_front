<template>
    <div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                fab
                to="/createroutine"
                icon="add"
                color="primary"
                class="text-black"
                style="margin-bottom: 3em"
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

