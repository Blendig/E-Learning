<template>
	<div class="admin-container">
		<div class="admin-container-chd">
			<ListeningAdminCreateForm/>
		</div>
	</div>
</template>
<script>
	import ListeningAdminCreateForm from '@/components/ListeningAdmin/index.vue'
	export default{
		name:'ListeningAdminAdd',
		components:{
			ListeningAdminCreateForm
		}
	}
</script>
<style></style>
