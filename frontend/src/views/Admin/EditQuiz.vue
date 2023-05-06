<template>
	<div class="admin-container">
		<div class="admin-container-chd">
			<EditQuestionForm/>
		</div>
		
	</div>
</template>
<script>
	import EditQuestionForm from '@/components/QuizAdmin/EditQuestionForm.vue'
	export default{
		name:'EditQuiz',
		components:{
			EditQuestionForm
		}
	}

</script>