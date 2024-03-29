<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import nicebutton from '../components/icons/nicebutton.vue';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { ref,computed,reactive,onMounted} from 'vue';
import axios from 'axios';

const path = ref(null);
const toast = useToast();
const renderURL='https://restapi-neon.onrender.com';
import * as AWS from 'aws-sdk'; //fix bug import AWS from 'aws-sdk'
const key = import.meta.env.VITE_AWS_KEY;
const secreteKey = import.meta.env.VITE_AWS_SECRET_KEY;
const distributionId = import.meta.env.VITE_AWS_DISTRIBUTION_ID;

//console.log(key,secreteKey,distributionId);
const cloudfront = new AWS.CloudFront({
    accessKeyId: key,
    secretAccessKey: secreteKey,
});

const invalidateParams = computed(()=>({
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 1,
        Items: [
           path.value,
        ],
      },
    },
}))

let logs=ref(null)

const loglatest = computed(() => {
    if(logs.value)
   return logs.value.slice().sort((a, b) => b.id - a.id);
});



const _invalidate=async()=>{
    try {
        const response = await cloudfront.createInvalidation(invalidateParams.value).promise();
        toast.success('Successfully Invalidated');
        postLogs({logname:path.value})
        fetchLogs();
    } catch (err) {
        toast.error('Error in Invalidation');
    }
}

const fetchLogs=async()=>{
    try{
        console.log('Getting data....')
        const response = await axios.get(renderURL+'/logs');
        logs.value= response.data;
    }catch(error){
        console.error('Error fetching logs:', error);
        throw error;
    }

}

const postLogs=async(data)=>{
    try{
        console.log('Getting data....')
        const response = await axios.post(renderURL+'/logs',data);
        fetchLogs();
    }catch(error){
        console.error('Error fetching logs:', error);
        throw error;
    }

}
onMounted(()=>{
    fetchLogs();        
})
</script>

<template>
   <div class="flex flex-col items-start space-y-2">
        <FloatLabel >
                <InputText id="path" v-model="path" aria-describedby="username-help" class="w-[200px] md:w-[500px] lg:w-[900px]"/>
                <label for="path">Path</label>
                <small id="username-help" class="ml-2">Example/path/object1</small>
                
        </FloatLabel>
        <nicebutton btitle="Invalidate" @click="_invalidate"/>
        <div id="log" class="flex justify-between text-xs w-full" v-for="(log,index) in loglatest" :key="index">
            <p>{{ log.logname }}</p><p>{{ log.timestamp_column }}</p>
        </div>
    </div>
</template> 