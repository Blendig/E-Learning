<template>
	<div class="admin-container">
		<div class="admin-container-chd">
			<WordContribution/>
		</div>
		
	</div>
</template>
<script>
	import WordContribution from '@/components/WordAdmin/AddWord/index.vue'
	export default{
		name:'AddWordView',
		components:{
			WordContribution
		}
	}

</script>