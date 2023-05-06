<template lang="">
  <div class="flex-center-col h-100vh wmgame-container">
    <div
      class="makeStyles-root-119 wmgame-container english-game-box position-rel"
      v-if="!isDone"
    >
      <div class="english-game-title">
        <img :src="puzzleImg" alt="game photo" />
        <h1 class="flex-center--ver">
          <span>Translate from</span>
          <QuestionMark />
        </h1>
      </div>

      <div class="makeStyles-summary-120 flex-center-between">
        <div class="flex-center--ver">
          <p>
            Sentences&nbsp;<b>{{ step + 1 }}</b
            >&nbsp;/&nbsp;<b>{{ list?.length }}</b>
          </p>
        </div>

        <!-- wrong mark -->
        <div class="flex-center--ver">
          <p>
            <b>{{ nRight }}</b
            >&nbsp;Right
          </p>
          &nbsp;
          <CorrectCheckMark />
          <p>
            &nbsp;-&nbsp;<b>{{ nWrong }}</b
            >&nbsp;&nbsp;Wrong
          </p>
          &nbsp;
          <WrongCheckMark />
        </div>
      </div>

      <div class="makeStyles-root-122">
        <div id="userSplitId" class="makeStyles-split-57 flex-center">
          <div
            :class="[checkRightWrong(w.ch, i)]"
            role="button"
            v-for="(w, i) in usrSplitVal"
            :key="i"
          >
            {{ w.ch }}
          </div>
        </div>
        <div>
          <div class="flex-center-between my-4">
            <div title="See the answer" role="button" @click="toggleModal">
              <QuestionMarkInfo />
            </div>
            <p class="makeStyles-mean-125 t-center px-4">
              {{ current && current.mean }}
            </p>
            <div role="button" @click="speakWord" title="">
              <Speaker2Icon />
            </div>
          </div>
          <p
            :class="[
              (status === 'Right' && 'makeStyles-answer-67 t-center right') ||
                'makeStyles-answer-67 t-center wrong',
            ]"
          >
            {{ status }}
          </p>
        </div>
        <!-- split words -->
        <SplitWord
          :mean="current.mean"
          :originalWordArr="originSplit"
          :word="current.word"
          @set-user-split-word="onUserSplitWordPick"
          @is-check="handleIsCheck"
        />
      </div>
      <div
        role="button"
        class="nav-arrow next"
        title="Through the next sentence"
        @click="handleNext"
      ></div>
    </div>
    <!-- completed -->
    <div class="makeStyles-root-121 flex-center-col" v-if="isDone">
      <img :src="cupImg" class="makeStyles-img-122" alt />

      <div class="makeStyles-summary-120 flex-center-between">
        <div class="flex-center--ver">
          <p>
            <b>{{ nRight }}</b
            >&nbsp;Right
          </p>
          &nbsp;
          <CorrectCheckMark />
          <p>
            &nbsp;-&nbsp;<b>{{ nWrong }}</b
            >&nbsp;&nbsp;Wrong
          </p>
          &nbsp;
          <WrongCheckMark />
        </div>
        <br />
      </div>
      <div class="makeStyles-result-123 flex-center--ver mt-4">
        <Coin /> Current number of coins:
        <h3>{{ coin }}</h3>
      </div>
      <br />
      <div class="mt-10 flex awe34fg">
        <Button
          text="RETURN"
          color="var(--text-color)"
          bgcolor="grey"
          @click="$router.back()"
        />
        <Button text="PLAY AGAIN" color="#fff" @click="handleReplay" />
      </div>
    </div>
    <div class="__modal_wrapper" v-if="open">
      <WordDetailModal :item="modalData" @close-modal="toggleModal" />
    </div>
    <br />
  </div>
