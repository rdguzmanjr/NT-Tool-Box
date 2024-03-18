<script setup>
const props=defineProps({imginfo:Object})
</script>


<template>
    <div class="absolute w-80 h-auto md:w-72 bg-black bg-opacity-70 ">
        <div class="text-white text-xs mx-2 my-2 space-y-2">
            <p>transformOrigin:'{{imginfo.originX}}% {{imginfo.originY}}%'</p>
            <p>top:{{imginfo.ptop}},right:{{imginfo.pright}},bottom:{{imginfo.pbottom}},left{{imginfo.pleft}}</p>
        </div>
    </div>
</template>