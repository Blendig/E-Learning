<template>
  <div class="detail-card">
    <div role="dialog" class="">
      <div class="__modal_paper overide-bg" @click.stop="">
        <div class="flex-center-between">
          <h2 class="makeStyles-title-86">
            Details from <span>"{{ item?.word }}"</span>
          </h2>
          <button class="icon-btn" @click="$emit('close-modal')">
            <CloseIcon />
          </button>
        </div>
        <div class="english-break"></div>

        <div class="makeStyles-content-87">
          <div class="flex-center--ver my-4">
            <img
              :src="item?.picture"
              alt="Photo"
              class="makeStyles-picture-90 mr-8"
            />
            <div>
              <p class="makeStyles-word-91">
                {{ item?.word }} &nbsp;<span class="makeStyles-type-92"
                  >( {{ item?.type }} )</span
                ><span class="makeStyles-mean-93"> - {{ item?.mean }}</span>
              </p>
              <p class="makeStyles-phonetic-94 mt-4">
                / {{ item?.phonetic }} /
              </p>
            </div>
          </div>
          <p>
            <b class="makeStyles-label-89">Level:</b>&nbsp;&nbsp;{{
              item?.level
            }}
          </p>
          <div>
            <b class="makeStyles-label-89">Example sentence:</b>
            <p>1.&nbsp;{{ item?.examples }}</p>
          </div>
          <p v-if="item.specialty">
            <b class="makeStyles-label-89">Specialized in:</b>&nbsp;&nbsp;
            {{
              sliceSpecialty(item.specialty)
            }}
          </p>

          <b class="makeStyles-label-89">Topic:</b>
          <div class="makeStyles-topics-95 d-flex flex-wrap">
      
            <div  v-for="(itm, i) in sliceTopics(item?.topics || [])" :key="i">
              <Tag
                :icon="itm.icon"
                :title="itm.title"
                selected=""
                :key="itm.key"
              />
            </div>
          </div>
          <p>
            <b class="makeStyles-label-89">Synonyms:</b>&nbsp;&nbsp;{{
              item.synonyms
            }}
          </p>
          <p>
            <b class="makeStyles-label-89">Antonyms:</b>&nbsp;&nbsp;{{
              item.antonyms
            }}
          </p>
          <b class="makeStyles-label-89">Note:</b>
          <p>
            <span>note <br /></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CloseIcon from "@/assets/svgs/Close.vue";
import { WORD_SPECIALTY } from "@/constants/index.js";
import { TOPICS } from "@/constants/topics.js";
import Tag from "@/components/UIx/Tag/index.vue";
//---------------------------------------------------------
export default {
  name: "WordDetailModal",
  props: { item: Object },
  methods: {
    sliceTopics(topics) {
      console.log(topics);
      let res = [];
      topics.forEach((topic) => {
        res.push(TOPICS.find((i) => i.key === topic));
      });
      return res;
    },
    sliceSpecialty(specialty) {
      return (
        WORD_SPECIALTY.find((i) => i.value === specialty)?.label || "Không"
      );
    },
  },
  components: {
    CloseIcon,
    Tag,
  },
};
</script>
<style>
.__modal_paper {
  min-width: 300px;
  min-height: 320px;
  background-color: var(--bg-color-accent);
  border-radius: 4px;
  padding: 1.5rem;
}
.detail-card {
  opacity: 1;
  transform: none;
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 222ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform-origin: 0px 0px;
  min-width: 600px;
  background-color: var(--bg-color-accent);
  border-radius: 4px;
}
.-overide-bg {
  background-color: var(--bg-color-accent) !important;
}
.makeStyles-topics-95 {
  margin: 0 -0.4rem;
}

.flex-wrap {
  flex-wrap: wrap;
}
.d-flex {
  display: flex;
}
.makeStyles-topics-95 > * {
  margin: 0.4rem;
}

.makeStyles-root-120 {
  width: max-content;
  border: solid 1px var(--secondary-color);
  padding: 0.4rem 0.8rem;
  transition: all 0.25s;
  border-radius: 25px;
}
.makeStyles-root-105 {
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

.makeStyles-icon-121 {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}

.makeStyles-content-87 * {
  color: var(--text-color);
  font-size: 1.2rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.makeStyles-text-107 {
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 400;
  padding-left: 0.4rem;
  padding-right: 0.8rem;
}
</style>