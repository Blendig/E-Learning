<template>
  <div>
    <PageTitle title="More Listening Songs" />
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
                   @blur="validate('Name')"
                  @keypress="validate('Name')"
                />
              </div>
               <small class="errors" v-if="!!errors.Name">{{
                errors.Name
              }}</small>
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
                   @blur="validate('Description')"
                  @keypress="validate('Description')"
                />
              </div>
               <small class="errors" v-if="!!errors.Description">{{
                errors.Description
              }}</small>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Topic (*)</span>
              <div>
                <select name="Topic" v-model="form.Topic"
                   @blur="validate('Topic')"
                  @keypress="validate('Topic')"
                >
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
               <small class="errors" v-if="!!errors.Topic">{{
                errors.Topic
              }}</small>
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
                   @blur="validate('LinkVideo')"
                  @keypress="validate('LinkVideo')"
                />
              </div>
               <small class="errors" v-if="!!errors.LinkVideo">{{
                errors.LinkVideo
              }}</small>
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
              
                <quill-editor
                contentType="html"
                  theme="snow"
                  name="Script"
                  v-model:content="form.Script"
                  ref="script"
                
                
                ></quill-editor>
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
            text="Create"
            color="#fff"
            type="submit"
           
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
import * as yup from 'yup'
export default {
  name: "ListeningAdminCreateForm",
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
      errors:{
        Name: "",
        Topic: "",
        Description: "",
        LinkVideo: "",
         Script: "",
      },
      topics: LISTEN_TOPIC,
      submitting: false,
    };
  },
  methods: {
      validate(field) {
      schema
        .validateAt(field, this.form)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
    async handleSubmit() {
      schema.validate(this.form, { abortEarly: false })
      .then(()=>{
        console.log('pass')
        this.post()
      })
      .catch(err=>{
        err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
            this.loading = false;
          });
      })
     
    },
    async post(){
      this.submitting =true
       const dataSend = this.form;
      try {
        const apiRes = await listeningApi.postListen(dataSend);
       
        if (apiRes&&apiRes.status === 200) {
          //dispatch(setMessage("Created listening successfully", "success"));
          //setSubmitting(false);
          alert("Created listening successfully");
          this.submitting = false;
        }else{
          console.log(apiRes)
          alert('Something went wrong')
        }
      } catch (error) {
        alert('Operation failed')
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

const schema = yup.object().shape({
  Name: yup
    .string()
    .trim()
    .required('Input value'),
  Description: yup
    .string()
    .required('Input value'),
  Topic: yup
    .string()
    .required('Select one')
    .oneOf(LISTEN_TOPIC.map((i) => i.value)),
  LinkVideo: yup
    .string(),
  Script: yup
    .string(),
});
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