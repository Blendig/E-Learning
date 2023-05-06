//example followed :: https://www.smashingmagazine.com/2020/10/authentication-in-vue-js/#home-vue
const state = {
    user: null,
   
};
const getters = {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
};
const actions = {
    async LogIn({ commit }, User) {
        // await axios.post('login', User)
        await commit("setUser", User);
    },
    async LogOut({ commit }) {
        let user = null;
        commit("logOut", user);
    },
};
const mutations = {
    setUser(state, user) {
        state.user = user;
    },

    logOut(state) {
        state.user = null;
      
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
