<template>

  <div class="makeStyles-root-128">
    <div class="makeStyles-root-67 flex-center-between">
      <div
        class="w1-100 flex-center--ver"
        role="button"
        @click="onShowDetail(item._id)"
      >
        <img class="makeStyles-picture-68" :src="item.picture" alt="" />
        <div class="ml-8 flex-grow-1">
          <h3 class="makeStyles-word-69">
            {{ item.word }}
            <span class="makeStyles-type-70" v-if="type">{{ item.type }}</span>
          </h3>
          <p class="makeStyles-phonetic-71 phonetic" v-if="item.phonetic">
            / {{ item.phonetic }} /
          </p>
          <p class="makeStyles-mean-72">{{ item.mean }}</p>
        </div>
      </div>
      <div className="flex-center--ver">
        <div className="mr-5">
          <button
            class="icon-btn"
            @click="$router.push(`/admin/word/edit/${item._id}`)"
          >
            <PencilIcon />
          </button>
        </div>
        <button class="icon-btn" @click="deleteWord">
          <DeleteIcon />
        </button>
      </div>
    </div>
  </div>
  <div class="__modal_wrapper" v-if="open">
    <WordDetailModal :item="modalData" @close-modal="toggleModal" />
  </div>
</template>
<script>
import PencilIcon from "@/assets/svgs/Pencil.vue";
import DeleteIcon from "@/assets/svgs/Delete.vue";
import WordDetailModal from "@/components/UIx/WordDetailModal/index.vue";
import wordApi from '@/apis/wordApi.js'

export default {
  name: "WordItem",
  props: {
    _id: String,
    word: String,
    type: String,
    phonetic: String,
    picture: String,
    mean: String,
    item: Object,
   
  },
  data() {
    return {
      open: false,
      modalData:{},
      loading:false
    };
  },
  methods: {
    toggleModal() {
      this.open = !this.open;
    },
 
    async onShowDetail(id) {
      try {
        //setModal({ open: true, loading: true });
        const apiRes = await wordApi.getWord(id);
        if (apiRes) {
         // setModal({ open: true, loading: false, ...apiRes.data });
         this.loading = false
         this.modalData= {...apiRes.data }
          console.log(apiRes.data)
          this.toggleModal();
        }
      } catch (error) {
       // setModal({ open: false, loading: false });
       // dispatch(setMessage("Can't get from", "error"));
      }
    },
   async deleteWord(){
     try {
      const response = await wordApi.deleteWord(this.item.word, this.item.type);
      if(response){
        window.location.reload()
      }
     } catch (error) {
      
     }

    }
  },
  components: {
    DeleteIcon,
    PencilIcon,
    WordDetailModal,
  },
};
</script>
<style lang="css">
.w1-100 {
  width: 100% !important;
}
.makeStyles-root-67 {
  cursor: pointer;
  padding: 1.2rem 0;
  transition: all 0.35s;
  border-bottom: solid 1px var(--border-color);
  font-size:1.2rem!important;
}
.flex-center-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.makeStyles-picture-68 {
  width: 5rem;
  height: 5rem;
}
.ml-8 {
  margin-left: 1.6rem !important;
}

.flex-grow-1 {
  flex-grow: 1;
}
.makeStyles-word-69 {
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 500;
}
.makeStyles-phonetic-71 {
  margin: 0.2rem 0;
  font-size: 1rem;
}

.phonetic {
  color: var(--phonetic-color);
  letter-spacing: 1px;
}
.makeStyles-mean-72 {
  color: var(--text-color);
  font-size: 1rem;
  max-width: 80%;
  line-height: 1.5;
}
.makeStyles-root-128 {
  cursor: pointer;
/*  padding: 1.2rem 0;*/
  transition: all 0.35s;
/*  border-bottom: solid 1px var(--border-color);*/
}
</style>