<template>
    <div>
        <q-form ref="form" @submit="onSubmit" class="q-gutter-md">
            <q-input
                filled
                v-model="generalStore.formTitle"
                :label="titleLabel"
                :hint="titleHint"
                lazy-rules
                :rules="[
                    (val) => (val && val.length > 0) || 'Please enter a name',
                ]"
            />
            <!-- <q-input
                filled
                v-model="generalStore.formDescription"
                :label="descriptionLabel"
                :hint="descriptionHint"
            />-->

            <q-input
                v-show="restTimeHint"
                filled
                color="grey-2"
                type="number"
                v-model="generalStore.formRestTime"
                label="Rest time"
                :hint="restTimeHint"
                lazy-rules
                :rules="[
                    (val) =>
                        (val !== null && val !== '') ||
                        'Please enter a rest time',
                ]"
            />
            <q-stepper-navigation>
                <q-btn
                    class="text-grey-9 text-bold fit"
                    label="Submit"
                    type="submit"
                    color="primary"
                />
            </q-stepper-navigation>
        </q-form>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore, useGeneralStore } from '../store'

const props = defineProps({
    submitFunction: String,
    titleLabel: String,
    descriptionLabel: String,
    titleHint: String,
    descriptionHint: String,
    restTimeHint: String,
})

const emit = defineEmits(['submit'])

const store = useAuthStore()
const generalStore = useGeneralStore()
let step = ref(1)
let form = ref(null)

function onSubmit() {
    form.value.validate()
    emit('submit')
}
</script>
