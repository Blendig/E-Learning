<template>
  <div>
    <Header />
    <div class="md-container">
      <PageTitle title="Vocabulary" />
      <div class="flex-center cur-pointer position-rel">
        <div class="flex vocab-item-cover ">
          <div v-for="(item,i) in currentList" :key='i' class="vocab-item">
            <h2>{{ item.mean }}</h2>
            <h4>{{ item.word }}</h4>
            <p><em>/{{ item.phonetic }}/ ({{ item.type }})</em></p>
          </div>
       
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import PageTitle from "../components/PageTitle.vue";
import commonApi from "@/apis/commonApi";
import wordApi from "@/apis/wordApi";

export default {
  name: "VocabularyView",
  created() {
    this.getTotalWordPack();
    this.getVocabularyList();
    const voiceList = window.speechSynthesis.getVoices();
    console.log(voiceList)
  },
  data() {
    return {
      list: [],
      currentList: [],
      total: -1,
      pageInfo: {
        page: 1,
        packInfo: {
          topics: [this.$route.params.topic],
        },
      },
    };
  },
  methods: {
    async getTotalWordPack() {
      try {
        let isSubscribe = true;
        if (this.total !== -1) {
          return;
        }

        const apiRes = await commonApi.getWordTopicTotal(
          this.pageInfo.packInfo
        );

        if (apiRes.status === 200 && isSubscribe) {
          const total = apiRes.data.total;
          if (total === 0) {
            alert("No word for this topic.", "warning");
          }
          this.total = total;
        }
      } catch (error) {
        this.total = 0;
      }
    },
    async getVocabularyList() {
      let isSubscribe =true
      try {
        const apiRes = await wordApi.getWordTopic(this.pageInfo.packInfo);

        if (apiRes.status === 200 && isSubscribe) {
          const filterList = apiRes.data.filter((item) => {
            return item.isLocked === 0;
          });
          this.currentList = filterList;
          this.list = [...this.list, filterList];
          console.log(apiRes.data);
        }
      } catch (error) {}
    },
  },
  components: {
    Header,
    PageTitle,
  },
};
</script>
<style lang="scss" scoped>
.vocab-item-cover{
  width:100%;
  height:280px;
  padding: 1rem;
  text-align: center;
  display:grid;
  flex-grow: 2;
  gap:1rem;
  grid-template-columns: auto auto;
  .vocab-item{
    background-color: rgba(0, 0, 0, 0.4509803922);
    width: 100%;
    color: #fff;
    padding: 1rem;
    font-size: 1.3rem;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family:Montserat;
    h2{
      font-size:1.5rem;
      text-transform: capitalize;
      font-weight: 500;
    }
    p{
      font-weight: lighter;
      font-size:1rem

    }
  }
}
</style>
