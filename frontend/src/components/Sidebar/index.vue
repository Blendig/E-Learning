<template>
  <div>
    <div class="sb1-container">
      <div class="sb1-sidebar">
        <div
          v-for="feature in FEATURE_LIST"
          :key="feature.title"
          class="sb1-root"
        >
          <NavigationAdminBox
            key="index"
            :imgUrl="feature.imgUrl"
            :title="feature.title"
            :to="feature.to"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import communicateIcon from "@/assets/resources/icons/communicate.png";
import dictionaryIcon from "@/assets/resources/icons/dictionary.png";
import editIcon from "@/assets/resources/icons/edit.png";
import favoriteIcon from "@/assets/resources/icons/favorite.png";
import flashcardIcon from "@/assets/resources/icons/flashcard.png";
import friendsIcon from "@/assets/resources/icons/friends.png";
import gameIcon from "@/assets/resources/icons/game.png";
import grammarIcon from "@/assets/resources/icons/grammar.png";
import ipaIcon from "@/assets/resources/icons/ipa.png";
import toeicIcon from "@/assets/resources/icons/toeic.png";
import verbIcon from "@/assets/resources/icons/verb.png";
import medalIcon from "@/assets/resources/icons/medal.png";
import othersIcon from "@/assets/resources/icons/topics/others.png";
import NavigationAdminBox from "../NavigationAdminBox.vue";
import { ROUTES } from "@/constants/index.js";

export default {
  name: "Sidebar",
  data() {
    return {
      FEATURE_LIST: [
        {
          title: "Word",
          subTitle: "Manage all vocabulary in the system",
          imgUrl: flashcardIcon,
          to: ROUTES.WORD_ADMIN,
        },
        {
          title: "Listening",
          subTitle: "Manage all listening tracks in the system",
          imgUrl: communicateIcon,
          to: ROUTES.LISTENING_ADMIN,
        },
        {
          title: "Quiz",
          subTitle: "Manage quizzes in the listening section",
          imgUrl: toeicIcon,
          to: ROUTES.QUIZ_ADMIN,
        },
        {
          title: "Grammar",
          imgUrl: grammarIcon,
          subTitle: "Manage all grammar in the system",
          to: ROUTES.GRAMMAR_ADMIN,
        },
        {
          title: "Users",
          imgUrl: friendsIcon,
          subTitle: "Manage all user accounts in the system",
          to: ROUTES.USER_ADMIN,
        },
        {
          title: "Blogs",
          imgUrl: othersIcon,
          subTitle: "Manage all blogs in the system",
          to: ROUTES.BLOG_ADMIN,
        },
        //---EXTRAS-----
        /*{
    title: "Announcement",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.ANNOUNCEMENTS_ADMIN,
  },
   {
    title: "Blog",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.BLOG_ADMIN,
  },
    {
    title: "Books",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.BOOKS,
  },
  {
    title: "Comments",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.COMMENTS,
  },
   {
    title: "Events",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.EVENTS,
  },
  {
    title: "FAQ",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.FAQ,
  },
  {
    title: "Forum",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.FORUM,
  },
  {
    title: "Jobs",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.JOBS,
  },
  {
    title: "Notes",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.NOTES,
  },
    {
    title: "Podcast",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.PODCAST,
  },
  {
    title: "Stories",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.STORIES,
  },
    {
    title: "Word Of the Day",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.WORDOFTHEDAY,
  }*/
      ],
    };
  },
  components: {
    NavigationAdminBox,
  },
};
</script>
<style lang="css">
.sb1-container {
  width: 100%;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: auto;
  margin-left: auto;
}
.sb1-sidebar {
  margin-top: 1.5rem;
  top: 72px;
  left: 0;
  z-index: 999;
  position: fixed;
  min-height: 100vh;
  background-color: var(--bg-color-accent);
  min-width: 250px;
}
.sb1-root {
  border: 3px solid #eee;
  cursor: pointer;
  padding: 1rem;
  transition: all 0.25s;
  border-radius: var(--sm-border-radius);
  background-color: var(--bg-color-accent);
}
.flex-cent--ver {
  display: flex;
  align-items: center;
}
</style>
