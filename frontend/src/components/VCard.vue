<template>
  <div>
    {{ children }}
  </div>
</template>
<script>
export default {
  name: "v-card",
  props: {
    children: Object,
  },
};
</script>
<style lang="css">
.f-container {
  width: 23rem;
  border-radius: 0.4rem;
  min-height: 30rem;
  box-shadow: 2px 4px 6px #111;
  padding: 2rem;
}
</style>