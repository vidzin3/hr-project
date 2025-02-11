<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const items = ref([])
const employees = ref([])
const form = ref({
    status:null
})

const options = ref({
    attendance_type:[
        {
            id:1,
            name:"ច្បាប់រយះពេលខ្លី"
        },
        {
            id:2,
            name:"ច្បាប់ប្រចាំឆ្នាំ"
        },
        {
            id:3,
            name:"ច្បាប់លំហែមាតភាព"
        },
        {
            id:4,
            name:"ច្បាប់សម្រាកព្យាបាលសុខភាព"
        },
        {
            id:5,
            name:"ច្បាប់សម្រាកដោយមានភារផ្ទាល់ខ្លួន"
        },
        {
            id:6,
            name:"អត់ច្បាប់"
        },
    ]
})


const leftJoin = (data,source,source_key,target_key,mapping_key,name_point) => {
    return data.map((sourceItem) => {
        const item = source.find(
            (targetItem) => targetItem[target_key] === sourceItem[source_key]
        );
        return {
            ...sourceItem,
            [mapping_key]: item ? item[name_point] : "no key",
        };
    })
}

const headers = computed(() => {
    return [
        {
            title:"ឈ្មោះ",
            key:'employee_name'
        },
        {
            title:"ប្រភេទច្បាប់",
            key:'attendance_type'
        },
        {
            title:"ស្ថានភាព",
            key:'status',
            value:(item) => item.status == 1 ? "អនុម័ត" : 'មិនទាន់អនុម័ត'
        },
        {
            title:"កាលបរិច្ចេក",
            key:'date'
        },
        {
            title:"សកម្មភាព",
            key:'action'
        },
    ]
})

const fetchData = () => {
    items.value = JSON.parse(localStorage.getItem('attendances')) || []
}

const fetchEmployee = () => {
    employees.value = JSON.parse(localStorage.getItem("employees")) || []
}

const mergeData = () => {
    let item = leftJoin(items.value,options.value.attendance_type,"type","id","attendance_type","name")

    item = leftJoin(item,employees.value,"employee_id","id","employee_name","khmer_name")
    
    return items.value = item
}

const onUpdate = (value) => {
    router.push(`/attendance/update/${value.id}`)
}

const onAccepted = (value) => {
    Swal.fire({
        title:"យល់ព្រមការអនុម័ត",
        icon:"warning",
        showDenyButton:true,
        confirmButtonText:"យល់ព្រម",
        denyButtonText:"មិនយល់ព្រម",
    }).then((res) => {
        if(res.isConfirmed){
            let items = JSON.parse(localStorage.getItem("attendances")) || []
            let index = items.findIndex((e) => e.id == value.id)
            if(index !== -1){
                form.value.status = 1
                items[index] = {
                    ...items[index],
                    ...form.value
                }

                localStorage.setItem('attendances', JSON.stringify(items));
                Toast.fire({
                    title:"Update successfully",
                    icon:'success'
                })
                fetchData()
                fetchEmployee()
                mergeData()
            }
        }else {
            Swal.fire({
                title:"Data on Found!",
                icon:'error'
            })
        }
    })
}

// អនុម័ត
onMounted(() => {
    fetchData()
    fetchEmployee()
    mergeData()
})
</script>

<template>
    <AppDataTable
        tableTitle="តារាងអវត្តមាន"
        create-url="/attendance/create"
        :items="items || []"
        :headers="headers"
        :is-btn-search="false"
        :is-user="false"
        :is-view="false"
        :is-delete="false"
        @on-edit="onUpdate"
        @on-accepted="onAccepted"
    >
        <template #item.status="{item}">
            {{ item }}
        </template>
    </AppDataTable>
</template>