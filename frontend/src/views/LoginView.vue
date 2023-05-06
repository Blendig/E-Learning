<template>
  <div class="f-shell">
    <div
      class="f-main flex flex-direction-column justify-content-center align-items-center"
    >
      <div class="f-container">
        <form @submit.prevent="handleLogin">
          <div class="flex flex-direction-column align-items-center">
            <div>
              <img
                src="@/assets/resources/icons/logo-tiny.png"
                alt="logo"
                height="80px"
                width="80px"
              />
              <h1>Log in</h1>
              <br />
            </div>
            <div class="input-container">
              <span>Email</span>
              <div>
                <input
                v-model="user.email"
                  type="email"
                  placeholder="Enter email"
                  required
               
                />
              </div>
            </div>
            <div class="input-container">
              <span>Password</span>
              <div>
                <input
                required
                v-model="user.password"
                  type="password"
                  placeholder="Enter Password"
                  
                />
              </div>
            </div>
            <div>
              <RouterLink to="/forgot-password">
                <p class="f-cta">Forgot password?</p>
              </RouterLink>
            </div>
            <div class="full flex justify-content-center">
              <div v-if="!isLoading" class="full">
              <Button type="submit" color="#fff" width='100%' text="LOG IN"/>
            </div>
              <button class="spinner-btn-233 icon-btn" v-if="isLoading"><Spinner/></button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <br />
        Don't have an account?
        <RouterLink to="/register">Register</RouterLink>
      </div>
    </div>
  </div>
 
</template>

<script>
import Button from "../components/Button.vue";
import { mapActions } from "vuex";
import { UX } from "@/constants";
import InputCustom from "../components/UIx/InputCustom/index.vue";
import userApi from '../apis/userApi';
import Spinner from '@/assets/svgs/Spinner.vue'

export default {
  name: "LoginView",
  components: {
    Button,
    InputCustom,
  },
  data() {
    return {
        isLoading:false,
      user: { email: "", password: "" },
    };
  },
  methods: {
    ...mapActions(['LogIn']),
    async handleLogin(e) {
      this.isLoading=true
      if(this.user.email&&this.user.password){
        console.log('on submit')
      try {
        //setLoading(true);
        const res = await userApi.login(this.user.email,this.user.password);
        //setting auth state 
        await this.LogIn(res.data.user)
        
        //dispatch(setMessage(res.data.message, "success"));
        console.log(res.data)
        setTimeout(() => {
          window.location.replace("/home");
        }, UX.DELAY_TIME);
        this.isLoading=false
      } catch (error) {
        // dispatch(setMessage(error.response?.data?.message, "error"));
        // setLoading(false);
        this.isLoading=false
       alert('Incorrect credentials')
        throw error
      }
    }else{
      this.isLoading=false
      alert('Please enter your login details')
    }
    },
  },
  components:{
    Spinner,
    Button
  }
};
</script>

<style type="scss" scoped>
.spinner-btn-233{
  color:#fff;
  display:flex;
  justify-content: center;
 
}
.spinner-btn-233  svg{
    color:#fff;
    fill:#fff;
    height: 2rem;
    width:2rem;
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
.c-input {
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
img {
  height: 80px;
  width: 80px;
}
.f-container {
  width: 23rem;
  border-radius: 0.4rem;
  min-height: 30rem;
  box-shadow: 2px 4px 6px #111;
  padding: 2rem;
}
</style>