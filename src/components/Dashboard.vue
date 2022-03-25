<template>
    <div class="row">
    <div class="col-md-2 col-xs-0"></div>
    <div class="col-md-8 col-xs-0">
        <div class="text-h5">Welcome back, {{store.user}}</div>

    </div>
    <div class="col-md-2 col-xs-0"></div>

    </div>
</template>
<script setup>
import { useAuthStore, useGeneralStore } from '../store'
import axios from 'axios'

const store = useAuthStore()
const generalStore = useGeneralStore()

authPlaceholder()
setTitle()

function setTitle() {
    generalStore.setToolbarTitle('Dashboard')
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