</template>
<script>
import QuestionMark from "./game-icons/QuestionMark.vue";
import CorrectCheckMark from "./game-icons/CorrectCheckMark.vue";
import WrongCheckMark from "./game-icons/WrongCheck.vue";
import QuestionMarkInfo from "./game-icons/QuestionMarkInfo.vue";
import Speaker2Icon from "./game-icons/Speaker2.vue";
import SplitWord from "@/components/PlayGames/WordMatch/SplitWord.vue";
import puzzle from "@/assets/resources/icons/games/word-match.png";
import incorrectAudio from "@/assets/resources/audios/incorrect.mp3";
import correctAudio from "@/assets/resources/audios/correct.mp3";
import cup from "@/assets/resources/icons/others/cup.png";
import Button from "@/components/Button.vue";
import Coin from "./game-icons/Coin.vue";
import { COINS, MAX, ROUTES } from "@/constants/index";
import { HIGHSCORE_NAME } from "@/constants/game";
import { onPlayAudio, playSoundAnswer } from "@/helper/speakerHelper.js";
import WordDetailModal from "@/components/UIx/WordDetailModal/index.vue";
import wordApi from '@/apis/wordApi.js'
export default {
  name: "WordMatchGameMain",
  props: {
    list: Array,
  },
  created() {
    this.current = this.list[0];
    this.word = this.current?.word.toLowerCase();
    this.originSplit = this.splitWord(this.word.toLowerCase());
    this.modalData = this.fetchDataForWord(this.word)
  },
  data() {
    return {
      current: null,
      word: null,
      originSplit: [],
      isDelay: false,
      isCheck: false,
      isDone: false,
      usrSplitVal: [],
      onCorrect: false,
      onWrong: false,
      puzzleImg: puzzle,
      cupImg: cup,
      status: "",
      next: 0,
      step: 0,
      nWrong: 0,
      nRight: 0,
      coin: 0,
      open: false,
      modalData:{}
    };
  },
  watch: {
    isCheck: function () {
      if (this.isCheck) {
        const corrAudio = new Audio(correctAudio);
        const incorrAudio = new Audio(incorrectAudio);
        //console.log(this.usrSplitVal)
        const uw = this.usrSplitVal
          .map((u) => u.ch)
          .toString()
          .replace(/,/g, "");
        const or = this.word;
        this.step = this.step + 1;
        this.fetchDataForWord(this.word)
        //proceed to mark
        if (uw === or) {
          this.status = "Right";
          this.nRight = this.nRight + 1;
          corrAudio.play();
          if (this.list[this.step]) {
            this.resetOnChange();
          } else {
            this.isDone = true;
          }
        } else {
          this.status = "Wrong";
          this.nWrong = this.nWrong + 1;
          if (this.list[this.step]) {
            this.resetOnChange();
            incorrAudio.play();
          } else {
            this.isDone = true;
          }
        } //set isCheck = false
      }
    },
    isDone: function () {
      if (this.isDone) {
        //show scores ui
        this.step = 0;

        this.coin = this.convertQuesToCoin(this.nRight, this.nWrong, this.coin);
      }
    },
    word:function (params) {
      this.fetchDataForWord(this.word)
    }
  },
  methods: {
    async fetchDataForWord(word) {
      let isSub = true;

      if (isSub) {
        try {
          const apiRes = await wordApi.getWordDetails(word);
          if (apiRes.status === 200 && isSub) {
            this.modalData = apiRes.data;
            console.log(apiRes.data);
          }
        } catch (error) {
          //isSub && setModal({ show: false, loading: false, data: null });
          isSub = false;
        }
      }
      isSub = false;
    },
    toggleModal() {
      if(!open){
        this.fetchDataForWord(this.word)
        this.open = !this.open;
      }else{
        this.open = !this.open;
      }
      
    },
    speakWord() {
      playSoundAnswer(this.word);
    },
    handleReplay() {
      this.isCheck = false;
      this.isDone = false;
      this.status = "";
      this.next = 0;
      this.nRight = 0;
      this.nWrong = 0;
      this.current = this.list[0];
      this.word = this.current?.word.toLowerCase();
      this.usrSplitVal = [];
      this.originSplit = this.splitWord(this.word.toLowerCase());
    },
    convertQuesToCoin(nRight = 0, nWrong = 0, currentCoin = 0) {
      const newCoin =
        nRight * COINS.CORRECT_GAME_PER_QUES -
        nWrong * COINS.CORRECT_GAME_PER_QUES +
        currentCoin;

      if (newCoin < 0) {
        return 0;
      }
      if (newCoin > MAX.USER_COIN) {
        return MAX.USER_COIN;
      }
      return newCoin;
    },
    resetOnChange() {
      const curr = this.list[this.step];
      this.isCheck = false;
      this.current = { ...curr };
      this.status = "";
      this.next = this.next + 1;
      this.word = curr.word.toLowerCase();
      this.originSplit = this.splitWord(curr.word.toLowerCase());
      this.usrSplitVal = [];
      this.fetchDataForWord(this.word)

      console.log(this.originSplit, this.word, curr);
    },
    handleNext() {
      const failAudio = new Audio(incorrectAudio);
      failAudio.play();
      this.fetchDataForWord(this.word)

      this.isCheck = true;
    },
    handleIsCheck(bool) {
      this.isCheck = true;
    },
    onUserSplitWordPick(curr) {
      this.usrSplitVal = curr;
      //disable key index

      //console.log(curr);
    },
    splitWord(word = "") {
      let splitArr = [];
      let failFlag = 1;
      while (failFlag) {
        // Prevent infinite loop
        if (failFlag >= 50) {
          break;
        }
        splitArr = word.split("").sort(() => Math.random() - 0.5);

        if (splitArr.join("") === word) {
          failFlag++;
        } else {
          failFlag = 0;
          break;
        }
      }
      return splitArr;
    },
    checkRightWrong(letter, index) {
      const res = letter === this.word.split("")[index];
      //console.log(letter, this.word.split("")[index]);
      if (this.isCheck) {
        if (res) {
          return "makeStyles-char-58 right";
        } else {
          return "makeStyles-char-58 wrong";
        }
      }
      return "makeStyles-char-58";
    },
  },
  components: {
    QuestionMark,
    CorrectCheckMark,
    WrongCheckMark,
    QuestionMarkInfo,
    Speaker2Icon,
    SplitWord,
    puzzle,
    Button,
    Coin,
    WordDetailModal,
  },
};
</script>
<style lang="scss">
.makeStyles-result-123 {
  color: var(--label-color);
  font-size: 1.2rem;
}
.awe34fg {
  :first-child {
    margin-right: 0.5rem;
  }
}
.makeStyles-split-57 {
  margin: 0 auto;
  max-width: 767px;
}
.h-100vh {
  height: 100vh;
}
.wmgame-container {
  width: 100%;
}
.makeStyles-mean-125 {
  color: var(--text-color);
  font-size: 1.6rem;
  font-weight: 400;
}
.flex-center-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media (min-width: 576px) {
  .makeStyles-root-119 {
    height: 85%;
    grid-row-gap: 1.2rem;
  }
}

