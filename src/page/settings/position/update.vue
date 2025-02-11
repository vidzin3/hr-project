<script setup lang="ts">
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const form = ref({
    id:null,
    code:null,
    khmer_name:null,
    latin_name:null,
    sort:null,
    created_by: null,
    updated_by: null,
    deleted_at: dayjs(new Date()).format("YYYY-MM-DD"),
    created_at: dayjs(new Date()).format("YYYY-MM-DD"),
    updated_at: dayjs(new Date()).format("YYYY-MM-DD")
})

const resetForm = () => {
    form.value = {
        id:null,
        code:null,
        khmer_name:null,
        latin_name:null,
        sort:null,
        created_by: null,
        updated_by: null,
        deleted_at: dayjs(new Date()).format("YYYY-MM-DD"),
        created_at: dayjs(new Date()).format("YYYY-MM-DD"),
        updated_at: dayjs(new Date()).format("YYYY-MM-DD")
    }
}

const fetchData = () => {
    let items = JSON.parse(localStorage.getItem("positions")) || []
    let item = items.find((e) => e.id == router.currentRoute.value.params.id);
    if (item) {
        form.value = { ...item };
    }
}

const onSubmit = () => {
    let items = JSON.parse(localStorage.getItem('positions')) || [];
    let index = items.findIndex((e) => e.id == form.value.id);

    if (index !== -1) {
        items[index] = {
            ...items[index],
            ...form.value,
            updated_at: dayjs(new Date()).format("YYYY-MM-DD"),
        };

        localStorage.setItem('positions', JSON.stringify(items));
        Toast.fire({
            title:"Update successfully",
            icon:'success'
        })
        router.push('/setting/position/list')
    } else {
        Swal.fire({
            title:"Data on Found!",
            icon:'error'
        })
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div>
        <AppForm
            btn-submit="Save"
            title="កែសម្រួលមុខតំណែង"
            @submit="onSubmit"
            @on-clear="resetForm"
        >
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.code"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Code"
                        :rules="[(v) => !!v  || 'Code is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.khmer_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Khmer name"
                        :rules="[(v) => !!v  || 'Khmer name is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.latin_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Latin Name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.sort"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Sort Number"
                    ></v-text-field>
                </v-col>
            </v-row>
        </AppForm>
    </div>
</template>