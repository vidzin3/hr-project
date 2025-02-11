<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const items = ref([])
const form = ref({
    is_disabled:null
})

const headers = computed(() => {
    return [
        {
            title:"ឈ្មោះ",
            key:'name'
        },
        {
            title:"ឈ្មោះអ្នកប្រើប្រាស់",
            key:'username'
        },
        {
            title:"អ៊ីមែល",
            key:'email'
        },
        {
            title:"សកម្មភាព",
            key:'action'
        },
    ]
})

const onUpdate = (value) => {
    router.push(`/setting/user/update/${value.id}`)
}

const onChangePassword = (value) => {
    router.push(`/setting/user/change_password/${value.id}`)
}

const onDisabled = (value) => {
    Swal.fire({
        title:"តើអ្នកយល់ព្រមបិទគណនីទេ?",
        icon:"warning",
        showDenyButton:true,
        confirmButtonText:"យល់ព្រម",
        denyButtonText:"មិនយល់ព្រម",
    }).then((res) => {
        if(res.isConfirmed){
            let items = JSON.parse(localStorage.getItem("users")) || []
            let index = items.findIndex((e) => e.id == value.id)
            if(index !== -1){
                form.value.is_disabled = 1
                items[index] = {
                    ...items[index],
                    ...form.value
                }

                localStorage.setItem('users', JSON.stringify(items));
                Toast.fire({
                    title:"Update successfully",
                    icon:'success'
                })
                fetchData()
            }
        }
    })
}

const fetchData = () => {
    items.value = JSON.parse(localStorage.getItem("users")) || []
}

const onDelete = (value) => {
    Swal.fire({
        title:"តើអ្នកសម្រេចលុបពិនមែន?",
        icon:'warning',
        showDenyButton:true,
        confirmButtonText:"យល់ព្រម",
        denyButtonText:"មិនយល់ព្រម",
    }).then((res) => {
        if(res.isConfirmed){
            let items = JSON.parse(localStorage.getItem("users")) || []
            let item = items.findIndex((e) => e.id == value.id)
            if(item != -1){
                items.splice(item,1)
                localStorage.removeItem('users')
                localStorage.setItem('users',JSON.stringify(items))
            }
            fetchData()
            Toast.fire({
                title:"Delete Successfully",
                icon:"success"
            })
        }
    })
}

onMounted(() => {
    fetchData()
})

</script>

<template>
    <AppDataTable
        tableTitle="តារាងអ្នកប្រើប្រាស់"
        create-url="/setting/user/create"
        :items="items"
        :headers="headers"
        :is-btn-search="false"
        :is-user="true"
        :is-view="false"
        :is-delete="true"
        @on-edit="onUpdate"
        @on-change-password="onChangePassword"
        @on-disable="onDisabled"
        @on-delete="onDelete"
    >
    </AppDataTable>
</template>