<template lang="">
    <div v-if="word && word !== '' ">
        <div :class='`${root} ani-fade`'>
          <div class='picture' />
          <div :class='`${content} flex-center-col`'>
           <h2 class='mean'>{{mean}}</h2>
            <h3 :class='`${word} flex-center--ver`'>
              <span>{{word}}</span> <Speaker class="ml-4" :text={word} />
            </h3>
            <p v-if="type===true" class='type'>{{type}}</p>
           
              <p class='phonetic'>/{{phonetic}}/</p>
            
            
              <p v-if="example && example !== ''" class='example'>
                <SliceExample :word={word} :example={example} />
              </p>
            
          </div>
       
    </div>
    </div>
</template>
<script>
import Speaker from "components/UI/Speaker";
import SliceExample from "./SliceExample.vue";

export default {
  name: "SlideItem",
  components: {
    Speaker,
    SliceExample
  },

  props: {
    example: String,
    mean: String,
    phonetic: String,
    picture: String,
    type: String,
    word: String,
  },
  data() {
    return {};
  },
  created() {},
};
</script>
<style lang="">
.root{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 45% 55%;

    height: 100%;
    width: 100%;
    margin: 2.2rem auto 0;

    box-shadow: var(--box-shadow);
    background-color: var(--bg-color-sec);
    border-radius: 8;
    overflow: hidden;
}


  .picture {
    background-image:url("${cloudinaryImgOptimize(props.picture, -1, 576)}");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 'center';
    background-color: var(--bg-color-accent);
  }

  .content {
    padding: 1.2rem 2.4rem;
    margin: -0.6rem 0;
 
  }

  .mean {
    font-size: 2.4rem;
    color: var(--primary-color);
    font-weight: bold;
    text-transform: capitalize;
  }

  .word {
    font-size: 2.2rem;
    letter-spacing: 0.75px;
    color: var(--text-color);
    text-transform: capitalize;

  }

  .type {
    font-size: 1.6rem;
    color: var(--label-color);

  }

  .phonetic {
    font-size: 1.8rem;
    color: var(--phonetic-color);
    letter-spacing: 1px;
  }

  .example {
    font-size: 1.7rem;
    color: var(--text-color);
    line-height: 1.5,

  }

  
</style>