<script setup>

import {ref,computed} from 'vue'
import { RouterLink,useRouter} from 'vue-router';
import ContextMenu from 'primevue/contextmenu';


//const toggleOpen=ref(false)

const menu=ref(null);

const router=useRouter();

const _arr = computed(()=>{
  return props.tools.map(label => ({
    label,
    icon:'pi pi-wrench',
    command: here => router.push(formatToolText(here.item.label))
  }));
})

// const toggleMenu=()=>{
//   // console.log(props.tools)
//   toggleOpen.value=!toggleOpen.value
// }

const formatToolText=(str)=>{
  return str.toLowerCase().replace(/\s/g, '');
}

const handleContextMenu=(event)=>{
   menu.value.show(event);
}

const props=defineProps({title:String,tools:Array})
//defineExpose({toggleOpen})

</script>

<template>

  <div class="flex flex-row justify-between items-center mx-5 my-3">
    <div></div>
    <div>
      <RouterLink :to="'/'" v-show="title!='' && title!=null" class="flex bg-greentool w-36 h-9 rounded-2xl items-center justify-center text-white md:w-52 lg:w-64 font-bold">
        <div @contextmenu="handleContextMenu" class="flex justify-center space-x-3 w-full mx-2 items-center"> <p class="text-xs">right-click</p><span class="pi pi-arrow-right"></span><p class="align-middle hidden md:inline md:text-xs lg:text-lg">{{title}}</p><p class="pi pi-box pi-spin text-2xl"></p></div> 
      </RouterLink>
      <ContextMenu ref="menu" :model="_arr" />
    </div>
</div>

</template>

<script>

</script>