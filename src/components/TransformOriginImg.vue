<script setup>
import {ref,reactive,onMounted,watch} from 'vue'
import TransformOriginInfo from './TransformOriginInfo.vue';


let imginfo={
    originX:null,
    originY:null,
    ptop:null,
    pright:null,
    pbottom:null,
    pleft:null,
}

let bound={
    top: null,
    left: null,
    right: null,
    bottom: null
}


const ctxCanReact={
    c:null,
    ctxRedDot:null,
    ctxImg:null,
    ctxImgData:null,
    pixels:null
}

const imgObj={
    x:0,
    y:0
}

const showinfo=ref(false)
const image=ref(null)

let isDragging=false;
let offSetX,offSetY;

    
const setImageData=()=>{
    let c= image.value
    let x,y;
    ctxCanReact.ctxImgData = c.getContext('2d', {willReadFrequently:true});
    ctxCanReact.pixels =  ctxCanReact.ctxImgData.getImageData(0, 0, c.width, c.height);
    let l = ctxCanReact.pixels.data.length;
    for (let i = 0; i < l; i += 4) {
        if (ctxCanReact.pixels.data[i + 3] !== 0) {
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
   
}

const getoriginValue=()=>{
    let c=ctxCanReact.c;
    imginfo.originX=((((bound.right + bound.left)/2)/c.width)*100).toFixed(1);
    imginfo.originY=((((bound.bottom + bound.top)/2)/c.height)*100).toFixed(1);
    imginfo.ptop=((bound.top/c.height)*100).toFixed(1);
    imginfo.pright=((bound.right/c.width)*100).toFixed(1);
    imginfo.pbottom=((bound.bottom/c.height)*100).toFixed(1);
    imginfo.pleft=((bound.left/c.width)*100).toFixed(1);
}

const drawImage=(ctx,ddx,ddy)=>{
     ctx.clearRect(0, 0, image.value.width, image.value.height);
     ctx.drawImage(props.img,ddx,ddy);
     if(bound.bottom!=null)
     drawRedDot(ctxCanReact.ctxImg,bound)
}

const drawRedDot=(ctx,bound)=>{
        ctx.beginPath();
        ctx.arc((bound.right + bound.left)/2, (bound.bottom + bound.top)/2, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
        ctx.fill();
    
}

onMounted(()=>{
    ctxCanReact.c = image.value;
    ctxCanReact.ctxImg= image.value.getContext("2d", {willReadFrequently:true,});
    image.value.width =  props.img.width;
    image.value.height = props.img.height;
    drawImage(ctxCanReact.ctxImg,0,0)
    setImageData();
    getoriginValue();
    drawRedDot(ctxCanReact.ctxImg,bound)
    imginfo=reactive(imginfo)
    bound=reactive(bound)
})

const mapToPercentageX = (value) => {
    return Math.abs(((value-((bound.right-bound.left)/2)))/(bound.right-bound.left))*100
}
const mapToPercentageY = (value) => {
    return Math.abs(((value-((bound.bottom-bound.top)/2)))/(bound.bottom-bound.top))*100
}
//dragging function
const moveCanvas=(e)=>{
    if (isDragging) {
                  
            var mouseX = e.clientX - image.value.getBoundingClientRect().left;
            var mouseY = e.clientY - image.value.getBoundingClientRect().top;
            imgObj.x = mouseX - offSetX;
            imgObj.y = mouseY - offSetY;
            // console.log(mapToPercentage(imgObj.x))
            drawImage(ctxCanReact.ctxImg, imgObj.x ,imgObj.y)
            imginfo.originX=mapToPercentageX(imgObj.x).toFixed(2)
            imginfo.originY=mapToPercentageY(imgObj.y).toFixed(2)
     }
}
const upCanvas=(e)=>{
   
    isDragging = false;
}
const downCanvas=(e)=>{
   
    var mouseX = e.clientX - image.value.getBoundingClientRect().left;
    var mouseY = e.clientY - image.value.getBoundingClientRect().top;
    if (mouseX >= 0 && mouseX <= image.value.width && mouseY >= 0 && mouseY <= image.value.height) {
                    offSetX = mouseX-imgObj.x;
                    offSetY =  mouseY-imgObj.y;
                    isDragging = true;
     }
}

const props=defineProps({img:Object,filename:String})

</script>

<template>
    <div class="w-80 h-auto " @mouseenter="showinfo=!showinfo" @mouseleave="showinfo=!showinfo;isDragging=false">
        <span class="text-white text-xs drop-shadow-lg bg-black bg-opacity-60">{{ props.filename }}</span>
        <TransformOriginInfo :imginfo="imginfo" v-if="showinfo"/>
        <canvas ref="image" class="w-full" @mousemove='moveCanvas' @mouseup="upCanvas" @mousedown="downCanvas"></canvas>
    </div>
</template>

<style scoped>
 canvas{
            
            background-image: linear-gradient(45deg, #4d4949 25%, transparent 25%), linear-gradient(-45deg, #4d4949 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #4d4949 75%), linear-gradient(-45deg, #6a6767 75%, #4d4949 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;

        } 
</style>