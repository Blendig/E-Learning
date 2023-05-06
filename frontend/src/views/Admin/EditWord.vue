<template>
	<div class="admin-container">
		<div class="admin-container-chd">
			<EditWordForm/>
		</div>
		
	</div>
</template>
<script>
	import EditWordForm from '@/components/WordAdmin/EditWord/index.vue'
	export default{
		name:'AddWordView',
		components:{
			EditWordForm
		}
	}

</script>