<template>
  <div>
    <PageTitle title="Edit Listening" />
    <br />
    <form @submit.prevent="handleSubmit">
      <div class="grid-container">
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Name (*)</span>
              <div>
                <input
                  v-model="form.Name"
                  type="text"
                  placeholder=""
                  name="word"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Description (*)</span>
              <div>
                <input
                  v-model="form.Description"
                  type="text"
                  placeholder=""
                  name="word"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Topic (*)</span>
              <div>
                <select name="Topic" v-model="form.Topic">
                  <option>select</option>
                  <option
                    v-for="(topic, i) in topics"
                    :key="i"
                    :value="topic.value"
                  >
                    {{ topic.label }}
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
                  v-model="form.LinkVideo"
                  type="text"
                  placeholder=""
                  name="LinkVideo"
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
        <div class="wd1-cwrap flex">
          <VButton
            text="Return"
            variant="outlined"
            bgcolor="none"
            color="var(--accent-color)"
            type="button"
            @click="goto('/admin/listening')"
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
import { LISTEN_TOPIC } from "@/constants/listeningTopics";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import listeningApi from "@/apis/listeningApi.js";

export default {
  name: "EditListeningForm",
  created() {
    this.initApiCalls()
  },
  data() {
    return {
      form: {
        Script: "",
        Name: "",
        Topic: "",
        Description: "",
        LinkVideo: "",
        Image:
          "https://res.cloudinary.com/phongvn2611/image/upload/v1638368033/english/word/default-image_fbmbtn.png",
        Video: null,
        Items: "",
      },
      listeningValue:'',
      topics: LISTEN_TOPIC,
      submitting: false,
    };
  },
  methods: {
    async initApiCalls() {
      const apiRes = await listeningApi.getListenById(this.$route.params.id);
      //setListenValue(apiRes.data.listen);
      console.log(apiRes.data.listen)
        this.form=apiRes.data.listen
      if (apiRes.data.listen.Video&&apiRes.data.listen.Video.includes("youtube")) {
       // setLinkVideo(apiRes.data.listen.Video);
        this.form.LinkVideo =apiRes.data.listen.Video
      }
     // setScript(apiRes.data.listen.Script);
      this.form.Script=apiRes.data.listen.Script
     // setImage(apiRes.data.listen.Image);
     this.form.Image = apiRes.data.listen.Image
     this.listeningValue = apiRes.data.listen._id
    },
    async handleSubmit() {
      const dataSend = this.form;
      try {
        console.log(this.form, this.$refs.script);
        const apiRes = await listeningApi.putListen(this.listeningValue,dataSend);
        console.log(apiRes.data);
        if (apiRes && apiRes.status === 200) {
          //dispatch(setMessage("Created listening successfully", "success"));
          //setSubmitting(false);
          alert("Edited listening successfully");
          this.submitting = false;
        }
      } catch (error) {
        throw error;
      }
    },
    goto(url) {
      this.$router.push(url);
    },
  },
  components: {
    PageTitle,
    VButton,
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
}
.wd1-cwrap {
  float: right;
}
select > option {
  background-color: var(--bg-color-accent);
}
</style>