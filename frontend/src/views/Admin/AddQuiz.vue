<template>
	<div class="admin-container">
		<div class="admin-container-chd">
			<CreateQuizForm/>
		</div>
	</div>
</template>
<script>
	import CreateQuizForm from '@/components/QuizAdmin/CreateQuizForm.vue'
	export default{
		name:'AddQuiz',
		components:{
			CreateQuizForm
		}
	}
</script>
<style></style>
