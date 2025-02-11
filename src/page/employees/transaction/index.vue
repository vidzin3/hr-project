<script setup>
import AppDataTable from '@/components/AppDataTable.vue';
import router from '@/router';
import Swal from 'sweetalert2';
import { ref,computed, onMounted } from 'vue';

const items =ref([])
const offices = ref([])
const positions = ref([])

const options = ref({
    types:[
        {
            id: 0,
            name: "ទាំងអស់",
        },
        {
            id: 1,
            name: "ចូលនិវត្តន៍",
        },
        {
            id: 2,
            name: "បានទទួលមរណៈភាព",
        },
        {
            id: 3,
            name: "ទំនេរគ្មានបៀវត្ដន៍",
        },
        {
            id: 4,
            name: "កំពុងបំរើការ",
        },
        {
            id: 5,
            name: "បានផ្ទេរចេញ",
        },
    ]
})

const headers = computed(() => {
    return [
        {
            title:"អត្តលេខមន្រ្តី",
            key:'code',
            value:(item) => (item.code == null ? item.employee.code : item.code) 
        },
        {
            title:"ឈ្មោះ/នាម",
            key:'khmer_name',
            value:(item) => (item.employee.khmer_name) 
        },
        {
            title:"ភេទ",
            key:'sex',
            value:(item) => (item.employee.sex == 1 ? 'ប្រុស' : 'ស្រី') 
        },
        {
            title:"ប្រតិបត្តិការ",
            key:'type_name',
        },
        {
            title:"កាលបរិច្ឆេទ",
            key:'date',
        },
        {
            title:"សកម្មភាព",
            key:'action'
        },
    ]
})

const leftJoin = (data,source,source_key,target_key,mapping_key,name_point) => {
  return data.map((sourceItem) => {
    const item = source.find(
        (targetItem) => targetItem[target_key] === sourceItem[source_key]
    );
    if(name_point){
      return {
        ...sourceItem,
        [mapping_key]: item ? item[name_point] : "no key",
      };
    }else {
      return {
        ...sourceItem,
        [mapping_key]: item ? item : "no key",
      };
    }
  })
} 

const fetchOffice = () => {
  offices.value = JSON.parse(localStorage.getItem("offices")) || []
}

const fetchPosition = () => {
  positions.value = JSON.parse(localStorage.getItem("positions")) || []
}

const fetchData = () => {
    let employee_transaction = JSON.parse(localStorage.getItem("employee_transactions")) || []

    let items_emp = JSON.parse(localStorage.getItem("employees")) || []

    let emp = leftJoin(items_emp,positions.value,"position_id","id","position_name","khmer_name")
    let office = leftJoin(emp,offices.value,"office_id","id","office_name","khmer_name")
    let item = leftJoin(employee_transaction,office,"employee_id","id","employee")
    let type_of_item = leftJoin(item,options.value.types,"type","id","type_name","name")

    items.value = type_of_item
}

const onUpdate = (value) => {
    router.push(`/employee/transaction/update/${value.id}`)
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
            let items = JSON.parse(localStorage.getItem("employee_transactions")) || []
            let item = items.findIndex((e) => e.id == value.id)
            if(item != -1){
                items.splice(item,1)
                localStorage.removeItem('employee_transactions')
                localStorage.setItem('employee_transactions',JSON.stringify(items))
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
    fetchOffice()
    fetchPosition()
    fetchData()
})
</script>

<template>
    <AppDataTable
        table-title="តារាងនៃប្រតិបត្តិការបុគ្គលិក"
        create-url="/employee/transaction/create"
        :headers="headers"
        :items="items || []"
        :is-delete="true"
        :is-btn-search="false"
        :is-view="false"
        @on-edit="onUpdate"
        @on-delete="onDelete"
    ></AppDataTable>
</template>