<template>
    <div>
        <Header/>
        <div>
            <div class="md-container">
                <PageTitle title="Blogs"/>
                <div>
                    <div v-if="list.length > 0">
                    <div v-for="(item, i) in list" :key="i">
                        <RouterLink :to="`/blog/details/${item._id}`">
                            <div class="flex">
                                <div class="">
                                   
                                </div>
                                <div class="desc-item">
                                    <p class="title-567">
                                        {{ item.title }}
                                    </p>
                                    <div class="textlimit">
                                        <p class="tldetail" v-html="item.content">
                                           </p>
                                    </div>
                                </div>
                            </div>
                        </RouterLink>
                        <br/>
                    </div>
                </div>
                </div>

            </div>
        </div>
       
    </div>
</template>
<script>
import blogApi from '../apis/Extras/blogApi';
import Header from '../components/Header.vue';
import PageTitle from '../components/PageTitle.vue';
export default {
    name:'BlogListView',
    created() {
        this.fetchBlogs()
    },
    data(){
        return{
            list:[]
        }
    },
    methods: {
        async fetchBlogs(){
            try {
                const res =await blogApi.getBlog();
                if(res.status===200){
                    this.list=res.data.blogs
                }
            } catch (error) {
                throw error
            }
        }
    },
    components:{
    Header,
    PageTitle
}
}
</script>
<style lang="">
    
</style>