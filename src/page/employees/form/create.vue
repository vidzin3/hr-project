<script setup>
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import dayjs from 'dayjs';
import { onMounted, ref,computed } from 'vue';

const items = ref([])
const positions = ref([])
const offices = ref([])

const address_dialog = ref(false)

const provinces = ref([])
// const districts = ref([])
// const communes = ref([])
// const villages = ref([])

const province = ref({})
const district = ref({})
const commune = ref({})
const village = ref({})

const rawData = {
  provinces: ref([]),
  districts: ref({}),
  communes: ref({}),
  villages: ref({})
};

const formAddress = ref({
  province:null,
  district:null,
  commune:null,
  village:null
})

const statuses = ref([
  {
    id: 1,
    name: "នៅលីវ",
  },
  {
    id: 2,
    name: "មានប្តី",
  },
  {
    id: 3,
    name: "មានប្រពន្ធ",
  },
  {
    id: 4,
    name: "ពោះម៉ាយ",
  },
  {
    id: 5,
    name: "មេម៉ាយ",
  },
])

const sexs = ref([
  {
    id: 1,
    name: "ប្រុស",
  },
  {
    id: 2,
    name: "ស្រី",
  },
])

const join_types = ref([
  {
    id: 1,
    name: "ប្រឡងជាប់",
  },
  {
    id: 2,
    name: "ផ្ទេរចូល",
  },
])

const ranks = ref([
  {
    id: 1,
    name: "ក១",
  },
  {
    id: 2,
    name: "ក២",
  },
  {
    id: 3,
    name: "ក៣",
  },
  {
    id: 4,
    name: "ខ១",
  },
  {
    id: 5,
    name: "ខ២",
  },
  {
    id: 6,
    name: "ខ៣",
  },
  {
    id: 7,
    name: "គ",
  },
])

const number_of_ranks = ref([
  {
    id: 1,
    name: "១",
  },
  {
    id: 2,
    name: "២",
  },
  {
    id: 3,
    name: "៣",
  },
  {
    id: 4,
    name: "៤",
  },
  {
    id: 5,
    name: "៥",
  },
  {
    id: 6,
    name: "៦",
  },
  {
    id: 7,
    name: "៧",
  },
  {
    id: 8,
    name: "៨",
  },
  {
    id: 9,
    name: "៩",
  },
  {
    id: 10,
    name: "១០",
  },
])

const rank_years = () => {
  let from = 2020
  let now = new Date().getFullYear()
  let years = []
  for (from; from <= now; from++) {
    years.push(from)
  }

  return years
}

const options = ref({
  years:rank_years()
})


const getNextId = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((e) => e.id)) + 1 : 1;
}

const form = ref({
    id:null,
    number:null,
    code:null,
    id_card_no:null,
    khmer_name:null,
    latin_name: null,
    dob: null,
    phone: null,
    sex:null,
    religion:'ព្រះពុទ្ធ',
    nationality: "ខ្មែរ",
    photo_path: null,
    pob_address:null,
    status: null,
    home_no:null,
    street_no:null,
    group_no:null,
    address:null,
    ministry_id:null,
    office_id:null,
    school_id: null,
    position_id: null,
    type: null,
    join_date:null,
    join_c_p_date: "2/12/2021",
    framework: "នាយក្រមការ",
    rank:null,
    number_of_rank:null,
    year_of_rank: new Date().getFullYear(),
    facebook: null,
    email:null,
    join_type:null,
    servants:null,
    created_at:dayjs(new Date()).format("YYYY-MM-DD"),
    updated_at:dayjs(new Date()).format("YYYY-MM-DD"),
})

const resetForm = () => {
  form.value = {
    id:null,
    id_card_no:null,
    number:null,
    code:null,
    khmer_name:null,
    latin_name: null,
    dob: null,
    phone: null,
    sex:null,
    religion:'ព្រះពុទ្ធ',
    nationality: "ខ្មែរ",
    photo_path: null,
    pob_address:null,
    status: null,
    home_no:null,
    street_no:null,
    group_no:null,
    address:null,
    ministry_id:null,
    office_id:null,
    school_id: null,
    position_id: null,
    type: null,
    join_date: null,
    join_c_p_date: "2/12/2021",
    framework: "នាយក្រមការ",
    rank:null,
    number_of_rank:null,
    year_of_rank: new Date().getFullYear(),
    facebook: null,
    email:null,
    join_type:null,
    servants:null,
    created_at:dayjs(new Date()).format("YYYY-MM-DD"),
    updated_at:dayjs(new Date()).format("YYYY-MM-DD"),
  }
}

const fetchData = () => {
    items.value = JSON.parse(localStorage.getItem("employees")) || [];
}

const resetAddress = () => {
  form.value.address = null
}

const selectAddress = () => {
  address_dialog.value = true
}

