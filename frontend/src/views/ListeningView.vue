<template lang="">
  <div>
    <Header />
    <section class="md-container">
      <div class="score-card" v-if='currentTab === 1'>
        <small>Score</small>
      <div>{{ score }}/{{questions?.length}}</div>
    </div>
      <div style="color: #fff">
        <h1 align="center">{{ listen?.Name }}</h1>
        <br />
        <h3>{{ listen?.Description }}</h3>
        <br />
      </div>
      <!-- tab panel -->
      <div class="listen-page-wrapper">
        <div>
          <div class="tab-lv-panel">
            <div
              :class="[(currentTab === 0 && 'current tab-lv') || 'tab-lv']"
              role="button"
              @click="toggleTab(0)"
            >
              <Button text="SCRIPT" bgcolor="transparent" color="#fff" />
            </div>
            <div
              :class="[(currentTab === 1 && 'current tab-lv') || 'tab-lv']"
              role="button"
              @click="toggleTab(1)"
            >
              <Button text="QUIZ" bgcolor="transparent" color="#fff" />
            </div>
          </div>
          <article v-if="currentTab === 0">
            <div v-html="listen.Script" v-if="listen !== null"></div>
          </article>
        </div>
        <div>
          <div v-if="currentTab === 1">
            <ol style="color: #fff">
              <div :key="i" v-for="(q, i) in questions">
                <li>
                  <div class="">
                    <h2>{{ q.Content }}</h2>
                    <div class="mark-q flex">
                      <img
                        :src="corrImg"
                        v-if="checkAnswer && q.Answers[f(q._id)].isCorrect"
                      />
                      <img :src="incorrImg" v-else-if="checkAnswer" />
                    </div>
                  </div>

                  <div
                    role="radio"
                    class="answer-box-031"
                    v-for="(c, j) in q.Answers"
                    :key="j"
                  >
                    <span style="width: 100%">
                      <input
                        type="radio"
                        :id="`${j}${c.content}`"
                        :name="q._id"
                        :value="c._id"
                        @change="handleCheck(q._id, c.content, j)"
                    /></span>
                    <label
                      :class="[showAnswer && c.isCorrect && 'correct']"
                      :for="`${j}${c.content}`"
                    >
                      {{ c.content }}
                    </label>
                  </div>
                </li>
              </div>
            </ol>

            <div class="lv-btn-group flex">
              <Button
                text="Check Answers"
                bgcolor="transparent"
                color="var(--primary-color)"
                variant="outlined"
                @click="onCheckAnswer"
              />
              <Button
                text="Reset Quiz"
                bgcolor="transparent"
                color="var(--primary-color)"
                variant="outlined"
                @click="reset"
              />
              <Button
                text="Show Answers"
                bgcolor="transparent"
                color="var(--primary-color)"
                variant="outlined"
                @click="onShowAnswers"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import listeningApi from "../apis/listeningApi";
import incorrectIcon from "@/assets/resources/icons/checkAnswer/incorrect.gif";
import correctIcon from "@/assets/resources/icons/checkAnswer/correct.gif";
import Button from "@/components/Button.vue";
export default {
  name: "ListeningView",
  created() {
    this.fetchListening();
  },
  props: {},

  data() {
    return {
      value: 1,
      checkAnswer: false,
      showAnswer: false,
      listenId: "",
      listen: null,
      questions: [],
      currentTab: 0,
      correctAnswers: [],
      answers: [],
      corrImg: correctIcon,
      incorrImg: incorrectIcon,
      showScore: false,
      score: 0,
    };
  },
  methods: {
    handleIsCheckCorrect(qid, ans) {
      console.log(qid, ans);
      const k = this.correctAnswers.filter((c) => c.qid === qid);

      //return true
    },
    async fetchListening() {
      const response = await listeningApi.getListening(this.$route.params.id);
      if (response.status === 200) {
        console.log(response.data);
        this.listen = response.data.listen;
        this.questions = response.data.questions;
        const _tmp = [];
        for (var i = 0; i < this.questions.length; i++) {
          let el = this.questions[i];
          for (var j = 0; j < el.Answers.length; j++) {
            const answer = el.Answers[j];

            if (answer.isCorrect) {
              let obj = { qid: el._id, answer: answer.content, ansIndex: j };
              _tmp.push(obj);
            }
          }
        }
        this.correctAnswers = _tmp;
        console.log(_tmp);
      }
    },
    toggleTab(t) {
      this.currentTab = t;
    },
    reset() {
      if (window.confirm("Do you want reload page again?")) {
        window.location.reload();
      }
    },
    onShowAnswers() {
      this.showAnswer = true;
    },
    f(qid) {
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i].qid === qid) {
          return this.answers[i].ansIndex;
          break;
        }
      }
    },
    setShowScores() {
      let score = 0;
      for (var i = 0; i < this.questions.length; i++) {
        for (var j = 0; j < this.answers.length; j++) {
          if (this.answers[j].qid === this.questions[i]._id) {
            if (this.questions[i].Answers[this.answers[j].ansIndex].isCorrect) {
              score += 1;
            }
          }
        }
      }
      this.score = score;
      console.log(score);
    },
    onCheckAnswer() {
      console.log(this.answers, this.correctAnswers);
      //check answers by qid
      if (this.answers.length !== this.questions.length) {
        if (window.confirm("Select the answer to all questions.")) {
          window.close();
        }
      } else {
        this.checkAnswer = true;
        this.showAnswer = true;

        this.setShowScores();
         this.showScore = true;
      }
    },
    handleCheck(qid, ans, ansIndex) {
      try {
        const arr = this.answers;
        if (arr.length > 0) {
          //check if this question has a previous answer
          let index = arr.findIndex((a) => a.qid === qid);

          if (index !== -1) {
            //overwrite previous answer value
            arr[index]["answer"] = ans;
            arr[index]["ansIndex"] = ansIndex;
            // console.log('exists');
          } else {
            arr.push({ qid: qid, answer: ans, ansIndex: ansIndex });
            // console.log('not exists');
          }
          this.answers = arr;
          // console.log(arr,this.answers);
        } else {
          arr.push({ qid: qid, answer: ans, ansIndex: ansIndex });
          this.answers = arr;
          // console.log(this.answers);
        }
        console.log(qid, ans, this.answers);
      } catch (error) {
        throw error;
      }
    },
  },
  components: {
    Header,
    Button,
    incorrectIcon,
    correctIcon,
  },
};
</script>
<style lang="scss">
.answer-box-031 {
  line-height: 2.5;
  font-size: 1.2rem;
  label {
    &:hover {
      cursor: pointer;
    }
  }
  input {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }

  &:hover {
    cursor: pointer;
  }
}
.correct {
  color: #6af241;
}
.listen-page-wrapper {
  min-height: 100vh;
  article {
    padding: 1rem;
    color: #fff;
    font-size: 1.2rem;
  }
}
.lv-btn-group {
  margin: 2.5rem 0;
  width: 100%;
  button {
    margin-right: 0.6rem;
  }
}
.tab-lv-panel {
  background-color: var(--title-color);
  color: #fff;
  font-weight: bolder;
  display: flex;
  padding: 1rem;
  margin-bottom: 1.5rem;
  .tab-lv {
    width: 8rem;
  }
  .current {
    border-bottom: 2px solid #fff;
  }
}
.mark-q {
  img {
    height: 1.5rem;
    width: 1.5rem;
  }
}
.score-card{
    min-width: 8rem;
    padding: .5rem 1.5rem;
    background-color: #fff;
    color: #333;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    border-radius: 25px;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    small{
      font-size:.8rem;
      font-weight:400;
    }
}
</style>
