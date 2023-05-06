<template>
  <div class="statbox flex align-items-center">
    <img class="st-icon" :src="icon" alt="Icon"/>
    <div>
        <h6 class="st-title">
            {{ title }}
        </h6>
        <h3 class="st-count">{{ count }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "StatBox",
  props: {
    count:0,
    icon:String,
    title:String,
  },
};
</script>
<style lang="css" scoped>
.st-icon{
    width:3rem;
    height:3rem;
    margin-right: 1rem;
}
.st-title{
    color: var(--primary-color);
    font-size: 1rem;
    letter-spacing: 0.5px;

}
.st-count{
    color: var(--primary-color);
    font-size: 3rem;
    letter-spacing: 0.5px;
}
</style>