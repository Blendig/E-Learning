<template>
  <div class="admin-container">
    <div class="admin-container-chd">
      <div class="admin-container-chd english-container">
        <div class="toolbar-wrap flex">
          <h1 class="toolbar-title">User management</h1>
          <div class="toolbar-icon-box">
            <div>
              <button @click="goto('/admin/user/add')"><AddIcon /></button>
            </div>
          </div>
        </div>
        <div class="english-break"></div>
        <div>
          <div class="grid-container-x2">
            <div class="grid-item-x2" v-for="(item, i) in list" :key="i">
              <RouterLink
                :to="`/admin/user/detail/${item._id}`"
                class="grid-item-wrap-x2 flex-center--ver makeStyles-root-40"
              >
                <img :src="item.avatar" class="makeStyles-avatar-41" />
             
              <div>
                <h2 class="makeStyles-name-42">{{ item.name }}</h2>
                <h4 class="makeStyles-role-43">{{ item.roleType }}</h4>
                <p class="makeStyles-status-44">Status: {{ item.isLocked === 0 ? 'Work' : 'Locked' }}</p>
              </div>
            </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import AddIcon from "@/assets/svgs/Add.vue";
import userApi from "../../apis/userApi";

export default {
  name: "GrammarAdmin",
  created() {
    this.fetchAllusers();
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    async fetchAllusers() {
      try {
        const res = await userApi.getAllUsers();
        if (res && res.status === 200) {
          console.log(res.data);
          this.list = res.data;
        }
      } catch (error) {
        throw error;
      }
    },
   
  },
  components: {
    AddIcon,
  },
};
</script>
<style type="text/css">

.grid-container-x2 {
  width: calc(100% + 24px);
  margin: -12px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

}
.grid-item-x2 {
  flex-grow: 0;
  max-width: 50%;
  padding: 12px;
  flex-basis: 50%;
}
.grid-item-wrap-x2 {
  min-height: 10rem;
  padding: 2.4rem 1.8rem;
}
.makeStyles-avatar-41 {
  width: 6rem;
  border: 1px solid var(--primary-color);
  height: 6rem;
  margin-right: 1.7rem;
  border-radius: 50%;
}
.makeStyles-root-40 {
  cursor: pointer;
  height: 100%;
  padding: 1.8rem 1.2rem;
  box-shadow: var(--box-shadow-2);
  min-height: 8rem;
  transition: all 0.25s;
  border-radius: var(--sm-border-radius);
  background-color: var(--bg-color-accent);
}
.makeStyles-name-42 {
    color: var(--primary-color);
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.5px;
}
.makeStyles-role-43 {
    color: var(--label-color);
    display: block;
    font-size: 1rem;
    margin-top: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: capitalize;
}
.makeStyles-status-44 {
    font-size: 1rem;
    margin-top: 0.6rem;
    font-weight: 400;
    color:#fff;
}
.flex-center--ver {
    display: flex;
    align-items: center;
}
</style>