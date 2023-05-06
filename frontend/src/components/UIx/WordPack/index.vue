<template lang="">
    <div>
        <form @submit.prevent='handleSubmit'>
            <div class="input-container">
              <span>Word type</span>
              <div>
                <select>
                    <option value="">Select</option>
                    <option v-for='word in addAllOption(WORD_TYPES)' value='word.value' :key='word.value'>
                        {{word.label}}
                    </option>
                </select>
              </div>
            </div>
        </form>
    </div>
</template>
<script>
import { WORD_LEVELS, WORD_TYPES, WORD_SPECIALTY } from "@/constants/index";
import { TOPIC_OPTIONS } from "@/constants/topics";

export default {
  name: "WordPack",
  props: props,
  created() {
    const {
      onChoose,
      onCancel,
      open,
      topicMultiples,
      title,
      okBtnText,
      cancelBtnText,
      okBtnProps,
      cancelBtnProps,
    } = props;
  },
  data() {
    return {
      toipics: [],
    };
  },
  methods: {
    addAllOption(optionList = []) {
      return [{ value: "-1", label: "Tất cả" }, ...optionList];
    },
    handleSubmit(e) {
      e.preventDefault();
      const { target } = e;
      const type = target.type?.value || "-1",
        specialty = target.specialty?.value || "-1",
        topic = target.topic?.value || "-1",
        level = target.level?.value || "-1";

      onChoose({
        type,
        specialty,
        level,
        topics: topicMultiples ? topics.current : topic === "-1" ? [] : [topic],
      });
    },
  },
  components: {
    WORD_LEVELS,
    WORD_TYPES,
    WORD_SPECIALTY,
  },
};
</script>
<style lang="">
</style>