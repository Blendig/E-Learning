<template>
  <div class="admin-container">
    <div class="admin-container-chd">
      <div class="admin-container-chd english-container">
        <div class="toolbar-wrap flex">
          <h1 class="toolbar-title">Manage listening lessons</h1>
          <div class="toolbar-icon-box">
            <div>
              <button @click="goto('/admin/listening/add')"><AddIcon /></button>
            </div>
            <div>
              <button><SortIcon /></button>
            </div>
            <div>
              <button @click="popSortModal"><CogIcon /></button>
            </div>
          </div>
        </div>
        <div class="english-break"></div>
        <div>
          <div class="makeStyles-root-194 w-100 position-rel">
            <AutoSearchInput :onSearch="onSearchWord" />
          </div>
          <div class="makeStyles-listWrap-230">
            <ul class="makeStyles-list-231">
              <h3
                class="notfound-title"
                v-if="listen.length === 0 && loading === false"
              >
                No words found in dictionary
              </h3>
              <ListeningAdminData
                :list="listen"
                @delete-listen-item="deleteListenItem"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <ListeningSortModal
      :open="open"
      @close-modal="popSortModal"
      @sort-by="setSort"
    />
  </div>
</template>
<script>
import CogIcon from "@/assets/svgs/cog.vue";
import AddIcon from "@/assets/svgs/Add.vue";
import WordIcon from "@/assets/svgs/Word.vue";
import SortIcon from "@/assets/svgs/Sort.vue";
import listeningApi from "@/apis/listeningApi.js";
import ListeningAdminData from "@/components/ListeningAdmin/data.vue";
import AutoSearchInput from "@/components/UIx/AutoSearchInput/index.vue";
import ListeningSortModal from "@/components/ListeningAdmin/ListeningSortModal.vue";

export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      page: 1,
      listen: [],
      more: true,
      isFirstLoad: true,
      totalPage: 0,
      preSearchList: [],
      loading: false,
      packInfo: {
        topic: "All",
      },
      sortType: "Newest",
      open: false,
    };
  },
  methods: {
    setSort(k) {
      console.log(k);
      if (k === "All") {
        this.listen=this.preSearchList
       
      }else{
       
        let tmp = this.preSearchList.filter((f) => f.Topic === k);
        this.listen = tmp;
      }
      this.popSortModal();
    },
    popSortModal() {
      this.open = !this.open;
    },
    async onSearchWord(title) {
      console.log(title);
      try {
        if (title === "") {
          console.log("if block");
          this.listen = this.preSearchList;
          this.more = true;
          return;
        } else {
          console.log("else block");
          const apiRes = await listeningApi.searchListen(title);
          console.log(apiRes.data);
          if (apiRes.status === 200) {
            this.listen = apiRes.data.listens;
            this.more = false;
          }
        }
      } catch (error) {
        throw error;
      }
    },
    goto(url) {
      this.$router.push(url);
    },
    async fetchData() {
      console.log("fetching data ...");
      let isSub = true;
      try {
        this.loading = true;
        let apiRes = null;
        if (this.packInfo.topic === "All") {
          apiRes = await listeningApi.getAllListen(this.sortType);
        } else {
          apiRes = await listeningApi.getListenByTopic(
            this.packInfo.topic,
            this.sortType
          );
        }
        if (apiRes && isSub) {
          const newList = apiRes.data.listens.filter((item) => {
            return item.isLocked === 0;
          });
          this.preSearchList = newList;
          this.listen = newList;
          console.log(newList);
        }
      } catch (error) {
        throw error;
      } finally {
        if (isSub) {
          this.loading = false;
          this.isFirstLoad && (this.isFirstLoad = false);
        }
      }
    },
    async deleteListenItem(id) {
      console.log(id);
      if (window.confirm("Are you sure you want to delete this post?")) {
        // dispatch(deleteListen(id));
        //dispatch(setMessage("Delete successfully", "success"));
        //history.replace(ROUTES.LISTENING_ADMIN);
        try {
          const response = await listeningApi.deleteListen(id);
          if (response.status === 200) {
            window.location.reload();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          alert(error.response.message);
        }
      }
    },
  },
  components: {
    CogIcon,
    AddIcon,
    WordIcon,
    SortIcon,
    ListeningAdminData,
    AutoSearchInput,
    ListeningSortModal,
  },
};
</script>
<style type="text/css">
</style>