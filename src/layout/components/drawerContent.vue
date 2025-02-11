<script setup>
import drawerContent from '@/layout/components/drawerContent.vue'
import { ref } from 'vue';
const props = defineProps({
    navItem:{
        type:Array
    }
})

const open = ref([])
// const resolveNavItemComponent = item => {
//   if ('heading' in item)
//     return VerticalNavSectionTitle
//   if ('children' in item)
//     return VerticalNavGroup
  
//   return VerticalNavLink
// }

</script>
<template>
    <v-list class="pa-0 mr-4" v-for="item in navItem" >
        <v-list-item :prepend-icon="item.icon" active-class="bg-info" class="rounded-e-xl pl-5" exact-active-class="bg-info" :to="item.to" v-if="item.children.length <= 0">
            {{ item.title.toLocaleUpperCase('en-US') }}
        </v-list-item>
        <v-list-group :prepend-icon="item.icon" v-else>
            <template v-slot:activator="{ props }">
                <v-list-item
                    class="rounded-e-xl pl-5"
                    v-bind="props"
                    :title="item.title.toLocaleUpperCase('en-US')"
                >
                </v-list-item>
            </template>
            <div v-if="item.children.length > 0">
                <drawerContent :nav-item="item.children" />
            </div>
        </v-list-group>
    </v-list>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>