<script setup>
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const form = ref({
    id: null,
    code: null,
    khmer_name: null,
    latin_name: null,
    short_name: null,
    sort: null,
    is_city: false,
    is_district: false,
    is_khan: false,
    created_by: null,
    updated_by: null,
    deleted_at: dayjs(new Date()).format("YYYY-MM-DD"),
    created_at: dayjs(new Date()).format("YYYY-MM-DD"),
    updated_at: dayjs(new Date()).format("YYYY-MM-DD"),
});

const resetForm = () => {
    form.value = {
        id: null,
        code: null,
        khmer_name: null,
        latin_name: null,
        short_name: null,
        sort: null,
        is_city: false,
        is_district: false,
        is_khan: false,
        created_by: null,
        updated_by: null,
        deleted_at: dayjs(new Date()).format("YYYY-MM-DD"),
        created_at: dayjs(new Date()).format("YYYY-MM-DD"),
        updated_at: dayjs(new Date()).format("YYYY-MM-DD"),
    };
};

const fetchData = () => {
    let items = JSON.parse(localStorage.getItem('offices')) || [];
    let item = items.find((e) => e.id == router.currentRoute.value.params.id);
    if (item) {
        form.value = { ...item };
        form.value.is_city = item.is_city == 1 ? true : false;
        form.value.is_district = item.is_district == 1 ? true : false;
        form.value.is_khan = item.is_khan == 1 ? true : false;
    }
};

const onSubmit = () => {
    let items = JSON.parse(localStorage.getItem('offices')) || [];
    let index = items.findIndex((e) => e.id == form.value.id);

    if (index !== -1) {
        items[index] = {
            ...items[index],
            ...form.value,
            is_city: form.value.is_city ? 1 : 0,
            is_district: form.value.is_district ? 1 : 0,
            is_khan: form.value.is_khan ? 1 : 0,
            updated_at: dayjs(new Date()).format("YYYY-MM-DD"),
        };

        localStorage.setItem('offices', JSON.stringify(items));
        Toast.fire({
            title:"Update successfully",
            icon:'success'
        })
        router.push('/setting/office/list')
    } else {
        Swal.fire({
            title:"Data on Found!",
            icon:'error'
        })
    }
};

onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <div>
        <AppForm
            btn-submit="Save"
            title="កែសម្រួលការិយាល័យ"
            @on-clear="resetForm"
            @submit="onSubmit"
        >
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.code"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Code"
                        :rules="[(v) => !!v  || 'Code is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.short_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Short Name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.khmer_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Khmer Name"
                        :rules="[(v) => !!v  || 'Khmer name is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.latin_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Latin Name"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.sort"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="sort number"
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-checkbox
                        v-model="form.is_city"
                        label="ក្រុង"
                    ></v-checkbox>
                </v-col>
                <v-col cols="4">
                    <v-checkbox
                        v-model="form.is_district"
                        label="ស្រុក"
                    ></v-checkbox>
                </v-col>
                <v-col cols="4">
                    <v-checkbox
                        v-model="form.is_khan"
                        label="ខណ្ខ័"
                    ></v-checkbox>
                </v-col>
            </v-row>
        </AppForm>
    </div>
</template>