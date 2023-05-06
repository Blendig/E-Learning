<template>
   <div class="admin-container">
		<div class="admin-container-chd">
			<AddBlogForm/>
		</div>
	</div>
</template>
<script>
import AddBlogForm from '../../components/Extras/BlogAdmin/AddBlogForm.vue';
export default {
    name:'AddBlog',
    components:{
        AddBlogForm
    }

}
</script>
<style lang="scss">
    
</style>