<template>
    <div>stats.vue - WIP</div>
</template>
<script setup>
import { useAuthStore, useGeneralStore } from '../store'
import axios from 'axios'

const store = useAuthStore()
const generalStore = useGeneralStore()

authPlaceholder()
setTitle()

function setTitle() {
    generalStore.setToolbarTitle('Stats')
}
function authPlaceholder() {
    axios
        .get('protected', {
            headers: { Authorization: 'Bearer ' + store.token },
        })
        .then(function (response) {
            console.log(response)
        })
}
</script>
