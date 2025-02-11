<script setup>
import router from '@/router/index';
import { ref } from 'vue';

const props = defineProps({
  tableTitle: {
    type: String,
    default: "Table Title",
  },
  headerIcon: {
    type: String,
    default: "tabler-table",
  },
  showSelect: {
    type: Boolean,
    default: false,
  },
  cols: {
    type: [Number, String],
    default: 8,
  },
  loading:{
    type:[String,Boolean],
    default: false,
  },
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  meta: {
    type: Object,
    default: () => {},
  },
  permissions: {
    type: Array,
    default: () => [],
  },
  canCreate: {
    type: String,
    default: "",
  },
  canView: {
    type: String,
    default: "",
  },
  canEdit: {
    type: String,
    default: "",
  },
  canDelete: {
    type: String,
    default: "",
  },
  createUrl:{
    type:String,
  },
  isTable:{
    type: [Boolean, String, Number],
    default: true,
  },
  isBtnSearch:{
    type: [Boolean, String, Number],
    default: true,
  },
  isUser:{
    type: [Boolean, String, Number],
    default: false,
  },
  isDelete:{
    type: [Boolean, String, Number],
    default: false,
  },
  isView:{
    type: [Boolean, String, Number],
    default: true,
  },
  isAccepted:{
    type: [Boolean, String, Number],
    default: true,
  }
})

const emit = defineEmits([
  "onView",
  "onEdit",
  "onDelete",
  "onChangePassword",
  "onDisable",
  "onPaginate",
  "onAccepted"
]);

const isSearch = ref(false)
const totalItem = ref(10)

const onSearch = () => {
  isSearch.value = !isSearch.value
}

const onCreate = () => {
  router.push(props.createUrl)
}

const onShow = (value) => {
  emit('onView', value)
}

const onEdit = (value) => {
  emit('onEdit',value)
}

const onDelete = (value) => {
  emit('onDelete',value)
}

const onChangePassword = (value) => {
  emit('onChangePassword',value)
}

const onDisabled = (value) => {
  emit("onDisable",value)
}

const onAccepted = (value) => {
  emit("onAccepted",value)
}

