//example followed :: https://www.smashingmagazine.com/2020/10/authentication-in-vue-js/#home-vue
const state = {
    message: {
        type:'',
        message:''
    },
   
};
const getters = {
   StateMessage:()=>state.message
};
const actions = {
  setMessage({commit}, Message){
    commit('setMessage', Message)
  }
};
const mutations = {
    setMessage(state,message){
        console.log(message)
        state.message = message
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
