<script setup>
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

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

const fetchData = () => {
    let data = JSON.parse(localStorage.getItem("users")) || []
    let item = data.findIndex((e) => e.id == router.currentRoute.value.params.id)
    if(item != -1){
        form.value = {...data[item]}
        form.value.is_disabled = data[item].is_disabled ? true : false
        form.value.is_super = data[item].is_super ? true : false
    }
}

const onSubmit = () => {
    let items = JSON.parse(localStorage.getItem("users")) || []
    let index = items.findIndex((e) => e.id == form.value.id)
    if (index !== -1) {
        items[index] = {
            ...items[index],
            ...form.value
        };

        localStorage.setItem('users', JSON.stringify(items));
        Toast.fire({
            title:"Update successfully",
            icon:'success'
        })
        router.push("/setting/user/list")
    } else {
        Swal.fire({
            title:"Data on Found!",
            icon:'error'
        })
    }
}

onMounted(async () => {
    await fetchData()
})

</script>

<template>
    <div>
        <AppForm
            btn-submit="Save"
            title="កែសម្រួលអ្នកប្រើប្រាស់"
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