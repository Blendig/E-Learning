<script>

export default {
    name:'Button',
    props:{
        text:String,
        color:String,
        bgcolor:String,
        width:'inherit',
        variant:String,
        type:'button'
    },
   
}
</script>

<template>
    <div>
    <button 
    :type="type"
    :style="{
        background:bgcolor,
        border:variant==='outlined'&& '1px solid '+color,
        color:color,
        width:width
        }"> 
        {{ text }}
    </button>
</div>
</template>

<style>

   button{
    background-color:#68c2e8;
    height:2.7rem;
    min-width:7rem;
    border:0;
    border-radius:.2rem;
    cursor:pointer;
    font-size:1rem;
    font-weight:bold;
   }
</style>