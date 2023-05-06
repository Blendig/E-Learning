<template>
    <div>
      <h2>Part 2</h2>
      <div v-if="partQuestions.Audio">
        <div>
          <audio
            v-if="isPlaying === true"
            :onEnded="{}"
            :src="partQuestions.Audio"
          ></audio>
        </div>
      </div>
      <div class="" v-if="partQuestions?.Image">
        <div>
          <img :src="partQuestions.Image" alt="" width="500" height="300" />
        </div>
      </div>
  
      <div v-for="question in partQuestions.Questions" :key="question.id">
        <h2>{{ question.Sentence }} . {{ answer.Content }}</h2>
        <div>
          <img :src="question.Image" alt="" width="500" height="300" />
        </div>
        <div v-if="question.Answers">
          <div v-for="answer in questions.Answers" :key="answer.id">
              <label>
                  {{ answer.Sentence }}  {{ answer.Content }}
              </label>
              <input type="'radio'" @check="addAnswers(answer)"  checked='IsCheckedAnswer(answer._id)'/>
          </div>
        </div>
      </div>
      <Pagination pages='{1}' setCurrentPage='currentPage'/>
  
    </div>
  </template>
  <script>
  import Pagination from "./Pagination";
  import fileTestApi from "@/apis/fileTestApi";
  import submitTestApi from "@/apis/submitTestApi";
  
  export default {
    name: "Part2",
    props: {
      part,
      testId,
      submitId,
      setSubmitAnswers2,
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
  
        submitList = res.data.AnswerTests2;
        setSubmitAnswers2(res.data.AnswerTests2);
      })();
    },
    data() {
      return {
        currentPage: 1,
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
  
        setSubmitAnswers2(newList);
      },
      IsCheckedAnswer(answerId) {
        let checkedAnswer = submitList.some((item) => answerId === item._id);
        return checkedAnswer;
      },
    },
    components:{
      Pagination,
    }
  };
  </script>
  <style lang="css">
  </style>