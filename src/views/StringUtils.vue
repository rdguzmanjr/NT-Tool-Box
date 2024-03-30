<script setup>
import {ref} from 'vue'
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';

const path=ref('');

const onPaste=(e)=>{
    const clipb=e.clipboardData.getData("text").replace(/^https?:\/\/[^/]+/g,'https://assets.nativetouch.io');
    navigator.clipboard.writeText(clipb);
    setTimeout(()=>{
        path.value =clipb;
    },0)
}

</script>

<template>
    <div class="space-y-8">
        <p>Convert to assets.nativetouch.io</p>
        <FloatLabel>
                    <InputText id="path" v-model="path" aria-describedby="username-help" class="w-[350px] md:w-[650px] lg:w-[900px] xl:w-[1200px]" @paste="onPaste"/>
                    <label for="path">Path</label>
        </FloatLabel>
    </div>
</template>