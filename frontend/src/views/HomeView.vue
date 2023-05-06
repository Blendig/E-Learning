<template>
  <main>
    <Header />
    <Banner image="../assets/resources/images/background.jpg" />
    <div class="c-header">
      <h1>You Can Learn English For Free!</h1>
      <h3>Skill Group</h3>
    </div>
    <div class="home-items-container">
      <div>
        <div class="flex">
          <div class="c-wrapper">
            <div
              class="c-box flex justify-content-center flex-direction-column align-items-center"
            >
              <div
                class="c-icon-box flex justify-content-center flex-direction-column align-items-center"
              >
                <RouterLink :to="ROUTES.LISTENING_TOPICS">
                <Windows/>
                </RouterLink>
              </div>

              <RouterLink :to="ROUTES.LISTENING_TOPICS">
                <h2>Listening</h2>
              </RouterLink>

              <p>Listening videos and answer the questions.</p>
            </div>
          </div>
          <!-- grammar -->
          <div class="c-wrapper">
            <div
              class="c-box flex justify-content-center flex-direction-column align-items-center"
            >
              <div
                class="c-icon-box flex justify-content-center flex-direction-column align-items-center"
              >
                <RouterLink :to="ROUTES.GRAMMAR_LEVELS">
                <TeaCupVue/>
                </RouterLink>
              </div>

              <RouterLink :to="ROUTES.GRAMMAR_LEVELS">
                <h2>Grammar</h2>
              </RouterLink>

              <p>Our guide to English grammar.</p>
            </div>
          </div>
         
      <!-- vocabulary -->
      <div class="c-wrapper">
            <div
              class="c-box flex justify-content-center flex-direction-column align-items-center"
            >
              <div
                class="c-icon-box flex justify-content-center flex-direction-column align-items-center"
              >
                <RouterLink :to="ROUTES.WORD_TOPIC">
                <HomeComputer/>
                </RouterLink>
              </div>

              <RouterLink :to="ROUTES.WORD_TOPIC">
                <h2>Vocabulary</h2>
              </RouterLink>

              <p>Learn English vocabulary by topic</p>
            </div>
          </div>
         <!-- pronounciation -->
         <div class="c-wrapper">
            <div
              class="c-box flex justify-content-center flex-direction-column align-items-center"
            >
              <div
                class="c-icon-box flex justify-content-center flex-direction-column align-items-center"
              >
                <RouterLink :to="ROUTES.IPA_LIST">
                <Stack/>
                </RouterLink>
              </div>

              <RouterLink :to="ROUTES.IPA_LIST">
                <h2>Pronunciation</h2>
              </RouterLink>

              <p>ricky English pronunciation. With listening practice.</p>
            </div>
          </div>
         
        </div>
      </div>
      <div class="t-group">
        <h3>Tool Group</h3>
        <div class="flex">
          <SkillCard
            :path="ROUTES.TEST"
            title="Test"
            icon=""
            detail="Practice test to review yourself."
          />
          <SkillCard
            :path="ROUTES.GAMES_HOME"
            title="Play Games"
            icon=""
            detail="Play games to review your vocabulary."
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from "../components/Header.vue";
import Banner from "../components/Banner.vue";
import SkillCard from "../components/SkillCard.vue";
import { ROUTES } from "@/constants/index";
import HomeComputer from "../assets/svgs/HomeComputer.vue";
import TeaCupVue from "../assets/svgs/TeaCup.vue";
import Windows from "../assets/svgs/Windows.vue";
import Stack from "../assets/svgs/Stack.vue";
export default {
  name: "HomeView",
  data() {
    return {
      ROUTES: ROUTES,
      windowsIcon: Windows,
      teacupIcon: TeaCupVue,
      stackIcon: Stack,
      homeComputerIcon: HomeComputer,
    };
  },
  components: {
    Header,
    Banner,
    SkillCard,
    HomeComputer,
    TeaCupVue,
    Windows,
    Stack,
  },
};
</script>

<style>
.home-items-container {
  width: 960px;
  margin: auto;
}
.c-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2.5;
}
.c-header h1 {
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: bolder;
}
.c-header h3 {
  font-weight: bolder;
}
.t-group {
  text-align: center;
}
.t-group h3 {
  font-weight: bolder;
}

.c-wrapper {
  margin: 7rem 0.5rem 5rem 0;
  width: calc(960px / 4);
  background-color: #fff;
  height: 16rem;
  border: 1px solid #ddd;
  padding: 0 2rem;
}
.c-box {
  text-align: center;
}
.c-wrapper h2 {
  color: var(--vt-c-black);
}
.c-wrapper p {
  color: var(--vt-c-text-light-2);
  margin-top: 1rem;
}

.c-icon-box {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin-top: -3rem;
  margin-bottom: 3rem;
}
</style>
