<template>
  <div>
    <div v-if="part === 1">
      <Part1
        part="part"
        testId="testId"
        submitId="submitId"
        setSubmitAnswers1="setSubmitAnswers1"
      />
    </div>
    <div v-if="part === 2">
      <Part2
        part="{part}"
        testId="{testId}"
        submitId="{submitId}"
        setSubmitAnswers2="{setSubmitAnswers2}"
      />
    </div>
    <div v-if="part === 3">
      <Part3
        part="{part}"
        testId="{testId}"
        submitId="{submitId}"
        setSubmitAnswers3="{setSubmitAnswers3}"
      />
    </div>
    <div v-if="part === 4">
      <Part4
        part="{part}"
        testId="{testId}"
        submitId="{submitId}"
        setSubmitAnswers4="{setSubmitAnswers4}"
      />
    </div>
    <div v-if="part === 5">
      <Part5
        part="{part}"
        testId="{testId}"
        submitId="{submitId}"
        setSubmitAnswers5="{setSubmitAnswers5}"
      />
    </div>
    <div v-if="part === 6">
      <Part6
        part="{part}"
        testId="{testId}"
        submitId="{submitId}"
        setSubmitAnswers6="{setSubmitAnswers6}"
      />
    </div>
    <div v-if="part === 7">
      <Part7
        part="{part}"
        testId="{testId}"
        submitId="{submitId}"
        setSubmitAnswers7="{setSubmitAnswers7}"
      />
    </div>
  </div>
</template>
<script>
import Part1 from "./Part1.vue";
import Part2 from "./Part2.vue";
import Part3 from "./Part3.vue";
import Part4 from "./Part4.vue";
import Part5 from "./Part5.vue";
import Part6 from "./Part6.vue";
import Part7 from "./Part7.vue";

export default {
  name: "Part",
  props: {
    part,
    testId,
    submitId,
    setSubmitAnswers1,
    setSubmitAnswers2,
    setSubmitAnswers3,
    setSubmitAnswers4,
    setSubmitAnswers5,
    setSubmitAnswers6,
    setSubmitAnswers7,
  },
  data() {
    return {};
  },
  components: {
    Part1,
    Part2,
    Part3,
    Part4,
    Part5,
    Part6,
    Part7,
  },
};
</script>
<style>
</style>