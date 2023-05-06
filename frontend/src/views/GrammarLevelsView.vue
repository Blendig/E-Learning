<template lang="">
    <div>
        <Header/>
        <div class='md-container'>

        <PageTitle title='Grammar Levels'/>
        <div class='grammar-container'>
            <div class='g-item' v-for='level in levels'>
                <RouterLink :to='`/grammar/level/${level.value}`'>
                <div class='g-box'>
                    <div class='thumb-img'>
                         <img :src='`${level.image}`' alt='photo' align="center" />
                    </div>
                </div>
            </RouterLink>
            </div>

        </div>
    </div>
        
    </div>
</template>
<script>
import Header from '../components/Header.vue'
import PageTitle from '../components/PageTitle.vue';
import {GRAMMAR_LEVEL  } from '../constants/grammarLevels.js';



export default {
    name:'GrammarLevelsView',
    components:{
        Header,
        PageTitle
    },
    data(){
        return {
            levels:GRAMMAR_LEVEL
        }
    }
}
</script>
<style lang="css">
    .grammar-container {
    margin-top:1rem;
    width:792px;
    min-height:100%;
    display:grid;
    gap:1rem;
    grid-template-columns: auto auto auto;
}
.g-box{
    width:250px;
    height: auto;
    color:#fff;
    text-align:center;
}
.g-item{
    width:250px;
    height: auto;
    margin-bottom:.5rem;
}
.thumb-img{
    height:150px;
    width:250px;
    object-fit:cover;
}
.thumb-img img{
    height:150px;
    width:250px;
    object-fit:cover;
}
</style>