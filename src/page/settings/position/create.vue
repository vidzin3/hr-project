<script setup lang="ts">
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

const items = computed(() => {
    return JSON.parse(localStorage.getItem("positions"))
})

const getNextId = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((item) => item.id)) + 1 : 1;
};

const getNextSortNumber = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((item) => item.sort)) + 1 : 1;
};

const getNextCode = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((item) => item.code)) + 1 : 1;
};

const form = ref({
    id:null,
    code:getNextCode(),
    khmer_name:null,
    latin_name:null,
    sort:getNextSortNumber(),
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
        sort:getNextSortNumber(),
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
    localStorage.setItem('positions',JSON.stringify(item))
    router.push('/setting/position/list')
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
            title="បង្កើតមុខតំណែង"
            @submit="onSubmit"
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