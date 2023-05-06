<template>
    <div>
        <div class="title-container">
            <h1 class="title-text-pt">{{title}}</h1>
        </div>
        <div class="english-break"></div>
        
    </div>
</template>
<script>
export default {
    name:'PageTitle',
    props:{
        title:String,

    }
}
</script>
<style type="scss">
    .title-container{
        width:100%;
        color:var(--vt-title-color);
        padding:1.5rem 0 1.2rem 0;
       
    }
    .title-text-pt{
        color: var(--title-color);

    }
</style>