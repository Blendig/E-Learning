<template>
  <div class="admin-container">
    <div class="admin-container-chd">
      <div class="admin-container-chd english-container">
        <div class="toolbar-wrap flex">
          <h1 class="toolbar-title">Manage blog</h1>
          <div class="toolbar-icon-box">
            <div>
              <button @click="goto('/admin/blog/add')"><AddIcon /></button>
            </div>
          </div>
        </div>
        <div class="english-break"></div>
        <div>
         
          <div class="makeStyles-listWrap-230">
            <ul class="makeStyles-list-231" v-if="list.length === 0">
              <h3 class="notfound-title">List is empty</h3>
            </ul>
            <BlogData v-else :list="list" @delete-blog-item="deleteBlog" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <SortModal :open="open" @close-modal="popSortModal" @sort-by="setSort" />
  </div>
</template>
<script>
import CogIcon from "@/assets/svgs/cog.vue";
import BlogData from "../../components/Extras/BlogAdmin/BlogData.vue";
import listeningApi from "../../apis/listeningApi";
import AutoSearchInput from "@/components/UIx/AutoSearchInput/index.vue";
import SortModal from "@/components/QuizAdmin/SortModal.vue";
import AddIcon from "@/assets/svgs/Add.vue";
import blogApi from "@/apis/Extras/blogApi.js";

export default {
  name: "BlogAdmin",
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
      list: [],
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
    async deleteBlog(id) {
      console.log(id);
      const conf = confirm("Proceed to delete item");
      if (conf) {
        try {
          const res = await blogApi.deleteBlog(id);
          if (res.status === 200) {
            //remove form list
            const tmp = this.list.filter((l) => l._id !== id);
            this.list = tmp;
          } else {
            alert("Could not delete blog");
          }
        } catch (error) {
          const message =
            (error.response && error.response.message) || "Operation failed";
          alert(message);
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
        } else {
          console.log("else block");
          const apiRes = await blogApi.searchBlog(title);
          console.log(apiRes.data);
          if (apiRes.status === 200) {
            this.list = apiRes.data.blogs;
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
          apiRes = await blogApi.getBlog();
        } else {
          console.log(this.packInfo);
          apiRes = await blogApi.getBlog();
        }
        if (apiRes.status === 200 && isSub) {
          if (apiRes.data.blogs) {
            this.list = apiRes.data.blogs;
            this.preSearchList = apiRes.data.blogs;
          }
        }
        console.log(apiRes.data);
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
    BlogData,
    AutoSearchInput,
    SortModal,
    AddIcon,
  },
};
</script>
<style type="text/css"></style>
