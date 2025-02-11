<script setup>
import router from '@/router/index'
import {ref} from 'vue'

const props = defineProps({
    title:{
        type: String,
        default: '',
    },
    cols: {
        type: [Number, String],
        default: 6,
    },
    btnSubmit: {
        type: String,
        default: "Save",
    },
    isSubmit: {
        type: [Boolean, String, Number],
        default: true,
    },
    isBack: {
        type: [Boolean, String, Number],
        default: true,
    },
    isClear:{
        type: [Boolean, String, Number],
        default: true,
    }
})

const refForm = ref()


const emit = defineEmits([
    'onClear',
    'submit'
])

const onClearForm = (value) => {
    emit('onClear',value)
}

const onBack = () => {
    router.go(-1)
}

const onSubmit = () => {
  emit("submit", refForm.value?.validate())
}

</script>

<template>
    <VRow>
        <VCol cols="12" :md="cols">
            <VCard class="mb-5">
                <VCardTitle>
                    <div class="d-flex align-center justify-space-between">
                        <span>{{ title }}</span>
                        <div class="d-flex" style="gap: 6px;">
                            <VBtn color="info" v-if="isBack" density="compact" icon class="rounded-sm" @click="onBack"> 
                                <VIcon>mdi-arrow-left</VIcon>
                            </VBtn>
                            <VBtn color="error" v-if="isClear" density="compact" icon class="rounded-sm" @click="onClearForm"> 
                                <VIcon>mdi-eraser</VIcon>
                            </VBtn>
                        </div>
                    </div>
                </VCardTitle>
                <VDivider />
                <VCard-text>
                    <VForm
                        ref="refForm" 
                        lazy-validated
                        @submit.prevent="onSubmit"
                    >
                        <slot></slot>
                        <VRow class="mt-2 pa-0" justify="end">
                            <VCol cols="12" md="4" class="text-end">
                                <VBtn
                                    type="submit"
                                    color="info"
                                    class="rounded-sm"
                                >
                                    <template v-slot:prepend>
                                        <VIcon>mdi-check</VIcon>
                                    </template> 
                                    <span>{{ btnSubmit }}</span>
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCard-text>
            </VCard>
        </VCol>
    </VRow>
</template>