<template lang="">
   <!-- word game ui -->
   <div v-if='showGameUI'>
      <WordMatchGameMain :list='wordPack'/>
    </div>
    <!-- game-page-form -->
  <div class="game-page "  v-else>
    
    <div class="md-container">
      <div class="game-paper">
        <div class="game-content">
          <!-- header title -->
          <div class="game-form-title">
            <h2>Choose from a vocabulary pack</h2>
          </div>

          <!-- form -->
          <form class="game-form form-349">
            <div class="grid-container">
              <div class="grid-item">
                <div class="grid-item-chd">
                  <div class="input-container">
                    <span>Word type</span>
                    <div>
                      <select name="Topic" v-model="form.type">
                        <option value="-1">All</option>
                        <option
                          v-for="(type, i) in types"
                          :key="i"
                          :value="type.value"
                        >
                          {{ type.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <!-- level -->
              <div class="grid-item">
                <div class="grid-item-chd">
                  <div class="input-container">
                    <span>Level</span>
                    <div>
                      <select name="Level" v-model="form.level">
                        <option value="-1">All</option>
                        <option
                          v-for="(level, i) in levels"
                          :key="i"
                          :value="level.value"
                        >
                          {{ level.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <!-- specialized -->
              <div class="grid-item">
                <div class="grid-item-chd">
                  <div class="input-container">
                    <span>Specialized</span>
                    <div>
                      <select name="Topic" v-model="form.specialty">
                        <option value="-1">All</option>

                        <option
                          v-for="(type, i) in specialty"
                          :key="i"
                          :value="type.value"
                        >
                          {{ type.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <!-- sentences -->
              <div class="grid-item">
                <div class="grid-item-chd">
                  <div class="input-container">
                    <span>Number of sentences</span>
                    <div>
                      <input
                        type="number"
                        v-model="form.nQuestion"
                       
                        min="5"
                        max="500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid-item">
                <div class="grid-item-chd">
                  <div class="input-container">
                    <span></span>
                    <div>
                      <Button
                        type="button"
                        text="Choose a theme"
                        color="var(--label-color)"
                        bgcolor="transparent"
                        @click="toggleTopicsView"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid-item"></div>
              <div class="topic-grid-box" v-if="viewTopics">
                <div
                  class="topic-grid-box"
                  style="width: 100%; min-height: 200px"
                >
                  <TopicSelect
                    @add-topic="handleTopicChange"
                    :selected="form.topics"
                  />
                </div>
              </div>
            </div>
          </form>

          <!-- buttons -->
          <div class="flex btn-box-657">
            <Button
              typ="button"
              text="BACK"
              color="#fff"
              @click="this.$router.back()"
              bgcolor="grey"
            ></Button>
            <Button
              type="button"
              text="BEGIN"
              color="#fff"
              @click="submitWord"
            ></Button>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import { WORD_LEVELS, WORD_TYPES, WORD_SPECIALTY } from "@/constants/index";
import Button from "../components/Button.vue";
import TopicSelect from "@/components/UIx/TopicSelect/index.vue";
import gameApi from "@/apis/gameApi";
import WordMatchGameMain from './PlayGames/WordMatch.vue'

export default {
  name: "WordmatchGameView",
  data() {
    return {
      form: {
        wordPack:[],
        topics: [],
        type: "-1",
        specialty: "-1",
        level: "-1",
        nQuestion: 20,
      },
      viewTopics: false,
      levels: WORD_LEVELS,
      types: WORD_TYPES,
      specialty: WORD_SPECIALTY,
      state: 0,
      showGameUI:false
    };
  },
  methods: {
    toggleTopicsView() {
      this.viewTopics = !this.viewTopics;
    },
    handleTopicChange(t) {
      let _arr = this.form.topics;
      let tmp = [];

      if (!_arr.includes(t)) {
        //add to array
        tmp = [..._arr, t];
        this.form.topics = tmp;
        console.log(_arr);
      } else {
        tmp = _arr.filter((a) => a !== t);
        this.form.topics = tmp;
        // _arr.splice(_arr.findIndex(a=>a===t),1)
      }
      console.log(_arr, this.form.topics);
    },
    async submitWord() {
      console.log(this.form);

      try {
        const MAX_LEN_WORD_PACK = 500;

        const n =
          this.form.nQuestion < 0 || this.form.nQuestion > MAX_LEN_WORD_PACK
            ? 100
            : this.form.nQuestion;
        const apiRes = await gameApi.getWordPackWordMatch(
          this.form.type,
          this.form.level,
          this.form.specialty,
          this.form.topics,
          n
        );

        if (apiRes.status === 200) {
          const { wordPack = [] } = apiRes.data;

          if (wordPack.length === 0) {
            alert(
              "Sorry, the current vocabulary pack is not enough. Please try again",
              "warning"
            );
            this.state == 0;
            return;
          }
          this.wordPack = wordPack;
          this.showGameUI = true
          this.state == 2;
          console.log(wordPack)
          return;
        }
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Get the vocabulary pack failed, try again!";
        this.state = 0;
        alert(message);
      }
    },
  },
  components: {
    Button,
    TopicSelect,
    WordMatchGameMain
  },
};
</script>
<style lang="scss">
.topic-grid-box {
  width: 100% !important;
  max-width: 100% !important;
  flex-basis: 100%;
}
.game-form-title {
  color: var(--title-color);
  padding: 1.5rem;
}
.game-page {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100%;
  position: fixed;
  display: flex;
  left:0;
}
.game-paper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.game-content {
  width: calc(100% - 64px);
  //background-color: var(--bg-color-sec);
  min-height: 400px;
  border-radius: 4px;
}
.btn-box-657 {
  justify-content: flex-end;
  padding: 1.5rem;
  :first-child {
    margin-right: 0.4rem;
  }
}
.game-form {
  border-color: var(--border-color);
  max-height: 70vh;
  overflow-x: hidden;
  overflow-y: scroll;
  .grid-container {
    padding: 1.5rem;
    min-height: 320px;
  }
  select > option {
    font-size: 1.2rem;
  }
  .grid-item {
    max-width: 50%;
    flex-basis: 50%;
  }
  .grid-item-chd {
    min-height: 0;
    padding: 0;
  }

}
.form-349{
  .input-container {
    margin: 0!important;
  }
}
</style>