</script>
<template>
    <VRow>
      <VCol cols="12" :md="cols">
        <VCard class="mb-5">
          <VCardTitle>
            <div class="d-flex align-center justify-space-between">
              <span>{{ tableTitle }}</span>
              <div class="d-flex" style="gap: 6px;">
                <VBtn color="info" density="compact" icon class="rounded-sm" @click.prevent="onCreate">
                  <VIcon>mdi-plus</VIcon>
                </VBtn>
                <VBtn color="info" v-if="isBtnSearch" density="compact" icon class="rounded-sm" @click.prevent="onSearch">
                  <VIcon>mdi-magnify</VIcon>
                </VBtn>
              </div>
            </div>
          </VCardTitle>
          <VDivider />
          <VCard-text>
            <VRow justify="space-between">
              <VCol>
                <div v-if="isSearch">
                  <VRow justify="start">
                    <VCol cols="12" md="6">
                        <slot name="search"></slot>
                    </VCol>
                  </VRow>
                </div>
              </VCol>
            </VRow>

            <slot name="addition-layout"></slot>

            <!-- <v-data-table
              v-if="isTable"
              :headers="headers"
              :items="items"
              :items-length="totalItem"
              class="text-no-wrap"
              :loading="loading"
              loading-text="Loading data..."
            >
              <template v-if="!loading && items.length <= 0">
                <div class="text-center mt-3">
                  {{ $t("No data avialable...") }}
                </div>
              </template>
            </v-data-table> -->
            <v-data-table
                v-if="isTable"
                :headers="headers"
                :items="items"
                class="text-no-wrap"
                loading-text="Loading data..."
            >
              <template #item.status="{item}">
                <span :class="[
                    item.status == 1 ? 'text-info':'text-primary'
                  ]"
                >{{ item.status == 1 ? 'អនុម័ត' : 'មិនទាន់អនុម័ត' }}
                </span>
              </template>
              <template #item.action="{ item }">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="transparent"
                      v-bind="props"
                      icon
                      flat
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <slot name="addition-menu"></slot>
                    <v-list-item v-if="isView" @click="onShow(item)">
                        <template #prepend>
                            <v-icon color="info">mdi-eye</v-icon>
                        </template>
                        ពិនិត្យមើល
                    </v-list-item>
                    <v-list-item @click="onEdit(item)">
                        <template #prepend>
                            <v-icon color="warning">mdi-pen</v-icon>
                        </template>
                        កែរប្រែ
                    </v-list-item>
                    <v-list-item v-if="isDelete" @click="onDelete(item)">
                        <template #prepend>
                            <v-icon color="error">mdi-delete</v-icon>
                        </template>
                        លុប
                    </v-list-item>
                    <v-list-item v-if="isUser" @click="onChangePassword(item)">
                        <template #prepend>
                            <v-icon>mdi-lock-reset</v-icon>
                        </template>
                        ផ្លាស់ប្តូរពាក្យសម្ងាត់
                    </v-list-item>
                    <v-list-item v-if="item.is_disabled == 0 && isUser" @click="onDisabled(item)">
                        <template #prepend>
                            <v-icon color="primary">mdi-lock</v-icon>
                        </template>
                        បិទគណនី
                    </v-list-item>
                    <v-list-item v-if="isAccepted && item.status == 0" @click="onAccepted(item)">
                        <template #prepend>
                            <v-icon color="primary">mdi-alert-circle-outline</v-icon>
                        </template>
                        ដាក់អនុម័ត
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
            <!-- <VTable
              :headers="headers"
              :items="items"
              item-key="fullName"
              class="table-rounded"
            >
              <thead>
                <tr>
                  <th v-for="header in headers" :key="header">
                    {{ header }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <td v-if="loading" :colspan="headers.length">
                  <v-progress-linear indeterminate class="line"></v-progress-linear>
                </td>
                <tr v-if="loading && items.length === 0">
                  <td :colspan="headers.length" class="text-center">
                    <div class="text-subtitle-2">Loading...</div>
                  </td>
                </tr>
                <tr v-if="!loading && items.length === 0">
                  <td :colspan="headers.length" class="text-center">
                    Data is Empty
                  </td>
                </tr>
                <tr v-for="row in items" :key="row.id">
                  <td>
                    <VMenu open-on-hover open-on-click>
                        <template #activator="{ props }">
                            <VBtn
                                v-bind="props"
                                icon
                                flat
                                color="transparent"
                            >
                                <VIcon color="black">
                                    tabler-dots-vertical
                                </VIcon>
                            </VBtn>
                        </template>

                        <VList
                            nav
                            density="compact"
                            class="fontSuWann"
                        >
                            <VListItem
                                v-if="can(canView) && canView"
                                style="color: #2f752f"
                            >
                                <template #prepend>
                                    <VIcon>tabler-eye</VIcon>
                                </template>

                                <VListItemTitle
                                    class="ml-2"
                                    style="padding-block: 3px;padding-inline: 0"
                                >
                                    {{ $t("View") }}
                                </VListItemTitle>
                            </VListItem>

                            <VListItem
                                v-if="can(canEdit) && canEdit"
                                style="color: rgb(193, 131, 18)"
                            >
                                <template #prepend>
                                    <VIcon>tabler-edit</VIcon>
                                </template>

                                <VListItemTitle
                                    class="ml-2"
                                    style="padding-block: 3px;padding-inline: 0"
                                >
                                    {{ $t("Edit") }}
                                </VListItemTitle>
                            </VListItem>

                            <VListItem
                                v-if="permissions.includes(canDelete) && canDelete"
                                style="color: rgb(200, 25, 25)"
                            >
                                <template #prepend>
                                    <VIcon>tabler-trash</VIcon>
                                </template>

                                <VListItemTitle class="ml-2">
                                    {{ $t("Delete") }}
                                </VListItemTitle>
                            </VListItem>
                        </VList>
                    </VMenu>
                  </td>
                </tr>
              </tbody>
            </VTable> -->
          </VCard-text>
        </VCard>
      </VCol>
    </VRow>
</template>