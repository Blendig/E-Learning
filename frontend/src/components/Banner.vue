<template>
    <div class="banner-wrapper">
        <!-- <img src='../assets/resources/images/background.jpg' alt="banner" /> -->
        <div class="title">
            <div class="title-hero">LEARNING ENGLISH</div>
        </div>
       
    </div>
</template>
<script>
    export default{
        name:'Banner',
        props:{
            image:String
        }
    }
</script>

<style scoped type='scss'>
.banner-wrapper{
    width:100%;
    height:25rem;
    object-fit:cover;
    background-image:url('../assets/resources/images/background.jpg');
    background-repeat:no-repeat;
    background-size:cover;

}
.title{
    background-color:#000;
    width:auto;
    position:absolute;
    padding:.5rem 1rem;
    font-size:3rem;
    font-weight:bold;
    margin:14rem 0 0 5rem;
    color:#fff!important;


}
.title-hero{
    font-weight:bold;
}
</style>