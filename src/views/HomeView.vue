<script setup>
import ContextMenu from 'primevue/contextmenu';

const _arr=[
    {label:"J&N Tool Box",icon:'pi pi-copy' },
]
</script>

<template>
    <div class="mx-5">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Elevate Your Creativity</span> with J&N Tool Box.</h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Harnessing Pixel Perfection and HTML Transformation Tools for Enhanced Visual Expression!.</p>
        <ContextMenu global :model="_arr" />
    </div>
</template>

<style scoped>

</style>
