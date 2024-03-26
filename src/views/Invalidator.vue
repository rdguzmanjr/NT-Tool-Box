<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import nicebutton from '../components/icons/nicebutton.vue'
import { ref } from 'vue';
const value = ref(null);





</script>


<template>
   <div class="flex flex-col items-start mx-20 gap-2">
        <FloatLabel >
                <InputText id="path" v-model="value" aria-describedby="username-help" class="w-[200px] md:w-[500px] lg:w-[900px]"/>
                <label for="path">Path</label>
                <small id="username-help" class="ml-2">Example/path/object1</small>
                
        </FloatLabel>
        <nicebutton btitle="Invalidate" @click="console.log(value)"/>
    </div>
   
</template>