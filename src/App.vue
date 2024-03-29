<script setup>
import {ref} from 'vue'
import { RouterView,useRouter } from 'vue-router'
import SideNavBAr from './components/SideNavBar.vue'
import FooterTool from './components/FooterTool.vue'
import ContextMenu from 'primevue/contextmenu';
import 'primeicons/primeicons.css'
import './assets/main.css'

const router=useRouter();

const tools=['Get Transform Origin', 'BW Generator', 'Invalidator','String Utils'];

const _arr = tools.map(label => ({
  label,
  icon:'pi pi-wrench',
  command: here => router.push(formatToolText(here.item.label))
}));

const sidebar=ref(null);

const formatToolText=(str)=>{
  return str.toLowerCase().replace(/\s/g, '');
}

</script>

<template>
  <div id="container" class="flex flex-col justify-between h-dvh w-dvw space-y-10">
    <SideNavBAr ref='sidebar' :title="'J&N TOOL BOX'" :tools="tools" />
      <div id="content" class="mx-20">
        <RouterView @closeMenuBar="sidebar.toggleOpen=false"/>
        <ContextMenu global :model="_arr" />
      </div>
    <FooterTool/>
  </div>
</template>

<style scoped>

</style>
