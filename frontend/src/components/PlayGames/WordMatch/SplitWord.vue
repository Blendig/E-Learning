<template>
  <section>
    
    <div class="makeStyles-split-57 flex-center">
      <div
        :class="[letterIsSelected(i)&&'makeStyles-char-58 disabled show-letter-vis'||'makeStyles-char-58']"
        role="button"
        v-for="(w, i) in originalWordArr"
        :key="i"
        @click="handleSelectCharacter(i)"
      >
        <span class="curr-letter-self">{{ w }}</span>

      </div>
    </div>
  </section>
</template>
<script>
import wordApi from "@/apis/wordApi.js";
//
export default {
  name: "SplitWord",
  computed: {
    
  },
  created() {
    this.useEffect();
  },
  props: {
    mean: String,
    //onCorrect: Function,
   // onWrong: Function,
    //resetFlag: Number,
    word: String,
    originalWordArr:Array
  },
  data() {
    return {
      userSplit: [],
      isCorrect: false,
     
    };
  },
watch: {
  word:function(){
    this.userSplit=[]
  }
},
  methods: {
    async useEffect() {
      let isSub = true;

      if (isSub) {
        try {
          const apiRes = await wordApi.getWordDetails(word);
          if (apiRes.status === 200 && isSub) {
           
            this.$emit('modal-data',apiRes.data)
          }
        } catch (error) {
          //isSub && setModal({ show: false, loading: false, data: null });
          isSub = false;
        }
      }
      isSub = false;
    },
    // reset when next or prev

    checkIsCorrect() {
      let isSub = true;

      if (!isCheck) {
        return;
      }

      const answer = userSplit.map((i) => i.ch).join("");
      if (answer.toLowerCase() === word.toLowerCase()) {
        isSub && setIsCorrect(true);
        onCorrect();
      } else {
        isSub && setIsCorrect(false);
        onWrong();
      }
    },
    //
    letterIsSelected(index){
      const cond = this.userSplit.findIndex((item) => index === item.index)
      const isSelected = cond !== -1
      return isSelected
    },
    handleSelectCharacter(index) {
      const newUserSplit = [
        ...this.userSplit,
        { index, ch: this.originalWordArr[index] },
      ];
      // setUserSplit(newUserSplit);
      this.userSplit = newUserSplit;
      //console.log(this.originalWordArr,this.userSplit)

      if (newUserSplit.length === this.word.length) {
        //setIsCheck(true);
       
        this.$emit('is-check',true)
      }
        this.$emit('set-user-split-word',newUserSplit)

      
    },
  },
};
</script>
<style lang="scss">
.show-letter-vis{
  :first-child{
    visibility: hidden;
  }
}
.curr-letter-self{

}
.makeStyles-split-57 {
  margin: 0 -0.6rem;
  padding: 0.8rem;
  flex-wrap: wrap;
  align-content: center;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.makeStyles-char-58 {
  color: var(--text-color);
  width: 2.5rem;
  cursor: pointer;
  height: 2.5rem;
  font-size: 1.3rem;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: all 0.25s;
  font-weight: 400;
  line-height: 4.2rem;
  border-radius: 4px;
  background-color: #00ffff;
  display: flex;
  align-items: center;
  justify-content: center;
  &.right{
    background-color: var(--right-color)!important;
    color:var(--text-color)
  }
  &.wrong{
    background-color: var(--error-color);
  }
}

.makeStyles-split-57 > * {
  margin: 0.3rem;
}
</style>
