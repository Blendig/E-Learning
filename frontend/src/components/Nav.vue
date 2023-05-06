<template>
  <div class="nav-container">
    <div class="nav-logo-box">
      <RouterLink to="/home">
        <img src="../assets/resources/images/logo2.png" alt="" />

      </RouterLink>
    </div>
    <div style="height:94px">
      <ul class="nav-ul" v-if=" !this.$route.path.split('/').includes('admin') ">
        <li v-for="link in links" :key="`${link.name}`">
          <div>
            <RouterLink :to="`${link.path}`" class="nav-link-items">
              {{ link.name }}
            </RouterLink>
          </div>
        </li>
      </ul>
    </div>
    <!-- if logged in display -->
    <div
      v-if="isLoggedIn"
      class="nav-cta-btn-wrapper-profile"
      role="button"
      @click="toggleMenu"
    >
      <!-- profile picture -->
      <div class="cta-menu flex align-items-center">
        <img
          :src="this.$store.getters.StateUser.avatar"
          alt="avatar"
          height="48px"
        />
        <div class="nav-user-name">
          {{ this.$store.getters.StateUser.name }}
        </div>
      </div>
      <Menu :show="show" :isLoggedIn="isLoggedIn" />
    </div>
    <!-- else not logged in -->
    <div v-else class="nav-cta-btn-wrapper">
      <div id="n-c-fc">
        <RouterLink to="/register">
          <Button text="REGISTER" color="#fff" />
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/login">
          <Button text="LOGIN" color="#fff" />
        </RouterLink>
      </div>
    </div>
    <!-- <Settings @open-settings="openSettings" v-if="open"/> -->
  </div>
  
</template>

<script>
import Button from "../components/Button.vue";
import Menu from "../components/Navigation/Menu/index.vue";
import Settings from '@/components/Navigation/Settings/index.vue'

export default {
  name: "Nav",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  data() {
    return {
      open:false,
      links: [
        { name: "Listening", path: "/listening/topic" },
        { name: "Grammar", path: "/grammar/level" },
        { name: "Vocabulary", path: "/word" },
        { name: "Pronounciation", path: "/ipa" },
        { name: "Blog", path: "/blogs" },
        { name: "Games", path: "/games" },
      ],
      show: false,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
    toggleMenu() {
      this.show = !this.show;
    },
    openSettings(){
      this.open=!this.open
      console.log('called');
    },
  },
  components: {
    Button,
    Menu,
    Settings
  },
};
</script>

<style scoped>
.cta-menu:hover {
  cursor: pointer;
}
.nav-ul {
  list-style: none;
  font-weight: 700 !important;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 1rem;
}
li {
  margin: 1rem 0.7rem;
}
img {
  height: 3rem;
  width: auto;
}
.nav-container {
  display: flex;
  justify-content: space-between;
}
.nav-cta-btn-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}
.nav-cta-btn-wrapper-profile {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
}
#n-c-fc {
  margin-right: 1rem;
}
.nav-link-items {
  color: var(--primary-color);
  font-weight: bold;
}
.nav-logo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}
.nav-user-name {
   color: var(--text-color);
  font-weight: bold;
  font-size: 1.2rem;
}
</style>