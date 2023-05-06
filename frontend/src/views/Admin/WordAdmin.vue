<template>
  <div>
    <div class="admin-container">
      <div class="admin-container-chd english-container">
        <div class="toolbar-wrap flex">
          <h1 class="toolbar-title">Vocabulary management</h1>
          <div class="toolbar-icon-box">
            <div>
              <button @click="goto('/admin/word/add')"><AddIcon /></button>
            </div>
            <div>
              <button><WordIcon /></button>
            </div>
            <div>
              <button><CogIcon /></button>
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
              <h3 class="notfound-title" v-if="list === 0 && loading === false">
                No words found in dictionary
              </h3>
              <li v-for="(item, i) in list" :key="i">
                <div>
                  <WordItem :item="item" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CogIcon from "@/assets/svgs/cog.vue";
import AddIcon from "@/assets/svgs/Add.vue";
import WordIcon from "@/assets/svgs/Word.vue";
import wordApi from "@/apis/wordApi.js";
import WordItem from "@/components/WordAdmin/WordItem/index.vue";
import PencilIcon from "@/assets/svgs/Pencil.vue";
import AutoSearchInput from "@/components/UIx/AutoSearchInput/index.vue";

export default {
  created() {
    this.fetchWordPackTotal();
    this.fetchWordPack();
  },
  data() {
    return {
      page: 1,
      sortType: "rand",
      packInfo: {
        type: "-1",
        level: "-1",
        specialty: "-1",
        topics: [],
      },
      loading: false,
      more: true,
      list: [],
      isFirstLoad: true,
      totalPage: 0,
      preSearchList: [],
    };
  },
  methods: {
    async onSearchWord(word) {
      console.log(word)
      try {
        if (word === "") {
          this.list = this.preSearchList
          this.more =true
          return;
        }else{

          const apiRes = await wordApi.searchWord(word);
        if (apiRes.status === 200) {
          const { packList = [] } = apiRes.data;
          this.list = packList
          this.more = false
          console.log( apiRes.data)
        }
        }

      } catch (error) {
        throw error
      }
    },
    goto(url) {
      this.$router.push(url);
    },
    async fetchWordPackTotal() {
      let isSub = true;
      try {
        const apiRes = await commonApi.getWordPackTotal(packInfo);
        if (apiRes && isSub) {
          const { total = 0 } = apiRes.data;
          totalPage.current = Math.ceil(total / perPage);
        }
      } catch (error) {}
    },
    async fetchWordPack() {
      let isSub = true;
      try {
        this.loading = true;
        const apiRes = await wordApi.getWordList(
          this.page,
          this.perPage,
          this.packInfo,
          this.sortType
        );
        if (apiRes && isSub) {
          const { packList = [] } = apiRes.data;
          const newList = [...this.list, ...packList];
          this.preSearchList =newList
          //preSearchList.current = newList;
          //setList(newList);
          console.log(newList);
          this.list = newList;
        }
      } catch (error) {
      } finally {
        if (isSub) {
          this.loading = false;
          this.FirstLoad && (this.isFirstLoad = false);
        }
      }
    },
  },
  components: {
    CogIcon,
    AddIcon,
    WordIcon,
    WordItem,
    PencilIcon,
    AutoSearchInput,
  },
};
</script>
<style scoped>
.makeStyles-root-194 input {
  color: var(--text-color);
  border: solid 1px var(--border-color);
  outline: none;
  padding: 1rem 1rem;
  font-size: 1.2rem;
  background: none;
  transition: all 0.25s;
  border-radius: var(--border-radius);
  background-color: var(--bg-color-accent);
  width: 100%;
  margin-bottom: 1.5rem;
}
.makeStyles-root-194 input:focus {
  border-color: var(--secondary-color);
}
.input-search {
  border-color: var(--secondary-color);
}

.makeStyles-listWrap-230 {
  border: solid 1px var(--border-color);
  padding: 1.2rem 0.4rem;
  border-radius: var(--border-radius);
  background-color: var(--bg-color-accent);
}
.makeStyles-list-231 {
  list-style: none;
}
.notfound-title {
  font-size: 1.2rem;
  color: var(--label-color);
  text-align: center;
}
.makeStyles-list-231 {
  height: calc(100vh - 24rem);
  padding: 0 2.4rem;
  overflow: auto;
}
.toolbar-wrap {
  flex-wrap: nowrap;
  justify-content: space-between;
}
.toolbar-title {
  color: var(--title-color);
  font-size: 1.7rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  letter-spacing: 0.75px;
  font-weight: 400;
}

.toolbar-icon-box {
  display: flex;
  align-items: center;
}
.toolbar-icon-box button {
  background: transparent;
  min-width: 2.2rem !important;
  color: var(--label-color);
}
</style>
