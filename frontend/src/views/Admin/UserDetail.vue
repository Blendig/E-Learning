<template>
  <div
    v-if="isLoggedIn"
    class="md-container flex align-items-center justify-content-center"
  >
    <div class="f-card-container">
      <div>
        <img
          class="u-avatar"
          :src="userDetail?.avatar"
          alt=""
        />
      </div>
      <form id="profile-edit-form" v-if="edit" @submit.prevent="handleUpdate">
        <div class="input-container">
          <span>Email</span>
          <div>
            <input type="text" placeholder="Enter name" v-model="userDetail.email" />
          </div>
        </div>
        <div class="input-container">
          <span>Full name</span>
          <div>
            <input type="text" placeholder="Enter name" v-model="userDetail.name" />
          </div>
        </div>

       
        <div class="input-container">
          <span>Permission</span>
          <div>
          
            <select name="roleType">
                <option>select</option>
                <option></option>
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
            @click="toggleEdit"
          />
          <Button text="UPDATE" color="#fff" />
        </div>
      </form>

      <div v-if="edit === false">
        <div class="u-name">{{ userDetail?.name }}</div>
        <div class="u-role">{{ userDetail?.roleType }}</div>
        <div class="u-rest-detail">
          <div>{{ userDetail?.email }}</div>
        </div>
        <div>
          Have joined in
          {{ formatDate(userDetail?.createdAt) }}
        </div>
        <div>
          Current number of coins :
          <span class="u-coins">
            {{ userDetail?.coin }}
          </span>
        </div>
        <br />
        <div class="usr-detail-btn-cta" style="width: 100&">
          <Button text="EDIT" width="100%" color="#fff" @click="goto(`/admin/user/edit/${userDetail._id}`)" />

          <span v-if='userDetail?.isLocked !== 0'>
          <Button
            text="OPEN AN ACCOUNT"
            width="100%"
            color="#fff"
            @click="handleUnlockUser"
          />

          </span>
          <span v-else>
          <Button
            text="LOCK ACCOUNT"
            width="100%"
            color="#fff"
            @click="handleLockUser"
          />
          
          </span>
          <Button
            text="DELETE ACCOUNT"
            width="100%"
            color="#fff"
            @click="handleDeleteUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
import Button from "@/components/Button.vue";
import userApi from "@/apis/userApi.js";
import { formatDate } from "@/helper";
import {ROUTES} from '@/constants/index.js'
export default {
  name: "UserDetail",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.findUser()
  },

  data() {
    return {
       ROUTES:ROUTES,
      edit: false,
      userDetail:null,
      user: {
        name: "",
        password: "",
        confirmPassword: "",
      },
      image: "",
      avatar: null,
      formatDate: formatDate,
    };
  },
  methods: {
    goto(url){
        this.$router.push(url)
    },
   async findUser(){
        try {
            const res = await userApi.getUserDetails(this.$route.params.user_id);
     if(res&&res.status===200){
        this.userDetail=res.data.user
     }
      //setUserDetail(res.data.user);
     
        } catch (error) {
            
        }
    },
    async handleLockUser  () {
        const user_id =this.$store.getters.StateUser._id
        console.log(user_id,this.userDetail._id)
    if (user_id === this.userDetail._id) {
     // dispatch(setMessage("This account is logging", "error"));
      alert("This account is logged in")
    } else {
      try {
        const res = await userApi.lockUser(this.userDetail._id);
        if (res&&res.status===200) {
            console.log(res.data)
          //dispatch(setMessage(res.data.message, "success"));
          window.location.reload();
        }
      } catch (err) {
        throw err
      //  dispatch(setMessage(err.response.data.message, "error"));
      }
    }
  },
   async handleDeleteUser() {
      const user_id =this.$store.getters.StateUser._id
    if (user_id===this.$route.params.user_id) {
     // dispatch(setMessage("This account is logging", "error"));
      alert('This account is logged in')
    } else {
      try {
        const res = await userApi.deleteUser(user_id);
        if (res&&res.status===200) {
          console.log(res)
          //dispatch(setMessage(res.data.message, "success"));
          this.$router.push(this.ROUTES.USER_ADMIN)
        }
      } catch (err) {
        //dispatch(setMessage(err.response.data.message, "error"));
        alert(err.response.data.message)
      }
    }
  },
  async handleUnlockUser () {
     const user_id =this.$route.params.user_id
    try {
      const res = await userApi.unlockUser(user_id);
      if (res) {
       // dispatch(setMessage(res.data.message, "success"));
        window.location.reload();
      }
    } catch (err) {
      dispatch(setMessage(err.response.data.message, "error"));
      alert(err.response.data.message)
    }
  },
    toggleEdit() {
      this.edit = !this.edit;
    },
    async handleUpdateInfo() {
      //erorr handling
      try {
        if (this.image !== "") {
          const avtRes = await userApi.updateAvatar(this.image);
        }
        const res = await userApi.updateProfile(
          this.user.name ? this.user.name : this.$store.getters.StateUser.name,
          this.avatar ? avtRes.data.url : this.$store.getters.StateUser.avatar
        );
        //dispatch(setMessage(res.data.message, "success"));

        window.location.reload();
      } catch (error) {}
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
    async handleUpdatePassword() {
      if (
        this.user.password.length < 6 ||
        this.user.confirmPassword.length < 6
      ) {
        alert("Password must be at least 6 characters");
      }
      if (this.user.confirmPassword !== this.user.password) {
        alert("Confirm password does not match");
      }
      try {
        const res = await userApi.updatePassword(this.user.password);
        if (res) {
          //dispatch(setMessage(res.data.message, "success"));
          alert(res.data.message);
          window.location.reload();
        }
      } catch (error) {
        //      dispatch(setMessage(err.response.data.message, "error"));
        alert(`${error.response.data.message}`);
      }
    },
    handleUpdate() {
      if (this.user.name || avatar) {
        this.handleUpdateInfo();
      }
      if (this.user.password && this.user.confirmPassword) {
        this.handleUpdatePassword();
      }
    },
  },
  components: {
    Button,ROUTES
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
  