<template lang="">
    <div>
        
    </div>
</template>
<script>
import { COINS, MAX, ROUTES } from "@/constants/index";
import { HIGHSCORE_NAME } from "@/constants/game";
import { onPlayAudio } from "@/helper/speakerHelper";
import winAudioSrc from "assets/audios/win.mp3";
import cupIcon from "@/assets/resources/icons/others/cup.png";
import userApi from "@/apis/userApi";
import highScoreApi from "@/apis/highScoreApi";

export default {
  name: "CorrectWordResult",
  props: {
    nRight:0,
    nWrong:0,
    nameGame:'',
    onReplay:function(){},
  },
  data() {
    return {
      coinCurrent: null,
      isAuth: null,
      coin: "",
    };
  },
  methods: {
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
    async useEffect() {
      const userInfo = await userApi.getUserInfo();
      const newCoin = convertQuesToCoin(
        nRight,
        nWrong,
        userInfo.data.user.coin
      );

      console.log(userInfo.data.user.coin);

      this.coinCurrent = newCoin;
      const apiRes = await userApi.putUpdateUserCoin(newCoin);
      highScoreApi.postScore(nameGame, nRight);
    },
  },
};
</script>
<style lang="">
</style>