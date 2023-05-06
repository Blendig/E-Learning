<template>
  <div class="f-shell">
    <div
      class="f-main flex flex-direction-column justify-content-center align-items-center"
    >
      <div class="f-container">
        <form @submit.prevent="handleRegister">
          <div class="flex flex-direction-column align-items-center">
            <div>
              <img
                src="@/assets/resources/icons/logo-tiny.png"
                alt="logo"
                height="60px"
                width="60px"
              />
              <h1>Register</h1>
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
                />
              </div>
              <small class="errors" v-if="!!errors.name">{{
                errors.name
              }}</small>
            </div>
            <div class="input-container">
              <span>Password</span>
              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  v-model="user.password"
                  @blur="validate('password')"
                  @keypress="validate('password')"
                />
              </div>
              <small class="errors" v-if="!!errors.password">{{
                errors.password
              }}</small>
            </div>
            <div class="input-container">
              <span>Confirm Password</span>
              <div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  v-model="user.confirmPassword"
                  @blur="validate('confirmPassword')"
                  @keypress="validate('confirmPassword')"
                />
              </div>
              <small class="errors" v-if="!!errors.confirmPassword">{{
                errors.confirmPassword
              }}</small>
            </div>
            <RouterLink to="/forgot-password">
              <p class="f-cta">Forgot password?</p>
            </RouterLink>
            <div>
              <Button type="submit" color="#fff" text="Register" />
            </div>
          </div>
        </form>
      </div>
      <div>
        <br />
        Do you already have an account?
        <RouterLink to="/login">Log in</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { UX } from "@/constants";
import Button from "../components/Button.vue";
import userApi from "../apis/userApi";
import * as yup from "yup";

const nameRegex = /^[^\d~`!@#$%^&*\(\)\\\|\.,\?\/\-\+\=\_]+$/gi;
const schema = yup.object().shape({
  email: yup.string().trim().required("Enter email").email("Invalid email"),
  name: yup
    .string()
    .trim()
    .required("Enter your first and last name")
    .matches(nameRegex, "Full name without numbers and special characters"),
  password: yup
    .string()
    .trim()
    .required("Enter password")
    .min(6, `Password must be at least 6 characters`),
  confirmPassword: yup
    .string()
    .trim()
    .required("Enter password confirmation")
    .min(6, `Confirm password at least 6 characters`)
    .oneOf([yup.ref("password")], "Enter confirmation password does not match"),
});

export default {
  name: "RegistrationView",
  components: {
    Button,
  },
  data() {
    return {
      user: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
      message: "",
      loading: false,
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
    async handleRegister() {
        schema.validate(this.user,{abortEarly:false})
        .then(()=>{
            //submit
            //setLoading(true);
        this.loading = true;
      this.post()
        })
        .catch(err=>{
            err.inner.forEach((error)=>{
                this.errors = { ...this.errors, [error.path]: error.message };
                this.loading = false;

            })
        })


    
    },
   async post(){
try{
  this.loading = true;
   const res = await userApi.register(
          this.user.name,
          this.user.email,
          this.user.password
        );
        console.log(this.user);
        if (res&&res.status===200) {
          // dispatch(setMessage(res.data.message, "success"));
          this.message = "success";
          this.loading =false
          
          setTimeout(() => {
            window.location.replace("/login");
          }, UX.DELAY_TIME);
        }
}catch(error){
 alert('Something went wrong')
 this.loading =false
}
    }
  },
};
</script>

<style>
.errors {
  color: red;
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
  color: #fff;
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
  width: 23rem;
  border-radius: 0.4rem;
  height: 30rem;
  box-shadow: 2px 4px 6px #111;
  padding: 2rem;
  color: #fff;
}
</style>
