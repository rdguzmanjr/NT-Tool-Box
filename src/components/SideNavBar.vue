<script setup>

import {ref,computed} from 'vue'
import { RouterLink,useRouter} from 'vue-router';
import box from '../components/icons/box.vue'
import ContextMenu from 'primevue/contextmenu';
import 'primeicons/primeicons.css'


const toggleOpen=ref(false)

const menu=ref(null);

const router=useRouter();

const _arr = computed(()=>{
  return props.tools.map(label => ({
    label,
    icon:'pi pi-wrench',
    command: here => router.push(formatToolText(here.item.label))
  }));
})

const toggleMenu=()=>{
 // console.log(props.tools)
  toggleOpen.value=!toggleOpen.value
}

const formatToolText=(str)=>{
  return str.toLowerCase().replace(/\s/g, '');
}

const handleContextMenu=(event)=>{
   menu.value.show(event);
}

const props=defineProps({title:String,tools:Array})
defineExpose({toggleOpen})

</script>

<template>

  <div class="flex flex-row justify-between items-center mx-5 my-3">
    <div class="relative inline-block text-left ">
      <button @click="toggleMenu" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-greentool"> 
        Tools
        <svg class="h-5 w-5 ml-2" :class="toggleOpen?'rotate-180':'rotate-0'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div v-show="toggleOpen" class="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2">
        <RouterLink :to="formatToolText(tool)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-greentool hover:text-white rounded-md" v-for="tool in props.tools" :key="tool">{{tool}}</RouterLink>
      </div>
    </div>
    <RouterLink :to="'/'" v-show="title!='' && title!=null" class="flex bg-greentool w-36 h-9 rounded-2xl items-center justify-center text-white md:w-52 lg:w-64 font-bold">
       <span @contextmenu="handleContextMenu">{{title}}  <box class="hidden md:inline"></box></span> 
    </RouterLink>
    <ContextMenu ref="menu" :model="_arr" />
</div>

</template>

<script>

</script>