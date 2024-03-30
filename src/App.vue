<script setup>

import { RouterView } from 'vue-router'
import SideNavBAr from './components/SideNavBar.vue'
import FooterTool from './components/FooterTool.vue'

import './assets/main.css'

const tools=['Get Transform Origin','Invalidator','String Utils', 'BW Generator']

</script>

<template>
  <div id="container" class="flex flex-col justify-between h-dvh w-dvw space-y-10">
    <SideNavBAr :title="'TOOL BOX'" :tools="tools"/>
      <div id="content" class="mx-20 h-full">
        <RouterView />
      </div>
    <FooterTool/>
  </div>
</template>

<style scoped>

</style>
