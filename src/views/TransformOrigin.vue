<script setup>
import {ref,onMounted} from 'vue'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import TransformOriginImg from '../components/TransformOriginImg.vue'
import dropper from '../components/icons/dropper.vue'
import refresh from '../components/icons/refresh.vue'
import {gsap} from 'gsap';


const $toast = useToast();

const transImages=ref([])

const onDrop=(e)=>{
    const files = e.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
        const file = files[i];
        if (validateImage(file)) {
            $toast.success('Image Added');
            emit('closeMenuBar');
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result; 
                transImages.value.push({img:img,filename:file.name})           
            
            };
            try {
                reader.readAsDataURL(file);
            } catch (e) {}
        }
    }
    
}
const onDragLeave=()=>{

}
const onDragOver=()=>{

}
const handleRefresh=()=>{
    transImages.value=[];
}
const validateImage=(file)=> {
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  if (validImageTypes.indexOf(file.type) === -1) {
      $toast.error('Only image files allowed');
      return false;
  }
  return true;
}
const onImgEnter=(el, done)=> {
  gsap.from(el, {
    duration:1,
    opacity: 0,
    xPercent: 50,
    delay: el.dataset.index * 200000,
    onComplete: done,
    ease:'power2.out'
  })
}
const onBeforeImgEnter=(el, done)=> {
  
}
const onImgLeave=(el, done)=> {
  
}
const emit = defineEmits(['closeMenuBar'])
</script>

<template>
    <!-- component -->
    <div v-if="transImages.length==0" id="dropzone" class="flex items-center justify-center h-4/5" @drop.prevent.stop="onDrop" @dragleave.prevent.stop="onDragLeave" @dragover.prevent.stop="onDragOver">
        <div class="border-dashed border-2 rounded flex items-center justify-center h-1/2 w-1/2">
        <dropper/>
        <span class="block text-white">Drop your image files here</span>
        </div>
    </div>
    <button v-if="transImages.length!=0" class="mb-12 self-center w-32 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-greentool ring-1 ring-transparent rounded-md hover:ring-white" @click="handleRefresh">     
        <refresh/>
        <span class="mx-1">Refresh</span>
    </button>
  
        <div v-if="transImages.length!=0" id="img-container" class="mx-5 mt-42 flex flex-row flex-wrap gap-14 justify-center">
            <TransitionGroup
                :css="false"
                @before-enter="onBeforeImgEnter"
                @enter="onImgEnter"
                @leave="onImgLeave"
                >
                <TransformOriginImg :img="transImg.img" :filename="transImg.filename" v-for="(transImg,index) in transImages" :key="index"/>
            </TransitionGroup>
        </div>
    
</template>
<style scoped>
</style>