<template>
    <div>
      <PageTitle title="Edit Grammar" />
      <br />
      <form @submit.prevent="handleSubmit">
        <div class="grid-container">
          <div class="grid-item">
            <div class="grid-item-chd">
              <div class="input-container">
                <span>Title (*)</span>
                <div>
                  <input
                    v-model="form.Title"
                    type="text"
                    placeholder=""
                    name="Title"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="grid-item">
            <div class="grid-item-chd">
              <div class="input-container">
                <span>Content (*)</span>
                <div>
                  <input
                    v-model="form.Content"
                    type="text"
                    placeholder=""
                    name="Content"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <div class="grid-item">
            <div class="grid-item-chd">
              <div class="input-container">
                <span>Level (*)</span>
                <div>
                  <select name="Topic" v-model="form.Level">
                    <option>select</option>
                    <option
                      v-for="(level, i) in levels"
                      :key="i"
                      :value="level.value"
                    >
                      {{ level.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
  
          <div class="grid-item">
            <div class="grid-item-chd">
              <div class="input-container">
                <span>Link Video (*)</span>
                <div>
                  <input
                    v-model="form.Video"
                    type="text"
                    placeholder=""
                    name="Video"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item" style="max-width: 100% !important; flex-grow: 3">
            <div class="grid-item-chd">
              <div class="input-container">
                <span>Text Editor</span>
                <div>
                  
                  <quill-editor contentType="html"  theme="snow" name='Script' v-model:content="form.Script"></quill-editor>
                </div>
              </div>
            </div>
          </div>
  
          <div className="english-break"></div>
  
          <!-- add grammar content -->
          <div
            class="grid-item"
            style="
              max-width: 100% !important;
              flex-grow: 3;
              background-color: transparent;
            "
          >
            <div class="grid-item-chd" style="background-color: transparent">
              <div class="input-container">
                <GrammarContentForm
                  :setContent="handlesetContent"
                  :list="form.Items"
                  :updateList="handleListUpdate"
                />
              </div>
            </div>
          </div>
          <div className="english-break"></div>
          <div class="wd1-cwrap flex">
            <VButton
              text="Return"
              variant="outlined"
              bgcolor="none"
              color="var(--accent-color)"
              type="button"
              @click="goto('/admin/grammar')"
            />
            <VButton
              text="Save"
              color="#fff"
              type="submit"
              v-if="!submitting"
            />
          </div>
        </div>
      </form>
    </div>
  </template>
  <script type="text/javascript">
  import PageTitle from "@/components/PageTitle.vue";
  import VButton from "@/components/Button.vue";
  //import "@vueup/vue-quill/dist/vue-quill.snow.css";
  import { GRAMMAR_LEVEL } from "@/constants/grammarLevels";
  import GrammarContentForm from "../Create/GrammarContentForm.vue";
  import grammarApi from "@/apis/grammarApi.js";
  export default {
    name: "GrammarAdminEditForm",
    created() {
        this.fetchGrammar()
    },
    data() {
      return {
        form: {
          Script: "",
          Title: "",
          Content: "",
          Level: "",
          Video: "",
          Examples: "",
          Point: "",
          Items: [],
          Audio: null,
          Image:
            "https://res.cloudinary.com/phongvn2611/image/upload/v1638368033/english/word/default-image_fbmbtn.png",
        },
        levels: GRAMMAR_LEVEL,
        submitting: false,
        content: [],
        resetFlag:0,
        value:1,
        loading:true,
        grammarValue:null,
      };
    },
    methods: {
      async handleSubmit() {
        this.form.Point = (this.form.Items && this.form.Items[0]) || 0;
        try {
            const apiRes = await grammarApi.putGrammar(this.grammarValue._id, this.form);
  
          if (apiRes.status === 200) {
            alert("Updated grammar successfully", "success")
            this.submitting = false
            this.$router.back()
           
          }
        } catch (error) {
          const message =  error.response?.data?.message ||
        'Error, can not update grammar.';
          alert(message);
          this.submitting =false
          throw error
        }
        console.log(this.form);
      },
      goto(url) {
        this.$router.push(url);
      },
      handlesetContent(v) {
        //this.form.Point=v.Point
        this.form.Items = [...this.form.Items, v];
        //this.content = [...this.content, v];
        console.log(v, this.form.Items);
      },
      handleListUpdate(l) {
        this.form.Items = l;
      },
      async fetchGrammar () {
        const apiRes = await grammarApi.getGrammarById(this.$route.params.id);
        this.grammarValue = apiRes.data
        if(apiRes.data.Video?.includes("youtube")){
            //setLinkVideo(apiRes.data.Video);
        }
    
        this.form =apiRes.data
        console.log(apiRes.data)
    }
    },
    components: {
      PageTitle,
      VButton,
      GrammarContentForm,
    },
  };
  </script>
  <style>
  .input-container {
    margin-bottom: 0;
  }
  
  .grid-item-chd {
    padding: 0;
    min-height: 0;
  }
  .wd1-cwrap button:first-child {
    margin-right: 1rem;
    flex-grow: 3;
  }
  .wd1-cwrap {
    float: right;
  }
  select > option {
    background-color: var(--bg-color-accent);
  }
  </style>
  