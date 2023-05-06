<template>
  <div class="topic-box-item-cover">
    <RouterLink :to="to">
      <div class="topic-box-item">
        <img :src="icon" alt="Icon" />
     
      <h3 class="topic-box-title">{{ title }}</h3>
    </div>
    </RouterLink>
  </div>
</template>
<script>
export default {
  name: "TopicBox",
  props: {
    to: "",
    icon: "",
    title: "",
  },
};
</script>
<style lang="css">
.topic-box--container {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto;
  margin: 1.5rem 0;
}

.topic-box-item-cover {
  width: 240px;
  height: 154px;
  margin: auto;
}
.topic-box-item img {
  width: 50px;
  height: 50px;
  margin-bottom: 12px;
}
.topic-box-item {
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
.topic-box-item h3 {
  color: var(--primary-color);
  font-size: 1.4rem;
  font-weight: bolder !important;
  letter-spacing: 0.5px;
}
</style>