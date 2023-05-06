<template>
  <div class="ts1-container flex">
    <div v-for="(topic, i) in topics" :key="i" class="makeStyles-tags-56">
      <div :id="[selected.includes(topic.key) && 'selected']" class="makeStyles-root-57 flex-center--ver cur-pointer" role='button' @click='handleChange(topic.key)'
      >
        <img
          class="makeStyles-icon-58"
          :src="topic.icon"
          alt="icon"
        />
        <span class="makeStyles-text-59">{{ topic.title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { TOPICS } from "@/constants/topics.js";

export default {
  name: "TopicSelect",
  props: {
    resetFlag: 0,
    buttonTitle: "Chọn chủ đề",
    buttonWrapper: null,
    tagsWrapper: null,
    selected:Array
  },
  data(){
   return{
     topics:TOPICS
   }
  },
methods:{
  handleChange(t){
    this.$emit('add-topic',t)
   console.log(t)
  }
}

};
</script>
<style lang="scss">
#selected{
  background-color:var(--primary-color);
}
.ts1-container{
    flex-grow:3;
    width:100%;
   min-height: 200px;
    margin:12px;
    background-color: var(--bg-color-accent);
    flex-wrap:wrap;
}

.makeStyles-root-57 {
    width: max-content;
    border: solid 1px var(--secondary-color);
    padding: 0.4rem 0.8rem;
    transition: all 0.25s;
    border-radius: 25px;
}
.cur-pointer {
    cursor: pointer;
}
.flex-center--ver {
    display: flex;
    align-items: center;
}
.makeStyles-icon-58 {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
    border-radius: 50%;
}
.makeStyles-text-59 {
    color: var(--text-color);
    font-size: 1rem;
    font-weight: 400;
    padding-left: 0.4rem;
    padding-right: 0.8rem;
}
.makeStyles-tags-56 {
    display: flex;
    padding: .7rem;
    flex-wrap: wrap;
    border-radius: var(--sm-border-radius);
    background-color: var(--bg-color-accent);
}
</style>