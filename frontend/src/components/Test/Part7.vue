<template>
  <div>
    <h2>Part 7</h2>
    <div v-if="partQuestions.Audio">
      <div>
        <img
          v-if="partQuestions?.Image"
          :src="partQuestions.Image"
          alt=""
          width="500"
          height="300"
        />
        <img
          v-if="partQuestions?.Image2"
          :src="partQuestions.Image2"
          alt=""
          width="500"
          height="300"
        />
        <img
          v-if="partQuestions?.Image3"
          :src="partQuestions.Image3"
          alt=""
          width="500"
          height="300"
        />
      </div>
    </div>
    <div class="" v-if="partQuestions?.image">
      <div>
        <img :src="partQuestions.Image" alt="" width="500" height="300" />
      </div>
    </div>

    <div v-for="question in partQuestions.Questions" :key="question.id">
      <h2>{{ question.Sentence }} .</h2>
      <div>
        <img :src="question.Image" alt="" width="500" height="300" />
      </div>
      <div v-if="question.Answers">
        <div v-for="answer in questions.Answers" :key="answer.id">
          <label>
            {{ answer.Sentence }}
          </label>
          <input
            type="'radio'"
            @check="addAnswers(answer)"
            checked="IsCheckedAnswer(answer._id)"
          />
        </div>
      </div>
    </div>
    <Pagination
      pages="{15}"
      submitAnswers7="submitList"
      submitId="submitId"
      setCurrentPage="currentPage"
    />
  </div>
</template>
  <script>
import Pagination from "./Pagination";
import fileTestApi from "@/apis/fileTestApi";
import submitTestApi from "@/apis/submitTestApi";

export default {
  name: "Part7",
  props: {
    part,
    testId,
    submitId,
    setSubmitAnswers7,
  },
  created() {
    (async function () {
      const res = await fileTestApi.getAllQuestionsOfFile(
        testId,
        part,
        currentPage
      );
      this.partQuestions = res.data;
    })();
    (async function () {
      const res = await submitTestApi.getSubmitById(submitId);

      submitList = res.data.AnswerTests7;
      setSubmitAnswers7(res.data.AnswerTests7);
    })();
  },
  data() {
    return {
      currentPage: 7,
      partQuestions: [],
      submitList: [],
      isPlaying: true,
    };
  },
  methods: {
    addAnswers(answer) {
      let checkExisted = this.submitList.some(
        (item) => answer.QuestionTestId === item.QuestionTestId
      );

      let newList = [];
      if (checkExisted === true) {
        newList = this.submitList.filter(
          (item) => item.QuestionTestId !== answer.QuestionTestId
        );
      } else {
        newList = this.submitList;
      }

      newList.push(answer);
      this.submitList = newList;

      setSubmitAnswers7(newList);
    },
    IsCheckedAnswer(answerId) {
      let checkedAnswer = submitList.some((item) => answerId === item._id);
      return checkedAnswer;
    },
  },
  components: {
    Pagination,
  },
};
</script>
  <style lang="css">
</style>