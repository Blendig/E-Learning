<template>
    <div>
        <Header/>
      <div class="md-container">
       
         <div>
            <PageTitle :title="detail && detail.title" />

         </div>
            <p>Created at : {{ detail&&detail.createdAt }}</p>
            <br/>
           <div>
              <div v-html="detail&&detail.content"></div>
           </div>
          
   
      </div>
    </div>
  </template>
  <script>
  import PageTitle from "@/components/PageTitle.vue";
  import blogApi from "@/apis/Extras/blogApi";
  import Header from "../components/Header.vue";
  export default {
    name: "BlogDetail",
    data() {
      return {
        detail: null,
      };
    },
    created() {
     this.fetchDetail();
    },
    methods: {
      async fetchDetail() {
        try {
          const res = await blogApi.getBlogById(this.$route.params.id);
          if ( res.status === 200) {
            this.detail = res.data.blog[0];
         
          }
      
        } catch (error) {
         // throw error
          alert('Operation failed')
        }
      },
    },
    components: {
      PageTitle,
      Header,
    },
  };
  </script>
  <style lang="scss"></style>
  