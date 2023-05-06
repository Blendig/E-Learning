<template lang="">
   <div class="grid-item">
        <div class="grid-item-chd">
          <div class="input-container">
            <span>Note</span>
            <div>
              <input type="text" placeholder="" />
            </div>
          </div>
        </div>
        </div>
</template>
<script>
import { FormKit } from "@formkit/vue";

export default {
  name: "InputCustom",
  components: {
    FormKit,
  },
  props: {
    endAdornment: null,
    error: Boolean,
    inputProps: {},
  },
};
</script>
<style lang="css">
.f-shell {
  width: 100%;
}
.f-cta {
  color: #eeb655;
  margin: 0 0 2rem;
  float: right;
  text-align: right;
}
.f-main {
  height: 100vh;
  width: 100%;
}
.input-container {
  width: 100%;
  padding: 0.2rem 0.5rem;
  display: block;
  border: 1px solid var(--vt-c-divider-dark-1);
  
  border-radius: 0.3rem;
}
.input-container input {
  height: 2rem;
  padding: 0.5rem 0;
  border: 0;
  width: 100%;
  background-color: inherit;
  color: #fff;
  font-size: 1rem;
}
.input-container input:focus {
  border: 0;
  outline: 0;
}
.input-container span {
  font-size: small;
}
img {
  height: 80px;
  width: 80px;
}
.f-container {
  width: 23rem;
  border-radius: 0.4rem;
  min-height: 30rem;
  box-shadow: 2px 4px 6px #111;
  padding: 2rem;
}
</style>