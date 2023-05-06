<template>
    <div
      ref="backdrop"
      class="__modal_wrapper __modal_backdrop quiz_sort"
      @click="toggleModal"
      v-if="open"
    >
      <div role="dialog" class="">
        <div class="__modal_paper" @click.stop="">
          <form ref="grammarContentForm">
            <div class="english-break"></div>
            <div class="grid-item">
              <div class="grid-item-chd">
                <div class="input-container">
                  <span>Topic</span>
                  <div>
                    <select name="sort" v-model="form.sortBy">
                  <option value="All">All</option>
                      <option :value="item.value" v-for="(item,i) in types" :key="i">{{ item.label }}</option>

                    </select>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="english-break"></div>
            <div class="__modal_btn_box flex">
              <div class="mr10">
                <Button
                  text="Close"
                  type="button"
                  @click="$emit('close-modal')"
                  color="#3f51b5"
                  bgcolor="grey"
                />
              </div>
              <div>
                <Button
                  text="Ok"
                  type="button"
                  @click="$emit('sort-by',form.sortBy)"
                  color="#fff"
                  bgcolor="var(--primary-color)"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import Button from "../Button.vue";
  import PageTitle from "../PageTitle.vue";
  import { LISTEN_TOPIC } from '@/constants/listeningTopics';

  export default {
    name: "ListeningSortModal",
    props: {
      open: false,
    },
    data() {
      return {
        showModal: true,
        form: { sortBy: "All" },
        types:LISTEN_TOPIC
      };
    },
    methods:{
     
    },
    components: {
      Button,
      PageTitle,
    },
  };
  </script>
  <style lang="scss">
  .quiz_sort {
      .__modal_btn_box{
          margin:1rem;
          .mr10{
              margin-right:1rem;
          }
      }
    .btn-grammar-wrap {
      svg {
        fill: #ddd;
        height: 1.5rem;
      }
    }
    .grammar-ul {
      list-style: none;
      color: var(--primary-color);
      font-weight: bolder;
      font-size: 1.3rem;
    }
    .grammar-ul h3 {
      margin: 0.5rem 0;
    }
    .__modal_wrapper {
      position: fixed;
      z-index: 1300;
      inset: 0px;
  
      opacity: 1;
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      outline: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .__modal_paper {
      min-width: 300px;
      min-height:250px;
      height: 250px!important;
  
      background-color: #fff;
      border-radius: 4px;
    }
    .close {
      display: none;
    }
    .__modal_paper .grid-item {
      flex-grow: 3;
      width: 100%;
      max-width: 100%;
    }
    .__modal_btn_box {
      justify-content: flex-end;
    }
    .grid-item-chd {
      cursor: default;
    }
  }
  </style>