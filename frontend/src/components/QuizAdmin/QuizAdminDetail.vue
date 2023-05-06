<template>
  <div class="admin-container">
    <div class="admin-container-chd">
      <div class="admin-container-chd english-container">
        <div class="toolbar-wrap flex">
          <h1 class="toolbar-title">Manage quiz</h1>
          <div class="toolbar-icon-box">
            <div>
              <RouterLink :to="`/admin/quiz/add/${$route.params.id}/${quizID}`">
                <button>
                  <AddIcon />
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
        <div v-if="questions !== null" style="color: #fff">
          <div
            class="makeStyles-root-85 flex-center-between"
            v-for="(q, i) in questions"
            :key="i"
          >
            <div class="mb-6">
              <h3 class="MuiTypography-root MuiTypography-h5">
                <em> {{ q.Content }}</em>
              </h3>

              <div
                class="d-flex flex align-items-center"
                v-for="(answer, j) in q.Answers"
                :key="j"
              >
                <p class="MuiTypography-root mb-2 MuiTypography-body2">
                  {{ answer.content }}
                </p>
                <button v-if="answer.isCorrect" class="icon-btn d8erfR">
                  <CheckIcon />
                </button>
              </div>
            </div>
            <div class="flex-center--ver">
              <div class="mr-5">
                <RouterLink
                  :to="`/admin/quiz/edit/${$route.params.id}/${q._id}`"
                >
                  <button class="icon-btn f32432">
                    <PencilIcon />
                  </button>
                </RouterLink>
              </div>
              <button class="icon-btn f32432"
              @click="deleteHandler(q._id)"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddIcon from "@/assets/svgs/Add.vue";
import quizApi from "@/apis/quizApi.js";
import questionApi from "@/apis/questionApi.js";
import DeleteIcon from "@/assets/svgs/Delete.vue";
import PencilIcon from "../../assets/svgs/Pencil.vue";
import CheckIcon from "@/assets/svgs/Check.vue";
export default {
  name: "QuizAdminDetail",
  created() {
    this.getQuizByListen();
  },
  data() {
    return {
      quiz: null,
      quizID: null,
      questions: null,
    };
  },
  methods: {
    async getQuizByListen() {
      const apiRes = await quizApi.getQuizByListen(this.$route.params.id);
      //setQuiz(apiRes.data);
      if (apiRes && apiRes.status === 200) {
        this.quiz = apiRes.data;
        this.quizID = apiRes.data ? apiRes.data._id : null;
        //settQuizID(apiRes.data ? apiRes.data._id : null);
        console.log(apiRes.data, apiRes.data._id, this.quizID);
        this.getQuestionByQuiz();
      }
    },
    async getQuestionByQuiz() {
      if (this.quizID === null) {
        return;
      }
      const apiRes = await questionApi.getQuestionByQuiz(this.quizID);
      //  setQuestions(apiRes.data.questions);
      this.questions = apiRes.data.questions;
      console.log(this.quizID, apiRes.data.questions);
    },
    async deleteHandler(id) {
      try {
        if (window.confirm("Are you sure you want to delete this question?")) {
          // dispatch(deleteQuestion(id))
          // dispatch(setMessage("Delete successfully", "success"));
          const response = await questionApi.deleteQuestion(id);
          if (response.status === 200) {
            window.location.reload();
          }else{
            alert('Could not delete question')
          }
         
        }
      } catch {
        // dispatch(setMessage("Can't delete question", "error"));
      }
    },
  },
  components: {
    AddIcon,
    DeleteIcon,
    PencilIcon,
    CheckIcon,
  },
};
</script>
<style lang="scss">
.d8erfR {
  min-height: 2.5rem;
  width: 2.5rem;
  svg {
    fill: var(--primary-color);
  }
}
.makeStyles-root-85 {
  margin-top: 3.2rem;
}
.icon-question-check svg {
  height: 2rem;
}
.flex-center-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mb-6 {
  margin-bottom: 1.2rem !important;
}
.f32432 {
  svg {
    fill: grey;
  }
}
</style>