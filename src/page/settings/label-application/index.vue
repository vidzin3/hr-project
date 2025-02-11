<script setup lang="ts">
import AppForm from '@/components/AppForm.vue';
import { computed, onMounted, ref } from 'vue';

const form = ref({
    label_application:null
})

const resetForm = () => {
    form.value = {
        label_application:null
    }
}

const data = () => {
    form.value.label_application = localStorage.getItem('label_application')
}

const onSubmit = () => {
    localStorage.removeItem('label_application')
    localStorage.setItem('label_application',form.value.label_application)
    window.location.reload()
}

onMounted(() => {
    data()
})
</script>

<template>
    <AppForm
        title="ផ្លាស់ប្តូរចំណងជើងប្រព័ន្ធ"
        @submit="onSubmit"
        @on-clear="resetForm"
    >   
        <v-label>Label Application</v-label>
        <v-text-field
            v-model="form.label_application"
            variant="outlined"
            density="compact"
        ></v-text-field>
    </AppForm>
</template>