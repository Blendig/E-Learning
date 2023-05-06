<template>
    <div>
    <Header/>
    <div class='md-container'>
        <PageTitle title='Vocabulary'/>
        
    </div>
</div>
</template>
<script>
import Header from "@/components/Header.vue";
import PageTitle from "../components/PageTitle.vue";

export default {
  name: "WordByTopicView",
  components: {
    Header,
    PageTitle,
  },
};
</script>
<style lang="">
</style>