<template>
  <div>
    <input
      placeholder="Search..."
      class="input-search w-100 h-100"
      type="search"
      v-model="form.query"
      @keyup="onChange"
    />
  </div>
</template>
<script>
import { debounce } from "@/helper/index.js";

export default {
  name: "AutoSearchInput",
  props: {
    onSearch: Function,
  },
  data() {
    return {
      form: { query: "" },
      delayTimer: null,
    };
  },
  methods: {
    async onChange(e) {
      this.delayTimer = debounce(
        this.delayTimer,
        () => {
          const { value } = e.target;
          this.onSearch(this.form.query);
        },
        750
      );
    },
  },
};
</script>
<style lang="scss">
</style>