<template>
  <Header />
  <div
    v-if="isLoggedIn"
    class="md-container flex align-items-center justify-content-center"
  >
    <div class="f-card-container">
      <div>
        <img
          class="u-avatar"
          :src="this.$store.getters.StateUser.avatar"
          alt=""
        />
      </div>
      <form id="profile-edit-form" v-if="edit" @submit.prevent="handleUpdate">
        <div class="input-container">
          <span>Full name</span>
          <div>
            <input type="name" placeholder="Enter name" v-model="user.name" />
          </div>
        </div>
        <div class="input-container">
          <span>Password</span>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              v-model="user.password"
            />
          </div>
        </div>
        <div class="input-container">
          <span>Confirm Password</span>
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              v-model="user.confirmPassword"
            />
          </div>
        </div>
        <div class="cta-btns-form flex">
          <Button
            text="CANCEL"
            bgcolor="inherit"
            variant="outlined"
            color="#ed4507"
            type="button"
            @click="toggleEdit"
          />
          <Button text="UPDATE" color="#fff" />
        </div>
      </form>

      <div v-if="edit === false">
        <div class="u-name">{{ this.$store.getters.StateUser.name }}</div>
        <div class="u-role">{{ this.$store.getters.StateUser.roleType }}</div>
        <div class="u-rest-detail">
          <div>{{ this.$store.getters.StateUser.email }}</div>
        </div>
        <p>Have joined in 
        
        {{ fmtDate(this.$store.getters.StateUser?.createdAt)}}
      </p>
        <p>
          Current number of coins :
          <span class="u-coins">
            {{ this.$store.getters.StateUser.coin }}
          </span>
        </p>
        <br />
        <div class="" style='width:100%'>
        <Button text="Edit" color="#fff" width="100%" @click="toggleEdit" />
      </div>
      </div>
    </div>
  </div>
</template>


<script>
import Button from "../components/Button.vue";
import Header from "../components/Header.vue";
import userApi from "../apis/userApi";
import {formatDate} from '@/helper/index.js'

export default {
  name: "ProfileView",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },

  data() {
    return {
      edit: false,
      user: {
        name: "",
        password: "",
        confirmPassword: "",
      },
      image:'',
      avatar:null
    };
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    fmtDate(d){
      return d&&formatDate(d) || d 
    },
    async handleUpdateInfo() {
      //erorr handling
      try{
         if (this.image !== "") {
        const avtRes = await userApi.updateAvatar(this.image);
      }
      const res = await userApi.updateProfile(
        this.user.name ? this.user.name : this.$store.getters.StateUser.name,
        this.avatar ? avtRes.data.url :this.$store.getters.StateUser.avatar
      );
      //dispatch(setMessage(res.data.message, "success"));

      window.location.reload();
      }catch(error){

      }
     
    },
    async handleUpdateAvatar() {

try {
  const file = e.target.files[0];
  if (!file) {
    //dispatch(setMessage("No files were uploaded", "error"));
  alert('No files were uploaded')
  }
  if (file.size / 1024 ** 2 > 2) {
   // dispatch(setMessage("Size too large", "error"));
    alert('Size too large')
  }
  this.avatar = URL.createObjectURL(file);
  let formImage = new FormData();
  formImage.append("file", file);
  //setImage(formImage);
  this.image=formImage

} catch (err) {
  throw err;
}
},
async handleUpdatePassword(){
       if (this.user.password.length < 6 || this.user.confirmPassword.length < 6) {
          alert("Password must be at least 6 characters")
       }
       if (this.user.confirmPassword !== this.user.password){
        alert("Confirm password does not match")
       }
       try{
           const res = await userApi.updatePassword(this.user.password);
          if (res) {
            //dispatch(setMessage(res.data.message, "success"));
            alert(res.data.message)
            window.location.reload();
          }
       }catch(error){
        //      dispatch(setMessage(err.response.data.message, "error"));
        alert(`${error.response.data.message}`)
       }
    },
    handleUpdate () {
    if (this.user.name || avatar) {
      this.handleUpdateInfo();
    }
    if (this.user.password && this.user.confirmPassword) {
      this.handleUpdatePassword();
    }
  }
  },
  components: {
    Button,
    Header,
  },
};
</script>
<style lang="css">
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
      color: var(--text-color);
    border: solid 1px var(--border-color);
    border-radius: var(--border-radius);
    background-color: var(--bg-color-accent);
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
 
  font-weight: bold;
  font-size: large;
  color: var(--text-color);
    font-size: 1.6rem;
    line-height: 2;
    letter-spacing: 0.75px;
}
.u-role {
  color: var(--label-color) !important;
  font-size: 1rem;
  font-weight: ligh;
  letter-spacing: 0.75px;
  text-transform: capitalize;
}
</style>
