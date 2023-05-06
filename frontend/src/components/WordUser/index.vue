<template lang="">
    <div>
        <div class="container my-10">
      <div class="flex-center-between">
        <h1 class="english-title">Vocabulary</h1>
        <div class={iconWrap}>
          <Tooltip title="Collection" placement="bottom">
            <CollectionsIcon
              onClick={() => setMode(0)}
              class={`${icon} ${mode === 0 ? 'active' : ''}`}
            />
          </Tooltip>

          <Tooltip title="Item" placement="bottom">
            <CarouselIcon
              onClick={() => setMode(1)}
              class={`${icon} ${mode === 1 ? 'active' : ''}`}
            />
          </Tooltip>

      
        </div>
      </div>
      <div class="english-break" />


      {mode === 0 ? (
        <GalleryList
          :list={list}
          :total={Math.ceil(total / perPage)}
        />
      ) : (
        <SlideShow
          :list={list}
          :total={total}
          :currentSlide={currentSlide.current}
          :onSaveCurrentSlide={(v) => (currentSlide.current = v)}
          :totalCurrentSlide={currentSlide.current}
        />
      )}
    </div>
        
    </div>
</template>
<script>
import SlideShow from './SlideShow'

export default {
    name:'Vocabulary',
    props:{
        list:Array,
        total:Number
    },
    data(){
        return{
            perPage:7,
            tutorial:'There are 2 view modes: gallery and slide. Click on the eye icon to toggle the meaning of the word.',
            mode:0,
            currentSlide:0,
        }
    },
    created(){

    }
}
</script>
<style lang="">
    
</style>