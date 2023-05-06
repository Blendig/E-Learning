<template>
  <div>
    <div class="admin-container">
      <div class="admin-container-chd">
        <div class="admin-container-chd english-container">
          <PageTitle :title="detail && detail.title" />
          <p>Created at : {{ detail&&detail.createdAt }}</p>
          <br/>
         <div>
            <div v-html="detail&&detail.content"></div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from "../../components/PageTitle.vue";
import blogApi from "../../apis/Extras/blogApi";
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
  },
};
</script>
<style lang="scss"></style>
