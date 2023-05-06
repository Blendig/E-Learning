<template>
  <div>
    <PageTitle title="Sửa Từ" />
    <br />
    <form @submit.prevent="handleSubmit">
      <div class="grid-container">
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Vocabulary (*)</span>
              <div>
                <input
                  v-model="form.word"
                  type="text"
                  placeholder=""
                  name="word"
                  :maxlength="CONSTANTS.MAX.WORD_LEN"
                        @blur="validate('word')"
                  @keypress="validate('word')"
                />
              </div>
               <small class="errors" v-if="!!errors.word">{{
                errors.word
              }}</small>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Meaning of the word (*)</span>
              <div>
                <input
                  type="text"
                  v-model="form.mean"
                  placeholder=""
                  name="mean"
                  maxlength="CONSTANTS.MAX.MEAN_WORD_LEN"
                 @blur="validate('mean')"
                  @keypress="validate('mean')"
                />
              </div>
                 <small class="errors" v-if="!!errors.mean">{{
                errors.mean
              }}</small>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Notation (*)</span>
              <div>
                <input
                  v-model="form.phonetic"
                  type="text"
                  name="phonetic"
                  placeholder=""
                   @blur="validate('phonetic')"
                  @keypress="validate('phonetic')"
                    @focus='togglePhoneticKeyboard'
                  maxlength="CONSTANTS.MAX.PHONETIC_LEN"
                />
              </div>
                  <small class="errors" v-if="!!errors.phonetic">{{
                errors.phonetic
              }}</small>
            </div>
          </div>
        </div>
<!-- phonetic keyboard -->
   <div class="grid-item full-width-grid" v-if='showPhoneticKeyboard'>
              <PhoneticInput @handle-phonetic-text='handlePhoneticInput' @close-pho-kb='closePhoKb'/>
        </div>
<!-- eof -->
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Word type (*)</span>
              <div>
                <select name="type" 
                  @blur="validate('type')"
                  @keypress="validate('type')"

                v-model="form.type">
                  <option>select</option>
                  <option
                    v-for="word in CONSTANTS.WORD_TYPES"
                    :key="word.label"
                    :value="word.value"
                  >
                    {{ word.label }}
                  </option>
                </select>
              </div>
               <small class="errors" v-if="!!errors.type">{{
                errors.type
              }}</small>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Level of the word (*) </span>
              <div>
                <select name="level"
                v-model="form.level"
                  @blur="validate('level')"
                  @keypress="validate('level')"

                >
                  <option>select</option>
                  <option
                    v-for="word in CONSTANTS.WORD_LEVELS"
                    :key="word.label"
                    :value="word.value"
                  >
                    {{ word.label }}
                  </option>
                </select>
              </div>
               <small class="errors" v-if="!!errors.level">{{
                errors.level
              }}</small>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span> Belonging to specialization</span>
              <div>
                <select name="specialty"
                 v-model="form.specialty"
                   @blur="validate('specialty')"
                  @keypress="validate('specialty')"
                 >
                  <option>select</option>
                  <option
                    v-for="word in CONSTANTS.WORD_SPECIALTY"
                    :key="word.label"
                    :value="word.value"
                  >
                    {{ word.label }}
                  </option>
                </select>
              </div>
               <small class="errors" v-if="!!errors.specialty">{{
                errors.specialty
              }}</small>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span> Example sentences </span>
              <div>
                <input
                  type="text"
                  v-model="form.examples"
                  name="examples"
                  placeholder=""
                     @blur="validate('examples')"
                  @keypress="validate('examples')"
                />
              </div>
                <small class="errors" v-if="!!errors.examples">{{
                errors.examples
              }}</small>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Synonyms </span>
              <div>
                <input
                  v-model="form.synonyms"
                  type="text"
                  name="synonyms"
                  placeholder=""
                   @blur="validate('synonyms')"
                  @keypress="validate('synonyms')"
                />
              </div>
               <small class="errors" v-if="!!errors.synonyms">{{
                errors.synonyms
              }}</small>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Antonyms </span>
              <div>
                <input
                  type="text"
                  v-model="form.antonyms"
                  name="antonyms"
                  placeholder=""
                   @blur="validate('antonyms')"
                  @keypress="validate('antonyms')"
                />
              </div>
               <small class="errors" v-if="!!errors.antonyms">{{
                errors.antonyms
              }}</small>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Note</span>
              <div>
                <input
                  type="text"
                  v-model="form.note"
                  placeholder=""
                  name="note"
                   @blur="validate('note')"
                  @keypress="validate('note')"
                />
              </div>
                <small class="errors" v-if="!!errors.note">{{
                errors.note
              }}</small>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-chd">
            <div class="input-container">
              <span>Topics</span>
              <div>
                <input
                  type="text"
                  :value="form.topics"
                  placeholder=""
                  @blur="validate('topics')"
                  @keypress="validate('topics')"
                  name="topics"
                  disabled
                  @click="onShowTopics"
                />
              </div>
                <small class="errors" v-if="!!errors.topics">{{
                errors.topics
              }}</small>
            </div>
          </div>
        </div>

        <div className="english-break"></div>
        <!--  -->
        <div class="" style="width: 100%; min-height: 200px">
          <TopicSelect @add-topic="handleTopicChange" :selected="form.topics" />
        </div>

        <div className="english-break"></div>
        <div class="wd1-cwrap flex">
          <VButton
            text="Quay lại"
            variant="outlined"
            bgcolor="none"
            color="var(--accent-color)"
            type="button"
            @click="$router.back()"
          />

          <button
            v-if="submitting"
            color="#fff"
            type="button"
            style="color: #fff; min-width: 8rem"
            class="flex justify-content-center align-items-center"
          >
          Sửa từ <SpinnerIcon />
          </button>
          <VButton text="Sửa từ" color="#fff" type="submit" v-else />
        </div>
      </div>
    </form>
  </div>
