<template>
  <div>
    <Header />

    <div class="md-container">
      <PageTitle title="Vocabulary Topics" />
      <div class="vocab-container">
        
        <div v-for="topic in topics" :key="topic.key" class="vocab-item-cover">
            <RouterLink :to="`/word/${topic.key}`">
          <div class="vocab-item">
            <div><img :src="topic.icon" /></div>
            <div class="vocab-title">
              <h4>
                {{ topic.title }}
              </h4>
            </div>
          </div>
        </RouterLink>
        </div>
   
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import PageTitle from "../components/PageTitle.vue";
import { TOPICS } from "@/constants/topics";

export default {
  name: "WordTopView",
  data() {
    return {
      topics: TOPICS,
    };
  },
  components: {
    Header,
    PageTitle,
  },
};
</script>
<style>
.vocab-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto;
  margin:1.5rem 0;
}

.vocab-item-cover {
  width: 240px;
  height: 154px;
  margin:auto;
}
.vocab-item img {
  width: 50px;
  height: 50px;
  margin-bottom: 12px;
}
.vocab-item {
  width: 100%;
  cursor: pointer;
  height: 100%;
  display: flex;
  min-height: 130px;
  transition: all 0.35s;
  align-items: center;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg-color-accent);
}
.vocab-title h4 {
  color: var(--primary-color);
  font-size: 1.4rem;
  font-weight: bolder !important;
  letter-spacing: 0.5px;
}
</style>