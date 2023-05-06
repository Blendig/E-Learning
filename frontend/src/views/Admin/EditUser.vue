<template>
  <div
    v-if="isLoggedIn"
    class="md-container flex align-items-center justify-content-center"
  >
    <div class="f-card-container">
      <div>
        <img class="u-avatar" :src="avatar" alt="" />
      </div>
      <form id="profile-edit-form" @submit.prevent="handleUpdate">
        <div class="input-container">
          <span>Email</span>
          <div>
            <input
              type="text"
              placeholder="Enter name"
              v-model="userDetail.email"
              @blur="validate('email')"
              @keypress="validate('email')"
            />
          </div>
          <small class="errors" v-if="!!errors.email">{{ errors.email }}</small>
        </div>
        <div class="input-container">
          <span>Full name</span>
          <div>
            <input
              type="text"
              placeholder="Enter name"
              v-model="userDetail.name"
              @blur="validate('name')"
              @keypress="validate('name')"
            />
          </div>
          <small class="errors" v-if="!!errors.name">{{ errors.name }}</small>
        </div>

        <div class="input-container">
          <span>Permission</span>
          <div>
            <select name="roleType">
              <option>{{ userDetail.roleType }}</option>
              <option
                v-for="(type, i) in ROLE_TYPE"
                :key="i"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="cta-btns-form flex">
          <Button
            text="CANCEL"
            bgcolor="inherit"
            variant="outlined"
            color="#ed4507"
            type="button"
            @click="goto(`/admin/user/`)"
          />
          <span v-if="submitting === false">
            <Button text="UPDATE" color="#fff" />
          </span>
          <button type="button" v-if="submitting" style="color: #fff">
            <SpinnerVue />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import userApi from "@/apis/userApi";
import { formatDate } from "@/helper";
import { ROLE_TYPE } from "@/constants/index";
import SpinnerVue from "../../assets/svgs/Spinner.vue";

import * as yup from "yup";

const nameRegex = /^[^\d~`!@#$%^&*\(\)\\\|\.,\?\/\-\+\=\_]+$/gi;
const schema = yup.object().shape({
  email: yup.string().trim().required("Nhập email").email("Email không hợp lệ"),
  name: yup
    .string()
    .trim()
    .required("Enter your first and last name")
    .matches(nameRegex, "Full name without numbers and special characters"),
});

export default {
  name: "EditUserForm",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.findUser();
  },

  data() {
    return {
      edit: false,
      userDetail: {
        name: "",
        email: "",
        roleType: "",
      },
      errors: {
        email: "",
        name: "",
        roleType: "",
      },
      user: {},
      ROLE_TYPE: ROLE_TYPE,
      image: "",
      avatar: null,
      formatDate: formatDate,
      initEmail: null,
      submitting: false,
    };
  },
  methods: {
    validate(field) {
      schema
        .validateAt(field, this.user)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
    goto(url) {
      this.$router.back();
    },
    async findUser() {
      try {
        const res = await userApi.getUserDetails(this.$route.params.user_id);
        if (res && res.status === 200) {
          this.userDetail = res.data.user;
          this.initEmail = res.data.user.email;
          this.avatar = res.data.user.avatar;
        }
        //setUserDetail(res.data.user);
      } catch (error) {}
    },
    toggleEdit() {
      this.edit = !this.edit;
    },

    validate(field) {
      schema
        .validateAt(field, this.userDetail)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
    async handleUpdateInfo() {
      //erorr handling
      let flag = false;
      console.log(this.$route.params)
      schema
        .validate(this.userDetail, { abortEarly: false })
        .then(() => {
          console.log("pass");
          //api call
          flag = true;
         this.saveEditInfo()
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
            this.loading = false;
          });
          console.log(err);
        });
     
    },
    async saveEditInfo(){
      try {
        this.submitting = true;
          const dataSend = {
            name: this.userDetail.name,
            email: this.userDetail.email,
            avatar:this.avatar,
            role: this.userDetail.roleType,
            initEmail:this.initEmail,
          };
          const res =await userApi.editUser(this.$route.params.user_id, dataSend);
          if (res.status===200) {
            this.submitting = false;
            this.$router.push(`/admin/user/detail/${this.$route.params.user_id}`);
          }else{
            this.submitting = false;

          }
      } catch (error) {
        alert(error.response?.message || "Operation failed");
        this.submitting=false
      }
    },
    async handleUpdateAvatar() {
      try {
        const file = e.target.files[0];
        if (!file) {
          //dispatch(setMessage("No files were uploaded", "error"));
          alert("No files were uploaded");
        }
        if (file.size / 1024 ** 2 > 2) {
          // dispatch(setMessage("Size too large", "error"));
          alert("Size too large");
        }
        this.avatar = URL.createObjectURL(file);
        let formImage = new FormData();
        formImage.append("file", file);
        //setImage(formImage);
        this.image = formImage;
      } catch (err) {
        throw err;
      }
    },

    handleUpdate() {
      if (this.user.name || this.avatar) {
        this.handleUpdateInfo();
      }
    },
    async handleEditUser() {
      try {
        this.submitting = true;
        const dataSend = {
          name: this.userDetail.name,
          email: this.userDetail.email,
          avatar:this.avatar,
          role: this.userDetail.roleType,
          initEmail: this.initEmail,
        };
        const res = await userApi.editUser(user_id, dataSend);
        if (res) {
          //dispatch(setMessage(res.data.message, 'success'));
          this.submitting = false;
          // history.replace(`/admin/user/detail/${user_id}`)
          this.$router.back();
        }
      } catch (error) {
        dispatch(setMessage(error.response.data.message, "error"));
        setSubmitting(false);
      }
    },
  },
  components: {
    Button,
    SpinnerVue,
  },
};
</script>
<style lang="css">
.usr-detail-btn-cta button {
  margin: 0 0 0.6rem;
}
.cta-btns-form {
  width: 100%;
  justify-content: center;
}
.cta-btns-form button:first-child {
  margin-right: 0.5rem;
}
.u-avatar {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
}
#profile-edit-form {
  margin-top: 1.5rem;
  text-align: start !important;
}
.input-container {
  text-align: start;
}
.md-container {
  min-height: 80vh;
}
.f-card-container {
  text-align: center;
}
.u-rest-detail {
  color: var(--text-color);
  line-height: 2;
  font-size: 1.1rem;
  margin: 1.5rem 0;
}
.u-name {
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: bold;
  letter-spacing: 0.75px;
  color: var(--text-color);
}
.u-coins {
  color: var(--label-color);
  font-weight: bold;
  font-size: large;
}
.u-role {
  color: var(--label-color) !important;
  font-size: 1rem;
  font-weight: ligh;
  letter-spacing: 0.75px;
  text-transform: capitalize;
}
</style>
