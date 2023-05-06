<template lang="">
    <div v-if='index === -1'>
        <div v-if='example'>
            {{example.slice(0, index)}}
            <b>{{word}}</b>
            {{example.slice(index + word.length)}}
        </div>
    </div>
</template>
<script>
export default {
    props:{
        example:String,
        word:String
    },
    created(){
       this.index=example.toLowerCase().indexOf(this.word.toLowerCase());
    },
    data(){
        return{
            index:String
        }
    }
}
</script>
<style lang="">
    
</style>