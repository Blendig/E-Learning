<template>
	<div class="admin-container">
		<div class="admin-container-chd">
			<GrammarAdminEditForm/>
		</div>
	</div>
</template>
<script>
	import GrammarAdminEditForm from '@/components/GrammarAdmin/Edit/index.vue'
	export default{
		name:'GrammarAdminAdd',
		components:{
			GrammarAdminEditForm
		}
	}
</script>
<style></style>
