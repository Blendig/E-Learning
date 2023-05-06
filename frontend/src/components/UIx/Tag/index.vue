<template>
  <div 
  :id="[selected === key && 'selected']"
  role="button"
  class="makeStyles-root-105 flex-center--ver cur-pointer">
    <img
      class="makeStyles-icon-121"
       :src="icon"
      alt="icon"
    /><span class="makeStyles-text-107">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: "Tag",
  props: {
    icon: String,
    title: String,
    selected: String,
    key: String,
  },
};
</script>
<style lang="css">
#selected {
  background-color: var(--primary-color);
}
</style>