</template>
  <script>
import * as yup from "yup";
import SpinnerIcon from "@/assets/svgs/Spinner.vue";
import {
  MAX,
  WORD_LEVELS,
  WORD_SPECIALTY,
  WORD_TYPES,
} from "@/constants/index.js";
import PageTitle from "@/components/PageTitle.vue";
import VButton from "@/components/Button.vue";
import VSelect from "@/components/UIx/SelectCustom/index.vue";
import wordApi from "@/apis/wordApi.js";
import TopicSelect from "@/components/UIx/TopicSelect/index.vue";
import PhoneticInput from '@/components/WordAdmin/AddWord/PhoneticInput.vue'



export default {
  name: "EditWordForm",
  props: {
    onSubmitForm: () => {},
  },
  created() {
    this.useEffect();
  },
  data() {
    return {
      CONSTANTS: {
        MAX,
        WORD_LEVELS,
        WORD_SPECIALTY,
        WORD_TYPES,
      },
      form: {
        word: "",
        mean: "",
        phonetic: "",
        type: "",
        level: "",
        specialty: "",
        examples: "",
        synonyms: "",
        antonyms: "",
        note: "",
        topics: [],
      },
         errors: {
        word: "",
        mean: "",
        phonetic: "",
        type: "",
        level: "",
        specialty: "",
        examples: "",
        synonyms: "",
        antonyms: "",
        note: "",
        topics: "",
      },
      showTopics: false,
      submitting: false,
     showPhoneticKeyboard:false,

    };
  },
  methods: {
      closePhoKb(){
      this.showPhoneticKeyboard=false
    },
    togglePhoneticKeyboard(){
      this.showPhoneticKeyboard=true
    },
    handlePhoneticInput(char){
     
      this.form.phonetic =this.form.phonetic+char
    },
    validate(field) {
      schema
        .validateAt(field, this.form)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
    onShowTopics() {
      this.showTopics = !this.showTopics;
    },
    handleTopicChange(t) {
      let _arr = this.form.topics;
      let tmp = [];

      if (!_arr.includes(t)) {
        //add to array
        tmp = [..._arr, t];
        this.form.topics = tmp;
        console.log(_arr);
      } else {
        tmp = _arr.filter((a) => a !== t);
        this.form.topics = tmp;
        // _arr.splice(_arr.findIndex(a=>a===t),1)
      }
      console.log(_arr, this.form.topics);
    },
    handleChangePicture(e) {
      try {
        const file = e.target.files[0];
        if (!file) {
          dispatch(setMessage("No files were uploaded", "error"));
        }
        if (file.size / 1024 ** 2 > 2) {
          dispatch(setMessage("Size too large", "error"));
        }
        convertImageToBase64(file).then((res) => {
          setImage(res);
        });
      } catch (err) {
        throw err;
      }
    },
     analysisExample(exampleStr = "", word = "") {
      if (typeof exampleStr !== "string" || exampleStr === "") {
        return [];
      }

      const exampleArr = exampleStr.split("\n");
      for (let str of exampleArr) {
        if (str.toLocaleLowerCase().indexOf(word.toLocaleLowerCase()) === -1) {
          return false;
        }
      }

      return exampleArr;
    },
      async handleSubmit() {
      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          //submit
          this.saveWord();
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
            this.loading = false;
          });
        });
      console.log(this.form);
      this.submitting = true;
    },
      async saveWord() {
      // check examples validation
      const exampleArr = this.analysisExample(
        this.form.examples,
        this.form.word
      );
      if (typeof exampleArr === "boolean" && !exampleArr) {
        alert("Example sentences must contain new vocabulary.", "warning");
        this.submitting = false;
        return;
      }
      // split synonyms string to an array synonyms
      const synonymArr =
        this.form.synonyms !== "" ? this.form.synonyms.split("\n") : [];

      // split antonyms string to an array synonyms
      const antonymArr =
        this.form.antonyms !== "" ? this.form.antonyms.split("\n") : [];

      this.form.examples = exampleArr;
      this.form.synonyms = synonymArr;
      this.form.antonyms = antonymArr;

      try {
        const apiRes = await wordApi.putWord(this.$route.params.id,this.form);
        if (apiRes && apiRes.status === 200) {
          // dispatch(setMessage("Created word successfully", "success"));
          this.$router.back();
        }
        this.submitting = false;
      } catch (error) {
        const message =
          error.response?.data?.message || "Error, can not create word";
        // dispatch(setMessage(message, "error"));
        alert(message);
        this.submitting = false;
        console.log(error);
      }
    },
    convertImageToBase64(image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    },

    async useEffect() {
      let id = this.$route.params.id;
      const apiRes = await wordApi.getWord(id);
      apiRes.data.examples = apiRes.data.examples.join("\n");
      apiRes.data.synonyms = apiRes.data.synonyms.join("\n");
      apiRes.data.antonyms = apiRes.data.antonyms.join("\n");
      //setWordValue(apiRes.data);
      //setPhonetic(apiRes.data.phonetic);
      //setImage(apiRes.data.picture);
      this.form = apiRes.data
    },
  },
  components: {
    PageTitle,
    VButton,
    VSelect,
    SpinnerIcon,
    TopicSelect,
    PhoneticInput
  },
};
const schema = yup.object().shape({
  word: yup
    .string()
    .trim()
    .required("Please enter a word here")
    .lowercase()
    .max(MAX.WORD_LEN, `Long word dark already ${MAX.WORD_LEN} characters`),
  mean: yup
    .string()
    .trim()
    .lowercase()
    .required("Please enter the meaning of the word")
    .max(
      MAX.MEAN_WORD_LEN,
      `Long word dark already ${MAX.MEAN_WORD_LEN} characters`
    ),
  phonetic: yup
    .string()
    .trim()
    .lowercase()
    .required("Please enter the syllable of the word")
    .max(
      MAX.PHONETIC_LEN,
      `Long word dark already ${MAX.PHONETIC_LEN} characters`
    ),
  type: yup
    .string()
    .required("Choose the type of word")
    .oneOf(WORD_TYPES.map((i) => i.value)),
  level: yup
    .string()
    .required("Choose the rank of the word")
    .oneOf(WORD_LEVELS.map((i) => i.value)),
  specialty: yup
    .string()
    .required("Choose the rank of the word")
    .oneOf(WORD_SPECIALTY.map((i) => i.value)),
  examples: yup
    .string()
    .max(
      MAX.EXAMPLE_WORD_LEN,
      `Maximum example ${MAX.EXAMPLE_WORD_LEN} characters`
    ),
  synonyms: yup
    .string()
    .max(
      MAX.SYNONYMS_WORD_LEN,
      `Max Synonyms ${MAX.SYNONYMS_WORD_LEN} characters`
    ),
  antonyms: yup
    .string()
    .max(
      MAX.SYNONYMS_WORD_LEN,
      `Max Synonyms ${MAX.SYNONYMS_WORD_LEN} characters`
    ),
  note: yup
    .string()
    .max(MAX.NOTE_WORD_LEN, `Maximum Notes ${MAX.NOTE_WORD_LEN} characters`),
});
</script>
  <style>
.input-container {
  margin-bottom: 0;
}
.full-width-grid{
  flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
    padding: 12px;
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