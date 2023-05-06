<template lang="">
    <div>
        <div v-if='state===0'>
          <WordPack
          open='true'
          onChoose='getWordPackage'
          onCancel='() => history.goBack()'
          topicMultiples='true'
          title="Choose from a vocabulary pack"
          okBtnText="Begin"
          cancelBtnText="Come back"
          >
            <div class="input-container">
              <span>Number of sentences</span>
              <input 
              type='number'
               value='20' 
               min='5' 
               :max='MAX_LEN_WORD_PACK'
               placeholder="Enter the number of sentences"
               @change={handleWordChange}
               />
            </div>
          </WordPack>
        </div>
        <div v-if='state ===1'>
          <p>loading question pack ...</p>
        </div>
        <div v-else>
          <CorrectWord :list='wordPack'/>
        </div>
    </div>
</template>
<script>
import gameApi from "@/apis/gameApi";
import WordPack from "@/components/UIx/index.vue";

export default {
  name: "CorrectWordData",
  created() {
    const MAX_LEN_WORD_PACK = 500;
  },
  data() {
    return {
      nQuestion: 20,
      state: 0,
      wordPack: [],
    };
  },
  method: {
    handleWordChange(e){
      this.nQuestion.current = e.target.value
    },
    async getWordPackage({ type, topics, level, specialty }) {
      try {
        this.state = 1;
        const n =
          nQuestion.current < 0 || nQuestion.current > this.MAX_LEN_WORD_PACK
            ? 100
            : nQuestion.current;

        const apiRes = await gameApi.getWordPackCWG(
          type,
          level,
          specialty,
          topics,
          n
        );
        if (apiRes.status === 200) {
          const { wordPack = [] } = apiRes.data;
          if (wordPack.length === 0) {
            dispatch(
              setMessage({
                type: "warning",
                message:
                  "Sorry, the current vocabulary pack is not enough. Please try again",
                duration: 3000,
              })
            );
            this.state = 0;
            return;
          }
          this.wordPack = wordPack;
          this.state = 2;
          return;
        }

        dispatch(
          setMessage({
            type: "warning",
            message: "Get the vocabulary pack failed, try again!",
          })
        );
        this.state = 0;
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Get the vocabulary pack failed, try again!";
        dispatch(setMessage(message, "error"));
        this.state = 0;
      }
    },
  },
  components: {
    WordPack,
  },
};
</script>
<style lang="css">
</style>