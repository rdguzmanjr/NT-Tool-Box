<script setup>
import {ref} from 'vue'

const porigin=ref(null);
const pbounds=ref(null);

const handleCopyOrigin=()=>{
    navigator.clipboard.writeText(porigin.value.textContent)
}
const handleCopyBounds=()=>{
    navigator.clipboard.writeText(pbounds.value.textContent)
}
const props=defineProps({imginfo:Object})

</script>

<template>
    <div class="absolute w-80 h-auto  bg-black bg-opacity-70 z-50">
        <div class="text-white text-xs mx-2 my-2 space-y-2">
            <div class="flex flex-row justify-between ">
                <p ref="porigin">transformOrigin:'{{imginfo.originX}}% {{imginfo.originY}}%'</p><button class="w-12 bg-greentool hover:bg-graytool active:ring-white ring-2 ring-transparent rounded-sm" @click="handleCopyOrigin">copy</button>
            </div>
            <div class="flex flex-row justify-between ">
            <p ref="pbounds">top:{{imginfo.ptop}},right:{{imginfo.pright}},bottom:{{imginfo.pbottom}},left{{imginfo.pleft}}</p><button class="w-12 bg-greentool hover:bg-graytool active:ring-white ring-2 ring-transparent rounded-sm" @click="handleCopyBounds">copy</button>
            </div>
        </div>
    </div>
</template>