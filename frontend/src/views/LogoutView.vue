<template lang="">
    <div>
        <Header/>
    </div>
</template>
<script>
import Header from '../components/Header.vue';
import { mapGetters, mapActions } from "vuex";
export default {
    name:'LogoutView',
    mounted(){
        this.logout()
     
    },

    methods:{
        ...mapActions(['LogOut']),
        async logout() {
            await this.LogOut();
            this.$router.push("/login");
        },
    },
    components:{
        Header,
    }
}
</script>
<style lang="">
    
</style>