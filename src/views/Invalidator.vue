<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import nicebutton from '../components/icons/nicebutton.vue';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { ref,computed} from 'vue';


const path = ref('test');
const toast = useToast();

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


const _invalidate=async()=>{
    try {
        const response = await cloudfront.createInvalidation(invalidateParams.value).promise();
        toast.success('Successfully Invalidated');
    } catch (err) {
        toast.error('Error in Invalidation');
        //console.log(err);
    }
}

</script>


<template>
   <div class="flex flex-col items-start mx-20 gap-2">
        <FloatLabel >
                <InputText id="path" v-model="path" aria-describedby="username-help" class="w-[200px] md:w-[500px] lg:w-[900px]"/>
                <label for="path">Path</label>
                <small id="username-help" class="ml-2">Example/path/object1</small>
                
        </FloatLabel>
        <nicebutton btitle="Invalidate" @click="_invalidate"/>
    </div>
   
</template>