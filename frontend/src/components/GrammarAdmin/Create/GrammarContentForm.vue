<template>
  <div>
    <div class="admin-container-chd english-container">
      <div class="toolbar-wrap flex">
        <h1 class="toolbar-title">Add Content for grammar</h1>
        <div class="toolbar-icon-box">
          <div>
            <button type="button" @click="toggleModal">
              <AddIcon />
            </button>
          </div>
        </div>
      </div>
      <div class="english-break"></div>
      <div>
        <div class="makeStyles-listWrap-230">
          <ul class="makeStyles-list-231 grammar-ul">
            <h3 class="notfound-title"></h3>
            <li style="cursor: pointer" v-for="(item, i) in list" :key="i">
              <div
                class="flex align-items-center btn-grammar-wrap"
                style="justify-content: space-between"
              >
                <div
                  role="button"
                  @click="showContentDetail(item, i)"
                  style="width: 100%"
                >
                  <h3>{{ item.Point }}</h3>
                </div>
                <button
                  type="button"
                  class="icon-btn"
                  @click="deleteContentItem(item)"
                >
                  <DeleteIcon />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div
    ref="backdrop"
    class="__modal_wrapper __modal_backdrop"
    @click="toggleModal"
    v-if="showModal"
  >
    <div role="dialog" class="">
      <div class="__modal_paper" @click.stop="">
        <form ref="grammarContentForm">
          <div class="grid-item">
            <div class="grid-item-chd"></div>
          </div>
          <div class="english-break"></div>
          <div class="grid-item">
            <div class="grid-item-chd">
              <div class="input-container">
                <span>Point</span>
                <div>
                  <input
                    v-model="content.Point"
                    type="number"
                    placeholder=""
                    name="Point"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="grid-item">
            <div class="grid-item-chd">
              <div class="input-container">
                <span>Examples</span>
                <div>
                  <input
                    v-model="content.Examples"
                    type="text"
                    placeholder=""
                    name="Examples"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="english-break"></div>
          <div class="__modal_btn_box flex">
            <Button
              text="CANCEL"
              type="button"
              color="#3f51b5"
              @click="toggleModal"
              bgcolor="none"
            />
            <div v-if="isEditing === true">
              <Button
                text="EDIT"
                type="button"
                @click="editContent"
                color="#3f51b5"
                bgcolor="none"
              />
            </div>
            <div v-else>
              <Button
                text="SAVE"
                type="button"
                @click="addGrammarContent"
                color="#3f51b5"
                bgcolor="none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import AddIcon from "@/assets/svgs/Add.vue";
import Button from "@/components/Button.vue";
import DeleteIcon from "@/assets/svgs/Delete.vue";
export default {
  name: "GrammarContentForm",
  props: {
    setContent: Function,
    list: Array,
    updateList: Function,
  },
  data() {
    return {
      showModal: false,
      content: {
        Point: "",
        Examples: "",
      },
      isEditing: false,
      oldValue: null,
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    toggleModal() {
      this.showModal = !this.showModal;
      this.isEditing = false;
      this.oldValue = null;
      this.content = {
        Point: "",
        Examples: "",
      };
    },
    deleteContentItem(item) {
      const oldList = this.list;
      const newList =[]
      for (let i = 0; i < this.list.length; i++) {
        const element = this.list[i];
        if(element.Examples !== item.Examples){
          newList.push(element)
        }
      }
      console.log(newList);
      // oldList[index]
      //oldList.splice(index, 1)
      return this.updateList(newList);
    },

    editContent() {
      console.log("editing ...");
      if (this.isEditing) {
        //find index and update
        const oldList = this.list;
        const tmp = oldList[this.oldValue];
        tmp.Point = this.content.Point;
        tmp.Examples = this.content.Examples;
        this.isEditing = false;
        this.oldValue = null;
        this.content = {
          Point: "",
          Examples: "",
        };
        this.toggleModal();
        return this.updateList(oldList);
      }
    },
    addGrammarContent() {
      const tmp = this.content;
      console.log(this.content);
      //create or update
      this.content = {
        Point: "",
        Examples: "",
      };
      //this.list.push(tmp)
      this.toggleModal();
      return this.setContent(tmp);
    },
    showContentDetail(t, _index) {
      this.isEditing = true;
      this.oldValue = _index;
      this.toggleModal();
      this.content = { ...t };
      console.log(t);
    },
  },
  components: {
    AddIcon,
    Button,
    DeleteIcon,
  },
};
</script>
<style lang="scss">
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
  min-height: 320px;
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
</style>
