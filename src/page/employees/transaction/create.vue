<script setup>
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';

const employee_dialog = ref(false)
const employees = ref([])
const employee_name = ref(null)
const items = ref([])

const getNextId = () => {
    return items.value.length > 0  ? Math.max(...items.value.map((e) => e.id)) + 1 : 1;
}

const form = ref({
    id:null,
    code:null,
    date:dayjs(new Date()).format("YYYY-MM-DD"),
    employee_id:null,
    type:null,
    reason:null
})

const resetForm = () => {
    form.value = {
        id:getNextId(),
        code:null,
        date:dayjs(new Date()).format("YYYY-MM-DD"),
        employee_id:null,
        type:null,
        reason:null
    }
}

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

const fetchData = () => {
    items.value = JSON.parse(localStorage.getItem("employee_transactions")) || []
}

const fetchEmployee = () => {
    employees.value = JSON.parse(localStorage.getItem("employees")) || []
}

const onOpenDialog = () => {
    employee_dialog.value = true
}

const getEmployee = (value) => {
    form.value.employee_id = value.id
    form.value.code = value.code
    employee_name.value = value.khmer_name
    employee_dialog.value = false
}

const onSubmit = () => {
    let item = JSON.parse(localStorage.getItem("employee_transactions")) || []
    item.push(form.value)
    form.value.id = getNextId()
    localStorage.setItem('employee_transactions',JSON.stringify(item))
    router.push('/employee/transaction/list')
    Toast.fire({
        title:"create successfully",
        icon:"success"
    })
}

onMounted(() => {
    fetchData()
    fetchEmployee()
})
</script>

<template>
    <AppForm
        btn-submit="Save"
        title="បង្កើតប្រតិបត្តិការបុគ្គលិក"
        @on-clear="resetForm"
        @submit="onSubmit"
    >
        <v-row>
        <v-col cols="12" md="10">
            <v-text-field
                v-model="form.employee_id"
                :model-value="employee_name"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="បុគ្គលិក"
                readonly
                :rules="[(v) => !!v  || 'បុគ្គលិក is required']"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
            <VBtn
                color="info"
                class="rounded-sm"
                @click="onOpenDialog"
            >
                <template v-slot:prepend>
                    <VIcon>mdi-account</VIcon>
                </template> 
                <span>ជ្រើសរើស</span>
            </VBtn>
        </v-col>
        <v-col cols="12" md="12">
            <v-text-field
                type="date"
                v-model="form.date"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ថ្ងៃឈប់"
                :rules="[(v) => !!v  || 'ថ្ងៃឈប់ is required']"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
            <v-autocomplete
                v-model="form.type"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ប្រភេទ"
                :items="options.types"
                item-value="id"
                item-title="name"
            ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="12">
            <v-textarea
                v-model="form.reason"
                rows="4"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="មូលហេតុ"
                :rules="[(v) => !!v  || 'មូលហេតុ is required']"
            >
            </v-textarea>
        </v-col>
    </v-row>
    </AppForm>
    <v-dialog
        v-model="employee_dialog"
        max-width="600"
    >
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>តារាងបុគ្គលិក</span>
                <v-btn color="primary" variant="text" @click="employee_dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="px-4 py-2">
                <v-list v-for="item in employees">
                    <v-list-item class="border-sm rounded-sm">
                        <template v-slot:prepend>
                            {{ item.code }} - {{ item.khmer_name }}
                        </template>
                        <template v-slot:append>
                            <VBtn color="info" density="compact" icon class="rounded-sm" @click="getEmployee(item)">
                                <VIcon>mdi-plus</VIcon>
                            </VBtn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>