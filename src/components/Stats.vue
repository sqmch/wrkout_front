<template>
    <div>stats.vue - WIP</div>
</template>
<script setup>
import { useAuthStore, useGeneralStore } from '../store'

const generalStore = useGeneralStore()

setTitle()
console.log(generalStore.toolbarTitle)

function setTitle() {
    generalStore.setToolbarTitle('Stats')
}
</script>
