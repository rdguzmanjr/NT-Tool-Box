<script setup>
import {ref,onMounted} from 'vue'
import TransformOriginInfo from './TransformOriginInfo.vue';

const image=ref(null);

const getPNGOrigin=(imgElem)=>{
    
    let img = imgElem,originX,originY,pixels,l,bound,x,y,ptop,pright,pbottom,pleft;

    let c = image.value;
   // let c= document.createElement('canvas');
    let ctx = c.getContext("2d", {willReadFrequently:true,});
    // set dimension
    c.width = img.width;
    c.height = img.height;
    //draw image
    ctx.drawImage(img, 0, 0);
    //ovveride ctx and get context
    ctx = c.getContext('2d', {willReadFrequently:true,});
    pixels = ctx.getImageData(0, 0, c.width, c.height);
    l = pixels.data.length;
    bound = {top: null,left: null,right: null,bottom: null};
    for (let i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % c.width;
            y = ~~((i / 4) / c.width);

            if (bound.top === null) {
                bound.top = y;
            }

            if (bound.left === null) {
                bound.left = x;
            } else if (x < bound.left) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }
    
    originX=((((bound.right + bound.left)/2)/c.width)*100).toFixed(1);
    originY=((((bound.bottom + bound.top)/2)/c.height)*100).toFixed(1);
    ptop=((bound.top/c.height)*100).toFixed(1);
    pright=((bound.right/c.width)*100).toFixed(1);
    pbottom=((bound.bottom/c.height)*100).toFixed(1);
    pleft=((bound.left/c.width)*100).toFixed(1);
    //draw red dot to center
    ctx.beginPath();
    ctx.arc((bound.right + bound.left)/2, (bound.bottom + bound.top)/2, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 0, 0, 1)";
    ctx.fill();

    return {originX:originX,originY:originY,ptop:ptop,pright:pright,pbottom:pbottom,pleft:pleft}
}
const imginfo=ref({})
const showinfo=ref(false)
onMounted(()=>{
    imginfo.value=getPNGOrigin(props.img)
})

const props=defineProps({img:Object,filename:String})

</script>

<template>
    <div class="w-80 h-auto md:w-72" @mouseenter="showinfo=!showinfo" @mouseleave="showinfo=!showinfo">
        <span class="text-white text-xs drop-shadow-lg bg-black bg-opacity-60">{{ props.filename }}</span>
        <TransformOriginInfo :imginfo="imginfo" v-if="showinfo"/>
        <canvas ref="image" class="w-full" ></canvas>
    </div>
</template>

<style scoped>
 canvas{
            
            background-image: linear-gradient(45deg, #4d4949 25%, transparent 25%), linear-gradient(-45deg, #4d4949 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #4d4949 75%), linear-gradient(-45deg, #6a6767 75%, #4d4949 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;

        } 
</style>