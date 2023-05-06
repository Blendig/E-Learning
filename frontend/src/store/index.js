//store
import Vuex from 'vuex'
import auth from "@/store/modules/auth.js";
import message from "@/store/modules/message.js";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  modules: {
    auth,
    message
  },
  plugins: [createPersistedState()]
});
export default store