const loadData = () => {
  rawData.provinces.value = JSON.parse(localStorage.getItem("provinces")) || [];
  
  const districts = JSON.parse(localStorage.getItem("districts")) || [];
  rawData.districts.value = districts.reduce((acc, it) => {
    acc[it.province_id] = acc[it.province_id] || [];
    acc[it.province_id].push(it);
    return acc;
  }, {});

  const communes = JSON.parse(localStorage.getItem("communes")) || [];
  rawData.communes.value = communes.reduce((acc, it) => {
    acc[it.district_id] = acc[it.district_id] || [];
    acc[it.district_id].push(it);
    return acc;
  }, {});

  const villages = JSON.parse(localStorage.getItem("villages")) || [];
  rawData.villages.value = villages.reduce((acc, it) => {
    acc[it.commune_id] = acc[it.commune_id] || [];
    acc[it.commune_id].push(it);
    return acc;
  }, {});
};

const districts = computed(() => rawData.districts.value[province.value?.id] || []);
const communes = computed(() => rawData.communes.value[district.value?.id] || []);
const villages = computed(() => rawData.villages.value[commune.value?.id] || []);

const getDistricts = (it) => {
  formAddress.value.province = it.namekh
  if (!province.value || province.value.id !== it.id) {
    province.value = it;
    district.value = null;
    commune.value = null;
    village.value = null;
  }
};

const getCommunes = (it) => {
  formAddress.value.district = it.namekh
  if (!district.value || district.value.id !== it.id) {
    district.value = it;
    commune.value = null;
    village.value = null;
  }
};

const getVillages = (it) => {
  formAddress.value.commune = it.namekh
  if (!commune.value || commune.value.id !== it.id) {
    commune.value = it;
    village.value = null;
  }
};

const getVillagesClose = (it) => {
  formAddress.value.village = it.namekh
  village.value = it;
  form.value.address = `ខេត្ត${formAddress.value.province} ក្រុង${formAddress.value.district} ឃុំ${formAddress.value.commune} ភូមិ${formAddress.value.village}`
  address_dialog.value = false;
};

const fetchOffice = () => {
  offices.value = JSON.parse(localStorage.getItem("offices")) || []
}

const fetchPosition = () => {
  positions.value = JSON.parse(localStorage.getItem("positions")) || []
}

const onSubmit = () => {
  let item = items.value || []
  item.push(form.value)
  form.value.id = getNextId()
  localStorage.setItem('employees',JSON.stringify(item))
  router.push('/employee/list')
  Toast.fire({
      title:"create successfully",
      icon:"success"
  })
}

onMounted(() => {
    fetchData()
    fetchOffice()
    fetchPosition()
    loadData()
})

</script>

