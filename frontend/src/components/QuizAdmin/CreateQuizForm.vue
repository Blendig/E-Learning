<template>
  <div>
    <PageTitle title="Thêm Câu Hỏi" />
    <br />
    <form @submit.prevent="postQuestion">
      <div class="grid-container">
        <div
          class="grid-item"
          style="max-width: 100% !important; flex-basis: 100%; flex-grow: 3"
        >
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Question</span>
              <div>
                <input
                  v-model="form.content"
                  type="text"
                  placeholder=""
                  name="content"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>First answer </span>
              <div class="flex">
                <input
                  v-model="form.answer1"
                  type="text"
                  placeholder=""
                  name="answer1"
                />
                <button
                  type="button"
                  :id="[form.check[0] && 'checked']"
                  class="icon-btn check-btn"
                  @click="toggleAnswer(0)"
                >
                  <CheckIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Second Answer </span>
              <div class="flex">
                <input
                  v-model="form.answer2"
                  type="text"
                  placeholder=""
                  name="answer2"
                />
                <button
                  type="button"
                  :id="[form.check[1] && 'checked']"
                  class="icon-btn check-btn"
                  @click="toggleAnswer(1)"
                >
                  <CheckIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Third Answer </span>
              <div class="flex">
                <input
                  v-model="form.answer3"
                  type="text"
                  placeholder=""
                  name="answer3"
                />
                <button
                  type="button"
                  :id="[form.check[2] && 'checked']"
                  class="icon-btn check-btn"
                  @click="toggleAnswer(2)"
                >
                  <CheckIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item"></div>
        <div class="grid-item"></div>

        <div className="english-break"></div>
        <div class="wd1-cwrap flex">
          <Button
            text="Return"
            variant="outlined"
            bgcolor="none"
            color="var(--accent-color)"
            type="button"
            @click="$router.push('/admin/quiz')"
          />
          <Button text="Create" color="#fff" type="submit" v-if="!submitting" />
        </div>
      </div>
    </form>
  </div>
</template>
    <script>
import PageTitle from "@/components/PageTitle.vue";
import Button from "@/components/Button.vue";
import { LISTEN_TOPIC } from "@/constants/listeningTopics";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import listeningApi from "@/apis/listeningApi.js";
import CheckIcon from "@/assets/svgs/Check.vue";

export default {
  name: "CreateQuizForm",
  data() {
    return {
      form: {
        content: "",
        answer1: "",
        answer2: "",
        answer3: "",
        check: [false, false, false],
      },
      topics: LISTEN_TOPIC,
      submitting: false,
    };
  },
  methods: {
    toggleAnswer(a) {
    
      let tmp = this.form.check;
      for (let i = 0; i < tmp.length; i++) {
        tmp[i] = false;
      }
      tmp[a] = true;
      this.form.check = [...tmp];
     
    },
    async postQuestion() {

      let answerQuestion=[];
      let isChecked=0;
      if(this.form.answer1.trim()!== ""){
        if(this.form.check[0]==true){isChecked += 1;}
        answerQuestion.push({content:this.form.answer1, isCorrect: this.form.check[0]})}
      if(this.form.answer2.trim()!== ""){
        if(this.form.check[1]==true){isChecked += 1;}
        answerQuestion.push({content:this.form.answer2, isCorrect: this.form.check[1]})}
      if(this.form.answer3.trim()!== ""){
        if(this.form.check[2]==true){isChecked += 1;}

        answerQuestion.push({content:this.form.answer3, isCorrect: this.form.check[2]})}
  
      if(answerQuestion.length <2){
       // dispatch(setMessage("Question is invalid", 'error'));
        submitting=false
        console.log(1)
        return;
      }
    
      if(answerQuestion.length == 2 && isChecked ==2 ){
      alert('Question is invalid')
        submitting=false
        return;
      }

      console.log(this.form.check);
      try {
        const dataSend = {
          Content: this.form.content,
          Answers: answerQuestion,

        };
        console.log(dataSend)
        const apiRes = await questionApi.postQuestion(quiz_id, dataSend);
        if (apiRes) {
         // dispatch(setMessage('Create question successfully', 'success'));
         // setSubmitting(false);
          //history.replace(`/admin/quiz/details/${id}`);
          this.$router.push(`/admin/quiz/details/${this.$route.params.id}`)
        }
      } catch (error) {
        alert('Something went wrong')
      }
    },
  },
  components: {
    PageTitle,
    Button,
    CheckIcon,
  },
};
</script>
<style type="scss">
.check-btn {
  min-width: 2rem;
  height: 2rem;
  padding-right:.2rem;
  margin-top: -10px;
}
.check-btn svg {
  width: 2rem;
  height: 2rem;
  fill: #8693a1;
 
}
#checked svg {
  fill: var(--primary-color);
}
.input-container {
  margin-bottom: 0;
}

.grid-item-chd {
  padding: 0;
  min-height: 0;
}
.wd1-cwrap button:first-child {
  margin-right: 1rem;
}
.wd1-cwrap {
  float: right;
}
select > option {
  background-color: var(--bg-color-accent);
}
</style>