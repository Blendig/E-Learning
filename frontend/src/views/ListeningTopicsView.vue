<template lang="">
<div>
        <Header/>
    <div class='md-container'>
       
        <PageTitle title='Listening Topics'/>
        <div class='topic-container'>
            
                <div class="topic-item" v-for='topic in topics'>
                    <RouterLink :to='`/listening/topic/${topic.value}`'>
                    <div class='topic-box'>
                        <div class='thumb-img'>
                            <img :src="getUrl(topic.image)" alt />
                        </div>

                        <div key='{topic.label}'>
                            <h2>{{topic.label}}</h2>
                        </div>

                    </div>
                </RouterLink>
                </div>
          
        </div>

    </div>
</div>
</template>
<script>
import Header from "../components/Header.vue";
import {LISTEN_TOPIC  } from '../constants/listeningTopics.js';
import PageTitle from "../components/PageTitle.vue";

export default {
  name: "ListeningTopicsView",
  components: {
    PageTitle,
    Header,

  },
  data(){
    return{
        topics:LISTEN_TOPIC
    }
  },
  methods:{
    getUrl(url){
        return url
    }
  }
};
</script>
<style lang="css">
.topic-container {
    margin-top:1rem;
    width:792px;
    min-height:100%;
    display:grid;
    gap:1rem;
    grid-template-columns: auto auto auto;
}
.topic-box{
    width:250px;
    height: auto;
    color:#fff;
    text-align:center;
}
.topic-item{
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