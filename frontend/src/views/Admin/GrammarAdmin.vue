<template>
  <div class="admin-container">
    <div class="admin-container-chd">
      <div class="admin-container-chd english-container">
        <div class="toolbar-wrap flex">
          <h1 class="toolbar-title">Grammar management</h1>
          <div class="toolbar-icon-box">
            <div>
              <button @click="goto('/admin/grammar/add')"><AddIcon /></button>
            </div>
            <div>
              <button><CogIcon /></button>
            </div>
          </div>
        </div>
        <div class="english-break"></div>
        <div>
          <div class="makeStyles-root-194 w-100 position-rel">
            <input
              placeholder="Search..."
              class="input-search w-100 h-100"
              type="search"
              v-model="form.query"
              @keyup="onChange"
            />
          </div>
          <div class="makeStyles-listWrap-230">
            <ul class="makeStyles-list-231" v-if="list.length === 0">
              <h3 class="notfound-title">No result</h3>
            </ul>
            <GrammarAdminData :list="list" @remove-grammar-item="delItem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CogIcon from "@/assets/svgs/cog.vue";
import AddIcon from "@/assets/svgs/Add.vue";
import GrammarAdminData from "@/components/GrammarAdmin/data.vue";
import grammarApi from "@/apis/grammarApi.js";
import listeningApi from "../../apis/listeningApi";
import { debounce } from "@/helper/index.js";

export default {
  name: "GrammarAdmin",
  created() {
    this.fetchData();
  },

  data() {
    return {
      list: [],
      loading: false,
      page: 1,
      sortType: "Newest",
      packInfo: {
        level: "All",
      },
      loading: true,
      grammar: [],
      more: true,
      isFirstLoad: true,
      totalPage: 0,
      preSearchList: [],
      form: { query: "" },
      delayTimer: null,
    };
  },

  methods: {
  
    async onChange(e) {
      this.delayTimer = debounce(
        this.delayTimer,
        () => {
          const { value } = e.target;
          this.onSearchWord(this.form.query);
        },
        750
      );
    },
    delItem(item) {
      console.log(item);
      let arr = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i]._id !== item) {
          arr.push(this.list[i]);
        }
      }
      this.list = arr;
    },
    goto(url) {
      this.$router.push(url);
    },
    async fetchData() {
      let isSub = true;
      try {
        this.loading = true;
        let apiRes = null;
        if (this.packInfo.level === "All") {
          apiRes = await grammarApi.getAllGrammar();
        } else {
          apiRes = await grammarApi.getGrammarByLevel(this.packInfo.level);
        }
        if (apiRes && isSub) {
          const newList = apiRes.data.grammars.filter((item) => {
            return item.isLocked === 0;
          });
          this.preSearchList = newList;
          this.list = newList;
          console.log(newList, apiRes.data);
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
    async onSearchWord(title) {
      console.log(title);
      try {
        if (title === "") {
          this.list = this.preSearchList;
          this.more = true;
          return;
        }
        const apiRes = await grammarApi.searchGrammar(title);
        console.log(apiRes.data);
        if (apiRes.status === 200) {
          this.list = apiRes.data;
          this.more = false;
        }
      } catch (error) {
        throw error;
      }
    },
  },
  components: {
    CogIcon,
    AddIcon,
    GrammarAdminData,
  },
};
</script>
<style type="text/css">
</style>