.makeStyles-root-119 {
  height: 100%;
  display: grid;
  grid-row-gap: 0.8rem;
  grid-template-rows: 2fr 1fr 17fr;
  grid-template-columns: 1fr;
}
@media only screen and (min-width: 576px) {
  .english-game-box {
    background-color: var(--bg-color-sec);
    padding: 2.4rem 3.6rem;
    box-shadow: 0px 5px 18px 1px rgba(17, 17, 17, 0.1);
    border-radius: 8px;
  }
}
@media only screen and (min-width: 576px) {
  .english-game-title {
    font-size: 2.8rem;
    margin-top: 0;
  }
}
.english-game-title {
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: solid 1px var(--border-color);
  svg {
    min-width: 1.7rem;
    min-height: 1.7rem;
  }
}
.english-game-title img {
  width: 3.5rem;
  height: 3.6rem;
}
.english-game-title h1 {
  color: var(--title-color);
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: 0.8rem;
  text-transform: uppercase;
}
.makeStyles-summary-120 {
  margin: 1.4rem 0;
  color: var(--label-color);
  font-size: 1.2rem;
  font-weight: 400;
  b {
    font-weight: 500;
  }
}

.flex-center-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.makeStyles-root-122 {
  gap: 0.8rem;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr;
}
.makeStyles-split-127 {
  margin: 0 auto;
  max-width: 767px;
}

.makeStyles-split-127 {
  margin: 0 -0.6rem;
  padding: 0.8rem;
  flex-wrap: wrap;
  align-content: center;
}
</style>
