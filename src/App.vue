<script setup>

import { RouterView } from 'vue-router'
import SideNavBAr from './components/SideNavBar.vue'
import FooterTool from './components/FooterTool.vue'

import './assets/main.css'

const tools=['Get Transform Origin', 'BW Generator', 'Invalidator','String Utils']

</script>

<template>
  <div id="container" class="flex flex-col justify-between h-dvh w-dvw space-y-10">
    <SideNavBAr :title="'J&N TOOL BOX'" :tools="tools"/>
      <div id="content" class="mx-20">
        <RouterView />
      </div>
    <FooterTool/>
    
  </div>
</template>

<style scoped>

</style>
