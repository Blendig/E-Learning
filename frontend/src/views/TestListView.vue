<template>
  <div>
    <Header></Header>
   <div class="md-container">
    <PageTitle title="Test"/>
    <SpinnerIcon v-if="loading"/>
    <p align='center' v-else><br/>List is empty</p>
    <div >
      
    </div>


   </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import PageTitle from '../components/PageTitle.vue';
import SpinnerIcon from '@/assets/svgs/Spinner.vue'
import testApi from '@/apis/testApi.js'
export default {
  name:'TestListView',
  created() {
    this.getAllTest();
  },
  data() {
    return {
      list:[],
      loading:true
    }
  },
  methods: {
    async getAllTest () {
      try {
        const res = await testApi.getAllTest();
        if(res.status===200){
          this.list =res.data.tests
          this.loading=false
        }
      } catch (error) {
        this.loading=false
        throw error
      }
     
    }
  },
  components:{
    Header,
    PageTitle,
    SpinnerIcon
  }
}
</script>
<style lang="css">
  
</style>