<template>
    <div>
      <AppForm
          cols="7"
          btn-submit="Save"
          title="បង្កើតបុគ្គលិក"
          @on-clear="resetForm"
          @submit="onSubmit"
      >
        <fieldset class="pa-4 rounded-lg">
            <legend>ព័ត៌មានសាមីខ្លួន:</legend>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="form.number"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="លេខរៀងក្នុងបញ្ជី"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="form.code"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="អត្តលេខមន្ត្រីរាជការ"
                        :rules="[(v) => !!v  || 'អត្តលេខមន្ត្រីរាជការ is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="form.id_card_no"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="អត្តសញ្ញាណប័ណ្ឌ"
                        :rules="[(v) => !!v  || 'អត្តសញ្ញាណប័ណ្ឌ is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="form.khmer_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ឈ្មោះភាសាខ្មែរ"
                        :rules="[(v) => !!v  || 'ឈ្មោះភាសាខ្មែរ is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="form.latin_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ឈ្មោះឡាតាំង"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        type="date"
                        v-model="form.dob"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ថ្ងៃខែឆ្នាំកំណើត"
                        :rules="[(v) => !!v  || 'ថ្ងៃខែឆ្នាំកំណើត is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        v-model="form.phone"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="លេខទូរសព្ទ"
                        :rules="[(v) => !!v  || 'លេខទូរសព្ទ is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select
                        v-model="form.sex"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ភេទ"
                        :items="sexs"
                        item-title="name"
                        item-value="id"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                    <v-text-field
                        v-model="form.religion"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="សាសនា"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-text-field
                        v-model="form.nationality"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="សញ្ញាតិ"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-autocomplete
                        v-model="form.status"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ស្ថានភាពនៃការរស់នៅ"
                        :items="statuses"
                        item-value="id"
                        item-title="name"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <legend class="my-3">អាស័យដ្ឋានបច្ចុប្បន្ន</legend>
            <v-row>
                <v-col cols="6" md="4">
                    <v-text-field
                        v-model="form.home_no"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="លេខផ្ទះ"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="4">
                    <v-text-field
                        v-model="form.group_no"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ក្រុម"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="4">
                    <v-text-field
                        v-model="form.street_no"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ផ្លូវ"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field
                        v-model="form.address"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="អាសយដ្ឋាន"
                        readonly
                    ></v-text-field>
                    <div class="mt-2 d-flex ga-2">
                        <v-btn color="info" @click="selectAddress">ជ្រើសរើសអាសយដ្ឋាន</v-btn>
                        <v-btn color="error" @click="resetAddress">សម្អាត</v-btn>
                    </div>
                </v-col>
            </v-row>
        </fieldset>
        <fieldset class="pa-4 rounded-lg mt-2">
          <legend>ព័ត៌មានតួនាទី/មុខដំណែងបច្ចុប្បន្ន:</legend>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.office_id"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ការិយាល័យ/ផ្នែក"
                item-title="khmer_name"
                item-value="id"
                :items="offices"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.position_id"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="តួនាទី/មុខដំណែង"
                item-title="khmer_name"
                item-value="id"
                :items="positions"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                type="date"
                v-model="form.join_date"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ថ្ងៃខែឆ្នាំចូលបម្រើរាជការ"
                :rules="[(v) => !!v  || 'ថ្ងៃខែឆ្នាំចូលបម្រើរាជការ is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                type="date"
                v-model="form.join_c_p_date"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ថ្ងៃខែឆ្នាំចូលកាន់មុខដំណែងបច្ចុប្បន្ន"
                :rules="[(v) => !!v  || 'ថ្ងៃខែឆ្នាំចូលកាន់មុខដំណែងបច្ចុប្បន្ន is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.framework"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ប្រភេទក្របខ័ណ្ឌ"
                :rules="[(v) => !!v  || 'ប្រភេទក្របខ័ណ្ឌ is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="form.rank"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ឋានន្តរស័ក្តិ"
                :items="ranks"
                item-title="name"
                item-value="id"
                :rules="[(v) => !!v  || 'ឋានន្តរស័ក្តិ is required']"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="form.number_of_rank"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ថ្នាក់លេខ"
                :items="number_of_ranks"
                item-value="id"
                item-title="name"
                :rules="[(v) => !!v  || 'ថ្នាក់លេខ is required']"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="form.year_of_rank"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="ឆ្នាំឋានន្តរស័ក្តិ"
                :items="options.years"
                :rules="[(v) => !!v  || 'ឆ្នាំឋានន្តរស័ក្តិ is required']"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="form.servants"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                label="តាមរយៈ"
                item-value="id"
                item-title="name"
                :items="join_types"
                :rules="[(v) => !!v  || 'តាមរយៈ is required']"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </fieldset>
      </AppForm>
    </div>
    <v-dialog v-model="address_dialog" style="max-width: 1000px" persistent>
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>ជ្រើសរើសអាសយដ្ឋាន ឬទីកន្លែង</span>
          <v-btn color="primary" variant="text" @click="address_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <!-- Provinces -->
            <v-col cols="12" md="3" sm="6">
              <p class="ml-2 font-weight-bold text-lg">រាជធានី / ខេត្ត</p>
              <div v-for="(it, idx) in rawData.provinces.value" :key="idx" class="d-flex justify-between w-100 align-center">
                <v-btn
                  variant="tonal"
                  :color="province?.id === it.id ? 'primary' : 'secondary'"
                  class="mb-2 ml-2 mt-2"
                  style="width: 85%"
                  @click="getDistricts(it)"
                >
                  {{ it.namekh }}
                </v-btn>
              </div>
            </v-col>

            <!-- Districts -->
            <v-col v-if="districts.length" cols="12" md="3" sm="6">
              <p class="ml-2 font-weight-bold text-lg">ស្រុក / ក្រុង / ខណ្ឌ</p>
              <div v-for="(it, idx) in districts" :key="idx" class="d-flex justify-between w-100 align-center">
                <v-btn
                  variant="tonal"
                  :color="district?.id === it.id ? 'primary' : 'secondary'"
                  class="mb-2 ml-2 mt-2"
                  style="width: 85%"
                  @click="getCommunes(it)"
                >
                  {{ it.namekh }}
                </v-btn>
              </div>
            </v-col>

            <!-- Communes -->
            <v-col v-if="communes.length" cols="12" md="3" sm="6">
              <p class="ml-2 font-weight-bold text-lg">ឃុំ / សង្កាត់</p>
              <div v-for="(it, idx) in communes" :key="idx" class="d-flex justify-between w-100 align-center">
                <v-btn
                  variant="tonal"
                  :color="commune?.id === it.id ? 'primary' : 'secondary'"
                  class="mb-2 ml-2 mt-2"
                  style="width: 85%"
                  @click="getVillages(it)"
                >
                  {{ it.namekh }}
                </v-btn>
              </div>
            </v-col>

            <!-- Villages -->
            <v-col v-if="villages.length" cols="12" md="3" sm="6">
              <p class="ml-2 font-weight-bold text-lg">ភូមិ</p>
              <div v-for="(it, idx) in villages" :key="idx" class="d-flex justify-between w-100 align-center">
                <v-btn
                  variant="tonal"
                  :color="village?.id === it.id ? 'primary' : 'secondary'"
                  class="mb-2 ml-2 mt-2"
                  style="width: 85%"
                  @click="getVillagesClose(it)"
                >
                  {{ it.namekh }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>