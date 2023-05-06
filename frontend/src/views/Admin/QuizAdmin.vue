<template>
  <div class="admin-container">
    <div class="admin-container-chd">
      <div class="admin-container-chd english-container">
        <div class="toolbar-wrap flex">
          <h1 class="toolbar-title">Manage quiz</h1>
          <div class="toolbar-icon-box">
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
            <ul class="makeStyles-list-231" v-if="listen.length === 0">
              <h3 class="notfound-title">List not found</h3>
            </ul>
            <QuizAdminData v-else :listen="listen" :grammar="grammar" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <SortModal :open="open" @close-modal="popSortModal" @sort-by="setSort" />
  </div>
</template>
<script >
import CogIcon from "@/assets/svgs/cog.vue";
import QuizAdminData from "@/components/QuizAdmin/data.vue";
import quizApi from "@/apis/quizApi.js";
import grammarApi from "@/apis/grammarApi.js";
import listeningApi from "../../apis/listeningApi";
import AutoSearchInput from "@/components/UIx/AutoSearchInput/index.vue";
import SortModal from "@/components/QuizAdmin/SortModal.vue";
export default {
  name: "QuizAdmin",
  created() {
    this.fetchData();
  },
  data() {
    return {
      listen: [],
      page: 1,
      sortType: "Newest",
      packInfo: {
        type: "All",
      },
      loading: true,
      grammar: [],
      more: true,
      isFirstLoad: true,
      totalPage: 0,
      preSearchList: [],
      open: false,
      allData: {},
    };
  },
  methods: {
    setSort(k) {
      console.log(k);
      this.packInfo.type = k;
      if (k === "Grammar") {
        //this.listen = [];
        this.grammar = this.allData.grammar;
      } else if (k === "Listen") {
        this.grammar = [];
        this.listen = this.allData.listen;
      } else {
        this.grammar = this.allData.grammar;
        this.listen = this.allData.listen;
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
      let isSub = true;
      try {
        this.loading = true;
        let apiRes = null;
        if (this.packInfo.type === "All") {
          apiRes = await quizApi.getAllListenAndGrammar();
        } else {
          console.log(this.packInfo);
          if (this.packInfo.type === "Listen") {
            apiRes = await listeningApi.getAllListen("Newest");
          } else {
            apiRes = await grammarApi.getAllGrammar();
          }
        }
        // const apiRes = await quizApi.getAllListenAndGrammar();
        if (apiRes.status === 200 && isSub) {
          if (apiRes.data.listens) {
            this.listen = apiRes.data.listens;
            this.preSearchList = apiRes.data.listens;
            this.allData["listen"] = apiRes.data.listens;
          }
          if (apiRes.data.grammars) {
            this.grammar = apiRes.data.grammars;
            this.allData["grammar"] = apiRes.data.grammars;
          }
        }
      } catch (error) {
      } finally {
        if (isSub) {
          this.loading = false;
          this.isFirstLoad && (this.isFirstLoad = false);
        }
      }
    },
  },
  components: {
    CogIcon,
    QuizAdminData,
    AutoSearchInput,
    SortModal,
  },
};
</script>
<style type="text/css">
</style>