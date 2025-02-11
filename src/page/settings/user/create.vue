<script setup>
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import { computed, ref } from 'vue';

const items = computed(() => {
    return JSON.parse(localStorage.getItem("users")) || []
})

const getNextId = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((e) => e.id)) + 1 : 1;
}

const form = ref({
    id:null,
    email:null,
    username:null,
    name:null,
    is_super:false,
    is_disabled:false,
    password:"Password@123"
})

const resetForm = () => {
    form.value = {
        id:null,
        email:null,
        username:null,
        name:null,
        is_super:false,
        is_disabled:false,
        password:"Password@123"
    }
}

const onSubmit = () => {
    let data = items.value || []
    form.value.id = getNextId()
    form.value.is_disabled = form.value.is_disabled == true ? 1 : 0 
    form.value.is_super = form.value.is_super == true ? 1 : 0 
    data.push({...form.value})
    localStorage.setItem("users",JSON.stringify(data))
    router.push("/setting/user/list")
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
            title="បង្កើតអ្នកប្រើប្រាស់"
            @submit="onSubmit"
            @on-clear="resetForm"
        >
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.username"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="username"
                        :rules="[(v) => !!v  || 'username is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="name"
                        :rules="[(v) => !!v  || 'name is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.email"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="email"
                        placeholder="example@gmail.com"
                        :rules="[(v) => !!v  || 'email is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-checkbox
                        v-model="form.is_disabled"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Disable"
                    ></v-checkbox>
                </v-col>
                <v-col cols="4">
                    <v-checkbox
                        v-model="form.is_super"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Super Account"
                    ></v-checkbox>
                </v-col>
            </v-row>
        </AppForm>
    </div>
</template>