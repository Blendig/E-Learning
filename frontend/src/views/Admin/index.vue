<template>
  <div>
   
    <div class="admin-container">
    <div class="admin-container-chd">
      <div class="grid-container">
         <div class="grid-item" v-for='feature in features' :key='feature.title'>
          <div class="grid-item-chd">
            <StatBox
            :title="feature.title"
            :icon="feature.icon"
            :count="feature.count"
          />
          </div>
        
        </div>
      
      </div>
    </div>
  </div>
  </div>
</template>
<script>
//import { ROUTES } from "../../constants/index.js";
import statisticsApi from "../../apis/statisticsApi.js";
import StatBox from "@/components/StatBox/index.vue";

import communicateIcon from "@/assets/resources/icons/communicate.png";
import flashcardIcon from "../../assets/resources/icons/flashcard.png";
import friendsIcon from "@/assets/resources/icons/friends.png";

import grammarIcon from "../../assets/resources/icons/grammar.png";
import toeicIcon from "../../assets/resources/icons/toeic.png";
export default {
  name: "AdminView",
  created() {
   this.fetchStats()
        
  },
  data() {
    return {
      count: {
        user: 0,
        word: 0,
        listen: 0,
        quiz: 0,
        grammar: 0,
      },
   features:[
        {
          title:'User',
          icon:friendsIcon,
          count:0
        },
         {
          title:'Vocabulary',
          icon:flashcardIcon,
          count:0
        },
         {
          title:'Listening',
          icon:communicateIcon,
          count:0
        },
         {
          title:'Quiz',
          icon:toeicIcon,
          count:0
        },
         {
          title:'Grammar',
          icon:grammarIcon,
          count:0
        }
        ]
        
    };
  },
  methods: {
    async fetchStats() {
    
      const numUsers = await statisticsApi.countUser();
      const numWords = await statisticsApi.countWord();
      const numListens = await statisticsApi.countListening();
      const numQuizzes = await statisticsApi.countQuiz();
      const numGrammars = await statisticsApi.countGrammar();
   
      this.count.user = numUsers.data.count;
      this.count.word = numWords.data.count;
      this.count.listen = numListens.data.count;
      this.count.quiz = numQuizzes.data.count;
      this.count.grammar = numGrammars.data.count;

      this.features[0]['count']=this.count.user;
      this.features[1]['count']=this.count.word
      this.features[2]['count']=this.count.listen
      this.features[3]['count']=this.count.quiz
      this.features[4]['count']=this.count.grammar
           

    },
  },
  components: {
    
    StatBox,
    
  },
};
</script>
<style lang="css">
.admin-container {
  max-width: 1140px;
/*  width:100vw;*/
margin-left:250px;
}
.grid-spacing-xs-3 {
  width: calc(100% + 24px);
  margin: -12px;
}

.grid-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: calc(100% + 24px);
  margin: -12px;
}
.grid-item {
  flex-grow: 0;
  max-width: 33.333333%;
  flex-basis: 33.333333%;
  padding:12px;
}
.grid-item-chd{
  cursor: pointer;
    height: 100%;
    padding: 1rem 1rem;
    box-shadow: var(--box-shadow-2);
    min-height: 7rem;
    transition: all 0.25s;
    border-radius: var(--sm-border-radius);
    background-color: var(--bg-color-accent);
    display:flex;
    align-items: center;

}
</style>