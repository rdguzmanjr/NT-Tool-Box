<script setup>
import {ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SideNavBAr from './components/SideNavBar.vue'
import FooterTool from './components/FooterTool.vue'

import './assets/main.css'

const sidebar=ref(null);

</script>

<template>
  <div id="container" class="flex flex-col justify-between h-dvh">
    <SideNavBAr ref='sidebar' :title="'NT TOOL BOX'" :tools="['Get Transform Origin','BW Generator']" />
    <RouterView @closeMenuBar="sidebar.toggleOpen=false"/>
    <FooterTool/>
  </div>
</template>

<style scoped>

</style>
