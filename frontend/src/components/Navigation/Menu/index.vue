<template>
  <div v-if="show" class="dropdown">
    <div class="dropdown-content">
      <ul v-if="isLoggedIn && this.$route.path.split('/').includes('admin')">
        <li v-for="item in menuAdmin" :key="item.name">
          <div>
            <div>
              <!-- icon -->
            </div>
            <h3>
              <div
                role="button"
                class="settings-btn-menu"
                v-if="item?.isModal"
                @click="toggleSettings"
              >
                <p>{{ item.name }}</p>
              </div>
              <RouterLink :to="item.path" v-else>
                <p>{{ item.name }}</p>
              </RouterLink>
            </h3>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li v-for="item in menuUser" :key="item.name">
          <div>
            <div>
              <!-- icon -->
            </div>
            <h3>
             <div
                role="button"
                class="settings-btn-menu"
                v-if="item?.isModal"
                @click="toggleSettings"
              >
                <p>{{ item.name }}</p>
              </div>
              <RouterLink :to="item.path" v-else>
                <p>{{ item.name }}</p>
              </RouterLink>
            </h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="open">
    <Settings @open-settings="openSettings"  />
  </div>
</template>
<script>
import Settings from "@/components/Navigation/Settings/index.vue";

export default {
  name: "Menu",
  props: {
    show: Boolean,
    isLoggedIn: Boolean,
  },
  data() {
    return {
      open: false,
      
      menuUser: [
        { name: "Personal Information", path: "/user/profile", icon: "" },
        { name: "Admin", path: "/admin", icon: "" },
        { name: "Settings", path: "#", icon: "", isModal: true },
        { name: "Logout", path: "/logout", icon: "" },
      ],
      menuAdmin: [
        { name: "Personal Information", path: "/admin/profile", icon: "" },
        { name: "Home Page", path: "/home", icon: "" },
        { name: "Settings", path: "#", icon: "", isModal: true },
        { name: "Logout", path: "/logout", icon: "" },
      ],
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
    toggleSettings() {
      this.open=!this.open
     // this.$emit("open-settings");
      console.log("emit");
    },
    openSettings() {
      console.log("emit",this.open);
      this.open=!this.open
     
    },
  },
  components: { Settings },
};
</script>
<style scoped>
.dropdown {
  position: absolute;
  display: inline-block;
  margin-right: 20rem;
  margin-top: 1rem;
}
.dropdown ul {
  list-style: none;
  line-height: 3;
  padding: 1rem;
}
.dropdown a {
  color: #fff;
  font-weight: 500;
}
.dropdown-content {
  display: block;
  position: absolute;
  min-width: 260px;
  padding: 12px 16px;
  z-index: 1;
  width: 15rem;
  box-shadow: var(--box-shadow);
  background-color: var(--bg-color-sec);
}
.settings-btn-menu {
  color: #fff;
  font-weight: 500;
  cursor: pointer;
}
</style>
