<script setup lang="ts">
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';

const items = computed(() => {
    return JSON.parse(localStorage.getItem("offices"))
})

const getNextId = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((item) => item.id)) + 1 : 1;
};

const getNextCode = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((item) => item.code)) + 1 : 1;
};

const getNextSort = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((item) => item.sort)) + 1 : 1;
};

const form = ref({
    id:null,
    code:getNextCode(),
    khmer_name:null,
    latin_name:null,
    short_name:null,
    sort:getNextSort(),
    is_city:false,
    is_district:false,
    is_khan:false,
    created_by: null,
    updated_by: null,
    deleted_at: dayjs(new Date()).format("YYYY-MM-DD"),
    created_at: dayjs(new Date()).format("YYYY-MM-DD"),
    updated_at: dayjs(new Date()).format("YYYY-MM-DD")
})

const resetForm = () => {
    form.value = {
        id:null,
        code:getNextCode(),
        khmer_name:null,
        latin_name:null,
        short_name:null,
        sort:getNextSort(),
        is_city:false,
        is_district:false,
        is_khan:false,
        created_by: null,
        updated_by: null,
        deleted_at: dayjs(new Date()).format("YYYY-MM-DD"),
        created_at: dayjs(new Date()).format("YYYY-MM-DD"),
        updated_at: dayjs(new Date()).format("YYYY-MM-DD")
    }
}

const onSubmit = () => {
    let item = items.value || []
    form.value.id = getNextId()
    item.push(form.value)
    localStorage.setItem('offices',JSON.stringify(item))
    router.push('/setting/office/list')
    Toast.fire({
        title:"create successfully",
        icon:"success"
    })
}

</script>

<template>
    <div>
        <AppForm
            btn-submit="Save"
            title="បង្កើតការិយាល័យ"
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
                        label="ខណ្ឌ"
                    ></v-checkbox>
                </v-col>
            </v-row>
        </AppForm>
    </div>
</template>