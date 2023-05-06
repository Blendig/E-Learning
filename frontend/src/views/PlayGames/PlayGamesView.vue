<template>
  <div>
    <Header></Header>
  </div>
  <div class="md-container">
    <PageTitle title="Games"/>
  <div class="topic-box-container">
    <div v-for="game in GAME_LIST" :key="game.id">
      <div>
        <TopicBox :to="game.to" :icon="game.imgUrl" :title="game.title" />  
    </div>
    </div>
  </div>
</div>
</template>
<script>
import Header from "../../components/Header.vue";
import brainIcon from "@/assets/resources/icons/games/brain.png";
import correctWordIcon from "@/assets/resources/icons/games/correct-word.png";
import medalIcon from "@/assets/resources/icons/medal.png";
import jigsawIcon from "@/assets/resources/icons/games/jigsaw.png";
import millionaireIcon from "@/assets/resources/icons/games/millionaire.png";
import wordMatchingIcon from "@/assets/resources/icons/games/word-match.png";
import { ROUTES } from "../../constants/index";
import TopicBox from "../../components/TopicBox/index.vue";
import PageTitle from "../../components/PageTitle.vue";
import  VModal from '../../components/Modal/index.vue'

export default {
  name: "PlayGamesView",
  components: {
    Header,
    TopicBox,
    PageTitle,
    VModal
  },
  data() {
    return {
      GAME_LIST: [
        {
          title: "Choose the correct word",
          subTitle:
            "Review vocabulary by choosing 1 best answer out of 4 with the meaning matching the given word",
          imgUrl: correctWordIcon,
          to: ROUTES.GAMES_CORRECT_WORD,
        },
        {
          title: "Word match",
          subTitle:
            "Match the given characters into a word that has the correct meaning for the given word",
          imgUrl: wordMatchingIcon,
          to: ROUTES.GAMES_WORD_MATCHING,
        },
        {
          title: "Hands are faster than brains",
          subTitle:
            "Choose an image that matches the given word in the fastest time",
          imgUrl: brainIcon,
          to: ROUTES.GAMES_FAST_GAME,
        },
        {
          title: "Charts",
          subTitle:
            "See the rankings of games and top users with the most coins",
          imgUrl: medalIcon,
          to: ROUTES.LEADERBOARD,
        },
      ],
    };
  },
};
</script>
<style lang="css">
.topic-box-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto;
  margin: 1.5rem 0;
}
</style>