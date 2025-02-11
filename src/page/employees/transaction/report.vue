<script setup>
import AppForm from '@/components/AppForm.vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { onMounted, ref, watch } from 'vue';
import { useWindowSize } from '@/helper/windowSize';

dayjs.extend(isBetween);

const windowSize = useWindowSize()
const status_name = ref(null)
const items = ref([])
const offices = ref([])
const positions = ref([])
const employees = ref([])
const isSubmit = ref(false)

const getYear = () => {
  let year = [];
  let start_year = 1988
  let currentYear = new Date().getFullYear()
  for(let i = start_year;i<= currentYear;i++){
    year.push(i)
  }

  return year
}

const options = ref({
    year:getYear(),
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


const form = ref({
  year:new Date().getFullYear(),
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
const fetchPosition = () => {
  positions.value = JSON.parse(localStorage.getItem("positions")) || []
}

const fetchOffice = () => {
  offices.value = JSON.parse(localStorage.getItem("offices")) || []
}

const fetchEmployee = () => {
  employees.value = JSON.parse(localStorage.getItem("employees")) || []
}

const onSubmit = () => {
    let employee_transaction = JSON.parse(localStorage.getItem("employee_transactions")) || []
    let employee_transaction_filter = employee_transaction.filter(e => {
      let transactionYear = dayjs(e.date, "DD/MM/YYYY").year(); // Extract year from date
      return transactionYear === form.value.year;
    });

    let items_emp = JSON.parse(localStorage.getItem("employees")) || []

    let emp = leftJoin(items_emp,positions.value,"position_id","id","position_name","khmer_name")
    let office = leftJoin(emp,offices.value,"office_id","id","office_name","khmer_name")
    let item = leftJoin(employee_transaction_filter,office,"employee_id","id","employee")
    let type_of_item = leftJoin(item,options.value.types,"type","id","type_name","name")
    items.value = type_of_item
    if(items.value.length <= 0){
      isSubmit.value = false
    }else {
      isSubmit.value = true
    }
}

onMounted(() => {
  fetchOffice()
  fetchPosition()
  fetchEmployee()
})
</script>

<template>
    <AppForm
      btn-submit="GET"
      :is-clear="false"
      cols="6"
      title="របាយការណ៍ប្រតិបត្តិការបុគ្គលិក"
      @submit="onSubmit"
    >
      <v-row>
        <v-col cols="12" md="12">
          <v-autocomplete
              v-model="form.year"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              label="ឆ្នាំចូលនិវត្តន៍"
              :items="options.year"
              :rules="[(v) => !!v  || 'ឆ្នាំចូលនិវត្តន៍ is required']"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </AppForm>
    <v-card v-if="isSubmit">
        <div class="exportTable">
          <div id="print-area" class="report-body">
            <v-card-text class="content">
              <table
                width="100%"
                dense
                id="myTable"
                class="table-content report-body"
                style="border-collapse: collapse; color: black"
              >
                <colgroup>
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                </colgroup>

                <tr>
                  <td colspan="7"></td>
                  <td
                    colspan="6"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ព្រះរាជាណាចក្រកម្ពុជា
                  </td>
                  <td colspan="7"></td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ខេត្តបាត់ដំបង
                  </td>
                  <td colspan="3"></td>
                  <td
                    colspan="6"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ជាតិ សាសនា ព្រះមហាក្សត្រ
                  </td>
                  <td colspan="7"></td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ការិយាល័យគ្រប់គ្រងធន់ធានមនុស្ស
                  </td>
                  <td colspan="3"></td>
                  <td
                    colspan="6"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: tacteng;
                      line-height: normal;
                      font-size: 42px;
                    "
                  >
                    6
                  </td>
                  <td colspan="7"></td>
                </tr>
                <tr>
                  <td
                    colspan="20"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                      padding: 10px;
                    "
                  >
                    បញ្ជីមន្ត្រីចូលនិវត្តន៍ក្នុងនៅក្នុងឆ្នាំ{{ new Date().getFullYear() }}
                  </td>
                </tr>
                <tr>
                  <td 
                    colspan="2"
                    rowspan="2"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                  </td>
                  <td 
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    អត្តលេខ
                  </td>
                  <td
                    colspan="3"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    នាម-គោត្តនាម
                  </td>
                  <td
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ភេទ
                  </td>
                  <td
                    colspan="4"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ថ្ងៃខែឆ្នាំ
                  </td>
                  <td
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    មុខតំណែងបច្ចុប្បន្ន
                  </td>
                  <td
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    កាំបៀវត្ស
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    កំណើត
                  </td>
                  <td
                    colspan="2"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ចូលបម្រើការ
                  </td>
                </tr>
                <tr v-for="rt in items">
                  <td 
                    colspan="2" 
                  >
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.code }}
                  </td>
                  <td 
                    colspan="3" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.employee.khmer_name }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.employee.sex == 1 ? 'ប្រុស' : 'ស្រី' }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.employee.dob }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.employee.join_date }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.employee.position_name }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.employee.rank }}-{{ rt.employee.number_of_rank }}
                  </td>
                </tr>
              </table>
            </v-card-text>
          </div>
        </div>
    </v-card>
</template>