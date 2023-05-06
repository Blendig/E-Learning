import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {plugin,defaultConfig} from '@formkit/vue'
//rich text editor
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import axios from 'axios';
//import store from './store';
import './assets/main.css'

//notification
axios.defaults.baseURL ='http://localhost:5000'
//store
import Vuex from 'vuex'
import auth from "@/store/modules/auth.js";
import message from "@/store/modules/message.js";
import createPersistedState from "vuex-persistedstate";
axios.interceptors.response.use(undefined, function(error) {
  console.log('err')
  if (error) {
   
    const originalRequest = error.config;
    const resStatus = error.response.status
    if (resStatus === 401 || resStatus===400 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/login");
    }
  }
});


const store = new Vuex.Store({
  modules: {
    auth,
    message
  },
  plugins: [createPersistedState()]
});



axios.defaults.withCredentials = true


const app = createApp(App)
app.use(store)
app.use(router)
app.component('QuillEditor', QuillEditor);

app.use(plugin,defaultConfig({
    theme:'genesis'
}))

app.mount('#app')
