<template>
  <div>
    <PageTitle title="Edit Blog" />
    <br />
    <form @submit.prevent="handleSubmit">
      <div class="grid-container">
        <div
          class="grid-item"
          style="max-width: 100% !important; flex-basis: 100%; flex-grow: 3"
        >
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Title (*)</span>
              <div>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder=""
                  name="title"
                  @blur="validate('title')"
                  @keypress="validate('title')"
                />
              </div>
              <small class="errors" v-if="!!errors.title">{{
                errors.title
              }}</small>
            </div>
          </div>
        </div>

        <div class="grid-item" style="max-width: 100% !important; flex-grow: 3">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Text Editor</span>
              <br />
              <br />
              <div>
                <quill-editor
                  contentType="html"
                  theme="snow"
                  name="Script"
                  v-model:content="form.content"
                  ref="content"
                  @blur="validate('content')"
                  @keypress="validate('content')"
                ></quill-editor>
              </div>
              <small class="errors" v-if="!!errors.content">{{
                errors.content
              }}</small>
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
            @click="goto('/admin/blog')"
          />
          <VButton text="Create" color="#fff" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>
<script type="text/javascript">
import PageTitle from "@/components/PageTitle.vue";
import VButton from "@/components/Button.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import blogApi from "@/apis/Extras/blogApi.js";
import * as yup from "yup";

//---------------------------------------------------------
export default {
  name: "EditBlogForm",
  created() {
    this.fetchDetail()
  },
  data() {
    return {
      form: {
        content: "",
        title: "",
        Image:
          "https://res.cloudinary.com/phongvn2611/image/upload/v1638368033/english/word/default-image_fbmbtn.png",
      },
      errors: {
        content: "",
        title: "",
      },
      detail:null,
      submitting: false,
    };
  },
  methods: {
    async fetchDetail() {
      try {
        const res = await blogApi.getBlogById(this.$route.params.id);
        if ( res.status === 200) {
          this.detail = res.data.blog[0];
            this.form.content = res.data.blog[0].content
            this.form.title=res.data.blog[0].title
        }
    
      } catch (error) {
       // throw error
        alert('Operation failed')
      }
    },
    validate(field) {
      schema
        .validateAt(field, this.form)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
    async handleSubmit() {
      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          console.log("pass");
          this.put();
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
            this.loading = false;
          });
        });
    },
    async put() {
      this.submitting = true;
      const d = {
        id: this.detail._id,
        title: this.form.title,
        content: this.form.content,
        status: true,
      };
      try {
        const apiRes = await blogApi.updateBlog(
          d.id,
          d.title,
          d.content,
          d.status
        );

        if (apiRes && apiRes.status === 200) {
          alert("Created updated successfully");
          this.submitting = false;
          this.$router.push('/admin/blog')
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert("Operation failed");
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
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
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
