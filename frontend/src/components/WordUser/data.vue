<template lang="">
    <div>
    <Vocabulary
     :list={currentList}
     :total={total}
    />
        
    </div>
</template>

<script>
import wordApi from "../../apis/wordApi";
import Vocabulary from "./index.vue";

export default {
  name: "VocabularyData",
  components: { Vocabulary },
  created() {
    getVocabularyList();
  },
  data() {
    return {
      pageInfo: { page: 1, packInfo: { topics: [this.$route.params.topic] } },
      list: Array,
      currentList: Array,
      total: -1,
      perPage: 7,
      message:""
    };
  },
  methods: {
    async getTotalWordPack() {
      let isSubscribe = true;

      if (this.total !== -1) {
        return;
      }
      try {
        const apiRes = await commonApi.getWordTopicTotal(
          this.pageInfo.packInfo
        );
        if (apiRes.status === 200 && isSubscribe) {
          const total = apiRes.data.total;
          if (this.total === 0) {
            this.message = "No word for this topic.", "warning"
          }
          this.total = total;
        }
      } catch (error) {
        setTotal(0);
      }
    },

    async getVocabularyList() {
      let isSubscribe = true;
      if (this.pageInfo.page < this.list.current.length / this.perPage) return; // prevent call API when element already exists in the old array
      try {
        const apiRes = await wordApi.getWordTopic(this.pageInfo.packInfo);

        if (apiRes.status === 200 && isSubscribe) {
          const filterList = apiRes.data.filter((item) => {
            return item.isLocked === 0;
          });
          this.currentList = filterList;
          //ref
          list.current = [...list.current, filterList];
        }
      } catch (error) {}
    },
  },
};
</script>
<style lang="">
</style>