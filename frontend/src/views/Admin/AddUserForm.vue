<template>
  <div class="f-shell">
    <div
      class="f-main flex flex-direction-column justify-content-center align-items-center"
    >
      <div class="f-container">
        <form @submit.prevent="handleAddUser">
          <div class="flex flex-direction-column align-items-center">
            <div>
              <div class="adm-avatar-wrap">
                <img
                  :src="avatar"
                  alt="logo"
                  height="60px"
                  width="60px"
                  class="adm-usr-avatar"
                />
              </div>
              <h1></h1>
              <br />
            </div>

            <div class="input-container">
              <span>Email</span>
              <div>
                <input
                  type="email"
                  placeholder="Enter email"
                  v-model="user.email"
                  @blur="validate('email')"
                  @keypress="validate('email')"
                  required
                />
              </div>
              <small class="errors" v-if="!!errors.email">{{
                errors.email
              }}</small>
            </div>
            <div class="input-container">
              <span>Name</span>
              <div>
                <input
                  type="text"
                  v-model="user.name"
                  placeholder="Enter full name"
                  @blur="validate('name')"
                  @keypress="validate('name')"
                  required
                />
              </div>
              <small class="errors" v-if="!!errors.name">{{
                errors.name
              }}</small>
            </div>
            <div class="input-container">
              <span>Role</span>
              <div>
                <select name="roleType" v-model="user.roleType" required>
                  <option>select</option>
                  <option
                    v-for="role in roleTypes"
                    :value="role.value"
                    :key="role.label"
                  >
                    {{ role.label }}
                  </option>
                </select>
              </div>
            </div>

            <div style="width: 100%">
              <div style="width: 100%; margin-bottom: 0.7rem">
                <Button
                  type="button"
                  width="100%"
                  :text="makeUpperCase('Back')"
                  color="var(--accent-color)"
                  bgcolor="transparent"
                  variant="outlined"
                  @click="this.$router.back()"
                />
              </div>
              <span style="width: 100%">
                <Button
                  type="submit"
                  width="100%"
                  color="#fff"
                  :text="makeUpperCase('More')"
                />
              </span>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import userApi from "@/apis/userApi";
import { ROUTES, ROLE_TYPE, UX } from "@/constants/index.js";
import * as yup from 'yup'

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
  name: "AddUserForm",
  components: {
    Button,
  },
  created() {
    this.roleTypes = ROLE_TYPE;
  },
  data() {
    return {
      roleTypes: [],
      user: {
        email: "",
        name: "",
        roleType: "user",
      },
      avatar:
        "https://res.cloudinary.com/phongvn2611/image/upload/v1634179173/english/avatar/avatar-default_tx5lsb.png",
      message: "",
      loading: false,
      errors:{
        email: "",
        name: "",
      
      }
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
    makeUpperCase(str) {
      return str.toUpperCase();
    },
     handleAddUser() {
      schema.validate(this.user,{abortEarly:false})
      .then(()=>{
        //submit
        this.submitting = true;
        const dataSend = {
          name: this.user.name,
          email: this.user.email,
          avatar: this.avatar,
          role: this.user.roleType,
        };
        console.log(dataSend);
        const res = userApi.addUser(dataSend);
        if (res) {
          //dispatch(setMessage(res.data.message, "success"));
          this.submitting = false;
          this.$router.push(ROUTES.USER_ADMIN);
        }else{
          alert('Something went wrong')
          this.submitting = false;
        }
      })
      .catch((err)=>{
        err.inner.forEach((error)=>{
                this.errors = { ...this.errors, [error.path]: error.message };
                this.loading = false;

            })
      })
      
    },
  },
};
</script>

<style>
.adm-usr-avatar {
  border: 1px solid var(--primary-color);
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
}
.adm-avatar-wrap {
  width: 8rem;
  height: 8rem;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
}
.f-shell {
  width: 100%;
}
.f-cta {
  color: #eeb655;
  margin: 0 0 2rem;
  float: right;
  text-align: right;
}
.f-main {
  height: 100vh;
  width: 100%;
}
.input-container {
  width: 100%;
  padding: 0.2rem 0.5rem;
  display: block;
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 0.3rem;
}
.input-container input {
  height: 2rem;
  padding: 0.5rem 0;
  border: 0;
  width: 100%;
  background-color: inherit;
  font-size: 1rem;
}
.input-container input:focus {
  border: 0;
  outline: 0;
}
.input-container span {
  font-size: small;
}
.f-container {
  width: 19rem;
  border-radius: 0.4rem;
  min-height: 30rem;
  box-shadow: 2px 4px 6px #111;
  padding: 2rem;
  color: #fff;
}
</style>
