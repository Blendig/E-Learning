<template lang="">
    <div>
        <div v-if='pages > 1'>
            <div :class="{d-flex jus-content-`${type==='part'?'between':'around'} align-items-center my-5`}">
                <Button 
                class='button'
                :disabled={selected === 1 ? true : false}
                @click="{() => updateAnswerSubmitPrev((prev) => (prev <= 1 ? prev : prev - 1))}"
                :text='{type === "part" ? "Prev Part" : "Prev"}'
                />
                <Button
                @click='{()=> updateAnswerSubmitNext((prev) => (prev >= pages ? prev : prev + 1))}'
                :text='{type === "part" ? "Next Part" : "Next"}'
                />
            </div>
        </div>
    </div>
        
    </div>
</template>
<script>
import submitTestApi from "@/apis/submitTestApi";
import Button from '@/components/Button'

export default {
  name: "Pagination",
  props: {
    type: String,
    pages,
    setCurrentPage,
    submitId,
    submitAnswers1,
    submitAnswers2,
    submitAnswers3,
    submitAnswers4,
    submitAnswers5,
    submitAnswers6,
    submitAnswers7,
  },
  data() {
    return {
      type: "question",
      selected: 1,
    };
  },
  methods: {
    async updateAnswerSubmitPrev() {
      if (this.selected === 1) {
        await submitTestApi.putAnswerSubmit(this.submitId, {
          Part: this.selected,
          AnswerTests: this.submitAnswers1,
        });
        this.selected = value;
        return;
      }
      if (this.selected === 2) {
        await submitTestApi.putAnswerSubmit(this.submitId, {
          Part: this.selected,
          AnswerTests: this.submitAnswers2,
        });
        this.selected = value;
        return;
      }
      if (this.selected === 3) {
        await submitTestApi.putAnswerSubmit(this.submitId, {
          Part: this.selected,
          AnswerTests: this.submitAnswers3,
        });
        this.selected = value;
        return;
      }

      if (this.selected === 4) {
        await submitTestApi.putAnswerSubmit(this.submitId, {
          Part: this.selected,
          AnswerTests: this.submitAnswers4,
        });
        this.selected = value;
        return;
      }

      if (this.selected === 5) {
        await submitTestApi.putAnswerSubmit(this.submitId, {
          Part: this.selected,
          AnswerTests: this.submitAnswers5,
        });
        this.selected = value;
        return;
      }
      if (this.selected === 6) {
        await submitTestApi.putAnswerSubmit(this.submitId, {
          Part: this.selected,
          AnswerTests: this.submitAnswers6,
        });
        this.selected = value;
        return;
      }

      if (this.selected === 7) {
        await submitTestApi.putAnswerSubmit(this.submitId, {
          Part: this.selected,
          AnswerTests: this.submitAnswers7,
        });
        this.selected = value;
        return;
      }

      this.selected = value;
    },
  },
  async updateAnswerSubmitNext(value) {
    if (this.selected === 1) {
      await submitTestApi.putAnswerSubmit(submitId, {
        Part: this.selected,
        AnswerTests: submitAnswers1,
      });
      this.selected = value
      return;
    }
    if (this.selected === 2) {
      await submitTestApi.putAnswerSubmit(submitId, {
        Part: this.selected,
        AnswerTests: submitAnswers2,
      });
      this.selected = value
      return;
    }
    if (this.selected === 3) {
      await submitTestApi.putAnswerSubmit(submitId, {
        Part: this.selected,
        AnswerTests: submitAnswers3,
      });
      this.selected = value
      return;
    }
    if (this.selected === 4) {
      await submitTestApi.putAnswerSubmit(submitId, {
        Part: this.selected,
        AnswerTests: submitAnswers4,
      });
      this.selected = value
      return;
    }
    if (this.selected === 5) {
      await submitTestApi.putAnswerSubmit(submitId, {
        Part: this.selected,
        AnswerTests: submitAnswers5,
      });
      this.selected = value
      return;
    }
    if (this.selected === 6) {
      await submitTestApi.putAnswerSubmit(submitId, {
        Part: this.selected,
        AnswerTests: submitAnswers6,
      });
      this.selected = value
      return;
    }

    if (this.selected === 7) {
      await submitTestApi.putAnswerSubmit(submitId, {
        Part: selected,
        AnswerTests: submitAnswers7,
      });
      this.selected = value
      return;
    }

    this.selected = value
  },
  components:{
    Button,
  }
};
</script>
<style lang="css">
</style>