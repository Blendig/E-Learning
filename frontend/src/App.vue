<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar/index.vue";
import Header from '@/components/Header.vue'
import '@/utils/index.scss';

</script>

<template>
  <div  v-if="this.$route.path.split('/').includes('admin')">
    <Header/>
    <div style="width: 250px;">
      <Sidebar />
    </div>
    
  </div>
  <RouterView />
</template>

<style scoped>
</style>
