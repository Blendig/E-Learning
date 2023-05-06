<template>
	<div class="admin-container">
		<div class="admin-container-chd">
			<GrammarAdminCreateForm/>
		</div>
	</div>
</template>
<script>
	import GrammarAdminCreateForm from '@/components/GrammarAdmin/Create/index.vue'
	export default{
		name:'GrammarAdminAdd',
		components:{
			GrammarAdminCreateForm
		}
	}
</script>
<style></style>
