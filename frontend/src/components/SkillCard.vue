<template>
  <div class="c-wrapper">
    <div
      class="c-box flex justify-content-center flex-direction-column align-items-center"
    >
      <div
        class="c-icon-box flex justify-content-center flex-direction-column align-items-center"
      >
        <RouterLink :to="path">
          <img :src="icon" alt="icon" />
         
        </RouterLink>
      </div>

      <RouterLink to="{path}">
        <h2>{{ title }}</h2>
      </RouterLink>

      <p>{{ detail }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "SkillCard",
  props: {
    icon: Object,
    title: String,
    detail: String,
    path: String,
  },
};
</script>
<style scoped type="scss">
.c-wrapper {
  margin: 7rem 0.5rem 5rem 0;
  width: calc(960px / 4);
  background-color: #fff;
  height: 16rem;
  border: 1px solid #ddd;
  padding: 0 2rem;
}
.c-box {
  text-align: center;
}
.c-wrapper h2 {
  color: var(--vt-c-black);
}
.c-wrapper p {
  color: var(--vt-c-text-light-2);
  margin-top: 1rem;
}

.c-icon-box {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin-top: -3rem;
  margin-bottom: 3rem;
}
</style>
