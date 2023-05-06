<template>
    <div>
      <h2>Part 4</h2>
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
        <h2>{{ question.Sentence }} . {{ question.Content }}</h2>
        <div>
          <img :src="question.Image" alt="" width="500" height="300" />
        </div>
        <div v-if="question.Answers">
          <div v-for="answer in questions.Answers" :key="answer.id">
              <label>
                  {{ answer.Sentence }} {{ question.Content }}
              </label>
              <input type="'radio'" @check="addAnswers(answer)"  checked='IsCheckedAnswer(answer._id)'/>
          </div>
        </div>
      </div>
      <Pagination 
      pages='10' 
      setCurrentPage='currentPage'
      submitAnswers4='submitList'
        submitId='submitId'
      />
  
    </div>
  </template>
  <script>
  import Pagination from "./Pagination";
  import fileTestApi from "@/apis/fileTestApi";
  import submitTestApi from "@/apis/submitTestApi";
  
  export default {
    name: "Part4",
    props: {
      part,
      testId,
      submitId,
      setSubmitAnswers4,
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
  
        submitList = res.data.AnswerTests4;
        setSubmitAnswers4(res.data.AnswerTests4);
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
  
        setSubmitAnswers4(newList);
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